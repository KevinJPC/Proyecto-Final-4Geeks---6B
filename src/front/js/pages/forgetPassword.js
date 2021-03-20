import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Spinner } from "../component/spinner";

export const ForgetPassword = () => {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [redirect, setRedirect] = useState(false);
	const { store, actions } = useContext(Context);
	const [incorrect, setIncorrect] = useState(false);
	const [isSending, setIsSending] = useState(false);

	const handleSubmit = e => {
		setIncorrect(false);
		e.preventDefault();
		if (email === "") {
			alert("correo y contraseña son requeridos");
		}
		console.log(email, pass);

		const data = { email: email };
		setIsSending(true);
		fetch(process.env.BACKEND_URL + "/api/user/send/url", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then(data => {
				console.log("Success:", data);
				if (data.status) {
					setIsSending(false);
					setRedirect(true);
				} else {
					setIncorrect(true);
					setIsSending(false);
				}
			})
			.catch(error => {
				console.error("Error:", error);
			});
	};

	return (
		<div className="d-flex justify-content-center flex-column p-2">
			<div className="col-lg-5 col-md-6 col-12 mx-auto text-center">
				<p className="title-login">Recuperar contraseña</p>
			</div>
			<div className="form-login-container text-center mt-1 py-5 d-flex justify-content-center align-items-center p-3 mb-2 text-white col-lg-5 col-md-6 col-12 mx-auto">
				<div style={{ width: "400px" }}>
					<div className="form-floating pt-3 mb-5 d-flex align-items-center justify-content-between">
						<label htmlFor="floatingPassword">Email:</label>
						<input
							type="email"
							className="form-control w-75"
							placeholder="nombre@ejemplo.com"
							onChange={e => setEmail(e.target.value)}
						/>
					</div>

					{incorrect ? (
						<h6 className="text-center mb-4 text-danger">El correo que ingresó no existe</h6>
					) : null}
					<div className="mb-4 mt-3">{isSending ? <Spinner /> : null}</div>
					<button className="rounded-pill bg-transparent px-3 btn-login" onClick={handleSubmit}>
						Recuperar contraseña
					</button>
					{redirect ? <Redirect to="/forget-password/redirect" /> : ""}
				</div>
			</div>
		</div>
	);
};
