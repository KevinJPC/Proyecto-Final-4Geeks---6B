import React, { useContext } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export const CardReview = () => {
	return (
		<div className="col-3" id="reseñauser">
			<i className="fas fa-user" id="user-reseña" /> <h4 id="name-reseña">Nombre</h4>
			<div className="">
				<h3 id="starts3">
					Calificación:
					<i className="far fa-star" />
					<i className="far fa-star" />
					<i className="far fa-star" />
					<i className="far fa-star" />
					<i className="far fa-star" />
					Fecha: Hace un mes
				</h3>
			</div>
			<p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. </p>
		</div>
	);
};
