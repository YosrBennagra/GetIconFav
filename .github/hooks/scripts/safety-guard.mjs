/**
 * PreToolUse hook — blocks dangerous git/database commands.
 * Prevents AI agents from violating branching strategy.
 *
 * Blocked operations:
 * - Pushing to main, develop, or release/* branches
 * - Force pushing
 * - Merging/rebasing branches
 * - Dropping database tables/schemas
 * - Deleting remote branches
 *
 * Location: .github_portable/hooks/scripts/safety-guard.mjs
 * Hook event: PreToolUse
 */

/** @typedef {{ pattern: RegExp; reason: string }} BlockRule */

/** @type {BlockRule[]} */
const BLOCKED_COMMAND_PATTERNS = [
    {
        pattern: /git\s+push\s+.*\borigin\b.*\b(main|master|develop)\b/,
        reason:
            'Direct push to main/develop is prohibited. Push to your feature branch only (feat/*, fix/*, etc.).',
    },
    {
        pattern: /git\s+push\s+.*\borigin\b.*\brelease\//,
        reason: 'Direct push to release/* is prohibited. Only the human developer manages release branches.',
    },
    {
        pattern: /git\s+push\s+.*(\s-f\s|\s--force\b|--force-with-lease)/,
        reason: 'Force push is strictly prohibited.',
    },
    {
        pattern: /git\s+push\s+origin\s+HEAD:(main|master|develop)/,
        reason: 'Cannot push HEAD to main/develop. Use a feature branch.',
    },
    {
        pattern: /git\s+merge\b/,
        reason: 'Merging branches is handled by the human developer. AI agents must not run `git merge`.',
    },
    {
        pattern: /git\s+rebase\b/,
        reason: 'Rebasing branches is handled by the human developer. AI agents must not run `git rebase`.',
    },
    {
        pattern: /git\s+push\s+.*--delete\b/,
        reason: 'Deleting remote branches is prohibited. Only the human developer manages remote branches.',
    },
    {
        pattern: /DROP\s+(TABLE|DATABASE|SCHEMA)\b/i,
        reason: 'Dropping database tables/schemas is strictly prohibited.',
    },
    {
        pattern: /rm\s+-rf\s+[/\\]/,
        reason: 'Recursive deletion of root/system paths is prohibited.',
    },
];

/**
 * Extracts the command string from tool input.
 * @param {unknown} toolInput
 * @returns {string}
 */
function extractCommand(toolInput) {
    if (typeof toolInput !== 'object' || toolInput === null) return '';
    const t = /** @type {Record<string, unknown>} */ (toolInput);
    if (typeof t['command'] === 'string') return t['command'];
    if (typeof t['input'] === 'string') return t['input'];
    if (typeof t['cmd'] === 'string') return t['cmd'];
    return '';
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
    const COMMAND_TOOLS = ['runCommand', 'terminal', 'executeCommand', 'bash', 'run_terminal_command'];

    if (!COMMAND_TOOLS.includes(toolName)) {
        const output = {
            hookSpecificOutput: {
                hookEventName: 'PreToolUse',
                permissionDecision: 'allow',
            },
        };
        process.stdout.write(JSON.stringify(output));
        process.exit(0);
    }

    const command = extractCommand(input['tool_input']);

    for (const { pattern, reason } of BLOCKED_COMMAND_PATTERNS) {
        if (pattern.test(command)) {
            const output = {
                hookSpecificOutput: {
                    hookEventName: 'PreToolUse',
                    permissionDecision: 'deny',
                    permissionDecisionReason: `[Safety Guard] Blocked command: "${command.slice(0, 120)}"\nReason: ${reason}`,
                },
            };
            process.stdout.write(JSON.stringify(output));
            process.exit(0);
        }
    }

    const output = {
        hookSpecificOutput: {
            hookEventName: 'PreToolUse',
            permissionDecision: 'allow',
        },
    };
    process.stdout.write(JSON.stringify(output));
    process.exit(0);
}

main().catch(() => process.exit(1));
