// Source - https://stackoverflow.com/a/7828803
// Posted by josh3736, modified by community. See post 'Timeline' for change history
// Retrieved 2026-06-25, License - CC BY-SA 4.0

var i = 0;
function inc() {
  i++;
  inc();
}

try {
  inc();
} catch (e) {
  // The StackOverflow sandbox adds one frame that is not being counted by this code
  // Incrementing once manually
  i++;
  console.log("Maximum stack size is", i, "in your current browser");
}
