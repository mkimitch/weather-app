import fs from 'fs'
import path from 'path'

describe('development Webpack configuration', () => {
	it('contains the expected configuration without hidden executable payloads', () => {
		const configPath = path.resolve(__dirname, '../../webpack.dev.js')
		const configSource = fs.readFileSync(configPath, 'utf8')

		expect(configSource).toContain("devtool: 'eval-source-map'")
		expect(configSource).toContain("publicPath: '/'")
		expect(configSource).not.toMatch(
			/[\uFE00-\uFE0F\u{E0100}-\u{E01EF}]/u
		)
		expect(configSource).not.toMatch(/\beval\s*\(/)
	})
})
