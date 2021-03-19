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
	const [edit, setEdit] = useState(false);
	const inputRef = useRef();
	const selectRef = useRef();
	let lastSearch = null;
	let lastSearchOption = null;
	useEffect(
		function() {
			lastSearch = sessionStorage.getItem("lastSearch");
			lastSearchOption = sessionStorage.getItem("lastSearchOption");
			if (lastSearch != null && lastSearchOption != null && edit == false) {
				console.log(lastSearch);
				console.log(lastSearchOption);
				setSearch(lastSearch);
				setSearchOption(lastSearchOption);
				inputRef.current.value = lastSearch;
				selectRef.current.value = lastSearchOption;
				handleSearch(lastSearch, lastSearchOption);
			} else {
				// console.log(lastSearch);
				if (search == "") {
					fetch(process.env.BACKEND_URL + "/api/restaurants", { method: "GET" })
						.then(resp => resp.json())
						.then(data => setRestaurants(data.results))
						.catch(error => console.log("Error", error));
				}
			}
		},
		[search]
	);

	function handleSearch(search, searchOption) {
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
			<div className="tittle mt-2 text-center">
				<h1>Restaurantes</h1>
			</div>
			<div className="d-flex justify-content-center mt-4 col-12 col-lg-6 mx-auto flex-column flex-md-row flex-lg-row">
				<div className="d-flex justify-content-center">
					<div className="d-flex p-2 border rounded">
						<input
							onChange={e => {
								setSearch(e.target.value);
								setEdit(true);
							}}
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
								sessionStorage.removeItem("lastSearch");
								sessionStorage.removeItem("lastSearchOption");
							}}>
							<i
								className={"fas fa-times " + (search != "" ? "text-dark" : "text-white")}
								style={{ fontSize: "18px" }}
							/>
						</button>

						<button
							className="btn-search bg-transparent px-2"
							onClick={() => {
								sessionStorage.setItem("lastSearch", search);
								sessionStorage.setItem("lastSearchOption", searchOption);
								handleSearch(search, searchOption);
							}}>
							<i className="fas fa-search" />
						</button>
					</div>
				</div>
				<div className="d-flex ml-lg-3 ml-md-3 mt-2 mt-lg-0 mt-md-0 align-items-center justify-content-center">
					<span className="mr-2">Buscar por: </span>

					<select
						name="searchOptions"
						id="searchOptions"
						onChange={e => {
							setSearchOption(e.target.value);
							setEdit(true);
						}}
						ref={selectRef}>
						<option value="name">Nombre</option>
						<option value="category">Categoría</option>
						<option value="address">Ubicación</option>
					</select>
				</div>
			</div>
			{restaurants == null ? (
				<div className="mt-5 d-flex justify-content-center">
					<GranSpinner marginTop="1px" />
				</div>
			) : restaurants.length != 0 ? (
				<div className="container-fluid mt-3">
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
				</div>
			) : (
				<div className="d-flex justify-content-center">
					<h5 className="mt-5">Sin resultados</h5>
				</div>
			)}
		</div>
	);
};
