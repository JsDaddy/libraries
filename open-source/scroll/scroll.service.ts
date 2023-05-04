import { ElementRef, inject, Injectable, QueryList } from '@angular/core';
import { BehaviorSubject, debounceTime, fromEvent, takeUntil } from 'rxjs';
import { UnSubscriber } from '@libraries/unsubscriber/unsubscriber.service';
import { Router } from '@angular/router';

@Injectable()
export class ScrollService extends UnSubscriber {
    private readonly activeCardId$$: BehaviorSubject<number> = new BehaviorSubject(1);
    private readonly router = inject(Router);
    private readonly minusTopHeight = 300;
    private readonly minusTopMobileHeight = 150;

    public readonly activeCard$ = this.activeCardId$$.asObservable();

    public onScroll(cards: QueryList<ElementRef>): void {
        fromEvent(document, 'scroll')
            .pipe(debounceTime(100), takeUntil(this.unsubscribe$$))
            .subscribe(() => {
                const scrollIdCard = cards.find((e) => this.isInViewport(e.nativeElement))
                    ?.nativeElement.id;
                if (
                    this.activeCardId$$.value !== Number(scrollIdCard) &&
                    scrollIdCard !== undefined
                ) {
                    this.activeCardId$$.next(Number(scrollIdCard));
                    this.router.navigate(['/'], {
                        fragment: scrollIdCard,
                    });
                }
            });
    }

    public isInViewport(elm: HTMLElement) {
        const windowHeight = window.document.body.offsetHeight;
        let elementTop = elm.offsetTop - this.minusTopHeight;
        const elementBottom = elementTop + elm.offsetHeight;

        const viewportTop = document.documentElement.scrollTop;
        const viewportBottom = viewportTop + document.documentElement.clientHeight;
        if (windowHeight < 450) {
            elementTop = elm.offsetTop - this.minusTopMobileHeight;
        }
        return elementBottom > viewportTop && elementTop < viewportBottom;
    }
}
