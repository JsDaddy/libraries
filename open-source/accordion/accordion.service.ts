import { ElementRef, inject, Injectable, PLATFORM_ID, QueryList } from '@angular/core';
import { DOCUMENT, isPlatformServer } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable()
export class AccordionService {
    private readonly platformId = inject(PLATFORM_ID);
    private readonly document = inject(DOCUMENT);

    public onChangeAccordion(cards: QueryList<ElementRef>): void {
        if (isPlatformServer(this.platformId)) {
            return;
        }
        cards.changes.pipe(takeUntilDestroyed()).subscribe((elementRef) => {
            const firstNativeElement: HTMLElement | null = this.document.getElementById(
                elementRef.first.nativeElement.id
            );
            if (firstNativeElement) {
                firstNativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        });
    }
}
