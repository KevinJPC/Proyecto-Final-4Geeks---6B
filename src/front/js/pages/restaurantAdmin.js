import React, { useContext, useEffect, useState, Fragment } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { MealCard } from "../component/mealCard";
import { Spinner } from "../component/spinner";
export const RestaurantAdmin = () => {
	const [username, setUsername] = useState("");
	const [welcomeMessage, setWelcomeMessage] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");

	const params = useParams();
	const { store, actions } = useContext(Context);
	let [menu, setMenu] = useState([]);
	useEffect(function() {
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

	const handleChangeData = () => {
		const data = {
			name: username,
			address: address,
			phone: phone,
			category: category,
			welcome_message: welcomeMessage,
			description: description
		};

		fetch(process.env.BACKEND_URL + "/api/restaurant/change/information", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + sessionStorage.getItem("u_token")
			},
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				actions.getUser(data.results);
			})
			.catch(error => {
				console.error("Error:", error);
			});
	};

	// let ratingStar = [];
	// if (restaurant != null) {
	// 	let initial_rating = store.user.rating;
	// 	for (let i = 0; i < 5; i++) {
	// 		if (initial_rating >= 1) {
	// 			ratingStar.push(<i className="fas fa-star" />);
	// 			initial_rating = initial_rating - 1;
	// 		} else {
	// 			if (initial_rating < 1 && initial_rating > 0) {
	// 				ratingStar.push(<i className="fas fa-star-half-alt" />);
	// 				initial_rating = initial_rating - 1;
	// 			} else {
	// 				ratingStar.push(<i className="far fa-star" />);
	// 			}
	// 		}
	// 	}
	// }
	return (
		<div className="container-fluid">
			<div className="row">
				{store.user != null && menu.length != 0 ? (
					<Fragment>
						<div className="py-4 col-12 d-flex justify-content-center">
							<h1>Nombre:</h1>
							<input
								placeholder="Nombre"
								defaultValue={store.user.name}
								type="text"
								onChange={e => setUsername(e.target.value)}
							/>
						</div>
						<div className="container-fluid px-4">
							<div className="row d-flex flex-column flex-lg-row flex-md-row">
								<div className="col-12 col-md-6 col-lg-6 bg-secondary container">
									<img
										id="imgVR"
										src={store.user.image_url}
										className="img-fluid mx-auto d-block"
										style={{ maxHeight: "420px" }}
									/>
								</div>

								<div className="col-12 col-md-6 col-lg-6">
									<div id="textRes">
										<div className="d-flex align-items-center">
											<h4 className="text-center">Bienvenida:</h4>
											<input
												id="tiResta"
												className="text-center ml-2"
												placeholder="Bienvenida"
												defaultValue={store.user.welcome_message}
												type="text"
												onChange={e => setWelcomeMessage(e.target.value)}
											/>
										</div>
										<div className="d-flex align-items-center">
											<textarea
												className="ml-2"
												placeholder="Descripción"
												defaultValue={store.user.description}
												type="text"
												cols="40"
												rows="5"
												onChange={e => setDescription(e.target.value)}
											/>
										</div>
										<hr />
										<div className="d-flex align-items-center">
											<h6>Ubicación:</h6>
											<input
												className="ml-2"
												placeholder="ubicación"
												defaultValue={store.user.address}
												type="text"
												onChange={e => setAddress(e.target.value)}
											/>
										</div>
										<hr />
										<div className="d-flex align-items-center">
											<h6>Categoria:</h6>
											<input
												className="ml-2"
												placeholder="Categoria"
												defaultValue={store.user.category}
												type="text"
												onChange={e => setCategory(e.target.value)}
											/>
										</div>
										<hr />
										<div className="d-flex align-items-center">
											<h6>Teléfono:</h6>
											<input
												className="ml-2"
												placeholder="Teléfono"
												defaultValue={store.user.phone}
												type="text"
												onChange={e => setPhone(e.target.value)}
											/>
										</div>
										<hr className="d-block d-sm-none" />
										<button
											className="rounded-pill bg-transparent px-3 btn-send"
											onClick={() => {
												handleChangeData();
											}}>
											Actualizar
										</button>
									</div>
								</div>
								<div className="col-12 col-md-6 col-lg-6" id="starts1">
									<div className="col-12 col-lg-8 d-flex flex-lg-row flex-column p-0 mt-lg-3 mt-md-3">
										<div className="d-flex p-0 align-items-center">
											<h6 className="pt-1 mr-1">Calificación: </h6>
											{/* <span className="mr-2">
												{ratingStar.map(function(element, index) {
													return <span key={index}>{element}</span>;
												})}
											</span>
											{store.user.rating} */}
										</div>
										<hr className="d-block d-sm-none" />

										<Link to="/restaurant/:name/:id/reviews">
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
					<div
						className="spinner-border mx-auto"
						role="status"
						style={{ width: "100px", height: "100px", marginTop: "250px" }}>
						<span className="sr-only">Loading...</span>
					</div>
				)}
			</div>
		</div>
	);
};
