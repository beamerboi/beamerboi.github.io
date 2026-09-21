# Portfolio blog with Strapi

The blog lives in this Next.js project at `/blog/` and `/blog/<slug>/`. Your existing Strapi v5 instance at `https://strapi.northlinestudio.io` supplies the articles. No second Strapi installation or separate blog frontend is needed.

The portfolio currently deploys as a static site to GitHub Pages. Strapi is read **during the build**, using a private Content API token. Visitors receive HTML, assets, and published article content; they never receive the token. Strapi media URLs must be publicly readable. Browser CORS settings are not needed for these server-side API requests.

## 1. Create the Article collection in your existing Strapi

In **Content-Type Builder**, create a collection called **Article**, with singular API ID `article`, plural API ID `articles`, and **Draft & Publish enabled**. Use these exact field names (case-sensitive):

| Field            | Strapi type        | Settings                                                              |
| ---------------- | ------------------ | --------------------------------------------------------------------- |
| `title`          | Text (short)       | Required                                                              |
| `slug`           | UID                | Attached to title; required; use lowercase words separated by hyphens |
| `excerpt`        | Text (long)        | Required; maximum 320 characters                                      |
| `content`        | Rich text (Blocks) | Required; use **Blocks**, not Markdown or a Dynamic Zone              |
| `cover`          | Media              | Single image; optional                                                |
| `category`       | Text (short)       | Default `Engineering`; optional                                       |
| `author`         | Text (short)       | Default `Ghassen Jemiai`; optional                                    |
| `featured`       | Boolean            | Default false                                                         |
| `seoTitle`       | Text (short)       | Optional; maximum 70 characters                                       |
| `seoDescription` | Text (long)        | Optional; maximum 170 characters                                      |

`publishedAt` and `updatedAt` are managed by Strapi. Category and author are plain text fields, not relations. With no featured article, the newest article is highlighted. Add alternative text to images in the Media Library. English is the initial blog language; the portfolio language switch does not translate articles.

### If Content-Type Builder is disabled on Coolify

Strapi only permits schema editing in development mode. A full-access **Content API token cannot create content types**. Production hosting does not change this limitation.

Create the collection in a development copy of your existing Strapi application, then deploy its generated `src/api/article/` files through the usual Coolify deployment. Use the same Strapi version as your deployed instance. Keep the generated schema in persistent source control; editing files only inside a running container will be lost when it is replaced.

The exact schema is provided in [strapi-article-schema.json](./strapi-article-schema.json). In the Strapi application it belongs at `src/api/article/content-types/article/schema.json`. If creating files manually instead of using Content-Type Builder, also add the three core API files below (TypeScript projects):

```ts
// src/api/article/controllers/article.ts
import { factories } from "@strapi/strapi";
export default factories.createCoreController("api::article.article");
```

```ts
// src/api/article/routes/article.ts
import { factories } from "@strapi/strapi";
export default factories.createCoreRouter("api::article.article");
```

```ts
// src/api/article/services/article.ts
import { factories } from "@strapi/strapi";
export default factories.createCoreService("api::article.article");
```

For JavaScript Strapi projects use `.js`, `const { factories } = require('@strapi/strapi');`, and `module.exports = factories.createCore…(...)` in each file. These files belong in **your existing Strapi application**, not this Next.js application. The portfolio's Next.js build cannot create a schema in a remote CMS.

## 2. Create a scoped API token and publish an article

In **Settings → API Tokens**, create a **Custom** token with only **Article → find** enabled. Article detail pages use the collection endpoint and do not require `findOne`. Keep Public role permissions disabled. A Read-only token also works but can read more content types than this blog needs. Revoke the full-access token previously shared in chat; the frontend does not need it.

In **Content Manager → Article**, create an article and **Publish** it. Saving a draft alone does not publish it. The frontend uses `status=published` and makes an additional publication check before exporting any article.

## 3. Configure this portfolio locally

Copy `.env.example` to `.env.local` and fill in:

