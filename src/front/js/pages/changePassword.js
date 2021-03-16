import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Spinner } from "../component/spinner";

export const ChangePassword = () => {
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [redirect, setRedirect] = useState(false);
	const params = useParams();
	let token = params.token.replaceAll("$", ".");
	console.log(token);

	function handleSendNewPassword() {
		if (password == "") {
			alert("Debe completar todos los campos");
			return;
		}
		if (password != password2) {
			alert("Ambas contraseñas deben ser iguales");
			return;
		}
		if (password.length < 4) {
			alert("La contraseña debe contener más de 4 caracteres");
			return;
		}

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
					setRedirect(true);
				}
			});
	}

	return (
		<div className="">
			<h1 className="large text-dark text-center" id="tittleforget">
				Nueva contraseña
			</h1>
			<section className="container" id="backforget">
				<p className="lead text-center">
					<i className="fas fa-user" /> Crea tu nueva contraseña
				</p>
				<div className="form text-center">
					<div className="form-group">
						<input
							type="password"
							placeholder="Contraseña"
							name="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							placeholder="Confirmación de contraseña"
							name="password2"
							value={password2}
							onChange={e => setPassword2(e.target.value)}
						/>
					</div>

					<button className="btn" id="btn-forget" onClick={handleSendNewPassword}>
						Cambiar contraseña
					</button>
				</div>
				<p className="my-1 text-center">
					Ya tienes una cuenta? <Link to="/register">Registrarse</Link>
				</p>
			</section>
			{redirect ? <Redirect to="/login" /> : null}
		</div>
	);
};
