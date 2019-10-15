/* @flow */
"use strict";

import type {numerical} from 'abstract-numerical-unit';

const AbstractNumericalUnit = require('abstract-numerical-unit');

class EnglishUnit extends AbstractNumericalUnit {

  constructor(power: numerical, value: numerical, next: ?EnglishUnit) {
    super(power, value, next);
  }

  static fromNumerical(numerical: numerical): EnglishUnit {
    return EnglishUnit.fromAbstract(super.fromNumerical(numerical));
  }

  static fromAbstract(abstract_unit: AbstractNumericalUnit): EnglishUnit {
    return new EnglishUnit(
      abstract_unit.power,
      abstract_unit.value,
      abstract_unit.next == null ? null : EnglishUnit.fromAbstract(abstract_unit.next),
    );
  }

  isLastOfUnit(): boolean {
    if (this.next == null) {
      return true;
    }

    return Math.floor(this.power / 3) !== Math.floor(this.next.power / 3);
  }

  getUnit(): ?string {
    if (!this.isLastOfUnit()) {
      return null;
    }
    switch (Math.floor(this.power / 3)) {
      case 1:
        return "Thousand";
      case 2:
        return "Million";
      case 3:
        return "Billion";
      case 4:
        return "Trillion";
      case 5:
        return "Quadrillion";
      case 6:
        return "Quintillion";
      default:
        return null;
    }
  }

  getLabel(): string {
    if (this.power % 3 === 1) {
      switch (this.value) {
        case 0:
          return "";
        case 2:
          return "Twenty";
        case 3:
          return "Thirty";
        case 4:
          return "Forty";
        case 5:
          return "Fifty";
        case 6:
          return "Sixty";
        case 7:
          return "Seventy";
        case 8:
          return "Eighty";
        case 9:
          return "Ninety";
        case 1:
          if (this.next == null || this.next.power + 1 !== this.power) {
            return "Ten";
          }
          const next_value = this.next.value;
          this.next = this.next.next;
          switch (next_value) {
            case 0:
              return "Ten";
            case 1:
              return "Eleven";
            case 2:
              return "Twelve";
            case 3:
              return "Thirteen";
            case 4:
              return "Fourteen";
            case 5:
              return "Fifteen";
            case 6:
              return "Sixteen";
            case 7:
              return "Seventeen";
            case 8:
              return "Eightteen";
            case 9:
              return "Nineteen";
            default:
              return "";
          }
        default:
          return "";
      }
    }

    switch (this.value) {
      case 1:
        return "One";
      case 2:
        return "Two";
      case 3:
        return "Three";
      case 4:
        return "Four";
      case 5:
        return "Five";
      case 6:
        return "Six";
      case 7:
        return "Seven";
      case 8:
        return "Eight";
      case 9:
        return "Nine";
      default:
        return "Zero";
    }
  }

  toString(): string {
    let string = this.getLabel();
    if (this.power % 3 === 2) {
      string += " Hundred";
    }
    if (this.getUnit() !== null) {
      string += ` ${String(this.getUnit())}`;
    }
    if (this.next != null) {
      if (this.power % 3 === 2) {
        string += " and";
      }
      string += ` ${this.next.toString()}`;
    }
    return string;
  }
}

const decimal_to_cardinal = function (n: numerical): string {
  return EnglishUnit.fromNumerical(n).toString();
};

module.exports = decimal_to_cardinal;
