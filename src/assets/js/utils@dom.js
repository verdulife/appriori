var log = console.log.bind(window.console);
var dir = console.dir.bind(window.console);
var info = function (info) {
  return console.info("%c ℹ " + info, " color: #2d8cf0; font-weight: bold");
};
var succ = function (succ) {
  return console.info("%c ✅ " + succ, " color: #19be6b; font-weight: bold");
};
var warn = function (warn) {
  return console.info("%c ⚠ " + warn, " color: #ff9900; font-weight: bold");
};
var error = function (err) {
  return console.info("%c ❌ " + err, " color: #ed3f14; font-weight: bold");
};
var table = function (arr) {
  return console.table(arr);
};

function distance(lat1, lon1, lat2, lon2, unit) {
  lat1 = parseFloat(lat1);
  lon1 = parseFloat(lon1);

  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }

    return dist;
  }
}

function accentOut(texto) {
  return texto
    .normalize("NFD")
    .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, "$1")
    .normalize();
}

function getBright(color) {
  var color = "" + color,
    isHEX = color.indexOf("#") == 0,
    isRGB = color.indexOf("rgb") == 0;
  if (isHEX) {
    const hasFullSpec = color.length == 7;
    var m = color.substr(1).match(hasFullSpec ? /(\S{2})/g : /(\S{1})/g);
    if (m)
      var r = parseInt(m[0] + (hasFullSpec ? "" : m[0]), 16),
        g = parseInt(m[1] + (hasFullSpec ? "" : m[1]), 16),
        b = parseInt(m[2] + (hasFullSpec ? "" : m[2]), 16);
  }
  if (isRGB) {
    var m = color.match(/(\d+){3}/g);
    if (m)
      var r = m[0],
        g = m[1],
        b = m[2];
  }
  if (typeof r != "undefined") return (r * 299 + g * 587 + b * 114) / 1000;
}

function moveArray(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
}

function fancyStats(n, d) {
  (x = ("" + n).length), (p = Math.pow), (d = p(10, d));
  x -= x % 3;
  return Math.round((n * d) / p(10, x)) / d + " kMGTPE"[x / 3];
}