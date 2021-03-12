import React, { useContext } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export const RestaurantAdmin = () => {
	return (
		<div className="container-fluid">
			<div>
				<h1 className="text-center">Nombre del Restaurante</h1>
			</div>
			<div className="row">
				<div className="col-6">
					<img
						id="imgVR"
						src="https://image.freepik.com/foto-gratis/fondo-abstracto-gris-degradado_9635-2358.jpg"
					/>
				</div>

				<div className="col-6">
					<div id="textRes">
						<h4 className="text-center" id="tiResta">
							Bienvenido a Nombre del restaurante
						</h4>
						<textarea name="comentarios" rows="11" cols="70" defaultValue="Escribe aquí tu descripción" />
						<br />
						<br />
						<br />
						<h6>
							Ubicación: xxxxxxxxxxx
							<br />
							<br /> Categoria: xxxxxxxxxxx
						</h6>
					</div>
				</div>
				<div className="col-12" id="starts">
					<h3>
						Calificación:
						<i className="far fa-star" />
						<i className="far fa-star" />
						<i className="far fa-star" />
						<i className="far fa-star" />
						<i className="far fa-star" />
					</h3>
					<div className="">
						<span href="#" className="btn btn-sm" id="btnreseñasu">
							Editar información
						</span>
					</div>
				</div>
			</div>
			<div className="col-6">
				<Link to="/restaurant/:name/:id/reviews">
					<span href="#" className="btn btn-sm" id="btn-reseñasusuarios">
						Reseñas de usuarios
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
					<img
						src="https://image.freepik.com/foto-gratis/fondo-abstracto-gris-degradado_9635-2358.jpg"
						id="img-menu"
					/>
					<h3 id="name-menu">Tacos</h3>
				</div>
			</div>
			<div className="col-12 text-center">
				<h4 id="nameFo2">Antojitos</h4>
			</div>
			<div className="row">
				<div className="col-3 text-center">
					<img
						src="https://image.freepik.com/foto-gratis/fondo-abstracto-gris-degradado_9635-2358.jpg"
						id="img-menu"
					/>
					<h3 id="name-menu">Tacos</h3>
				</div>
			</div>
			<div className="col-12 text-center">
				<h4 id="nameFo3">Bebidas</h4>
			</div>
			<div className="row">
				<div className="col-3 text-center">
					<img
						src="https://image.freepik.com/foto-gratis/fondo-abstracto-gris-degradado_9635-2358.jpg"
						id="img-menu"
					/>
					<h3 id="name-menu">Tacos</h3>
				</div>
			</div>
			<div className="col-12 text-center">
				<h4 id="nameFo4">Postres</h4>
			</div>
			<div className="row">
				<div className="col-3 text-center">
					<img
						src="https://image.freepik.com/foto-gratis/fondo-abstracto-gris-degradado_9635-2358.jpg"
						id="img-menu"
					/>
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
		</div>
	);
};
