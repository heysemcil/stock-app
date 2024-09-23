// address  => lat, long
// lat, long => address
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyD8IPCxZZMLEmwmGb02HXPb6RsdJ8EMvk8");
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();



export async function geocode(address){
    const res = await Geocode.fromAddress(address)
    console.log(res.results[0].geometry.location)
    return res.results[0].geometry.location;
}

