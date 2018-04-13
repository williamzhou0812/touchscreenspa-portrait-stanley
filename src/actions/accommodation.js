import { ACCOMMODATION_LIST } from './types';
import axios from 'axios';
import { createURL, getHeaderImagesNoMap, getRandomImage } from '../Constants';

function getHeaderImageFromAccommodation(data) {
    let randomImages = [];
    //Getting all images from all accommodations according to destination
    data.forEach((d, _) => {
        let tempImages = [];
        d.accomodationDestination.forEach((acco, _) => {
            const headerImages = getHeaderImagesNoMap(acco.imageAccomodation);
            tempImages = [...tempImages, ...headerImages];
        });
        randomImages.push(getRandomImage(tempImages));
    });
    return randomImages;
}

export const fetchAccommodationList = () => async dispatch => {
    const res = await axios.get(createURL('destinationaccomodation/'));
    const headerImages = getHeaderImageFromAccommodation(res.data);
    let dests = res.data.slice();
    dests.forEach((dest) => {
        dest.mapHotels = [];
        dest.accomodationDestination.forEach((acco) => {
            dest.mapHotels = [...dest.mapHotels, ...acco.imageAccomodation.filter((item) => {
                return item.title.toLowerCase().includes("map");
            })];
            const accommodationImages = acco.imageAccomodation.filter((item) => {
                return !(item.title.toLowerCase().includes("map")) && !item.isHeaderImage;
            })
            acco.imageAccomodation = accommodationImages;
        });
    });
    dispatch({
        type: ACCOMMODATION_LIST,
        payload: {
            accommodations: dests,
            images: headerImages,
            status: res.status
        }
    });
};
