import { NgClass, NgOptimizedImage, UpperCasePipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    EventEmitter,
    inject,
    input,
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
import { AssetPipe } from '../asset/asset.pipe';
import { InputPipe } from './input.pipe';
import { AutofocusDirective } from '../input/auto-focus.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'jsdaddy-input[placeholder]',
    standalone: true,
    imports: [
        NgClass,
        ReactiveFormsModule,
        UpperCasePipe,
        AssetPipe,
        InputPipe,
        AutofocusDirective,
        NgOptimizedImage,
    ],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss',
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
export class InputComponent implements ControlValueAccessor, OnInit {
    public placeholder = input.required<string>();
    public label = input<string | null>(null);
    public isTextarea = input(false);
    public validators = input<ValidatorFn[]>([]);
    public isDark = input(false);
    public autoFocus = input(true);

    @Output() public labelClick: EventEmitter<void> = new EventEmitter();

    private readonly fb = inject(FormBuilder);

    public readonly additionalPath = 'shared';
    public control: FormControl<string | null> = this.fb.control(null);

    private cdr = inject(ChangeDetectorRef);
    private readonly destroyRef = inject(DestroyRef);

    public uniqueId = crypto.randomUUID();

    public ngOnInit(): void {
        this.control.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
            this.onChange && this.onChange(value);
            this.cdr.detectChanges();
        });
    }

    public writeValue(value: string | null): void {
        if (value === null) {
            this.control.reset();
        }

        this.control.setValidators(this.validators());
        this.control.setValue(value);
    }

    public registerOnChange(fn: () => void): void {
        this.onChange = fn;
    }
    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    /* eslint-disable @typescript-eslint/no-empty-function */
    public onChange: (value: string | null) => void = () => {};
    public onTouched: () => void = () => {};

    public onLabelClick(): void {
        if (this.control.invalid) {
            return;
        }
        this.labelClick.emit();
    }
}
