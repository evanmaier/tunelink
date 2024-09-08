import { GEOCODING_API_KEY } from '$env/static/private';
import { fail, type Actions } from '@sveltejs/kit';
import  NodeGeocoder  from 'node-geocoder';
import { GeoPoint } from 'firebase/firestore';

const geocoder = NodeGeocoder({
    provider: 'opencage',
    apiKey: GEOCODING_API_KEY
  });

export const actions: Actions = {
    locate: async ({request}) => {
        const data = await request.formData();
        const address = data.get('address');
        try {
            const result = await geocoder.geocode(address);
            const location = new GeoPoint(result.latitude, result.longitude);
            console.log(location);
            return { location };

        } catch (error: any) {
            return fail(422, {
                error: error.message
            })
            
        }
    }
};

