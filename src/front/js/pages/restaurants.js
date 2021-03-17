import React, { useContext, useEffect, useState, useRef } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { GranSpinner } from "../component/granSpinner";
import { RestaurantCard } from "../component/restaurantcard";
export const Restaurants = () => {
	const { store, actions } = useContext(Context);
	const [searchOption, setSearchOption] = useState("name");
	const [search, setSearch] = useState("");
	const [restaurants, setRestaurants] = useState(null);
	const inputRef = useRef();
	useEffect(
		function() {
			// actions.getRestaurants();
			if (search == "") {
				fetch(process.env.BACKEND_URL + "/api/restaurants", { method: "GET" })
					.then(resp => resp.json())
					.then(data => setRestaurants(data.results))
					.catch(error => console.log("Error", error));
			}
			// setRestaurants(store.restaurants);
		},
		[search]
	);

	// let restaurants = null;
	// if (searchResults == null) {
	// 	restaurants = store.restaurants;
	// 	console.log(restaurants);
	// } else {
	// 	restaurants == searchResults;
	// }

	function handleSearch() {
		setRestaurants(null);
		let data = {};
		data[searchOption] = search;
		console.log(data);
		fetch(process.env.BACKEND_URL + "/api/restaurant/search/" + searchOption, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then(data => {
				console.log(data.results);
				setRestaurants(data.results);
			})
			.catch(error => {
				console.error("Error:", error);
			});
	}
	return (
		<div className="container-fluid d-flex flex-column justify-content-center">
			<div className="tittle-res">
				<h1>Restaurantes</h1>
			</div>
			<div className="search_var d-flex justify-content-center mt-4" id="searchWrapper">
				<div className="d-flex">
					<div className="d-flex p-2 border rounded col-12">
						<input
							onChange={e => setSearch(e.target.value)}
							type="text"
							className="searchBar"
							id="searchBar"
							placeholder="Buscar..."
							required
							ref={inputRef}
						/>

						<button
							disabled={search != "" ? false : true}
							className="btn-delete-search bg-transparent px-2"
							onClick={() => {
								setSearch("");
								inputRef.current.value = "";
							}}>
							<i
								className={"fas fa-times " + (search != "" ? "text-dark" : "text-white")}
								style={{ fontSize: "18px" }}
							/>
						</button>

						<button className="btn-search bg-transparent px-2" onClick={handleSearch}>
							<i className="fas fa-search" />
						</button>
					</div>
				</div>
				<div className="d-flex ml-3 align-items-center">
					<span className="mr-2">Buscar por: </span>

					<select name="searchOptions" id="searchOptions" onChange={e => setSearchOption(e.target.value)}>
						<option value="name">Nombre</option>
						<option value="category">Categoria</option>
						<option value="address">Ubicacion</option>
					</select>
				</div>
			</div>
			{restaurants == null ? (
				<GranSpinner marginTop="180px" />
			) : (
				<div className="row">
					{restaurants.map(function(restaurant, index) {
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
			)}
		</div>
	);
};
