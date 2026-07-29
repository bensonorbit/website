import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { mergeMeta } from "@/lib/utils";

export const metadata = mergeMeta({ title: "Not Found" });

export default function NotFound() {
  return (
    <section className="grid min-h-[50vh] content-center py-12 md:py-20">
      <div className="mx-auto grid w-full max-w-5xl gap-10 py-10 sm:py-16 md:grid-cols-[minmax(0,1fr)_minmax(15rem,0.75fr)] md:items-center md:gap-16">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold text-balance sm:text-5xl leading-tight">
            That page drifted out of orbit.
          </h1>

          <p className="mt-5 font-sans leading-7 text-foreground-muted sm:text-lg">
            The address may be incorrect, or the page may have moved. Return to
            the home page, or let us know if a link sent you here.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 font-sans">
            <Link href="/" className={buttonVariants()}>
              Return home
            </Link>

            <a
              href="mailto:contact@bensonorbit.com?subject=Broken link"
              className={buttonVariants({ variant: "ghost" })}
            >
              Report a broken link
            </a>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="-order-1 overflow-hidden border-b pb-8 text-[clamp(6rem,22vw,13rem)] leading-[0.75] font-black tracking-[-0.08em] text-gray-200 select-none md:order-0 md:border-b-0 md:border-l md:pb-0 md:pl-12 md:text-[clamp(8rem,16vw,13rem)] dark:text-gray-800"
        >
          404
        </div>
      </div>
    </section>
  );
}
