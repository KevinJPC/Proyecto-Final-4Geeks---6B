import React, { useContext, useEffect, useState, Fragment } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { MealCard } from "../component/mealCard";
import { Spinner } from "../component/spinner";
import { NotFound } from "../pages/notFound";
export const RestaurantAdmin = () => {
	const [username, setUsername] = useState("");
	const [welcomeMessage, setWelcomeMessage] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [image, setImage] = useState("");
	const [updating, setUpdating] = useState(false);
	const [correct, setCorrect] = useState(false);
	const params = useParams();
	const { store, actions } = useContext(Context);
	let [menu, setMenu] = useState([]);
	useEffect(function() {
		// ---------------------------------------------------
		actions.loadSession();
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
		setUpdating(true);
		fetch(process.env.BACKEND_URL + "/api/restaurant/change/information", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + sessionStorage.getItem("u_token")
			},
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then(async data => {
				// console.log(data);
				let user_restaurant_id = await data.results.id;
				let body = new FormData();
				body.append("image", image[0]);
				const options = {
					body,
					method: "POST"
				};

				fetch(process.env.BACKEND_URL + "/api/restaurants/" + user_restaurant_id + "/image", options)
					.then(resp => resp.json())
					.then(data => {
						// console.log("Success!!!!", data);
						console.log(data.results, "imagen cambiada");
						setUpdating(false);
						setCorrect(true);
					})
					.catch(error => console.error("error", error));
			})
			.catch(error => {
				console.error("Error:", error);
			});
	};

	let ratingStar = [];
	if (store.user != null) {
		let initial_rating = store.user.rating;
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

	return store.pageNotFound ? (
		<NotFound />
	) : (
		<div className="container-fluid">
			<div className="row">
				{store.user != null && menu.length != 0 ? (
					<Fragment>
						<div className="py-4 col-12">
							<h2 className="text-center mb-4">Aquí puedes editar la información de tu restaurante</h2>
							<div className="d-flex justify-content-center mb-2 align-items-center">
								<h6>Nombre:</h6>
								<div className="col-sm-3">
									<input
										maxLength="50"
										className="ml-2 form-control"
										placeholder="Nombre"
										defaultValue={store.user.name}
										type="text"
										onChange={e => setUsername(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="container-fluid px-4">
							<div className="row d-flex flex-column flex-lg-row flex-md-row">
								<div
									className="col-12 col-md-6 col-lg-6 d-flex align-items-center"
									style={{ maxHeight: "400px" }}>
									<img
										id="imgVR"
										src={image == "" ? store.user.image_url : URL.createObjectURL(image[0])}
										className="img-fluid mx-auto d-block"
										style={{ maxHeight: "400px" }}
									/>
								</div>

								<div className="col-12 col-md-6 col-lg-6">
									<div id="textRes">
										<div className="d-flex justify-content-between align-items-center mt-3 mt-lg-0 mt-md-0">
											<h6 className="text-center">Bienvenida:</h6>
											<div className="col-sm-10">
												<input
													maxLength="50"
													id="tiResta"
													className="text-center form-control"
													placeholder="Bienvenida"
													defaultValue={store.user.welcome_message}
													type="text"
													onChange={e => setWelcomeMessage(e.target.value)}
												/>
											</div>
										</div>
										<hr />
										<div className="d-flex mt-2 justify-content-between">
											<h6 className="text-center">Descripción:</h6>
											<div className="col-sm-10">
												<textarea
													maxLength="400"
													placeholder="Descripción"
													defaultValue={store.user.description}
													type="text"
													className="form-control"
													id="exampleFormControlTextarea1"
													rows="3"
													onChange={e => setDescription(e.target.value)}
												/>
											</div>
										</div>
										<hr />
										<div className="d-flex align-items-center justify-content-between">
											<h6>Ubicación:</h6>
											<div className="col-sm-10">
												<input
													maxLength="100"
													className="form-control"
													placeholder="ubicación"
													defaultValue={store.user.address}
													type="text"
													onChange={e => setAddress(e.target.value)}
												/>
											</div>
										</div>
										<hr />
										<div className="d-flex align-items-center justify-content-between">
											<h6>Categoría:</h6>
											<div className="col-sm-10">
												<input
													maxLength="50"
													className="form-control"
													placeholder="Categoría"
													defaultValue={store.user.category}
													type="text"
													onChange={e => setCategory(e.target.value)}
												/>
											</div>
										</div>
										<hr />
										<div className="d-flex align-items-center justify-content-between">
											<h6>Teléfono:</h6>
											<div className="col-sm-10">
												<input
													maxLength="50"
													className="form-control"
													placeholder="Teléfono"
													defaultValue={store.user.phone}
													type="text"
													onChange={e => setPhone(e.target.value)}
												/>
											</div>
										</div>
										<hr />

										<div className="d-flex align-items-center justify-content-between">
											<h6>Imagen:</h6>
											<div className="col-sm-10 d-flex p-0">
												<input
													type="file"
													className="form-control bg-transparent"
													placeholder="test"
													style={{ border: "none" }}
													onChange={e => {
														setImage(e.target.files);
													}}
												/>
											</div>
										</div>
										<hr />

										<div className="mb-4 text-center">{updating ? <Spinner /> : null}</div>
										<div className="mb-4 text-center text-success">
											{correct ? <h6>La información se ha actualizado correctamente</h6> : null}
										</div>
										<div className="d-flex justify-content-center my-3">
											<button
												className="rounded-pill bg-transparent px-3 btn-send"
												onClick={() => {
													handleChangeData();
												}}>
												Actualizar
											</button>
										</div>
									</div>
								</div>
								<div className="col-12 col-md-6 col-lg-6 mt-lg-n5 mt-md-n5" id="starts1">
									<div className="col-12 col-lg-8 d-flex flex-lg-row flex-column p-0">
										<div className="d-flex p-0 align-items-center">
											<h6 className="pt-1 mr-1">Calificación: </h6>
											<span className="mr-2">
												{ratingStar.map(function(element, index) {
													return <span key={index}>{element}</span>;
												})}
											</span>
											{store.user.rating}
										</div>
										<hr className="d-block d-sm-none" />

										<Link to={"/restaurant/" + store.user.name + "/" + store.user.id + "/reviews"}>
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
