import React, { FunctionComponent } from 'react';
import './HovedBanner.less';
import Dekorator from '../komponenter/Dekorator/Dekorator';
interface BannerProps {
    sidetittel: string;
}

const Banner: FunctionComponent<BannerProps> = props => {
    const { sidetittel } = props;
    return <Dekorator sidetittel={sidetittel} />;
};

export default Banner;
