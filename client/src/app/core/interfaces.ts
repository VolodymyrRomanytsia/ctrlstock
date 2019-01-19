export interface User {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
    id?: string
    paymentExpiration?: Date
}

export interface Message {
    message: string
  }

export interface LoaderState {
    show: boolean;
  }