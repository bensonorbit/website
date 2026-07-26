import type { SanityQueries } from "@sanity/client";
import { PortableText } from "next-sanity";
import type { InferStrictComponents, InferValue } from "next-sanity";
import Link from "next/link";
import type { ComponentProps } from "react";

import { ArticleImage } from "@/components/article-image";

type PortableTextValue = InferValue<SanityQueries[keyof SanityQueries]>;
type Components = InferStrictComponents<PortableTextValue>;

type LinkProps = ComponentProps<
  NonNullable<NonNullable<Components["marks"]>["link"]>
>;

function PortableTextLink(props: LinkProps) {
  const href = props.value?.href ?? "";
  const normalizedHref = href.startsWith("https://bensonorbit.com")
    ? href.replace("https://bensonorbit.com", "")
    : href;
  const isInternal = ["/", "#"].some((prefix) =>
    normalizedHref.startsWith(prefix)
  );

  if (isInternal) {
    return <Link href={normalizedHref}>{props.children}</Link>;
  }

  return (
    <a href={normalizedHref} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
}

type ImageProps = ComponentProps<
  NonNullable<NonNullable<Components["types"]>["image"]>
>;

function PortableTextImage(props: ImageProps) {
  return <ArticleImage {...props.value} />;
}

const components = {
  marks: {
    link: PortableTextLink,
  },
  types: {
    image: PortableTextImage,
  },
} satisfies Components;

export function CustomPortableText(props: {
  value?: PortableTextValue | null;
}) {
  if (!props.value) {
    return;
  }

  return <PortableText components={components} value={props.value} />;
}
