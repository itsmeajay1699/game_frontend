export default function Leaderboard() {
  const users = [
    { username: "Akshay", netWin: 2000 },
    { username: "Riya", netWin: 1750 },
    { username: "Sagar", netWin: 1600 },
  ];

  return (
    <div className="p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">🏆 Leaderboard (Last 7 Days)</h2>
      <ul className="space-y-2">
        {users.map((user, i) => (
          <li key={user.username} className="flex justify-between">
            <span>
              #{i + 1} {user.username}
            </span>
            <span>₹{user.netWin}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
