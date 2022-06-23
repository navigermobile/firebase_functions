import { BalanceCalculator } from './balance_calculator';
import * as functions from "firebase-functions";
import { QueryDocumentSnapshot } from 'firebase-functions/v1/firestore';

exports.onListen = functions
    .runWith({ failurePolicy: true })
    .firestore
    .document(`movements/{movementId}`)
    .onCreate(async (snapshot: QueryDocumentSnapshot,
        context: functions.EventContext) => {
        console.log(">>>> onUpdate listener called");


        var movementData = snapshot.data()
        if (movementData) {
            const codice_portfolio: string  = movementData.portfolio_code;
            const user_ref: string = movementData.user_ref;
            BalanceCalculator.calculate(user_ref, codice_portfolio);

        }
    });
