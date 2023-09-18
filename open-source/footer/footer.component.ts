import { Component } from '@angular/core';
import { OpenSourcePath } from '../path/open-source.path';

@Component({
    selector: 'jsdaddy-open-source-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
    public readonly openSourceFooterPath = OpenSourcePath.FOOTER;
}
