import express from 'express';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
} from '../controllers/categoryController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllCategories);

// Admin
router.post('/', authMiddleware, createCategory);
router.get('/admin/:id', authMiddleware, getCategoryById);
router.put('/admin/:id', authMiddleware, updateCategory);
router.delete('/admin/:id', authMiddleware, deleteCategory);

export default router;