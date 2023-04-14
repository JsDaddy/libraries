import { Component, inject, Input } from '@angular/core';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Observable } from 'rxjs';
import { AssetPipe } from '@libraries/asset/asset.pipe';
import { SharedAssetPath } from '@libraries/asset/asset.path';
import { GithubStarsService } from '@libraries/github/github-stars.service';

@Component({
    selector: 'jsdaddy-github-buttons[title]',
    templateUrl: './github-buttons.component.html',
    styleUrls: ['./github-buttons.component.scss'],
    standalone: true,
    imports: [AsyncPipe, NgOptimizedImage, AssetPipe],
})
export class GithubButtonsComponent {
    @Input() public title!: string;
    public readonly assetPathShared = SharedAssetPath.ROOT;
    public readonly jsdaddyGithub = 'https://github.com/JsDaddy/';
    public readonly countOfStarsOnGithub$: Observable<number> =
        inject(GithubStarsService).getAllStars();
}
