import ReactDOM from "react-dom/client";
import type { Account } from "@/types";
import { App } from "./App";

export default defineContentScript({
  matches: ["https://*.awsapps.com/start/*", "https://*.console.aws.amazon.com/*"],
  async main(ctx) {
    if (window.location.href.includes("awsapps.com/start")) {
      // start page
      await sleep(3500); // 少し待機してからデータ取得
      const announcerEl = document.querySelector('[class*="awsui_announcer"]');
      const announcerContent = announcerEl?.textContent;
      if (!announcerContent) return;
      // 整形
      const items = announcerContent
        .replaceAll("|", "")
        .split(" ")
        .filter((item) => item.length > 0)
        .map((item) => item.trim());
      // 3 で割り切れなかったら終了
      if (items.length % 3 !== 0) return;
      // アカウントに変換してストレージに保存
      const accounts: Account[] = [];
      for (let i = 0; i < items.length; i += 3) {
        accounts.push({
          name: items[i],
          id: items[i + 1],
          email: items[i + 2],
        });
      }
      storage.setItem("local:accounts", accounts);
    } else if (window.location.href.includes("console.aws.amazon.com")) {
      // console page
      const accounts: Account[] | null = await storage.getItem("local:accounts");
      if (!accounts) return;
      const accountId = window.location.hostname.slice(0, 12);
      const account = accounts.find((item) => item.id === accountId);
      if (!account) return;
      console.log(account);
      const ui = createIntegratedUi(ctx, {
        position: "inline",
        anchor: "body",
        onMount: (container) => {
          const root = ReactDOM.createRoot(container);
          root.render(<App account={account} />);
          return root;
        },
        onRemove: (root) => {
          root?.unmount();
        },
      });

      ui.mount();
    }
  },
});

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
