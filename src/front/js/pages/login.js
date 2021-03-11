import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [redirect, setRedirect] = useState(false);
	const { store, actions } = useContext(Context);

	const handleLogin = () => {
		if (email === "" || pass === "") {
			alert("correo y contraseña son requeridos");
			return;
		}

		// const data = { email: email, password: pass };

		// fetch("https://3000-yellow-armadillo-foo75dkb.ws-us03.gitpod.io/login", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json"
		// 	},
		// 	body: JSON.stringify(data)
		// })
		// 	.then(response => response.json())
		// 	.then(data => {
		// 		console.log("Success:", data);
		// 		sessionStorage.setItem("u_token", data.token);
		// 		actions.loadFav();
		// 		actions.addUser(data.user);
		// 		setRedirect(true);
		// 	})
		// 	.catch(error => {
		// 		console.error("Error:", error);
		// 	});
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
					<div className="d-flex flex-column col-12">
						<Link to="/recoverPassword">¿Olvidaste tu contraseña?</Link>
					</div>
					<button className="rounded-pill bg-transparent px-3 mt-4 btn-login" onClick={() => handleLogin()}>
						Iniciar sesión
					</button>
				</div>
				{redirect ? <Redirect to="/" /> : ""}
			</div>
		</div>
	);
};
