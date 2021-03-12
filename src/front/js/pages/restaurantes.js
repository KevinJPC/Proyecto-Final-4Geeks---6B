import React, { useContext, useEffect } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { RestaurantCard } from "../component/restaurantcard";
export const Restaurantes = () => {
	const { store, actions } = useContext(Context);

	useEffect(function() {
		actions.getRestaurants();
	}, []);
	return store.restaurants == null ? null : (
		<div className="container-fluid">
			<div className="tittle-res">
				<h1>Restaurantes</h1>
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
							rating={restaurant.rating}
							key={index}
						/>
					);
				})}
			</div>
		</div>
	);
};
