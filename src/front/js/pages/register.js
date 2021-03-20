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
	const [incorrect, setIncorrect] = useState(false);
	const [messageIncorrect, setMessageIncorrect] = useState("");

	const handleRegisterClient = () => {
		const data = { email: email, password: pass, name: username };

		for (const property in data) {
			setIncorrect(false);
			if (data[property] === "") {
				setIncorrect(true);
				setMessageIncorrect("Todos los campos son requeridos");
				return;
			}
		}
		setRegistering(true);
		fetch(process.env.BACKEND_URL + "/api/register/client", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(response => {
				if (response.ok == false) {
					setIncorrect(true);
					setMessageIncorrect("Ya existe una cuenta asociada a este correo");
				}
				return response.json();
			})
			.then(data => {
				setRegistering(false);
				if (data.status) {
					setRedirect(true);
				}
			})
			.catch(error => {
				console.error("Error:", error);
			});
	};

	const handleRegisterRestaurant = () => {
		setIncorrect(false);
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
				setIncorrect(true);
				setMessageIncorrect("Todos los campos son requeridos");
				return;
			}
		}

		if (image === "") {
			setIncorrect(true);
			setMessageIncorrect("Todos los campos son requeridos");
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
			.then(response => {
				if (response.ok == false) {
					setIncorrect(true);
					setMessageIncorrect("Ya existe una cuenta asociada a este correo");
				}
				return response.json();
			})
			.then(async data => {
				setRegistering(false);
				if (data.status) {
					setRedirect(true);

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
				}
			})

			.catch(error => {
				console.error("Error:", error);
			});
	};

	return (
		<div className="d-flex justify-content-center flex-column p-2">
			<div className="col-lg-4 col-md-6 col-12 mx-auto text-center">
				<h1 className="title">Registro</h1>
			</div>
			<div className="form-register-container text-center mt-4 d-flex justify-content-center align-items-center p-3 mb-2 text-white col-lg-5 col-md-6 col-12 mx-auto">
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
							maxLength="50"
							type="User"
							className="form-control w-75"
							placeholder="Nombre"
							onChange={e => setUsername(e.target.value)}
						/>
					</div>
					<div className="form-floating mb-4 d-flex align-items-center justify-content-between">
						<label htmlFor="floatingpassword">Correo:</label>
						<input
							maxLength="120"
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
							placeholder="......."
							onChange={e => setPass(e.target.value)}
						/>
					</div>
					{typeUser == "restaurant" ? (
						<Fragment>
							<div className="form-floating mb-4 d-flex align-items-center justify-content-between">
								<label htmlFor="floatingpassword">Bienvenida:</label>
								<input
									maxLength="50"
									type="text"
									className="form-control w-75"
									placeholder="ej: Bienvenidos comensales"
									onChange={e => setWelcomeMessage(e.target.value)}
								/>
							</div>
							<div className="form-floating mb-4 d-flex align-items-center justify-content-between">
								<label htmlFor="floatingpassword">Descripción:</label>
								<input
									maxLength="400"
									type="text"
									className="form-control w-75"
									placeholder="ej: El mejor restaurante de comida china para disfrutar con tus amigos y familia."
									onChange={e => setDescription(e.target.value)}
								/>
							</div>

							<div className="form-floating mb-4 d-flex align-items-center justify-content-between">
								<label htmlFor="floatingpassword">Categoría:</label>
								<input
									maxLength="50"
									type="text"
									className="form-control w-75"
									placeholder="ej: Comida china"
									onChange={e => setCategory(e.target.value)}
								/>
							</div>
							<div className="form-floating mb-4 d-flex align-items-center justify-content-between">
								<label htmlFor="floatingpassword">Imagen:</label>

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
									maxLength="100"
									type="text"
									className="form-control w-75"
									placeholder="Dirección"
									onChange={e => setAddress(e.target.value)}
								/>
							</div>
							<div className="form-floating mb-4 d-flex align-items-center justify-content-between">
								<label htmlFor="floatingpassword">Teléfono:</label>
								<input
									maxLength="50"
									type="tel"
									className="form-control w-75"
									placeholder="Teléfono"
									onChange={e => setPhone(e.target.value)}
								/>
							</div>
						</Fragment>
					) : null}

					<div className="mb-4">{registering ? <Spinner /> : null}</div>

					<p className="my-1 text-center mb-4">
						Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
					</p>
					{incorrect ? <p className="text-danger mt-n3">{messageIncorrect}</p> : null}
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
