import type { FieldTree } from '@angular/forms';

export type ComDoc = {
    header: string;
    text: string;
    code: string;
    id: number;
    anchor?: string;
};

export type Control = {
    form: FieldTree<string | null>;
    model: string;
};

export type ComExample = {
    _placeholder?: string;
    _mask: string;
    control: Control;
};

export type TextContent = {
    content: string;
    id: number;
    scrollTo?: string;
};

export type ListItem = {
    header: string;
    id: number;
    text: TextContent[];
    defaultSvg?: string;
    activeSvg?: string;
    whiteChevron?: string;
    yellowChevron?: string;
};

export type MaskOptions = {
    _prefix: string;
    _suffix: string;
    _dropSpecialCharacters: boolean | string[];
    _showMaskTyped: boolean;
    _clearIfNotMatch: boolean;
    _shownMaskExpression: string;
    _validation: boolean;
    _allowNegativeNumbers: boolean;
    _hiddenInput: boolean;
    _leadZero: boolean;
    _specialCharacters: string | string[];
    _apm: boolean;
    _decimalMarker: string | string[];
    _thousandSeparator: string;
    _keepCharacterPositions: boolean;
    _inputTransformFn: InputTransformFn;
    _outputTransformFn: OutputTransformFn;
};

export type InputTransformFn = (value: unknown) => string | number;

export type OutputTransformFn = (value: string | number | undefined | null) => unknown;

export type TExample<T extends object> = {
    [P in keyof T]: ComExample & Partial<Pick<T, P>>;
}[keyof T];
