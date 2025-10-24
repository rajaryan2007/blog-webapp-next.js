'use client'


import { z } from "zod"
import { FormLabel } from "../ui/form"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"

const postSchema = z.object({
    
    title: z.string().min(3, 'title be at least 2 charaters long').max(255, "Title must be less than 255 charaters"),
    description:z.string().min(5,'enter the short description').max(200,"max word is 200"),
    content: z.string().min(10, "Description must be at least 2 charaters long")
})

type PostFormValue = z.infer<typeof postSchema>

  




function PostForm() {
    const {register,handleSubmit,formState:{errors}} = useForm<PostFormValue>({
        resolver:zodResolver(postSchema),
        defaultValues:{
            title:'',
            description:'',
            content:''
        }
    })

    const onFormSubmit = async(data:PostFormValue)=>
    {
        console.log(data);
    }

const [isPending,startTransition] = useTransition()

    return (<form onSubmit={handleSubmit(onFormSubmit)}  className="space-y-6">
        <div className="space-y-2 " >
            <Label htmlFor="title" >title</Label>
            <input id="title"
            placeholder="Enter post title"
            className="input-style" 
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
              {isPending ? "Saving Post...":"Create Post"}
        </Button>
    </form>
    )
}


export default PostForm