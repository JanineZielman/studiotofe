import { PrismicLink, PrismicText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import React from "react";

export const Header = ({ navigation, settings }) => {

  return (
    <header>
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
