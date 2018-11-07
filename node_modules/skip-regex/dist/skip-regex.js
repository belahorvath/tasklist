/**
 * skipRegex v0.3.1
 * @author aMarCruz
 * @license MIT
 */
'use strict';

/** @exports skipRegex */
var skipRegex = (function () {

  // safe characters to precced a regex (including `=>`, `**`, and `...`)
  var beforeReChars = '[{(,;:?=|&!^~>%*/';
  var beforeReSign = beforeReChars + '+-';

  // keyword that can preceed a regex (`in` is handled as special case)
  var beforeReWords = [
    'case',
    'default',
    'do',
    'else',
    'in',
    'instanceof',
    'prefix',
    'return',
    'typeof',
    'void',
    'yield'
  ];

  // Last chars of all the beforeReWords elements to speed up the process.
  var wordsEndChar = beforeReWords.reduce(function (s, w) { return s + w.slice(-1); }, '');

  // Matches literal regex from the start of the buffer.
  // The buffer to search must not include line-endings.
  var RE_LIT_REGEX = /^\/(?=[^*>/])[^[/\\]*(?:(?:\\.|\[(?:\\.|[^\]\\]*)*\])[^[\\/]*)*?\/[gimuy]*/;

  // Valid characters for JavaScript variable names and literal numbers.
  var RE_JS_VCHAR = /[$\w]/;

  /**
   * Searches the position of the previous non-blank character inside `code`,
   * starting with `pos - 1`.
   *
   * @param   {string} code - Buffer to search
   * @param   {number} pos  - Starting position
   * @returns {number} Position of the first non-blank character to the left.
   * @private
   */
  function _prev(code, pos) {
    while (--pos >= 0 && /\s/.test(code[pos])){  }
    return pos
  }

  /**
   * Check if the character in the `start` position within `code` can be a regex
   * and returns the position following this regex or `start+1` if this is not
   * one.
   *
   * NOTE: Ensure `start` points to a slash (this is not checked).
   *
   * @function skipRegex
   * @param   {string} code  - Buffer to test in
   * @param   {number} start - Position the first slash inside `code`
   * @returns {number} Position of the char following the regex.
   *
   */
  return function skipRegex(code, start) {

    var re = /.*/g;
    var pos = re.lastIndex = start++;

    // `exec()` will extract from the slash to the end of the line
    //   and the chained `match()` will match the possible regex.
    var match = (re.exec(code) || ' ')[0].match(RE_LIT_REGEX);

    if (match) {
      var next = pos + match[0].length;      // result comes from `re.match`

      pos = _prev(code, pos);
      var c = code[pos];

      // start of buffer or safe prefix?
      if (pos < 0 || ~beforeReChars.indexOf(c)) {
        return next
      }

      // from here, `pos` is >= 0 and `c` is code[pos]
      if (c === '.') {
        // can be `...` or something silly like 5./2
        if (code[pos - 1] === '.') {
          start = next;
        }

      } else {

        if (c === '+' || c === '-') {
          // tricky case
          if (code[--pos] !== c ||            // if have a single operator or
             (pos = _prev(code, pos)) < 0 ||  // ...have `++` and no previous token
             ~beforeReSign.indexOf(c = code[pos])) {
            return next                       // ...this is a regex
          }
        }

        if (~wordsEndChar.indexOf(c)) {  // looks like a keyword?
          var end = pos + 1;

          // get the complete (previous) keyword
          while (--pos >= 0 && RE_JS_VCHAR.test(code[pos])){  }

          // it is in the allowed keywords list?
          if (~beforeReWords.indexOf(code.slice(pos + 1, end))) {
            start = next;
          }
        }
      }
    }

    return start
  }

})();

module.exports = skipRegex;
