import { postcssTape } from '@csstools/postcss-tape';
import plugin from '../index.js';

postcssTape(plugin)({
  index: {
    message: 'parses @variant and transforms :variant() selectors',
    options: {
      files: ['./test/index.css']
    }
  }
});
