import baseConfiguration from '@shared-configs/eslint-config-ember/v1-app';

export default [
  ...baseConfiguration,
  {
    files: ['**/*.{gts,ts}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
