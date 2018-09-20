module.exports = {
  extends: 'airbnb',
  rules: {
    'import/extensions': [2, 'ignorePackages'],
    'no-underscore-dangle': [2, { allowAfterThis: true, allow: ['_id'] }],
    'class-methods-use-this': [0],
    'react/destructuring-assignment': [0],
    'react/prop-types': [0],
    'react/jsx-no-bind': [0],
  },
  env: {
    browser: true,
    node: true,
    meteor: true,
  },
  settings: {
    'import/core-modules': [
      'meteor/meteor',
      'meteor/tracker',
      'meteor/mongo',
      'meteor/react-meteor-data',
      'meteor/accounts-base',
    ],
  },
};
