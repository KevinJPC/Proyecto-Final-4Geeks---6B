import React from "react";
import { Link } from "react-router-dom";
import logoWebSite from "../../img/logo-web-site.png";

export const Navbar = () => {
	return (
		// <nav className="navbar navbar-light bg-light mb-3">
		// 	<Link to="/">
		// 		<span className="navbar-brand mb-0 h1">React Boilerplate</span>
		// 	</Link>
		// 	<div className="ml-auto">
		// 		<Link to="/demo">
		// 			<button className="btn btn-primary">Check the Context in action</button>
		// 		</Link>
		// 	</div>
		// </nav>
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<Link to="" className="navbar-brand col-3 col-md-1 col-lg-1" href="#">
				<img src={logoWebSite} className="logo-web-site img-fluid" />
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
					<Link to="" className="nav-item nav-link text-white" href="#">
						Registro
					</Link>
					<Link to="" className="nav-item nav-link text-white" href="#">
						<span className="d-flex align-items-center">
							Iniciar sesión
							<i className="fas fa-user ml-2" />
						</span>
					</Link>
				</div>
			</div>
		</nav>
	);
};
