interface TranscriptEntry {
  id: string;
  content?: string;
  speaker?: string;
}

interface Task {
  task_text: string;
  due_date: string | null;
  status: string;
  entry_id: string;
}

export function extractActionableTasks(entries: TranscriptEntry[]): Task[] {
  const actionVerbs = [
    'follow up', 'send', 'check', 'remind', 'create', 'complete', 'finish',
    'email', 'call', 'schedule', 'review', 'update', 'submit', 'share', 'plan',
    'meet', 'organize', 'discuss', 'finalize'
  ];

  const tasks: Task[] = [];

  for (const entry of entries) {
    // Skip if entry or content is invalid
    if (!entry || typeof entry.content !== 'string') continue;

    const sentences = entry.content.split(/[.?!]\s+/);

    for (const sentence of sentences) {
      const lowerSentence = sentence.toLowerCase();

      for (const verb of actionVerbs) {
        if (lowerSentence.includes(verb)) {
          tasks.push({
            task_text: sentence.trim(),
            due_date: null,
            status: 'pending',
            entry_id: entry.id
          });
          break; // Avoid adding the same sentence multiple times if multiple verbs match
        }
      }
    }
  }

  return tasks;
}
