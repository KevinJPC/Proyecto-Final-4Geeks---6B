import React, { useContext } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export const VistaRestaurant = () => {
	return (
		<div className="container-fluid">
			<div>
				<h1 className="text-center">Leño y carbón</h1>
			</div>
			<div className="row">
				<div className="col-6">
					<img
						id="imgVR"
						src="https://conozcasucanton.com/wp-content/uploads/sites/11/2017/01/Le%C3%B1o-y-Carb%C3%B3n-4.jpg"
					/>
				</div>

				<div className="col-6">
					<p id="textRes">
						<h4 className="text-center" id="tiResta">
							Bienvenido a Leño y carbón
						</h4>
						Destacamos la alta calidad de nuestros cortes de carne seleccionadas, maduradas y con la
						jugosidad perfecta, somos un restaurante con una gran variedad de platillos que logran
						satisfacer hasta el más exigente paladar. Ofrecemos una exquisita fusión de carnes, pescados y
						mariscos en un mismo platillo, permitiendo en una sola experiencia gastronómica degustar
						diferentes carnes, todo lo anterior con el acompañamiento de alguno de los vinos o cervezas
						artesanales que ofrecemos, en un ambiente relajado, acogedor y natural que puede disfrutar en
						nuestras instalaciones.
						<br />
						<br />
						<br />
						<h6>
							Ubicación: San Pedro, San josé.
							<br />
							<br /> Categoria: Comida mexicana
						</h6>
					</p>
				</div>
				<div className="col-6" id="starts">
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
				<Link to="/restaurantes">
					<span href="#" className="btn btn-sm" id="btn-reseñas">
						Reseñas
					</span>
				</Link>
			</div>
			<div className="col-12 text-center">
				<h3 id="Backmenu">Menú</h3>
			</div>
			<div className="">
				<Link to="/restaurantes">
					<span href="#" className="btn btn-lg btn-block" id="back">
						Back
					</span>
				</Link>
			</div>
		</div>
	);
};
