# Sentari AI Interview Task – Actionable Task Extraction

This repository contains my solution for the Sentari AI solo interview challenge. The task focuses on identifying and extracting structured actionable tasks from transcript-style user inputs using rule-based logic.

## Objective

Design and implement a feature that:
- Detects actionable tasks mentioned in transcripts
- Outputs structured task data, including:
  - `task_text`
  - `due_date`
  - `status`
  - `category` (optional)

Test the feature on a sample of 10–20 mock transcript entries.

---

## Approach

### 1. Input Signals for Task Detection
- **Imperative verbs** such as _call, schedule, email, write_
- **Modal + verb constructs** like _"I need to"_, _"I should"_, _"Let's"_
- **Temporal indicators** such as _"tomorrow"_, _"by Monday"_, _"next week"_
- **Sentence structure**: Priority to sentences beginning with action-oriented phrases

### 2. Processing Pipeline
- Parse transcripts into sentences
- Use regex and keyword-based heuristics to identify actionable phrases
- Extract due dates using `chrono-node`
- Normalize output into the desired structure

### 3. Output Format

```json
{
  "task_text": "Schedule dentist appointment",
  "due_date": "2025-06-20T00:00:00.000Z",
  "status": "not_started",
  "category": "health"
}
