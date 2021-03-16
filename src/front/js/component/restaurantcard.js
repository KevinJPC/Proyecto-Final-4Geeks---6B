import React, { useContext } from "react";
import PropTypes from "prop-types";
import "../../styles/home.scss";
import { Link } from "react-router-dom";
export const RestaurantCard = props => {
	let ratingStar = [];

	let initial_rating = props.rating;
	for (let i = 0; i < 5; i++) {
		if (initial_rating >= 1) {
			ratingStar.push(<i className="fas fa-star" />);
			initial_rating = initial_rating - 1;
		} else {
			if (initial_rating < 1 && initial_rating > 0) {
				ratingStar.push(<i className="fas fa-star-half-alt" />);
				initial_rating = initial_rating - 1;
			} else {
				ratingStar.push(<i className="far fa-star" />);
			}
		}
	}

	return (
		<div className="col-2">
			<img src={props.image_url} alt={"imagen"} id="img-res" className="img-fluid" />
			<div className="cars-rest">
				<p id="text-card">
					<i className="fas fa-utensils" id="icon-te" />
					Nombre: {props.name}
				</p>
				<p id="text-card">
					<i className="fas fa-utensils" id="icon-te" />
					Categoria: {props.category}
				</p>

				<p id="text-card">
					<i className="fas fa-utensils" id="icon-te" />
					Ubicación: {props.address}
				</p>

				<p id="text-card">
					<i className="fas fa-utensils" id="icon-te" />
					Calificación:{" "}
					<span className="mr-2">
						{ratingStar.map(function(element, index) {
							return <span key={index}>{element}</span>;
						})}
					</span>
					{props.rating}
				</p>
				<Link to={"/restaurant/" + props.name + "/" + props.id}>
					<span href="#" className="btn btn-warning boton btn-sm" id="btn-read">
						Leer más!
					</span>
				</Link>
			</div>
		</div>
	);
};

RestaurantCard.propTypes = {
	id: PropTypes.number,
	name: PropTypes.string,
	image_url: PropTypes.string,
	category: PropTypes.string,
	address: PropTypes.string,
	rating: PropTypes.number
};
