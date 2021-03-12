import React, { useContext, useEffect, useState, Fragment } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export const Restaurant = () => {
	const params = useParams();
	const [restaurant, setRestaurant] = useState(null);
	useEffect(function() {
		console.log(params.name, params.id);
		fetch(process.env.BACKEND_URL + "/api/restaurant/" + params.id, { method: "GET" })
			.then(resp => resp.json())
			.then(data => setRestaurant(data.results))
			.catch(error => console.log("Error", error));
	}, []);
	return (
		<div className="container-fluid">
			{restaurant != null ? (
				<Fragment>
					<div>
						<h1 className="text-center">Leño y carbón</h1>
					</div>
					<div className="row">
						<div className="col-6">
							<img id="imgVR" src={restaurant.image_url} />
						</div>

						<div className="col-6">
							<div id="textRes">
								<h4 className="text-center" id="tiResta">
									{restaurant.welcome_message}
								</h4>
								<p>{restaurant.description}</p>
								<br />
								<br />
								<br />
								<h6>
									Ubicación: {restaurant.address}
									<br />
									<br /> Categoria: {restaurant.category}
								</h6>
							</div>
						</div>
						<div className="col-6" id="starts1">
							<h3>
								Calificación:
								<i className="far fa-star" />
								<i className="far fa-star" />
								<i className="far fa-star" />
								<i className="far fa-star" />
								<i className="far fa-star" />
							</h3>
						</div>
						<div className="col-6" />
					</div>
					<div className="col-6">
						<Link to="/restaurant/:name/:id/reviews">
							<span href="#" className="btn btn-sm" id="btn-reseñas">
								Reseñas
							</span>
						</Link>
					</div>
					<div className="col-12 text-center">
						<h3 id="Backmenu">Menú</h3>
					</div>
					<div className="col-12 text-center">
						<h4 id="nameFo">Entradas</h4>
					</div>
					<div className="row">
						<div className="col-3 text-center">
							<img src="https://cdn.forbescentroamerica.com/2019/11/Olive-640x360.jpg" id="img-menu" />
							<h3 id="name-menu">Tacos</h3>
						</div>
					</div>
					<div className="col-12 text-center">
						<h4 id="nameFo2">Antojitos</h4>
					</div>
					<div className="row">
						<div className="col-3 text-center">
							<img src="https://cdn.forbescentroamerica.com/2019/11/Olive-640x360.jpg" id="img-menu" />
							<h3 id="name-menu">Tacos</h3>
						</div>
					</div>
					<div className="col-12 text-center">
						<h4 id="nameFo3">Bebidas</h4>
					</div>
					<div className="row">
						<div className="col-3 text-center">
							<img src="https://cdn.forbescentroamerica.com/2019/11/Olive-640x360.jpg" id="img-menu" />
							<h3 id="name-menu">Tacos</h3>
						</div>
					</div>
					<div className="col-12 text-center">
						<h4 id="nameFo4">Postres</h4>
					</div>
					<div className="row">
						<div className="col-3 text-center">
							<img src="https://cdn.forbescentroamerica.com/2019/11/Olive-640x360.jpg" id="img-menu" />
							<h3 id="name-menu">Tacos</h3>
						</div>
					</div>
					<div className="">
						<Link to="/restaurants">
							<span href="#" className="btn btn-sm" id="btn-back">
								Atrás
							</span>
						</Link>
					</div>
				</Fragment>
			) : null}
		</div>
	);
};
