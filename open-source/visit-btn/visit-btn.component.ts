import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { AssetPipe } from '@libraries/asset/asset.pipe';
import { LinkPath } from '@libraries/link/link.path';
import { OpenSourcePath } from '@open-source/path/open-source.path';

@Component({
    selector: 'jsdaddy-open-source-visit-btn',
    templateUrl: './visit-btn.component.html',
    styleUrls: ['./visit-btn.component.scss'],
    standalone: true,
    imports: [NgOptimizedImage, AssetPipe],
})
export class VisitBtnComponent {
    public readonly jsDaddyWebsite = LinkPath.WEBSITE_JSDDADY;
    public readonly openSourcePath = OpenSourcePath.OPEN_SOURCE;
}
