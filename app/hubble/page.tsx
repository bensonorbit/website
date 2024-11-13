// import { Fancybox } from "@/components/Fancybox";
import { mergeMeta } from "@/lib/utils";
import { HubbleQueryResult } from "@/sanity.types";
import { getHubblePhotos } from "@/sanity/fetch";
import { Image } from "next-sanity/image";

export const metadata = mergeMeta({ title: "The Hubble" });
export const dynamic = "force-static";

export default async function HubblePage() {
	const photos = await getHubblePhotos();

	return (
		<>
			<h2 className="max-w-3xl border-b pb-3 text-3xl font-bold md:text-4xl">
				The Hubble
			</h2>

			<p className="pt-3">Under construction ({photos.length} photos)</p>

			{/* <Fancybox /> */}
		</>
	);
}

function HubblePhoto(props: { photo: HubbleQueryResult[0]; index: number }) {
	if (!props.photo.image.url || !props.photo.image.aspectRatio) return null;
	const height = 800;
	const width = height * props.photo.image.aspectRatio;
	const lightboxSrc = `${props.photo.image.url}?w=1200&auto=format&fit=min`;

	return (
		<Image
			src={props.photo.image.url}
			width={width}
			height={height}
			alt={props.photo.alt || ""}
			priority={props.index <= 4}
			placeholder={props.photo.image.lqip ? "blur" : undefined}
			blurDataURL={props.photo.image.lqip || undefined}
			data-fancybox
			data-src={lightboxSrc}
			data-caption={props.photo.caption}
			className="rounded-sm drop-shadow-sm"
		/>
	);
}
