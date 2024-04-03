export type IUser = {
  id?: number;
  full_name?: string;
  username?: string;
  email?: string;
  picture?: string;
}

export type IUserRegister = {
  full_name: string;
  username: string;
  email: string;
  password: string;
}

export type IUserLogin = {
  email: string;
  password: string;
}