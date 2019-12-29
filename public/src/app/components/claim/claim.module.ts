import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ClaimComponent }   from './claim.component';

@NgModule({
    imports:      [ BrowserModule, FormsModule ],
    declarations: [ ClaimComponent ],
    exports:    [ ClaimComponent ]
})
export class ClaimModule { }