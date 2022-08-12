import { TextFreqNode, DocumentMetaNode, DocumentMetaData, DocumentNode, Documents, returnedOriganizedObject } from './domain/types';
import { Tokenizer } from "./domain/entities/Tokenizer";
import { Stemmer } from "./domain/entities/Stemmer";
import { InvertedIndexing } from "./domain/entities/InvertedIndexing";

export function createDTM(docs: Documents): returnedOriganizedObject {
    const docMeta: DocumentMetaData = [];
    // We need these for BM25 calculation
    let totalDocument = 0;
    let totalDocumentLength = 0;
    docs.forEach((doc: DocumentNode) => {
        totalDocument += 1;
        // We need to find out where each term comes from and its frequencey in a document
        let voc = Tokenizer(doc.body);
        let docId = doc.id;
        let termFreq: DocumentMetaNode = {
            docId: docId,
            docLength: 0,
            terms: {},
        };
        // termObj keep track of stemmed word and its frequency in a given document
        let termObj: TextFreqNode = {};
        // docLength means the number of unique stemmed terms from a document
        termFreq.docLength = voc.length;
        // totalDocumentLength is the sum of all docLength, we need this for BM25 calculation
        totalDocumentLength += termFreq.docLength;
        voc.forEach(v => {
            let stem = Stemmer(v);
            if (!(stem in termObj)) {
                termObj = {...termObj, ...{ [stem]: 1 }};
            } else {
                termObj[stem] += 1;
            }
        });
        termFreq.terms = termObj;
        docMeta.push(termFreq);
    });

    return InvertedIndexing(docMeta, totalDocument, totalDocumentLength);
}