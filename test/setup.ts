import { expect } from 'vitest';

function decomment(css: string) {
  return css.replace(/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, '');
}

// function dedent(code: string) {
//   return code.replace(/\n\s*/g, '\n');
// }

export function format(css: string) {
  return decomment(css);
}

expect.addSnapshotSerializer({
  serialize(val) {
    return decomment(val);
  },
  test(val) {
    return typeof val === 'string';
  },
});
