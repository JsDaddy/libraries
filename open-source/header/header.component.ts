import { Component, inject, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ColorPipe } from '../color/color.pipe';
import { HidePipe } from '../hide/hide.pipe';
import { VisitBtnComponent } from '../visit-btn/visit-btn.component';
import { IHeaderITem } from '../header/header.interface';
import { AssetPipe } from '../../asset/asset.pipe';
import { BodyStylesService } from '../../body-styles/body-styles.service';
import { LinkPath } from '../../link/link.path';
import { OpenSourcePath } from '../path/open-source.path';
import { AnchorLabelPipe } from '@libraries/anchor/anchor-label.pipe';

@Component({
    selector: 'jsdaddy-open-source-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: true,
    imports: [AssetPipe, ColorPipe, HidePipe, VisitBtnComponent, NgOptimizedImage, AnchorLabelPipe],
    providers: [BodyStylesService],
})
export class HeaderComponent {
    public activeLink = input<string>();

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
    public readonly bodyStylesService = inject(BodyStylesService);
    public readonly openSourceHeaderPath = OpenSourcePath.HEADER;

    public toggleNavBlock(): void {
        this.showNav = !this.showNav;
        this.bodyStylesService.setOverflowYBodyHtml(this.showNav);
    }
}
