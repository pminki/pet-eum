import { Link } from "react-router";
import { Separator } from "~/common/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";
import { BarChart3Icon, BellIcon, CalendarDays, CreditCard, LogOutIcon, MessageCircleIcon, SettingsIcon, UserIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const menus = [  
  {
    name: "서비스 찾기",
    to: "/services",
    items: [
      {
        name: "펫시팅",
        description:  "방문/위탁",
        to: "pet-sitting",
      },
      {
        name: "도그워킹",
        description:  "산책 서비스",
        to: "dog-walking",
      },
      {
        name: "데이케어",
        description:  "낮 시간 돌봄",
        to: "day-care",
      },
      {
        name: "하우스시팅",
        description:  "펫시터가 집에서 돌봄",
        to: "house-sitting",
      },
    ]
  },
  {
    name: "펫시터 되기",
    to: "/become-sitter",
  },
  {
    name: "리뷰",
    to: "/review",
  },
];

export default function Navigation({
  isLoggedIn,
  hasNotifications,
  hasMessages,
}: {
  isLoggedIn: boolean;
  hasNotifications: boolean;
  hasMessages: boolean;
}) {
  return (
    <nav className="flex px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50">
      <div className="flex items-center">
        <Link to="/" className="font-bold tracking-tighter text-lg">
          😽 Pet-Eum
        </Link>
        <Separator orientation="vertical" className="h-6 mx-4" />
        <NavigationMenu>
          <NavigationMenuList>
            {menus.map((menu) => (
               <NavigationMenuItem key={menu.name}>
                {menu.items ? (
                  <>
                    <Link to={menu.to}>
                      <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                    </Link>
                    <NavigationMenuContent>
                      <ul className="grid w-[250px] font-light gap-1 p-1 grid-cols-1">
                        {menu.items?.map((item) => (
                          <NavigationMenuItem
                            key={item.name}
                            className={cn([
                              "select-none rounded-md transition-colors focus:bg-accent  hover:bg-accent",
                              item.to === "/guardian/bookings" &&
                                "bg-primary/10 hover:bg-primary/20 focus:bg-primary/20",
                              item.to === "/helper/booking" &&
                                "bg-primary/10 hover:bg-primary/20 focus:bg-primary/20",
                            ])}
                          >
                            <NavigationMenuLink asChild>
                              <Link
                                className="p-3 space-y-1 block leading-none no-underline outline-none"
                                to={item.to}
                              >
                                <div className="text-sm font-medium leading-none inline-block">
                                  {item.name} 
                                  <span className="ms-1 text-xs inline-block">({item.description})</span>
                                </div>                                
                              </Link>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        ))}                        
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link className={navigationMenuTriggerStyle()} to={menu.to}>
                    {menu.name}
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {isLoggedIn ? (
        <div className="flex items-center gap-4">
          <Button size="icon" variant="ghost" asChild className="relative">
            <Link to="/my/notifications">
              <BellIcon className="size-4" />
              {hasNotifications && (
                <div className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full" />
              )}
            </Link>
          </Button>
          <Button size="icon" variant="ghost" asChild className="relative">
            <Link to="my/messages">
              <MessageCircleIcon className="size-4" />
              {hasMessages && (
                <div className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full" />
              )}
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <Avatar>
                <AvatarImage src="https://github.com/pm1nk1.png" />
                <AvatarFallback>P</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 me-3">
              <DropdownMenuLabel className="flex flex-col">
                <span className="font-medium">아롱이</span>
                <span className="text-xs text-muted-foreground">@username</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="my/dashboard">
                    <BarChart3Icon className="size-4 mr-2" />
                    대시보드
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="my/profile">
                    <UserIcon className="size-4 mr-2" />
                    프로필
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="my/bookings">
                    <CalendarDays className="size-4 mr-2" />
                    예약내역
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="my/payment">
                    <CreditCard className="size-4 mr-2" />
                    결제정보
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/settings">
                    <SettingsIcon className="size-4 mr-2" />
                    설정
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="auth/logout">
                  <LogOutIcon className="size-4 mr-2" />
                  로그아웃
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Button asChild variant="secondary">
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/auth/join">Join</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}