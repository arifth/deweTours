package repositories

import (
	"gorm-imp/models"

	"gorm.io/gorm"
)

type AuthRepository interface {
	Register(user models.User) (models.User, error)
	Login(email string) (models.User, error)
	GetUserID(ID int) (models.User, error)
}

func RepositoryAuth(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) Register(user models.User) (models.User, error) {
	// func below create user and insert it into db with gorm create method api
	err := r.db.Create(&user).Error

	return user, err
}

func (r *repository) Login(email string) (models.User, error) {

	var user models.User
	err := r.db.First(&user, "email=?", email).Error

	// debug := r.db.Debug().First(&user, "email=?", email).Error

	// fmt.Println(debug)

	return user, err
}

func (r *repository) GetUserID(ID int) (models.User, error) {
	var user models.User

	err := r.db.First(&user, ID).Error

	return user, err

}
