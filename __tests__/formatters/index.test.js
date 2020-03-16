import render from '../../src/formatters/';
import { deep, strPlain, strTree } from '../../__fixtures__/expected';

test('test plain render', () => {
  expect(render(deep, 'plain')).toEqual(strPlain)
});
test('test tree render', () => {
  expect(render(deep)).toEqual(strTree)
})
