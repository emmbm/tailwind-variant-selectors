export const CSS_FILE_PATTERN = /.*\.(css|scss)$/;

export const CSS_ENTRY_PATTERN = /^((?!\?svelte&type=style).)+\.(css|scss)$/;

export const CSS_IMPORT_PATTERN = /@import\s+('|")(?<file>[^("|')]*)('|")/;

export const VARIANT_ATRULE_PATTERN = /@variant\s+(?<name>.*[^\s])\s+\((?<selectors>.*[^;|\s])\)/;

export const VARIANT_SELECTOR_PATTERN = /:variant\((.*[^\)])\)/;

/**
 * @param {string} selectors
 */
export function unamp(selectors) {
  return selectors
    .split(',')
    .map((s) => {
      const trimmed = s.trim();
      if (trimmed.startsWith('&')) {
        return trimmed.substring(1);
      }
      return trimmed;
    })
    .join(', ');
}

/**
 * @param {string} selectors
 */
export function format_selectors(selectors) {
  return `:is(${selectors})`;
}
