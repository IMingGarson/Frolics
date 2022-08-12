"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDTM = void 0;
const Tokenizer_1 = require("./domain/entities/Tokenizer");
const Stemmer_1 = require("./domain/entities/Stemmer");
const InvertedIndexing_1 = require("./domain/entities/InvertedIndexing");
function createDTM(docs) {
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
        // termObj keep track of stemmed word and its frequency in a given document
        let termObj = {};
        // docLength means the number of unique stemmed terms from a document
        termFreq.docLength = voc.length;
        // totalDocumentLength is the sum of all docLength, we need this for BM25 calculation
        totalDocumentLength += termFreq.docLength;
        voc.forEach(v => {
            let stem = (0, Stemmer_1.Stemmer)(v);
            if (!(stem in termObj)) {
                termObj = Object.assign(Object.assign({}, termObj), { [stem]: 1 });
            }
            else {
                termObj[stem] += 1;
            }
        });
        termFreq.terms = termObj;
        docMeta.push(termFreq);
    });
    return (0, InvertedIndexing_1.InvertedIndexing)(docMeta, totalDocument, totalDocumentLength);
}
exports.createDTM = createDTM;
