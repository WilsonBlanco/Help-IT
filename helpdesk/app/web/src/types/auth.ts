export type Role = 'USER' | 'TECH' | 'ADMIN';

export interface MeUser {
  sub: string;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}

export interface MeResponse {
  ok: boolean;
  user: MeUser;
}

export interface LoginResponse {
  ok: boolean;
  user: { id: string; email: string; role: Role };
}
