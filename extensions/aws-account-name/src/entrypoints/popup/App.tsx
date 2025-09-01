import type { Account } from "@/types";

import "./App.css";

async function App() {
  const accounts: Account[] | null = await storage.getItem("local:accounts");

  if (!accounts) return <div>No accounts found.</div>;

  return (
    <div>
      a
      {accounts.map((account) => (
        <div key={account.id}>{account.id}</div>
      ))}
    </div>
  );
}

export default App;
