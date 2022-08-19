"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryTest = void 0;
const documents_1 = __importDefault(require("./documents"));
const src_1 = require("../../src");
const src_2 = require("../../src");
const src_3 = require("../../src");
function QueryTest(query) {
    if (!query.length) {
        return {};
    }
    const DTM = (0, src_3.createDTM)(documents_1.default);
    const finalResults = {};
    (0, src_2.Tokenizer)(query).forEach(token => {
        let stemmed = (0, src_1.Stemmer)(token);
        if (typeof DTM[stemmed] === 'undefined') {
            return true;
        }
        // keep track of stemmed words
        Object.entries(DTM[stemmed]).forEach((k) => {
            let docId = k[0], score = k[1];
            documents_1.default.forEach((document) => {
                if (+document.id == +docId) {
                    let content = { content: document.body, score: score };
                    if (!(stemmed in finalResults)) {
                        finalResults[stemmed] = [content];
                    }
                    else {
                        finalResults[stemmed].push(content);
                    }
                }
            });
        });
    });
    // Sort the result by score in desending order
    Object.values(finalResults).forEach(data => {
        data.sort((a, b) => a.score > b.score ? -1 : a.score < b.score ? 1 : 0);
        return data;
    });
    return finalResults;
}
exports.QueryTest = QueryTest;
let start = new Date().getTime();
const testQuery1 = 'test';
QueryTest(testQuery1);
console.log('testQuery1: ', testQuery1);
console.log('total time with cache 1: ', (new Date().getTime() - start) / 1000, ' sec.');
const testQuery2 = 'developing';
QueryTest(testQuery2);
console.log('testQuery2: ', testQuery2);
console.log('total time with cache 2: ', (new Date().getTime() - start) / 1000, ' sec.');
const testQuery3 = 'development';
QueryTest(testQuery3);
console.log('testQuery3: ', testQuery3);
console.log('total time with cache 3: ', (new Date().getTime() - start) / 1000, ' sec.');
const testQuery4 = 'A experienced canner can always be case sensitive.';
console.log('testQuery4: ', testQuery4);
QueryTest(testQuery4);
console.log('total time with cache 4: ', (new Date().getTime() - start) / 1000, ' sec.');
const testQuery5 = 'Structured stemmed word';
console.log('testQuery5: ', testQuery5);
QueryTest(testQuery5);
console.log('total time with cache 5: ', (new Date().getTime() - start) / 1000, ' sec.');
const testQuery6 = 'I\'m too old for this shit!!! Ahh doggo.';
console.log('testQuery6: ', testQuery6);
QueryTest(testQuery6);
console.log('total time with cache 6: ', (new Date().getTime() - start) / 1000, ' sec.');
const testQuery7 = 'An old night keeper can keep a dog as a canner who can keep a can';
console.log('testQuery7: ', testQuery7);
QueryTest(testQuery7);
console.log('total time with cache 7: ', (new Date().getTime() - start) / 1000, ' sec.');
