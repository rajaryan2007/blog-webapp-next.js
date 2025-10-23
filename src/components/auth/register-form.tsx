'use client'

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "../ui/button";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";

const registerSchema = z
  .object({
    name: z.string().min(1, "Please enter your name"),
    email: z.email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // highlight confirmPassword field
  });

type RegisterFormvalue = z.infer<typeof registerSchema>

interface RegisterFormProps{
   onSuccess?:()=>void
}



function RegisterForm({onSuccess}:RegisterFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const form = useForm<RegisterFormvalue>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            password: '',
            email: '',
            confirmPassword: ''
        }
    })
  


    const onRegisterSubmit = async(value:RegisterFormvalue)=>{
        setIsLoading(true)
        try{
           const {error} = await signUp.email({
              name:value.name,
              email:value.email,
              password:value.password
           })
           
           if(error){
            toast('failed to create the account. please try again')
            return
           }
           toast('your account has been created successfully please sign in with email and & password')
           if(onSuccess){
            onSuccess()
           }
        }catch(e){
           console.log(e);
           
        }finally{
         setIsLoading(false);
        }

    }

    return <Form {...form}>
        <form  onSubmit={form.handleSubmit(onRegisterSubmit)} className='space-y-4' >
           <FormField
           control={form.control}
           name="name"
           render={({field})=>(
            <FormItem>
                 <FormLabel>name</FormLabel>
                 <FormControl>
                    <input type="text" placeholder="Enter your name!" {...field} />
                 </FormControl>
                 <FormMessage/>
            </FormItem>
           )}
           />
           <FormField
           control={form.control}
           name="email"
           render={({field})=>(
            <FormItem>
                 <FormLabel>email</FormLabel>
                 <FormControl>
                    <input type="email" placeholder="Enter your email!" {...field} />
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
                 <FormLabel>password</FormLabel>
                 <FormControl>
                    <input type="password" placeholder="Enter your password!" {...field} />
                 </FormControl>
                 <FormMessage/>
            </FormItem>
           )}
           />
            <FormField
           control={form.control}
           name="confirmPassword"
           render={({field})=>(
            <FormItem>
                 <FormLabel>confirm password</FormLabel>
                 <FormControl>
                    <input type="password" placeholder="Enter your conform password!" {...field} />
                 </FormControl>
                 <FormMessage/>
            </FormItem>
           )}
           />
           <Button type="submit" className="w-full" disabled={isLoading}>
                  {
                    isLoading?"Creating Account":"create Account"
                  }
           </Button>
        </form>



    </Form>

}

export default RegisterForm;

