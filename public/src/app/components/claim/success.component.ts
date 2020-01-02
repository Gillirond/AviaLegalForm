import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'claim-success',
    template: require('./success.component.pug')(),
    styleUrls: []
})
export class SuccessComponent implements OnInit {

    claimId: number;
    constructor(private activateRoute: ActivatedRoute) {
        this.claimId = activateRoute.snapshot.params['claimId'];
    }

    ngOnInit() {
    }
}