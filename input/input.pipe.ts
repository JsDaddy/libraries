import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
    name: 'input',
    standalone: true,
    pure: false,
})
export class InputPipe implements PipeTransform {
    // type-coverage:ignore-next-line
    public transform(value: any | null, className?: boolean): string {
        if (!value) {
            return '';
        }
        // Call FieldTree to get FieldState, then access signals
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
            if (errors.some((e: any) => e.kind === 'required')) {
                return 'Required';
            }
            if (errors.some((e: any) => e.kind === 'email')) {
                return 'Wrong E-mail';
            }
            if (errors.some((e: any) => e.kind === 'minlength')) {
                return 'Wrong length';
            }
        }
        return '';
    }
}
