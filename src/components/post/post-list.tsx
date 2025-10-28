import { PostListProps } from "@/lib/types";
import PostCard from "./post-card";

function PostList({ posts }: PostListProps) {
  
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-10">
        <p>No posts available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 mt-10 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} /> 
      ))}
    </div>
  );
}

export default PostList;
