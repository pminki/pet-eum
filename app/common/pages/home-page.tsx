import { Button } from "../components/ui/button";


export default function HomePage() {
  return (
    <main className="coutainer mx-auto px-4 py-8">
      <div className="mt-20 text-center">
        <h1 className="text-4xl font-bold mb-6">🐶 펫이음에 오신 걸 환영합니다.🐱</h1>
        <p className="text-lg mb-8">
          반려동물을 친구 같이 돌봐줄 도우미를 만나 보세요
        </p>
        <Button variant="default">도우미 만나기</Button>
      </div>      
    </main>
  );
}