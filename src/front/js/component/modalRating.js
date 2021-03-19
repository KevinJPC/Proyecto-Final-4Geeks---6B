import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
export function ModalRating() {
	const [redirectLogin, setRedirectLogin] = useState(false);
	const [redirectRegister, setRedirectRegister] = useState(false);

	return (
		<div
			style={{ marginTop: "57px" }}
			className="modal fade"
			id="modalRating"
			tabIndex="-1"
			role="dialog"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true">
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">
							Comparte tu reseña
						</h5>

						{/* <i className="far fa-heart" /> */}
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body text-center">
						<p>Envía tu comentario y valoración sobre un restaurante para proporcionar feedback al mismo</p>
						<div className="">
							<i className="fas fa-star" />
							<i className="fas fa-star" />
							<i className="fas fa-star" />
							<i className="fas fa-star" />
							<i className="fas fa-star" />
						</div>
					</div>
					<div className="col-sm-12 d-flex flex-column pb-4">
						<div className="col-auto d-flex justify-content-center mt-4 mb-4 mb-md-0 mb-lg-0">
							<button
								data-dismiss="modal"
								className="rounded-pill btn-restaurants px-5 text-white"
								style={{ backgroundColor: "black", outline: "none" }}
								onClick={() => {
									setRedirectLogin(true);
								}}>
								Iniciar sesión
							</button>
						</div>

						<div className="col-auto d-flex justify-content-center mt-4 mb-4 mb-md-0 mb-lg-0">
							<button
								data-dismiss="modal"
								className="rounded-pill bg-transparent btn-restaurants px-5"
								style={{ backgroundColor: "black", outline: "none" }}
								onClick={() => {
									setRedirectRegister(true);
								}}>
								Registrarme
							</button>
						</div>
						{/* <Link to="/register">
							<span>Iniciar sesión</span>
						</Link> */}
					</div>
					{/* <div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-dismiss="modal">
							Close
						</button>
						<button type="button" className="btn btn-primary">
							Save changes
						</button>
					</div> */}
				</div>
			</div>
			{redirectLogin ? <Redirect to="/login" /> : null}
			{redirectRegister ? <Redirect to="/register" /> : null}
		</div>
	);
}
