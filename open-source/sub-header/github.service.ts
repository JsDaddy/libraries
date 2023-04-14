import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concatAll, Observable, reduce } from 'rxjs';

@Injectable()
export class GithubService {
    private readonly http = inject(HttpClient);

    public getStars(): Observable<number> {
        return this.http.get<[]>(`https://api.github.com/users/JsDaddy/repos`).pipe(
            concatAll(),
            reduce(
                (acc: number, { stargazers_count }: { stargazers_count: number }) =>
                    acc + stargazers_count,
                0
            )
        );
    }
}
