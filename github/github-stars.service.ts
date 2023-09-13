import { isPlatformServer } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { concatAll, of, reduce } from 'rxjs';
import { BaseHttpService } from '../base-http/base-http.service';
import { makeStateKey } from '@angular/platform-browser';

@Injectable()
export class GithubStarsService {
    public http = inject(BaseHttpService);
    private readonly platformId = inject(PLATFORM_ID);

    public getAllStars() {
        if (isPlatformServer(this.platformId)) {
            return of(0);
        }
        return this.http
            .getData<{ stargazers_count: number }[]>(
                `https://api.github.com/users/JsDaddy/repos`,
                [],
                makeStateKey<{ stargazers_count: number }[]>('all-stars')
            )
            .pipe(
                concatAll(),

                reduce(
                    (acc: number, { stargazers_count }: { stargazers_count: number }) =>
                        acc + stargazers_count,
                    0
                )
            );
    }
}
