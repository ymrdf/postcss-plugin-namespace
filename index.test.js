var postcss = require("postcss");

var plugin = require("./");

function run(input, output, selector, opts) {
  return postcss([plugin(selector, opts)])
    .process(input)
    .then(function(result) {
      expect(result.css).toEqual(output);
      expect(result.warnings()).toHaveLength(0);
    });
}

it("add selector correctly", function() {
  return run("a{ }", ".test a{ }", ".test");
});

it("do not add selector before selectors which is begin with, for example: @media,@keyframes, @suport etc", function() {
  return run("a{ }", ".test a{ }", ".test");
});

// describe("do not add anything when the arguments were wrong", function() {
//   it("do not have arguments ", function() {
//     return run("a{ }", "a{ }");
//   });

//   it("selector type is error", function() {
//     return run("a{ }", "a{ }", {}, {});
//   });

//   it("opts type is error", function() {
//     return run("a{ }", ".ss a{ }", ".ss", "string");
//   });
// });

// describe("ignore option will work correctly", function() {
//   it("single ignore", function() {
//     return run("a{ }", "a{ }", ".test", { ignore: /a/ });
//   });

//   it("multiple ignore", function() {
//     return run("a{ } body{ }", "a{ } body{ }", ".test", {
//       ignore: [/a/, /body/]
//     });
//   });

//   it("string type ignore", function() {
//     return run("a{ } body{ }", ".test a{ } body{ }", ".test", {
//       ignore: "body"
//     });
//   });
//});
