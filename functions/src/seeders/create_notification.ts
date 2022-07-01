import admin = require('firebase-admin');


var notifications = [
    { 
        title: "Bentornato, è bello riverderti!",
        desciption: "Effettua una consumazione o ricarica il tuo credito!",
    },
    { 
        title: "Grazie per esserti registrato!",
        desciption: "Manca solo una cosa... ricaricare il tuo credito!",
    },
    { 
        title: "Cornetto omaggio",
        desciption: "Acquista un caffè e in omaggio avrai un cornetto!",
    }
]

export class CreateNotification {
    static async run() {
        const db = admin.firestore();
        var batch = db.batch();
        for (var i = 0; i < notifications.length; i++) {
            // create notifications from array of notifications
            db.collection("notifications")
            .doc()
            .set(
                notifications[i]
            );

            console.info(">>>> seeding notifications" + notifications[i].title);
        }
        batch.commit();
    }
}