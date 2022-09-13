import { useEffect, useState} from 'react';

type UseLocationResult = Readonly<{
    latitude: number,
    longitude: number,
    error: string
}>

type UseLocation = () => UseLocationResult;

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
export const useLocation: UseLocation = ()=> {
    const [latitude, setLatitude] = useState(0);
    const [longitude , setLongitude ] = useState(0);
    const [error, setError] = useState('');

    useEffect(()=> {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            }, ( ) => setError("Not Available"), options);
        } else {
            setError("Not Available")
        }
    }, [])

    return {
        latitude,
        longitude,
        error
    }
}

