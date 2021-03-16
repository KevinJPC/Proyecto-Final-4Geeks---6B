import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Spinner } from "../component/spinner";

export const Forgetpassword = () => {
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	return (
		<div className="">
			<h1 className="large text-dark text-center" id="tittleforget">
				Nueva contraseña
			</h1>
			<section className="container" id="backforget">
				<p className="lead text-center">
					<i className="fas fa-user" /> Crea tu nueva contraseña
				</p>
				<form className="form text-center" onSubmit={e => onSubmit(e)} action="create-profile.html">
					<div className="form-group">
						<input
							type="password"
							placeholder="Contraseña"
							name="password"
							value={password}
							onChange={e => onChange(e)}
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							placeholder="Confirmación de contraseña"
							name="password2"
							value={password2}
							onChange={e => onChange(e)}
						/>
					</div>
					<input type="submit" className="btn" value="Confirmar" id="btn-forget" />
				</form>
				<p className="my-1 text-center">
					Ya tienes una cuenta? <Link to="/register">Registrarse</Link>
				</p>
			</section>
		</div>
	);
};
