# isoinspector

A basic preact single-page app that attempts to parse the tags in streaming media files. Currently supports ISOBMFF (from codem-isoboxer) and webM (from ebml). M2TS in progress.

## Usage
Just run the page and either paste bytes in Base64 format or browse to a local file. To switch parsing modes click on the button at top right.

## Programming notes
Using a custom version of ebml where you pass an 'external schema' as a second argument to the decoder. Similar to ebml-universal package, but instead of having to specify the whole schema only pass in the additional definitions.

* TODO: fork the repo and add this in