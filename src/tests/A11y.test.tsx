import {findByTestId, render} from '@testing-library/react';
import Forside from "../App/Forside/Forside";
import {axe, toHaveNoViolations} from "jest-axe";
import '@testing-library/jest-dom';
import {act} from "react-dom/test-utils";

expect.extend(toHaveNoViolations);

describe('Forside', () => {
    it('Forside får ikke a11y feil', async () => {
        const {container} = render(
            <Forside/>
        );
        jest.useFakeTimers()
        await act(async () => {
            try {
                jest.runAllTimers(); // run all timers so all fetches can finish
            } catch (error) {
                // prevent throw due to all timers not finishing
            }
            jest.useRealTimers()
        });

        expect(await findByTestId(container, 'InformasjonOmMeldeplikt')).toBeInTheDocument();
        expect(await axe(container)).toHaveNoViolations();
    }, 10_000);
});
