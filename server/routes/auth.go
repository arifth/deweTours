package routes

import (
	"gorm-imp/handlers"
	"gorm-imp/pkg/middleware"
	"gorm-imp/pkg/mysql"
	"gorm-imp/repositories"

	"github.com/gorilla/mux"
)

func AuthRoutes(r *mux.Router) {
	UserRepository := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlerAuth(UserRepository)

	r.HandleFunc("/register", h.Register).Methods("POST")
	r.HandleFunc("/login", h.Login).Methods("POST")
	// NOTES: this routes function as checker everytime app js refreshed
	r.HandleFunc("/checkAuth", middleware.Auth(h.CheckAuth)).Methods("GET")

}
