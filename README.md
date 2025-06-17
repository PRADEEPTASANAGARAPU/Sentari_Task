Here is a professional and complete `README.md` file for your GitHub repository that showcases your Sentari AI interview task:

---

````markdown
# Sentari AI Interview Task – Actionable Task Extraction

This repository contains my solution for the Sentari AI solo interview challenge. The task focuses on identifying and extracting structured actionable tasks from transcript-style user inputs using rule-based logic.

## 📌 Objective

Design and implement a feature that:
- Detects actionable tasks mentioned in transcripts
- Outputs structured task data, including:
  - `task_text`
  - `due_date`
  - `status`
  - `category` (optional)

Test the feature on a sample of 10–20 mock transcript entries.

---

## 🛠️ Approach

### 1. **Input Signals for Task Detection**
- **Imperative verbs** such as _call, schedule, email, write_
- **Modal + verb constructs** like _"I need to"_, _"I should"_, _"Let's"_
- **Temporal indicators** such as _"tomorrow"_, _"by Monday"_, _"next week"_
- **Sentence structure**: Priority to sentences beginning with action-oriented phrases

### 2. **Processing Pipeline**
- Parse transcripts into sentences
- Use regex and keyword-based heuristics to identify actionable phrases
- Extract due dates using `chrono-node`
- Normalize output into the desired structure

### 3. **Output Format**
```json
{
  "task_text": "Schedule dentist appointment",
  "due_date": "2025-06-20T00:00:00.000Z",
  "status": "not_started",
  "category": "health"
}
````

### 4. **Assumptions**

* Tasks are short and self-contained within one sentence
* Due date references are relative to transcript creation time
* Default task status is `"not_started"`

---

## 🧪 Testing

* Developed and executed tests using [Vitest](https://vitest.dev/)
* 15 test cases implemented across two test files:

  * `extractTasks.test.ts`: Validates logic on mock entries and edge cases
  * `sampleFunction.test.ts`: Generic examples for basic logic validation

Run tests using:

```bash
pnpm install
pnpm test
```

---

## 🗃️ Project Structure

```
sentari-ai-task/
├── src/
│   └── lib/
│       └── extractTasks.ts        # Core logic for task extraction
├── tests/
│   ├── extractTasks.test.ts       # Unit tests for task extraction
│   └── sampleFunction.test.ts     # Supplementary test suite
├── package.json
├── vitest.config.ts
└── README.md                      # This file
```

---

## 📈 Future Work

* Integrate with Supabase to store and retrieve user tasks
* Implement semantic filtering to reduce false positives
* Support user feedback to improve extraction accuracy over time

---

## 🧠 Reflections

This feature can serve as a foundational capability within Sentari to enable:

* Reminders and to-do lists based on journal content
* Automatic summarization of user goals
* Behavioral trend analysis and personal growth tracking

---

## 🔗 Submission

GitHub Repo: [https://github.com/PRADEEPTASANAGARAPU/sentari-ai-task](https://github.com/PRADEEPTASANAGARAPU/sentari-ai-task)

---

## 📧 Contact

**Pradeepta Sanagarapu**
Email: [pradeeptasanagarapu@gmail.com](mailto:pradeeptasanagarapu@gmail.com)
LinkedIn: [linkedin.com/in/pradeepta-sanagarapu](https://linkedin.com/in/pradeepta-sanagarapu)

---
