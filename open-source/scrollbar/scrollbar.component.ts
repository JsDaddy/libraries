import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'jsdaddy-open-source-scrollbar',
    templateUrl: './scrollbar.component.html',
    styleUrls: ['./scrollbarcomponent.scss'],
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    styles: [
        `
            ::-webkit-scrollbar-thumb {
                background-image: linear-gradient(0deg, #f79046 0.28%, rgba(247, 144, 70, 0) 100%),
                    url('/assets/images/open-source/scrollbar/scroll-shadow.svg');
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
                border: 1px solid transparent;
            }
            ::-webkit-scrollbar {
                width: 6px;
                background-image: linear-gradient(
                    to bottom,
                    rgba(134, 134, 134, 0.45),
                    rgba(134, 134, 134, 0.09)
                );
            }

            ::-webkit-scrollbar-track {
                background-color: transparent;
            }
        `,
    ],
})
export class ScrollbarComponent {}
