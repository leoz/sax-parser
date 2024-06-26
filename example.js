var xml = require("./lib/sax-parser");

var parser = new xml.SaxParser(function (cb) {
  cb.onStartDocument(function () {});
  cb.onEndDocument(function () {});
  cb.onStartElementNS(function (elem, attrs, prefix, uri, namespaces) {
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
  cb.onEndElementNS(function (elem, prefix, uri) {
    console.log("<= End: " + elem + " uri=" + uri + "\n");
    parser.pause(); // pause the parser
    setTimeout(function () {
      parser.resume();
    }, 100); //resume the parser
  });
  cb.onCharacters(function (chars) {
    console.log("<CHARS>" + chars + "</CHARS>");
  });
  cb.onCdata(function (cdata) {
    console.log("<CDATA>" + cdata + "</CDATA>");
  });
  cb.onComment(function (msg) {
    console.log("<COMMENT>" + msg + "</COMMENT>");
  });
  cb.onWarning(function (msg) {
    console.log("<WARNING>" + msg + "</WARNING>");
  });
  cb.onError(function (msg) {
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
