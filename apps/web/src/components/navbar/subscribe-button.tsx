import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export function SubscribeButton() {
  return (
    <Link
      className={buttonVariants({ color: "orange", glowing: true })}
      href="/subscribe"
    >
      Subscribe
    </Link>
  );
}
