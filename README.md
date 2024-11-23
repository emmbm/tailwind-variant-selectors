# PostCSS Tailwind Variant Selectors

Maybe cursed 🤮, maybe not 🤩, easily use your custom Tailwind CSS `@variant`s in CSS with. Useful
to maintain consistency across your custom `@component` or global styles and inline classes without
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

## Constraints

### Pseudo-elements

Since variant selectors are wrapped with `:is()`, any pseudo-elements inside your variants (ex.:
`@variant pseudo (&::after, &[data-fx-after]::after)`) will result in
[unmatchable CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/:is#is_does_not_select_pseudo-elements).
