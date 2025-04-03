// Interfaces para el modelo de usuario
export interface Subscription {
    id: number;
    tipo: string;
    fechaInicio: Date;
    fechaFin: Date;
    activa: boolean;
}

export interface User {
    id: string;
    email: string;
    nombre: string;
    apellido: string;
    telefono?: string;
    verified: boolean;
    role: string;
    token?: string;
    subscriptions?: Subscription[];
}

export interface UserProfile {
    id: string;
    email: string;
    nombre: string;
    apellido: string;
    telefono?: string;
    fechaRegistro: Date;
}

export interface UserRegistration {
    email: string;
    password: string;
    nombre: string;
    apellido: string;
    telefono?: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserPasswordReset {
    token: string;
    password: string;
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