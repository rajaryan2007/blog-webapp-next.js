'use client'

import { DeletePostButtonProps } from "@/lib/types";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deletePost } from "@/actions/post-actions";
import { toast } from "sonner";



function DeletePostButton({postId}:DeletePostButtonProps){
    const  [isDeleteing,setIsDeleteing] = useState(false)
    const router = useRouter() 


     const handleDelete = async() => {

        try{
        setIsDeleteing(true)
        const res = await deletePost(postId)
        if(res.success){
            toast(res.message )
            router.push('/')
            router.refresh()
                 
        }else{
            toast(res.message)
        }
    } catch(e){
       toast('An error occured while deleting the post! Please try again')
       
    }
    finally{
        setIsDeleteing(false)
    }
    }


    return (
       <>
       <Button disabled={isDeleteing}  className="cursor-pointer" onClick={handleDelete} variant='destructive' size={'sm'} >
        <Trash className="h-4 w-4 mr-2 cursor-pointer" />
            Delete
        
       </Button>
       </>
    );
}

export default DeletePostButton