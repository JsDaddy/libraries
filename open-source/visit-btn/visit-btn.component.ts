import { Component } from '@angular/core';
import { LinkPath } from '../../link/link.path';
import { OpenSourcePath } from '../path/open-source.path';

@Component({
    selector: 'jsdaddy-open-source-visit-btn',
    templateUrl: './visit-btn.component.html',
    styleUrls: ['./visit-btn.component.scss'],
})
export class VisitBtnComponent {
    public readonly jsDaddyWebsite = LinkPath.WEBSITE_JSDDADY;
    public readonly openSourceVisitBtnPath = OpenSourcePath.VISIT_BTN;
}
