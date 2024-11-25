# Tailwind Variant Selectors

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
pnpm add -D tailwind-variant-selectors
```

Then either use the PostCSS plugin...

```js
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    'tailwind-variant-selectors/postcss': { files: ['./src/styles/variants.css'] }
  }
};
```

Or the Vite plugin...

```ts
// vite.config.ts
import variants from 'tailwind-variant-selectors/vite';

export default defineConfig({
  plugins: [variants(), tailwindcss()]
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
