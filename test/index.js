import { postcssTape } from '@csstools/postcss-tape';
import plugin from '../postcss/index.js';

postcssTape(plugin)({
  index: {
    message: 'parses @variant and transforms :variant() selectors',
    options: {
      files: ['./test/index.css']
    }
  }
});

// to do: vite plugin tests
