// import {transactionParse} from "../src/parser";
// import {deepStrictEqual, strictEqual} from "assert";
// import {describe} from "mocha";
// import {ParseTransaction} from "../src/modele/parsed";
//
// describe("transaction parser", () => {
//     it("can parse categories", () => {
//         deepStrictEqual(transactionParse.category.parse("продукты"), {status: true, value: 'продукты'});
//         deepStrictEqual(transactionParse.category.parse("зарплата"), {status: true, value: 'зарплата'});
//     })
//     it('can parse amount of money', () => {
//         deepStrictEqual(transactionParse.amountOfMoney.parse('1234'), {status: true, value: 1234});
//         deepStrictEqual(transactionParse.amountOfMoney.parse('1234.234'), {status: true, value: 1234.234});
//         deepStrictEqual(transactionParse.amountOfMoney.parse('1234,234'), {status: true, value: 1234.234});
//     })
//     it('can parse date ',  () => {
//         // const d = TransactionParse.date.tryParse('вчера');
//         // const d1 = TransactionParse.date.tryParse('позавчера');
//         // let d2 = new Date().getDay()
//         // if (d2 <= 1) {
//         //     d2 += 7
//         // }
//         // console.log(d1);
//         // console.log(new Date().getDay())
//         // strictEqual(d1.getDay(), d2 - 2);
//         // strictEqual(d.getDay(), d2 - 1);
//         //
//         // console.log(TransactionParse.date.parse('2 дня назад'));
//         // console.log(TransactionParse.date.parse('50 дней назад'));
//         const d1 = transactionParse.date.tryParse('вчера');
//         strictEqual(d1.getDay(), new Date().getDay() -1);
//         const d2 = transactionParse.date.tryParse('позавчера');
//         strictEqual(d2.getDay(), new Date().getDay() -2);
//         const d3 = transactionParse.date.tryParse('2 дня назад');
//         strictEqual(d3.getDay(), new Date().getDay() -2);
//     });
//     it('can parse transaction', () => {
//         deepStrictEqual(
//             transactionParse.transaction.parse('продукты 123.234'),
//             {status: true, value: new ParseTransaction('продукты', 123.234)});
//         deepStrictEqual(
//             transactionParse.transaction.parse('зарплата 123.234'),
//             {status: true, value: new ParseTransaction('зарплата', 123.234)});
//     })
//     it('can parse transaction with comment', () => {
//         deepStrictEqual( // Expect values to be strictly deep-equal:
//             transactionParse.transaction.parse('продукты 123.234  шницель, молоко'),
//             {status: true, value: new ParseTransaction('продукты', 123.234, 'шницель, молоко')});
//         deepStrictEqual(
//             transactionParse.transaction.parse('зарплата 123.234 на мою карту'),
//             {status: true, value: new ParseTransaction('зарплата', 123.234, 'на мою карту')});
//     })
//     it('can parse transaction with comment and date', () => {
//         const t1 = transactionParse.transaction.tryParse('вчера продукты 123.234 макароны, молоко');
//         strictEqual(t1.date?.getDate(), new Date().getDate() - 1);
//         strictEqual(t1.category, 'продукты')
//         strictEqual(t1.amountOfMoney, 123.234)
//     })
// })