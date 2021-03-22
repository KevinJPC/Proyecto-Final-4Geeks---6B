import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { NotFound } from "./pages/notFound";
import { PasswordMessage } from "./pages/passwordMessage";
import { ForgetPassword } from "./pages/forgetPassword";
import { Login } from "./pages/login";
import { Favorites } from "./pages/favorites";
import { Reviews } from "./pages/reviews";
import { RestaurantAdmin } from "./pages/restaurantAdmin";
import { Restaurant } from "./pages/restaurant";
import { ChangePassword } from "./pages/changePassword";
import { Restaurants } from "./pages/restaurants";
import { Register } from "./pages/register";
import { Home } from "./pages/home";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/register">
							<Register />
						</Route>
						<Route exact path="/restaurant/:name/:id/reviews">
							<Reviews />
						</Route>
						<Route exact path="/restaurant/admin">
							<RestaurantAdmin />
						</Route>
						<Route exact path="/restaurant/:name/:id">
							<Restaurant />
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/forget-password/redirect">
							<PasswordMessage />
						</Route>
						<Route exact path="/restaurants">
							<Restaurants />
						</Route>
						<Route exact path="/favorites">
							<Favorites />
						</Route>
						<Route exact path="/change-password/:token">
							<ChangePassword />
						</Route>
						<Route exact path="/forget-password">
							<ForgetPassword />
						</Route>
						<Route>
							<NotFound />
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
