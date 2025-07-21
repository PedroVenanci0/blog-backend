import { Request, Response } from 'express'
import postRepository from '../repositories/post.repository';

async function getAll(req: Request, res: Response) {
    try {
        const posts = await postRepository.getAll();

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Falha ao buscar publicações", error: error })
    }
}

async function create(req: Request, res: Response) {
    const { author, title, content } = req.body;

    try {
        const post = await postRepository.create(author, title, content);

        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: "Falha ao criar publicação", error: error })
    }

}

async function deletePost(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const post = await postRepository.deletePost(id);

        res.status(204).json(post);
    } catch (error) {
        res.status(400).json({ message: "Falha ao excluir publicação", error: error })
    }
}

async function likePost(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const post = await postRepository.likePost(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: "Falha ao curtir publicação", error: error })
    }
}

async function getFeaturedProfiles(req: Request, res: Response) {
    const limit = 5;

    try {
        const profiles = await postRepository.getFeaturedProfiles(limit);

        res.status(200).json(profiles);
    } catch (error) {
        res.status(404).json({ message: "Falha ao obter perfis destacados", error: error })
    }
}

async function createComment(req: Request, res: Response) {
    const { id } = req.params;
    const { author, content } = req.body;

    try {
        const post = await postRepository.createComment(id, author, content);

        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: "Falha ao criar comentário", error: error })
    }
}

export default { getAll, create, deletePost, likePost, getFeaturedProfiles, createComment };