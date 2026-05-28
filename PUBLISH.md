# Publishing Reports Package to GitHub Packages

Quick reference for publishing the reports package.

## Prerequisites

- GitHub repo: `edgar-treischl/dash-magazin`
- Write access to repo
- Git tags enabled

## One-Time Setup

✅ Already done:
- `packages/reports/package.json` configured with scope `@edgar-treischl/reports`
- `packages/reports/.npmrc` configured
- `.github/workflows/publish-reports.yml` created

## Publishing a New Version

### Automated (Recommended)

```bash
# 1. Update version in packages/reports/package.json
# Open: packages/reports/package.json
# Change version: "2026.05.28" → "2026.06.15"

# 2. Commit
git add packages/reports/package.json
git commit -m "chore: release reports v2026.06.15"

# 3. Tag it
git tag v2026.06.15

# 4. Push
git push origin main
git push origin v2026.06.15
```

GitHub Actions automatically:
- Publishes to GitHub Packages
- Creates a GitHub Release
- Sends notification

### Manual (One-Time)

```bash
cd packages/reports
npm publish
```

Requires `NPM_TOKEN` environment variable set to a GitHub Personal Access Token with `write:packages` scope.

## Verifying Publication

Check GitHub Packages:
https://github.com/edgar-treischl/dash-magazin/packages/npm/reports

Or via CLI:
```bash
npm view @edgar-treischl/reports
npm view @edgar-treischl/reports versions
```

## Consumer Installation

### Step 1: Configure .npmrc

In consumer repo root, create/update `.npmrc`:

```
@edgar-treischl:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

### Step 2: Authenticate

**Local development:**
```bash
export NPM_TOKEN="ghp_xxxxxxxxxxxxx"
```

Get token from: https://github.com/settings/tokens/new (select `read:packages`)

**CI/CD (GitHub Actions):**
Use `${{ secrets.GITHUB_TOKEN }}` automatically.

### Step 3: Install

```bash
yarn add @edgar-treischl/reports@2026.06.15
```

## Troubleshooting

### "Not found" error

```
error Error: https://npm.pkg.github.com/@edgar-treischl/reports: Not found
```

**Check:**
1. `.npmrc` configured correctly in consumer repo
2. `NPM_TOKEN` environment variable set
3. Consumer has network access to GitHub

### "Unauthorized" when publishing

```
npm ERR! 403 Forbidden
```

**Check:**
1. Token has `write:packages` scope
2. Token is not expired
3. You have write access to the repo

## Version Format

Dash Magazin uses **date-based versioning**:
```
YYYY.MM.DD
2026.05.28
2026.06.15
```

Update `packages/reports/package.json`:
```json
{
  "version": "2026.06.15"
}
```

## See Also

- [CONSUMPTION.md](./CONSUMPTION.md) — Full integration guide
- [packages/reports/README.md](./packages/reports/README.md) — Package documentation
- GitHub Packages docs: https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry
