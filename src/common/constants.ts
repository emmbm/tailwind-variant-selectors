export const CSS_FILE_PATTERN = /.*\.(css|scss|sass|pcss|postcss)$/;

export const CSS_ENTRY_PATTERN = /^((?!\?svelte&type=style).)+\.(css|scss|sass|pcss|postcss)$/;

export const CSS_IMPORT_PATTERN = /@import\s+('|")(?<file>[^("|')]*)('|")/;

export const VARIANT_ATRULE_PATTERN = /@variant\s+(?<name>[^\s]*)\s+\((?<selectors>.*[^;])\)/;

export const VARIANT_SELECTOR_PATTERN = /:variant\(([^)\n\r]*)\)/;
