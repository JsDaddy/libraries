import { Directive, ElementRef, OnInit, inject } from '@angular/core';

@Directive({
    selector: '[jsdaddyAutofocus]',
    standalone: true,
})
export class AutofocusDirective implements OnInit {
    public elRef = inject(ElementRef);

    public ngOnInit(): void {
        this.elRef.nativeElement.focus();
    }
}
