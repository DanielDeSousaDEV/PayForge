import HomeLayout from "@/layouts/HomeLayout";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Link, usePage } from "@inertiajs/react";
import { Box, CircleUserRound, ShoppingCart, UserCog2Icon } from "lucide-react";
import { PagesWithLayout } from "@/types/inertia";
import { cn } from "@/lib/utils";
import { ProtectedAdminView } from "../ProtectedAdminView";

const Navbar: PagesWithLayout = () => {
    const { url, props: {productQuantityInCart} } = usePage();

    return (
        <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] sticky top-0 z-20 backdrop-blur-lg bg-opacity-90">
            <div className="container mx-auto py-3 px-4 flex items-center justify-between">
                <Link href="/" prefetch>
                    <h1 className="text-2xl font-heading font-bold text-[var(--color-primary)] tracking-tight hover:opacity-90 transition-opacity">
                        PayForge
                    </h1>
                </Link>

                <nav>
                    <ul className="flex items-center gap-2 md:gap-4">
                        <ProtectedAdminView>
                            <li>
                                <Link
                                    href="/admin/users"
                                    prefetch
                                    className={cn(
                                        "p-2 rounded-md flex items-center justify-center transition-all duration-200 hover:bg-[var(--color-primary)]/20",
                                        url.startsWith("/admin/users") &&
                                            "bg-[var(--color-primary)] text-white"
                                    )}
                                >
                                    <UserCog2Icon
                                        className={cn(
                                            "size-6 transition-colors",
                                            url.startsWith("/admin/users")
                                                ? "stroke-[var(--color-text)]"
                                                : "stroke-[var(--color-text-muted)]"
                                        )}
                                    />
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/admin/products"
                                    prefetch
                                    className={cn(
                                        "p-2 rounded-md flex items-center justify-center transition-all duration-200 hover:bg-[var(--color-primary)]/20",
                                        url.startsWith("/admin/products") &&
                                            "bg-[var(--color-primary)] text-white"
                                    )}
                                >
                                    <Box
                                        className={cn(
                                            "size-6 transition-colors",
                                            url.startsWith("/admin/products")
                                                ? "stroke-[var(--color-text)]"
                                                : "stroke-[var(--color-text-muted)]"
                                        )}
                                    />
                                </Link>
                            </li>
                        </ProtectedAdminView>

                        <li>
                            <Link
                                href="/cart"
                                prefetch
                                className={cn(
                                    "relative p-2 rounded-md flex items-center justify-center transition-all duration-200 hover:bg-[var(--color-primary)]/20",
                                    url.startsWith("/cart") &&
                                        "bg-[var(--color-primary)] text-white"
                                )}
                            >
                                <ShoppingCart
                                    className={cn(
                                        "size-6 transition-colors",
                                        url.startsWith("/cart")
                                            ? "stroke-[var(--color-text)]"
                                            : "stroke-[var(--color-text-muted)]"
                                    )}
                                />

                                {productQuantityInCart && 
                                    <span className="absolute -top-1 -right-1 bg-[var(--color-danger)] text-[10px] font-bold text-white rounded-full px-1.5">
                                        {productQuantityInCart}
                                    </span>
                                }
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/profile"
                                prefetch
                                className={cn(
                                    "p-2 rounded-md flex items-center justify-center transition-all duration-200 hover:bg-[var(--color-primary)]/20",
                                    url.startsWith("/profile") &&
                                        "bg-[var(--color-primary)] text-white"
                                )}
                            >
                                <CircleUserRound
                                    className={cn(
                                        "size-6 transition-colors",
                                        url.startsWith("/profile")
                                            ? "stroke-[var(--color-text)]"
                                            : "stroke-[var(--color-text-muted)]"
                                    )}
                                />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

Navbar.layout = (page) => <HomeLayout children={page} />;

export default Navbar;
