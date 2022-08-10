import { Documents, returnedOriganizedObject } from './domain/types';
export declare function createDTM(docs: Documents): returnedOriganizedObject;
/**
 * Write the created DTM content to a cached json file
 * @param filename Cache filename
 * @param data Document Term Matrix content
 * @returns none
 */
/**
 * Return the cached Document Term Matrix content
 * @param filename Cache filename
 * @returns returnedOriganizedObject
 */
