const stopwords = [
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 
    'by', 'for', 'if', 'in', 'into', 'is', 'it', 'no', 
    'not', 'of', 'on', 'or', 'such', 'that', 'the', 'their', 
    'then', 'there', 'these', 'they', 'this', 'to', 'was', 'will', 'with'
];
/**
 * Tokenizing a given string into an array of words, by default we only allow alphanumeric words
 * @param content string: The given plain text string
 * @param tokenizer string: The string separator, space by default
 * @param regex Regex: for a specific pattern
 * @param caseSensitive boolean: If true then tokenize the given string in case-sensitive manner; otherwise not
 * @param excludeStopWords Array: If given then exclude stop words from the given array; otherwise from the defalt array
 * @returns Array: The tokenized array of words
 */
export function Tokenizer (
    content = '',
    tokenizer: string = ' ',
    regex: RegExp = /^\w+$/,
    caseSensitive: boolean = false,
    excludeStopWords: Array<string> = stopwords
): Array<string> {
    if (!content.length) {
        return [];
    }
    if (!caseSensitive) {
        content = content.toLowerCase();
    }
    let words = content.split(tokenizer);
    if (excludeStopWords.length > 0) {
        words = words.filter(v => {
            return !stopwords.includes(v);
        });
    }

    return [...new Set(words.filter((v) => regex.test(v)))];
}