import type { Metadata } from "next";
import Utility from "@/components/Utility";

export const metadata: Metadata = { title: "Coming soon", robots: { index: false } };

export default function ComingSoon() {
  return (
    <Utility img="/a/mascot-poses/mascot-read.webp" title="Coming soon">
      <p>New money games are on the way!</p>
    </Utility>
  );
}
