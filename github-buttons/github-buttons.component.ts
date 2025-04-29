import { Component, inject, input } from '@angular/core';
import { AssetPipe } from '../asset/asset.pipe';
import { GithubStarsService } from '../github/github-stars.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgOptimizedImage } from '@angular/common';
import { AnchorLabelPipe } from '@libraries/anchor/anchor-label.pipe';

@Component({
    selector: 'jsdaddy-github-buttons[title]',
    templateUrl: './github-buttons.component.html',
    styleUrl: './github-buttons.component.scss',
    standalone: true,
    imports: [AssetPipe, NgOptimizedImage, AnchorLabelPipe],
})
export class GithubButtonsComponent {
    public title = input.required<string>();

    public readonly jsdaddyGithub = 'https://github.com/JsDaddy/';
    public readonly countOfStarsOnGithub = toSignal(inject(GithubStarsService).getAllStars());
}
