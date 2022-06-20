import * as functions from "firebase-functions";
import {DocumentSnapshot} from "firebase-functions/v1/firestore";
import {Change, EventContext} from "firebase-functions";
import admin = require('firebase-admin');
import { seed } from "./collection_seed";

admin.initializeApp();

seed();

export const onMovementCreated = functions
    .runWith({failurePolicy: true})
    .firestore
    .document(`movements/{movementId}`)
    .onWrite(async (snapshot: Change<DocumentSnapshot>, context: EventContext) => {
      console.log('onWrite Function --> Start');
      //const movementId: string = context.params.movementId;
      console.log(`EventId --> ${context.eventId}`);
      const movementData = snapshot.after.data();
      if ( movementData ) {
        const portfolioCode: string = movementData.portfolio_code;
        const userId: string = movementData.user_ref;
        console.log(`Portfolio codice : ${portfolioCode}`);
        console.log(`Utente :  ${userId}`);
        console.table(movementData);

        try {
        const db = admin.firestore();
        const movements  =  await db.collection('movements')
        .where('portfolio_code', '==', portfolioCode)
        .where('user_ref', '==', userId)
        .get();
        
          var saldo:number = await movements.docs
          .map(x => x.data() as Movement)
          .map(doc => doc.debit ? doc.amount * -1 : doc.amount)
          .reduce((sum, current) => sum + current);
          
         console.log(saldo);

         await db.collection('users')
         .doc(userId)
         .collection('portfolio')
         .doc(portfolioCode)
         .update({
           saldo : saldo
         });

        } catch (error) {
          console.log(error);
        }
     }
});