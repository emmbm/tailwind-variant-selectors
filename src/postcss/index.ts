import { readFileSync } from 'fs';
import { PluginCreator } from 'postcss';
import { VARIANT_SELECTOR_PATTERN } from '../common/constants';
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
const plugin: PluginCreator<{ files?: string[] }> = ({ files = [] } = {}) => {
  const variants = createVariantsSelectors();

  for (const file of files) {
    const code = readFileSync(file, 'utf-8');
    variants.parse(code);
  }

  return {
    postcssPlugin: 'postcss-tailwind-variant-selectors',
    Rule(rule, { result }) {
      if (!rule.selector || !VARIANT_SELECTOR_PATTERN.test(rule.selector)) {
        return;
      }
      const selector = rule.selector.replace(VARIANT_SELECTOR_PATTERN, (matched, variant) => {
        const existing = variants.selectors.get(variant);
        if (!existing) {
          rule.warn(
            result,
            `No corresponding variant definition found for ${variant} (used at ${rule}).`
          );
          return matched;
        }
        return existing;
      });
      if (selector !== rule.selector) {
        rule.replaceWith(rule.clone({ selector }));
      }
    }
  };
};

plugin.postcss = true;

export default plugin;
