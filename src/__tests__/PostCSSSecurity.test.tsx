import fs from 'fs'
import os from 'os'
import path from 'path'

import postcss from 'postcss'

describe('PostCSS source map handling', () => {
	const secretMarker = 'CONTROLLED_SECRET_MARKER'
	const sourceMarker = '/controlled/private/source.ts'
	let tempDirectory: string
	let secretMapPath: string

	beforeAll(() => {
		tempDirectory = fs.mkdtempSync(
			path.join(os.tmpdir(), 'weather-postcss-security-')
		)
		secretMapPath = path.join(tempDirectory, 'secret.map')
		fs.writeFileSync(
			secretMapPath,
			JSON.stringify({
				version: 3,
				sources: [sourceMarker],
				sourcesContent: [secretMarker],
				mappings: '',
				names: [],
			})
		)
	})

	afterAll(() => {
		fs.rmSync(tempDirectory, { recursive: true, force: true })
	})

	it('does not disclose absolute or traversing .map files when from is unset', async () => {
		const traversingMapPath = path.relative(process.cwd(), secretMapPath)
		expect(traversingMapPath.split(path.sep)).toContain('..')

		for (const annotation of [secretMapPath, traversingMapPath]) {
			const result = await postcss([]).process(
				`a { color: red }\n/*# sourceMappingURL=${annotation} */`,
				{ from: undefined, map: { inline: false } }
			)
			const generatedMap = JSON.stringify(result.map?.toJSON())

			expect(generatedMap).not.toContain(secretMarker)
			expect(generatedMap).not.toContain(sourceMarker)
		}
	})

	it('continues to process ordinary CSS and generate a source map', async () => {
		const result = await postcss([]).process('a { color: red }', {
			from: undefined,
			map: { inline: false },
		})

		expect(result.css).toContain('a { color: red }')
		expect(result.map?.toJSON()).toMatchObject({ version: 3 })
	})
})
