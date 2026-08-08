import { describe, expect, it } from 'vitest'

import { LYRICS } from '@/data/lyrics.data.ts'
import { TRACKS } from '@/data/tracks.data.ts'

describe('lyrics data', () => {
	it.each(LYRICS)('contains valid timecodes for $trackId', ({ trackId, lines }) => {
		const track = TRACKS.find(({ id }) => id === trackId)

		expect(track).toBeDefined()
		expect(lines.length).toBeGreaterThan(0)

		if (!track) {
			return
		}

		lines.forEach((line, index) => {
			expect(Number.isFinite(line.time)).toBe(true)
			expect(line.time).toBeGreaterThanOrEqual(0)
			expect(line.time).toBeLessThan(track.duration)

			if (index > 0) {
				expect(line.time).toBeGreaterThan(lines[index - 1].time)
			}
		})
	})
})
