import Image from "next/image";
import Link from "next/link";

import { socials } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t bg-gray-100 text-sm text-gray-600 md:text-base dark:bg-black dark:text-gray-400">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-8 px-6 py-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-x-10 lg:py-12 xl:border-x print:px-0">
        <section className="flex max-w-sm flex-col items-start gap-3 sm:col-span-2 lg:col-span-2">
          <FooterWordmark />

          <p>
            The student-run newspaper of Benson Polytechnic High School in
            Portland, Oregon.
          </p>

          <p className="mt-1 text-xs">
            &copy; 2024-{year} The Benson Orbit. All rights reserved.
          </p>
        </section>

        <FooterSection
          title="Sections"
          links={[
            { href: "/news", label: "News" },
            { href: "/sports", label: "Sports" },
            { href: "/culture", label: "Culture" },
            { href: "/opinion", label: "Opinion" },
          ]}
        />

        <FooterSection
          title="About"
          links={[
            { href: "/about", label: "About Us" },
            { href: "/contact", label: "Contact Us" },
            { href: "/advertise", label: "Advertise" },
          ]}
        />

        <FooterSection
          title="Benson"
          links={[
            { href: "https://benson.pps.net", label: "Website" },
            { href: "https://trivory.com/benson", label: "Trivory" },
            { href: "http://kbps.am", label: "KBPS" },
            { href: "https://bensontechalumni.org/", label: "Alumni" },
          ]}
        />

        <FooterSection
          title="Follow"
          links={socials.map((s) => ({ href: s.href, label: s.name }))}
        />

        <p className="hidden print:col-span-full print:block">
          bensonorbit.com
        </p>
      </div>
    </footer>
  );
}

function FooterWordmark() {
  return (
    <Link href="/" aria-label="The Benson Orbit" className="group block w-56">
      <Image
        src="/wordmark-color.svg"
        width={726}
        height={107}
        alt=""
        aria-hidden="true"
        className="block h-auto w-full transition-[filter] filter-[contrast(0)_brightness(64%)_grayscale(1)] group-hover:filter-[contrast(1)_brightness(1)_grayscale(0)] group-focus-visible:filter-[contrast(1)_brightness(1)_grayscale(0)] motion-reduce:transition-none dark:filter-[contrast(0)_brightness(126%)_grayscale(1)] dark:group-hover:filter-[contrast(1)_brightness(1)_grayscale(0)] dark:group-focus-visible:filter-[contrast(1)_brightness(1)_grayscale(0)]"
      />
    </Link>
  );
}

function FooterSection(props: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <section className="border-t pt-6 sm:border-0 sm:pt-0">
      <h2 className="text-sm font-bold uppercase tracking-widest">
        {props.title}
      </h2>

      <ul className="mt-3 flex flex-col gap-2">
        {props.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="hover:underline focus-visible:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
