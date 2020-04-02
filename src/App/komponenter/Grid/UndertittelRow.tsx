import React, { FunctionComponent } from 'react';
import { Column, Row } from 'nav-frontend-grid';
import { Undertittel } from 'nav-frontend-typografi';

const UndertittelRow: FunctionComponent = ({ children }) => {
    return (
        <Row className="">
            <Column md="12">
                <Undertittel>{children}</Undertittel>
            </Column>
        </Row>
    );
};

export default UndertittelRow;
