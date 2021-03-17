import React, { useContext } from "react";
import PropTypes from "prop-types";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { handleGetUserRatingStars } from "../pages/reviews";
export const CardReview = props => {
	const { store, actions } = useContext(Context);
	const dateObj = new Date(props.date);
	const date = dateObj.getDate() + "/" + (dateObj.getMonth() + 1) + "/" + dateObj.getFullYear();
	let ratingStars = handleGetUserRatingStars("restaurant", props.rating);
	return (
		<div className="col-3" id="reseñauser">
			<div className="d-flex">
				<i className="fas fa-user" id="user-reseña" />{" "}
				<h4 id="name-reseña">
					{store.user == null ? props.name : store.user.id == props.id ? "Yo" : props.name}
				</h4>
				<span>{date}</span>
			</div>
			<div className="">
				<p>
					Calificación:
					{ratingStars.map(function(element, index) {
						return (
							<button key={index} onClick={() => setRating(index + 1)}>
								{element}
							</button>
						);
					})}
				</p>
			</div>
			<p>{props.comment}</p>
		</div>
	);
};

CardReview.propTypes = {
	id: PropTypes.number,
	name: PropTypes.string,
	date: PropTypes.string,
	comment: PropTypes.string,
	rating: PropTypes.number
};
