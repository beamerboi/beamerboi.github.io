// Check injected CI settings before Next.js loads any local env files.
const missing = ["STRAPI_URL", "STRAPI_API_TOKEN"].filter(
  (name) => !process.env[name]?.trim(),
);

if (missing.length) {
  console.error(
    `Missing production blog settings: ${missing.join(", ")}. ` +
      "Set STRAPI_API_TOKEN as a repository Actions secret. " +
      "The build stopped to avoid deploying an empty blog. Do not commit tokens in env files.",
  );
  process.exitCode = 1;
} else {
  console.log("Production blog settings are present.");
}
