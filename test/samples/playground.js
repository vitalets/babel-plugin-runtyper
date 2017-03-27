// @flow
function square(n) {
  return n * n;
}

window.document.getElementById('username').addEventListener('change', function (event) {
  square(event.target.value);
});
