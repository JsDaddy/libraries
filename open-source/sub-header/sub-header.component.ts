import { Component, Input } from '@angular/core';

import { TrackByService } from '../../track-by/track-by.service';

@Component({
    selector: 'jsdaddy-open-source-sub-header',
    templateUrl: './sub-header.component.html',
    styleUrls: ['./sub-header.component.scss'],
})
export class SubHeaderComponent {
    @Input() public title!: string;
    @Input() public subtitle!: string;
    @Input() public chips!: string[];

    // public readonly trackByPath = inject(TrackByService).trackBy('chip');
    public constructor(public readonly trackByPath: TrackByService) {}
}
