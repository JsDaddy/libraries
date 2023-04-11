import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'asset',
    standalone: true,
})
export class AssetPipe implements PipeTransform {
    public transform(nameImg: string | undefined, additionalPath = '', isWebp = false): string {
        if (!nameImg) {
            return '';
        }
        if (additionalPath) {
            return `assets/images/${additionalPath}/${nameImg}.${isWebp ? 'webp' : 'svg'}`;
        }
        return `assets/images/${nameImg}.svg`;
    }
}
