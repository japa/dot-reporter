# @japa/dot-reporter
> Minimal dot reporter for Japa tests runner

[![github-actions-image]][github-actions-url] [![npm-image]][npm-url] [![license-image]][license-url] [![typescript-image]][typescript-url]

The dot reporter display an icon for each of the test executed.

![](assets/reporter.png)

## Installation
Install the package from the npm registry as follows.

```sh
npm i -D @japa/dot-reporter

# yarn
yarn add -D @japa/dot-reporter

# pnpm
pnpm add -D @japa/dot-reporter
```

## Usage
You can use the dot reporter with the `@japa/runner` as follows.

```ts
import { configure } from '@japa/runner'
import { dotReporter } from '@japa/dot-reporter'

configure({
  reporters: [dotReporter()]
})
```

[github-actions-image]: https://img.shields.io/github/actions/workflow/status/japa/dot-reporter/test.yml?style=for-the-badge

[github-actions-url]: https://github.com/japa/dot-reporter/actions/workflows/test.yml "github-actions"

[npm-image]: https://img.shields.io/npm/v/@japa/dot-reporter.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/@japa/dot-reporter "npm"

[license-image]: https://img.shields.io/npm/l/@japa/dot-reporter?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"
