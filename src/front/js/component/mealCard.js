import React from "react";
import PropTypes from "prop-types";

export function MealCard(props) {
	return (
		<div className="col-lg-2 col-md-3 col-6 text-center d-flex justify-content center flex-column mx-auto">
			<img src={props.image_url} id="img-menu" className="img-fluid" />
			<p className="name-dish" id="name-menu">
				{props.name}
			</p>
		</div>
	);
}

MealCard.propTypes = {
	image_url: PropTypes.string,
	name: PropTypes.string
};
