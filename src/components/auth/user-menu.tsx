"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "../ui/button"
import { User } from "better-auth"
import { LogOut, PenSquare, UserIcon } from "lucide-react"
import { signOut } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"

interface UserMenuProps {
  user: User
}

function UserMenu({ user }: UserMenuProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const getInitial = (name?: string) =>
    name ? name.split(" ").map((n) => n[0]).join("").toUpperCase() : "U"

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast("You have been logged out successfully")
            router.refresh()
          },
        },
      })
    } catch (e) {
      console.error(e)
      toast("Failed to log out")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 rounded-full">
          <Avatar className="h-8 w-8">
            {/* If you ever add image later */}
            {/* <AvatarImage src={user.image || ""} alt={user.name} /> */}
            <AvatarFallback>{getInitial(user?.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center gap-2 p-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{getInitial(user?.name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/post/create" className="flex items-center">
            <PenSquare className="mr-2 h-4 w-4" />
            <span>Create Post</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLoading}
          className="cursor-pointer flex items-center gap-2 text-red-600 focus:text-red-700"
        >
          <LogOut className="h-4 w-4" />
          <span>{isLoading ? "Logging out..." : "Logout"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu
