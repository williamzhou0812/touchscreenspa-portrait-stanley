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
    dispatch({
        type: ACCOMMODATION_LIST,
        payload: {
            accommodations: res.data,
            accommodationHeaderImages: headerImages,
            statusAccommodations: res.status
        }
    });
};
