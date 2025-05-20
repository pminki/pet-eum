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

const menus = [  
  {
    name: "이용방법",
    to: "/guide",
  },
  {
    name: "예약하기",
    to: "/booking",
  },
  {
    name: "커뮤니티",
    to: "/community",
    items: [
      {
        name: "전체글",
        description: "전체글이예요",
        to: "/community",
      },
      {
        name: "인기글",
        description: "요즘 가장 핫한 글이예요요",
        to: "/community?sort=top",
      },
      {
        name: "최근글",
        description: "최근에 올라온 글 목록이예요",
        to: "/community?sort=new",
      },
      {
        name: "글쓰기",
        description: "커뮤니티에 글을 올릴 수 있어요",
        to: "/community/create",
      },
    ],
  },  
  {
    name: "보호자",
    to: "/guardian",
    items: [
      {
        name: "나의 반려동물",
        description: "나의 반려동물 정보를 관리하세요",
        to: "/guardian/pets",
      },
      {
        name: "예약 내역",
        description: "나의 예약 정보",
        to: "/guardian/bookings",
      },
      {
        name: "결제 정보",
        description: "나의 결제 내역",
        to: "/guardian/payment",
      },
    ],
  },
  {
    name: "도우미",
    to: "/helper",
    items: [
      {
        name: "도우미 프로필",
        description: "도우미 프로필필",
        to: "/helper/id",
      },
      {
        name: "도우미 예약 현황",
        description: "도우미의 예약 현황",
        to: "/helper/booking",
      },
    ],
  },
];

export default function Navigation() {
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
                      <ul className="grid w-[600px] font-light gap-3 p-4 grid-cols-2">
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
                                <span className="text-sm font-medium leading-none">
                                  {item.name}
                                </span>
                                <p className="text-xs font-medium leading-none">
                                  {item.description}
                                </p>
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
    </nav>
  );
}