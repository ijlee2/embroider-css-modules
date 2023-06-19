export default function createPlugin() {
  return {
    name: 'embroider-css-modules',

    transform: async (code, filePath) => {
      if (!filePath.endsWith('.css')) {
        return;
      }

      console.log('code:');
      console.log(code);
      console.log('\n');
    },
  };
}
