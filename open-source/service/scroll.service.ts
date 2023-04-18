import { Injectable } from '@angular/core';

@Injectable()
export class ScrollService {
    public isInViewport(elm: HTMLElement) {
        const elementTop = elm.offsetTop - 300;
        const elementBottom = elementTop + elm.offsetHeight;
        const viewportTop = document.documentElement.scrollTop;
        const viewportBottom = viewportTop + document.documentElement.clientHeight;
        return elementBottom > viewportTop && elementTop < viewportBottom;
    }
}
