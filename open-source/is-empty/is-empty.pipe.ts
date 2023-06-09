import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'isEmpty',
    standalone: true,
})
export class IsEmptyPipe implements PipeTransform {
    public transform(value: string | undefined): string {
        return value || 'Empty';
    }
}
