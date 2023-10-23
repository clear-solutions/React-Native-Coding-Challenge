const { defaults, module } = require('jest-config')

module.exports = {
	bail: true,
	moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
	moduleNameMapper: {
		'\\.css$': 'identity-obj-proxy',
	},
	roots: ['src'],
	testMatch: ['<rootDir>/src/**/*.(test|spec).(ts|tsx)'],
	transform: {
		'^.+\\.js$': 'babel-jest',
		'^.+\\.(ts|tsx)$': 'ts-jest',
		'^.+\\.(css|style|less|sass|scss|module)$': 'jest-transform-css',
	},
	verbose: true,
}
