# Resolving Vercel `DEPLOYMENT_NOT_FOUND` (404)

This guide explains the error, root cause, mental model, and how to avoid it.

---

## 1. Suggested fix

**DEPLOYMENT_NOT_FOUND** means: the URL you’re opening points to a deployment that **does not exist** (wrong ID, or it was deleted).

### Immediate steps

| Step | Action |
|------|--------|
| 1 | Open [Vercel Dashboard](https://vercel.com) → your project → **Deployments**. |
| 2 | Check the **latest** deployment. If there is none, trigger a new deploy (push to Git or run `pnpm run deploy:prod`). |
| 3 | Use the URL Vercel shows for that deployment: **Production** domain (e.g. `your-app.vercel.app`) or the deployment’s own URL. Do **not** use an old Preview URL from an email or an old tab. |
| 4 | If you use a **custom domain**: **Settings → Domains** → ensure the domain is assigned and points to the project. After adding/changing a domain, wait for DNS and redeploy if needed. |
| 5 | If the error appears only on the **custom domain**: Redeploy once (**Deployments → ⋮ → Redeploy** on the latest), then open the **Production** URL (e.g. `https://your-custom-domain.com`) again. |

**No code change is required** for this error. It’s about which deployment/URL you’re hitting, not about `vercel.json` or app code.

---

## 2. Root cause

### What was happening vs what was needed?

- **What happened:** A request was sent to a Vercel URL (or a URL that resolves to Vercel) that is tied to a **deployment id** that no longer exists.
- **What was needed:** The request should go to a URL that is tied to a **current, existing** deployment (Production or a valid Preview).

### What conditions trigger this error?

1. **Deleted deployment**  
   You open a Preview URL (e.g. `xxx-abc123-your-team.vercel.app`) after that deployment was removed (e.g. old Preview cleanup).

2. **Wrong or stale URL**  
   Bookmark, link, or cached page pointing to an old deployment URL or a mistyped URL.

3. **Custom domain right after add/change**  
   Domain is attached to the project but the “current” Production deployment was created before the domain was set, or there’s a brief period where no deployment is assigned.

4. **Project / team / deployment ID mismatch**  
   URL contains a deployment id from another project or from a deployment that was deleted.

### What misconception leads to this?

- **Misconception:** “My app code or `vercel.json` is wrong, so I get 404.”
- **Reality:** This 404 is **Vercel’s** response: “I don’t have a deployment for this URL/id.” It is not your app returning 404. So the fix is “use a URL that belongs to an existing deployment” or “create a new deployment and use its URL.”

---

## 3. Underlying concept

### Why does this error exist? What is it protecting?

- Every **deployment** on Vercel has a unique **id** and often a unique **URL** (especially for Previews).
- Vercel only serves traffic for deployments that **exist** in your project. If you ask for a deployment that doesn’t exist (wrong id, or deleted), it returns **DEPLOYMENT_NOT_FOUND** instead of guessing or serving something else.
- That way you never get “random” or “stale” content from an old deployment by mistake.

### Correct mental model

- **Deployment** = one build result (e.g. one Git commit). It has:
  - A **deployment id**
  - Often a **unique URL** (Preview)
  - Or it can be the **Production** deployment (your main domain).
- **Production domain** (e.g. `your-app.vercel.app` or your custom domain) always points to the **current Production deployment**. When you redeploy, that domain automatically serves the new deployment.
- **Preview URLs** are tied to a **single** deployment. If that deployment is removed, that URL is invalid → **DEPLOYMENT_NOT_FOUND**.

So:  
**URL → deployment id → “does this deployment exist?” → yes: serve it; no: DEPLOYMENT_NOT_FOUND.**

### How this fits Vercel’s design

- Vercel separates **builds** (deployments) from **routing** (which domain serves which deployment).
- Production domain is a **pointer** to “current Production deployment.” Preview URLs are **direct** links to one deployment. The error exists so that “invalid pointer” or “deleted deployment” is explicit instead of undefined behavior.

---

## 4. Warning signs and similar issues

### What to look for so it doesn’t happen again

- **Using old Preview links** (e.g. from Slack, email, PR) after some time. Previews can be removed; prefer the **latest** deployment URL or Production URL.
- **Custom domain** just added: first load might hit a state where no deployment is assigned yet. Wait and retry, or redeploy once.
- **Bookmarks** to `xxx-xxx-xxx.vercel.app` (Preview-style). Those can break when that deployment is gone.

### Similar mistakes in related scenarios

- **404 on a path** (e.g. `/dashboard`): If the **domain** works but a **path** returns 404, that’s usually **app routing** (e.g. SPA not serving `index.html` for that path). Fix: `vercel.json` rewrites to `/index.html` (you already have this).
- **“Deployment not found” in dashboard**: You might be in the wrong project or team. Check project/team in the top-left of Vercel.
- **Build failed**: You’d see a **build error**, not DEPLOYMENT_NOT_FOUND. DEPLOYMENT_NOT_FOUND is when the deployment **id/URL** is missing, not when the build failed.

### Code smells / patterns that don’t cause this (but are easy to confuse)

- This error is **not** caused by:
  - `vercel.json` content (as long as the deployment exists).
  - Frontend code or env vars (they only affect the **content** of the deployment, not its existence).
- So: if you see DEPLOYMENT_NOT_FOUND, first think **“Am I using the right URL? Does this deployment still exist?”** before changing code or config.

---

## 5. Alternatives and trade-offs

| Approach | What you do | Trade-off |
|----------|-------------|-----------|
| **Use Production URL only** | Always open `https://your-app.vercel.app` (or custom domain). | No broken links when Previews are pruned; you don’t test a specific Preview URL long-term. |
| **Use latest deployment URL from dashboard** | Deployments → click latest → copy URL. | Always a valid deployment; URL can change with each deploy. |
| **Redeploy and retry** | Deployments → Redeploy on latest, then open Production URL. | Ensures a fresh deployment and fixes “domain not yet assigned” cases. |
| **Keep Preview URLs for short term** | Use Preview links only for immediate PR review, not as permanent links. | Avoids relying on deployments that may be deleted later. |

For **custom domains**: always use the **Production** domain after it’s assigned. That domain is stable and always points to the current Production deployment; you don’t need to worry about deployment ids.

---

## Quick checklist when you see DEPLOYMENT_NOT_FOUND

1. [ ] Open Vercel Dashboard → correct project → **Deployments**.
2. [ ] Confirm there is at least one **successful** deployment.
3. [ ] Open the URL shown for **Production** (or the latest deployment).
4. [ ] If using a custom domain: **Settings → Domains** → correct domain, then try **Redeploy** once.
5. [ ] Stop using old Preview URLs unless you’ve confirmed that deployment still exists.

No changes to your codebase are required for this error; it’s resolved by using a valid deployment URL and, if needed, creating a new deployment via push or redeploy.
