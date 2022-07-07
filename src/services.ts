import {CategoriesService} from "./service/categories";
import {TransactionTypesService} from "./service/transactionTypes";
import TransactionsService from "./service/transactions";

const moneyFmEmail = process.env['FAMILY_BUDGET_EMAIL'];
// console.log(moneyFmEmail)
const moneyFmKey = process.env['FAMILY_BUDGET_KEY'];
// console.log(moneyFmKey)

console.assert(moneyFmEmail !== null, 'No FAMILY_BUDGET_EMAIL environment variable found');
console.assert(moneyFmKey !== null, 'No FAMILY_BUDGET_KEY environment variable found');

export const categoriesSvc =
    new CategoriesService("1K6bAWxGfWTkwDwjsUKZ-LyqTeFuRQFSq3rqjJwttxq4", moneyFmEmail!, moneyFmKey!.replace(/\\n/g, '\n'))
export const transactionTypesSvc =
    new TransactionTypesService("1K6bAWxGfWTkwDwjsUKZ-LyqTeFuRQFSq3rqjJwttxq4", moneyFmEmail!, moneyFmKey!.replace(/\\n/g, '\n'))
export const transactionsSvc =
    new TransactionsService("1K6bAWxGfWTkwDwjsUKZ-LyqTeFuRQFSq3rqjJwttxq4", moneyFmEmail!, moneyFmKey!.replace(/\\n/g, '\n'))
