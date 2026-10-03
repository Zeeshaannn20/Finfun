import Link from "next/link";
import Utility from "@/components/Utility";

export default function NotFound() {
  return (
    <Utility img="/a/sticker/06-rupi-thinks.webp" title="Oops! Page not found"
      actions={<><Link className="btn btn-lg" href="/">Go home</Link><Link className="btn btn-white btn-lg" href="/programs">See programs</Link></>}>
      <p>This coin rolled away. Let’s get you back on track.</p>
    </Utility>
  );
}
