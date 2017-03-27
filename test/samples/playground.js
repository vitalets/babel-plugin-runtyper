function foo(x) {
  return x * 10;
}



window.document.getElementById('username').addEventListener('change', function (event) {
  foo(event.target.value)
});
