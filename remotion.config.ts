/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";
import path from "node:path";
import { enableTailwind } from "@remotion/tailwind-v4";

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setDefaultPremountInSeconds(2);
// Tailwind v4 y el alias "@/" → src/ (estructura de shadcn/ui: @/components/ui, @/lib/utils).
Config.overrideBundlerConfig((config) =>
  enableTailwind({
    ...config,
    resolve: {
      ...config.resolve,
      alias: { ...(config.resolve?.alias as Record<string, string> | undefined), "@": path.join(process.cwd(), "src") },
    },
  }),
);
