export interface User {
  id: number;
  username: string;
  email: string;
  role: string[];
  accessToken: string;
  token_type: string;
}
