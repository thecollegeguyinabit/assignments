import express from 'express';
import {
    getAllBlogs,
    getBlogBySlug,
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogById,
} from '../controllers/blogController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();
// Public routes
router.get('/', getAllBlogs);
router.get('/:slug', getBlogBySlug);

// Admin routes
router.post('/', authMiddleware, createBlog);
router.get('/admin/:id', authMiddleware, getBlogById);
router.put('/admin/:id', authMiddleware, (req, res, next) => {
  req.blog = { slug: req.body.slug || '' }; // Temp for update
  next();
}, updateBlog);
router.delete('/admin/:id', authMiddleware, deleteBlog);

export default router;