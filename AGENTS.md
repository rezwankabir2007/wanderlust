<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# wanderlust

Next.js 16 (App Router) + React 19 app. All source lives in `src/`; path alias `@/*` → `src/*`.

## Commands

- `npm run dev` — dev server (Turbopack) at localhost:3000
- `npm run lint` — ESLint; the only check script. No test suite exists.
- `npm run build` — full verification: production build + TypeScript check
- `npx tsc --noEmit` — faster standalone typecheck. Framework types like `LayoutProps<"/">` come from generated files under `.next/dev/types/`, so run `next dev` or `next build` once before typechecking a fresh checkout.

## Framework quirks

- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`) — don't hand-write `useMemo`/`useCallback`/`React.memo` for performance.

## UI conventions

- `src/components/ui/` holds 60+ pre-built shadcn "base-nova"-style components built on **Base UI** primitives (`@base-ui/react/*`), not Radix. Check here before writing UI, and add new components via the `shadcn` CLI — imports like `@base-ui/react/button` are correct here, Radix imports are not.
- `cn` is re-exported from the `cn` package in `src/lib/utils.ts` — not clsx + tailwind-merge.
- Tailwind v4 is CSS-first: theme and dark mode (`.dark` class) are configured in `src/app/globals.css` (`@theme inline`, `@custom-variant dark`). There is no `tailwind.config`.

## Layout

- Entrypoints/routes: `src/app/` (`layout.tsx` + `page.tsx`; page is currently a stub). Shiki/syntax-highlighting helpers live in `src/lib/highlighter.tsx` and `src/hooks/`.
- README.md is stock create-next-app boilerplate; its file paths ("app/page.tsx") don't match the actual `src/` layout.

