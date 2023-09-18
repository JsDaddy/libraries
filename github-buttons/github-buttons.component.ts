import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedAssetPath } from '../asset/asset.path';
import { GithubStarsService } from '../github/github-stars.service';

@Component({
    selector: 'jsdaddy-github-buttons[title]',
    templateUrl: './github-buttons.component.html',
    styleUrls: ['./github-buttons.component.scss'],
})
export class GithubButtonsComponent {
    @Input() public title!: string;
    public readonly assetPathShared = SharedAssetPath.ROOT;
    public readonly jsdaddyGithub = 'https://github.com/JsDaddy/';
    // public readonly countOfStarsOnGithub$: Observable<number> =
    //     inject(GithubStarsService).getAllStars();
    public readonly countOfStarsOnGithub$: Observable<number>;
    public constructor(public readonly githubStarsService: GithubStarsService) {
        this.countOfStarsOnGithub$ = this.githubStarsService.getAllStars();
    }
}
