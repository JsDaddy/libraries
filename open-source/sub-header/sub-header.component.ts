import { Component, inject, Input } from '@angular/core';
import { AsyncPipe, NgFor, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AssetPipe } from '@libraries/asset/asset.pipe';
import { TrackByService } from '@libraries/track-by/track-by.service';
import { ChipComponent } from '@libraries/chip/chip.component';
import { GithubService } from '@open-source/sub-header/github.service';

@Component({
    selector: 'jsdaddy-open-source-sub-header',
    templateUrl: './sub-header.component.html',
    styleUrls: ['./sub-header.component.scss'],
    standalone: true,
    providers: [GithubService],
    imports: [NgOptimizedImage, NgFor, AsyncPipe, HttpClientModule, ChipComponent, AssetPipe],
})
export class SubHeaderComponent {
    @Input() public title!: string;
    @Input() public subtitle!: string;
    @Input() public chips!: string[];
    public readonly countOfStarsOnGithub$ = inject(GithubService).getStars();
    public readonly trackByPath = inject(TrackByService).trackBy('chip');
}
