export interface TokenPayload {
  id: number | null;
  username: string | null;
  fullname?: string | null;
  isAdmin?: boolean | null;
}
