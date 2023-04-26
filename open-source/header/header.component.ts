import { Component, inject, Input } from '@angular/core';
import { NgClass, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { ColorPipe } from '@open-source/color/color.pipe';
import { HidePipe } from '@open-source/hide/hide.pipe';
import { VisitBtnComponent } from '@open-source/visit-btn/visit-btn.component';
import { IHeaderITem } from '@open-source/header/header.interface';
import { AssetPipe } from '@libraries/asset/asset.pipe';
import { TrackByService } from '@libraries/track-by/track-by.service';
import { BodyStylesService } from '@libraries/body-styles/body-styles.service';
import { LinkPath } from '@libraries/link/link.path';
import { OpenSourcePath } from '@open-source/path/open-source.path';

@Component({
    selector: 'jsdaddy-open-source-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [
        NgOptimizedImage,
        NgFor,
        NgIf,
        NgClass,
        AssetPipe,
        ColorPipe,
        HidePipe,
        VisitBtnComponent,
    ],
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
    public readonly trackByPath = inject(TrackByService).trackBy('title');
    public readonly bodyStylesService = inject(BodyStylesService);
    public readonly openSourcePath = OpenSourcePath.HEADER;

    public toggleNavBlock(): void {
        this.showNav = !this.showNav;
        this.bodyStylesService.setOverflowYBodyHtml(this.showNav);
    }
}
