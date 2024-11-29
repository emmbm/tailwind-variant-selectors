import { describe, it, vi } from 'vitest';

describe('plugin build output', async () => {
  it('parses @variant rules and transforms :variant() selectors', async (ctx) => {
    const { default: css } = await vi.importActual('index.css');
    ctx.expect(css).toBeDefined();
    ctx.expect(String(css)).toMatchSnapshot();
  });
});
