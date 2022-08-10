import { Documents } from "../domain/types";

const docs: Documents = [];

for (let i = 0; i < 50; i++) {
    if (i < 50 || (i >= 500 && i < 999)) {
        docs.push({
            id: i + 1,
            body: 'Unstructured text is not really unstructured, it’s just structured using a language model. Spaces, periods, commas and hyphens all structure text so a human can process and understand. Computers don’t work like us and need help processing a stream of text.'
        });
    }
    else if (
        (i >= 50 && i <= 499)
        || (i >= 1000 && i <= 2500)
    ) {
        docs.push({
            id: i + 1,
            body: "Old dog can't learn new trick. in the big old house in the big old gown. The house in the town had the big old keep where the old night keeper never did sleep. The keeper keeps the keep in the night and keeps in the dark and sleeps in the light.",
        });
    }
    else if (
        (i > 2500 && i <= 5500)
        || (i >= 9000 && i <= 25000)
    ) {
        docs.push({
            id: i + 1,
            body: 'Can you can a can as a canner can can a Can?',
        });
    }
    if (
        (i > 5500 && i <= 9000)
        || (i >= 25001 && i <= 55000)
    ) {
        docs.push({
            id: i + 1,
            body: 'Stemming is the process of reducing a word to its root stem. For example, the word develop can also take the form of developed or developing. When tokenized, all three of those words result in different tokens. Users could potentially resolve that at query time with a trailing wildcard search, i.e. develop*. Stemming is an option to handle that at indexing time.'
        });
    } else {
        docs.push({
            id: i + 1,
            body: 'Unstructured text is not really unstructured, it’s just structured using a language model. Spaces, periods, commas and hyphens all structure text so a human can process and understand. Computers don’t work like us and need help processing a stream of text.'
        });
    }
}

export default docs;