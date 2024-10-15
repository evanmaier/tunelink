import { MAPBOX_ACCESS_TOKEN } from '$env/static/private';
import { json } from '@sveltejs/kit';

export async function POST({ request }: { request: Request }) {
	const { coords } = await request.json();
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords}.json?access_token=${MAPBOX_ACCESS_TOKEN}`;

	const response = await fetch(url);
	const data = await response.json();

	return json(data);
}
