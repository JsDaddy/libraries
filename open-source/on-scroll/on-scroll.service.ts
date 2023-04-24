import { ElementRef, inject, Injectable, QueryList } from '@angular/core';
import { BehaviorSubject, debounceTime, fromEvent, takeUntil } from 'rxjs';
import { UnSubscriber } from '@libraries/unsubscriber/unsubscriber.service';
import { Router } from '@angular/router';

@Injectable()
export class OnScrollService extends UnSubscriber {
    public activeCardId$$: BehaviorSubject<number> = new BehaviorSubject(1);

    private readonly router = inject(Router);
    private readonly minusTopHeight = 300;

    public onScroll(cards: QueryList<ElementRef>): void {
        fromEvent(document, 'scroll')
            .pipe(debounceTime(100), takeUntil(this.unsubscribe$$))
            .subscribe(() => {
                const scrollIdCard = cards.find((e) => this.isInViewport(e.nativeElement))
                    ?.nativeElement.id;
                if (this.activeCardId$$.value !== Number(scrollIdCard)) {
                    this.activeCardId$$.next(Number(scrollIdCard));
                    this.router.navigate(['/'], {
                        fragment: scrollIdCard,
                    });
                }
            });
    }

    public isInViewport(elm: HTMLElement) {
        const elementTop = elm.offsetTop - this.minusTopHeight;
        const elementBottom = elementTop + elm.offsetHeight;
        const viewportTop = document.documentElement.scrollTop;
        const viewportBottom = viewportTop + document.documentElement.clientHeight;
        return elementBottom > viewportTop && elementTop < viewportBottom;
    }
}
