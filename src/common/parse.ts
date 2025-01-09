import { VARIANT_ATRULE_PATTERN } from './constants.js';

function deamp(selector: string) {
  const trimmed = selector.trim();
  if (trimmed.startsWith('&')) {
    return trimmed.substring(1);
  }
  return trimmed;
}

function format(selectors: string[]) {
  if (!selectors.length) {
    return '';
  }
  if (selectors.length === 1) {
    return deamp(selectors[0]);
  }
  return `:is(${selectors.map(deamp).join(', ')})`;
}

export function createVariantsSelectors() {
  const selectors = new Map<string, string>();

  function parse(code: string) {
    let matched = false;
    code.matchAll(RegExp(VARIANT_ATRULE_PATTERN, 'gi')).forEach((match) => {
      if (!match.groups?.name || !match.groups?.selectors) {
        return;
      }
      if (selectors.has(match.groups.name)) {
        console.warn(`Variant definition already found for ${match.groups.name}`);
        return;
      }
      selectors.set(match.groups.name, format(match.groups.selectors.split(',')));
      matched = true;
    });
    return matched;
  }

  return {
    selectors,
    parse,
  };
}
