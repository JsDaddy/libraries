import type { AfterViewInit } from '@angular/core';
import { signal } from '@angular/core';
import {
    Component,
    DestroyRef,
    ElementRef,
    inject,
    input,
    output,
    // type-coverage:ignore-next-line
    PLATFORM_ID,
    viewChild,
    viewChildren,
} from '@angular/core';
import { DOCUMENT, isPlatformServer, NgOptimizedImage } from '@angular/common';
import type { ListItem } from './content.types';
import { AssetPipe } from '../../asset/asset.pipe';
import { HidePipe } from '../hide/hide.pipe';
import { VisitBtnComponent } from '../visit-btn/visit-btn.component';
import { ColorPipe } from '../color/color.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, fromEvent } from 'rxjs';
import { BodyStylesService } from '../../body-styles/body-styles.service';
import { OpenSourcePath } from '../path/open-source.path';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'jsdaddy-open-source-accordion',
    templateUrl: './accordion.component.html',
    styleUrl: './accordion.component.scss',
    imports: [AssetPipe, HidePipe, VisitBtnComponent, ColorPipe, NgOptimizedImage],
    standalone: true,
    providers: [BodyStylesService],
})
export class AccordionComponent implements AfterViewInit {
    public lists = input<ListItem[]>();

    public switchCardIndex = output<number>();

    public accordion = viewChildren<string, ElementRef<HTMLElement>>('accordion', {
        read: ElementRef,
    });
    public accordionBlockElement = viewChild<string, ElementRef<HTMLElement>>('accordionBlock', {
        read: ElementRef,
    });

    public showAccordion = signal<boolean>(false);
    public itemInAccordion = signal<number>(1);

    public readonly openSourceAccordionPath = OpenSourcePath.ACCORDION;
    public readonly bodyStylesService = inject(BodyStylesService);

    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly platformId = inject<string>(PLATFORM_ID);
    private readonly document = inject(DOCUMENT);
    private readonly destroyRef = inject(DestroyRef);

    public ngAfterViewInit(): void {
        fromEvent(window, 'click')
            .pipe(
                filter(
                    () =>
                        this.showAccordion() &&
                        event?.target !== this.accordionBlockElement()?.nativeElement
                ),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(() => this.showAccordionBlock());
        this.openFirstAccordion();
        this.activatedRoute.fragment
            .pipe(filter(Boolean), takeUntilDestroyed(this.destroyRef))
            .subscribe((itemId) => {
                this.itemInAccordion.set(Number(itemId));
            });
    }

    public showAccordionBlock(): void {
        this.showAccordion.set(!this.showAccordion());
        this.bodyStylesService.setOverflowYBodyHtml(this.showAccordion());
    }

    public switchAccordion(index: number): void {
        this.switchCardIndex.emit(index);
    }

    public handleClick(idItem: number, scrollTo: string | undefined): void {
        if (this.showAccordion()) {
            this.showAccordionBlock();
        }
        this.anchorScroll(idItem, scrollTo);
    }

    public anchorScroll(idItem: number, scrollTo: string | undefined): void {
        if (isPlatformServer(this.platformId)) {
            return;
        }
        this.itemInAccordion.set(idItem);
        this.router.navigate(['/'], {
            fragment: idItem.toString(),
        });
        if (!scrollTo) {
            return;
        }
        const anchor: HTMLElement | null = this.document.getElementById(scrollTo);
        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    public toggle(index: number): void {
        this.accordion()?.forEach((el, i) => {
            if (index !== i) {
                el?.nativeElement.classList.remove('active');
            } else {
                el?.nativeElement.classList.toggle('active');
            }
        });
    }

    public openFirstAccordion(): void {
        this.accordion()?.[0]?.nativeElement.classList.toggle('active');
    }
}
