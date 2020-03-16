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

const strPlain = `Property 'common.setting2' was deleted
Property 'common.setting3' was changed from 'true' to '[complex value]'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'common.follow' was added with value: 'false'
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: '[complex value]'
Property 'group1.baz' was changed from 'bas' to 'bars'
Property 'group1.nest' was changed from '[complex value]' to 'str'
Property 'group2' was deleted
Property 'group3' was added with value: '[complex value]'`;

const strTree = `{
  common: {
      setting1: Value 1
    - setting2: 200
    - setting3: true
    + setting3: {
          key: value
      }
      setting6: {
          key: value
        + ops: vops
}
    + follow: false
    + setting4: blah blah
    + setting5: {
          key5: value5
      }
}
  group1: {
    - baz: bas
    + baz: bars
      foo: bar
    - nest: {
          key: value
      }
    + nest: str
}
- group2: {
      abc: 12345
  }
+ group3: {
      fee: 100500
  }
}`;

export {
  withoutDeep, deep, strPlain, strTree,
};
