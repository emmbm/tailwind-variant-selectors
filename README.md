# PostCSS Tailwind Variant Selectors

Maybe cursed 🤮, maybe not 🤩, easily use your custom Tailwind CSS `@variant`s in CSS. Useful to
maintain consistency across inline class variants and custom `@component`s or global styles without
relying on `@apply`-ridden stylesheets for the latter.

```css
@variant hocus (&:hover, &:focus);

.btn {
  color: var(--color-input);
  &:variant(hocus) {
    color: var(--color-input-accent);
  }
}
```

## Usage

```bash
pnpm add -D postcss-tailwind-variant-selectors
```

Then add the plugin to your project's PostCSS config:

Using a standalone config file...

```js
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-tailwind-variant-selectors': { files: ['./src/styles/variants.css'] }
  }
};
```

Or within your bundler's config...

```ts
// vite.config.ts
import variants from 'postcss-tailwind-variant-selectors';

export default defineConfig({
  css: {
    postcss: {
      plugins: [variants({ files: ['./src/styles/variants.css'] })]
    }
  },
  plugins: [tailwindcss()]
  // ...
});
```

## Constraints

### Pseudo-elements

Since variant selectors are wrapped with `:is()`, any pseudo-elements inside your variants will
result in
[unmatchable CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/:is#is_does_not_select_pseudo-elements).

Ex.:

```css
@variant fx (&::after);

/* This will be transformed to ".btn:is(::after)", which is not a matchable selector. */
.btn:variant(fx) {
  /* ... */
}
```
