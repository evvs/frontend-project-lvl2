const withoutDeep = [
  { action: 'unchanged', name: 'host', value: 'hexlet.io' },
  {
    action: 'changed', name: 'timeout', oldValue: 50, newValue: 20,
  },
  { action: 'deleted', name: 'proxy', value: '123.234.53.22' },
  { action: 'deleted', name: 'follow', value: false },
  { action: 'added', name: 'verbose', value: true },
];

const deep = [{
  action: 'unchanged',
  name: 'common',
  children: [{
    action: 'unchanged',
    name: 'setting1',
    value: 'Value 1',
  }, {
    action: 'deleted',
    name: 'setting2',
    value: 200,
  }, {
    action: 'changed',
    name: 'setting3',
    oldValue: true,
    newValue: {
      key: 'value',
    },
  }, {
    action: 'unchanged',
    name: 'setting6',
    children: [{
      action: 'unchanged',
      name: 'key',
      value: 'value',
    }, {
      action: 'added',
      name: 'ops',
      value: 'vops',
    }],
  }, {
    action: 'added',
    name: 'follow',
    value: false,
  }, {
    action: 'added',
    name: 'setting4',
    value: 'blah blah',
  }, {
    action: 'added',
    name: 'setting5',
    value: {
      key5: 'value5',
    },
  }],
}, {
  action: 'unchanged',
  name: 'group1',
  children: [{
    action: 'changed',
    name: 'baz',
    oldValue: 'bas',
    newValue: 'bars',
  }, {
    action: 'unchanged',
    name: 'foo',
    value: 'bar',
  }, {
    action: 'changed',
    name: 'nest',
    oldValue: {
      key: 'value',
    },
    newValue: 'str',
  }],
}, {
  action: 'deleted',
  name: 'group2',
  value: {
    abc: 12345,
  },
}, {
  action: 'added',
  name: 'group3',
  value: {
    fee: 100500,
  },
}];

export { withoutDeep, deep };
