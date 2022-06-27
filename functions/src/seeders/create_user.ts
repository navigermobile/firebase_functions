import admin = require('firebase-admin');


var users = [
    { 
        email: "pcfjojo@gmail.com",
        password: "pcfjojo@gmail.com",
        uid : "x6BgCpbdJ9wu3Q0bfbB2corf7Eqh",
        displayName : "Selva Jo",
    },
    { 
        email: "f.capiluppi@naviger.it",
        password: "f.capiluppi@naviger.it",
        uid : "DytQn2F3WTrqZT6xiI8AzEYr1C87",
        displayName : "Fulvio"
    },
    { 
        email: "m.galazzo@naviger.it",
        password: "m.galazzo@naviger.it",
        uid : "6jVISJMaxTrcqQO1Oq6Hm7wHgYWI",
        displayName : "Matteo"
    }
]

export class CreateUser {
    static async run() {
        const db = admin.firestore();
        var batch = db.batch();
        for (var i = 0; i < users.length; i++) {
            admin
            .auth()
            .createUser(users[i])
            .then((user) => {
                console.log('>>>> created ', user.displayName);
            })
            .catch((error) => {
                console.log('>>>> error creating user:', error);
            });
            
            // create users from array of users
            db.collection("users")
            .doc(users[i].uid)
            .update(
                users[i]
            );

            // create portfolio for specific user 
            var portfolioRef = db.collection("users")
            .doc(users[i].uid)
            .collection('portfolio')
            .doc("001"); 

            batch.set(portfolioRef, {
                saldo : 0,
                codice_portfolio : '001',
                theme : "teal"
            });

            console.info(">>>> seeding users" + users[i].email);
        }
        batch.commit();
    }
}