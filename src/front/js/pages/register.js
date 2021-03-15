import React, { useState, useContext, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Spinner } from "../component/spinner";

export const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [welcomeMessage, setWelcomeMessage] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [image, setImage] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [registering, setRegistering] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const [typeUser, setTypeUser] = useState("client");

	const handleRegisterClient = () => {
		const data = { email: email, password: pass, name: username };

		for (const property in data) {
			if (data[property] === "") {
				alert("Todos los campos son requeridos");
				return;
			}
		}

		fetch(process.env.BACKEND_URL + "/api/register/client", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then(data => {
				setRedirect(true);
			})
			.catch(error => {
				console.error("Error:", error);
			});
	};

	const handleRegisterRestaurant = () => {
		const data = {
			email: email,
			password: pass,
			name: username,
			address: address,
			phone: phone,
			category: category,
			welcome_message: welcomeMessage,
			description: description
		};

		for (const property in data) {
			if (data[property] === "") {
				alert("Todos los campos son requeridos");
				return;
			}
		}

		if (image === "") {
			alert("Todos los campos son requeridos");
			return;
		}

		setRegistering(true);

		fetch(process.env.BACKEND_URL + "/api/register/restaurant", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then(async data => {
				let user_restaurant_id = await data.results.id;
				let body = new FormData();
				body.append("image", image[0]);
				const options = {
					body,
					method: "POST"
				};

				fetch(process.env.BACKEND_URL + "/api/restaurants/" + user_restaurant_id + "/image", options)
					.then(resp => resp.json())
					.then(data => {
						// console.log("Success!!!!", data);
						setRegistering(false);
						setRedirect(true);
					})
					.catch(error => console.error("error", error));
			})
			.catch(error => {
				console.error("Error:", error);
			});
	};

	return (
		<div className="d-flex justify-content-center flex-column p-2">
			<div className="col-lg-4 col-md-6 col-12 mx-auto text-center">
				<p className="title-register">Registro</p>
			</div>
			<div className="form-register-container text-center mt-1 d-flex justify-content-center align-items-center p-3 mb-2 text-white col-lg-5 col-md-6 col-12 mx-auto">
				<div style={{ width: "400px" }}>
					<div className="d-flex justify-content-end mb-3">
						<div className="d-flex justify-content-between align-items-center p-0 m-0">
							<label htmlFor="floatingpassword" id="floatingpassword">
								Tipo de usuario:
							</label>
							<select
								name="user-type"
								id="user-type"
								style={{ width: "35%" }}
								onChange={e => setTypeUser(e.target.value)}>
								<option value="client">Cliente</option>
								<option value="restaurant">Restaurante</option>
							</select>
						</div>
					</div>

					<div className="form-floating mb-4 d-flex align-items-center justify-content-between">
						<label htmlFor="floatingpassword">Nombre:</label>
						<input
							type="User"
							className="form-control w-75"
							placeholder=""
							onChange={e => setUsername(e.target.value)}
						/>
					</div>
					<div className="form-floating mb-4 d-flex align-items-center justify-content-between">
						<label htmlFor="floatingpassword">Correo:</label>
						<input
							type="email"
							className="form-control w-75"
							placeholder="nombre@ejemplo.com"
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					<div className="form-floating mb-4 d-flex align-items-center justify-content-between">
						<label htmlFor="floatingpassword">Contraseña:</label>
						<input
							type="password"
							className="form-control w-75"
							placeholder=""
							onChange={e => setPass(e.target.value)}
						/>
					</div>
					{typeUser == "restaurant" ? (
						<Fragment>
							<div className="form-floating mb-4 d-flex align-items-center justify-content-between">
								<label htmlFor="floatingpassword">bienvenida:</label>
								<input
									type="text"
									className="form-control w-75"
									placeholder="ej: Bienvenidos comensales"
									onChange={e => setWelcomeMessage(e.target.value)}
								/>
							</div>
							<div className="form-floating mb-4 d-flex align-items-center justify-content-between">
								<label htmlFor="floatingpassword">Descripción:</label>
								<input
									type="text"
									className="form-control w-75"
									placeholder="ej: El mejor restaurante de comida china para disfrutar con tus amigos y familia."
									onChange={e => setDescription(e.target.value)}
								/>
							</div>

							<div className="form-floating mb-4 d-flex align-items-center justify-content-between">
								<label htmlFor="floatingpassword">Categoría:</label>
								<input
									type="text"
									className="form-control w-75"
									placeholder="ej: Comida china"
									onChange={e => setCategory(e.target.value)}
								/>
							</div>
							<div className="form-floating mb-4 d-flex align-items-center justify-content-between">
								<label htmlFor="floatingpassword">imagen:</label>

								<input
									type="file"
									className="form-control w-75 bg-transparent text-white"
									placeholder="test"
									style={{ border: "none" }}
									onChange={e => setImage(e.target.files)}
								/>
							</div>
							<div className="form-floating mb-4 d-flex align-items-center justify-content-between">
								<label htmlFor="floatingpassword">Dirección:</label>
								<input
									type="text"
									className="form-control w-75"
									placeholder=""
									onChange={e => setAddress(e.target.value)}
								/>
							</div>
							<div className="form-floating mb-4 d-flex align-items-center justify-content-between">
								<label htmlFor="floatingpassword">Teléfono:</label>
								<input
									type="tel"
									className="form-control w-75"
									placeholder=""
									onChange={e => setPhone(e.target.value)}
								/>
							</div>
						</Fragment>
					) : null}

					<div className="mb-4">{registering ? <Spinner /> : null}</div>

					<button
						className="rounded-pill bg-transparent px-3 btn-register"
						onClick={() => {
							if (typeUser == "client") {
								handleRegisterClient();
							} else {
								handleRegisterRestaurant();
							}
							// uploadImage();
						}}>
						Registrarme
					</button>
				</div>
				{redirect ? <Redirect to="/login" /> : ""}
			</div>
		</div>
	);
};
