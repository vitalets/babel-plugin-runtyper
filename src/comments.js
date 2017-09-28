/**
 * Comments
 *
 * Checks for line comment '// runtyper-disable-line' and mark as disabled
 *
 * todo:
 * Currently we collect all comments on start and check lines.
 * Another approach is to check `path.parent|path.parentPath|path.container`
 * and use `leadingComments|trailingComments` props, but I did not managed to get
 * it reliably working.
  */

'use strict';

const DISABLE_LINE_REGEX = /^\s*runtyper-disable-line/i;

module.exports = class Comments {
  constructor(state) {
    this._extractLinesFromComments(state.file.ast.comments);
  }

  containsDisabledLines(node) {
    if (node.loc) {
      const start = node.loc.start.line;
      const end = node.loc.end.line;
      return this._disabledLines.some(line => line >= start && line <= end);
    }
  }

  _extractLinesFromComments(comments) {
    this._disabledLines = comments
      .filter(comment => comment.type === 'CommentLine')
      .filter(comment => DISABLE_LINE_REGEX.test(comment.value))
      .map(comment => comment.loc.start.line);
  }
};
