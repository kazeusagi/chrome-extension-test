import { useState } from "react";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
import "./App.css";
import type { Account } from "@/types";

async function App() {
  const [count, setCount] = useState(0);
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
