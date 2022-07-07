import {GoogleSpreadsheet} from "google-spreadsheet";
import Transaction from "../modele";

export abstract class AbstractGoogleSpreadsheetService {
    doc: Promise<GoogleSpreadsheet>

    protected constructor(sheetId: string, authEmail: string, authKey: string) {
        this.doc = this.connect(sheetId, authEmail, authKey);
    }

    private async connect(sheetId: string, authEmail: string, authKey: string): Promise<GoogleSpreadsheet> {
        const s = new GoogleSpreadsheet(sheetId);
        await s.useServiceAccountAuth({
            client_email: authEmail,
            private_key: authKey,
        })
        await s.loadInfo();
        return s;
    }
}

