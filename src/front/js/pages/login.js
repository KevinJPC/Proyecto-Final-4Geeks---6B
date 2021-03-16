import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Spinner } from "../component/spinner";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [incorrectCredentials, setIncorrectCredentials] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const [loading, setLoading] = useState(false);
	const { store, actions } = useContext(Context);

	const handleLogin = () => {
		if (email === "" || pass === "") {
			alert("correo y contraseña son requeridos");
			return;
		}

		const data = { email: email, password: pass };
		setIncorrectCredentials(false);
		setLoading(true);
		fetch(process.env.BACKEND_URL + "/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then(data => {
				// console.log("Success:", data);
				if (data.status) {
					sessionStorage.setItem("u_token", data.token);
					actions.getUser(data.user);
					setRedirect(true);
				} else {
					setIncorrectCredentials(true);
				}
				setLoading(false);
			})
			.catch(error => {
				// console.error("Error:", error);
			});
	};

	return (
		<div className="d-flex justify-content-center flex-column p-2">
			<div className="col-lg-5 col-md-6 col-12 mx-auto text-center">
				<p className="title-login">Inicio de sesión</p>
			</div>
			<div className="form-login-container text-center mt-1 d-flex justify-content-center align-items-center p-3 mb-2 text-white col-lg-5 col-md-6 col-12 mx-auto">
				<div style={{ width: "400px" }}>
					<div className="form-floating mb-4 mt-5 d-flex align-items-center justify-content-between">
						<label htmlFor="floatingPassword">Email:</label>
						<input
							type="email"
							className="form-control w-75"
							placeholder="nombre@ejemplo.com"
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					<div className="form-floating mb-4 d-flex align-items-center justify-content-between">
						<label htmlFor="floatingPassword">contraseña:</label>
						<input
							type="password"
							className="form-control w-75"
							placeholder="Password"
							onChange={e => setPass(e.target.value)}
						/>
					</div>

					{incorrectCredentials ? (
						<div>
							<p>Email o contraseña incorrectos</p>
						</div>
					) : null}
					{loading ? <Spinner /> : null}

					<div className="d-flex flex-column col-12">
						<Link to="/forget-password">¿Olvidaste tu contraseña?</Link>
					</div>
					<button className="rounded-pill bg-transparent px-3 mt-4 btn-login" onClick={() => handleLogin()}>
						Iniciar sesión
					</button>
				</div>
				{redirect ? (
					store.user.type_user == "client" ? (
						<Redirect to="/restaurants" />
					) : (
						<Redirect to="/restaurant/admin" />
					)
				) : (
					""
				)}
			</div>
		</div>
	);
};
