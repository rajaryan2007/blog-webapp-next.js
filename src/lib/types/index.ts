


export type PostType = {
  id: number;
  title: string;
  description: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  authorId: string;
  author: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean | null;
    createdAt: Date;
    updatedAt: Date;
  };
};


export type PostListProps = {
  posts: PostType[];
};

export interface PostCardProps {
  post: {
    id: number;
    title: string;
    description: string;
    slug: string;
    createdAt: Date;
    author: {
      name: string;
    };
  };
}

export interface PostContentProps {
  post: {
    id: number;
    title: string;
    description: string;
    content: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    author: {
      name: string;
    };
  };
  isAuthor: Boolean;
}

export interface  DeletePostButtonProps{
    postId :number
}