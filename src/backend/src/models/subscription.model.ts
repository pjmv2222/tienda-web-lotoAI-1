// Interfaces para los modelos de suscripciones
export interface Subscription {
  id: number;
  user_id: number;
  plan_type: string;
  amount: number;
  currency: string;
  status: string;
  payment_intent_id?: string;
  start_date: Date;
  end_date: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Payment {
  id: number;
  user_id: number;
  subscription_id?: number;
  payment_intent_id: string;
  amount: number;
  currency: string;
  status: string;
  payment_method?: string;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  is_verified: boolean;
  verification_token?: string;
  created_at: Date;
  updated_at: Date;
}

// Tipos para las operaciones de base de datos
export interface CreateSubscriptionData {
  user_id: number;
  plan_type: string;
  amount: number;
  currency?: string;
  payment_intent_id?: string;
  start_date?: Date;
  end_date: Date;
}

export interface CreatePaymentData {
  user_id: number;
  subscription_id?: number;
  payment_intent_id: string;
  amount: number;
  currency?: string;
  status: string;
  payment_method?: string;
}

// Enums para los estados
export enum SubscriptionStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CANCELED = 'canceled',
  EXPIRED = 'expired'
}

export enum PaymentStatus {
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
  CANCELED = 'canceled'
}

export enum PlanType {
  BASIC = 'basic',
  MONTHLY = 'monthly', 
  PRO = 'pro'
}
