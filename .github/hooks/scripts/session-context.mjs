/**
 * SessionStart hook — injects project context into every agent session.
 * Auto-detects the project stack and outputs branch info + critical rules.
 *
 * Location: .github_portable/hooks/scripts/session-context.mjs
 * Hook event: SessionStart
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';

/**
 * @param {string} cmd
 * @returns {string}
 */
function run(cmd) {
    try {
        return execSync(cmd, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
    } catch {
        return 'unknown';
    }
}

/**
 * Detect project stack from common config files.
 * @returns {string[]}
 */
function detectStack() {
    const stack = [];
    const checks = [
        ['package.json', 'Node.js'],
        ['tsconfig.json', 'TypeScript'],
        ['requirements.txt', 'Python'],
        ['pyproject.toml', 'Python'],
        ['Cargo.toml', 'Rust'],
        ['go.mod', 'Go'],
        ['pom.xml', 'Java (Maven)'],
        ['build.gradle', 'Java/Kotlin (Gradle)'],
        ['Gemfile', 'Ruby'],
        ['composer.json', 'PHP'],
        ['Package.swift', 'Swift'],
        ['Dockerfile', 'Docker'],
        ['docker-compose.yml', 'Docker Compose'],
        ['.github/workflows', 'GitHub Actions'],
        ['.gitlab-ci.yml', 'GitLab CI'],
    ];

    for (const [file, tech] of checks) {
        if (existsSync(file)) stack.push(tech);
    }

    // Detect frameworks from package.json
    if (existsSync('package.json')) {
        try {
            const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));
            const deps = { ...pkg.dependencies, ...pkg.devDependencies };
            if (deps['next']) stack.push('Next.js');
            if (deps['react']) stack.push('React');
            if (deps['vue']) stack.push('Vue');
            if (deps['@angular/core']) stack.push('Angular');
            if (deps['svelte'] || deps['@sveltejs/kit']) stack.push('Svelte');
            if (deps['express']) stack.push('Express');
            if (deps['fastify']) stack.push('Fastify');
            if (deps['prisma'] || deps['@prisma/client']) stack.push('Prisma');
            if (deps['tailwindcss']) stack.push('Tailwind CSS');
        } catch { /* ignore parse errors */ }
    }

    return [...new Set(stack)];
}

const branch = run('git rev-parse --abbrev-ref HEAD');
const nodeVersion = run('node --version');
const lastCommit = run('git log -1 --pretty=format:"%h %s"');
const stack = detectStack();

// Find project name
let projectName = 'Project';
if (existsSync('package.json')) {
    try {
        const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));
        if (pkg.name) projectName = pkg.name;
    } catch { /* ignore */ }
}

const output = {
    hookSpecificOutput: {
        hookEventName: 'SessionStart',
        additionalContext: [
            `=== ${projectName} — Session Context ===`,
            `Branch:      ${branch}`,
            `Last commit: ${lastCommit}`,
            `Node:        ${nodeVersion}`,
            stack.length > 0 ? `Stack:       ${stack.join(' · ')}` : '',
            '',
            '=== Critical Rules (Non-Negotiable) ===',
            `1. ONLY push to feature branches — current branch: ${branch}`,
            '   NEVER push to: main, develop, release/*',
            '   NEVER force-push, NEVER merge, NEVER create PRs',
            '2. Read the project conventions file before making changes.',
            '3. Before pushing: lint → build (both must pass, 0 errors).',
            '4. Conventional commits: feat:, fix:, refactor:, docs:, chore:, style:, test:, ci:',
            '==============================================',
        ].filter(Boolean).join('\n'),
    },
};

process.stdout.write(JSON.stringify(output));
process.exit(0);
