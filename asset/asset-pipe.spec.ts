import { AssetPipe } from './asset.pipe';

describe('AssetPipe', () => {
    const pipe = new AssetPipe();
    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });
    it('test pipe', () => {
        expect(pipe.transform('github')).toBe('assets/images/github.svg');
        expect(pipe.transform('github', 'home')).toBe('assets/images/home/github.svg');
        expect(pipe.transform('github', 'home', true)).toBe('assets/images/home/github.webp');
    });
    it('Should process non exist icon', () => {
        expect(pipe.transform('')).toBe('');
        expect(pipe.transform(undefined)).toBe('');
    });
});
