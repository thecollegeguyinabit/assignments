
import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description: { type: String, required: true }, 
  excerpt: { type: String, required: true }, 
  publishDate: { type: Date, default: Date.now },
  thumbnail: { type: String }, 
  tableOfContents: [{
    id: { type: String, required: true },
    text: { type: String, required: true },
    level: { type: Number, required: true }
  }], 
  author: { type: String, required: true },
}, { timestamps: true });

// Create index for search functionality
blogSchema.index({ title: 'text', description: 'text', tags: 'text' });

export default mongoose.model('Blog', blogSchema);