import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from "@angular/router";

import {HttpClientModule} from "@angular/common/http";

import './scss/index.scss';

import {AppComponent} from './app.component';
import {ClaimComponent} from "./components/claim/claim.component";
import {SuccessComponent} from "./components/claim/success.component";
import {ClaimModule} from "./components/claim/claim.module";

import {RequestService} from "./services/request.service";

const appRoutes: Routes = [
    {path: '', component: ClaimComponent},
    {path: 'claim-success/:claimId', component: SuccessComponent},
    {path: '**', redirectTo: '/'}
];

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, FormsModule, HttpClientModule, ClaimModule, RouterModule.forRoot(appRoutes)],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [RequestService]
})
export class AppModule {
}