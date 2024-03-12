import { Component } from '@angular/core';
import { AssetPipe } from '../../asset/asset.pipe';
import { OpenSourcePath } from '../path/open-source.path';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'jsdaddy-open-source-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    standalone: true,
    imports: [AssetPipe, NgOptimizedImage],
})
export class FooterComponent {
    public readonly openSourceFooterPath = OpenSourcePath.FOOTER;
}
