import { PrismicLink, PrismicText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import Modal from 'react-modal';
import React from "react";

export const Header = ({ navigation, settings }) => {
  const customStyles = {
		content: {
			top: '0px',
			right: '0px',
      position: 'absolute',
			backgroundColor: 'black',
			zIndex: '999',
		},
	};

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
  }

	function closeAfterClick(){
		setTimeout(setIsOpen(false), 3000);
	}

  return (
    <section>
      <div onClick={openModal} className="hamburger"></div>
			<Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
				<div className="close" onClick={closeModal}>X</div>
				<div className="nav-links">
          <div className="nav-item">
            <a href={`/`}>
              Work
            </a>
          </div>
					{navigation.data?.links.map((item) => (
						<div
							key={prismicH.asText(item.label)}
							className="nav-item"
						>
							<a href={`/${item.link.uid}`}>
								<PrismicText field={item.label} />
							</a>
						</div>
					))}
				</div>
				
			</Modal>
    </section>
  );
};
