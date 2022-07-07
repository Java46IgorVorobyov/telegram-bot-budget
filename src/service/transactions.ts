import Transaction from "../modele";
import {AbstractGoogleSpreadsheetService} from "./index";

export default class TransactionsService extends AbstractGoogleSpreadsheetService{
    constructor(sheetId: string, authEmail: string, authKey: string) {
        super(sheetId, authEmail, authKey);
    }

    async addTransaction(t: Transaction) {
        const d = await this.doc;
        const sheet = d.sheetsByTitle['transaction'];
        await sheet.addRow({
            date: t.date.toDateString(),
            user: t.user,
            type: t.type.name,
            category: t.category.name,
            amount: t.amountOfMoney,
            comment: t.comment || ''
        })
    }
}