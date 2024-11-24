export default plugin;
export type Options = {
    /**
     * Path to file(s) containing the `@variant` declarations.
     */
    files: string[];
};
/**
 * @typedef {object} Options
 * @property {string[]} files Path to file(s) containing the `@variant` declarations.
 */
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
 *     &:variant(hocus) {
 *       color: var(--color-input-accent);
 *     }
 *   }
 *   ```;
 *
 * @type {import('postcss').PluginCreator<Options>}
 */
declare const plugin: import("postcss").PluginCreator<Options>;
