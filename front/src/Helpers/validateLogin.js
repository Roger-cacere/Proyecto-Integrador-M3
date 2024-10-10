
const regex = {
    username: /^[a-zA-Z0-9._-]{3,16}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
}

export const validateLogin = (input) => {
    const errors = {}

    if(!regex.username.test(input.username)){
        errors.username = "Nombre de usuario inválido"
    }

    if(!regex.password.test(input.password)){
        errors.password = "La contraseña debe tener al menos 8 caracteres, una letra y un número"
    }

    return errors;
}