"use client";
import { Provider } from "react-redux";
import { setupStore } from "./store";

function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={setupStore()}>{children}</Provider>;
}

export default Providers;
