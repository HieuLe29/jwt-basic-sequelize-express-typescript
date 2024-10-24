import express from 'express';
import { createBlog, getBlogs} from '../controllers/blog.controller';
import { authenticate } from '../middleware/AuthMiddleware';

const router = express.Router();

router.post('/create', authenticate, createBlog);
router.get('/', getBlogs);

export default router;
