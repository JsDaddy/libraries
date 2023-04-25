import { FormControl, Validators } from '@angular/forms';
import { InputPipe } from './input.pipe';

describe('InputPipe', () => {
    let pipe: InputPipe;

    beforeEach(() => {
        pipe = new InputPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });
    it('should return empty string when the value is null', () => {
        const value = null;
        const result = pipe.transform(value);
        expect(result).toEqual('');
    });

    it('should return empty string when the value is untouched and pristine', () => {
        const value = new FormControl('');
        const result = pipe.transform(value);
        expect(result).toEqual('');
    });

    it('should return "Required" when the value is required and not provided', () => {
        const value = new FormControl('', Validators.required);
        value.markAsTouched();
        const result = pipe.transform(value);
        expect(result).toEqual('Required');
    });

    it('should return "Wrong E-mail" when the value is an invalid email', () => {
        const value = new FormControl('invalid-email', Validators.email);
        value.markAsDirty();
        const result = pipe.transform(value);
        expect(result).toEqual('Wrong E-mail');
    });

    it('should return "Wrong length" when the value is shorter than the minlength', () => {
        const value = new FormControl('abc', Validators.minLength(5));
        value.markAsDirty();
        const result = pipe.transform(value);
        expect(result).toEqual('Wrong length');
    });

    it('should return "valid" when the value is valid and className is true', () => {
        const value = new FormControl('valid-email@example.com', Validators.email);
        value.markAsTouched();
        const result = pipe.transform(value, true);
        expect(result).toEqual('valid');
    });

    it('should return "not-valid" when the value is invalid and className is true', () => {
        const value = new FormControl('invalid-email', Validators.email);
        value.markAsDirty();
        const result = pipe.transform(value, true);
        expect(result).toEqual('not-valid');
    });
});
