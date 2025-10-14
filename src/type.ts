/**
 * This is the type of the post that is stored in the database.
 */
export interface Post{
  blogUrl: string;
  title: string;
  author: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}


/**
 * This is the type of the section that is stored in the database.
 */
export type Section = Omit<BlogClientSection, 'imageFile' | 'previewUrl' | 'uploadProgress'>;

/**
 * This type can be used as returned type of a function that returns single or multiples posts with their sections.
 * @property blogUrl - The url of the blog. This is the primary key of the post.
 * @property title - The title of the blog.
 * @property author - The author of the blog.
 * @property category - The category of the blog.
 * @property createdAt - The date and time when the blog was created.
 * @property sections - An array of sections that make up the blog. Each section has a subheading, paragraph, order and imgKey.
 */
export type PostWithSections = {
  blogUrl: string;
  title: string;
  author: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  sections: Section[];
};

/**
 * This type can be used as state type for the client side blog editor.
 */
export interface BlogClientSection {
  subheading: string;
  paragraph: string;
  order: number;
  imageFile: File | null;
  previewUrl: string;
  uploadProgress: number;
  imgKey: string;
}