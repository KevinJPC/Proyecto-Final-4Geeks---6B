import React, { useContext, useEffect } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { RestaurantCardFavorite } from "../component/restaurantcardfavorite";
export const Favorites = () => {
	const { store, actions } = useContext(Context);

	return store.restaurants == null ? null : (
		<div className="container-fluid">
			<div className="tittle-res">
				<h1>Favoritos</h1>
			</div>
			<div className="row">
				{store.favoritesRestaurant.map(function(restaurant, index) {
					return (
						<RestaurantCardFavorite
							id={restaurant.user_restaurant_id}
							image_url={restaurant.user_restaurant_image_url}
							name={restaurant.user_restaurant_name}
							category={restaurant.user_restaurant_category}
							address={restaurant.user_restaurant_address}
							rating={parseFloat(restaurant.rating)}
							key={index}
						/>
					);
				})}
				<div />
			</div>
		</div>
	);
};
