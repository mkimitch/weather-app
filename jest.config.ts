import type { Config } from 'jest'
import { defaults } from 'jest-config'

const config: Config = {
	verbose: true,
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	moduleNameMapper: {
		'\\.(css|scss)$': 'identity-obj-proxy',
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	preset: 'ts-jest',
	roots: ['<rootDir>/src'],
	setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
	testEnvironment: 'jsdom',
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
}

export default config
