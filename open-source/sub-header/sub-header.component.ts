import { Component, input } from '@angular/core';
import { ChipComponent } from '../../chip/chip.component';
import { GithubButtonsComponent } from '../../github-buttons/github-buttons.component';

@Component({
    selector: 'jsdaddy-open-source-sub-header',
    templateUrl: './sub-header.component.html',
    styleUrl: './sub-header.component.scss',
    standalone: true,
    imports: [ChipComponent, GithubButtonsComponent],
})
export class SubHeaderComponent {
    public title = input<string>();
    public subtitle = input<string>();
    public chips = input<string[]>();
}
