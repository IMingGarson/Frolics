import { DocumentMetaData, returnedOriganizedObject } from '../types';
/**
 * This function takes raw document data and converts it into Document-term Matrix with Inverted Index.
 * The totalDocument and totalDocumentLength are required to calculate both IDF and BM25 so we can obtain the score of each term from a document
 *
 * @param documentObject The raw document data containing id, stemmed terms and the occurrence of a term in each document
 * @param totalDocument The number of all documents
 * @param totalDocumentLength The total number of document length
 * @returns returnedOriganizedObject
 */
export declare function InvertedIndexing(documentObject: DocumentMetaData, totalDocument: number, totalDocumentLength: number): returnedOriganizedObject;
