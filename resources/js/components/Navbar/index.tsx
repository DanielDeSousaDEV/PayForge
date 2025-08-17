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
import { CircleUserRound, ShoppingBag } from "lucide-react"
import { PagesWithLayout } from "@/types/inertia"

const Navbar: PagesWithLayout = () => {

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
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href='/bag'
                                        className="group/bag flex items-center p-2 rounded hover:bg-primary transition-colors"
                                    >
                                        <ShoppingBag className="size-6 text-gray-800 group-hover/bag:text-gray-100 transition-colors" />
                                    </Link>
                                </NavigationMenuLink> 
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href='/profile'
                                        className="group/profile flex items-center p-2 rounded hover:bg-primary transition-colors"
                                    >
                                        <CircleUserRound className="size-6 text-gray-800 group-hover/profile:text-gray-100 transition-colors" />
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