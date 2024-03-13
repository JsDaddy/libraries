// type-coverage:ignore-next-line
import { DestroyRef, ElementRef, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Injectable()
export class AccordionService {
    private readonly platformId = inject<string>(PLATFORM_ID);
    private readonly document = inject(DOCUMENT);
    private readonly destroyRef = inject(DestroyRef);

    public onChangeAccordion(
        // cards: QueryList<ElementRef<HTMLElement>>,
        cards: readonly ElementRef<HTMLElement>[]
    ): void {
        if (isPlatformServer(this.platformId)) {
            return;
        }

        //type-coverage:ignore-next-line
        of(cards)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                const firstNativeElement: HTMLElement | null = this.document.getElementById(
                    cards[0]?.nativeElement.id as string
                );
                if (firstNativeElement) {
                    firstNativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
            });
        //type-coverage:ignore-next-line
        // (cards.changes as Observable<QueryList<ElementRef<HTMLElement>>>)
        //     .pipe(takeUntilDestroyed(this.destroyRef))
        //     .subscribe(() => {
        //         const firstNativeElement: HTMLElement | null = this.document.getElementById(
        //             cards1[0]?.nativeElement.id as string
        //         );
        //         if (firstNativeElement) {
        //             firstNativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
        //         }
        //     });
    }
}
