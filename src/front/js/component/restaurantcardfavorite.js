import React, { useContext } from "react";
import PropTypes from "prop-types";
import "../../styles/home.scss";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
export const RestaurantCardFavorite = props => {
	let ratingStar = [];

	let initial_rating = props.rating;
	console.log(props.rating, "rating");
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
	const { store, actions } = useContext(Context);

	return (
		<div className="col-12 col-lg-3 col-md-3 mb-4 mx-auto mx-lg-0 mx-md-0">
			<div className="img-container d-flex align-items-center">
				<img id="img-res" src={props.image_url} className="img-fluid mx-auto d-block" />
			</div>
			<div className="cars-rest pt-2 pl-2">
				<p id="text-card">
					<i className="fas fa-utensils" id="icon-te" />
					<span className="px-1 restaurant-tag">Nombre:</span> {props.name}
				</p>
				<p id="text-card">
					<i className="fas fa-utensils" id="icon-te" />
					<span className="px-1 restaurant-tag">Categoria:</span> {props.category}
				</p>

				<p id="text-card">
					<i className="fas fa-utensils" id="icon-te" />
					<span className="px-1 restaurant-tag">Ubicación:</span>
					{props.address}
				</p>

				<p id="text-card">
					<i className="fas fa-utensils" id="icon-te" />
					<span className="px-1 restaurant-tag">Calificación:</span>
					<span className="mr-2">
						{ratingStar.map(function(element, index) {
							return <span key={index}>{element}</span>;
						})}
					</span>
				</p>
				<div className="d-flex align-items-center justify-content-between mx-1 pb-2">
					<Link to={"/restaurant/" + props.name + "/" + props.id}>
						<span href="#" className="px-2 py-1" id="btn-read">
							Leer más!
						</span>
					</Link>
					{store.favoritesRestaurant != null ? (
						<div className="top">
							<button className="favdelete delete" onClick={() => actions.deleteFavorite(props.id)}>
								<i className="far fa-trash-alt" />
							</button>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

RestaurantCardFavorite.propTypes = {
	id: PropTypes.number,
	name: PropTypes.string,
	image_url: PropTypes.string,
	category: PropTypes.string,
	address: PropTypes.string,
	rating: PropTypes.number
};
