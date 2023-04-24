import { ElementRef, inject, Injectable, QueryList } from '@angular/core';
import { debounceTime, fromEvent, takeUntil } from 'rxjs';
import { UnSubscriber } from '@libraries/unsubscriber/unsubscriber.service';
import { ScrollService } from '@open-source/service/scroll.service';
import { Router } from '@angular/router';

@Injectable()
export class OnScrollService extends UnSubscriber {
    public activeCardId = 1;
    private readonly scrollService = inject(ScrollService);
    private readonly router = inject(Router);

    public onScroll(cards: QueryList<ElementRef>): void {
        fromEvent(document, 'scroll')
            .pipe(debounceTime(100), takeUntil(this.unsubscribe$$))
            .subscribe(() => {
                const scrollIdCard = cards.find((e) =>
                    this.scrollService.isInViewport(e.nativeElement)
                )?.nativeElement.id;
                if (this.activeCardId !== Number(scrollIdCard)) {
                    this.activeCardId = Number(scrollIdCard);
                    this.router.navigate(['/'], {
                        fragment: scrollIdCard,
                    });
                }
            });
    }
}
