export type DocumentNode = {
    id: number,
    body: string,
    imagesUrl?: [],
    otherAttributes?: {}
}

export type Documents = DocumentNode[];

export type TextFreqNode = {
    [key: string]: number
}

export type DocumentMetaNode = {
    docId: number,
    docLength: number,
    terms: TextFreqNode
}

export type DocumentMetaData = DocumentMetaNode[];

export type DTMNode = {
    docId: number,
    freq: number,
    docLength: number
}

export type DTMObject = {
    [key: string]: {
        [key: number]: DTMNode
    }
}

export type InvertedIndexObject = {
    [key: string]: DTMNode
}

export type weightedData = {
    [key: string]: number
}

export type weightedDataObject = {
    [key: string]: weightedData
}

export type returnedOriganizedObject = {
    [key: string]: weightedData
}

export type searchedContent = {
    content: string,
    score: number,
}

export type searchedResults = {
    [key: string]: searchedContent[]
}