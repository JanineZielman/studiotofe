import { PrismicLink, PrismicText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export const Header = ({ navigation, settings }) => {
	const router = useRouter();

  return (
    <header className={`${router.asPath == '/' && 'home'}`}>
			<Link href="/"><a className="site-title"></a></Link>
      <div className="menu">
				{navigation.data?.links.map((item) => (
					<PrismicLink field={item.link} key={prismicH.asText(item.label)}>
						<PrismicText field={item.label} />
					</PrismicLink>
				))}
			</div>
    </header>
  );
};
