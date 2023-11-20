import { Component, inject, Input } from '@angular/core';
import { AssetPipe } from '../asset/asset.pipe';
import { SharedAssetPath } from '../asset/asset.path';
import { GithubStarsService } from '../github/github-stars.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'jsdaddy-github-buttons[title]',
    templateUrl: './github-buttons.component.html',
    styleUrl: './github-buttons.component.scss',
    standalone: true,
    imports: [AssetPipe],
})
export class GithubButtonsComponent {
    @Input({ required: true }) public title!: string;
    public readonly assetPathShared = SharedAssetPath.ROOT;
    public readonly jsdaddyGithub = 'https://github.com/JsDaddy/';
    public readonly countOfStarsOnGithub = toSignal(inject(GithubStarsService).getAllStars());
}
