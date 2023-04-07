import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ChipsComponent } from '@open-source/chips/chips.component';
import { AssetPipe } from '@libraries//asset/asset.pipe';

@Component({
    selector: 'jsdaddy-open-source-sub-header',
    templateUrl: './sub-header.component.html',
    styleUrls: ['./sub-header.component.scss'],
    standalone: true,
    imports: [NgOptimizedImage, ChipsComponent, AssetPipe],
})
export class SubHeaderComponent {
    @Input() public title!: string;

    @Input() public subtitle!: string;

    @Input() public chips!: string[];
}
