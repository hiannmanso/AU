export interface Category {
  id?: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryPatch {
  name: string;
  description: string;
}
