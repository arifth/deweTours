package repositories

import (
	"gorm-imp/models"

	"github.com/k0kubun/pp/v3"
	"gorm.io/gorm"
)

type TransactionRepository interface {
	FindTrans() ([]models.Transaction, error)
	FindTran(id int) (models.Transaction, error)
	CreateTrans(trans models.Transaction) (models.Transaction, error)
	UpdateTrans(status string, ID uint) (models.Transaction, error)
	// DeleteTrip(trip models.Trip, id int) (models.Trip, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTrans() ([]models.Transaction, error) {
	var trans []models.Transaction
	// err := r.db.Raw("SELECT * FROM trips").Scan(&trips).Error

	err := r.db.Debug().Preload("Trip").Preload("User").Preload("Trip.Country").Find(&trans).Error

	return trans, err
}

// this func begin handling database items with object relation models
func (r *repository) FindTran(id int) (models.Transaction, error) {
	var trans models.Transaction
	err := r.db.Preload("Trip").Preload("Trip.Country").First(&trans, id).Error // Using Find method

	// fmt.Println(trans)

	return trans, err
}

func (r *repository) CreateTrans(trans models.Transaction) (models.Transaction, error) {
	// err := r.db.Find("INSERT INTO trips(title,country,accomodation,transportation,eat,day,night,dateTrip,price,quota,description,image) ,
	err := r.db.Debug().Preload("Trip").Preload("Trip.Country").Create(&trans).Error

	return trans, err

}

func (r *repository) UpdateTrans(status string, ID uint) (models.Transaction, error) {

	pp.Println(status)

	var new models.Transaction
	r.db.Preload("Trip").First(&new, ID)

	pp.Println("after Query", new)

	if status != new.Status && status == "success" {
		var trip models.Trip
		r.db.First(&trip, new.Trip.ID)
		trip.Quota = trip.Quota - new.CounterQty
		r.db.Model(&trip).Updates(&trip)
	}

	new.Status = status

	pp.Println("after changed status ", new)

	err := r.db.Model(&new).Updates(new).Error
	return new, err
}
