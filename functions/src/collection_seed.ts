import admin = require('firebase-admin');

var movements = [
    { 
        amount: 10,
        debit: true,
        line: 1,
        machine_code : "2323",
        moviment_at : Date(),
        moviment_type : 1,
        portfolio_code : "001",
        user_ref : "abcd"
    },
    { 
        amount: 20,
        debit: false,
        line: 1,
        machine_code : "OCS9021NWR0031224",
        moviment_at : Date(),
        moviment_type : 1,
        portfolio_code : "001",
        user_ref : "abcd"
    },
    { 
        amount: 8,
        debit: true,
        line: 1,
        machine_code : "OCS9021NWR0031224",
        moviment_at : Date(),
        moviment_type : 1,
        portfolio_code : "001",
        user_ref : "abcd"
    },
    { 
        amount: 15,
        debit: true,
        line: 2,
        machine_code : "OCS9021NWR0031224",
        moviment_at : Date(),
        moviment_type : 1,
        portfolio_code : "001",
        user_ref : "abcd"
    },
    { 
        amount: 25,
        debit: true,
        line: 2,
        machine_code : "OCS9021NWR0031224",
        moviment_at : Date(),
        moviment_type : 1,
        portfolio_code : "001",
        user_ref : "efgh"
    },
    { 
        amount: 15,
        debit: true,
        line: 2,
        machine_code : "OCS9021NWR0031224",
        moviment_at : Date(),
        moviment_type : 1,
        portfolio_code : "001",
        user_ref : "efgh"
    },
    { 
        amount: 15,
        debit: true,
        line: 2,
        machine_code : "OCS9021NWR0031224",
        moviment_at : Date(),
        moviment_type : 1,
        portfolio_code : "001",
        user_ref : "jklm"
    }
]

var users = [
    { 
        email: "pcfjojo@gmail.com",
        uid : "abcd"
    },
    { 
        email: "j.selv@naviger.it",
        uid : "efgh"
    },
    { 
        email: "m.galazzo@naviger.it",
        uid : "jklm"
    },
    { 
        email: "f.capiluppi@naviger.it",
        uid : "nopq"
    }
]

export async function seed(){
    const db = admin.firestore();
    var batch = db.batch();
    const docs = await db.collection("users").get();
    if(docs.empty){ 
        console.log("Calling seeder", db.collection("users").doc.length);
       var times = 10;
        for(var i = 0; i < times; i++){
            movements.forEach((doc) => {
                var docRef = db.collection("movements").doc(); 
                batch.set(docRef, doc);
            });
        }
        
        users.forEach((doc) => {
            var docRef = db.collection("users").doc(doc.uid); 
            batch.set(docRef, doc);
    
            var portfolioRef = db.collection("users").doc(doc.uid)
            .collection('portfolio')
            .doc("001"); 
            batch.set(portfolioRef, {
                saldo : 0,
                codice_portfolio : '001'
            });
        });
    }
    batch.commit();   
}


