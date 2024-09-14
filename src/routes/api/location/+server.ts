import { type RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent) {
	let query = event.getClientAddress();
	if (query == '127.0.0.1') {
		query = '216.71.204.252';
	}
	const url = `http://ip-api.com/json/${query}?fields=status,message,lat,lon`;
	try {
		const res = await event.fetch(url);
		return res;
	} catch (error: any) {
		return new Response(JSON.stringify({ message: error.message }), { status: 400 });
	}
}
