module.exports = {
  extends: 'airbnb',
  rules: {
    'import/extensions': [2, 'ignorePackages'],
    'no-underscore-dangle': [2, { allowAfterThis: true, allow: ['_id'] }],
    'class-methods-use-this': [0], //imports\api\models\game.js:40
    'prefer-destructuring': [0], ///imports\api\models\game.js:153
    'react/destructuring-assignment': [0], //imports\ui\App.jsx:25
    'react/prop-types': [0], //imports\ui\App.jsx:25
    'react/jsx-no-bind': [0], //imports\ui\App.jsx:38
    'jsx-a11y/click-events-have-key-events': [0], //imports\ui\Room.jsx:31
    'jsx-a11y/no-noninteractive-element-interactions': [0], //imports\ui\Room.jsx:31
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