```dotenv
STRAPI_URL=https://strapi.northlinestudio.io
STRAPI_API_TOKEN=your-new-scoped-content-api-token
STRAPI_API_VERSION=5
STRAPI_ARTICLES_PATH=/api/articles
```

The URL must not end in `/admin` or `/api`. `.env.local` is ignored by Git. Never prefix the token with `NEXT_PUBLIC_`. Only set `STRAPI_LOCALE` if you enable Strapi internationalization on Article; it selects a single content locale for this blog. `SITE_URL` is optional and should include the final public portfolio URL and any GitHub project subpath.

Run `npm run dev` and open `/blog/`. Run `npm run build` to produce the static site in `out/`. Without `STRAPI_URL`, the blog displays an empty state. Once configured, API, schema, authentication, or network failures deliberately fail the build so an outage cannot silently replace your published articles with an empty blog.

The client also understands Strapi v4 response envelopes when `STRAPI_API_VERSION=4`, provided the collection uses the same Blocks-based schema.

## 4. Configure the existing GitHub Pages deployment

In the portfolio repository's **Settings → Secrets and variables → Actions**, add:

| Kind                | Name                   | Value                                                    |
| ------------------- | ---------------------- | -------------------------------------------------------- |
| Repository variable | `STRAPI_URL`           | `https://strapi.northlinestudio.io`                      |
| Repository secret   | `STRAPI_API_TOKEN`     | The new scoped Content API token                         |
| Repository variable | `STRAPI_API_VERSION`   | `5` (also the default)                                   |
| Optional variable   | `STRAPI_ARTICLES_PATH` | `/api/articles` (the default)                            |
| Optional variable   | `STRAPI_LOCALE`        | A locale configured in Strapi                            |
| Optional variable   | `SITE_URL`             | Your public portfolio URL, including any project subpath |

The deployment workflow already reads these settings. GitHub's build runner must be able to reach Strapi over HTTPS, and image URLs returned by Strapi must be reachable by visitors. If your CMS is private to a network, the builder must be hosted on that network or given access.

After publishing, updating, unpublishing, or deleting content, run **Actions → Deploy Next.js site to Pages → Run workflow**. Only a successful rebuild and deployment updates the static blog, article URLs, and sitemap. Old published pages remain online until that deployment completes, including after an unpublish. Changing an article slug changes its URL and does not create a redirect.

### Optional automatic publishing

The Pages workflow also accepts a GitHub `repository_dispatch` event with the type `strapi-content-updated`. A Strapi webhook cannot be pointed directly at this endpoint: its event body does not match GitHub's required payload.

Use a small webhook relay (for example your own service or an n8n workflow) to validate a private Strapi webhook header, filter for Article events, and call:

```http
POST https://api.github.com/repos/OWNER/REPOSITORY/dispatches
Authorization: Bearer GITHUB_DISPATCH_TOKEN
Accept: application/vnd.github+json
Content-Type: application/json

{"event_type":"strapi-content-updated"}
```

The dispatch token is a **separate GitHub credential**, held only by the relay. A fine-grained token needs Contents write permission on this repository for this endpoint. Subscribe to `entry.publish`, `entry.unpublish`, `entry.delete`, and `entry.update`; include media update/delete if you want image changes to trigger a rebuild. Debounce bursts of events. This relay is not included or deployed; manual workflow runs work without it.

## Validation

Run `npm run lint`, `npm run test:blog`, and `npm run build`. The automated integration check uses a local mock Strapi API to verify published articles, pagination, article metadata, rich text, project subpaths, and the exported site. Fixture pages go to the ignored `.blog-test-output/` directory, separate from the deployable `out/` directory. It does not create content in your hosted CMS.

References: [Strapi REST API](https://docs.strapi.io/cms/api/rest), [API tokens](https://docs.strapi.io/cms/features/api-tokens), [Content-Type Builder](https://docs.strapi.io/cms/features/content-type-builder), [webhooks](https://docs.strapi.io/cms/backend-customization/webhooks), [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports), [GitHub repository dispatch](https://docs.github.com/en/rest/repos/repos#create-a-repository-dispatch-event).
