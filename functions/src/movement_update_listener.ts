import * as functions from "firebase-functions";
import { QueryDocumentSnapshot } from "firebase-functions/v1/firestore";
import { Change, EventContext } from "firebase-functions";
import { BalanceCalculator } from "./balance_calculator";

exports.onListen = functions
    .runWith({ failurePolicy: true })
    .firestore
    .document(`movements/{movementId}`)
    .onUpdate(async (snapshot: Change<QueryDocumentSnapshot>, context: EventContext) => {
        var movementData = snapshot.after.data()
        if (movementData) {
            const codice_portfolio: string = movementData.portfolio_code;
            const user_ref: string = movementData.user_ref;
           BalanceCalculator.calculate(user_ref, codice_portfolio);
        }
    });