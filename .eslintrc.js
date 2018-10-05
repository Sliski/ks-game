module.exports = {
  extends: 'airbnb',
  rules: {
    'import/extensions': [2, 'ignorePackages'],
    'no-underscore-dangle': [2, { allowAfterThis: true, allow: ['_id'] }],
    'import/prefer-default-export': [0],
    'no-console': [0], //ignore before release
    'class-methods-use-this': [0],
    'react/prop-types': [0], //temporary disabled
    'react/no-array-index-key': [0], //for board
    'react/destructuring-assignment': [0],
    'react/jsx-no-bind': [0],
    'jsx-a11y/click-events-have-key-events': [0],
    'jsx-a11y/no-noninteractive-element-interactions': [0],
    'jsx-a11y/no-static-element-interactions': [0],
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
