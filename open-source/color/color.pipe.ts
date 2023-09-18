import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'color',
})
export class ColorPipe implements PipeTransform {
    public transform(
        value: number | string | undefined,
        comparison: number | string | undefined
    ): string {
        return value === comparison ? 'yellow' : 'black';
    }
}
