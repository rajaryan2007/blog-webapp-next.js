"use client"

import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { User } from "better-auth";
import { DropdownMenuContent } from "../ui/dropdown-menu";
import { Link, LogOut, PenSquare, UserIcon } from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UserMenuProps {
    user: User
}



function UserMenu({ user }: UserMenuProps) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const getInitial = (name: string) => {
        return name ? name.split(" ").map(n => n[0]).join('').toUpperCase() : "U"
    }

    const handleLogout = async () => {
        setIsLoading(true)
        try {
            await signOut({
                fetchOptions: {
                    onSuccess: () => {
                        toast("you have been logged out successfully")
                        router.refresh()
                    }
                }
            })
        } catch (e) {
            console.log(e);
            toast("failed to log out")

        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className="relative h-8 rounded-full">
                    <Avatar className="h-9 w-8">
                        <AvatarFallback>
                            {getInitial(user?.name)}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-bold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link href="/profile">
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Create post</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link href="/post/create">
                        <PenSquare className="mr-2 h-4 w-4" />
                        <span></span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="cursor-pointer flex items-center gap-2"
                >
                    <LogOut className="h-4 w-4" />
                    <span>{isLoading ? "Logging out..." : "Logout"}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserMenu;
