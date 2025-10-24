'use client'

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "../ui/button";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



const loginSchema = z.object({
    email:z.email("Please enter the email"),
    password:z.string().min(6,"password must be at least")
})


type LoginFormvalues = z.infer<typeof loginSchema>





function LoginForm() {

    const [isLoading,setIsLoading] = useState(false);
   const router = useRouter()

const form = useForm<LoginFormvalues>({
    resolver : zodResolver(loginSchema),
    defaultValues:{
         email:'',
         password:''
    }

})

   const onSubmit = async(value:LoginFormvalues)=>{
    setIsLoading(true);

    try{
        const {error} = await signIn.email({
            email:value.email,
            password:value.password,
            rememberMe : true
        }) 
        if(error){
            toast("login failed")
            return 
        }
        toast("login successful")
        router.push('/')

        
    }catch(error){
        console.log(error);
        
    }finally{
        setIsLoading(false)
    }
   }

    return <Form {...form} >
         <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
            control={form.control}
            name="email"
            render={({field})=>(
                <FormItem>
                    <FormLabel>Email </FormLabel>
                    <FormControl>
                        <input 
                        className="input-style"
                        placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}    
            />
            <FormField
            control={form.control}
            name="password"
            render={({field})=>(
                <FormItem>
                    <FormLabel>password </FormLabel>
                    <FormControl>
                        <input  className="input-style" placeholder="Enter your password" type="password" {...field} />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}    
            />
              <Button type="submit" className="w-full" disabled={isLoading}>
                  {
                    isLoading ? "signing":"sign"
                  }
           </Button>


         </form>
    </Form>
    
}

export default LoginForm;