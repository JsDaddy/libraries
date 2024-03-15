import { Component, inject, makeStateKey, OnInit, PLATFORM_ID, TransferState } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { VersionToken } from '@libraries/version/version.token';

@Component({
    selector: 'jsdaddy-open-source-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    standalone: true,
})
export class FooterComponent implements OnInit {
    public readonly copyrightText = `© JSdaddy, 2016-${new Date().getFullYear()}, All Rights Reserved`;
    private readonly transferState = inject(TransferState);
    private readonly versionKey = makeStateKey<string>('version');
    private readonly platformId = inject<string>(PLATFORM_ID);
    private readonly versionValue = inject(VersionToken, { optional: true });

    public version = this.transferState.get<string>(this.versionKey, '*.*.*');

    public ngOnInit(): void {
        if (isPlatformServer(this.platformId)) {
            this.transferState.set(this.versionKey, `v${this.versionValue || '*.*.*'}`);
        }
    }
}
