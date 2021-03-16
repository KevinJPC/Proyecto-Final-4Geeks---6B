import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logoWebSite from "../../img/logo-web-site.png";
import { Context } from "../store/appContext";
export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<Link to="/" className="navbar-brand col-3 col-md-1 col-lg-1" href="#">
				<img src={logoWebSite} className="logo-web-site img-fluid w-75" />
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNavAltMarkup"
				aria-controls="navbarNavAltMarkup"
				aria-expanded="false"
				aria-label="Toggle navigation"
				style={{ borderColor: "#fff", color: "#fff", fontSize: "28px" }}>
				<i className="fas fa-bars" />
			</button>
			<div className="collapse navbar-collapse d-lg-flex justify-content-end col" id="navbarNavAltMarkup">
				<div className="navbar-nav">
					<Link to="/" className="nav-item nav-link text-white" href="#">
						Inicio
					</Link>
					{store.user != null ? (
						store.user.type_user == "client" ? (
							<Link to="/favorites" className="nav-item nav-link text-white" href="#">
								Favoritos
							</Link>
						) : null
					) : null}
					<Link to="/restaurants" className="nav-item nav-link text-white" href="#">
						Restaurantes
					</Link>
					{store.user == null ? (
						<Link to="/register" className="nav-item nav-link text-white" href="#">
							Registro
						</Link>
					) : null}
					{store.user != null ? (
						store.user.type_user == "restaurant" ? (
							<Link to="/restaurant/admin" className="nav-item nav-link text-white" href="#">
								Mi restaurante
							</Link>
						) : null
					) : null}
					{store.user != null ? (
						<Link to="/login" className="nav-item nav-link text-white" href="#">
							<button
								style={{ border: "none", outline: "none" }}
								className="bg-transparent text-white"
								onClick={() => actions.logOut()}>
								Cerrar sesión
							</button>
						</Link>
					) : null}
					{store.user == null ? (
						<Link to="/login" className="nav-item nav-link text-white" href="#">
							<span className="d-flex align-items-center">
								Iniciar sesión
								<i className="fas fa-user ml-2" />
							</span>
						</Link>
					) : (
						<span className="nav-item nav-link text-white d-flex align-items-center">
							{store.user.name}
							<i className="fas fa-user ml-2" />
						</span>
					)}
				</div>
			</div>
		</nav>
	);
};
