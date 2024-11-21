import { Component, inject } from '@angular/core';
import { VersionToken } from '@libraries/version/version.token';

@Component({
    selector: 'jsdaddy-open-source-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    standalone: true,
})
export class FooterComponent {
    public readonly copyrightText = `© JSdaddy, 2016-${new Date().getFullYear()}, All Rights Reserved`;

    private readonly versionValue = inject(VersionToken, { optional: true });

    public readonly version = `v${this.versionValue ?? '*.*.*'}`;
}
