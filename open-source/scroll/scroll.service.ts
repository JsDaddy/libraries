// type-coverage:ignore-next-line
import type { ElementRef } from '@angular/core';
import { DestroyRef, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, debounceTime, fromEvent } from 'rxjs';
import { Router } from '@angular/router';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class ScrollService {
    private readonly activeCardId$$ = new BehaviorSubject<number>(1);
    private readonly router = inject(Router);
    private readonly minusTopHeight = 300;
    private readonly minusTopMobileHeight = 150;
    private readonly document = inject(DOCUMENT);
    private readonly platformId = inject<string>(PLATFORM_ID);
    private readonly destroyRef = inject(DestroyRef);

    public readonly activeCard$ = this.activeCardId$$.asObservable();

    public onScroll(cards: readonly ElementRef<HTMLElement>[]): void {
        fromEvent(document, 'scroll')
            .pipe(debounceTime(100), takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                const scrollIdCard = cards.find((e) => this.isInViewport(e.nativeElement))
                    ?.nativeElement.id;
                if (this.activeCardId$$.value !== Number(scrollIdCard) && scrollIdCard) {
                    this.activeCardId$$.next(Number(scrollIdCard));
                    this.router.navigate(['/'], {
                        fragment: scrollIdCard,
                    });
                }
            });
    }

    public isInViewport(elm: HTMLElement) {
        if (isPlatformServer(this.platformId)) {
            return false;
        }
        const windowHeight = this.document.body.offsetHeight;
        let elementTop = elm.offsetTop - this.minusTopHeight;
        const elementBottom = elementTop + elm.offsetHeight;

        const viewportTop = this.document.documentElement.scrollTop;
        const viewportBottom = viewportTop + this.document.documentElement.clientHeight;
        if (windowHeight < 450) {
            elementTop = elm.offsetTop - this.minusTopMobileHeight;
        }
        return elementBottom > viewportTop && elementTop < viewportBottom;
    }
}
