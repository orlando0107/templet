export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export interface ActivaEmailFormData {
  token:string;
}

export interface Email {
  email:string;
}

export interface ResetPasswordFormData {
  token: string;
  email: string;
  password: string;
}
