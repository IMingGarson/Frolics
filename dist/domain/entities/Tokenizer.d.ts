/**
 * Tokenizing a given string into an array of words, by default we only allow alphanumeric words
 * @param content string: The given plain text string
 * @param tokenizer string: The string separator, space by default
 * @param regex Regex: for a specific pattern
 * @param caseSensitive boolean: If true then tokenize the given string in case-sensitive manner; otherwise not
 * @param excludeStopWords Array: If given then exclude stop words from the given array; otherwise from the defalt array
 * @returns Array: The tokenized array of words
 */
export declare function Tokenizer(content?: string, tokenizer?: string, regex?: RegExp, caseSensitive?: boolean, excludeStopWords?: Array<string>): Array<string>;
