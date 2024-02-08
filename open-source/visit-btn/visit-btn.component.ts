import { Component } from '@angular/core';
import { AssetPipe } from '../../asset/asset.pipe';
import { LinkPath } from '../../link/link.path';
import { OpenSourcePath } from '../path/open-source.path';
import { NgOptimizedImage } from '@angular/common';
import { AnchorLabelPipe } from '@libraries/anchor/anchor-label.pipe';

@Component({
    selector: 'jsdaddy-open-source-visit-btn',
    templateUrl: './visit-btn.component.html',
    styleUrl: './visit-btn.component.scss',
    standalone: true,
    imports: [AssetPipe, NgOptimizedImage, AnchorLabelPipe],
})
export class VisitBtnComponent {
    public readonly jsDaddyWebsite = LinkPath.WEBSITE_JSDDADY;
    public readonly openSourceVisitBtnPath = OpenSourcePath.VISIT_BTN;
}
