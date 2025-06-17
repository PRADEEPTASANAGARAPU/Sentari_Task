import { describe, it, expect } from 'vitest';
import { extractActionableTasks } from '../src/lib/extractTasks'

interface TranscriptEntry {
  id: string;
  content: string;
  speaker?: string;
}

function createMockEntry(id: string, content: string): TranscriptEntry {
  return { id, content };
}

describe('extractActionableTasks', () => {
  it('returns an empty array for empty input', () => {
    const result = extractActionableTasks([]);
    expect(result).toEqual([]);
  });

  it('returns an empty array if no actionable tasks', () => {
    const result = extractActionableTasks([
      createMockEntry('1', 'Just chatting about lunch.')
    ]);
    expect(result).toEqual([]);
  });

  it('detects a single actionable task', () => {
    const result = extractActionableTasks([
      createMockEntry('2', 'Please send the invoice.')
    ]);
    expect(result.length).toBe(1);
    expect(result[0].task_text.toLowerCase()).toContain('send the invoice');
  });

  it('is case-insensitive to verbs', () => {
    const result = extractActionableTasks([
      createMockEntry('3', 'Email the report.')
    ]);
    expect(result.length).toBe(1);
  });

  it('ignores entries with undefined content', () => {
    const result = extractActionableTasks([
      { id: '4' } as TranscriptEntry
    ]);
    expect(result).toEqual([]);
  });

  it('handles multiple entries with tasks', () => {
    const result = extractActionableTasks([
      createMockEntry('5', 'Send the slides.'),
      createMockEntry('6', 'Schedule the next meeting.')
    ]);
    expect(result.length).toBe(2);
  });

  it('ignores non-task filler speech', () => {
    const result = extractActionableTasks([
      createMockEntry('7', 'Um, yeah, so I was thinking...')
    ]);
    expect(result).toEqual([]);
  });

  it('returns pending status for all tasks', () => {
    const result = extractActionableTasks([
      createMockEntry('8', 'Complete the document review.')
    ]);
    expect(result[0].status).toBe('pending');
  });

  it('returns null due date for all tasks', () => {
    const result = extractActionableTasks([
      createMockEntry('9', 'Follow up with the client.')
    ]);
    expect(result[0].due_date).toBe(null);
  });
});

