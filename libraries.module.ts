import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AssetPipe } from '@libraries/asset/asset.pipe';
import { BaseHttpService } from '@libraries/base-http/base-http.service';
import { BodyStylesService } from '@libraries/body-styles/body-styles.service';
import { ChipComponent } from '@libraries/chip/chip.component';
import { GithubStarsService } from '@libraries/github/github-stars.service';
import { GithubButtonsComponent } from '@libraries/github-buttons/github-buttons.component';
import { InputPipe } from '@libraries/input/input.pipe';
import { InputComponent } from '@libraries/input/input.component';
import { AutofocusDirective } from '@libraries/input/auto-focus.directive';
import { TrackByService } from '@libraries/track-by/track-by.service';
import { UnSubscriber } from '@libraries/unsubscriber/unsubscriber.service';
import { AccordionService } from '@open-source/accordion/accordion.service';
import { AccordionComponent } from '@open-source/accordion/accordion.component';
import { ColorPipe } from '@open-source/color/color.pipe';
import { FooterComponent } from '@open-source/footer/footer.component';
import { HeaderComponent } from '@open-source/header/header.component';
import { HidePipe } from '@open-source/hide/hide.pipe';
import { IsEmptyPipe } from '@open-source/is-empty/is-empty.pipe';
import { ScrollService } from '@open-source/scroll/scroll.service';
import { SubHeaderComponent } from '@open-source/sub-header/sub-header.component';
import { VisitBtnComponent } from '@open-source/visit-btn/visit-btn.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AssetPipe,
        ChipComponent,
        GithubButtonsComponent,
        InputPipe,
        InputComponent,
        AutofocusDirective,
        AccordionComponent,
        ColorPipe,
        FooterComponent,
        HeaderComponent,
        HidePipe,
        IsEmptyPipe,
        SubHeaderComponent,
        VisitBtnComponent,
    ],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    providers: [
        BaseHttpService,
        BodyStylesService,
        GithubStarsService,
        TrackByService,
        UnSubscriber,
        AccordionService,
        ScrollService,
    ],
    exports: [FooterComponent, SubHeaderComponent, AccordionComponent, HeaderComponent],
})
export class LibrariesModule {}
