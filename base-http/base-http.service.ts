import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { StateKey, TransferState } from '@angular/platform-browser';
import { catchError, Observable, of, tap } from 'rxjs';
import { DOMAIN } from '../token/token';

@Injectable()
export class BaseHttpService {
    private readonly domain = inject<string[]>(DOMAIN);
    private readonly http = inject(HttpClient);
    private readonly platformId = inject<string>(PLATFORM_ID);
    private readonly transferState = inject(TransferState);

    public getData<T>(path: string, defaultValue: T, key: StateKey<T>): Observable<T> {
        if (key) {
            const hasKey = this.transferState.hasKey<T>(key);
            const storedData = this.transferState.get<T>(key, defaultValue);
            if (hasKey) {
                return of(storedData);
            }
        }
        const domain = isPlatformBrowser(this.platformId) ? this.domain[1] : this.domain[0];

        return this.http.get<T>(path.startsWith('http') ? path : `${domain}/${path}`).pipe(
            tap((data) => key && this.transferState.set<T>(key, data)),
            catchError(() => {
                key && this.transferState.set<T>(key, defaultValue);
                return of(defaultValue);
            })
        );
    }
}
