import { Component, Input } from '@angular/core';

import { IHeaderITem } from '../header/header.interface';
import { TrackByService } from '../../track-by/track-by.service';
import { BodyStylesService } from '../../body-styles/body-styles.service';
import { LinkPath } from '../../link/link.path';
import { OpenSourcePath } from '../path/open-source.path';

@Component({
    selector: 'jsdaddy-open-source-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [BodyStylesService],
})
export class HeaderComponent {
    @Input() public activeLink!: string;

    public showNav = false;
    public headerItems: IHeaderITem[] = [
        {
            title: 'Ngx-Mask',
            link: LinkPath.NGX_MASK,
        },
        {
            title: 'Ngx-CopyPaste',
            link: LinkPath.NGX_COPYPASTE,
        },
        {
            title: 'Ngx-Loader-Indicator',
            link: LinkPath.NGX_LOADER,
        },
    ];

    public readonly jsDaddyWebsite = LinkPath.WEBSITE_JSDDADY;
    // public readonly trackByPath = inject(TrackByService).trackBy('title');
    // public readonly bodyStylesService = inject(BodyStylesService);
    public readonly openSourceHeaderPath = OpenSourcePath.HEADER;

    public constructor(
        public readonly bodyStylesService: BodyStylesService,
        public readonly trackByPath: TrackByService
    ) {}

    public toggleNavBlock(): void {
        this.showNav = !this.showNav;
        this.bodyStylesService.setOverflowYBodyHtml(this.showNav);
    }
}
