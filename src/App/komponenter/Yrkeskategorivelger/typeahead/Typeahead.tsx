import { MagnifyingGlassIcon, XMarkIcon } from '@navikt/aksel-icons';
import { BodyShort, Label, Tag, useId } from '@navikt/ds-react';
import {
    Combobox,
    ComboboxInput,
    ComboboxList,
    ComboboxOption,
    ComboboxOptionText,
    ComboboxPopover,
} from '@reach/combobox';
import React, { FormEventHandler, FunctionComponent, ReactNode } from 'react';
import './Typeahead.css';
import '@reach/combobox/styles.css';

/**
 * Denne implementasjonen er lånt med modifikasjoner fra
 * https://github.com/navikt/rekrutteringsbistand-kandidatsok/tree/main/src/filter/typeahead
 */

type Props = {
    children?: ReactNode;
    value: string;
    label: string;
    description?: string;
    suggestions: string[];
    suggestionsId?: string;
    selectedSuggestions: string[];
    onRemoveSuggestion: (suggestion: string) => () => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSelect: (selection: string) => void;
    allowUnmatchedInputs?: boolean;
};

export const Typeahead: FunctionComponent<Props> = ({
    label,
    value,
    description,
    suggestions,
    suggestionsId,
    selectedSuggestions,
    onRemoveSuggestion,
    onSelect,
    onChange,
    allowUnmatchedInputs = true,
}) => {
    const inputId = useId();
    const descriptionId = useId();

    const onSubmit: FormEventHandler = (event) => {
        event.preventDefault();

        const matchedSuggestion = suggestions.find(
            (suggestion) => value.toLowerCase() === suggestion.toLowerCase()
        );

        if (matchedSuggestion) {
            onSelect(matchedSuggestion);
        } else if (allowUnmatchedInputs) {
            onSelect(uppercaseFirstLetter(value));
        } else if (suggestions.length > 0) {
            onSelect(suggestions[0]);
        }
    };

    const suggestionsWithoutSelected = suggestions.filter(
        (suggestion) => !selectedSuggestions.includes(suggestion)
    );

    return (
        <form onSubmit={onSubmit} className={'typeahead-form navds-form-field'}>
            <Label htmlFor={inputId} className="navds-form-field__label">
                {label}
            </Label>
            <BodyShort
                size="small"
                as="div"
                id={descriptionId}
                className="navds-form-field__description"
            >
                {description}
            </BodyShort>
            <Combobox className="navds-search__wrapper" onSelect={onSelect}>
                <div className="navds-search__wrapper-inner">
                    <ComboboxInput
                        id={inputId}
                        autoComplete="off"
                        aria-describedby={descriptionId}
                        className={
                            '.input navds-search__input navds-search__input--secondary navds-text-field__input navds-body-short navds-body-medium'
                        }
                        onChange={onChange}
                        value={value}
                    />
                </div>
                <button
                    className={
                        'navds-search__button-search navds-button navds-button--secondary navds-button--medium navds-button--icon-only'
                    }
                >
                    <span className="navds-button__icon">
                        <MagnifyingGlassIcon />
                    </span>
                </button>

                {suggestionsWithoutSelected.length > 0 && (
                    <ComboboxPopover id={suggestionsId} className="suggestionPopover">
                        <ComboboxList>
                            {suggestionsWithoutSelected.map((suggestion) => (
                                <ComboboxOption
                                    key={suggestion}
                                    value={suggestion}
                                    className={'navds-body-short suggestion'}
                                >
                                    <ComboboxOptionText />
                                </ComboboxOption>
                            ))}
                        </ComboboxList>
                    </ComboboxPopover>
                )}
            </Combobox>

            <div className="selected-suggestions">
                {selectedSuggestions.map((suggestion) => (
                    <Tag variant="info" size="small" className="selected-suggestion">
                        {suggestion}
                        <XMarkIcon onClick={onRemoveSuggestion(suggestion)} />
                    </Tag>
                ))}
            </div>
        </form>
    );
};

const uppercaseFirstLetter = (s: string) => {
    return s.length === 0 ? s : s[0].toUpperCase() + s.slice(1);
};
