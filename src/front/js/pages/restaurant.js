import React, { useContext, useEffect, useState, Fragment } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { MealCard } from "../component/mealCard";
import { Spinner } from "../component/spinner";
import { GranSpinner } from "../component/granSpinner";
export const Restaurant = () => {
	const params = useParams();
	const [restaurant, setRestaurant] = useState(null);
	let [menu, setMenu] = useState([]);
	useEffect(function() {
		console.log(params.name, params.id);
		fetch(process.env.BACKEND_URL + "/api/restaurant/" + params.id, { method: "GET" })
			.then(resp => resp.json())
			.then(data => {
				data.results.rating = parseFloat(data.results.rating);
				setRestaurant(data.results);
			})
			.catch(error => console.log("Error", error));

		// ---------------------------------------------------
		let menuArray = [];
		let categories = ["Seafood", "Chicken", "Dessert"];
		for (let i = 0; i < categories.length; i++) {
			fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + categories[i], { method: "GET" })
				.then(resp => resp.json())
				.then(async data => {
					let meals = await data.meals.slice(0, 5);
					menuArray.push({ category: categories[i], meals: meals });
					if (i == 2) {
						setMenu(menuArray);
					}
				})
				.catch(error => console.log("Error", error));
			// console.log(Promise.all(menuArray));
			// setMenu(menuArray);
		}
	}, []);

	let ratingStar = [];
	if (restaurant != null) {
		let initial_rating = restaurant.rating;
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
	}
	return (
		<div className="container-fluid">
			<div className="row">
				{restaurant != null && menu.length != 0 ? (
					<Fragment>
						<div className="py-4 col-12">
							<h1 className="text-center">{restaurant.name}</h1>
						</div>
						<div className="container-fluid">
							<div className="row d-flex flex-column flex-lg-row flex-md-row">
								<div
									className="col-12 col-md-6 col-lg-6 d-flex align-items-center"
									style={{ maxHeight: "400px" }}>
									<img
										id="imgVR"
										src={restaurant.image_url}
										className="img-fluid mx-auto d-block"
										style={{ maxHeight: "400px" }}
									/>
								</div>

								<div className="col-12 col-md-6 col-lg-6">
									<div id="textRes">
										<h4 className="text-center py-2" id="tiResta">
											{restaurant.welcome_message}
										</h4>
										<p>{restaurant.description}</p>
										<hr />
										<h6>Ubicación: {restaurant.address}</h6>
										<hr />
										<h6>Categoria: {restaurant.category}</h6>
										<hr />
										<h6>Teléfono: {restaurant.phone}</h6>
										<hr className="d-block d-sm-none" />
									</div>
								</div>
								<div className="col-12 col-md-6 col-lg-6" id="starts1">
									<div className="col-12 col-lg-8 d-flex flex-lg-row flex-column p-0 mt-lg-3 mt-md-3">
										<div className="d-flex p-0 align-items-center">
											<h6 className="pt-1 mr-1">Calificación: </h6>
											<span className="mr-2">
												{ratingStar.map(function(element, index) {
													return <span key={index}>{element}</span>;
												})}
											</span>
											{restaurant.rating}
										</div>
										<hr className="d-block d-sm-none" />

										<Link to={"/restaurant/" + restaurant.name + "/" + restaurant.id + "/reviews"}>
											<span
												href="#"
												className="btn btn-sm ml-lg-3 ml-md-3 mt-lg-0 mt-md-0"
												id="btn-reseñas">
												Reseñas
											</span>
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 text-center mt-4">
							<h3 id="Backmenu">Menú</h3>
						</div>
						<div className="d-flex justify-content-center flex-column">
							{menu.map(function(element, index) {
								return (
									<Fragment key={index}>
										<div className="col-12 text-center my-4">
											<h4 id="nameFo">{element.category}</h4>
										</div>
										<div className="container-fluid">
											<div className="row">
												{element.meals.map(function(el, i) {
													return (
														<MealCard
															name={el.strMeal}
															image_url={el.strMealThumb}
															key={i}
														/>
													);
												})}
											</div>
										</div>
									</Fragment>
								);
							})}
						</div>

						<div className="col-12 d-flex justify-content-center my-3">
							<Link to="/restaurants">
								<span href="#" className="btn btn-sm" id="btn-back">
									Atrás
								</span>
							</Link>
						</div>
					</Fragment>
				) : (
					<GranSpinner marginTop="250px" />
				)}
			</div>
		</div>
	);
};
