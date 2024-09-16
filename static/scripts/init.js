// Qualified
(function (w, q) {
  w["QualifiedObject"] = q;
  w[q] =
    w[q] ||
    function () {
      // eslint-disable-next-line prefer-rest-params
      (w[q].q = w[q].q || []).push(arguments);
    };
})(window, "qualified");
