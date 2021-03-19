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
		<div className="col-12 col-lg-3 col-md-3 mb-3 mx-auto mx-lg-0 mx-md-0 p-2">
			<div style={{ border: "2px solid black" }} className="p-1">
				<div className="d-flex justify-content-between ">
					<div className="col-auto d-flex align-items-center">
						<i className="fas fa-user" />
						<h5 className="pt-1 ml-2">
							{store.user == null
								? props.name
								: store.user.id == props.id && store.user.type_user == "client"
									? "Yo"
									: props.name}
						</h5>
					</div>
					<div className="mr-1">
						<span>{date}</span>
					</div>
				</div>
				<div className="d-flex align-items-center">
					<div>
						<p className="pt-3">Calificación:</p>
					</div>
					<div className="ml-1 p-0">
						{ratingStars.map(function(element, index) {
							return (
								<span className="bg-transparent" style={{ border: "none" }} key={index}>
									{element}
								</span>
							);
						})}
					</div>
				</div>
				<div style={{ height: "150px", overflow: "auto" }}>
					<p>{props.comment}</p>
				</div>
			</div>
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
