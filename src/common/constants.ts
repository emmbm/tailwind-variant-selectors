export const CSS_FILE_PATTERN = /.*\.(css|scss)$/;

export const CSS_ENTRY_PATTERN = /^((?!\?svelte&type=style).)+\.(css|scss)$/;

export const CSS_IMPORT_PATTERN = /@import\s+('|")(?<file>[^("|')]*)('|")/;

export const VARIANT_ATRULE_PATTERN = /@variant\s+(?<name>.*[^\s])\s+\((?<selectors>.*[^;|\s])\)/;

export const VARIANT_SELECTOR_PATTERN = /:variant\(([^)\n\r]*)\)/;
