import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.scss";
import Compu from "../../img/compu.jpg";

export const PasswordMessage = () => {
	return (
		<div className="">
			<h5 className="text-center mt-3">
				Se le ha enviado un correo electrónico con los pasos a seguir para cambiar la contraseña.
			</h5>
			<img className="mx-auto d-block img-fluid mt-4" src={Compu} width="50%" />
		</div>
	);
};
