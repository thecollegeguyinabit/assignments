import { z } from "zod";

export const blogSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(5, "Title must be at least 5 characters."),
  slug: z.string().min(1, "Slug is required."),
  author: z.string().min(1, "Author Name is required.").optional(),
  category: z.string().min(1, "Please select a category."),
  description: z.string().min(20, "Description must be at least 20 characters."),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters."),
  publishDate: z.string().min(1, "Publish date is required."),
  thumbnail: z.string().optional(),
  tableOfContents: z.array(z.object({
    id: z.string(),
    text: z.string(),
    level: z.number()
  })).optional(),
  tags: z.array(z.string()).optional(),
});

// Zod schema for the image dialog form
export const imageFormSchema = z.object({
  src: z.url({ message: "Please enter a valid URL." }),
  alt: z.string().min(1, { message: "Alt text is required." }),
  title: z.string().optional(),
});