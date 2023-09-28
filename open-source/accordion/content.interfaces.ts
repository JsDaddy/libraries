import { UntypedFormControl } from '@angular/forms';

export interface IComDoc {
    header: string;
    text: string;
    code: string;
    id: number;
    anchor?: string;
}

export interface IControl {
    form: UntypedFormControl;
    model: string;
}

export interface IComExample {
    _placeholder: string;
    _mask: string;
    control: IControl;
}

export interface ITextContent {
    content: string;
    id: number;
    scrollTo?: string;
}

export interface IListItem {
    header: string;
    id: number;
    text: ITextContent[];
    defaultSvg?: string;
    activeSvg?: string;
    whiteChevron?: string;
    yellowChevron?: string;
}

export interface IMaskOptions {
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
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface InputTransformFn {
    (value: unknown): string | number;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface OutputTransformFn {
    (value: string | number | undefined | null): unknown;
}

export type TExample<T extends object> = {
    [P in keyof T]: IComExample & Partial<Pick<T, P>>;
}[keyof T];
