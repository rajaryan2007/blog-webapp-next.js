import PostList from "@/components/post/post-list";
import { getAllPosts } from "@/lib/db/queries";
import { log } from "console";
import { Metadata } from "next";
import Image from "next/image";


export const metadata:Metadata ={
  title:'Next js 15 Blog',
  description:'Next js 15 Blog'

}


export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2">Welcome to the Blog</h1>
        {posts.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-xl font-medium">No posts yet</h2>
          </div>
        ) : (
          <PostList posts={posts} />
        )}
      </div>
    </main>
  );
}