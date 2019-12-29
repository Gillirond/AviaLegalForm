import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from "@angular/router";

import {HttpClientModule} from "@angular/common/http";

import './scss/index.scss';

import {AppComponent} from './app.component';
import {ClaimComponent} from "./components/claim/claim.component";

import {RequestService} from "./services/request.service";

const appRoutes: Routes = [
    {path: '', component: ClaimComponent},
    {path: '**', redirectTo: '/'}
];

@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
    declarations: [AppComponent, ClaimComponent],
    bootstrap: [AppComponent],
    providers: [RequestService]
})
export class AppModule {
}