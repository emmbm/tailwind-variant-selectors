import { postcssTape } from '@csstools/postcss-tape';
import pp from '../postcss/index.js';

postcssTape(pp, {
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
