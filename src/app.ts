import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import postRoutes from './routes/post.routes';
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.SOCIAL_IFPI_FRONTEND_URL }))

app.get("/posts", postRoutes.getAll);
app.post("/posts", postRoutes.create);
app.delete("/posts/:id", postRoutes.deletePost);
app.get("/featured-profiles", postRoutes.getFeaturedProfiles);
app.post("/posts/:id/comments", postRoutes.createComment);
app.post("/posts/:id/like", postRoutes.likePost);

export default app;