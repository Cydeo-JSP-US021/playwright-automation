---
name: playwright-locator
description: Analyze pasted HTML and choose the most reliable, user-facing Playwright locator for the intended element.
---

# Playwright locator selection

Given HTML and, if provided, a target description, produce one concise Playwright locator for the intended element. Choose a locator from the element's user-facing semantics and the evidence in the markup. Do not return a menu of alternatives or default to a particular locator just because an older prompt template requests it.

## 1. Establish the target

- Use the user's description or selection to identify the target. If neither identifies one and multiple elements are plausible, ask which element they mean.
- Determine the element's HTML semantics, implicit or explicit ARIA role, accessible name, associated label, stable visible text, and relevant attributes.
- Do not infer runtime facts that a snippet cannot establish, such as whether an element is visible, whether its name is overridden elsewhere, whether it is unique on the whole page, or whether the application configures a custom test-id attribute.
- If the target is clear but necessary context is missing, ask for the smallest relevant parent or page context instead of inventing selector details.

## 2. Select the most appropriate locator

Prefer a locator that expresses the way the target is identified, rather than one that merely matches an available attribute:

- **`getByRole(role, { name })`** for controls, links, headings, and other elements with a useful implicit or explicit role and accessible name. This is the preferred general-purpose choice, especially for interactive elements. Include the accessible name when known; use `{ exact: true }` when partial matching could match other elements.
- **`getByLabel(text)`** for a form control identified by its associated `<label>`, `aria-label`, or `aria-labelledby`. This is the idiomatic choice for labeled form fields. Do not mistake nearby text for an associated label.
- **`getByText(text)`** for stable visible text, particularly non-interactive content such as paragraphs or generic containers. For interactive elements, prefer role and accessible name. Use `{ exact: true }` when necessary to avoid substring matches; Playwright normalizes whitespace in text matching.
- **`getByPlaceholder(text)`** for a form control with a useful placeholder only when there is no suitable label. A placeholder is a hint, not a replacement for a label.
- **`getByAltText(text)`** for an image or other element whose alternative text identifies it.
- **`getByTitle(text)`** when a stable `title` attribute is the intended way to identify the element and no better user-facing locator applies.
- **`getByTestId(value)`** for an existing test ID when the team intentionally uses it as a testing contract, the user requests it, or user-facing locators do not identify the target reliably. Test IDs are resilient but not user-facing. Do not invent one. Playwright defaults to `data-testid`; use a custom test-id attribute only when the user or repository context confirms it is configured.
- **CSS via `locator('css=...')`** only when built-in semantic locators are unsuitable. Prefer short selectors anchored to stable IDs or attributes; use classes only when they are known to be stable and meaningful.
- **XPath via `locator('xpath=...')`** as a last resort when CSS and built-in locators cannot express the relationship reliably. Keep it relative and short.

There is no rigid attribute checklist: choose the best fit for the target. For example, use a button's role and accessible name rather than its test ID when user-facing semantics matter; use `getByLabel()` for a labeled form field rather than its placeholder; and use a test ID when it is the team's explicit stable contract and semantics are insufficient.

## 3. Ensure the locator is robust

- Account for accessible-name computation: `aria-labelledby` and `aria-label` can determine a name, and a label or descendant text can contribute to it. Do not use raw inner text as the accessible name without checking the markup's semantics.
- Make the locator specific enough to satisfy Playwright's strictness for actions: it should resolve to exactly one intended element at runtime. A pasted fragment cannot prove uniqueness in the full rendered page; do not claim that it does.
- When repeated controls are distinguished by a meaningful container, scope to that container using locator chaining or `filter()`, then locate the child by its role/name or other appropriate strategy. Keep filters relative to the container.
- Never add `.first()`, `.last()`, or `.nth()` just to silence ambiguity. Use positional selection only when the user explicitly identifies an intentional position and the order is part of the requirement.
- Do not use unstable generated classes, styling-only classes, DOM-depth or sibling-index chains, absolute XPath, or structural selectors that break when unrelated markup changes.
- Keep the locator as short as possible without sacrificing specificity. Use syntactically valid Playwright APIs and correctly escaped string literals in the user's language; default to TypeScript/JavaScript syntax if no language is given.
- For an iframe target, note that the locator must start from the correct `frameLocator()`; do not imply a page-level locator crosses iframe boundaries. Playwright locators pierce open shadow DOM by default, but XPath does not; closed shadow roots are not supported.

## 4. Respond

If the target and locator are clear, return only the locator in a fenced code block, with the `page.` prefix unless the user supplied a different context:

```ts
page.getByRole('button', { name: 'Save', exact: true })
```

If a clarification is needed, ask one concise question instead of guessing. If no reliable locator can be derived, briefly identify the missing HTML or context. Do not promise that a locator was runtime-verified unless it was actually tested against the rendered page.
