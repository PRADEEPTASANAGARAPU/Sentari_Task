import { VoiceEntry, ProcessedResult } from './types'

/**
 * processEntries
 * --------------
 * Processes an array of VoiceEntry objects and returns aggregated analytics.
 * 
 * @param entries - Array of VoiceEntry objects
 * @returns ProcessedResult containing:
 *   - summary: textual summary of analysis
 *   - tagFrequencies: frequency map of user tags
 *   - averageEmotionScore: average emotion_score_score across entries
 *   - averageWordsPerEntry: average word count in transcript_user
 *   - earliestEntry: ISO string of earliest created_at date
 *   - latestEntry: ISO string of latest created_at date
 */

export function processEntries(entries: VoiceEntry[]): ProcessedResult {
  const tagFrequencies: Record<string, number> = {}
  let totalEmotionScore = 0
  let totalWords = 0
  let earliestDate: Date | null = null
  let latestDate: Date | null = null

  for (const entry of entries) {
    // Count tags
    for (const tag of entry.tags_user || []) {
      tagFrequencies[tag] = (tagFrequencies[tag] || 0) + 1
    }

    // Sum emotion scores
    if (typeof entry.emotion_score_score === 'number' && !isNaN(entry.emotion_score_score)) {
	totalEmotionScore += entry.emotion_score_score
    } else {
  	totalEmotionScore += 0 // or handle differently if required
    }
    
    // Count words in user transcript
    if (entry.transcript_user) {
      totalWords += entry.transcript_user.trim().split(/\s+/).length
    }

    // Safely handle created_at
    const createdDate = new Date(entry.created_at)
    if (!isNaN(createdDate.getTime())) {
      if (!earliestDate || createdDate < earliestDate) earliestDate = createdDate
      if (!latestDate || createdDate > latestDate) latestDate = createdDate
    }
  }

  const count = entries.length
  const averageEmotionScore = count ? totalEmotionScore / count : 0
  const averageWordsPerEntry = count ? totalWords / count : 0

  return {
    summary: `Analysed ${count} entries with ${Object.keys(tagFrequencies).length} unique tags.`,
    tagFrequencies,
    averageEmotionScore,
    averageWordsPerEntry,
    earliestEntry: earliestDate ? earliestDate.toISOString() : null,
    latestEntry: latestDate ? latestDate.toISOString() : null,
  }
}


export default processEntries
