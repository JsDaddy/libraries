// type-coverage:ignore-next-line
import { DestroyRef, ElementRef, inject, Injectable, PLATFORM_ID, QueryList } from '@angular/core';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Injectable()
export class AccordionService {
    private readonly platformId = inject<string>(PLATFORM_ID);
    private readonly document = inject(DOCUMENT);
    private readonly destroyRef = inject(DestroyRef);

    public onChangeAccordion(cards: QueryList<ElementRef<HTMLElement>>): void {
        if (isPlatformServer(this.platformId)) {
            return;
        }
        //type-coverage:ignore-next-line
        (cards.changes as Observable<QueryList<ElementRef<HTMLElement>>>)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((elementRef) => {
                const firstNativeElement: HTMLElement | null = this.document.getElementById(
                    elementRef.first.nativeElement.id
                );
                if (firstNativeElement) {
                    firstNativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
            });
    }
}
