# Frolics
- [What Is Frolics](#introduction)
- [Installation](#installation)
    - [Document Preparing](#preparing)
    - [Customized Fields](#customized-fields)
    - [Hand-on Example](#example)
    - [Cache](#cache)
- [Usage](#usage)

<a name="introduction"></a>
## What Is Frolics ?

Frolics is an offline, lightweight, full-text search library for Frontend applications.

Frolics is inspired by Elasticsearch and Lucence, the underlying implementation includes text-processing algorithms and data structure such as tokenization, stemming and inverted index.

When a `docs` is provided, Frolics creates an inveted index data accordingly, which is widely used in major full-text search services such as Elasticsearch and Google Search.

From now on, you can omit onerous installation process to carry out a full-text search, and even better, you may no longer need a backend to develop such feature.

Frolics is here to help!

<a name="installation"></a>
## Installation

Before installing frolics, please make sure your Node version is compatible. Node v12+ is OK but Node v16 is recommended.

However, Node v17+ had a compatibility issue when I was testing Frolics in ReactJS. But Node v16 was working well.

Once done. Run `npm install frolics` in terminal.


<a name="usage"></a>
## Usage

<a name="preparing"></a>
#### Document Preparing

Before importing, a raw data is required. It should look like this:

```
const docs = [
    {
        id: 1,
        body: 'this is a test full text'
    },
    {
        id: 2,
        body: 'can you can a can as a canner who can can a can',
    },
];
```

Keep in mind that an unique `id` and a text content `body` fields are required as `id` distinguishes each document and `body` is the content Frolics needs to analyze and classify text data for searching.

<a name="customized-fields"></a>
#### Customized Fields

In additioal to `id` and `body` as required fields, you can have multiple ones for different features. For example, if you want a preview image when searching, you can alter `docs` like this:

```
const docs = [
    {
        id: 1,
        body: 'this is a test full text',
        // imagesURL field is totally optional, you can have different name and data structure
        imagesURL: 'https://yourImage.com/img1.png',
    },
    {
        id: 2,
        body: 'can you can a can as a canner who can can a can',
    },
];

```

<a name="example"></a>
#### Hand-on Example

After defining `docs`, we are all set. Next step is to use Frolics.

Frolics supports ES6 syntax, therefore you can import like this:

```
import createDTM from 'frolics';
import { docs } from "../assets/document.js" // Don't forget the raw data
```

Now you can call `createDTM` like this:

```
const DTM = createDTM(docs);
```

The `createDTM` is the main function that takes `docs` and creates an inverted index dictionary.

For the detailed example, please visit the example folder.

<a name="cache"></a>
#### Cache
What `createDTM` function returns is an inverted index dictionary. It can be converted to human-readable JSON format with simple JavaScript built-in function `JSON.stringify` method.

You can choose any file reading method based on your frameworks and load the JSON file, if exists, before calling `createDTM` function.
