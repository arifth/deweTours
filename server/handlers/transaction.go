package handlers

import (
	"crypto/tls"
	"encoding/json"
	"fmt"
	dto "gorm-imp/dto/result"
	transactiondto "gorm-imp/dto/transaction"
	"gorm-imp/models"
	"gorm-imp/repositories"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
	"github.com/k0kubun/pp"

	// package for midtrans

	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/coreapi"
	"github.com/midtrans/midtrans-go/snap"
	"gopkg.in/gomail.v2"
)

type Transactionhandler struct {
	TransactionRepository repositories.TransactionRepository
}

func HandlerTransaction(TransactionRepository repositories.TransactionRepository) *Transactionhandler {
	return &Transactionhandler{TransactionRepository}
}

var c = coreapi.Client{
	ServerKey: os.Getenv("SERVER_KEY"),
	ClientKey: os.Getenv("CLIENT_KEY"),
}

func (h *Transactionhandler) FindTrans(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	trans, err := h.TransactionRepository.FindTrans()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}
	if err != nil {
		fmt.Println("errornya adalah", err)
		return
	}
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: trans}
	json.NewEncoder(w).Encode(response)
}

func (h *Transactionhandler) FindTran(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	// user, err := h.UserRepository.GetUser(id)

	trip, err := h.TransactionRepository.FindTran(id)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{
		Code: http.StatusOK,
		Data: trip,
	}
	json.NewEncoder(w).Encode(response)
}

func (h *Transactionhandler) CreateTrans(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// dataContext := r.Context().Value("dataFile")
	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))

	// workaround to run go temporarily
	pp.Println(userId)

	// This block of code create a new transaction id with unique number and assing it to model to query to db
	var request transactiondto.CreateTransactionRequest
	var TransIdIsMatch = false
	var TransactionId int

	for !TransIdIsMatch {
		TransactionId = int(time.Now().Unix())
		transaction, _ := h.TransactionRepository.FindTran(TransactionId)
		if transaction.ID == 0 {
			TransIdIsMatch = true
		}
	}
	// filename := dataContext.(string)
	dataCounter, _ := strconv.Atoi(r.FormValue("counter_qty"))
	dataTotal, _ := strconv.Atoi(r.FormValue("total"))
	dataTrip, _ := strconv.Atoi(r.FormValue("trip_id"))

	request = transactiondto.CreateTransactionRequest{
		CounterQty: dataCounter,
		Total:      dataTotal,
		Status:     "pending",
		// Attachment: filename,
		TripId: dataTrip,
	}

	// validate request against struct form created
	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	trans := models.Transaction{
		CounterQty: request.CounterQty,
		Total:      request.Total,
		Status:     request.Status,
		Attachment: request.Attachment,
		TripId:     request.TripId,
		UserId:     userId,
	}

	newTransaction, err := h.TransactionRepository.CreateTrans(trans)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())

	}
	dataTransactions, err := h.TransactionRepository.FindTran(int(newTransaction.Model.ID))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
		return
	}

	newData, err := h.TransactionRepository.FindTran(int(dataTransactions.Model.ID))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
		return
	}

	var s = snap.Client{}
	s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox)

	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{OrderID: strconv.Itoa(int(dataTransactions.Model.ID)), GrossAmt: int64(dataTransactions.Total)},
		CreditCard: &snap.CreditCardDetails{
			Secure: true,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: newData.User.FullName,
			Email: newData.User.Email,
		},
	}

	snapResp, _ := s.CreateTransaction(req)

	pp.Println(snapResp)

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: snapResp}
	json.NewEncoder(w).Encode(response)

}

func SendEmail(status string, transaksi models.Transaction) {

	var CONFIG_SMTP_HOST = "smtp.gmail.com"
	var CONFIG_SMTP_PORT = 587
	var CONFIG_SENDER_NAME = "Net <arifthalhah@gmail.com>"
	var CONFIG_AUTH_EMAIL = os.Getenv("SYSTEM_EMAIL")
	var CONFIG_AUTH_PASSWORD = os.Getenv("SYSTEM_PASSWORD")

	var TripName = transaksi.User.FullName
	var price = strconv.Itoa(transaksi.Total)

	mailer := gomail.NewMessage()
	mailer.SetHeader("From", CONFIG_SENDER_NAME)
	mailer.SetHeader("To", transaksi.User.Email)
	mailer.SetHeader("Subject", "Status Transaksi")
	mailer.SetBody("text/html", fmt.Sprintf(`<!DOCTYPE html>
    <html lang="en">
      <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        h1 {
        color: brown;
        }
      </style>
      </head>
      <body>
      <h2>Product payment :</h2>
      <ul style="list-style-type:none;">
        <li>Name : %s</li>
        <li>Total Harga: Rp.%s</li>
        <li>Status : <b>%s</b></li>
        <li>Iklan : <b>%s</b></li>
      </ul>
      </body>
    </html>`, TripName, price, status, "Gausah Beli Lagi"))

	dialer := gomail.NewDialer(
		CONFIG_SMTP_HOST,
		CONFIG_SMTP_PORT,
		CONFIG_AUTH_EMAIL,
		CONFIG_AUTH_PASSWORD,
	)
	dialer.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	err := dialer.DialAndSend(mailer)
	if err != nil {
		log.Fatal(err.Error())
	}
}

