const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			restaurants: null,
			user: null,
			restaurantesFavoritos: []
		},
		actions: {
			// Use getActions to call a function within a fuction

			getRestaurants: () => {
				fetch(process.env.BACKEND_URL + "/api/restaurants", { method: "GET" })
					.then(resp => resp.json())
					.then(data => setStore({ restaurants: data.results }))
					.catch(error => console.log("Error", error));
			},

			AddRestaurants: () => {
				fetch(process.env.BACKEND_URL + "/api/restaurants/${getStore().user_client.id}/favorites", {
					method: "POST",
					body: `{restaurants:${getStore().restaurantesFavoritos}}`
				}).then(res => console.log(res.json()));
			},

			getUser: user => {
				setStore({ user: user });
			},

			logOut: () => {
				setStore({ user: null });
				sessionStorage.removeItem("u_token");
			},

			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
