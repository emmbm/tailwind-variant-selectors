import { readFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { Plugin } from 'vite';
import {
  CSS_ENTRY_PATTERN,
  CSS_FILE_PATTERN,
  CSS_IMPORT_PATTERN,
  VARIANT_SELECTOR_PATTERN
} from '../common/constants';
import { createVariantsSelectors } from '../common/parse';

/**
 * Use your custom tailwind variants as selectors inside css files without relying on the `@apply`
 * syntax.
 *
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
  const sources = new Map<string, string>();
  const variants = createVariantsSelectors();

  function walk(id: string, code: string) {
    const root = dirname(resolve(id));
    if (!sources.has(id) || sources.get(id) !== code) {
      const matched = variants.parse(code);
      if (matched) {
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
        walk(file, imported);
      }
    });
  }

  return [
    {
      name: 'vite-plugin-tailwind-variants-atrules',
      enforce: 'pre',
      buildStart() {
        variants.selectors.clear();
        sources.clear();
      },
      transform(code, id) {
        if (CSS_ENTRY_PATTERN.test(id)) {
          walk(id, code);
        }
      }
    },
    {
      name: 'vite-plugin-tailwind-variants-css-selectors',
      transform(code, id) {
        if (CSS_FILE_PATTERN.test(id)) {
          return code.replace(RegExp(VARIANT_SELECTOR_PATTERN, 'gi'), (matched, variant) => {
            const existing = variants.selectors.get(variant);
            if (!existing) {
              console.warn(`No corresponding variant definition found for ${matched}.`);
              return matched;
            }
            return existing;
          });
        }
      }
    }
  ] satisfies Plugin[];
}
