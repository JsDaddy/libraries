import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import type { FormControl } from '@angular/forms';

@Pipe({
    name: 'input',
    standalone: true,
    pure: false,
})
export class InputPipe implements PipeTransform {
    public transform(value: FormControl<string | null> | null, className?: boolean): string {
        if (!value) {
            return '';
        }
        if (value.dirty || value.touched) {
            const errors = value.errors;
            if (className && errors) {
                return 'not-valid';
            }
            if (className && !errors && (value.dirty || value.touched)) {
                return 'valid';
            }
            if (errors?.['required']) {
                return 'Required';
            }
            if (errors?.['email']) {
                return 'Wrong E-mail';
            }
            if (errors?.['minlength']) {
                return 'Wrong length';
            }
        }
        return '';
    }
}
