import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
    name: 'hide',
    standalone: true,
})
export class HidePipe implements PipeTransform {
    public transform(value: boolean | undefined): string {
        return value ? 'block' : 'hidden';
    }
}
