export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  study?: Array<string>;
  errorMessage?;
  userId?: string;
}
