import admin = require('firebase-admin');

export class BalanceCalculator {
    
    static async calculate(user_ref: string, codice_portfolio: string) {
        console.log(">>>> Calculating balance");
        try {
            const db = admin.firestore();
            const movements = await db.collection('movements')
                .where('portfolio_code', '==', codice_portfolio)
                .where('user_ref', '==', user_ref)
                .get();
            var saldo: number = 0;
            if (!movements.empty) {
              saldo = await movements.docs
                    .map(x => x.data() as Movement)
                    .map(doc => doc.debit ? doc.amount * -1 : doc.amount)
                    .reduce((sum, current) => sum + current);
            } 
            
            await db.collection('users')
            .doc(user_ref)
            .collection('portfolio')
            .doc(codice_portfolio)
            .update({
                balance : saldo
            });
            console.log(">>>> Saldo attuale", saldo);

        } catch (error) {
            console.log(error);
        }
    }
}