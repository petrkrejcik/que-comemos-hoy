const path = require('path');
const fs = require('fs');

const getAllDirs = (dir) => {
  const directoryPath = path.join(__dirname, dir);
  const files = fs.readdirSync(directoryPath);
  return files.map((dir) => dir.split('.')[0]);
};

module.exports = {
  extends: ['plugin:cypress/recommended'],
  plugins: ['cypress'],
  // rules: {
  //   'import/order': [
  //     'warn',
  //     {
  //       alphabetize: { order: 'asc', caseInsensitive: true },
  //       groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
  //       pathGroups: [
  //         {
  //           pattern: 'react',
  //           group: 'external',
  //           position: 'before',
  //         },
  //         {
  //           // prints 'dir,dir/**' for each dir
  //           pattern: `{${getAllDirs('src').join(',')},${getAllDirs('src')
  //             .map((dir) => `${dir}/**`)
  //             .join(',')}}`,
  //           group: 'internal',
  //         },
  //       ],
  //       pathGroupsExcludedImportTypes: ['react'],
  //     },
  //   ],
  //   'no-restricted-imports': ['warn', { patterns: ['../*'] }],
  // },
};
