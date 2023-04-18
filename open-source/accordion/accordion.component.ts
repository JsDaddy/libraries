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
})
export class AccordionComponent implements AfterViewInit {
    public showNav = false;
    public chosenList = 1;
    public chosenItem = 1;
    public readonly trackByPath = inject(TrackByService).trackBy('id');
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly route = inject(Router);
    @Input() public lists!: IListItem[];
    @Output() public itemAccordion = new EventEmitter<number>();
    @Output() public itemInAccordion = new EventEmitter<number>();
    @ViewChildren('accordion', { read: ElementRef }) public accordion!: QueryList<ElementRef>;

    public ngAfterViewInit(): void {
        this.openFirstAccordion();
        this.activatedRoute.fragment.pipe(filter(Boolean)).subscribe((itemId) => {
            this.chosenItem = +itemId;
            this.itemInAccordion.emit(+itemId);
        });
    }

    public showNavBlock(): void {
        this.showNav = !this.showNav;
    }

    public switchDoc(index: number): void {
        this.itemAccordion.emit(index);
    }

    public handleClick(idItem: number, scrollTo: string | undefined): void {
        this.chosenItem = idItem;
        this.itemInAccordion.emit(idItem);
        this.route.navigate(['/'], {
            fragment: idItem.toString(),
        });
        if (!scrollTo) {
            return;
        }
        const anchor: HTMLElement | null = document.getElementById(scrollTo);
        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
