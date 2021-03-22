import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Spinner } from "../component/spinner";

export const ChangePassword = () => {
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [redirect, setRedirect] = useState(false);
	const [incorrect, setIncorrect] = useState(false);
	const [incorrectMessage, setIncorrectMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const params = useParams();
	let token = params.token.replaceAll("$", ".");

	function handleSendNewPassword() {
		setIncorrect(false);
		if (password == "") {
			setIncorrect(true);
			setIncorrectMessage("Debe completar todos los campos");
			return;
		}
		if (password != password2) {
			setIncorrect(true);
			setIncorrectMessage("Ambas contraseñas deben coincidir");
			return;
		}
		if (password.length < 6 || password2.length < 6) {
			setIncorrect(true);
			setIncorrectMessage("La contraseña debe tener un minimo de 6 caracteres");
			return;
		}
		setLoading(true);
		const data = { password: password };
		fetch(process.env.BACKEND_URL + "/api/user/change/password", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			},
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(data => {
				console.log("Success:", data);
				if (data.status == true) {
					setLoading(false);
					setRedirect(true);
				}
			});
	}

	return (
		<div className="container-fluid">
			<h1 className="large text-dark text-center py-3">Nueva contraseña</h1>
			<section className="container-fluid col-12 col-lg-6 col-md-6 py-4" id="backforget">
				<p className="lead text-center">
					<i className="fas fa-user" /> Crea tu nueva contraseña
				</p>
				<div className="form text-center mt-4">
					<div className="col-sm-5 mx-auto">
						<input
							className="rounded px-1 form-group"
							minLength="6"
							maxLength="12"
							type="password"
							placeholder="Contraseña"
							name="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					<div className="col-sm-5 mx-auto">
						<input
							className="rounded px-1 form-group"
							minLength="6"
							maxLength="12"
							type="password"
							placeholder="Confirma tu contraseña"
							name="password2"
							value={password2}
							onChange={e => setPassword2(e.target.value)}
						/>
					</div>
					{incorrect ? <h6 className="text-center text-danger mt-3">{incorrectMessage}</h6> : null}
					<div className="mb-4 mt-3">{loading ? <Spinner /> : null}</div>

					<button className="btn rounded-pill mt-3" id="btn-forget" onClick={handleSendNewPassword}>
						Cambiar contraseña
					</button>
				</div>
			</section>
			{redirect ? <Redirect to="/login" /> : null}
		</div>
	);
};
