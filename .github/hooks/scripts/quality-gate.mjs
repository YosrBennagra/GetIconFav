/**
 * PostToolUse hook — injects a reminder after file edits to verify quality gates.
 * Reminds the agent to run lint and build before pushing.
 *
 * This hook fires after every file edit and adds a non-blocking reminder as
 * additional context. It does not run lint automatically (too slow per-edit),
 * but ensures the agent does not forget.
 *
 * Location: .github_portable/hooks/scripts/quality-gate.mjs
 * Hook event: PostToolUse
 */

/** Tools that modify source files */
const FILE_EDIT_TOOLS = ['editFiles', 'createFile', 'writeFile', 'create_file', 'str_replace_editor'];

/**
 * Extracts edited file paths from tool input.
 * @param {unknown} toolInput
 * @returns {string[]}
 */
function extractFiles(toolInput) {
    if (typeof toolInput !== 'object' || toolInput === null) return [];
    const t = /** @type {Record<string, unknown>} */ (toolInput);

    if (Array.isArray(t['files'])) {
        return t['files'].filter((f) => typeof f === 'string');
    }
    if (typeof t['filePath'] === 'string') return [t['filePath']];
    if (typeof t['path'] === 'string') return [t['path']];
    return [];
}

/**
 * Returns true if any of the edited files are source files.
 * @param {string[]} files
 * @returns {boolean}
 */
function hasSourceFiles(files) {
    return files.some((f) =>
        /\.(ts|tsx|js|jsx|mjs|cjs|py|rb|go|rs|java|kt|swift|prisma|json|yaml|yml|toml)$/.test(f)
        && !f.includes('node_modules')
        && !f.includes('__pycache__'),
    );
}

async function main() {
    /** @type {Buffer[]} */
    const chunks = [];

    await new Promise((resolve) => {
        process.stdin.on('data', (/** @type {Buffer} */ chunk) => chunks.push(chunk));
        process.stdin.on('end', resolve);
    });

    const inputStr = Buffer.concat(chunks).toString('utf-8');

    /** @type {Record<string, unknown>} */
    let input;
    try {
        input = JSON.parse(inputStr);
    } catch {
        process.exit(1);
    }

    const toolName = typeof input['tool_name'] === 'string' ? input['tool_name'] : '';

    if (!FILE_EDIT_TOOLS.includes(toolName)) {
        process.exit(0);
    }

    const files = extractFiles(input['tool_input']);
    const isSourceChange = hasSourceFiles(files);

    if (!isSourceChange) {
        process.exit(0);
    }

    const reminders = [
        `[Quality Gate] Files edited: ${files.slice(0, 5).join(', ')}${files.length > 5 ? ` (+${files.length - 5} more)` : ''}`,
        'Before pushing, verify:',
        '  1. Run lint/type-check → must return 0 errors',
        '  2. Run build → must succeed with no errors',
        '  3. Commit with conventional commit (feat:, fix:, refactor:, etc.)',
        '  4. Push to current feature branch only — never to main/develop/release/*',
    ];

    const output = {
        hookSpecificOutput: {
            hookEventName: 'PostToolUse',
            additionalContext: reminders.join('\n'),
        },
    };

    process.stdout.write(JSON.stringify(output));
    process.exit(0);
}

main().catch(() => process.exit(1));
