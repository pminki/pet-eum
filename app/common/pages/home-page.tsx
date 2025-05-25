import { Cat, Dog, Heart, HeartHandshake, UserRoundSearch, UsersRound} from "lucide-react";
import { Button } from "../components/ui/button";
import { OrbitingCircles } from "components/magicui/orbiting-circles";
import { Link } from "react-router";

const Icons = {
  dog: () => (
    <Dog className="size-10 text-gray-400" />
  ),
  cat: () => (
    <Cat className="size-10 text-yellow-400" />
  ),
  people: () => (
    <UsersRound className="size-10 text-green-300" />
  ),
  helper: () => (
    <HeartHandshake  className="size-10 text-blue-300" />
  ),
  love: () => (
    <Heart className="size-10 text-red-300" />
  ),
};

export default function HomePage() {
  return (
    <main className="coutainer mx-auto px-4 py-8">
      <section className="overflow-hidden py-20">
        <div className="container">
          <div className="flex flex-col gap-5">
            <div className="relative flex flex-col gap-5">
              <div
                style={{
                  transform: "translate(-50%, -50%)",
                }}
                className="absolute top-1/2 left-1/2 -z-10 mx-auto size-[800px] rounded-full border p-16 [mask-image:linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] md:size-[1300px] md:p-32"
              >
                <div className="size-full rounded-full border p-16 md:p-32">
                  <div className="size-full rounded-full border"></div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <span className="flex size-16 items-center justify-center rounded-full border md:size-20">
                  <Dog className="size-12 text-gray-400" />
                </span>
                <span className="flex size-16 items-center justify-center rounded-full border md:size-20">
                  <Cat className="size-12 text-yellow-400" />
                </span>
              </div>              
              <h2 className="mx-auto max-w-5xl text-center text-3xl font-bold text-balance md:text-6xl">
                반려동물 돌봄 서비스
              </h2>
              <p className="mx-auto max-w-3xl text-center text-muted-foreground md:text-lg">
                v
              </p>
              <div className="flex flex-col items-center justify-center gap-3 pt-3 pb-12">
                <Button size="lg" asChild>
                  <Link
                    to="/services"
                  >
                    펫시터 찾기<UserRoundSearch className="ml-2 size-4" />
                  </Link>
                </Button>
                <div className="text-muted-foreground">소중한 나의 반려동물을 믿을 수 있는 펫시터에게 맡겨 보세요~</div>
              </div>
            </div>
            <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
              <OrbitingCircles iconSize={40}>
                <Icons.dog />
                <Icons.cat />
                <Icons.people />
                <Icons.helper />
                <Icons.love />
              </OrbitingCircles>
              <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
                <Icons.love />
                <Icons.people />
                <Icons.helper />
                <Icons.dog />
                <Icons.cat />
              </OrbitingCircles>
            </div>
          </div>
        </div>        
      </section>  
    </main>
  );
}