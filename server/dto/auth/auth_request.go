package authdto

type RegisterRequest struct {
	// gorm.Model
	FullName string `json:"full_name" validate:"required"`
	Email    string `json:"email" validate:"required"`
	Password string `json:"password" validate:"required"`
	Phone    string `json:"phone" validate:"required"`
	Address  string `json:"address" validate:"required"`
}

type LoginRequest struct {
	Id_user  uint   `json:"id_user" validate:"required"`
	FullName string `json:"full_name" validate:"required"`
	Email    string `json:"email" validate:"required"`
	Password string `json:"password" validate:"required"`
	Token    string `json:"token" validate:"required"`
	Image    string `json:"image" validate:"required" `
	Role     string `json:"role" validate:"required"`
}
