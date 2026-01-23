import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import type { FieldTree, ValidationError } from '@angular/forms/signals';

@Pipe({
    name: 'input',
    standalone: true,
    pure: false,
})
export class InputPipe implements PipeTransform {
    public transform(value: FieldTree<string> | null, className?: boolean): string {
        if (!value) {
            return '';
        }

        const fieldState = value();
        const dirty = fieldState.dirty();
        const touched = fieldState.touched();
        const errors = fieldState.errors();

        if (dirty || touched) {
            if (className && errors.length > 0) {
                return 'not-valid';
            }
            if (className && errors.length === 0 && (dirty || touched)) {
                return 'valid';
            }
            if (errors.some((e: ValidationError) => e.kind === 'required')) {
                return 'Required';
            }
            if (errors.some((e: ValidationError) => e.kind === 'email')) {
                return 'Wrong E-mail';
            }
            if (errors.some((e: ValidationError) => e.kind === 'minlength')) {
                return 'Wrong length';
            }
        }
        return '';
    }
}
