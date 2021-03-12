import React, { useContext } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { CardReview } from "../component/cardReview";
export const Reviews = () => {
	return (
		<div className="container-fluid">
			<div>
				<h1 className="text-center">Catrinas</h1>
			</div>
			<div className="row">
				<div className="col-6">
					<img
						id="imgVR2"
						src="https://bloximages.chicago2.vip.townnews.com/newsandtribune.com/content/tncms/assets/v3/editorial/9/f5/9f5bc296-fa53-11e8-8e8b-9b8495cc0b96/5c0ac569bb703.image.jpg"
					/>
				</div>

				<div className="col-6">
					<h4 className="" id="tiReviews">
						Valora y comparte tu experiencia
					</h4>
					<div className="" id="starts2">
						<h3>
							Calificación:
							<i className="far fa-star" />
							<i className="far fa-star" />
							<i className="far fa-star" />
							<i className="far fa-star" />
							<i className="far fa-star" />
						</h3>
					</div>
					<h3>Comentario</h3>
					<textarea name="comentarios" rows="5" cols="60">
						Escribe aquí su comentario
					</textarea>
					<div className="">
						<span href="#" className="btn btn-sm" id="btn-reseñas">
							Enviar
						</span>
					</div>
				</div>

				<div className="col-6" />
			</div>

			<div className="col-12 text-center">
				<h3 id="Backmenu">Reseñas anteriores</h3>
			</div>
			<div className="row">
				<CardReview />
			</div>
			<div className="">
				<Link to="/restaurantes">
					<span href="#" className="btn btn-sm" id="btn-back">
						Atrás
					</span>
				</Link>
			</div>
		</div>
	);
};
