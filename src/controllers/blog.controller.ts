import e, { Request, Response } from 'express';
import Blog from '../models/blog';
import { RequestWithUser } from '../middleware/AuthMiddleware';

export const createBlog = async (req: RequestWithUser, res: Response) => {                    
  const { title, content } = req.body;
  try {
    const blog = await Blog.create({ title, content, userId: req.user?.id});
    res.status(201).json(req.user);
  } catch (error) {
    res.status(500).json({ error});
  }
};

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.findAll();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching blogs' });
  }
};  

// export const getBlogById = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
   
//     const blog = await Blog.findByPk(id, {
//       attributes: ['id', 'title', 'content', 'userId'],
//       include: [
//         {
//           model: Category,
//           attributes: ['id','name'], //Chỉ hiển thị tên category
//           through: {    //Không cần hiển thị thông tin từ bảng trung gian
//             attributes: [],},
//           as: 'categories',
//         },
//       ],
//     });

//     if (blog) {
//       res.status(200).json(blog);
//     } else {
//       res.status(404).json({ message: 'Blog not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching blog' });
//   }
// }

// export const updateBlog = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { title, content } = req.body;
//     const blog = await Blog.findByPk(id);
//     if (blog) {
//       await blog.update({ title, content });
//     res.status(200).json(blog);
//     } else {
//        res.status(404).json({ message: 'Blog not found' });
//     }
    
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating blog' });
//   }
// };

// // Xóa blog
// export const deleteBlog = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const blog = await Blog.findByPk(id);
//     if (blog) {
//       await blog.destroy();
//       res.status(200).json({ message: 'Blog deleted successfully' });
//     } else {
//       res.status(404).json({ message: 'Blog not found' });
//     }
    
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting blog' });
//   }
// };

// export const searchBlogsByTitle = async (req: Request, res: Response) => {
//   const { title } = req.query;
//   try {
//     const blogs = await Blog.findAll({
//       where: { title: { [Op.like]: `%${title}%` } },
//     });
//     res.status(200).json(blogs);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching blogs' });
//   }
// }