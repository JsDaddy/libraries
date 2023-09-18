import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    QueryList,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { IListItem } from './content.interfaces';
import { TrackByService } from '../../track-by/track-by.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, fromEvent, takeUntil } from 'rxjs';
import { BodyStylesService } from '../../body-styles/body-styles.service';
import { OpenSourcePath } from '../path/open-source.path';
import { UnSubscriber } from '@libraries/unsubscriber/unsubscriber.service';

@Component({
    selector: 'jsdaddy-open-source-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss'],
    providers: [BodyStylesService, TrackByService],
})
export class AccordionComponent extends UnSubscriber implements AfterViewInit {
    @Input() public lists!: IListItem[];

    @Output() public switchCardIndex = new EventEmitter<number>();

    @ViewChildren('accordion', { read: ElementRef }) public accordion!: QueryList<ElementRef>;
    @ViewChild('accordionBlock') public accordionBlockElement!: ElementRef;

    public showAccordion = false;
    public itemInAccordion = 1;

    public readonly openSourceAccordionPath = OpenSourcePath.ACCORDION;
    // public readonly trackByPath = inject(TrackByService).trackBy('id');
    // public readonly bodyStylesService = inject(BodyStylesService);
    //
    // private readonly activatedRoute = inject(ActivatedRoute);
    // private readonly router = inject(Router);
    // private readonly platformId = inject(PLATFORM_ID);
    // private readonly document = inject(DOCUMENT);

    public constructor(
        public readonly trackByPath: TrackByService,
        public readonly bodyStylesService: BodyStylesService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router
    ) {
        super();
    }

    public ngAfterViewInit(): void {
        fromEvent(window, 'click')
            .pipe(
                filter(
                    () =>
                        this.showAccordion &&
                        event?.target !== this.accordionBlockElement.nativeElement
                ),
                takeUntil(this.unsubscribe$$)
            )
            .subscribe(() => this.showAccordionBlock());
        this.openFirstAccordion();
        this.activatedRoute.fragment
            .pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
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
        // if (isPlatformServer(this.platformId)) {
        //     return;
        // }
        this.itemInAccordion = idItem;
        this.router.navigate(['/'], {
            fragment: idItem.toString(),
        });
        if (!scrollTo) {
            return;
        }
        // const anchor: HTMLElement | null = this.document.getElementById(scrollTo);
        const anchor: HTMLElement | null = document.getElementById(scrollTo);

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
