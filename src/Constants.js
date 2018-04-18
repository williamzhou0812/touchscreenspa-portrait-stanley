import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import RightIcon from 'material-ui/svg-icons/navigation/chevron-right';
import ImageGallery from 'react-image-gallery';
import '../node_modules/react-image-gallery/styles/css/image-gallery.css';
import Rating from "react-rating";
import FullStar from 'material-ui/svg-icons/toggle/star';
import EmptyStar from 'material-ui/svg-icons/toggle/star-border';
import EssentialIcon from './Service/icons/ESSENTIAL_ICON.png';
import MiningIcon from './Service/icons/MINING_ICON.png';
import RetailIcon from './Service/icons/RETAIL_ICON.png';
import TransportIcon from './Service/icons/TRANSPORT_ICON.png';

export const timezone = "Pacific/Port_Moresby";

//const RGBA color
export const HeavyOrange = 'rgb(221, 120, 35)';
export const MediumOrange = 'rgb(220, 156, 56)';
export const LightOrange = 'rgb(225, 173, 56)';
export const HeavyBlue = 'rgb(5, 151, 165)';
export const MediumBlue = 'rgb(73, 175, 189)';
export const LightBlue = 'rgba(73, 175, 189, 0.4)';
export const LightBlueButtonBackground = 'rgb(1, 155, 167)';
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

export const HOST = '192.168.0.160';
export const HOST_SPA = 'localhost';
export const PORT = '8000';
export const PORT_SPA = '3000';
export const DECIMAL_RADIX = 10;
export const SECTION_LIST_ENTRIES = 3;
export const SUBSECTION_LIST_ENTRIES = 6;
export const SLIDE_INTERVAL = 5000; //Every 5 seconds change image in ImageGallery

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

function gatherImages(images) {
    return images.map(image => {
        return { original: image.imageFile };
    });
}

export function imageGallery(
    images,
    imageWidth,
    imageHeight,
    slideInterval = SLIDE_INTERVAL
) {
    return (
        <MuiThemeProvider>
            <ImageGallery
                items={gatherImages(images)}
                autoPlay={true}
                slideInterval={slideInterval}
                lazyLoad={true}
                renderLeftNav={(onClick, _disabled) => (
                    <LeftIcon
                        className="image-gallery-left-nav"
                        onClick={onClick}
                        color={HeavyOrange}
                        style={{ padding: 0, height: 64, width: 64 }}
                    />
                )}
                renderRightNav={(onClick, _disabled) => (
                    <RightIcon
                        className="image-gallery-right-nav"
                        onClick={onClick}
                        color={HeavyOrange}
                        style={{ padding: 0, height: 64, width: 64 }}
                    />
                )}
                renderItem={item => {
                    return (
                        <div className="image-gallery-image">
                            <img
                                src={item.original}
                                alt={item.originalAlt}
                                srcSet={item.srcSet}
                                sizes={item.sizes}
                                title={item.originalTitle}
                                style={{
                                    width: imageWidth,
                                    height: imageHeight
                                }}
                            />
                        </div>
                    );
                }}
                showThumbnails={false}
                showPlayButton={true}
                showFullscreenButton={true}
            />
        </MuiThemeProvider>
    );
}

export function renderRating(initialRating, starSize=50) {
    return (
        <MuiThemeProvider>
            <Rating emptySymbol={<EmptyStar color="white" style={{width: starSize, height: starSize}} />}
            fullSymbol={<FullStar color="white" style={{width: starSize, height: starSize}} />}
            fractions={2} readonly={true} initialRating={initialRating} />
        </MuiThemeProvider>
    );
}

export function removeHttp(website) {
    return website.replace(/^https?:\/\//i, '');
}

export function getServiceTypeListBasedLocation(pathname, serviceTypes) {
    if (pathname.includes(essentialNamespace)) {
        return { ...serviceTypes.essential };
    } else if (pathname.includes(miningNamespace)) {
        return { ...serviceTypes.mining };
    } else if (pathname.includes(retailNamespace)) {
        return { ...serviceTypes.retail };
    } else if (pathname.includes(transportNamespace)) {
        return { ...serviceTypes.transport };
    }
}

export function getServiceTypeDetailBasedLocation(pathname) {
    if (pathname.includes(essentialNamespace)) {
        return { title: "ESSENTIAL SERVICES", icon: EssentialIcon, namespace: essentialNamespace, listKey: "essentialServiceServiceType", imageKey: "imageEssentialService", mapKey: "mapEssentialService" };
    } else if (pathname.includes(miningNamespace)) {
        return { title: "MINING & RESOURCES", icon: MiningIcon, namespace: miningNamespace, listKey: "miningServiceType", imageKey: "imageMining", mapKey: "mapMining" };
    } else if (pathname.includes(retailNamespace)) {
        return { title: "RETAIL & SERVICES", icon: RetailIcon, namespace: retailNamespace, listKey: "retailServiceType", imageKey: "imageRetail", mapKey: "mapRetail" };
    } else if (pathname.includes(transportNamespace)) {
        return { title: "CAR HIRE & TRANSPORT", icon: TransportIcon, namespace: transportNamespace, listKey: "transportationServiceType", imageKey: "imageTransportation", mapKey: "mapTransportation" };
    }
}