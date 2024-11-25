import { postcssTape } from '@csstools/postcss-tape';
import postcssPlugin from '../postcss/index.js';

postcssTape(postcssPlugin, {
  skipPackageNameCheck: true
})({
  index: {
    message: 'postcss plugin parses @variant rules and transforms :variant() selectors',
    options: {
      files: ['./test/index.css']
    }
  }
});

// test('vite plugin parses @variant rules and transforms :variant() selectors', async () => {
//   expect().toBe();
// });
