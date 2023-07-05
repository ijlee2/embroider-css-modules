import Helper from '@ember/component/helper';
import { assert } from '@ember/debug';

class LocalClassHelper extends Helper {
  compute(positional) {
    const [styles, ...localClassNames] = positional;
    assert('The styles object is undefined.', styles);
    const classNames = localClassNames.reduce((accumulator, localClassName) => {
      if (localClassName === undefined || localClassName === null) {
        return accumulator;
      }
      if (Array.isArray(localClassName)) {
        accumulator.push(...localClassName.map(element => styles[element]));
      } else {
        accumulator.push(styles[localClassName]);
      }
      return accumulator;
    }, []);
    return classNames.filter(Boolean).join(' ');
  }
}

export { LocalClassHelper as default };
//# sourceMappingURL=local-class.js.map
