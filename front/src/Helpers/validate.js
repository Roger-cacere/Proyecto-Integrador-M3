const regexValidation = {
    name: /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    date: /^([0-2][0-9]|(3)[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})$/,
    nDni: /^\d{8}$/,
    username: /^[a-zA-Z0-9._-]{3,16}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    repeatPassword: (password, repeatPassword) => password === repeatPassword
};

const validateField = (type, value, additionalValue = null) => {
    value = String(value).trim();
    
    if (type === 'repeatPassword') {
        return regexValidation[type](value, additionalValue) ? null : "Las contraseñas no coinciden";
    }
    
    const isValid = regexValidation[type].test(value);
    return isValid ? null : getErrorMessage(type);
};

const getErrorMessage = (type) => {
    const errorMessages = {
        name: "El Nombre debe contener solo letras y espacios",
        email: "El Correo Electrónico es inválido",
        date:  "La fecha debe estar en formato DD/MM/YYYY y ser válida.",
        nDni: "El DNI debe tener exactamente 8 dígitos y solo números",
        username: "El nombre de usuario es inválido",
        password: "La contraseña debe tener al menos 8 caracteres, una letra y un número",
        repeatPassword: "La contraseña debe ser la misma que la que haz puesto antes"
    };

    return errorMessages[type] || "Campo Inválido";
};

export const validate = (input) => {
    const errors = {};

    for (const [key, value] of Object.entries(input)) {
        if (key in regexValidation) {
            const error = validateField(key, value, input.password);
            if (error) {
                errors[key] = error;
            }
        }
    }

    if (input.password && input.repeatPassword) {
        const repeatPasswordError = validateField('repeatPassword', input.password, input.repeatPassword);
        if (repeatPasswordError) {
            errors.repeatPassword = repeatPasswordError;
        }
    }

    return errors;
};
