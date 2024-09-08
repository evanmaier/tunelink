import { GEOCODING_API_KEY } from '$env/static/private';
import { fail, type Actions } from '@sveltejs/kit';
import nodeGeocoder from 'node-geocoder';

const options: nodeGeocoder.Options = {
    provider: 'opencage',
    apiKey: GEOCODING_API_KEY
}

const geocoder = nodeGeocoder(options);

export const actions: Actions = {
    locate: async ({request}) => {
        const data = await request.formData();
        const address = data.get('address')?.toString();
        if (address) {
            try {
                const data = await geocoder.geocode(address);
                console.log()
                            
                return {
                    lat: data[0].latitude,
                    long: data[0].longitude
                }
    
            } catch (error: any) {
                return fail(422, {
                    error: error.message
                })
                
            }
        }
        
    }
};

