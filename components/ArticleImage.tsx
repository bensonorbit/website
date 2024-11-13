import { Image } from "next-sanity/image";

type Props = {
	alt: string | null;
	aspectRatio: number | null;
	url: string | null;
	caption?: string | null;
	lqip: string | null;
	isCover?: boolean;
};

export function ArticleImage(props: Props) {
	if (!props.url || !props.aspectRatio) return null;
	const height = 800;
	const width = height * props.aspectRatio;
	const lightboxSrc = `${props.url}?w=1200&auto=format&fit=min`;

	return (
		<figure className={props.isCover ? "my-4" : undefined}>
			<Image
				src={props.url}
				width={width}
				height={height}
				alt={props.alt || ""}
				sizes="(max-width: 581px) 100vw, 581px"
				priority={props.isCover}
				placeholder={props.lqip ? "blur" : undefined}
				blurDataURL={props.lqip || undefined}
				data-fancybox
				data-src={lightboxSrc}
				data-caption={props.caption}
			/>

			{props.caption && <figcaption>{props.caption}</figcaption>}
		</figure>
	);
}
