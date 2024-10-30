// type-coverage:ignore-next-line
import type { ElementRef} from '@angular/core';
import { DestroyRef, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, map, of } from 'rxjs';

@Injectable()
export class AccordionService {
    private readonly platformId = inject<string>(PLATFORM_ID);
    private readonly document = inject(DOCUMENT);
    private readonly destroyRef = inject(DestroyRef);

    public onChangeAccordion(cards: readonly ElementRef<HTMLElement>[]): void {
        if (isPlatformServer(this.platformId)) {
            return;
        }

        //type-coverage:ignore-next-line
        of(cards)
            .pipe(
                map((el) => el[0]),
                filter(Boolean),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe((elementRef) => {
                const firstNativeElement: HTMLElement | null = this.document.getElementById(
                    elementRef.nativeElement.id
                );
                if (firstNativeElement) {
                    firstNativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
            });
    }
}
