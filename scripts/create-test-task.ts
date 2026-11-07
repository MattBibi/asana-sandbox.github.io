// npm run try:task: Step 1 checkpoint. Creates one hard-coded task the way
// the app will: right section, Source / Signal type / Priority filled in.
import { asana } from "../src/asana.js";
import { FIELDS, PRIORITIES, SIGNAL_TYPES, SOURCES } from "../src/taxonomy.js";
import { resolveTriageProject } from "../src/triage-project.js";

const triage = await resolveTriageProject();
const f = triage.fields;

const task = await asana.createTask({
  name: "[test] Docs: webhook signature verification example is missing",
  notes: [
    "Created by scripts/create-test-task.ts to check the Asana wiring.",
    "Safe to delete.",
  ].join("\n"),
  project: triage.project,
  section: triage.sections.docs_gap,
  customFields: {
    [f.source.gid]: f.source.options[SOURCES.github]!,
    [f.type.gid]: f.type.options[SIGNAL_TYPES.docs_gap]!,
    [f.priority.gid]: f.priority.options[PRIORITIES.medium]!,
  },
});

console.log(`Created: ${task.name}\n${task.permalink_url}`);
console.log(`Fields: ${FIELDS.source.name}=GitHub, ${FIELDS.type.name}=Docs gap, ${FIELDS.priority.name}=Medium`);
