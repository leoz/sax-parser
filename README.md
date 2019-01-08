# SAX Parser

[![npm version](https://badge.fury.io/js/sax-parser.svg)](https://badge.fury.io/js/sax-parser) [![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

sax-parser is an xml parser written in javascript. 

## Install

```sh
npm install sax-parser
```

## API

SAX Parser provides a SAX2 parser interface that can take a string, file. The parser can take characters from the document in chunks. To send chunks of the document to the parser use 'parseString(xml)'

## SAX Parser

### new xml.SaxParser()
* Instantiate a new SaxParser
* returns: a SaxParser object

### new xml.SaxParser(callback)
* Instantiate a new SaxParser
* returns: a SaxParser object
* Arguments
	* callback - a function that accepts the new sax parser as an argument
	
## Parse

### parser.parseString(string)
* Parse an in memory string
* return: boolean. true if no errors, false otherwise
* Arguments
	* string - a string representing the document to parse
	
### parser.pause()
pauses parsing of the document

### parser.resume()
resumes parsing of the document

## Callbacks

### parser.onStartDocument(function() {})

Called at the start of a document

### parse.onEndDocument(function() {})

 Called at the end of the document parse

### parser.onStartElementNS(function(elem, attrs, prefix, uri, namespaces) {})

Called on an open element tag
* Arguments
	* elem - a string representing the element name
	* attrs - an array of arrays: [[key, value], [key, value]]
	* prefix - a string representing the namespace prefix of the element
	* uri - the namespace URI of the element
	* namespaces - an array of arrays: [[prefix, uri], [prefix, uri]]

### parser.onEndElementNS(function(elem, prefix, uri) {})

Called at the close of an element
* Arguments
	* elem - a string representing the element name
    * prefix - a string representing the namespace prefix of the element
    * uri - the namespace URI of the element

### parser.onCharacters(function(chars) {})

Called when a set of content characters is encountered
* Arguments
	* chars - a string of characters

### parser.onCdata(function(cdata) {})

Called when a CDATA is encountered
* Arguments
	* cdata - a string representing the CDATA

### parser.onComment(function(msg) {})

Called when a comment is encountered
* Arguments
	* msg - a string representing the comment

### parser.onWarning(function(msg) {})

Called when a warning is encountered
* Arguments
	* msg - a string representing the warning message

### parser.onError(function(msg) {})

Called when an error is encountered
   * Arguments
		* msg - a string representing the error message
	

## EXAMPLE USAGE

```JavaScript
var xml = require("./lib/sax-parser");

var parser = new xml.SaxParser(function(cb) {
  cb.onStartDocument(function() {});
  cb.onEndDocument(function() {});
  cb.onStartElementNS(function(elem, attrs, prefix, uri, namespaces) {
    console.log(
      "=> Started: " +
        elem +
        " uri=" +
        uri +
        " (Attributes: " +
        JSON.stringify(attrs) +
        " )"
    );
  });
  cb.onEndElementNS(function(elem, prefix, uri) {
    console.log("<= End: " + elem + " uri=" + uri + "\n");
    parser.pause(); // pause the parser
    setTimeout(function() {
      parser.resume();
    }, 100); //resume the parser
  });
  cb.onCharacters(function(chars) {
    console.log("<CHARS>" + chars + "</CHARS>");
  });
  cb.onCdata(function(cdata) {
    console.log("<CDATA>" + cdata + "</CDATA>");
  });
  cb.onComment(function(msg) {
    console.log("<COMMENT>" + msg + "</COMMENT>");
  });
  cb.onWarning(function(msg) {
    console.log("<WARNING>" + msg + "</WARNING>");
  });
  cb.onError(function(msg) {
    console.log("<ERROR>" + JSON.stringify(msg) + "</ERROR>");
  });
});

//example read from chunks
parser.parseString("<html><body>");
parser.parseString("<!-- This is the start");
parser.parseString(" and the end of a comment -->");
parser.parseString("and lots");
parser.parseString("and lots of text&am");
parser.parseString("p;some more.");
parser.parseString("<![CD");
parser.parseString("ATA[ this is");
parser.parseString(" cdata ]]>");
parser.parseString("</body");
parser.parseString("></html>");
```

## Author

* Copyright 2009 - 2010 © Rob Righter (@robrighter)
* Contributions from David Joham

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
