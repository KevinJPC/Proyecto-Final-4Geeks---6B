import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.scss";
import Imagefound from "../../img/image-not-Found.jpg";

export const NotFound = () => {
	return (
		<div className="">
			<img className="mx-auto d-block img-fluid mt-4" src={Imagefound} width="50%" />
			<h5 className="text-center">Parece que no podemos encontrar la página que estás buscando.</h5>
		</div>
	);
};
