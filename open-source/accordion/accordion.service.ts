import { ElementRef, inject, Injectable, PLATFORM_ID, QueryList } from '@angular/core';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { takeUntil } from 'rxjs';
import { UnSubscriber } from '@libraries/unsubscriber/unsubscriber.service';

@Injectable()
export class AccordionService extends UnSubscriber {
    private readonly platformId = inject(PLATFORM_ID);
    private readonly document = inject(DOCUMENT);

    public onChangeAccordion(cards: QueryList<ElementRef>): void {
        if (isPlatformServer(this.platformId)) {
            return;
        }
        cards.changes.pipe(takeUntil(this.unsubscribe$$)).subscribe((elementRef) => {
            const firstNativeElement: HTMLElement | null = this.document.getElementById(
                elementRef.first.nativeElement.id
            );
            if (firstNativeElement) {
                firstNativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        });
    }
}
