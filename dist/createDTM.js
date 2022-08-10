"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDTM = void 0;
const Tokenizer_1 = require("./domain/entities/Tokenizer");
const Stemmer_1 = require("./domain/entities/Stemmer");
const InvertedIndexing_1 = require("./domain/entities/InvertedIndexing");
// import { readFileSync, writeFileSync } from 'fs';
const path_1 = require("path");
const CACHE_PATH = (0, path_1.join)(__dirname, '/cache/');
function createDTM(docs) {
    let todayDate = new Date().toISOString().slice(0, 10);
    /**
     * TODO: We first check if the cache exists, if yes, we return the cached data.
     */
    const docMeta = [];
    // We need these for BM25 calculation
    let totalDocument = 0;
    let totalDocumentLength = 0;
    docs.forEach((doc) => {
        totalDocument += 1;
        // We need to find out where each term comes from and its frequencey in a document
        let voc = (0, Tokenizer_1.Tokenizer)(doc.body);
        let docId = doc.id;
        let termFreq = {
            docId: docId,
            docLength: 0,
            terms: {},
        };
        let termObj = {};
        // docLength means the number of unique stemmed terms from a document
        termFreq.docLength = voc.length;
        // totalDocumentLength is the sum of all docLength, we need this for BM25 calculation
        totalDocumentLength += termFreq.docLength;
        voc.forEach(v => {
            let stem = (0, Stemmer_1.Stemmer)(v);
            if (!(stem in termObj)) {
                termObj = Object.assign(Object.assign({}, termObj), { [stem]: 1 });
                return true;
            }
            termObj[stem] += 1;
        });
        termFreq.terms = termObj;
        docMeta.push(termFreq);
    });
    const DTM = (0, InvertedIndexing_1.InvertedIndexing)(docMeta, totalDocument, totalDocumentLength);
    // TODO: fs cannot be achieved on client-side
    // syncWriteFile(todayDate, JSON.stringify(DTM));
    return DTM;
}
exports.createDTM = createDTM;
/**
 * Write the created DTM content to a cached json file
 * @param filename Cache filename
 * @param data Document Term Matrix content
 * @returns none
 */
// function syncWriteFile(filename: string, data: any): void {
//     /**
//      * flags:
//      *  - w = Open file for reading and writing. File is created if not exists
//      *  - a+ = Open file for reading and appending. The file is created if not exists
//      */
//     try {
//         writeFileSync(CACHE_PATH + filename, data, {
//             flag: 'w',
//         });
//     } catch (e) {
//         console.log('fail to create cache file', e);
//     }
// }
/**
 * Return the cached Document Term Matrix content
 * @param filename Cache filename
 * @returns returnedOriganizedObject
 */
// function readFileFromCache(filename: string): returnedOriganizedObject {
//     try {
//         const contents = readFileSync(CACHE_PATH + filename, 'utf-8');
//         return JSON.parse(contents);
//     } catch (e) {
//         console.log('fail to read cache file', e);
//         return {};
//     }
// }
