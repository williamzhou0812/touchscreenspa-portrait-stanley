import { AIRPORT_INFO } from "./types";
import { getRandomImage, createURL } from "../Constants";
import axios from "axios";

export const fetchAirportDetail = () => async dispatch => {
    const res = await axios.get(createURL('airport/1/'));
    const airportInfoMainImage = getRandomImage(res.data.imageAirport, false);
    const mainImageIndex = res.data.imageAirport.findIndex(image => {
        return image.id = airportInfoMainImage.id;
    });
    dispatch({
        type: AIRPORT_INFO,
        payload: {
            airport: res.data,
            mainImage: airportInfoMainImage.imageFile,
            otherImages: [...res.data.imageAirport.slice(0, mainImageIndex), ...res.data.imageAirport.slice(mainImageIndex + 1)],
            status: res.status
        }
    });
};