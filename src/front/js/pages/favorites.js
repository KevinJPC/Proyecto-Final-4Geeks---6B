import React, { useContext, useEffect } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { GranSpinner } from "../component/granSpinner";
import { NotFound } from "../pages/notFound";
import { RestaurantCardFavorite } from "../component/restaurantcardfavorite";
export const Favorites = () => {
	const { store, actions } = useContext(Context);
	useEffect(function() {
		actions.getFavorites();
	}, []);
	return store.pageNotFound == true ? (
		<NotFound />
	) : store.favoritesRestaurant == null ? (
		<GranSpinner marginTop="250px" />
	) : (
		<div className="container-fluid">
			<div className="tittle text-center mt-2 mb-4">
				<h1>Favoritos</h1>
			</div>
			<div className="row px-3">
				{store.favoritesRestaurant.length != 0 ? (
					store.favoritesRestaurant.map(function(restaurant, index) {
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
					})
				) : (
					<div className="d-flex justify-content-center col-12">
						<h5 className="mt-5 text-center">Aún no tienes favoritos</h5>
					</div>
				)}
				<div />
			</div>
		</div>
	);
};
