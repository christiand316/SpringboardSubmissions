"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkTypes = {
  children: React.ReactNode;
  href: string;
  className?: string;
  exact?: boolean;
};

//Thanks to https://www.danstroot.com/snippets/nextjs-navlink-component for showing me how to use this!
export default function NavLink({ children, exact, href, className, ...props }: NavLinkTypes) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link href={href} className={cn([`text-muted-foreground text-xl`, isActive && "text-primary font-semibold", className])} {...props}>
      {children}
    </Link>
  );
}
