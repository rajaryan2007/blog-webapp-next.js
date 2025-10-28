'use client'

import { DeletePostButtonProps } from "@/lib/types";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";


function DeletePostButton({postId}:DeletePostButtonProps){
    return (
       <>
       <Button variant='destructive' size={'sm'} >
        <Trash className="h-4 w-4 mr-2" />
            Delete
        
       </Button>
       </>
    );
}

export default DeletePostButton