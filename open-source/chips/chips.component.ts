import { Component, inject, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { TrackByService } from '@libraries/track-by/track-by.service';

@Component({
    selector: 'ngx-mask-demo-chips',
    templateUrl: './chips.component.html',
    styleUrls: ['./chips.component.scss'],
    standalone: true,
    imports: [NgFor],
})
export class ChipsComponent {
    @Input() public chips!: string[];
    public readonly trackByPath = inject(TrackByService).trackBy('text');
}
