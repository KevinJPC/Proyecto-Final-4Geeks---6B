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
				<Link to="/reviews">
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
				<Link to="/restaurantes">
					<span href="#" className="btn btn-sm" id="btn-back">
						Atrás
					</span>
				</Link>
			</div>
			<div className="">
				<Link to="/myrestaurant">
					<span href="#" className="btn btn-sm" id="btn-back">
						Dueño del restaurante
					</span>
				</Link>
			</div>
		</div>
	);
};
