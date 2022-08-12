export declare type DocumentNode = {
    id: number;
    body: string;
    imagesUrl?: [];
    otherAttributes?: {};
};
export declare type Documents = DocumentNode[];
export declare type TextFreqNode = {
    [key: string]: number;
};
export declare type OriginalTextNode = {
    [key: string]: string;
};
export declare type DocumentMetaNode = {
    docId: number;
    docLength: number;
    terms: TextFreqNode;
    originalWordsSet?: OriginalTextNode;
};
export declare type DocumentMetaData = DocumentMetaNode[];
export declare type DTMNode = {
    docId: number;
    freq: number;
    docLength: number;
};
export declare type DTMObject = {
    [key: string]: {
        [key: number]: DTMNode;
    };
};
export declare type InvertedIndexObject = {
    [key: string]: DTMNode;
};
export declare type weightedData = {
    [key: string]: number;
};
export declare type weightedDataObject = {
    [key: string]: weightedData;
};
export declare type returnedOriganizedObject = {
    [key: string]: weightedData;
};
export declare type searchedContent = {
    content: string;
    score: number;
};
export declare type searchedResults = {
    [key: string]: searchedContent[];
};
