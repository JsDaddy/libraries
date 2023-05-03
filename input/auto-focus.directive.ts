import { Directive, ElementRef, inject, Input } from '@angular/core';

@Directive({
    selector: '[jsdaddyAutofocus]',
    standalone: true,
})
export class AutofocusDirective {
    @Input()
    public set autoFocus(value: boolean) {
        value ? this.elRef.nativeElement.focus() : '';
    }

    public elRef = inject(ElementRef);
}
