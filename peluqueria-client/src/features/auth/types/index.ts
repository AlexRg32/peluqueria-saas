export interface User {
  sub: string;
  enterpriseName?: string;
  enterpriseId?: number;
  role: string;
  iat?: number;
  exp?: number;
  // Add other claims if needed
}

export interface AuthResponse {
  token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  enterpriseName: string;
}
