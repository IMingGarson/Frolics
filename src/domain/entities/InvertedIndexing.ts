import { DocumentMetaData, DTMObject, DTMNode, InvertedIndexObject, weightedDataObject, weightedData, returnedOriganizedObject } from '../types';

/**
 * This function takes raw document data and converts it into Document-term Matrix with Inverted Index.
 * The totalDocument and totalDocumentLength are required to calculate both IDF and BM25 so we can obtain the score of each term from a document
 * 
 * @param documentObject The raw document data containing id, stemmed terms and the occurrence of a term in each document
 * @param totalDocument The number of all documents
 * @param totalDocumentLength The total number of document length
 * @returns returnedOriganizedObject
 */
export function InvertedIndexing(
    documentObject: DocumentMetaData, 
    totalDocument: number, 
    totalDocumentLength: number
) {
    /**
     * DTM stands for "Document Term Matrix"
     * It shall be converted to inverted index data structure to improve efficiency
     */
    const DTM: DTMObject = {};
    Object.values(documentObject).forEach((v) => {
        // document id
        let docId: number = v.docId;
        // document length
        let docLength: number = v.docLength;
        Object.entries(v.terms).forEach((term) => {
            let text = term[0], freq = term[1];
            let node: DTMNode = { docId: docId, freq: freq, docLength: docLength };
            if (!(text in DTM)) {
                DTM[text] = { [docId]: node };
            } else {
                DTM[text] = {...DTM[text], ...{ [docId]: node }};
            }
        });
    });
    /**
     * Once we have the inverted index data structure, we need to calculate score of each term with BM25.
     */
    const avgDocumentLength = totalDocumentLength / totalDocument;
    const weightedData = Object.entries(DTM).map((termData) => {
        /**
         * term: The specific term
         * docs: Documents that contains such term
         * docLength: The number of documents containing such term
         */
        const term: string = termData[0], docs: InvertedIndexObject = termData[1], docLength: number = Object.keys(termData[1]).length;
        const weightedDataObject: weightedDataObject = {};
        Object.values(docs).forEach((doc: DTMNode) => {
            // Perform Inverse Document Frequency calculation
            let idf = calculateIDF(totalDocument, docLength);
            // Perform BM25 calculation
            let score = calculateBM25Score(idf, doc.freq, doc.docLength, avgDocumentLength);
            let weightedData: weightedData = { [doc.docId]: score };
            if (!(term in weightedDataObject)) {
                weightedDataObject[term] = weightedData;
            } else {
                weightedDataObject[term] = {...weightedDataObject[term], ...weightedData};
            }
        });
        return weightedDataObject;
    });
    /**
     * At last, we origanize our data structure to an object for better access
     */
    const returnedData: returnedOriganizedObject = {};
    weightedData.forEach((data) => {
        let term: string = Object.keys(data)[0];
        let score: weightedData = Object.values(data)[0];
        if (!(term in returnedData)) {
            returnedData[term] = score;
        } else {
            returnedData[term] = {...returnedData[term], ...score};
        }
    });
    
    return returnedData;
}

/**
 * Calculate Inverse Document Frequency 
 * @param totalDocument The number of all documents
 * @param invertedDocLength The number of documents containing such term
 * @returns IDF score
 */
function calculateIDF(totalDocument: number, invertedDocLength: number): number {
    return Math.log(1 + (totalDocument - invertedDocLength + 0.5) / (invertedDocLength + 0.5));
}

/**
 * Calculate score of a term from a document using Best-Match 25
 * @param idf Inverse Document Frequency 
 * @param occurrence The number of a term appears in a document
 * @param docLength The length of a document
 * @param avgDocumentLength The average length of all documents
 * @returns BM25 score
 */
function calculateBM25Score(idf: number, occurrence: number, docLength: number, avgDocumentLength: number) {
    const k1 = 1.2, b = 0.75;
    const numerator = occurrence * (k1 + 1);
    const denominator = occurrence + k1 * (1 - b + b * docLength / avgDocumentLength);
    return idf * numerator / denominator;
}