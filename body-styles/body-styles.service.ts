import { Injectable } from '@angular/core';

@Injectable()
export class BodyStylesService {
    public setOverflowBody(hidden: boolean): void {
        const body = document.querySelector('body');
        if (!body) {
            return;
        }
        body.style.overflowY = hidden ? 'hidden' : 'overlay';
    }
}
