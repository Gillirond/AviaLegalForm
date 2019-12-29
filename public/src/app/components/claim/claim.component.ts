import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
    selector: 'claim-form',
    template: require('./claim.component.pug')(),
    styleUrls: []
})
export class ClaimComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }
}