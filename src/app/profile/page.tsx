import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"



async function Profilepage()
{  
    const session = await auth.api.getSession({
        headers:await headers()
    })

    if(!session || !session.user){
        redirect('/')
    }

    return <main>
        <div className="max-w-7xl mx-auto px-4 my-8" >
            <div className="flex justify-between items-center mb-8" >
                  <div>
                    <h1 className="text-3xl font-bold" >Your Profile</h1>                   
                  </div>
                <Button asChild>
                    <Link href={`/post/create`} >
                    CreatePost
                       <PlusCircle className="h-5 w-5 mr-2" >
                          
                       </PlusCircle>
                    </Link>
                </Button>
            </div>
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>yout Profile info</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2" >
                        <div>
                            <span className="font-medium" >Name:</span> {session?.user.name}
                        </div>
                        <div>
                            <span className="font-medium" >Email:</span> {session?.user.email}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </main>
}

export default Profilepage