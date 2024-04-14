import { PrismicLink, PrismicText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import React from "react";
import { useRouter } from "next/router";


export const Header = ({ navigation, settings }) => {
	const router = useRouter();

  return (
    <header className={`${router.asPath == '/' && 'home'}`}>
			<a href="/"><div className="site-title"></div></a>
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
