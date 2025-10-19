'use client'

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";



const loginSchema = z.object({
    email:z.string().email("Please enter the email"),
    password:z.string().min(6,"password must be at least")
})


type LoginFormvalues = z.infer<typeof loginSchema>





function LoginForm() {

    const [isLoading,setIsLoading] = useState(false);
   

const form = useForm<LoginFormvalues>({
    resolver : zodResolver(loginSchema),
    defaultValues:{
         email:'',
         password:''
    }

})

    return <Form {...form} >
         <form className="space-y-4">
            <FormField
            control={form.control}
            name="email"
            render={({field})=>(
                <FormItem>
                    <FormLabel>Email </FormLabel>
                    <FormControl>
                        <input className="rounded-xl p-2" placeholder="Enter your email" {...field} />
                    </FormControl>
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
                        <input className="rounded-xl p-2" placeholder="Enter your password" type="password" {...field} />
                    </FormControl>
                </FormItem>
            )}    
            />
            


         </form>
    </Form>
    
}

export default LoginForm;