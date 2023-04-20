import { Subject } from 'rxjs';
import { ConstructableForMixin } from './unsubscriber.interfaces';

export function UnSubscriberMixin<BC extends ConstructableForMixin>(Base: BC) {
    return class extends Base {
        public unsubscribe$$ = new Subject<boolean>();

        //TODO(inepipenko): we using this with old version of typescript where override dosen't exist
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        public ngOnDestroy(): void {
            this.unsubscribe$$.next(true);
            this.unsubscribe$$.complete();
            super.ngOnDestroy();
        }
    };
}
