import {
	PortableText,
	type PortableTextComponents,
	type PortableTextProps,
} from "next-sanity";
import Link from "next/link";
import { ArticleImage } from "@/components/ArticleImage";

export function CustomPortableText(props: {
	value?: PortableTextProps["value"] | null;
}) {
	if (!props.value) return;
	const components: PortableTextComponents = {
		marks: {
			link: ({ children, value }) => {
				const isInternal = value?.href?.startsWith("/");
				const LinkComponent = isInternal ? Link : "a";
				const target = isInternal ? undefined : "_blank";

				return (
					<LinkComponent href={value?.href} target={target}>
						{children}
					</LinkComponent>
				);
			},
		},
		types: {
			image: ({ value }) => <ArticleImage {...value} />,
		},
	};

	return <PortableText components={components} value={props.value} />;
}
