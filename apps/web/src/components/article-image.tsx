import { Image } from "next-sanity/image";

interface Props {
  alt: string | null;
  aspectRatio: number | null;
  url: string | null;
  caption?: string | null;
  credit?: string | null;
  lqip: string | null;
  isCover?: boolean;
}

export function ArticleImage(props: Props) {
  if (!props.url || !props.aspectRatio) {
    return null;
  }
  const height = 800;
  const width = height * props.aspectRatio;
  const lightboxSrc = `${props.url}?w=1200&auto=format&fit=min`;

  return (
    <figure className={props.isCover ? "mt-6 mb-6" : undefined}>
      <Image
        src={props.url}
        width={width}
        height={height}
        alt={props.alt || ""}
        className="rounded-sm drop-shadow-xs hover:cursor-zoom-in"
        sizes="(max-width: 629px) calc(100vw - 48px), 581px"
        fetchPriority={props.isCover ? "high" : undefined}
        loading={props.isCover ? "eager" : undefined}
        placeholder={props.lqip ? "blur" : undefined}
        blurDataURL={props.lqip || undefined}
        data-fancybox
        data-src={lightboxSrc}
        data-caption={props.caption}
      />
      {(props.caption || props.credit) && (
        <figcaption
          className={
            props.isCover
              ? "mt-2 font-sans text-sm leading-relaxed text-foreground-muted"
              : "font-sans"
          }
        >
          {props.caption}
          {props.credit && <span className="text-xs"> {props.credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
