'use client'


import { z } from "zod"
import { FormLabel } from "../ui/form"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { createPost, updatePost } from "@/actions/post-actions"
import { log } from "console"
import { toast } from "sonner"
import { useRouter } from "next/navigation"



const postSchema = z.object({
    
    title: z.string().min(3, 'title be at least 2 charaters long').max(255, "Title must be less than 255 charaters"),
    description:z.string().min(5,'enter the short description').max(200,"max word is 200"),
    content: z.string().min(10, "Description must be at least 2 charaters long")
})


interface PostFormProps{
    isEditing?:boolean;
    post?:{
        id:number
        title:string;
        description:string;
        content:string;
        slug:string;
    }
    
}



type PostFormValue = z.infer<typeof postSchema>

  




function PostForm({isEditing,post}:PostFormProps) {
     const router = useRouter()

    const {register,handleSubmit,formState:{errors}} = useForm<PostFormValue>({
        resolver:zodResolver(postSchema),
        defaultValues:isEditing && post ?{
            title:post.title,
            description:post.description,
            content:post.content

        }:{
            title:"",
            description:"",
            content:""
        }
    })

    const onFormSubmit = async(data:PostFormValue)=>
    {
        startTransition(async()=>{
            try{
                const formData = new FormData()
                formData.append('title',data.title)
                formData.append('description',data.description)
                formData.append('content',data.content)
                
                let res;
                 
                if(isEditing && post){
                    res = await updatePost(post.id,formData) 
                }else{
                    res = await createPost(formData)
                }


              
                console.log(res,"res");
                
                if(res.success){
                    toast(isEditing ? "Post edited successfully ":"Post created successfully")
                    router.refresh()
                    router.push('/')
                }

            }catch(e){
                 console.error("fail to create the post ",e);
                 toast("fail to create the post ");
            }
        })
    }

const [isPending,startTransition] = useTransition()

    return (<form onSubmit={handleSubmit(onFormSubmit)}  className="space-y-6">
        <div className="space-y-2 " >
            <Label htmlFor="title" >title</Label>
            <input id="title"
            placeholder="Enter post title"
            className="w-full rounded-md border border-input bg-background text-foreground px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" 
            {...register('title')}
            disabled={isPending}
            />
            {
                errors?.title && (
                     <p className="text-sm text-red-700" > {errors.title.message}</p>
                )
            }
        </div>
        <div className="space-y-2" >
            <Label htmlFor="title" >Description</Label>
            <Textarea
                id="description"
                placeholder="Enter a short post description"
                {...register('description')}
                disabled={isPending}
            />
             {
                errors?.description && (
                     <p className="text-sm text-red-700" > {errors.description.message}</p>
                )
             }
        </div>
        <div className="space-y-2" >
            <Label htmlFor="content">Description</Label>
            <Textarea
            id="content"
            placeholder="Enter a short post content"
            className="min-h-[350px]"
            {...register('content')}
            disabled={isPending}
            />
              {
                errors?.content && (
                     <p className="text-sm text-red-700" > {errors.content.message}</p>
                )
              }

        </div>
        <Button className="mt-5 w-full" 
        type="submit"  disabled={isPending}
        
        >
              {isPending ? "Saving Post...":isEditing ? "Update Post": "Create Post"}
        </Button>
    </form>
    )
}


export default PostForm