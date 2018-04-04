export const timezone = "Pacific/Port_Moresby";

//const RGBA color
export const HeavyOrange = 'rgb(221, 120, 35)';
export const MediumOrange = 'rgb(220, 156, 56)';
export const LightOrange = 'rgb(225, 173, 56)';
export const HeavyBlue = 'rgb(5, 151, 165)';
export const MediumBlue = 'rgb(73, 175, 189)';
export const LightBlue = 'rgba(73, 175, 189, 0.4)';
export const ExtraHeavyBlueGreen = 'rgb(5, 140, 155)';
export const SelectedBorderColor = 'rgb(183, 223, 228)';

// CONSTANT FOR SPA ROUTING
export const accomodationNamespace = '/accomodations';
export const eventNamespace = '/events';
export const diningNamespace = '/dining';
export const destinationNamespace = '/destinations';
export const serviceNamespace = '/services';
export const triviaNamespace = '/trivia';
export const mapListNamespace = '/maplist';
export const activityNamespace = '/activities';
export const essentialNamespace = `${serviceNamespace}/essential`;
export const transportNamespace = `${serviceNamespace}/transport`;
export const retailNamespace = `${serviceNamespace}/retail`;
export const miningNamespace = `${serviceNamespace}/mining`;
export const airportMapNamespace = '/airportmap';
export const airportInfoNamespace = '/airportinfo';
// END OF CONSTANTS FOR SPA ROUTING

export const HOST = '192.168.0.162';
export const HOST_SPA = '192.168.0.162';
export const PORT = '8000';
export const PORT_SPA = '3000';
export const DECIMAL_RADIX = 10;

export function createURL(namespace) {
    return 'http://' + HOST + ':' + PORT + '/' + namespace;
}

export function getHeaderImagesNoMap(images, mapTitle = 'map') {
    let output = [];
    images.forEach((i, _) => {
        const title = i.title.toLowerCase();
        if (i.isHeaderImage && !title.includes(mapTitle)) {
            output.push(i);
        }
    });
    return output;
}

export function getRandomImage(images, return_url = true) {
    let index;
    if (images.length === 1) {
        index = 0;
    } else if (images.length === 0) {
        return null;
    } else {
        index = Math.floor(Math.random() * images.length);
    }
    if (return_url) {
        return images[index].imageFile;
    } else {
        return images[index];
    }
}

export function shiftArray(list, by) {
    let temp = Array.apply(null, Array(list.length)).map(
        Number.prototype.valueOf,
        0
    );
    if (list.length <= 1 || by === 0) {
        return list;
    }
    // console.log('Need to manipulate list of ', list);
    // console.log('Manipulate by ', by);
    list.forEach((item, i) => {
        let to = i + by;
        if (to >= list.length) {
            while (to >= list.length) {
                to -= list.length;
            }
        } else if (to < 0) {
            while (to < 0) {
                to += list.length;
            }
        }
        // console.log(`Item[${i}] moved to index ${to}`);
        temp[to] = item;
        // console.log('Current output array: ', temp);
        // console.log('\n\n');
    });
    return temp;
}