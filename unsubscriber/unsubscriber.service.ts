import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UnSubscriber implements OnDestroy {
    public _unsubscribe$$ = new Subject<boolean>();

    public get unsubscribe$$() {
        return this._unsubscribe$$.asObservable();
    }

    public ngOnDestroy(): void {
        this._unsubscribe$$.next(true);
        this._unsubscribe$$.complete();
    }
}
