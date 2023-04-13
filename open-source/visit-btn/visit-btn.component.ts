import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { AssetPipe } from '@libraries/asset/asset.pipe';

@Component({
    selector: 'jsdaddy-open-source-visit-btn',
    templateUrl: './visit-btn.component.html',
    styleUrls: ['./visit-btn.component.scss'],
    standalone: true,
    imports: [NgOptimizedImage, AssetPipe],
})
export class VisitBtnComponent {}
