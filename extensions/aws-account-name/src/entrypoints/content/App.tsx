import type { Account } from "@/types";

type Props = {
  account: Account;
};

export function App({ account }: Props) {
  const [count, setCount] = useState(0);

  return (
    <div style={{ position: "fixed", top: "58px", right: "16px", zIndex: 10000 }}>
      <button type="button" onClick={onClick}>
        {account.name}
      </button>
    </div>
  );

  function onClick() {
    setCount((prev) => prev + 1);
    console.log(count);
  }
}
