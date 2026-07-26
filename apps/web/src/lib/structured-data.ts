import type { NewsMediaOrganization, WebSite } from "schema-dts";

import { socials } from "@/lib/data";
import { fullUrl } from "@/lib/utils";

export const newsMediaOrganization = {
  "@id": `${fullUrl()}#organization`,
  "@type": "NewsMediaOrganization",
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@bensonorbit.com",
  },
  description:
    "The student-run newspaper of Benson Polytechnic High School in Portland, Oregon.",
  email: "contact@bensonorbit.com",
  logo: {
    "@type": "ImageObject",
    height: "1024",
    url: fullUrl("/logo-1024.webp"),
    width: "1024",
  },
  name: "The Benson Orbit",
  sameAs: socials.map((social) => social.href),
  url: fullUrl(),
} satisfies NewsMediaOrganization;

export const webSite = {
  "@id": `${fullUrl()}#website`,
  "@type": "WebSite",
  alternateName: ["Benson Orbit", "The Orbit", "Orbit"],
  name: "The Benson Orbit",
  publisher: {
    "@id": newsMediaOrganization["@id"],
  },
  url: fullUrl(),
} satisfies WebSite;
