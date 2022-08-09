import { TextFreqNode, DocumentMetaNode, DocumentMetaData, DocumentNode, Documents, returnedOriganizedObject } from './domain/types';
import { Tokenizer } from "./domain/entities/Tokenizer";
import { Stemmer } from "./domain/entities/Stemmer";
import { InvertedIndexing } from "./domain/entities/InvertedIndexing";
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const CACHE_PATH = join(__dirname, '/cache/');

export function createDTM(docs: Documents): returnedOriganizedObject {
    let todayDate = new Date().toISOString().slice(0, 10);
    /**
     * We first check if the cache exists, if yes, we return the cached data.
     */
    if (existsSync(CACHE_PATH + todayDate)) {
        return readFileFromCache(todayDate);
    }
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
        let termObj: TextFreqNode = {};
        // docLength means the number of unique stemmed terms from a document
        termFreq.docLength = voc.length;
        // totalDocumentLength is the sum of all docLength, we need this for BM25 calculation
        totalDocumentLength += termFreq.docLength;
        voc.forEach(v => {
            let stem = Stemmer(v);
            if (!(stem in termObj)) {
                termObj = {...termObj, ...{ [stem]: 1 }};
                return true;
            }
            termObj[stem] += 1;
        });
        termFreq.terms = termObj;
        docMeta.push(termFreq);
    });
    const DTM = InvertedIndexing(docMeta, totalDocument, totalDocumentLength);
    syncWriteFile(todayDate, JSON.stringify(DTM));
    return DTM;
}

/**
 * Write the created DTM content to a cached json file
 * @param filename Cache filename
 * @param data Document Term Matrix content
 * @returns none
 */
function syncWriteFile(filename: string, data: any): void {
    /**
     * flags:
     *  - w = Open file for reading and writing. File is created if not exists
     *  - a+ = Open file for reading and appending. The file is created if not exists
     */
    try {
        writeFileSync(CACHE_PATH + filename, data, {
            flag: 'w',
        });
    } catch (e) {
        console.log('fail to create cache file', e);
    }
}

/**
 * Return the cached Document Term Matrix content
 * @param filename Cache filename
 * @returns returnedOriganizedObject
 */
function readFileFromCache(filename: string): returnedOriganizedObject {
    try {
        const contents = readFileSync(CACHE_PATH + filename, 'utf-8');
        return JSON.parse(contents);
    } catch (e) {
        console.log('fail to read cache file', e);
        return {};
    }
}
  