export class SecondaryPassenger {
    fullname: string;
    age: number;

    constructor(fullname: string = '', age: number = undefined) {
        this.fullname = fullname;
        this.age = age;
    }
}

export class Claim {
    primaryPassenger: {
        fullname: string,
        age: number,
        email: string,
        address: {
            country: number,
            street: string,
            index: string
        },
        phone: string
    };
    additionalPassengers: SecondaryPassenger[];

    // constructor(primaryPassenger?: {fullname?: string, age?: number, address?: { country?: number, street?: string, index?: string}, phone?: string},
    //             additionalPassengers?: SecondaryPassenger[]) {
    //     this.primaryPassenger = {
    //         fullname: primaryPassenger.fullname ? primaryPassenger.fullname : '',
    //         age: primaryPassenger.age ? primaryPassenger.age : undefined,
    //         address: {
    //             country: primaryPassenger.address.country ? primaryPassenger.address.country : undefined,
    //             street: primaryPassenger.address.street ? primaryPassenger.address.street : '',
    //             index: primaryPassenger.address.index ? primaryPassenger.address.index : ''
    //         },
    //         phone: primaryPassenger.phone ? primaryPassenger.phone : ''
    //     };
    //     this.additionalPassengers = additionalPassengers ? additionalPassengers : [];
    // }
    constructor(primaryPassenger: {fullname: string, age: number, email: string, address: { country: number, street: string, index: string}, phone: string}, additionalPassengers: SecondaryPassenger[] = []) {
        this.primaryPassenger = {
            fullname: primaryPassenger.fullname,
            age: primaryPassenger.age,
            email: primaryPassenger.email,
            address: {
                country: primaryPassenger.address.country,
                street: primaryPassenger.address.street,
                index: primaryPassenger.address.index
            },
            phone: primaryPassenger.phone
        };
        this.additionalPassengers = additionalPassengers;
    }
}