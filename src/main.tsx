import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./app/App";

async function enableMocking() {
    if (process.env.NODE_ENV !== "development") {
        return;
    }

    const { worker } = await import("./mocks/browser");

    return worker.start();
}

enableMocking().then(() => {
    const root = createRoot(document.getElementById("root")!);
    root.render(<App />);
});
