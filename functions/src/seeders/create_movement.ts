import admin = require('firebase-admin');

export class CreateMovement {
    static async run(times: number = 100) {
        const db = admin.firestore();
        var batch = db.batch();

        var usersId = ["x6BgCpbdJ9wu3Q0bfbB2corf7Eqh", "DytQn2F3WTrqZT6xiI8AzEYr1C87", "6jVISJMaxTrcqQO1Oq6Hm7wHgYWI"]
        for (var i = 0; i < times; i++) {
            var docRef = db.collection("movements").doc();
            var type:number =  this.getRandomInt(1,3); // richarge - 001, consumo - 002
            batch.set(docRef, {
                amount: type == 1 ? 1000  : this.getRandomInt(30, 51),
                debit: type == 1 ? false  : true,
                line: type == 1 ? 0 : this.getRandomInt(1,15),
                machine_code:  type == 1 ? "" :"OCS9021NWR0031224",
                movement_at:  type == 1 ? this.getRamdomDateInBetween('2021-06-01', '2021-12-30') :  this.getRamdomDateInBetween('2022-01-30', '2022-07-01'),
                movement_type: type == 1 ? "01" : "02",
                portfolio_code: "001",
                user_ref: usersId[Math.floor(Math.random() * usersId.length)]
            });

            console.info(">>>> seeding movement" + i);
        }
        batch.commit();
    }

    static  getRamdomDateInBetween(st : string, en : string) : Date {
        var start:number = Date.parse(st);
        var end:number = Date.parse(en);

    return new Date(Math.floor(Math.random() * (end - start + 1) + start));
}


    static getRandomInt(min:number, max:number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
}