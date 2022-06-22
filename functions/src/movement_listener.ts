import * as functions from "firebase-functions";
import { DocumentSnapshot } from "firebase-functions/v1/firestore";
import { Change, EventContext } from "firebase-functions";
import admin = require('firebase-admin');


exports.onListen = functions
    .runWith({ failurePolicy: true })
    .firestore
    .document(`movements/{movementId}`)
    .onWrite(async (snapshot: Change<DocumentSnapshot>, context: EventContext) => {
        console.log('onWrite Function --> Start');
        //const movementId: string = context.params.movementId;
        //console.table(context);
       // console.log(`EventId --> ${context.eventId}`);
       snapshot.after.
        var movementData = snapshot.after.data()
        if (movementData === undefined) {
            movementData = snapshot.before.data();
        }
        //console.log("movement", movementData);

        if (movementData) {
            const codice_portfolio: string = movementData.portfolio_code;
            const user_ref: string = movementData.user_ref;
           // console.log(`Portfolio codice : ${codice_portfolio}`);
           // console.log(`Utente :  ${user_ref}`);
           // console.table(movementData);
            calculateBalance(user_ref, codice_portfolio);
        }
    });

async function calculateBalance(user_ref: string, codice_portfolio: string) {
    try {
        const db = admin.firestore();
        const movements = await db.collection('movements')
            .where('portfolio_code', '==', codice_portfolio)
            .where('user_ref', '==', user_ref)
            .get();
        var saldo: number = 0; 
        if (!movements.empty) {
            await movements.docs
                .map(x => x.data() as Movement)
                .map(doc => doc.debit ? doc.amount * -1 : doc.amount)
                .reduce((sum, current) => sum + current);

            await db.collection('users')
                .doc(user_ref)
                .collection('portfolio')
                .doc(codice_portfolio)
                .update({
                    saldo: saldo
                });
        } else {
            await db.collection('users')
                .doc(user_ref)
                .collection('portfolio')
                .doc(codice_portfolio)
                .update({
                    saldo: saldo
                });
        }
        console.log("Saldo attuale", saldo);

    } catch (error) {
        console.log(error);
    }
}