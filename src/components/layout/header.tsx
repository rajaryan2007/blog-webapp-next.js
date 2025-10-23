'use client';

import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { useSession } from "@/lib/auth-client";
import UserMenu from "../auth/user-menu";


function Header(){
    const {data:session, isPending} = useSession()
    const router = useRouter()



    const navItems =[{
        label:'Home',href:'/',
    },
    {
        label:'Create Post',href:'/post/create',
    }
]

    return <header className="border-b bg-background sticky top-0 z-10" >
          <div className="container mx-auto px-4 h-16 flex items-center justify-between" >
             <div className="flex items-center gap-6"  >
                    <Link href="/"  className="font-bold text-xl" >
                    Next.js 15 Blog
                    </Link>
                    <nav className="hidden md:flex items-center gap-6" >
                        {navItems.map(navItems=>(
                               <Link key={navItems.href}
                               
                               href={navItems.href}
                               className={cn('tesaxt-sm font-medium transtion-color')}
                               >
                                {navItems.label}
                               </Link> 
                        ))
                        }

                    </nav>
             </div>
             <div className="flex items-center gap-4"  >
                 <div className="hidden md:block" >
                       
                        <div className="flex items-center gap-2" >
                            {
                                isPending? null:
                                session?.user?(
                                    <UserMenu user={session?.user}/>
                                ):(
                                    <Button
                                    className="cursor-pointer"
                                    onClick={()=>router.push("/auth")}
                                    >
                                    login
                                    </Button>
                                )
                            
                            }
                        </div>
                       
                 </div>
             </div>
          </div>
    </header>
}

export default Header