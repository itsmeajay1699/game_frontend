import axiosClient from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface User {
  username: string;
  netWin: number;
  isReal: boolean;
}

export default function Leaderboard() {
  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery<User[]>({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const res = await axiosClient.get("/leaderboard?days=7", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return res.data.data.map((user: any) => ({
        username: user.username,
        netWin: user.netWin,
        isReal: user.isReal,
      })) as User[];
    },
  });

  return (
    <div className="p-6 rounded-xl shadow-lg text-white w-full">
      <h2 className="text-xl font-semibold mb-4">
        🏆 Leaderboard (Last 7 Days)
      </h2>

      {isLoading && <p className="text-gray-400">Loading...</p>}
      {isError && (
        <p className="text-red-400">Error: {(error as Error).message}</p>
      )}

      <ul className="divide-y divide-white/10 rounded-xl overflow-hidden shadow-md border border-white/10">
        {users.map((user, i) => {
          const isTopThree = i < 3;
          const rankIcons = ["🥇", "🥈", "🥉"];

          return (
            <li
              key={user.username}
              className={`flex items-center justify-between px-4 py-3 transition-colors duration-200 
          ${isTopThree ? "bg-white/10" : "hover:bg-white/5"} 
          cursor-pointer backdrop-blur-sm`}
              onClick={() =>
                alert(
                  `User: ${user.username}\nNet Win: ₹${
                    user.netWin
                  }\nReal User: ${user.isReal ? "Yes" : "No"}`
                )
              }
            >
              {/* Rank + Username */}
              <div className="flex items-center gap-3">
                <span className="text-xl w-6 text-center">
                  {isTopThree ? rankIcons[i] : `#${i + 1}`}
                </span>
                <div>
                  <div
                    className={`text-sm ${
                      user.isReal
                        ? "font-semibold text-white"
                        : "italic text-white/70"
                    }`}
                  >
                    {user.username}
                  </div>
                  {user.isReal && (
                    <div className="text-xs text-green-300">Real Player</div>
                  )}
                </div>
              </div>

              {/* Net Win */}
              <div
                className={`text-right text-base ${
                  user.isReal ? "text-green-300 font-bold" : "text-yellow-200"
                }`}
              >
                ₹{user.netWin}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
