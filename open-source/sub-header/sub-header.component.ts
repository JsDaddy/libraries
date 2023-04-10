import { Component, inject, Input } from '@angular/core';
import { NgFor, NgOptimizedImage } from '@angular/common';
import { AssetPipe } from '@libraries//asset/asset.pipe';
import { TrackByService } from '@libraries/track-by/track-by.service';
import { ChipComponent } from '@libraries/chip/chip.component';

@Component({
    selector: 'jsdaddy-open-source-sub-header',
    templateUrl: './sub-header.component.html',
    styleUrls: ['./sub-header.component.scss'],
    standalone: true,
    imports: [NgOptimizedImage, NgFor, ChipComponent, AssetPipe],
})
export class SubHeaderComponent {
    @Input() public title!: string;
    @Input() public subtitle!: string;
    @Input() public chips!: string[];

    public readonly trackByPath = inject(TrackByService).trackBy('chip');
}
