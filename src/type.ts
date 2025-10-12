export type Section = {
  order: number;
  subheading: string;
  paragraph: string;
  imgUrl: string;
};

export type Post = {
  blogUrl: string;
  title: string;
  author: string;
  category: string;
  createdAt: string;
  sections: Section[];
};