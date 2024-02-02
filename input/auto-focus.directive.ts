import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
    selector: '[jsdaddyAutofocus]',
    standalone: true,
})
export class AutofocusDirective {
    public jsdaddyAutofocus = input<boolean>();
    public elRef = inject<ElementRef<HTMLElement>>(ElementRef);
    public constructor() {
        effect(() => {
            if (this.jsdaddyAutofocus()) {
                this.elRef.nativeElement.focus();
            }
        });
    }
}
