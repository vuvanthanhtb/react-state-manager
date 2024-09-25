export interface IBlog {
  id: number;
  title: string;
  author: string;
  content: string;
}

export interface IBlogCreate {
  title: string;
  author: string;
  content: string;
}
