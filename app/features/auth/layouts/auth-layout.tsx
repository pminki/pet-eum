import { FlickeringGrid } from "components/magicui/flickering-grid";
import { Outlet } from "react-router";

export default function Authlayout() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <div>
        <FlickeringGrid 
          squareSize={4}
          gridGap={5}
          maxOpacity={0.5}
          flickerChance={0.2}
          color="#6495ED"
        />
      </div>
      <Outlet />
    </div>
  );
}
