'use client';

import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { useSession } from "@/lib/auth-client";
import UserMenu from "../auth/user-menu";
import ThemeToggle from "../theme/theme-toggle";

function Header() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Create Post', href: '/post/create' },
  ];

  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl">
            Next.js 15 Blog
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right side */}
        <div className="  items-center gap-4">
          <ThemeToggle />
          {!isPending && (
            session?.user ? (
              <UserMenu user={session.user} />
            ) : (
              <Button onClick={() => router.push("/auth")}>Login</Button>
            )
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
