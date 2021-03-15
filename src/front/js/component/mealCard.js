import React from "react";
import PropTypes from "prop-types";

export function MealCard(props) {
	return (
		<div className="col-3 text-center">
			<img src={props.image_url} id="img-menu" />
			<h3 id="name-menu">{props.name}</h3>
		</div>
	);
}

MealCard.propTypes = {
	image_url: PropTypes.string,
	name: PropTypes.string
};
