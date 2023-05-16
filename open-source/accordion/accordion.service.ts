import {
    ElementRef,
    inject,
    Injectable,
    Injector,
    PLATFORM_ID,
    QueryList,
    runInInjectionContext,
} from '@angular/core';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MonoTypeOperatorFunction } from 'rxjs';

@Injectable()
export class AccordionService {
    private readonly platformId = inject(PLATFORM_ID);
    private readonly document = inject(DOCUMENT);
    private readonly injector = inject(Injector);

    public onChangeAccordion(cards: QueryList<ElementRef>): void {
        if (isPlatformServer(this.platformId)) {
            return;
        }
        cards.changes
            .pipe(
                runInInjectionContext<MonoTypeOperatorFunction<QueryList<ElementRef>>>(
                    this.injector,
                    () => takeUntilDestroyed()
                )
            )
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
