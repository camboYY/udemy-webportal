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
