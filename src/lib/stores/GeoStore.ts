import { readable } from "svelte/store";

type Coordinates = {
    lat: number,
    lon: number
};

export const location = readable<Coordinates|null>(null, function start(set) {
    const setCoords = async () => {
        try {
            const res = await fetch('http://localhost:5173/api/location');
            const data = await res.json();
            const coords: Coordinates = {
                lat: data.lat,
                lon: data.lon
            };
            set(coords);

        } catch (error: any) {
            console.log(error.message);
        }
    };
        
    setCoords();

	return function stop() {
		//teardown code goes here
	};
});