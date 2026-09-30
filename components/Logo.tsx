import Link from "next/link";

// TODO(FinFun): replace with the official SVG logo once supplied.
export default function Logo() {
  return (
    <Link href="/" className="logo" aria-label="FinFun home">
      <span className="logo-coin" aria-hidden="true">
        ₹
      </span>
      FINFUN
    </Link>
  );
}
