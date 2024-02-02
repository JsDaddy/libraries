import {
    AfterViewInit,
    Component,
    DestroyRef,
    ElementRef,
    EventEmitter,
    inject, input,
    Output,
    // type-coverage:ignore-next-line
    PLATFORM_ID,
    QueryList,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { DOCUMENT, isPlatformServer, NgClass, NgStyle } from '@angular/common';
import { IListItem } from './content.interfaces';
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
    imports: [NgClass, NgStyle, AssetPipe, HidePipe, VisitBtnComponent, ColorPipe],
    standalone: true,
    providers: [BodyStylesService],
})
export class AccordionComponent implements AfterViewInit {
    public lists = input<IListItem[]> ();

    @Output() public switchCardIndex = new EventEmitter<number>();

    @ViewChildren('accordion', { read: ElementRef }) public accordion!: QueryList<
        ElementRef<HTMLElement>
    >;
    @ViewChild('accordionBlock') public accordionBlockElement!: ElementRef<HTMLElement>;

    public showAccordion = false;
    public itemInAccordion = 1;

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
                        this.showAccordion &&
                        event?.target !== this.accordionBlockElement.nativeElement
                ),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(() => this.showAccordionBlock());
        this.openFirstAccordion();
        this.activatedRoute.fragment
            .pipe(filter(Boolean), takeUntilDestroyed(this.destroyRef))
            .subscribe((itemId) => {
                this.itemInAccordion = Number(itemId);
            });
    }

    public showAccordionBlock(): void {
        this.showAccordion = !this.showAccordion;
        this.bodyStylesService.setOverflowYBodyHtml(this.showAccordion);
    }

    public switchAccordion(index: number): void {
        this.switchCardIndex.emit(index);
    }

    public handleClick(idItem: number, scrollTo: string | undefined): void {
        if (this.showAccordion) {
            this.showAccordionBlock();
        }
        this.anchorScroll(idItem, scrollTo);
    }

    public anchorScroll(idItem: number, scrollTo: string | undefined): void {
        if (isPlatformServer(this.platformId)) {
            return;
        }
        this.itemInAccordion = idItem;
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
        this.accordion.forEach((_el, i) => {
            index !== i
                ? this.accordion.get(i)?.nativeElement.classList.remove('active')
                : this.accordion.get(index)?.nativeElement.classList.toggle('active');
        });
    }

    public openFirstAccordion(): void {
        this.accordion.first.nativeElement.classList.toggle('active');
    }
}
