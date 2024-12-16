import { Image } from "next-sanity/image";

type Props = {
	alt: string | null;
	aspectRatio: number | null;
	url: string | null;
	caption?: string | null;
	credit?: string | null;
	lqip: string | null;
	isCover?: boolean;
	style?: React.CSSProperties;
};

export function ArticleImage(props: Props) {
	if (!props.url || !props.aspectRatio) return null;
	const height = 800;
	const width = height * props.aspectRatio;
	const lightboxSrc = `${props.url}?w=1200&auto=format&fit=min`;

	return (
		<figure className={props.isCover ? "mt-4 mb-4" : undefined}>
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
				style={props.style}
			/>
			{(props.caption || props.credit) && (
				<figcaption>
					{props.caption}
					{props.credit && <span className="text-xs"> {props.credit}</span>}
				</figcaption>
			)}
		</figure>
	);
}
