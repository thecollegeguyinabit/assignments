import slugify from 'slugify';
import Blog from '../models/Blog.js';


// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    const blogs = await Blog.find(query)
      .populate('category', 'name')
      .sort({ publishDate: -1 })
      .limit(10); // Pagination can be added
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get blog by slug 
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug })
      .populate('category', 'name');
    if (!blog) return res.status(404).json({ msg: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Create blog 
export const createBlog = async (req, res) => {
  try {
    const { title, category, description, publishDate, thumbnail, excerpt, tableOfContents, tags, author } = req.body;
    const slug = slugify(title, { lower: true, strict: true });
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) return res.status(400).json({ msg: 'Slug already exists' });

    // Basic validation 
    if (!title || !slug || !category || !description || !excerpt || !author) {
        return res.status(400).json({ msg: 'Missing required fields: title, slug, category, description, excerpt, or author.' });
    }

    const newBlog = new Blog({
      title,
      slug,
      category,
      description,
      publishDate: new Date(publishDate),
      thumbnail,
      excerpt,
      tableOfContents : tableOfContents || [],
      tags : tags || [],
      author,
    });
    await newBlog.save();
    await newBlog.populate('category', 'name');
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ msg: 'Server error from creating blog' });
  }
};

// Update blog 
export const updateBlog = async (req, res) => {
  try {
    const { title, category, description, publishDate, thumbnail, featuredImage } = req.body;
    let slug = req.blog.slug; 
    if (title !== req.blog.title) {
      slug = slugify(title, { lower: true, strict: true });
      const existing = await Blog.findOne({ slug });
      if (existing && existing._id.toString() !== req.params.id) {
        return res.status(400).json({ msg: 'Slug already exists' });
      }
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, slug, category, description, publishDate: new Date(publishDate), thumbnail, excerpt, tableOfContents, tags, author },
      { new: true }
    ).populate('category', 'name');
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete blog 
export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get blog by ID for edit 
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('category', 'name');
    if (!blog) return res.status(404).json({ msg: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};