import { Component, Input } from '@angular/core';

@Component({
    selector: 'jsdaddy-chip[chip]',
    standalone: true,
    templateUrl: './chip.component.html',
    styleUrls: ['./chip.component.scss'],
})
export class ChipComponent {
    @Input()
    public chip!: string;
    @Input()
    public chipBgColor = 'rgba(0,0,0,0.05)';
    @Input()
    public chipTextColor = '';
    @Input()
    public isActive = false;
    @Input()
    public pointer = false;
}