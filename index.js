const CARDINALS = [
  null,
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen"
]

const CARDINALS_1 = [
  null,
  null,
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety"
]

const CARDINAL_EXPONENTS = [
  null,
  null,
  "Hundred",
  "Thousand",
  null,
  null,
  "Million",
  null,
  null,
  "Billion",
  null,
  null,
  "Trillion",
  null,
  null
]

const isnotempty = function (possibly_empty) {
  return possibly_empty !== null && possibly_empty !== "";
}

const digit_meta = function(n) {
  var meta = {
    power: 0,
    exponent: 0,
    digit: 0,
  }
  if (n === 0) { return meta; }

  meta.power = Math.floor(n).toString().length - 1;
  meta.exponent = Math.pow(10, meta.power);
  meta.digit = Math.floor(n / meta.exponent);

  return meta;
}

const digit_cardinal = function(digit, cardinal_array) {
  return cardinal_array[digit];
}

const cardinalize = function(n) {
  var greater_than_ninety_nine = n > 99;
  var cardinals = [];
  var meta = "";
  var cardinal = "";

  if (n === 0) {
    return null;
  }

  if (greater_than_ninety_nine) {
    meta = digit_meta(n);
    cardinal = digit_cardinal(meta.digit, CARDINALS);
    cardinals.push(cardinal);
    cardinals.push("Hundred");
    n -= meta.digit * meta.exponent;
  }

  if (n === 0) {
    return cardinals.join(" ");
  }

  if (greater_than_ninety_nine) {
    cardinals.push("and");
  }

  if (n < CARDINALS.length) {
    cardinals.push(CARDINALS[n]);
  } else {
    meta = digit_meta(n);
    cardinal_teen = digit_cardinal(meta.digit, CARDINALS_1);

    n -= meta.digit * meta.exponent;

    meta = digit_meta(n);
    cardinal_unit = digit_cardinal(meta.digit, CARDINALS);

    cardinals.push([cardinal_teen, cardinal_unit].filter(isnotempty).join("-"));
  }

  return cardinals.join(" ");
}

const decimal_to_cardinal = function (n) {
  var meta = digit_meta(n);
  var nameable_powers = Math.floor(meta.power / 3);
  var cardinals = [];


  for (nameable_power = 0; nameable_power <= nameable_powers * 3; nameable_power += 3) {
    var nameable_unit = n;


    // Remove high digits
    while (meta.power >= nameable_power + 3) {
      nameable_unit -= meta.digit * meta.exponent;
      meta = digit_meta(nameable_unit);
    }

    // Remove low digits
    if (nameable_unit > 999) {
      nameable_unit = Math.floor(nameable_unit / Math.pow(10, nameable_power));
    }

    cardinals.unshift([cardinalize(nameable_unit), CARDINAL_EXPONENTS[nameable_power]].filter(isnotempty).join(" "));

    // Determine whether to prepend "and"
    if (nameable_unit !== 0 && (nameable_unit % 100 === 0 || nameable_unit < 100) && nameable_power === 0 && nameable_powers > 0) {
      cardinals[0] = "and " + cardinals[0];
    }
  }

  return cardinals.filter(isnotempty).join(", ");
};

module.exports = decimal_to_cardinal;
