(function () {
  var $ = function (id) { return document.getElementById(id); };
  var num = function (id) { var n = parseFloat($(id).value); return isFinite(n) && n > 0 ? n : 0; };
  function fmt(x) {
    var u = $("unit"), unit = u.value ? u.options[u.selectedIndex].text : "", cur = $('cur').value;
    var s = x >= 100 ? Math.round(x).toLocaleString('en-IN') : x.toLocaleString('en-IN', { maximumFractionDigits: x >= 10 ? 1 : 2 });
    return cur + s + (unit ? ' ' + unit : '');
  }
  function run() {
    var v = num('v'), r = num('r'), d0 = num('d0'), d1 = num('d1'), o = parseFloat($('o').value) || 0;
    var monthly = v / 12 + r;
    var sofar = monthly * d0, longer = monthly * d1, week = monthly * 12 / 52;
    var lost = v * (1 - Math.pow(1 - o, (d0 + d1) / 12));
    $('o1').textContent = fmt(sofar);
    $('o2').textContent = fmt(longer);
    $('o3').textContent = fmt(week);
    $('o4').textContent = o ? fmt(lost) : 'None';
    $('sum').textContent = v || r
      ? 'By the time you decide, this postponement will have cost about ' + fmt(sofar + longer) + (o ? ', and the prize itself will be about ' + fmt(lost) + ' a year smaller.' : '.')
      : 'Enter the annual value at stake to see the cost of waiting.';
  }
  $('calc').addEventListener('input', run);
  run();
})();
