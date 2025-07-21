import prisma from "../config/prisma";


async function getAll() {
    const posts = await prisma.post.findMany({ orderBy: { created_at: "desc" } })

    return posts;
}

async function create(author: string, title: string, content: string) {
    const newPost = await prisma.post.create({ data: { author, title, content } })
    return newPost;
}

async function deletePost(id: string) {
    const post = await prisma.post.delete({ where: { id: id } });
    return post;
}

async function likePost(id: string) {
    const post = await prisma.post.update({
        where: { id },
        data: {
            likes: { increment: 1 }
        }
    })

    return post;
}

async function createComment(id: string, author: string, content: string) {
    const post = await prisma.post.update({
        where: { id },
        data: {
            comments: {
                push: {
                    author, content
                }
            }
        }
    })

    return post;
}

async function getFeaturedProfiles(limit: number) {
    const authors = await prisma.post.groupBy({
        by: ["author"],
        _count: {
            author: true
        },
        orderBy: {
            _count: {
                author: "desc"
            }
        },
        take: limit
    })

    const result = authors.map((item: { author: any; _count: { author: any; }; }) => ({
        name: item.author,
        postCount: item._count.author
    }));

    return result;
}

export default { getAll, create, deletePost, likePost, createComment, getFeaturedProfiles };