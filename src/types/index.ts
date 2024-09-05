export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: [Object];
  phone: string;
  website: string;
  company: [Object];
};

export type IPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type ILoginFormProp = {
  username: string;
  password: string;
};

export type ICategoryFormProp = {
  name: string;
  parentId: string;
};

export type RegisterFormProp = {
  username: string;
  password: string;
  email?: string;
  phoneNumber: string;
  name: string;
};
