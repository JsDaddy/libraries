import { Component, inject, Input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AssetPipe } from '../asset/asset.pipe';
import { SharedAssetPath } from '../asset/asset.path';
import { GithubStarsService } from '../github/github-stars.service';

@Component({
    selector: 'jsdaddy-github-buttons[title]',
    templateUrl: './github-buttons.component.html',
    styleUrls: ['./github-buttons.component.scss'],
    standalone: true,
    imports: [AsyncPipe, AssetPipe],
})
export class GithubButtonsComponent {
    @Input({ required: true }) public title!: string;
    public readonly assetPathShared = SharedAssetPath.ROOT;
    public readonly jsdaddyGithub = 'https://github.com/JsDaddy/';
    public readonly countOfStarsOnGithub$: Observable<number> =
        inject(GithubStarsService).getAllStars();
}
