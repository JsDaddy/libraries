import { Component, inject } from '@angular/core';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Observable } from 'rxjs';
import { GithubStarsService } from '@libraries/github-stars/github-stars.service';
import { AssetPipe } from '@libraries/asset/asset.pipe';
import { SharedAssetPath } from '@libraries/asset/asset.path';

@Component({
    selector: 'jsdaddy-github-stars',
    templateUrl: './github-stars.component.html',
    styleUrls: ['./github-stars.component.scss'],
    standalone: true,
    imports: [AsyncPipe, NgOptimizedImage, AssetPipe],
})
export class GithubStarsComponent {
    public readonly assetPathShared = SharedAssetPath.ROOT;
    public readonly jsdaddyGithub = 'https://github.com/JsDaddy/';
    public readonly countOfStarsOnGithub$: Observable<number> =
        inject(GithubStarsService).getAllStars();
}
