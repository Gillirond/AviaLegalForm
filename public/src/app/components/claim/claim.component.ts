import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {RequestService} from "../../services/request.service";
import {Claim, SecondaryPassenger} from "../../classes/claim.class";
import {Router} from "@angular/router";

@Component({
    selector: 'claim-form',
    template: require('./claim.component.pug')(),
    styleUrls: []
})
export class ClaimComponent implements OnInit {
    private claimData: Claim = this.getNewClaim();
    private isLoading: boolean = true;
    private settings = {
        countries: <{}[]>[]
    };
    private stage: number = 1;

    constructor(private requestService: RequestService, private router: Router) {
    }

    ngOnInit() {
        this.initSettings();
    }

    initSettings() {
        this.isLoading = true;

        let res = this.requestService.send('get', environment.apiUrl + 'settings/', {}).subscribe(response => {
                if (response.ans && response.ans == 'true') {
                    this.settings.countries = response.result.countries;
                    this.isLoading = false;
                }
            },
            function (error) {
                console.error(error);
            });
    }

    private secPassIsValid: boolean = false;

    validateSecPassForm() {
        let form = document.forms['secondaryPassengersForm'];
        for (let i = 0; i < this.claimData.additionalPassengers.length; i++) {
            let fullname = form.elements['fullname' + i];
            let age = form.elements['age' + i];
            if ((!fullname.validity.valid || !age.validity.valid) && !(i === this.claimData.additionalPassengers.length - 1 && fullname.value === '' && age.value === '')) {
                this.secPassIsValid = false;
                return;
            }
        }

        this.secPassIsValid = true;
    }

    private currentPercent: number = 0;
    private primaryPassPercent: number = 55;
    private secPassPercent: number = 45;
    countPercent() {
        let percent = 0;
        //primaryPassenger - 55%
        if(this.stage > 1) {
            percent = this.primaryPassPercent;
        } else {
            let primaryPassArr = ['fullname', 'age', 'email', 'addressCountry', 'addressStreet', 'addressIndex', 'phone'];
            let form = document.forms['primaryPassengerForm'];
            if(form) {
                for (let i = 0; i < primaryPassArr.length; i++) {
                    let inputElem = form.elements[primaryPassArr[i]];
                    if (inputElem.validity.valid) {
                        percent += this.primaryPassPercent / primaryPassArr.length;
                    }
                }
            }
        }

        if(this.secPassIsValid) {
            percent += this.secPassPercent;
        } else if (percent == this.primaryPassPercent) {
            //secondaryPassengers - 45%
            let form2 = document.forms['secondaryPassengersForm'];
            if(form2) {
                for (let i = 0; i < this.claimData.additionalPassengers.length; i++) {
                    let fullname = form2.elements['fullname' + i];
                    let age = form2.elements['age' + i];
                    if ((fullname.validity.valid && age.validity.valid) || (i === this.claimData.additionalPassengers.length - 1 && fullname.value === '' && age.value === '')) {
                        percent += this.secPassPercent / this.claimData.additionalPassengers.length;
                    }
                }
            }
        }
        percent = Math.ceil(percent);

        this.currentPercent = percent;
    }

    toStage(n: number) {
        this.stage = n;

        setTimeout(function(){this.countPercent();}.bind(this), 0);
    }

    submitClaim() {
        //let's imagine that this is http request:
        this.isLoading = true;
        let secPassLen = this.claimData.additionalPassengers.length;
        if (secPassLen > 0 && this.claimData.additionalPassengers[secPassLen - 1].fullname === '' && this.claimData.additionalPassengers[secPassLen - 1].age == undefined) {
            this.claimData.additionalPassengers.pop();
        }
        setTimeout(() => {
            this.isLoading = false;
            console.log(this.claimData);
            let claimId = this.createRndNumStr();
            this.router.navigate(['/claim-success/' + claimId]);
        }, 1000);
    }

    addPassenger() {
        this.claimData.additionalPassengers.push(new SecondaryPassenger());
    }

    popPassenger() {
        this.claimData.additionalPassengers.pop();
    }

    clear() {
        this.claimData = this.getNewClaim();
    }

    getNewClaim() {
        return new Claim({
            fullname: '',
            age: undefined,
            email: '',
            address: {country: undefined, street: '', index: ''},
            phone: ''
        }, [new SecondaryPassenger()]);
    }

    createRndNumStr(): string {
        let length = 6;
        let rndNumStr = '';
        for (let i = 0; i < length; i++) {
            rndNumStr += Math.floor(Math.random() * 10);
        }
        return rndNumStr;
    }
}