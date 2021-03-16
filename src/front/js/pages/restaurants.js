import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { RestaurantCard } from "../component/restaurantcard";
export const Restaurants = () => {
	const { store, actions } = useContext(Context);
	const [searchOption, setSearchOption] = useState("name");
	const [search, setSearch] = useState("");

	useEffect(function() {
		actions.getRestaurants();
	}, []);

	function handleSearch() {
		let data = {};
		data[searchOption] = search;
		console.log(data);
		fetch(process.env.BACKEND_URL + "/api/restarant/search/" + searchOption, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then(data => {
				console.log(data.results);
			})
			.catch(error => {
				console.error("Error:", error);
			});
	}

	return store.restaurants == null ? null : (
		<div className="container-fluid">
			<div className="tittle-res">
				<h1>Restaurantes</h1>
			</div>
			<div className="search_var" id="searchWrapper">
				<input
					onChange={e => setSearch(e.target.value)}
					type="text"
					className="searchBar"
					id="searchBar"
					placeholder="Buscar..."
					required
				/>
				<button className="boton" onClick={handleSearch}>
					<i className="fas fa-search" />
				</button>
				<select name="cars" id="cars" onChange={e => setSearchOption(e.target.value)}>
					<option value="name">Nombre</option>
					<option value="category">Categoria</option>
					<option value="address">Ubicacion</option>
				</select>
			</div>
			<div className="row">
				{store.restaurants.map(function(restaurant, index) {
					return (
						<RestaurantCard
							id={restaurant.id}
							image_url={restaurant.image_url}
							name={restaurant.name}
							category={restaurant.category}
							address={restaurant.address}
							rating={parseFloat(restaurant.rating)}
							key={index}
						/>
					);
				})}
			</div>
		</div>
	);
};
