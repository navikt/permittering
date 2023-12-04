import React from 'react';
import {Heading} from '@navikt/ds-react';
import './Banner.css';
import {BannerPictogram} from "./BannerPictogram";

const Banner: React.FunctionComponent<{tittel: string}> = ({tittel}) => {
    return (
        <div className="banner">
            <div className="banner__inner">
                <BannerPictogram/>
                <Heading level="1" size="xlarge" className="banner__tittel">
                    {tittel}
                </Heading>
            </div>
        </div>
    );
};

export default Banner;
