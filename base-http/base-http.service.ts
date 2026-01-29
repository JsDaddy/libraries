import { isPlatformBrowser } from '@angular/common';
import type { ResourceRef } from '@angular/core';
import { inject, Injectable, PLATFORM_ID, resource } from '@angular/core';
import { DOMAIN } from '../token/token';

@Injectable()
export class BaseHttpService {
    private readonly domain = inject<string[]>(DOMAIN);
    private readonly platformId = inject<string>(PLATFORM_ID);

    public getResource<T>(path: string, defaultValue: T): ResourceRef<T | undefined> {
        const domain = isPlatformBrowser(this.platformId) ? this.domain[1] : this.domain[0];
        const url = path.startsWith('http') ? path : `${domain}/${path}`;

        return resource({
            loader: async (): Promise<T> => {
                try {
                    const response = await fetch(url);
                    if (!response.ok) {
                        return defaultValue;
                    }
                    return (await response.json()) as T;
                } catch {
                    return defaultValue;
                }
            },
        });
    }
}
