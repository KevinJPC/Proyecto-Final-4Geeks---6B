import React, { useContext } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
export const Restaurantes = () => {
	return (
		<div className="container-fluid">
			<div className="tittle-res">
				<h1>Restaurantes</h1>
			</div>
			<div className="row">
				<div className="col-2">
					<img
						src="https://www.muchacomida.com/redireapp/images/imgsubidas/sushi-comida-japonesa-domicilio-moratalaz-madrid/Logo.png"
						id="img-res"
						className="img-fluid"
					/>
					<div className="cars-rest">
						<p id="text-card">
							<i className="fas fa-utensils" id="icon-te" />
							Categoria:
						</p>

						<p id="text-card">
							<i className="fas fa-utensils" id="icon-te" />
							Ubicación:
						</p>

						<p id="text-card">
							<i className="fas fa-utensils" id="icon-te" />
							Calificación:
						</p>
						<Link to="/vistaRestaurant">
							<span href="#" className="btn btn-warning boton btn-sm" id="btn-read">
								Leer más!
							</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
