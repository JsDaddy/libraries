import { Injectable } from '@angular/core';

@Injectable()
export class ScrollService {
    private readonly minusTopHeight = 300;
    public isInViewport(elm: HTMLElement) {
        const elementTop = elm.offsetTop - this.minusTopHeight;
        const elementBottom = elementTop + elm.offsetHeight;
        const viewportTop = document.documentElement.scrollTop;
        const viewportBottom = viewportTop + document.documentElement.clientHeight;
        return elementBottom > viewportTop && elementTop < viewportBottom;
    }
}
