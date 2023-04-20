import { UnSubscriber } from './unsubscriber.service';

describe('UnSubscriber Service', () => {
    let unSubscriber: UnSubscriber;
    const mockedSubscriber = {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        next: (_value: boolean) => {},
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        complete: () => {},
    };
    beforeEach(() => {
        unSubscriber = new UnSubscriber();
        spyOn(mockedSubscriber, 'next');
        spyOn(mockedSubscriber, 'complete');
    });
    it('Should notify and complete sequence on destroy', () => {
        unSubscriber.unsubscribe$$.subscribe(mockedSubscriber);
        unSubscriber.ngOnDestroy();
        expect(mockedSubscriber.next).toHaveBeenCalledOnceWith(true);
        expect(mockedSubscriber.complete).toHaveBeenCalledTimes(1);
    });
});
