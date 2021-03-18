import React, { useContext, useState, useEffect, Fragment, useRef } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { CardReview } from "../component/cardReview";
import { Spinner } from "../component/spinner";
import { GranSpinner } from "../component/granSpinner";

export const Reviews = () => {
	const params = useParams();
	const commentRef = useRef();
	const { store, actions } = useContext(Context);
	const [restaurant, setRestaurant] = useState(null);
	const [reviews, setReviews] = useState(null);
	const [comment, setComment] = useState("");
	const [rating, setRating] = useState(0);
	const [loading, setLoading] = useState(false);
	let ratingStars = handleGetUserRatingStars(restaurant, rating);
	useEffect(function() {
		console.log(params.name, params.id);
		fetch(process.env.BACKEND_URL + "/api/restaurant/" + params.id, { method: "GET" })
			.then(resp => resp.json())
			.then(data => {
				data.results.rating = parseFloat(data.results.rating);
				setRestaurant(data.results);
			})
			.catch(error => console.log("Error", error));

		fetch(process.env.BACKEND_URL + "/api/restaurant/" + params.id + "/review", { method: "GET" })
			.then(resp => resp.json())
			.then(data => {
				console.log(data.results);
				if (data.status == true) {
					let reviewsReserve = data.results.reverse();
					setReviews(reviewsReserve);
				}
			})
			.catch(error => console.log("Error", error));
	}, []);

	function handleAddReview() {
		let data = {
			user_restaurant_id: params.id,
			comment: comment,
			rating: rating
		};
		setLoading(true);
		fetch(process.env.BACKEND_URL + "/api/restaurant/review", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + sessionStorage.getItem("u_token")
			},
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(data => {
				if (data.status == true) {
					commentRef.current.value = "";
					setComment(null);
					setRating(0);
					let reviewsReserve = data.results.reverse();
					setReviews(reviewsReserve);
				}
				setLoading(false);
				console.log(data);
			})
			.catch(error => console.log("Error", error));
	}

	// setRatingStars(arrayRatingStars)
	return (
		<div className="container-fluid">
			{restaurant == null ? (
				<GranSpinner marginTop="250px" />
			) : (
				<Fragment>
					{store.user != null ? (
						store.user.type_user == "client" ? (
							<Fragment>
								<div className="col-6">
									<div>
										<h1 className="text-center">{restaurant.name}</h1>
									</div>
									<div className="row">
										<div className="col-6">
											<img id="imgVR2" src={restaurant.image_url} />
										</div>
										<h4 className="" id="tiReviews">
											Valora y comparte tu experiencia
										</h4>
										<div className="" id="starts2">
											<h3>
												Calificación:
												{ratingStars.map(function(element, index) {
													return (
														<button key={index} onClick={() => setRating(index + 1)}>
															{element}
														</button>
													);
												})}
											</h3>
										</div>
										<h3>Comentario</h3>
										<textarea
											ref={commentRef}
											name="comentarios"
											rows="5"
											cols="60"
											placeholder="Escribe aquí su comentario"
											onChange={e => setComment(e.target.value)}
										/>
										<div className="">
											<button
												href="#"
												className="btn btn-sm my-3"
												id="btn-reseñas"
												onClick={handleAddReview}>
												Enviar
											</button>
										</div>
									</div>
								</div>
								<div className="col-6 mt-3" />
							</Fragment>
						) : null
					) : null}

					<div className="col-12 text-center">
						<h3 id="Backmenu">Reseñas anteriores</h3>
					</div>
					<div className="row">
						{reviews != null
							? reviews.map(function(element, index) {
									return (
										<CardReview
											key={index}
											id={element.user_client_id}
											name={element.user_client_name}
											date={element.date}
											comment={element.comment}
											rating={element.rating}
										/>
									);
							  })
							: null}
					</div>
					<div className="">
						{/* <Link to="/restaurant">
					<span href="#" className="btn btn-sm" id="btn-back">
						Atrás
					</span>
				</Link> */}
					</div>
				</Fragment>
			)}
		</div>
	);
};

export function handleGetUserRatingStars(restaurant, rating) {
	let ratingStars = [];
	if (restaurant != null) {
		let initialRating = rating;
		for (let i = 0; i < 5; i++) {
			if (initialRating >= 1) {
				ratingStars.push(<i className="fas fa-star" />);
				initialRating = initialRating - 1;
			} else {
				if (initialRating < 1) {
					ratingStars.push(<i className="far fa-star" />);
					initialRating = initialRating - 1;
				}
			}
		}
	}
	return ratingStars;
}
