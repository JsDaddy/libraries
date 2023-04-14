import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GithubStarsService } from '@libraries/github-stars/github-stars.service';

@Component({
    selector: 'jsdaddy-github-stars',
    templateUrl: './github-stars.component.html',
    styleUrls: ['./github-stars.component.scss'],
    standalone: true,
    imports: [AsyncPipe, HttpClientModule],
    providers: [GithubStarsService],
})
export class GithubStarsComponent {
    public readonly countOfStarsOnGithub$: Observable<number> =
        inject(GithubStarsService).getAllStars();
}
