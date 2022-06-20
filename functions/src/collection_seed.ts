import admin = require('firebase-admin');

export function seed(){
    const db = admin.firestore();
    db.collection('movements').add(
        { 
            amount: 10,
            debit: true,
            line: 1,
            machine_code : "2323",
            moviment_at : Date(),
            moviment_type : 1,
            portfolio_code : "001",
            "user_ref" : "abcd"
        },
    );
}

