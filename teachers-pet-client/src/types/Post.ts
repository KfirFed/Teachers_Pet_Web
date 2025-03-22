interface Post {
  _id: string;
  title: string;
  content: string;
  image: string;
  senderId: string;
  likes?: string[];
}

interface CreatePost {
  _id?: string;
  title: string;
  content: string;
  image: Promise<string | undefined>;
  senderId: string;
  likes?: string[];
}

interface PostEdit {
  _id?: string;
  title: string;
  content: string;
  image?: Promise<string | undefined>;
  senderId: string;
  likes?: string[];
}

export type { Post, CreatePost, PostEdit };
