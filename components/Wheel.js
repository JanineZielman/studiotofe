import React, { useState, useEffect } from 'react';
import { PrismicLink} from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export const Wheel = ({ projects }) => {
	useEffect(() => {
		const wheel = document.querySelector(".wheel");
		const cards = document.querySelectorAll(".card");
		const arrowLeft = document.querySelector(".arrow-left");
		const arrowRight = document.querySelector(".arrow-right");
		const centerPositioner = document.querySelector(".center-position");

		const num_cards = cards.length;
		const angle = 360 / num_cards;

		let theta = Math.PI / (num_cards / 2);
		let new_theta = 0.0;
		let new_x = 0.0;
		let new_y = 0.0;
		let rotate = 0.0;

		function setInitialPositions() {
			const center = {
				x: parseFloat(getComputedStyle(centerPositioner).left),
				y: parseFloat(getComputedStyle(centerPositioner).top)
			};
			const wheel_width = parseFloat(getComputedStyle(wheel).width);
			const wheel_radius = wheel_width / 2;

			cards.forEach((card, index) => {
				new_theta = theta * (index + num_cards / 4);
				new_x = Math.cos(new_theta) * wheel_radius;
				new_y = -1.0 * Math.sin(new_theta) * wheel_radius;

				card.style.left = `${center.x + new_x}px`;
				card.style.top = `${center.y + new_y}px`;
			});

		}

		function handleRotate(rotate, activeCard) {
			cards.forEach((card) => {
				card.classList.remove("active");
				card.classList.remove('current');
				card.style.transform = `translate(-50%, -50%) rotate(${-rotate}deg)`;
			});

			activeCard.classList.add("active");
			activeCard.classList.add('current');
			wheel.style.transform = `translate(-50%, -50%) rotate(${rotate}deg)`;
		}

		function onCardClick(card) {
			const activeCard = document.querySelector(".active");
			const nextIndex = parseFloat(card.dataset.index);
			const currentIndex = parseFloat(activeCard.dataset.index);

			let numOfRotations = nextIndex - currentIndex;

			if (numOfRotations < -num_cards / 2) {
				numOfRotations = numOfRotations + num_cards;
			}

			if (numOfRotations > num_cards / 2) {
				numOfRotations = numOfRotations - num_cards;
			}

			rotate = rotate + angle * numOfRotations;

			handleRotate(rotate, card);
		}

		setInitialPositions();

		window.addEventListener("resize", () => {
			setInitialPositions();
		});

		cards.forEach((card) => {
			card.onclick = function () {
				onCardClick(this);
			};
		});

		arrowLeft.onclick = function () {
			const activeCard = document.querySelector(".active");
			const currentIndex = parseFloat(activeCard.dataset.index);
			const nextIndex = currentIndex < num_cards ? currentIndex + 1 : 1;

			rotate = rotate + angle;
			const nextCard = document.querySelector(`[data-index="${nextIndex}"]`);

			handleRotate(rotate, nextCard);
		};

		arrowRight.onclick = function () {
			const activeCard = document.querySelector(".active");
			const currentIndex = parseFloat(activeCard.dataset.index);

			const nextIndex = currentIndex === 1 ? num_cards : currentIndex - 1;

			rotate = rotate - angle;
			const nextCard = document.querySelector(`[data-index="${nextIndex}"]`);

			handleRotate(rotate, nextCard);
		};

				
		const initialCard = document.querySelector(`[data-index="1"]`);
		initialCard.classList.add("current");


	});


  return (
    <div>
      <div className="wheel">
				<div className="center-position"></div>
				{projects.map((item , i) => {
					console.log(item)
					return(
						<div className="card active" data-index={i + 1} key={`card-${i}`}>
							<img src={item.data.cover_image.url} />
							<div className='info'>
								<p>{item.data.year}</p>
								<h1>{item.data.title}</h1>
								<p>{item.data.intro}</p>
								<div className='read-more'><PrismicLink href={item.url}>Read more</PrismicLink></div>
							</div>
						</div>
					)
				})}
				
			</div>

			<div className="arrows">
				<button className="arrow-left"><span>&larr;</span></button>
				<button className="arrow-right"><span>&rarr;</span></button>
			</div>
    </div>
  );
};