func (h *Transactionhandler) Notification(w http.ResponseWriter, r *http.Request) {
	var notificationPayload map[string]interface{}

	err := json.NewDecoder(r.Body).Decode(&notificationPayload)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// pp.Println(notificationPayload)

	transactionStatus := notificationPayload["transaction_status"].(string)
	fraudStatus := notificationPayload["fraud_status"].(string)
	orderId := notificationPayload["order_id"].(string)
	parsed, _ := strconv.Atoi(orderId)

	transaction, _ := h.TransactionRepository.FindTran(parsed)

	// pp.Println(transaction)

	if transactionStatus == "capture" {
		if fraudStatus == "challenge" {
			// e.g: 'Payment status challenged. Please take action on your Merchant Administration Portal
			SendEmail("pending", transaction)
			h.TransactionRepository.UpdateTrans("pending", transaction.ID)
		} else if fraudStatus == "accept" {
			SendEmail("success", transaction)
			h.TransactionRepository.UpdateTrans("success", transaction.ID)
		}
	} else if transactionStatus == "settlement" {
		SendEmail("success", transaction)
		h.TransactionRepository.UpdateTrans("success", transaction.ID)
	} else if transactionStatus == "deny" {
		// and later can become success
		SendEmail("failed", transaction)
		h.TransactionRepository.UpdateTrans("failed", transaction.ID)
	} else if transactionStatus == "cancel" || transactionStatus == "expire" {
		SendEmail("failed", transaction)
		h.TransactionRepository.UpdateTrans("failed", transaction.ID)
	} else if transactionStatus == "pending" {
		SendEmail("pending", transaction)
		h.TransactionRepository.UpdateTrans("pending", transaction.ID)
	}

	w.WriteHeader(http.StatusOK)

}

// func (h *Transactionhandler) UpdateTrans(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")

// 	dataContext := r.Context().Value("dataFile")

// 	// assign nama file ke variable filename
// 	filename := dataContext.(string)

// 	// NOTE: face error caused by key value in postman using whitespace after it , DONT DO THAT !!

// 	// get data country convrt ke int
// 	dataQty, _ := strconv.Atoi(r.FormValue("counter_qty"))
// 	dataTotal, _ := strconv.Atoi(r.FormValue("total"))
// 	dataTrip, _ := strconv.Atoi(r.FormValue("trip_id"))
// 	// dataPrice, _ := strconv.Atoi(r.FormValue("price"))
// 	// dataQuota, _ := strconv.Atoi(r.FormValue("quota"))

// 	request := transactiondto.CreateTransactionRequest{
// 		CounterQty: dataQty,
// 		Total:      dataTotal,
// 		Status:     r.FormValue("status"),
// 		Attachment: filename,
// 		TripId:     dataTrip,
// 	}

// 	// fmt.Println(request)
// 	// return

// 	// if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
// 	// 	w.WriteHeader(http.StatusBadRequest)
// 	// 	response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
// 	// 	json.NewEncoder(w).Encode(response)
// 	// 	return
// 	// }

// 	// validate request against struct form created

// 	// fmt.Println("baris ke 203 trip handler ", request)
// 	validation := validator.New()
// 	err := validation.Struct(request)
// 	if err != nil {
// 		w.WriteHeader(http.StatusBadRequest)
// 		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
// 		json.NewEncoder(w).Encode(response)
// 		return
// 	}

// 	// countryId := strconv.Atoi()

// 	id, _ := strconv.Atoi(mux.Vars(r)["id"])

// 	// fmt.Println(id)
// 	// return

// 	// trip, _ = h.TripRepository.FindSingleTrip(id)

// 	// fmt.Println(request.Country)
// 	// return

// 	trans := models.Transaction{}

// 	// check all field for emptieness

// 	if request.Attachment != "" {
// 		trans.Attachment = request.Attachment
// 	}
// 	if request.Status != "" {
// 		trans.Status = request.Status
// 	}

// 	if request.CounterQty != 0 {
// 		trans.CounterQty = request.CounterQty
// 	}

// 	if request.Total != 0 {
// 		trans.Total = request.Total
// 	}

// 	if request.TripId != 0 {
// 		trans.TripId = request.TripId
// 	}

// 	// fmt.Println(request)
// 	// return

// 	data, err := h.TransactionRepository.UpdateTrans()

// 	if err != nil {
// 		w.WriteHeader(http.StatusInternalServerError)
// 		json.NewEncoder(w).Encode(err.Error())

// 	}
// 	w.WriteHeader(http.StatusOK)
// 	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
// 	json.NewEncoder(w).Encode(response)

// }
