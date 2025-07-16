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

export interface PasswordFormData {
  email: string;
  password: string;
  confirmPassword: string;
  token?: string;
}

export interface BiographyFormData {
  content: string;
  title?: string;
  isPublic?: boolean;
}

export interface Biography {
  id: string;
  userId: string;
  content: string;
  title?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}


export interface BiographyWithUser extends Biography {
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
}