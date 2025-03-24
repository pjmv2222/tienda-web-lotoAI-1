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
    token?: string;  // Añadimos el token de autenticación
    role?: string;   // Añadimos el rol del usuario
    subscriptions?: Subscription[];
}

// Interfaz para las suscripciones
export interface Subscription {
    id: number;
    tipo: string;
    fechaInicio: Date;
    fechaFin: Date;
    activa: boolean;
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

export interface LoginResponse {
    success: boolean;
    message?: string;
    token?: string;
    user?: User;
}