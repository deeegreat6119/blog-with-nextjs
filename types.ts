export interface CreatePost {
  title: string;
  body: string;
  author?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface Signup {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Product {
  id: number;
  name: string;
}
