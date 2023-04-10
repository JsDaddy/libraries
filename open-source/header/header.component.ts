import { Component, inject } from '@angular/core';
import { NgClass, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { ColorPipe } from '@open-source/color/color.pipe';
import { HidePipe } from '@open-source/hide/hide.pipe';
import { VisitBtnComponent } from '@open-source/visit-btn/visit-btn.component';
import { IHeaderITem } from '@open-source/header/header.interface';
import { AssetPipe } from '@libraries/asset/asset.pipe';
import { TrackByService } from '@libraries/track-by/track-by.service';

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
})
export class HeaderComponent {
    public headerDoc: IHeaderITem[] = [
        {
            title: 'Ngx-Mask',
            link: 'https://jsdaddy.github.io/ngx-mask/',
        },
        {
            title: 'Ngx-CopyPaste',
            link: 'https://jsdaddy.github.io/ngx-copypaste/',
        },
        {
            title: 'Ngx-Loader-Indicator',
            link: 'https://jsdaddy.github.io/ngx-loader-indicator/',
        },
    ];
    public readonly trackByPath = inject(TrackByService).trackBy('title');
    public showNav = false;
    public checkIsActive = window.location.href;

    public toggleNavBlock(): void {
        this.showNav = !this.showNav;
    }
}
