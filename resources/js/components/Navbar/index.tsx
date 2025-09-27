import HomeLayout from "@/layouts/HomeLayout"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Link, usePage } from "@inertiajs/react"
import { Box, CircleUserRound, ShoppingCart, UserCog2Icon } from "lucide-react"
import { PagesWithLayout } from "@/types/inertia"
import { cn } from "@/lib/utils"
import { ProtectedAdminView } from "../ProtectedAdminView"

const Navbar: PagesWithLayout = () => {
    const {url} = usePage()

    return (
        <header className="bg-quarter sticky top-0 z-10">
            <div className="container mx-auto py-4 px-2 flex flex-row items-center justify-between">
                <Link href='/' prefetch>
                    <h1 className="text-2xl font-semibold font-heading">PayForge</h1>   
                </Link>

                <nav>
                    <NavigationMenu>
                        <NavigationMenuList>
                            {/* <NavigationMenuItem>
                                <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <NavigationMenuLink>Link</NavigationMenuLink>
                                </NavigationMenuContent>
                            </NavigationMenuItem> */}
                            <ProtectedAdminView>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href='/admin/users'
                                            prefetch
                                            className={cn(
                                                'group/bag flex items-center p-2 rounded transition-colors focus:bg-primary',
                                                url.startsWith('/admin/users') 
                                                    ? 'bg-primary' 
                                                    : ''
                                            )}
                                        >
                                            <UserCog2Icon
                                                className={cn(
                                                    "size-6 text-gray group-active/bag:text-black transition-colors",
                                                    url.startsWith('/admin/users') 
                                                        ? 'stroke-gray-100' 
                                                        : ''
                                                )} 
                                            />
                                        </Link>
                                    </NavigationMenuLink> 
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href='/admin/products'
                                            prefetch
                                            className={cn(
                                                'group/bag flex items-center p-2 rounded transition-colors focus:bg-primary',
                                                url.startsWith('/admin/products') 
                                                    ? 'bg-primary' 
                                                    : ''
                                            )}
                                        >
                                            <Box
                                                className={cn(
                                                    "size-6 text-gray group-active/bag:text-black transition-colors",
                                                    url.startsWith('/admin/products') 
                                                        ? 'stroke-gray-100' 
                                                        : ''
                                                )} 
                                            />
                                        </Link>
                                    </NavigationMenuLink> 
                                </NavigationMenuItem>
                            </ProtectedAdminView>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href='/cart'
                                        prefetch
                                        className={cn(
                                            'group/bag flex items-center p-2 rounded transition-colors focus:bg-primary',
                                            url.startsWith('/cart') 
                                                ? 'bg-primary' 
                                                : ''
                                        )}
                                    >
                                        <ShoppingCart 
                                            className={cn(
                                                "size-6 text-gray group-active/bag:text-black transition-colors",
                                                url.startsWith('/cart') 
                                                    ? 'stroke-gray-100' 
                                                    : ''
                                            )} 
                                        />
                                    </Link>
                                </NavigationMenuLink> 
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href='/profile'
                                        prefetch
                                        className={cn(
                                            'group/profile flex items-center p-2 rounded transition-colors focus:bg-primary',
                                            url.startsWith('/profile') 
                                                ? 'bg-primary' 
                                                : ''
                                        )}
                                    >
                                        <CircleUserRound 
                                            className={cn(
                                                "size-6 text-gray-800 group-active/profile:text-black transition-colors",
                                                url.startsWith('/profile') 
                                                    ? 'stroke-gray-100' 
                                                    : ''
                                            )} 
                                        />
                                    </Link>
                                </NavigationMenuLink>   
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </nav>
            </div>
        </header>
    )
}

Navbar.layout = (page) => <HomeLayout children={page} />

export default Navbar