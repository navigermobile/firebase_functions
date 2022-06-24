import admin = require('firebase-admin');

export class CreateMovement {
    static async run(times: number = 100) {
        const db = admin.firestore();
        var batch = db.batch();
        for (var i = 0; i < times; i++) {
            var docRef = db.collection("movements").doc();
            var type:number =  this.getRandomInt(2);
            batch.set(docRef, {
                amount: type == 1 ? 10  : this.getRandomInt(2),
                debit: type == 1 ? false  : true,
                line: this.getRandomInt(14),
                machine_code: "2323",
                moviment_at: Date(),
                moviment_type: type,
                portfolio_code: "001",
                user_ref: "abcd"
            });
            
            console.info(">>>> seeding movement" + i);
        }
        batch.commit();
    }

    static getRandomInt(max:number) : number {
        return Math.floor(Math.random() * max);
    }
}