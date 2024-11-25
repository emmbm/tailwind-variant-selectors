import { readFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import {
  CSS_ENTRY_PATTERN,
  CSS_FILE_PATTERN,
  CSS_IMPORT_PATTERN,
  format_selectors,
  unamp,
  VARIANT_ATRULE_PATTERN,
  VARIANT_SELECTOR_PATTERN
} from '../common/index.js';

/**
 * Use your custom tailwind variants as selectors inside css files without relying on the `@apply`
 * syntax.
 *
 * @returns {import('vite').Plugin[]}
 * @example
 *   ```css
 *   ⁣@variant hocus (&:hover, &:focus);
 *
 *   .btn {
 *     color: var(--color-input);
 *
 *     &:variant(hocus) {
 *       color: var(--color-input-accent);
 *     }
 *   }
 */
export default function plugin() {
  /**
   * @type {Map<string, string>}
   */
  const sources = new Map();

  /**
   * @type {Map<string, string>}
   */
  const variants = new Map();

  /**
   * @param {string} id
   * @param {string} code
   */
  function walk_variant_atrules(id, code) {
    const root = dirname(resolve(id));
    if (!sources.has(id) || sources.get(id) !== code) {
      let sourced = false;
      code.matchAll(RegExp(VARIANT_ATRULE_PATTERN, 'gi')).forEach((match) => {
        if (!match.groups?.name || !match.groups?.selectors) {
          return;
        }
        if (variants.has(match.groups.name)) {
          console.warn(`Variant definition already found for ${match.groups.name}`);
          return;
        }
        variants.set(match.groups.name, unamp(match.groups.selectors));
        sourced = true;
      });
      if (sourced) {
        sources.set(id, code);
      }
    }
    code.matchAll(RegExp(CSS_IMPORT_PATTERN, 'gi')).forEach((match) => {
      const file = match.groups?.file;
      if (!file) {
        return;
      }
      if (file.startsWith('url(')) {
        console.warn(`URL imports are not currently supported (${file})`);
        return;
      }
      if (CSS_FILE_PATTERN.test(file)) {
        const path = resolve(join(root, file));
        const imported = readFileSync(path, 'utf-8');
        walk_variant_atrules(file, imported);
      }
    });
  }

  return [
    {
      name: 'vite-plugin-tailwind-variants-atrules',
      enforce: 'pre',
      buildStart() {
        variants.clear();
        sources.clear();
      },
      transform(code, id) {
        if (CSS_ENTRY_PATTERN.test(id)) {
          walk_variant_atrules(id, code);
        }
      }
    },
    {
      name: 'vite-plugin-tailwind-variants-css-selectors',
      transform(code, id) {
        if (CSS_FILE_PATTERN.test(id)) {
          return code.replace(RegExp(VARIANT_SELECTOR_PATTERN, 'gi'), (matched, variant) => {
            if (!variants.has(variant)) {
              console.warn(`No corresponding variant definition found for ${matched}.`);
              return matched;
            }
            return format_selectors(variants.get(variant));
          });
        }
      }
    }
  ];
}
