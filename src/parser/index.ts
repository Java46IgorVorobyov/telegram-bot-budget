import * as P from "parsimmon";
import {ParseTransaction} from "../modele/parsed";
import {Category, TransactionType} from "../modele";


// export interface TransactionSpec {
//     category: string,
//     number: number,
//     currency: string,
//     amountOfMoney: number,
//     comment: string,
//     date: Date,
//     transaction: Transaction
// }

// function stringIgnoreCase(str: string) {
//     let expected = "'" + str + "'";
//     return P((input: string, i: number) => {
//         let j = i + str.length;
//         let head = input.slice(i, j);
//         if (head.toLowerCase() === str.toLowerCase()) {
//             return P.makeSuccess(j, head);
//         } else {
//             return P.makeFailure(i, expected);
//         }
//     });
// }


export function transactionParse(categories: Category[]) {

    return P.createLanguage({
        category: () =>
            P.alt(...categories.map(c => [c.name, ...c.synonyms])
                .reduce((a, b) => a.concat(b), [])
                .sort((a, b) => b.length - a.length).map(P.string))
                .map(c => categories.find(v =>
                    [v.name.toLowerCase(),  ...v.synonyms.map(s => s.toLowerCase())].includes(c.toLowerCase()))!),

        amountOfMoney: () =>
            P.regexp(/-?(0|[1-9][0-9]*)([.,][0-9]+)?([eE][+-]?[0-9]+)?/)
                .map(n => Number(n.replace(/,/, '.')))
                .desc("number"),

        amountOfMoneyExpr: (l) => P.seqMap(
            l.amountOfMoney,
            P.regexp(/[+-]/).trim(P.optWhitespace),
            l.amountOfMoneyExpr,
            (a, op, b) => op === '+' ? a + b : a - b).or(l.amountOfMoney),
        comment: () => P.any.atLeast(1).tie(),

        date: () =>
            P.alt(
                P.string('вчера').map(() => {
                    const d = new Date();
                    d.setDate(d.getDate() - 1);
                    return d;
                }),
                P.string('позавчера').map(() => {
                    const d = new Date();
                    d.setDate(d.getDate() - 2);
                    return d;
                }),
                P.digits.skip(P.optWhitespace.then(P.regexp(/дн(я|ей) назад/i))).map((n) => {
                    const d = new Date();
                    d.setDate(d.getDate() - Number.parseInt(n));
                    return d;
                }),
            ),

        transaction: (l) =>
            P.alt(
                P.seqMap(
                    l.date.skip(P.whitespace).fallback(undefined),
                    l.category,
                    P.whitespace,
                    l.amountOfMoneyExpr,
                    P.whitespace.then(l.comment).fallback(undefined),
                    (date, category, _, amountOfMoney, comment) => new ParseTransaction(category, amountOfMoney, comment, date)),
                P.seqMap(
                    l.date.skip(P.whitespace).fallback(undefined),
                    l.amountOfMoneyExpr,
                    P.whitespace,
                    l.category,
                    P.whitespace.then(l.comment).fallback(undefined),
                    (date, category, _, amountOfMoney, comment) => new ParseTransaction(category, amountOfMoney, comment, date)),
            ),
    })
}


