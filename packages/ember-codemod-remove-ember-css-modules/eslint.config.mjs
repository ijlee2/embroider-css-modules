import baseConfiguration from '@shared-configs/eslint-config-node/typescript';

export default [
  ...baseConfiguration,
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
];
