import { NgOptimizedImage, UpperCasePipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    input,
    output,
    ViewEncapsulation,
} from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { AssetPipe } from '../asset/asset.pipe';
import { InputPipe } from './input.pipe';
import { AutofocusDirective } from '../input/auto-focus.directive';

@Component({
    selector: 'jsdaddy-input[placeholder]',
    standalone: true,
    imports: [
        UpperCasePipe,
        AssetPipe,
        InputPipe,
        AutofocusDirective,
        NgOptimizedImage,
        FormField,
    ],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss',
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
    public placeholder = input.required<string>();
    public label = input<string | null>(null);
    public isTextarea = input(false);
    public isDark = input(false);
    public autoFocus = input(true);
    public control = input.required<FieldTree<string>>();

    public labelClick = output();

    public readonly additionalPath = 'shared';

    public uniqueId = crypto.randomUUID();

    public onLabelClick(): void {

        if (this.control()().invalid()) {
            return;
        }
        this.labelClick.emit();
    }
}
