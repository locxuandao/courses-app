export interface UserJwtPayload {
  email: string;
  sub: number;
  role: string;
  permissions: string[];
  iat?: number;
  exp?: number;
}
