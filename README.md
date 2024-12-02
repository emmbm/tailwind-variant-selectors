# Tailwind Variant Selectors

Maybe cursed 🤮 maybe blessed 🤩, easily use your custom Tailwind CSS `@variant`s in CSS. Useful to
maintain consistency across inline class variants and custom `@component`s or global styles without
relying on `@apply`-ridden stylesheets.

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
    'tailwind-variant-selectors/postcss': {
      files: ['./src/styles/variants.css']
    }
    //...
  }
};
```

Or the Vite plugin...

```ts
// vite.config.ts

import variants from 'tailwind-variant-selectors/vite';

export default defineConfig({
  plugins: [
    variants(), // Place before tailwind
    tailwindcss()
  ]
});
```

## Caveats

### Tailwind config

This package relies on `@variant` declarations, i.e. you need to use Tailwind v4's CSS-based config
approach. Variants added using `addVariant` or `matchVariant` js plugins currently are **not**
supported.

### Pseudo-elements

Since variants containing multiple selectors are compounded into `:is()` selectors, any variants
based on _non-single_ pseudo-elements will result in
[unmatchable CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/:is#is_does_not_select_pseudo-elements).

Ex.:

```css
@variant foo (&::after);
@variant bar (&::after, .hi-mom);

/* This will be transformed into a matchable selector. */
.btn:variant(foo) /* .btn::after. */ {
  /* ... */
}

/* This will be transformed into an unmatchable selector. */
.btn:variant(bar) /* .btn:is(::after, .hi-mom) */ {
  /* ... */
}
```

### Media queries and other at-rules

Not supported.

### Dynamic variants

Not supported.
