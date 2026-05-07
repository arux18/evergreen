# Синхронизация `tokens/` с Hemlock

**Источник правды по цветам:** `pencil/design-system/in-progress/hemlock-library.lib.pen` (переменные `color-*` с hex).

**Команда обновления примитивов в `colors.css`:** из корня репозитория

`node scripts/sync-tokens-from-hemlock.mjs`

---

## 1. Первая актуализация (состояние на момент запроса)

Когда вы впервые попросили привести папку `tokens/` в соответствие с Hemlock, было сделано следующее.

- **`tokens/colors.css`** — примитивы `--color-*` пересчитаны из hex в Hemlock. В CSS попали в том числе **промежуточные шаги taupe** (например `taupe-150`, `175`, `225`, `350`, `550`), потому что они **тогда присутствовали** в `hemlock-library.lib.pen`.
- **`tokens/typography.ts` и `tokens/typography.css`** — secondary: **Noto Serif** вместо Cormorant Garamond.
- **`scripts/build-hemlock-pencil-variables.mjs`** — значение secondary по умолчанию: **Noto Serif**.
- **`scripts/sync-tokens-from-hemlock.mjs`** — первый вариант скрипта **объединял** старые строки в `colors.css` с данными из Hemlock, поэтому лишние taupe **могли остаться в CSS** даже после удаления их из `.pen`.

---

## 2. Текущая актуализация (после вашей чистки Hemlock)

Вы убрали из `hemlock-library.lib.pen` лишние токены (в т.ч. несуществующую шкалу вроде taupe-125 и др.). В pen по taupe остались только **`color-taupe-100` … `color-taupe-900`** (80 цветовых примитивов с hex в переменных).

Сделано сейчас:

- **`scripts/sync-tokens-from-hemlock.mjs`** — логика обновлена: в `colors.css` попадают **только** примитивы из Hemlock **плюс** фиксированный список «наследие из CSS», которых нет в pen, но на них всё ещё ссылается **`tokens/colors.ts`**: **clay** и **violet**.
- **`tokens/colors.css`** — пересобран из Hemlock; удалены примитивы, которых больше нет в pen.

### Удалённые из `colors.css` при этом проходе

| Причина | Примитивы |
|--------|-----------|
| Удалены из Hemlock (промежуточные taupe, ранее попавшие в CSS из старого merge) | `--color-taupe-150`, `--color-taupe-175`, `--color-taupe-225`, `--color-taupe-350`, `--color-taupe-550` |

### Сохранены намеренно (нет в Hemlock, есть в `colors.ts`)

- `--color-clay-200`, `--color-clay-400`, `--color-clay-600`
- `--color-violet-50`, `--color-violet-500`

### Проверено, без правок в этом проходе

- **`spacing.ts`** — совпадает с числовыми переменными `spacing-*` в Hemlock.
- **Типографика** — `font-family-primary` / `font-family-secondary` в Hemlock: Heebo / Noto Serif; desktop-шкалы в `typography.ts` совпадают с переменными `typo-*` в pen.

---

## Итог по файлам (текущий проход)

| Файл | Действие |
|------|----------|
| `tokens/colors.css` | Пересобран из Hemlock + clay/violet |
| `scripts/sync-tokens-from-hemlock.mjs` | Обновлена логика (без «залипания» удалённых примитивов) |
| `tokens/SYNC-LOG.md` | Этот журнал |
