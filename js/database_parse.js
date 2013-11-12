// Behrends Parse.initialize("OCbRi66SwZ7d0xAik7xZXNZoRdLvSE87GSyw3zxJ", "Wb5Ul5lZhMH0Bhs8tTgvFqTKUZhjXR9cDa7zx3As");
//eigen
Parse.initialize("1mwLhaHUhEnrZBlvwgHHy93PsixYFLeHmXTkl15v", "p6vQ9vyGS5XuFceJVgMBjr2T5YxCohqLdRTzSkKU");

var TestObject = Parse.Object.extend("TestObject");

var testObject = new TestObject();
testObject.save({foo: "bar"}, {
  success: function(object) {
    alert("yay! it worked");
  }
});
