import { Injectable } from '@angular/core';

@Injectable()
export class BodyStylesService {
    public setOverflowYBody(hidden: boolean): void {
        const body = document.querySelector('body');
        const html = document.querySelector('html');
        if (!body || !html) {
            return;
        }
        body.style.overflowY = hidden ? 'hidden' : 'overlay';
        html.style.overflowY = hidden ? 'hidden' : 'overlay';
    }
}
