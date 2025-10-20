import Link from "next/link";
import Image from "next/image";

export const Back = () => (
  <div className="o-container">
    <Link href="/" className="c-back" title="Back to home">
      <Image src="/back.svg" alt="Back" width={20} height={20} />
      <span>BACK</span>
    </Link>
  </div>
);
