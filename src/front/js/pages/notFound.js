import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.scss";
import Imagefound from "../../img/image-not-Found.jpg";

export const NotFound = () => {
	return (
		<div className="">
			<div className="col-12 col-lg-6 col-md-6 d-flex align-items-center mx-auto">
				<img className="mx-auto d-block img-fluid mt-4" src={Imagefound} />
			</div>
			<h5 className="text-center">Parece que no podemos encontrar la página que estás buscando.</h5>
		</div>
	);
};
