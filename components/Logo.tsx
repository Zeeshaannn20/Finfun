import Link from "next/link";
import Img from "./Img";

export default function Logo() {
  return (
    <Link href="/" className="logo" aria-label="FinFun home">
      <Img src="/a/logo.webp" alt="FinFun" sizes="140px" priority />
    </Link>
  );
}
