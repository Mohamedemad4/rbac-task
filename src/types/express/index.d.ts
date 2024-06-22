declare global {
  namespace Express {
    interface Request {
      user: UserClaims;
    }
  }
}
export {};
