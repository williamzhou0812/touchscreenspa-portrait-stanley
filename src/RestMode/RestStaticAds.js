import React from "react";
import { randomiseButKeepOrder, getRandomImage } from "../Constants";
import { connect } from "react-redux";
import ImageGallery from "react-image-gallery";

export const ReactStaticAds = props => {
    const { ads } = props;
    const modifiedImages = randomiseButKeepOrder(ads)
        .filter(ad => {
            return ad.imageAdvertisement && ad.imageAdvertisement.length > 0;
        })
        .map(ad => {
            return { original: getRandomImage(ad.imageAdvertisement) };
        });
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <ImageGallery
                items={modifiedImages}
                slideInterval={10000}
                showThumbnails={false}
                showPlayButton={false}
                showFullscreenButton={false}
                autoPlay={true}
                showNav={false}
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
                                    width: "100%",
                                    height: "33.3vh"
                                }}
                            />
                        </div>
                    );
                }}
            />
        </div>
    );
};

const mapStateToProps = ({ showcaseAdvertisementList }) => {
    const { ads } = showcaseAdvertisementList;
    return {
        ads
    };
};
export default connect(
    mapStateToProps,
    null
)(ReactStaticAds);
