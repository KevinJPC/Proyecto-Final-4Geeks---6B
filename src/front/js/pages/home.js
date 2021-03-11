import React from "react";
import "../../styles/home.scss";
import { Link } from "react-router-dom";
import backgroundLandingPage from "../../img/background-landing-page.png";
import imgLandingPage from "../../img/img-landing-page.png";
import titleLandingPage from "../../img/title-landing-page.png";

export const Home = () => (
	<div className="">
		<div className="background-image headboard mt-5 d-flex justify-content-between flex-column-reverse flex-lg-row flex-md-row flex-sm-row">
			<div className="col-12 col-md-6 col-lg-6 mx-auto">
				<img src={imgLandingPage} className="img-landing-page img-fluid" />
			</div>
			<div className="col-md-6 col-lg-6">
				<div className="col-10 col-md-7 col-lg-7 mt-4 mb-3 mx-auto">
					<img src={titleLandingPage} className="title-landing-page img-fluid" />
				</div>
				{/* <h3>My restaurant</h3> */}
				<p className="web-site-description mx-auto text-center col-12 col-lg-10 col-md-10">
					La plataforma para impulsar tu restaurante. Administre su menú y obtenga una interacción más directa
					con sus clientes.
				</p>
			</div>
		</div>
		<Link to="/restaurantes">
			<div className="d-flex justify-content-center mt-4 mb-4 mb-md-0 mb-lg-0">
				<button className="rounded-pill bg-transparent btn-restaurants px-5">Restaurantes</button>
			</div>
		</Link>
	</div>
);
