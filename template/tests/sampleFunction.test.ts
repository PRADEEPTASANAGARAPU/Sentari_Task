import { describe, it, expect } from 'vitest'
import { mockVoiceEntries } from '../src/lib/mockData'
import processEntries from '../src/lib/sampleFunction'

describe('processEntries', () => {
  it('counts user tags correctly', () => {
    const result = processEntries(mockVoiceEntries)
    // If mockVoiceEntries all have tag "reflection" in tags_user, this should equal length
    if (mockVoiceEntries.length > 0 && mockVoiceEntries[0].tags_user) {
      expect(result.tagFrequencies.reflection).toBeDefined()
      expect(result.tagFrequencies.reflection).toBe(mockVoiceEntries.length)
    }
  })

  it('calculates average emotion score', () => {
    const result = processEntries(mockVoiceEntries)
    // Check average is between 0 and 1
    expect(result.averageEmotionScore).toBeGreaterThanOrEqual(0)
    expect(result.averageEmotionScore).toBeLessThanOrEqual(1)
  })

  it('calculates average words per entry', () => {
    const result = processEntries(mockVoiceEntries)
    expect(result.averageWordsPerEntry).toBeGreaterThan(0)
  })

  it('returns valid earliest and latest entry ISO dates', () => {
    const result = processEntries(mockVoiceEntries)
    expect(new Date(result.earliestEntry).toString()).not.toBe('Invalid Date')
    expect(new Date(result.latestEntry).toString()).not.toBe('Invalid Date')
  })

  it('returns correct summary text', () => {
    const result = processEntries(mockVoiceEntries)
    expect(result.summary).toContain(`${mockVoiceEntries.length} entries`)
  })

  it('handles empty entries gracefully', () => {
    const result = processEntries([])
    expect(result.tagFrequencies).toEqual({})
    expect(result.averageEmotionScore).toBe(0)
    expect(result.averageWordsPerEntry).toBe(0)
    expect(result.earliestEntry).toBeNull()
    expect(result.latestEntry).toBeNull()
  })
})
