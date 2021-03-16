import React, { useContext } from "react";
import PropTypes from "prop-types";
import "../../styles/home.scss";
import { Link } from "react-router-dom";
export const RestaurantCard = props => {
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
					Calificación: {props.rating}
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
