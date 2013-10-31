Parse.initialize("OCbRi66SwZ7d0xAik7xZXNZoRdLvSE87GSyw3zxJ", "Wb5Ul5lZhMH0Bhs8tTgvFqTKUZhjXR9cDa7zx3As");

var TestObject = Parse.Object.extend("TestObject");

var testObject = new TestObject();
testObject.save({foo: "bar"}, {
  success: function(object) {
    alert("yay! it worked");
  }
});
