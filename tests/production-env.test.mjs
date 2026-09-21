import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

const script = fileURLToPath(
  new URL("../scripts/check-production-env.mjs", import.meta.url),
);
function check(url, token) {
  return spawnSync(process.execPath, [script], {
    env: { ...process.env, STRAPI_URL: url, STRAPI_API_TOKEN: token },
    encoding: "utf8",
  });
}

test("unset GitHub secrets stop production deployment instead of exporting an empty blog", () => {
  const result = check("https://cms.example.com", "");
  assert.equal(result.status, 1);
  assert.match(result.stderr, /STRAPI_API_TOKEN/);
  assert.match(result.stderr, /repository Actions secret/);
});

test("empty or whitespace production settings cannot pass validation", () => {
  const result = check(" ", " ");
  assert.equal(result.status, 1);
  assert.match(result.stderr, /STRAPI_URL, STRAPI_API_TOKEN/);
});

test("valid build settings pass without logging their values", () => {
  const token = "private-test-token-must-not-be-logged";
  const result = check("https://cms.example.com", token);
  assert.equal(result.status, 0);
  assert.ok(!result.stdout.includes(token));
  assert.ok(!result.stderr.includes(token));
});
