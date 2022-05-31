declare namespace Express {
  export interface Request {
    user: {
      id: number;
      role_id: number;
      client_application_id: number;
      type: string;
    };
  }
}
