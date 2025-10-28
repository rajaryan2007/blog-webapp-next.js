import { desc, eq } from "drizzle-orm";
import { db } from ".";
import { posts } from "./schema";
import { log } from "console";
import { slugify } from "../utils";




export async function getAllPosts(){
    try{
         const fetchAllPosts = await db.query.posts.findMany({
            orderBy:[desc(posts.createdAt)],
            with:{
                author:true
            }
         })

         return fetchAllPosts
    }catch(e){
        console.log(e)
        return[]
    }
}

export async function getPostBySlug(slug: string) {
  try {
    const post = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
      columns: {
        id: true,
        title: true,
        description: true, 
        content: true,
        slug: true,
        createdAt: true,   
        updatedAt: true,  
        authorId:true
      },
      with: {
        author: {
          columns: {
            name: true, 
        },
      },
    },
  });
    return post;
  } catch (e) {
    console.log(e);
    return null;
  }
}
