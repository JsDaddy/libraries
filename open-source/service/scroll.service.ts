import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ScrollService {
    public isInViewport(elm: HTMLElement) {
        const elementTop = elm.offsetTop;
        const elementBottom = elementTop + elm.offsetHeight;
        const viewportTop = document.documentElement.scrollTop;
        const viewportBottom = viewportTop + document.documentElement.clientHeight;
        return elementBottom > viewportTop && elementTop < viewportBottom;
    }
}
