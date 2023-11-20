import { Component } from '@angular/core';
import { AssetPipe } from '../../asset/asset.pipe';
import { OpenSourcePath } from '../path/open-source.path';

@Component({
    selector: 'jsdaddy-open-source-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    standalone: true,
    imports: [AssetPipe],
})
export class FooterComponent {
    public readonly openSourceFooterPath = OpenSourcePath.FOOTER;
}
