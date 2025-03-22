interface Post {
    id: string;
    title: string;
    content: string;
    image: string;
    senderId: string;
    likes: string[];
}

interface CreatePost {
    title: string;
    content: string;
    image: Promise<string | undefined>;
    senderId: string;
    likes: string[];
}

export type { Post, CreatePost }