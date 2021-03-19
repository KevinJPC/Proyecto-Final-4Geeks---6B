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
	const [isSending, setIsSending] = useState(false);

	let typeUser = store.user != null ? store.user.type_user : "client";
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
		setIsSending(true);
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
				setIsSending(false);
				setLoading(false);
				console.log(data);
			})
			.catch(error => console.log("Error", error));
	}

	// setRatingStars(arrayRatingStars)
	return (
		<div className="">
			{restaurant == null ? (
				<GranSpinner marginTop="250px" />
			) : (
				<Fragment>
					{typeUser == "client" ? (
						<Fragment>
							<div className="container-fluid">
								<div className="mt-3 mb-5">
									<h1 className="text-center">{restaurant.name}</h1>
								</div>
								<div className="container-fluid">
									<div className="row d-flex justify-content-center flex-lg-row flex-md-row flex-column ">
										<div className="col-lg-6 col-md-6 col-12 mb-lg-0 mb-md-0 mb-3">
											<img id="imgVR2" className="img-fluid" src={restaurant.image_url} />
										</div>
										<div className="col-lg-6 col-md-6 col-12 px-0 px-lg-3 px-md-3">
											<div
												className="text-center mb-4 py-1"
												style={{ border: "2px solid black" }}>
												<h4>Valora y comparte tu experiencia</h4>
											</div>
											<div className="d-flex align-items-center mb-3">
												<h5 className="pt-1">Calificación:</h5>
												<div className="ml-3" id="starts2">
													{ratingStars.map(function(element, index) {
														return (
															<button
																className="bg-transparent"
																style={{ border: "none", fontSize: "25px" }}
																key={index}
																onClick={() => setRating(index + 1)}>
																{element}
															</button>
														);
													})}
												</div>
											</div>
											<div className="">
												<h5>Comentario:</h5>
												<textarea
													ref={commentRef}
													className="form-control"
													id="exampleFormControlTextarea1"
													rows="3"
													placeholder="Escribe aquí su comentario"
													onChange={e => setComment(e.target.value)}
												/>
											</div>
											<div className="mb-4 mt-3 text-center">
												{isSending ? <Spinner /> : null}
											</div>
											<div className="d-flex justify-content-center">
												<button
													href="#"
													className="btn btn-sm my-3"
													id="btn-reseñas"
													onClick={() => {
														store.user != null ? handleAddReview() : null;
													}}>
													Enviar
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* <div className="col-6 mt-3" /> */}
						</Fragment>
					) : null}
					<div className="mt-4">
						<div className="col-12 text-center px-2 mb-3">
							<h3 id="Backmenu">Reseñas anteriores</h3>
						</div>
						<div className="container-fluid">
							<div className="row mx-1">
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
						</div>
					</div>
					{/* <Link to="/restaurant">
					<span href="#" className="btn btn-sm" id="btn-back">
                    Atrás
					</span>
				</Link> */}
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
