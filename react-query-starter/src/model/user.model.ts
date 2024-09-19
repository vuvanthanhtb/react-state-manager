export interface IUser {
  id: number;
  email: string;
  name: string;
}

export interface UserCreate {
  email: string;
  name: string;
}
