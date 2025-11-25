import { assert, test } from '@codemod-utils/tests';

import { getClassToStyles } from '../../../src/utils/css/index.js';

test('utils | get-class-to-styles > complex case (2)', function () {
  const file = [
    `.container {`,
    `  display: grid;`,
    `  grid-template-areas:`,
    `    "header"`,
    `    "image-container"`,
    `    "body"`,
    `    "actions";`,
    `  grid-template-columns: 1fr;`,
    `  grid-template-rows: auto auto 1fr auto;`,
    `  height: calc(100% - 2rem) !important;`,
    `  padding: 1rem;`,
    `  position: relative;`,
    `  width: calc(100% - 2rem) !important;`,
    `}`,
    ``,
    `.container:hover {`,
    `  background: #26313d;`,
    `  transform: translateY(-0.25rem);`,
    `  transition: all 0.25s;`,
    `}`,
    ``,
    `.header {`,
    `  grid-area: header;`,
    `}`,
    ``,
    `.name {`,
    `  font-size: 1.25rem;`,
    `  font-weight: 700;`,
    `  margin-bottom: 0.75rem;`,
    `}`,
    ``,
    `.image-container {`,
    `  grid-area: image-container;`,
    `  max-height: 6rem;`,
    `  max-width: 8rem;`,
    `}`,
    ``,
    `.body {`,
    `  grid-area: body;`,
    `  margin-top: 1rem;`,
    `}`,
    ``,
    `.description,`,
    `.price {`,
    `  font-size: 0.875rem;`,
    `  margin-bottom: 0.375rem;`,
    `}`,
    ``,
    `.actions {`,
    `  align-items: center;`,
    `  display: flex;`,
    `  grid-area: actions;`,
    `  justify-content: flex-end;`,
    `}`,
    ``,
    `.link {`,
    `  background: transparent;`,
    `  border: 0.0625rem solid rgb(247 252 251 / 50%);`,
    `  border-radius: 0.15rem;`,
    `  color: rgb(247 252 251 / 90%);`,
    `  font-family: Raleway, sans-serif;`,
    `  font-size: 0.875rem;`,
    `  margin-top: 0.5rem;`,
    `  padding: 0.25rem 0.5rem;`,
    `  text-decoration: none;`,
    `}`,
    ``,
    `.link::after {`,
    `  content: "";`,
    `  height: 100%;`,
    `  left: 0;`,
    `  position: absolute;`,
    `  top: 0;`,
    `  width: 100%;`,
    `}`,
    ``,
    `.link:focus {`,
    `  outline: 0;`,
    `}`,
    ``,
    `.link:focus::after {`,
    `  border: 1px solid orange;`,
    `}`,
    ``,
    `.container[data-container-query-wide] {`,
    `  column-gap: 1.5rem;`,
    `  grid-template-areas:`,
    `    "image-container header"`,
    `    "image-container body"`,
    `    "image-container actions";`,
    `  grid-template-columns: auto 1fr;`,
    `  grid-template-rows: auto 1fr auto;`,
    `}`,
    ``,
    `.container[data-container-query-wide]`,
    `  .body {`,
    `  margin-top: 0;`,
    `}`,
    ``,
    `.container[data-container-query-wide]`,
    `  .link {`,
    `  margin-top: 1rem;`,
    `}`,
    ``,
  ].join('\n');

  assert.deepStrictEqual(
    getClassToStyles(file),
    new Map([
      [
        'container',
        [
          {
            classes: ['container'],
            location: {
              end: { column: 1, line: 14, offset: 305 },
              start: { column: 1, line: 1, offset: 0 },
            },
            raw:
              '.container {\n' +
              '  display: grid;\n' +
              '  grid-template-areas:\n' +
              '    "header"\n' +
              '    "image-container"\n' +
              '    "body"\n' +
              '    "actions";\n' +
              '  grid-template-columns: 1fr;\n' +
              '  grid-template-rows: auto auto 1fr auto;\n' +
              '  height: calc(100% - 2rem) !important;\n' +
              '  padding: 1rem;\n' +
              '  position: relative;\n' +
              '  width: calc(100% - 2rem) !important;\n' +
              '}',
            selector: '.container',
          },
          {
            classes: ['container'],
            location: {
              end: { column: 1, line: 20, offset: 410 },
              start: { column: 1, line: 16, offset: 307 },
            },
            raw:
              '.container:hover {\n' +
              '  background: #26313d;\n' +
              '  transform: translateY(-0.25rem);\n' +
              '  transition: all 0.25s;\n' +
              '}',
            selector: '.container:hover',
          },
          {
            classes: ['container'],
            location: {
              end: { column: 1, line: 93, offset: 1562 },
              start: { column: 1, line: 85, offset: 1317 },
            },
            raw:
              '.container[data-container-query-wide] {\n' +
              '  column-gap: 1.5rem;\n' +
              '  grid-template-areas:\n' +
              '    "image-container header"\n' +
              '    "image-container body"\n' +
              '    "image-container actions";\n' +
              '  grid-template-columns: auto 1fr;\n' +
              '  grid-template-rows: auto 1fr auto;\n' +
              '}',
            selector: '.container[data-container-query-wide]',
          },
          {
            classes: ['container', 'body'],
            location: {
              end: { column: 1, line: 98, offset: 1630 },
              start: { column: 1, line: 95, offset: 1564 },
            },
            raw: '.container[data-container-query-wide]\n  .body {\n  margin-top: 0;\n}',
            selector: '.container[data-container-query-wide]\n  .body',
          },
          {
            classes: ['container', 'link'],
            location: {
              end: { column: 1, line: 103, offset: 1701 },
              start: { column: 1, line: 100, offset: 1632 },
            },
            raw: '.container[data-container-query-wide]\n  .link {\n  margin-top: 1rem;\n}',
            selector: '.container[data-container-query-wide]\n  .link',
          },
        ],
      ],
      [
        'header',
        [
          {
            classes: ['header'],
            location: {
              end: { column: 1, line: 24, offset: 444 },
              start: { column: 1, line: 22, offset: 412 },
            },
            raw: '.header {\n  grid-area: header;\n}',
            selector: '.header',
          },
        ],
      ],
      [
        'name',
        [
          {
            classes: ['name'],
            location: {
              end: { column: 1, line: 30, offset: 523 },
              start: { column: 1, line: 26, offset: 446 },
            },
            raw:
              '.name {\n' +
              '  font-size: 1.25rem;\n' +
              '  font-weight: 700;\n' +
              '  margin-bottom: 0.75rem;\n' +
              '}',
            selector: '.name',
          },
        ],
      ],
      [
        'image-container',
        [
          {
            classes: ['image-container'],
            location: {
              end: { column: 1, line: 36, offset: 614 },
              start: { column: 1, line: 32, offset: 525 },
            },
            raw:
              '.image-container {\n' +
              '  grid-area: image-container;\n' +
              '  max-height: 6rem;\n' +
              '  max-width: 8rem;\n' +
              '}',
            selector: '.image-container',
          },
        ],
      ],
      [
        'body',
        [
          {
            classes: ['body'],
            location: {
              end: { column: 1, line: 41, offset: 664 },
              start: { column: 1, line: 38, offset: 616 },
            },
            raw: '.body {\n  grid-area: body;\n  margin-top: 1rem;\n}',
            selector: '.body',
          },
        ],
      ],
      [
        'description',
        [
          {
            classes: ['description'],
            location: {
              end: { column: 1, line: 47, offset: 740 },
              start: { column: 1, line: 43, offset: 666 },
            },
            raw: '.description {\n  font-size: 0.875rem;\n  margin-bottom: 0.375rem;\n}',
            selector: '.description',
          },
        ],
      ],
      [
        'price',
        [
          {
            classes: ['price'],
            location: {
              end: { column: 1, line: 47, offset: 740 },
              start: { column: 1, line: 43, offset: 666 },
            },
            raw: '.price {\n  font-size: 0.875rem;\n  margin-bottom: 0.375rem;\n}',
            selector: '.price',
          },
        ],
      ],
      [
        'actions',
        [
          {
            classes: ['actions'],
            location: {
              end: { column: 1, line: 54, offset: 845 },
              start: { column: 1, line: 49, offset: 742 },
            },
            raw:
              '.actions {\n' +
              '  align-items: center;\n' +
              '  display: flex;\n' +
              '  grid-area: actions;\n' +
              '  justify-content: flex-end;\n' +
              '}',
            selector: '.actions',
          },
        ],
      ],
      [
        'link',
        [
          {
            classes: ['link'],
            location: {
              end: { column: 1, line: 66, offset: 1125 },
              start: { column: 1, line: 56, offset: 847 },
            },
            raw:
              '.link {\n' +
              '  background: transparent;\n' +
              '  border: 0.0625rem solid rgb(247 252 251 / 50%);\n' +
              '  border-radius: 0.15rem;\n' +
              '  color: rgb(247 252 251 / 90%);\n' +
              '  font-family: Raleway, sans-serif;\n' +
              '  font-size: 0.875rem;\n' +
              '  margin-top: 0.5rem;\n' +
              '  padding: 0.25rem 0.5rem;\n' +
              '  text-decoration: none;\n' +
              '}',
            selector: '.link',
          },
          {
            classes: ['link'],
            location: {
              end: { column: 1, line: 75, offset: 1232 },
              start: { column: 1, line: 68, offset: 1127 },
            },
            raw:
              '.link::after {\n' +
              '  content: "";\n' +
              '  height: 100%;\n' +
              '  left: 0;\n' +
              '  position: absolute;\n' +
              '  top: 0;\n' +
              '  width: 100%;\n' +
              '}',
            selector: '.link::after',
          },
          {
            classes: ['link'],
            location: {
              end: { column: 1, line: 79, offset: 1263 },
              start: { column: 1, line: 77, offset: 1234 },
            },
            raw: '.link:focus {\n  outline: 0;\n}',
            selector: '.link:focus',
          },
          {
            classes: ['link'],
            location: {
              end: { column: 1, line: 83, offset: 1315 },
              start: { column: 1, line: 81, offset: 1265 },
            },
            raw: '.link:focus::after {\n  border: 1px solid orange;\n}',
            selector: '.link:focus::after',
          },
        ],
      ],
    ]),
  );
});
