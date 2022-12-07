/* test/parse-string.js */
var xml = require("../lib/sax-parser");
var expect = require("chai").expect;

var offset = "\t";

var parser = new xml.SaxParser(function (cb) {
  cb.onStartDocument(function () {
    console.log(offset + "=> onStartDocument");
  });
  cb.onEndDocument(function () {
    console.log(offset + "<= onEndDocument");
  });
  cb.onStartElementNS(function (elem, attrs, prefix, uri, namespaces) {
    console.log(
      offset +
      "=> Started: " +
      elem +
      " uri=" +
      uri +
      " (Attributes: " +
      JSON.stringify(attrs) +
      " )"
    );
  });
  cb.onEndElementNS(function (elem, prefix, uri) {
    console.log(offset + "<= End: " + elem + " uri=" + uri);
  });
  cb.onCharacters(function (chars) {
    console.log(offset + "<CHARS>" + chars + "</CHARS>");
  });
  cb.onCdata(function (cdata) {
    console.log(offset + "<CDATA>" + cdata + "</CDATA>");
  });
  cb.onComment(function (msg) {
    console.log(offset + "<COMMENT>" + msg + "</COMMENT>");
  });
  cb.onWarning(function (msg) {
    console.log(offset + "<WARNING>" + msg + "</WARNING>");
  });
  cb.onError(function (msg) {
    console.log(offset + "<ERROR>" + JSON.stringify(msg) + "</ERROR>");
  });
});

describe("#parseString()", function () {
  context("with string argument", function () {
    it("should parse HTML", function (done) {
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
      done();
    });
  });
});
