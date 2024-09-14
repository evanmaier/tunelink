import { MAPBOX_ACCESS_TOKEN } from '$env/static/private';
import { json } from '@sveltejs/kit';

export async function POST({ request }: { request: Request }) {
	const { address, location } = await request.json();
	const query = address.replace(/ /g, '%20');
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=${location}&access_token=${MAPBOX_ACCESS_TOKEN}`;

	const response = await fetch(url);
	const data = await response.json();

	return json(data);
}
