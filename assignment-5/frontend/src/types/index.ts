// // src/types/index.ts
// export interface Blog {
//   _id: string,
//   title: string,
//   slug: string,
//   category: { _id: string; name: string },
//   description: string,
//   publishDate: string,
//   thumbnail?: string,
//   featuredImage?: string
// }

// export interface BlogInput extends Omit<Blog, '_id' | 'slug'> {
//   slug?: string,

// }

// export type TableOfContentsItem = {
//   id: string;
//   text: string;
//   level: number; // Corresponds to H2, H3, etc.
// };

// export interface Category {
//   _id: string,
//   name: string
// }

// export interface User {
//   id: string,
//   email: string,
//   role: 'admin'
// }

// Represents the data structure for creating or updating a blog post.
// This is the payload sent to the API.
export type BlogInput = {
  title: string;
  slug: string;
  category: { _id: string; name: string }; // The category's ID
  description: string; // Rich text content as an HTML string
  excerpt: string;
  publishDate: string; // ISO 8601 date string
  thumbnail?: string; // URL to the thumbnail image
  tableOfContents?: TableOfContentsItem[];
  tags?: string[];
  author: string; // The author's User ID
};

// Represents a single item in the table of contents.
export type TableOfContentsItem = {
  id: string;
  text: string;
  level: number; // Corresponds to H2, H3, etc.
};

// Represents the full blog document as stored and retrieved from the database.
export type Blog = BlogInput & {
  _id: string;
}

// Represents the User document.
export type User = {
  _id: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
};

// Represents the Category document.
export type Category = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};