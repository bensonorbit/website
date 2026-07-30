import Link from "next/link";
import { Fragment } from "react";

export function Authors(props: {
  authors: { name: string; slug: string | null }[] | null;
  max?: number;
  link?: boolean;
  className?: string;
}) {
  let { authors } = props;
  if (!authors || !authors.length) {
    return null;
  }
  if (props.max) {
    authors = authors.slice(0, props.max);
  }

  return authors.map((author, i) => (
    <Fragment key={author.slug}>
      {separator(i, authors.length)}

      {props.link ? (
        <Link href={`/authors/${author.slug}`} className={props.className}>
          {author.name}
        </Link>
      ) : (
        <span className={props.className}>{author.name}</span>
      )}
    </Fragment>
  ));
}

function separator(i: number, length: number) {
  if (i === 0) {
    return null;
  }
  if (i === length - 1) {
    if (length > 2) {
      return ", and ";
    }
    return " & ";
  }
  return ", ";
}
