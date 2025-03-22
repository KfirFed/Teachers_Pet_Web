interface Comment {
    _id: string;
    postId: string;
    content: string;
    ownerId: string
}

interface CreateComment {
    postId: string;
    content: string;
    ownerId: string
}

export type { Comment, CreateComment }