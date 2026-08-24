import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Crosshair, i as Eye, n as Settings2, r as RotateCcw } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Ci2Ev6tV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AIM_MODES = [
	"Legit",
	"Rage",
	"Silent"
];
var AIM_TARGETS = [
	"Head",
	"Body",
	"Nearest"
];
var AIM_PRIORITIES = [
	"Distance",
	"Health",
	"Crosshair"
];
var ESP_BOXES = [
	"2D",
	"3D",
	"Corner"
];
var RECOIL_AXES = [
	"Both",
	"Vertical",
	"Horizontal"
];
var DEFAULT_CONFIG = {
	menuKey: "Insert",
	aimbot: {
		enabled: true,
		mode: "Legit",
		fov: 80,
		smooth: 8,
		speed: 6,
		target: "Head",
		priority: "Crosshair",
		visibilityCheck: true,
		teamCheck: true,
		onlyWhileAiming: true,
		onlyWhileShooting: false,
		maxDistance: 250,
		switchDelay: 120
	},
	esp: {
		enabled: true,
		box: true,
		boxStyle: "Corner",
		skeleton: false,
		name: true,
		healthBar: true,
		distance: true,
		snaplines: false,
		teamCheck: true,
		visibilityCheck: false,
		maxDistance: 400
	},
	norecoil: {
		enabled: false,
		strength: 70,
		axis: "Both",
		smooth: 40
	}
};
var useArcxnjo = create()(persist((set) => ({
	config: DEFAULT_CONFIG,
	menuOpen: true,
	tab: "aimbot",
	capturingKey: false,
	setMenuOpen: (menuOpen) => set({ menuOpen }),
	toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),
	setTab: (tab) => set({ tab }),
	setCapturingKey: (capturingKey) => set({ capturingKey }),
	patch: (fn) => set((s) => ({ config: fn(s.config) })),
	reset: () => set({ config: DEFAULT_CONFIG })
}), {
	name: "arcxnjo-config-v1",
	partialize: (s) => ({
		config: s.config,
		tab: s.tab
	}),
	skipHydration: true
}));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function ToggleRow({ label, hint, checked, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex min-h-11 items-center justify-between gap-4 py-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-sm font-medium text-fg",
				children: label
			}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-xs text-muted",
				children: hint
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			role: "switch",
			"aria-checked": checked,
			onClick: () => onChange(!checked),
			className: cn("relative h-6 w-10 shrink-0 rounded-full transition-colors duration-150 ease-out", checked ? "bg-fg" : "bg-surface-2 ring-1 ring-border"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute top-0.5 left-0.5 size-5 rounded-full transition-transform duration-150 ease-out", checked ? "translate-x-4 bg-accent-fg" : "translate-x-0 bg-muted") })
		})]
	});
}
function SliderRow({ label, value, min, max, step = 1, suffix = "", onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-baseline justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium text-fg",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-mono text-xs tabular-nums text-muted",
				children: [value, suffix]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "range",
			min,
			max,
			step,
			value,
			"aria-label": label,
			onChange: (e) => onChange(Number(e.target.value))
		})]
	});
}
function SelectRow({ label, value, options, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-11 items-center justify-between gap-3 py-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-medium text-fg",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			value,
			"aria-label": label,
			onChange: (e) => onChange(e.target.value),
			className: "h-9 max-w-40 rounded-sm border border-border bg-surface-2 px-2.5 font-mono text-xs text-fg outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
			children: options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: opt,
				children: opt
			}, opt))
		})]
	});
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mb-2 font-mono text-xs tracking-widest text-subtle uppercase",
			children: title
		}), children]
	});
}
var TABS = [
	{
		id: "aimbot",
		label: "Aimbot",
		icon: Crosshair
	},
	{
		id: "esp",
		label: "ESP",
		icon: Eye
	},
	{
		id: "norecoil",
		label: "No Recoil",
		icon: RotateCcw
	}
];
function ArcxnjoPanel() {
	const { config, menuOpen, tab, capturingKey, setTab, setCapturingKey, patch, reset } = useArcxnjo();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6", menuOpen ? "panel-enter" : "panel-exit"),
		"aria-hidden": !menuOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto flex w-full max-w-3xl max-h-[min(92dvh,720px)] flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-[0_24px_80px_rgba(0,0,0,0.55)]",
			role: "dialog",
			"aria-label": "Arcxnjo Painel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs tracking-[0.28em] text-muted",
							children: "PAINEL"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "truncate text-xl font-semibold tracking-tight text-fg",
							children: "Arcxnjo"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, {
								on: config.aimbot.enabled,
								label: "AIM"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, {
								on: config.esp.enabled,
								label: "ESP"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, {
								on: config.norecoil.enabled,
								label: "RCL"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-0 flex-1 flex-col md:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex shrink-0 gap-1 overflow-x-auto border-b border-border p-2 md:w-44 md:flex-col md:overflow-x-visible md:border-r md:border-b-0",
						children: TABS.map((t) => {
							const Icon = t.icon;
							const active = tab === t.id;
							const on = t.id === "aimbot" ? config.aimbot.enabled : t.id === "esp" ? config.esp.enabled : config.norecoil.enabled;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setTab(t.id),
								className: cn("flex min-h-11 min-w-28 items-center gap-2 rounded-md px-3 text-left text-sm font-medium transition-colors duration-150", active ? "bg-surface-2 text-fg" : "text-muted hover:bg-surface-2/60 hover:text-fg"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										className: "size-4 shrink-0",
										strokeWidth: 1.75
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1",
										children: t.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("size-1.5 rounded-full", on ? "bg-ok" : "bg-subtle"),
										"aria-hidden": true
									})
								]
							}, t.id);
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5",
						children: [
							tab === "aimbot" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AimbotTab, {}) : null,
							tab === "esp" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EspTab, {}) : null,
							tab === "norecoil" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecoilTab, {}) : null
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "flex flex-wrap items-center justify-between gap-2 border-t border-border px-4 py-2.5 sm:px-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setCapturingKey(true),
						className: "inline-flex min-h-10 items-center gap-2 rounded-sm px-2 font-mono text-xs text-muted hover:text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "size-3.5" }), capturingKey ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: "Pressione uma tecla…"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							config.menuKey,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-subtle",
								children: "abrir / fechar"
							})
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: reset,
						className: "min-h-10 rounded-sm px-3 font-mono text-xs text-muted hover:text-fg",
						children: "Reset"
					})]
				})
			]
		})
	});
}
function StatusChip({ on, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("hidden rounded-sm px-1.5 py-0.5 font-mono text-[10px] tracking-wider sm:inline", on ? "bg-ok/15 text-ok" : "bg-surface-2 text-subtle"),
		children: label
	});
}
function AimbotTab() {
	const a = useArcxnjo((s) => s.config.aimbot);
	const patch = useArcxnjo((s) => s.patch);
	const set = (partial) => patch((c) => ({
		...c,
		aimbot: {
			...c.aimbot,
			...partial
		}
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "Geral",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					label: "Enable",
					checked: a.enabled,
					onChange: (v) => set({ enabled: v })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectRow, {
					label: "Mode",
					value: a.mode,
					options: AIM_MODES,
					onChange: (v) => set({ mode: v })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "Aim",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRow, {
						label: "FOV",
						value: a.fov,
						min: 1,
						max: 180,
						onChange: (v) => set({ fov: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRow, {
						label: "Smooth",
						value: a.smooth,
						min: 1,
						max: 20,
						onChange: (v) => set({ smooth: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRow, {
						label: "Speed",
						value: a.speed,
						min: 1,
						max: 20,
						onChange: (v) => set({ speed: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectRow, {
						label: "Target",
						value: a.target,
						options: AIM_TARGETS,
						onChange: (v) => set({ target: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectRow, {
						label: "Priority",
						value: a.priority,
						options: AIM_PRIORITIES,
						onChange: (v) => set({ priority: v })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "Conditions",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Visibility Check",
						hint: "Só mira em alvos visíveis",
						checked: a.visibilityCheck,
						onChange: (v) => set({ visibilityCheck: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Team Check",
						hint: "Ignora aliados",
						checked: a.teamCheck,
						onChange: (v) => set({ teamCheck: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Only while aiming",
						checked: a.onlyWhileAiming,
						onChange: (v) => set({ onlyWhileAiming: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Only while shooting",
						checked: a.onlyWhileShooting,
						onChange: (v) => set({ onlyWhileShooting: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRow, {
						label: "Max Distance",
						value: a.maxDistance,
						min: 10,
						max: 500,
						suffix: "m",
						onChange: (v) => set({ maxDistance: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRow, {
						label: "Switch Delay",
						value: a.switchDelay,
						min: 0,
						max: 400,
						suffix: "ms",
						onChange: (v) => set({ switchDelay: v })
					})
				]
			})
		]
	});
}
function EspTab() {
	const e = useArcxnjo((s) => s.config.esp);
	const patch = useArcxnjo((s) => s.patch);
	const set = (partial) => patch((c) => ({
		...c,
		esp: {
			...c.esp,
			...partial
		}
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "Geral",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Enable",
						checked: e.enabled,
						onChange: (v) => set({ enabled: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Box",
						checked: e.box,
						onChange: (v) => set({ box: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectRow, {
						label: "Box Style",
						value: e.boxStyle,
						options: ESP_BOXES,
						onChange: (v) => set({ boxStyle: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Skeleton",
						checked: e.skeleton,
						onChange: (v) => set({ skeleton: v })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "Info",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Name",
						checked: e.name,
						onChange: (v) => set({ name: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Health Bar",
						checked: e.healthBar,
						onChange: (v) => set({ healthBar: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Distance",
						checked: e.distance,
						onChange: (v) => set({ distance: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Snaplines",
						checked: e.snaplines,
						onChange: (v) => set({ snaplines: v })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "Filters",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Team Check",
						checked: e.teamCheck,
						onChange: (v) => set({ teamCheck: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Visibility Check",
						hint: "Mostrar só atrás da parede",
						checked: e.visibilityCheck,
						onChange: (v) => set({ visibilityCheck: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRow, {
						label: "Max Distance",
						value: e.maxDistance,
						min: 20,
						max: 800,
						suffix: "m",
						onChange: (v) => set({ maxDistance: v })
					})
				]
			})
		]
	});
}
function RecoilTab() {
	const r = useArcxnjo((s) => s.config.norecoil);
	const patch = useArcxnjo((s) => s.patch);
	const set = (partial) => patch((c) => ({
		...c,
		norecoil: {
			...c.norecoil,
			...partial
		}
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			title: "Geral",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
				label: "Enable",
				checked: r.enabled,
				onChange: (v) => set({ enabled: v })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectRow, {
				label: "Axis",
				value: r.axis,
				options: RECOIL_AXES,
				onChange: (v) => set({ axis: v })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			title: "Compensation",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRow, {
				label: "Strength",
				value: r.strength,
				min: 0,
				max: 100,
				suffix: "%",
				onChange: (v) => set({ strength: v })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRow, {
				label: "Smooth",
				value: r.smooth,
				min: 0,
				max: 100,
				onChange: (v) => set({ smooth: v })
			})]
		})]
	});
}
function HydrateStore() {
	(0, import_react.useEffect)(() => {
		useArcxnjo.persist.rehydrate();
	}, []);
	return null;
}
function normalizeKey(e) {
	if (e.key === "Insert") return "Insert";
	if (e.key === "Escape") return "Escape";
	if (e.key === " ") return "Space";
	if (e.key.length === 1) return e.key.toUpperCase();
	return e.key;
}
function KeybindListener() {
	const { config, capturingKey, toggleMenu, setCapturingKey, patch } = useArcxnjo();
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.repeat) return;
			const target = e.target;
			if (target && (target.tagName === "INPUT" || target.tagName === "SELECT" || target.tagName === "TEXTAREA")) return;
			const name = normalizeKey(e);
			if (capturingKey) {
				e.preventDefault();
				patch((c) => ({
					...c,
					menuKey: name
				}));
				setCapturingKey(false);
				return;
			}
			if (name === config.menuKey) {
				e.preventDefault();
				toggleMenu();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		capturingKey,
		config.menuKey,
		patch,
		setCapturingKey,
		toggleMenu
	]);
	return null;
}
var DUMMIES = [
	{
		id: "a",
		name: "Riven",
		x: 18,
		y: 42,
		w: 11,
		h: 28,
		dist: 42,
		hp: 78,
		team: false,
		visible: true
	},
	{
		id: "b",
		name: "Kade",
		x: 48,
		y: 38,
		w: 9,
		h: 24,
		dist: 91,
		hp: 44,
		team: false,
		visible: false
	},
	{
		id: "c",
		name: "Nyx",
		x: 72,
		y: 46,
		w: 10,
		h: 26,
		dist: 63,
		hp: 96,
		team: true,
		visible: true
	}
];
function RangeStage() {
	const { config, menuOpen, toggleMenu } = useArcxnjo();
	const { aimbot, esp } = config;
	const shown = DUMMIES.filter((d) => {
		if (!esp.enabled) return false;
		if (d.dist > esp.maxDistance) return false;
		if (esp.teamCheck && d.team) return false;
		if (esp.visibilityCheck && d.visible) return false;
		return true;
	});
	const fovScale = Math.min(90, Math.max(8, aimbot.fov * .42));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative z-0 min-h-dvh overflow-hidden bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0",
				style: { background: "radial-gradient(120% 80% at 50% 100%, #141820 0%, #08090b 55%, #050506 100%)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 opacity-40",
				style: {
					backgroundImage: "linear-gradient(color-mix(in oklab, var(--color-fg) 6%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--color-fg) 6%, transparent) 1px, transparent 1px)",
					backgroundSize: "48px 48px",
					maskImage: "linear-gradient(to top, black 10%, transparent 70%)"
				}
			}),
			DUMMIES.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute rounded-sm bg-surface-2",
				style: {
					left: `${d.x}%`,
					top: `${d.y}%`,
					width: `${d.w}%`,
					height: `${d.h}%`,
					opacity: d.visible ? .55 : .22
				}
			}, d.id)),
			aimbot.enabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute top-1/2 left-1/2 rounded-full border border-accent/35",
				style: {
					width: `${fovScale}vmin`,
					height: `${fovScale}vmin`,
					transform: "translate(-50%, -50%)"
				}
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1/2 left-0 h-px w-full bg-fg/80" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-0 left-1/2 h-full w-px bg-fg/80" })]
			}),
			!menuOpen ? shown.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EspOverlay, { dummy: d }, d.id)) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute top-4 left-4 right-4 flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs tracking-[0.22em] text-muted",
					children: "ARCXNJO // RANGE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: toggleMenu,
					className: "pointer-events-auto min-h-11 rounded-sm border border-border bg-surface/80 px-3 font-mono text-xs text-fg backdrop-blur-sm",
					children: menuOpen ? "Fechar" : `${config.menuKey} · Menu`
				})]
			}),
			!menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "absolute bottom-6 left-0 right-0 text-center font-mono text-xs text-muted",
				children: [config.menuKey, " para abrir o painel"]
			}) : null
		]
	});
}
function EspOverlay({ dummy }) {
	const esp = useArcxnjo((s) => s.config.esp);
	const box = dummy;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute",
		style: {
			left: `${box.x}%`,
			top: `${box.y}%`,
			width: `${box.w}%`,
			height: `${box.h}%`
		},
		children: [
			esp.snaplines ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-1/2 top-full h-[40vh] w-px origin-top bg-accent/40",
				style: { transform: "translateX(-50%)" }
			}) : null,
			esp.box ? esp.boxStyle === "Corner" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CornerBox, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute inset-0 border", esp.boxStyle === "3D" ? "border-accent/70 shadow-[inset_0_0_0_1px_rgba(197,204,214,0.15)]" : "border-accent/80") }) : null,
			esp.skeleton ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				className: "absolute inset-[12%] text-accent/70",
				viewBox: "0 0 40 80",
				fill: "none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "20",
					cy: "8",
					r: "5",
					stroke: "currentColor",
					strokeWidth: "1.5"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M20 13 V42 M20 22 L8 34 M20 22 L32 34 M20 42 L10 70 M20 42 L30 70",
					stroke: "currentColor",
					strokeWidth: "1.5"
				})]
			}) : null,
			esp.healthBar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-0 -left-1.5 h-full w-1 overflow-hidden rounded-full bg-surface-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute bottom-0 w-full bg-ok",
					style: { height: `${dummy.hp}%` }
				})
			}) : null,
			(esp.name || esp.distance) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-fg",
				children: [
					esp.name ? dummy.name : null,
					esp.name && esp.distance ? " · " : null,
					esp.distance ? `${dummy.dist}m` : null
				]
			})
		]
	});
}
function CornerBox() {
	const arm = "w-2.5 h-2.5 border-accent";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute top-0 left-0 border-t border-l", arm) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute top-0 right-0 border-t border-r", arm) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute bottom-0 left-0 border-b border-l", arm) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute bottom-0 right-0 border-b border-r", arm) })
	] });
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HydrateStore, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeybindListener, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeStage, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArcxnjoPanel, {})
		]
	});
}
//#endregion
export { Home as component };
