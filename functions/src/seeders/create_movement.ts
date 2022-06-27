import admin = require('firebase-admin');

export class CreateMovement {
    static async run(times: number = 100) {
        const db = admin.firestore();
        var batch = db.batch();

        var usersId = ["x6BgCpbdJ9wu3Q0bfbB2corf7Eqh", "DytQn2F3WTrqZT6xiI8AzEYr1C87", "6jVISJMaxTrcqQO1Oq6Hm7wHgYWI"]
        for (var i = 0; i < times; i++) {
            var docRef = db.collection("movements").doc();
            var type:number =  this.getRandomInt(1,3);
            batch.set(docRef, {
                amount: type == 1 ? 10  : this.getRandomInt(30, 51),
                debit: type == 1 ? false  : true,
                line: this.getRandomInt(1,15),
                machine_code: "OCS9021NWR0031224",
                moviment_at: Date(),
                moviment_type: type,
                portfolio_code: "001",
                user_ref: usersId[Math.floor(Math.random() * usersId.length)]
            });

            console.info(">>>> seeding movement" + i);
        }
        batch.commit();
    }


    static getRandomInt(min:number, max:number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
}