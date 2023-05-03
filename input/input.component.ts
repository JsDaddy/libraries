import { NgClass, NgIf, NgOptimizedImage, UpperCasePipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    inject,
    Input,
    OnInit,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import {
    ControlValueAccessor,
    FormBuilder,
    FormControl,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
    ValidatorFn,
} from '@angular/forms';
import { AssetPipe } from '@libraries/asset/asset.pipe';
import { takeUntil } from 'rxjs';
import { InputPipe } from './input.pipe';
import { AutofocusDirective } from './auto-focus.directive';
import { UnSubscriber } from '@libraries/unsubscriber/unsubscriber.service';

@Component({
    selector: 'jsdaddy-input[placeholder]',
    standalone: true,
    imports: [
        NgOptimizedImage,
        NgClass,
        NgIf,
        ReactiveFormsModule,
        UpperCasePipe,
        AssetPipe,
        InputPipe,
        AutofocusDirective,
    ],
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: InputComponent,
            multi: true,
        },
    ],
})
export class InputComponent extends UnSubscriber implements ControlValueAccessor, OnInit {
    private readonly fb = inject(FormBuilder);

    @Input() public placeholder!: string;
    @Input() public label?: string | null;
    @Input() public isTextarea = false;
    @Input() public validators: ValidatorFn[] = [];
    @Input() public isDark = false;
    @Input() public autoFocus = true;
    @Output() public labelClick: EventEmitter<void> = new EventEmitter();

    public readonly additionalPath = 'shared';
    public control: FormControl = this.fb.control(null);

    private cdr = inject(ChangeDetectorRef);

    public ngOnInit(): void {
        this.control.valueChanges.pipe(takeUntil(this.unsubscribe$$)).subscribe((value: string) => {
            this.onChange && this.onChange(value);
            this.cdr.detectChanges();
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public writeValue(value: any): void {
        if (value === null) {
            this.control.reset();
        }

        this.control.setValidators(this.validators);
        this.control.setValue(value);
    }

    public registerOnChange(fn: () => void): void {
        this.onChange = fn;
    }
    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    /* eslint-disable @typescript-eslint/no-empty-function */
    public onChange: (value: string) => void = () => {};
    public onTouched: () => void = () => {};

    public onLabelClick(): void {
        if (this.control.invalid) {
            return;
        }
        this.labelClick.emit();
    }
}
