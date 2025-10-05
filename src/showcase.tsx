import React, { useMemo, useState } from "react";
import Button from "./components/ui/button.tsx";

// Tiny inline icons
const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-4 h-4"
    {...props}
  >
    <path d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1Z" />
  </svg>
);

const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-4 h-4"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M10.293 3.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 1 1-1.414-1.414L14.586 11H3a1 1 0 1 1 0-2h11.586l-4.293-4.293a1 1 0 0 1 0-1.414Z"
      clipRule="evenodd"
    />
  </svg>
);

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Controls
  const [useTypeFallback, setUseTypeFallback] = useState(false);
  const [type, setType] = useState<
    "default" | "primary" | "dashed" | "text" | "link"
  >("default");
  const [variant, setVariant] = useState<
    "solid" | "outlined" | "dashed" | "filled" | "text" | "link"
  >("solid");
  const [color, setColor] = useState<"blue" | "green" | "red" | "gray">("blue");
  const [size, setSize] = useState<"small" | "middle" | "large">("middle");
  const [shape, setShape] = useState<"default" | "round" | "circle">("default");
  const [ghost, setGhost] = useState(false);
  const [danger, setDanger] = useState(false);
  const [block, setBlock] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [iconStart, setIconStart] = useState(false);
  const [iconEnd, setIconEnd] = useState(false);
  const [asLink, setAsLink] = useState(false);

  const containerClass = useMemo(() => `${theme}`, [theme]);

  const previewProps: any = {
    size,
    shape,
    ghost,
    danger,
    block,
    disabled,
    loading,
    icon: iconStart ? <PlusIcon /> : iconEnd ? <ArrowRightIcon /> : undefined,
    iconPosition: iconEnd ? "end" : "start",
  };

  if (useTypeFallback) {
    previewProps.type = type;
  } else {
    previewProps.variant = variant;
    previewProps.color = color;
  }

  if (asLink) {
    previewProps.variant = "link";
    previewProps.color = color;
    previewProps.href = "#";
  }

  return (
    <div className={containerClass}>
      <div className="min-h-screen p-6 md:p-10 dark:bg-gray-950 dark:text-gray-100">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl font-semibold">Button Playground</h1>
          <div className="inline-flex gap-2">
            <Button
              onClick={() =>
                setTheme((t) => (t === "light" ? "dark" : "light"))
              }
            >
              Toggle {theme === "light" ? "Dark" : "Light"}
            </Button>
            <Button
              variant="outlined"
              color="gray"
              onClick={() => {
                setGhost(false);
                setDanger(false);
                setBlock(false);
                setDisabled(false);
                setLoading(false);
                setSize("middle");
                setShape("default");
                setVariant("solid");
                setColor("blue");
                setType("default");
                setIconStart(false);
                setIconEnd(false);
                setUseTypeFallback(false);
                setAsLink(false);
              }}
            >
              Reset
            </Button>
          </div>
        </header>

        {/* Live preview */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3">Aperçu</h2>
          <div className="w-full max-w-xl">
            <Button {...previewProps}>Bouton de démonstration</Button>
          </div>
        </section>

        {/* Controls panel */}
        <section className="grid lg:grid-cols-3 gap-6 mb-12">
          <div className="space-y-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
            <h3 className="font-medium">Choix de style</h3>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={useTypeFallback}
                onChange={(e) => setUseTypeFallback(e.target.checked)}
              />
              Utiliser `type` (fallback) au lieu de `variant+color`
            </label>

            {useTypeFallback ? (
              <div className="grid grid-cols-2 gap-2">
                <select
                  className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-900"
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                >
                  {(
                    ["default", "primary", "dashed", "text", "link"] as const
                  ).map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <select
                  className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-900"
                  value={variant}
                  onChange={(e) => setVariant(e.target.value as any)}
                >
                  {(
                    [
                      "solid",
                      "outlined",
                      "dashed",
                      "filled",
                      "text",
                      "link",
                    ] as const
                  ).map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
                <select
                  className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-900"
                  value={color}
                  onChange={(e) => setColor(e.target.value as any)}
                >
                  {(["blue", "green", "red", "gray"] as const).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={asLink}
                onChange={(e) => setAsLink(e.target.checked)}
              />
              Forcer rendu <a className="underline">anchor</a>
            </label>
          </div>

          <div className="space-y-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
            <h3 className="font-medium">Mise en page</h3>
            <div className="grid grid-cols-2 gap-2">
              <select
                className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-900"
                value={size}
                onChange={(e) => setSize(e.target.value as any)}
              >
                {(["small", "middle", "large"] as const).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <select
                className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-900"
                value={shape}
                onChange={(e) => setShape(e.target.value as any)}
              >
                {(["default", "round", "circle"] as const).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={block}
                onChange={(e) => setBlock(e.target.checked)}
              />
              Block
            </label>
          </div>

          <div className="space-y-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
            <h3 className="font-medium">États & icônes</h3>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={ghost}
                  onChange={(e) => setGhost(e.target.checked)}
                />
                Ghost
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={danger}
                  onChange={(e) => setDanger(e.target.checked)}
                />
                Danger
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={disabled}
                  onChange={(e) => setDisabled(e.target.checked)}
                />
                Disabled
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={loading}
                  onChange={(e) => setLoading(e.target.checked)}
                />
                Loading
              </label>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!iconStart}
                  onChange={(e) => {
                    setIconStart(e.target.checked);
                    if (e.target.checked) setIconEnd(false);
                  }}
                />
                Icône début
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!iconEnd}
                  onChange={(e) => {
                    setIconEnd(e.target.checked);
                    if (e.target.checked) setIconStart(false);
                  }}
                />
                Icône fin
              </label>
            </div>
          </div>
        </section>

        {/* Presets quick grid */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Presets rapides</h2>
          {(["blue", "green", "red", "gray"] as const).map((c) => (
            <div key={c} className="space-y-2">
              <h3 className="text-sm font-medium opacity-70 capitalize">{c}</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="solid" color={c}>
                  Solid
                </Button>
                <Button variant="outlined" color={c}>
                  Outlined
                </Button>
                <Button variant="dashed" color={c}>
                  Dashed
                </Button>
                <Button variant="filled" color={c}>
                  Filled
                </Button>
                <Button variant="text" color={c}>
                  Text
                </Button>
                <Button variant="link" color={c} href="#">
                  Link
                </Button>
              </div>
            </div>
          ))}
        </section>

        <footer className="mt-16 text-xs opacity-70">
          Built with tailwind-variants. Toggle the theme to preview dark styles.
        </footer>
      </div>
    </div>
  );
}
