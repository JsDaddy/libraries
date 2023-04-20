import { UnSubscriberMixin } from './unsubscriber.mixin';

class BaseComponent {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public ngOnDestroy() {}
}

class TestComponent extends UnSubscriberMixin(BaseComponent) {}

describe('UnSubscriber Service', () => {
    let testComponent: TestComponent;
    const mockedSubscriber = {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        next: (_value: boolean) => {},
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        complete: () => {},
    };
    beforeEach(() => {
        testComponent = new TestComponent();
        spyOn(mockedSubscriber, 'next');
        spyOn(mockedSubscriber, 'complete');
    });
    it('Should notify and complete sequence on destroy', () => {
        testComponent.unsubscribe$$.subscribe(mockedSubscriber);
        testComponent.ngOnDestroy();
        expect(mockedSubscriber.next).toHaveBeenCalledOnceWith(true);
        expect(mockedSubscriber.complete).toHaveBeenCalledTimes(1);
    });
});
