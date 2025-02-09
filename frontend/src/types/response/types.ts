export interface RegisterResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface GenericoResponse<T> {
  data: T;
  message: string;
}