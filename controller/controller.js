// still open, if I want to render more routes or not.
function showHome(req, res) {
  res.render("home");
}

module.exports = { showHome: showHome };
