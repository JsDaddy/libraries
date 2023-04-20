import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    Output,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { NgClass, NgFor, NgOptimizedImage, NgStyle } from '@angular/common';
import { IListItem } from '@open-source/accordion/content.interfaces';
import { AssetPipe } from '@libraries/asset/asset.pipe';
import { HidePipe } from '@open-source/hide/hide.pipe';
import { VisitBtnComponent } from '@open-source/visit-btn/visit-btn.component';
import { ColorPipe } from '@open-source/color/color.pipe';
import { TrackByService } from '@libraries/track-by/track-by.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { BodyStylesService } from '@libraries/body-styles/body-styles.service';

@Component({
    selector: 'jsdaddy-open-source-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss'],
    imports: [
        NgClass,
        NgFor,
        NgStyle,
        NgOptimizedImage,
        AssetPipe,
        HidePipe,
        VisitBtnComponent,
        ColorPipe,
    ],
    standalone: true,
    providers: [BodyStylesService],
})
export class AccordionComponent implements AfterViewInit {
    @Input() public lists!: IListItem[];

    @Output() public switchCardIndex = new EventEmitter<number>();

    @ViewChildren('accordion', { read: ElementRef }) public accordion!: QueryList<ElementRef>;

    public showAccordion = false;
    public itemInAccordion = 1;
    public readonly trackByPath = inject(TrackByService).trackBy('id');
    public readonly bodyStylesService = inject(BodyStylesService);

    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly router = inject(Router);

    public ngAfterViewInit(): void {
        this.openFirstAccordion();
        this.activatedRoute.fragment.pipe(filter(Boolean)).subscribe((itemId) => {
            this.itemInAccordion = Number(itemId);
        });
    }

    public showAccordionBlock(): void {
        this.showAccordion = !this.showAccordion;
        this.bodyStylesService.setOverflowBody(this.showAccordion);
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
        this.itemInAccordion = idItem;
        this.router.navigate(['/'], {
            fragment: idItem.toString(),
        });
        if (!scrollTo) {
            return;
        }
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
