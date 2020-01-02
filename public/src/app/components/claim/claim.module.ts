import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ClaimComponent} from './claim.component';
import {SuccessComponent} from "./success.component";

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [ClaimComponent, SuccessComponent],
    exports: [ClaimComponent, SuccessComponent]
})
export class ClaimModule {
}