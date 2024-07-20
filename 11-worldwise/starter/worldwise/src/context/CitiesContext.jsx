import { createContext, useState, useEffect } from 'react';

const CitiesContext = createContext();

function CitiesProvider(params) {
	const { children } = params;

	const [citiesArray, setCitiesArray] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const controller = new AbortController();

		const fetchCities = async () => {
			try {
				setIsLoading(true);

				const fetchURL = `http://localhost:5000/cities`;
				const fetchOptions = { signal: controller.signal };

				const response = await fetch(fetchURL, fetchOptions);
				if (!response.ok) throw new Error('FETCH ATTEMPT FAILED');

				const data = await response.json();
				setCitiesArray(data);
			} catch (error) {
				if (error.name !== 'AbortError') {
					console.log({ error });
				}
			} finally {
				setIsLoading(false);
			}
		};

		fetchCities();
		return () => {
			controller.abort();
		};
	}, []);

	return (
		<CitiesContext.Provider
			value={{
				citiesArray: citiesArray,
				isLoading: isLoading
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}

export { CitiesProvider, CitiesContext };
