'use client'

import {z} from "zod";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormField} from "@/components/ui/form";

const registerSchema = z.object({
    name:z.string(),
    email:z.string().email("please enter the valid email address"),
    Password:z.string().min(6, "please enter your password"),
    confirmPassword:z.string().min(6, "please enter your password"),
}).refine((data)=>data.Password === data.confirmPassword,{
      message:"Password is incorrect",
      path:["confirmPassword","password"],


});

type RegisterFormvalue = z.infer<typeof registerSchema>


function RegisterForm(){
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const form = useForm<RegisterFormvalue>({
        resolver:zodResolver(registerSchema),
        defaultValues:{
        name:'',
        Password:'',
        email:'',
        confirmPassword: ''
        }
    })


    return <Form {...form}>
        <form className='space-y-4' >
            <FormField render={} name={}>


            </FormField>

        </form>



    </Form>

}

export default RegisterForm;

