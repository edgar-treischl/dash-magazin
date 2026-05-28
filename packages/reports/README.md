# @dash-magazin/reports

Reusable editorial story components from Dash Magazin. Use these components to integrate Dash Magazin reports into your website.

## Installation

### Via NPM (Once Published)

```bash
yarn add @dash-magazin/reports
# or
npm install @dash-magazin/reports
```

### Via Git (Development)

```bash
yarn add @dash-magazin/reports@git+https://github.com/edgar-treischl/dash-magazin.git
```

### Via GitHub Packages (Private)

```bash
# Configure .npmrc
echo "@dash-magazin:registry=https://npm.pkg.github.com" >> .npmrc
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> .npmrc

# Install
yarn add @dash-magazin/reports
```

## Usage

### In Astro

```astro
---
import { EnergyTransition2026 } from '@dash-magazin/reports';
---

<Layout title="Reports">
  <EnergyTransition2026 />
</Layout>
```

### Direct Component Import

```astro
---
import EnergyTransition2026 from '@dash-magazin/reports/energy-transition-2026';
---

<EnergyTransition2026 />
```

### Data Export

```javascript
import storyData from '@dash-magazin/reports/energy-transition-2026/data';

console.log(storyData.metadata.title);
// Output: Energy Transition 2026
```

## Available Stories

### Energy Transition 2026

- **Component**: `@dash-magazin/reports/energy-transition-2026`
- **Data**: `@dash-magazin/reports/energy-transition-2026/data`
- **Version**: 2026.05.28

## Requirements

- **Node.js**: ≥22.12.0
- **Astro**: ≥6.0.0

## Contributing

See the main [README](../../README.md) for contribution guidelines.

## License

MIT
