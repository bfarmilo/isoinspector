# isoinspector

A basic preact single-page app that attempts to parse the tags in streaming media files. Currently supports ISOBMFF (from codem-isoboxer) and webM (from ebml). M2TS in progress.

## Usage
Just run the page and either paste bytes in Base64 format or browse to a local file. To switch parsing modes click on the button at top right.

## Programming notes
Added a feature to ebml where you pass an 'external schema' as a second argument to the decoder. Similar to ebml-universal package, but instead of having to specify the whole schema only pass in the additional definitions.

## Architecture notes
To clean up, need to pass a consistent object to the view layer to render. View layer needs the following:
1. Basic data for the box. type/name, start offset, end offset, [raw hex, string of raw hex]
  1. Ideally, for performance, send the raw hex and string of raw hex only when selected, and only for the box selected. Parse this from the raw data.
1. Contents of the box, ie the payload and the values.
  1. In the case of ISO, any nested boxes show up below this.
  1. In the case of WebM, box contents have no payload if there is a nested box.
  1. Additional processing may be required for the payload of the box to display in a friendly way, ie, if it is an array of entries, or objects, or uuid's. This processing is done as the box is parsed.
1. Sub-boxes show up as next level down.

So the basic structure of the display layer is:

displayData:
level1box (start, end)
|
+--simpleproperty: displayvalue
+-+arrayproperty
| |
| +--displayvalue[n]
+-+level2box
  |
  +-- etc.


rawValues: Uint8Array(byteStream, start, end)

Note EBML parser deals with (basically) raw binary so all formatting is done manually.
codem-isoboxer seems to do much of the parsing so displayvalues are done in a separate pass.
Performance of multiple passes, or carving up the hex, is *really bad*

Need way to keep track of which box is selected for hex display. Probably need a map (type/name: {start, end}) then create arrays as needed.

## Issues List

1. Allow this to also run the service (Nflx, etc. etc.) by acting as a desktop web Browser (electron). Then capture keys etc. to allow replaying. parse-on-the-fly?
1. Expand-all tree component
1. Search by box name, expands tree down to and including that box, jumps cursor to start of box entry