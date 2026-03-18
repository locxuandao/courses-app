export interface UserJwtPayload {
  email: string;
  sub: number;
  role: string;
  iat?: number;
  exp?: number;
}
