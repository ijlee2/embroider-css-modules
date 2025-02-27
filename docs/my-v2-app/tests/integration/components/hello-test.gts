import { render } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import Hello from 'my-v2-app/components/hello';
import styles from 'my-v2-app/components/hello.module.css';
import { setupRenderingTest } from 'my-v2-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | hello', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template><Hello /></template>);

    assert
      .dom('[data-test-hello]')
      .hasClass(styles.emphasize)
      .hasClass(styles.message)
      .hasStyle({
        fontSize: '128px',
      })
      .hasText('Hello Vite!');

    await a11yAudit();
  });
});
