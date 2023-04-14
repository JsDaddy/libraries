import { Component, inject, Input } from '@angular/core';
import { AsyncPipe, NgFor, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AssetPipe } from '@libraries/asset/asset.pipe';
import { TrackByService } from '@libraries/track-by/track-by.service';
import { ChipComponent } from '@libraries/chip/chip.component';
import { GithubStarsComponent } from '@libraries/github-stars/github-stars.component';

@Component({
    selector: 'jsdaddy-open-source-sub-header',
    templateUrl: './sub-header.component.html',
    styleUrls: ['./sub-header.component.scss'],
    standalone: true,
    imports: [
        NgOptimizedImage,
        NgFor,
        AsyncPipe,
        HttpClientModule,
        ChipComponent,
        AssetPipe,
        GithubStarsComponent,
    ],
})
export class SubHeaderComponent {
    @Input() public title!: string;
    @Input() public subtitle!: string;
    @Input() public chips!: string[];
    public readonly jsdaddyGithub = 'https://github.com/JsDaddy/';
    public readonly trackByPath = inject(TrackByService).trackBy('chip');
}
