import React, { useState, useContext, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

export const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [redirect, setRedirect] = useState(false);
	const [typeUser, setTypeUser] = useState("client");

	const handleSubmit = e => {
		e.preventDefault();
		if (email === "" || pass === "") {
			alert("correo y contraseña son requeridos");
		}
		console.log(email, pass);

		const data = { email: email, password: pass, username: username };

		fetch("https://3000-yellow-armadillo-foo75dkb.ws-us03.gitpod.io/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then(data => {
				console.log("Success:", data);
				setRedirect(true);
			})
			.catch(error => {
				console.error("Error:", error);
			});
	};

	return (
		<div className="fondoregistro">
			<p id="tituloregistro">Registro</p>
			<div
				className="text-center mt-5 d-flex justify-content-center align-items-center p-3 mb-2 text-dark"
				id="fondonegro">
				<form style={{ width: "400px" }} onSubmit={e => handleSubmit(e)}>
					<select name="user-type" id="user-type" onChange={e => setTypeUser(e.target.value)}>
						<option value="client">Cliente</option>
						<option value="restaurant">Restaurante</option>
					</select>

					<div className="form-floating">
						<input
							type="User"
							className="form-control"
							id="floatingPassword"
							placeholder="Usuario"
							onChange={e => setUsername(e.target.value)}
						/>
					</div>
					<div className="form-floating mb-3">
						<input
							type="email"
							className="form-control"
							id="floatingInput"
							placeholder="name@example.com"
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					<div className="form-floating">
						<input
							type="password"
							className="form-control"
							id="floatingPassword"
							placeholder="Contraseña"
							onChange={e => setPass(e.target.value)}
						/>
					</div>
					{typeUser == "restaurant" ? (
						<Fragment>
							<div className="form-floating">
								<input
									type="password"
									className="form-control"
									id="floatingPassword"
									placeholder="Categoria"
									onChange={e => setPass(e.target.value)}
								/>
							</div>

							<div className="form-floating">
								<input
									type="password"
									className="form-control"
									id="floatingPassword"
									placeholder="Descripción"
									onChange={e => setPass(e.target.value)}
								/>
							</div>
							<div className="form-floating">
								<input
									type="password"
									className="form-control"
									id="floatingPassword"
									placeholder="Imagen"
									onChange={e => setPass(e.target.value)}
								/>
							</div>
						</Fragment>
					) : null}

					<input type="submit" className="Registarse" value="Register" id="registro" />
				</form>
				{redirect ? <Redirect to="/login" /> : ""}
			</div>
		</div>
	);
};
