import {AbstractGoogleSpreadsheetService} from "./index";
import {TransactionType} from "../modele";

export class TransactionTypesService extends AbstractGoogleSpreadsheetService{

    constructor(sheetId: string, authEmail: string, authKey: string) {
        super(sheetId, authEmail, authKey);
    }

    async getTransactionTypes(): Promise<TransactionType[]> {
        const d = await this.doc
        const sheet = d.sheetsByTitle['transaction type'];
        const rows = await sheet.getRows();
        return rows.map(r => new TransactionType(r['name'], r['comment']))
    }

}