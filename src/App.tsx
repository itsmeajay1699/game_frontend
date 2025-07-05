import { Button } from "@/components/ui/button";
import { Card } from "./components/ui/card";

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
      <Button className="bg-primaryGreen text-textDark font-bold hover:scale-105 transition">
        Spin Now
      </Button>
      <Card className="bg-textDark text-white shadow-md p-4 rounded-xl">
        <h2 className="text-xl font-semibold">Leaderboard</h2>
      </Card>
    </div>
  );
}

export default App;
