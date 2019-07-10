var test = require("tape");
var handlerFile = require("../src/handler");

test("trying test", function(t) {
  t.pass();
  t.end();
});

test("matching btw input text and universities name", function(t) {
  var actual = handlerFile.findMatch(
    [
      {
        AD: "AE",
        "University of Andorra": "Abu Dhabi University",
        "http:": []
      },
      {
        AD: "AE",
        "University of Andorra": "Ajman University of Science & Technology",
        "http:": []
      }
    ],
    "Ajman University of Science"
  );

  var expected = ["Ajman University of Science & Technology"];
  t.deepEqual(actual, expected, "auto complete universities name");
  t.end();
});
