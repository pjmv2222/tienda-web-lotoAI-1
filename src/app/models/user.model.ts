// Interfaces para el modelo de usuario
export interface User {
    id?: number;
    email: string;
    nombre: string;
    apellido: string;
    telefono?: string;
    verified?: boolean;
    created_at?: Date;
    updated_at?: Date;
}

export interface UserRegistration {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    confirmPassword?: string;
    telefono?: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserPasswordReset {
    token: string;
    password: string;
    confirmPassword: string;
}

export interface UserPasswordForgot {
    email: string;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
} 