# Ponytail Rules: Simple, Safe, Readable

## Principles of Simple Development (YAGNI & DRY)
1. **Does this need to exist?** Always challenge the need for new features or abstractions. Eliminate before writing.
2. **Is it already in the codebase?** Search the files thoroughly. Reuse existing functions, modules, and helpers.
3. **Does the standard library do it?** Leverage native runtime helpers first.
4. **Is there a native platform feature?** Use semantic HTML, built-in browser features, or Next.js defaults.
5. **Does an installed package solve this?** Avoid adding new NPM packages unless absolutely necessary.
6. **Can it be written in fewer lines?** Keep code concise, direct, and clear. Avoid nested conditionals, boilerplate, and layers of abstraction.
7. **Write only what works.** Build simple, complete, and robust code.

## Critical Guardrails
*   Never sacrifice security, accessibility, validation, and error safety. Simplicity does not mean negligence.
*   Document shortcuts or temporary simple workarounds using a `// ponytail:` comment to track technical debt.
