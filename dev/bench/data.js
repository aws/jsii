window.BENCHMARK_DATA = {
  "lastUpdate": 1663874462518,
  "repoUrl": "https://github.com/aws/jsii",
  "entries": {
    "jsii Benchmark": [
      {
        "commit": {
          "author": {
            "email": "mitchellvaline@yahoo.com",
            "name": "Mitchell Valine",
            "username": "MrArnoldPalmer"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "3648117811c1edb40c047b2df3adf11a28452b3d",
          "message": "fix: incorrect token for benchmark action (#3517)\n\nChange to using the PROJEN_GITHUB_TOKEN so the action can correctly push\not the gh-pages branch for benchmark results.\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-05-05T18:30:16Z",
          "tree_id": "e8dc02507b029cde640b962c97719e8ee0a0ea89",
          "url": "https://github.com/aws/jsii/commit/3648117811c1edb40c047b2df3adf11a28452b3d"
        },
        "date": 1651776252005,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 62238.1937,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 62238.1937 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "8eec0868c02730dd22009c841e25034144b2e86f",
          "message": "fix(rosetta): incorrect transliteration for selective imports (#3508)\n\nGo does nto support \"selective\" imports, and has limited symbol aliasing\nsupport. Instead of attempting to transliterate selective imports with\na one-to-one semantic mapping, resolve the imported symbols and emit the\ncorrect qualified original name instead.\n\nThis results in more idiomatic (and likely more correct) go code.\n\nFor example:\n\n```ts\nimport { Foo as RenamedFoo, Bar } from 'baz';\n\nconst foo = new RenamedFoo();\nBar.baz(foo);\n```\n\nShould transliterate to something looking like:\n\n```go\nimport \"github.com/aws-samples/dummy/baz\"\n\nfoo := baz.NewFoo()\nBar_baz(foo)\n```\n\n---\n\nBonus content:\n- Now emits README.md for submodules, too (was previously ignored).\n- Missing newlines between go import statements are now inserted.\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-05-06T10:37:52Z",
          "tree_id": "7c526a4f7d01ff07adfa0e1c81d33d4760f603a8",
          "url": "https://github.com/aws/jsii/commit/8eec0868c02730dd22009c841e25034144b2e86f"
        },
        "date": 1651834333282,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 64620.671519,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 64620.671519 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "37929162+mergify[bot]@users.noreply.github.com",
            "name": "mergify[bot]",
            "username": "mergify[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "c18fa817771148e32b3ee6f4f08d6fc7e29d1f3a",
          "message": "chore(merge-back): 1.58.0 (#3526)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/merge-back/1.58.0/CHANGELOG.md)",
          "timestamp": "2022-05-06T16:42:01Z",
          "tree_id": "0c9a489ccfb6a540a2d44691d72181316f8065b6",
          "url": "https://github.com/aws/jsii/commit/c18fa817771148e32b3ee6f4f08d6fc7e29d1f3a"
        },
        "date": 1651856358741,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 60938.887169,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 60938.887169 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "5d5f435c9ce32e6a1e76afe27b7ef810200bde58",
          "message": "fix(jsii): deprecation warnings use this.constructor before calling super (#3528)\n\nInstead of using `this.constructor`, inline the class name (which has\nthe same value as `this.constructor` anyway). This removes what can be\nseen as a semantic issue (as it is usually illegal to refer to `this`\nbefore having called `super` in strict mode).\n\nFixes #3527 \n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-05-09T10:48:39Z",
          "tree_id": "fe386f0296c86bf22ee3ed22c66b22cd1724ed39",
          "url": "https://github.com/aws/jsii/commit/5d5f435c9ce32e6a1e76afe27b7ef810200bde58"
        },
        "date": 1652094218919,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 72253.736662,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 72253.736662 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "18447812bc15ec40971477f6c0989037c62d5a1d",
          "message": "chore(deps): Bump docker/setup-buildx-action from 1 to 2 (#3523)\n\nBumps [docker/setup-buildx-action](https://github.com/docker/setup-buildx-action) from 1 to 2.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/docker/setup-buildx-action/releases\">docker/setup-buildx-action's releases</a>.</em></p>\n<blockquote>\n<h2>v2.0.0</h2>\n<ul>\n<li>Node 16 as default runtime by <a href=\"https://github.com/crazy-max\"><code>@​crazy-max</code></a> (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/131\">#131</a>)\n<ul>\n<li>This requires a minimum <a href=\"https://github.com/actions/runner/releases/tag/v2.285.0\">Actions Runner</a> version of v2.285.0, which is by default available in GHES 3.4 or later.</li>\n</ul>\n</li>\n</ul>\n<p><strong>Full Changelog</strong>: <a href=\"https://github.com/docker/setup-buildx-action/compare/v1.7.0...v2.0.0\">https://github.com/docker/setup-buildx-action/compare/v1.7.0...v2.0.0</a></p>\n<h2>v1.7.0</h2>\n<ul>\n<li>Standalone mode by <a href=\"https://github.com/crazy-max\"><code>@​crazy-max</code></a> in (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/119\">#119</a>)</li>\n<li>Update dev dependencies and workflow by <a href=\"https://github.com/crazy-max\"><code>@​crazy-max</code></a> (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/114\">#114</a> <a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/130\">#130</a>)</li>\n<li>Bump tmpl from 1.0.4 to 1.0.5 (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/108\">#108</a>)</li>\n<li>Bump ansi-regex from 5.0.0 to 5.0.1 (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/109\">#109</a>)</li>\n<li>Bump <code>@​actions/core</code> from 1.5.0 to 1.6.0 (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/110\">#110</a>)</li>\n<li>Bump actions/checkout from 2 to 3 (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/126\">#126</a>)</li>\n<li>Bump <code>@​actions/tool-cache</code> from 1.7.1 to 1.7.2 (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/128\">#128</a>)</li>\n<li>Bump <code>@​actions/exec</code> from 1.1.0 to 1.1.1 (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/129\">#129</a>)</li>\n<li>Bump minimist from 1.2.5 to 1.2.6 (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/132\">#132</a>)</li>\n<li>Bump codecov/codecov-action from 2 to 3 (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/133\">#133</a>)</li>\n<li>Bump semver from 7.3.5 to 7.3.7 (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/136\">#136</a>)</li>\n</ul>\n<h2>v1.6.0</h2>\n<ul>\n<li>Add <code>config-inline</code> input (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/106\">#106</a>)</li>\n<li>Bump <code>@​actions/core</code> from 1.4.0 to 1.5.0 (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/104\">#104</a>)</li>\n<li>Bump codecov/codecov-action from 1 to 2 (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/101\">#101</a>)</li>\n</ul>\n<h2>v1.5.1</h2>\n<ul>\n<li>Explicit version spec for caching (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/100\">#100</a>)</li>\n</ul>\n<h2>v1.5.0</h2>\n<ul>\n<li>Allow building buildx from source (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/99\">#99</a>)</li>\n</ul>\n<h2>v1.4.1</h2>\n<ul>\n<li>Fix <code>docker: invalid reference format</code> (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/97\">#97</a>)</li>\n</ul>\n<h2>v1.4.0</h2>\n<ul>\n<li>Update dev deps (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/95\">#95</a>)</li>\n<li>Use built-in <code>getExecOutput</code> (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/94\">#94</a>)</li>\n<li>Use <code>core.getBooleanInput</code> (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/93\">#93</a>)</li>\n<li>Bump <code>@​actions/exec</code> from 1.0.4 to 1.1.0 (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/85\">#85</a>)</li>\n<li>Bump y18n from 4.0.0 to 4.0.3 (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/91\">#91</a>)</li>\n<li>Bump hosted-git-info from 2.8.8 to 2.8.9 (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/89\">#89</a>)</li>\n<li>Bump ws from 7.3.1 to 7.5.0 (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/90\">#90</a>)</li>\n<li>Bump <code>@​actions/tool-cache</code> from 1.6.1 to 1.7.1 (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/82\">#82</a> <a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/86\">#86</a>)</li>\n<li>Bump <code>@​actions/core</code> from 1.2.7 to 1.4.0 (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/80\">#80</a> <a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/87\">#87</a>)</li>\n</ul>\n<h2>v1.3.0</h2>\n<ul>\n<li>Display BuildKit version (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/72\">#72</a>)</li>\n</ul>\n<h2>v1.2.0</h2>\n<ul>\n<li>Remove os limitation (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/71\">#71</a>)</li>\n<li>Add test job for <code>config</code> input (<a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/68\">#68</a>)</li>\n</ul>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/docker/setup-buildx-action/commit/dc7b9719a96d48369863986a06765841d7ea23f6\"><code>dc7b971</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/131\">#131</a> from crazy-max/node16</li>\n<li><a href=\"https://github.com/docker/setup-buildx-action/commit/f55bc08278651b656ee62b6ac783a728845412a8\"><code>f55bc08</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/docker/setup-buildx-action/issues/141\">#141</a> from crazy-max/fix-test</li>\n<li><a href=\"https://github.com/docker/setup-buildx-action/commit/aa877a9d36ddbed778ffbf41ea213fe5a457520b\"><code>aa877a9</code></a> ci: fix standalone test</li>\n<li><a href=\"https://github.com/docker/setup-buildx-action/commit/130c56f342d03a8e22596cda4ff8eeaff804eb7a\"><code>130c56f</code></a> Node 16 as default runtime</li>\n<li>See full diff in <a href=\"https://github.com/docker/setup-buildx-action/compare/v1...v2\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\n[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=docker/setup-buildx-action&package-manager=github_actions&previous-version=1&new-version=2)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-05-09T12:33:31Z",
          "tree_id": "7ed461b95b1a25facb417ee8452e126594553488",
          "url": "https://github.com/aws/jsii/commit/18447812bc15ec40971477f6c0989037c62d5a1d"
        },
        "date": 1652100680475,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 75171.229115,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 75171.229115 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "f41a0edd4af8889850a852f490a325113642d3f1",
          "message": "chore(deps-dev): Update mkdocs-material requirement from ~=8.2.13 to ~=8.2.14 in /gh-pages (#3530)\n\nUpdates the requirements on [mkdocs-material](https://github.com/squidfunk/mkdocs-material) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/releases\">mkdocs-material's releases</a>.</em></p>\n<blockquote>\n<h2>mkdocs-material-8.2.14</h2>\n<ul>\n<li>Fixed missing top right rounded border on admonition</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3886\">#3886</a>: <code>4xx</code> status codes not handled when using instant loading</li>\n</ul>\n</blockquote>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/blob/master/CHANGELOG\">mkdocs-material's changelog</a>.</em></p>\n<blockquote>\n<p>mkdocs-material-8.2.14+insiders-4.15.0 (2022-05-08)</p>\n<ul>\n<li>Added support for improved tooltips</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3785\">#3785</a>: Show tooltip on hover for overflowing navigation link</li>\n</ul>\n<p>mkdocs-material-8.2.14 (2022-05-08)</p>\n<ul>\n<li>Fixed missing top right rounded border on admonition</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3886\">#3886</a>: 4xx status codes not handled when using instant loading</li>\n</ul>\n<p>mkdocs-material-8.2.13+insiders-4.14.0 (2022-05-05)</p>\n<ul>\n<li>Added Chinese language support to built-in search plugin</li>\n<li>Fixed all-numeric page titles raising error in social plugin</li>\n</ul>\n<p>mkdocs-material-8.2.13 (2022-05-02)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3865\">#3865</a>: Tags index links to tagged pages 404 on Windows</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3866\">#3866</a>: Bump required Python version from 3.6+ to 3.7+</li>\n</ul>\n<p>mkdocs-material-8.2.12+insiders-4.13.2 (2022-04-30)</p>\n<ul>\n<li>Improved caching of downloaded resources in privacy plugin</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3851\">#3851</a>: External images not downloaded by privacy plugin</li>\n</ul>\n<p>mkdocs-material-8.2.12 (2022-04-30)</p>\n<ul>\n<li>Added support for GitHub-style hash fragments for dark/light images</li>\n<li>Improved rendering of nested code blocks in content tabs and annotations</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3862\">#3862</a>: Upgraded to latest Pygments and Python Markdown Extensions</li>\n</ul>\n<p>mkdocs-material-8.2.11+insiders-4.13.1 (2022-04-25)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3839\">#3839</a>: Tags plugin breaks without icons (4.13.0 regression)</li>\n</ul>\n<p>mkdocs-material-8.2.11 (2022-04-25)</p>\n<ul>\n<li>Temporarily pinned Pygments to &lt;2.12</li>\n<li>Temporarily pinned Python Markdown Extensions to &lt;9.4</li>\n<li>Improved rendering of code annotation markers</li>\n</ul>\n<p>mkdocs-material-8.2.10+insiders-4.13.0 (2022-04-24)</p>\n<ul>\n<li>Added support for tag icons</li>\n</ul>\n<p>mkdocs-material-8.2.10 (2022-04-24)</p>\n<ul>\n<li>Added Macedonian translations</li>\n<li>Updated Mermaid.js to version 9.0.1</li>\n<li>Switched sidebar title in mobile navigation to bold font</li>\n</ul>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/f9e6b94aeaf63a4da7c9fc4e51b8835cabc89a6b\"><code>f9e6b94</code></a> Documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/cb4eda3e062e6ce1d26fd4c67eba80a8b1b1f972\"><code>cb4eda3</code></a> Documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/79b807c80467227d6a24234b485e18ecbf196b42\"><code>79b807c</code></a> Documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/dd10df9904d265bb7bff615c569ee4f129036873\"><code>dd10df9</code></a> Documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/d5d0e758801e85f5298c882c8e28169a49701d1e\"><code>d5d0e75</code></a> Prepare 8.2.14 release</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/0bd8c9410af2400c552eb064b3852da23dcccd9a\"><code>0bd8c94</code></a> Fixed missing top right rounded border on admonition</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/eab1b319f53453e918c70072efeee49dbd67de82\"><code>eab1b31</code></a> Documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/8beda2bfe1df5504d4d2efd2371b286c2b5083a2\"><code>8beda2b</code></a> Fixed handling of 4xx status codes when using instant loading</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/684acdcc7892d10c2b4a3afb2e3554f5e988c74f\"><code>684acdc</code></a> Updated README</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/d219ae2d0fc65923efca2923d478973199fa7d69\"><code>d219ae2</code></a> Fixed cookie consent headline hidden by AdBlock</li>\n<li>Additional commits viewable in <a href=\"https://github.com/squidfunk/mkdocs-material/compare/8.2.13...8.2.14\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-05-09T13:23:03Z",
          "tree_id": "eb3c920490ad726beae5813444431c3fec862144",
          "url": "https://github.com/aws/jsii/commit/f41a0edd4af8889850a852f490a325113642d3f1"
        },
        "date": 1652103547316,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 80792.797009,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 80792.797009 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "5ed2977ad45bbee7c3d99192c30d1eede60a22c8",
          "message": "chore(deps): Bump docker/setup-qemu-action from 1 to 2 (#3524)\n\nBumps [docker/setup-qemu-action](https://github.com/docker/setup-qemu-action) from 1 to 2.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/docker/setup-qemu-action/releases\">docker/setup-qemu-action's releases</a>.</em></p>\n<blockquote>\n<h2>v2.0.0</h2>\n<ul>\n<li>Node 16 as default runtime by <a href=\"https://github.com/crazy-max\"><code>@​crazy-max</code></a> (<a href=\"https://github-redirect.dependabot.com/docker/setup-qemu-action/issues/48\">#48</a>)\n<ul>\n<li>This requires a minimum <a href=\"https://github.com/actions/runner/releases/tag/v2.285.0\">Actions Runner</a> version of v2.285.0, which is by default available in GHES 3.4 or later.</li>\n</ul>\n</li>\n<li>chore: update dev dependencies and workflow by <a href=\"https://github.com/crazy-max\"><code>@​crazy-max</code></a> (<a href=\"https://github-redirect.dependabot.com/docker/setup-qemu-action/issues/43\">#43</a> <a href=\"https://github-redirect.dependabot.com/docker/setup-qemu-action/issues/47\">#47</a>)</li>\n<li>Bump <code>@​actions/core</code> from 1.3.0 to 1.6.0 (<a href=\"https://github-redirect.dependabot.com/docker/setup-qemu-action/issues/37\">#37</a> <a href=\"https://github-redirect.dependabot.com/docker/setup-qemu-action/issues/39\">#39</a> <a href=\"https://github-redirect.dependabot.com/docker/setup-qemu-action/issues/41\">#41</a>)</li>\n<li>Bump <code>@​actions/exec</code> from 1.0.4 to 1.1.1 (<a href=\"https://github-redirect.dependabot.com/docker/setup-qemu-action/issues/38\">#38</a> <a href=\"https://github-redirect.dependabot.com/docker/setup-qemu-action/issues/46\">#46</a>)</li>\n</ul>\n<p><strong>Full Changelog</strong>: <a href=\"https://github.com/docker/setup-qemu-action/compare/v1.2.0...v2.0.0\">https://github.com/docker/setup-qemu-action/compare/v1.2.0...v2.0.0</a></p>\n<h2>v1.2.0</h2>\n<ul>\n<li>Display image information (<a href=\"https://github-redirect.dependabot.com/docker/setup-qemu-action/issues/36\">#36</a>)</li>\n<li>Bump <code>@​actions/core</code> from 1.2.7 to 1.3.0 (<a href=\"https://github-redirect.dependabot.com/docker/setup-qemu-action/issues/35\">#35</a>)</li>\n</ul>\n<h2>v1.1.0</h2>\n<ul>\n<li>Remove os limitation (<a href=\"https://github-redirect.dependabot.com/docker/setup-qemu-action/issues/30\">#30</a>)</li>\n<li>Bump <code>@​actions/core</code> from 1.2.6 to 1.2.7 (<a href=\"https://github-redirect.dependabot.com/docker/setup-qemu-action/issues/29\">#29</a>)</li>\n</ul>\n<h2>v1.0.2</h2>\n<ul>\n<li>Enhance workflow (<a href=\"https://github-redirect.dependabot.com/docker/setup-qemu-action/issues/26\">#26</a>)</li>\n<li>Container based developer flow (<a href=\"https://github-redirect.dependabot.com/docker/setup-qemu-action/issues/19\">#19</a> <a href=\"https://github-redirect.dependabot.com/docker/setup-qemu-action/issues/20\">#20</a>)</li>\n</ul>\n<h2>v1.0.1</h2>\n<ul>\n<li>Fix CVE-2020-15228</li>\n</ul>\n</blockquote>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/docker/setup-qemu-action/commit/8b122486cedac8393e77aa9734c3528886e4a1a8\"><code>8b12248</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/docker/setup-qemu-action/issues/48\">#48</a> from crazy-max/node-16</li>\n<li><a href=\"https://github.com/docker/setup-qemu-action/commit/466d53193ca9a892b43bd0f7fcacd4537854009f\"><code>466d531</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/docker/setup-qemu-action/issues/50\">#50</a> from crazy-max/update-readme</li>\n<li><a href=\"https://github.com/docker/setup-qemu-action/commit/607c1922b58acc78ad41e470aa7f061af7ef1f85\"><code>607c192</code></a> simplify usage example</li>\n<li><a href=\"https://github.com/docker/setup-qemu-action/commit/d7849ecb9c834e9164bac38b409bad6b31f9fd1f\"><code>d7849ec</code></a> Node 16 as default runtime</li>\n<li><a href=\"https://github.com/docker/setup-qemu-action/commit/2d4bfe71c9c7c6adb935665efb1a651cc8e799ba\"><code>2d4bfe7</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/docker/setup-qemu-action/issues/47\">#47</a> from crazy-max/update-dev</li>\n<li><a href=\"https://github.com/docker/setup-qemu-action/commit/224b802eb3ef627939fa7cc83532f673a8bec346\"><code>224b802</code></a> chore: update dev dependencies and workflow</li>\n<li><a href=\"https://github.com/docker/setup-qemu-action/commit/95bd86577812b34f1db6d5e57b728cb63b9aa388\"><code>95bd865</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/docker/setup-qemu-action/issues/46\">#46</a> from docker/dependabot/npm_and_yarn/actions/exec-1.1.1</li>\n<li><a href=\"https://github.com/docker/setup-qemu-action/commit/cfd091faa1bc4166b21275c814f26cfe27f6cb43\"><code>cfd091f</code></a> Bump <code>@​actions/exec</code> from 1.1.0 to 1.1.1</li>\n<li><a href=\"https://github.com/docker/setup-qemu-action/commit/d2a60302b87194ce3bff607f8a9af18fe5ec1cdc\"><code>d2a6030</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/docker/setup-qemu-action/issues/45\">#45</a> from docker/dependabot/github_actions/actions/checkout-3</li>\n<li><a href=\"https://github.com/docker/setup-qemu-action/commit/97dc484a91e07bd7fe42cfff1919c2ea5ff6df50\"><code>97dc484</code></a> Bump actions/checkout from 2 to 3</li>\n<li>Additional commits viewable in <a href=\"https://github.com/docker/setup-qemu-action/compare/v1...v2\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\n[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=docker/setup-qemu-action&package-manager=github_actions&previous-version=1&new-version=2)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-05-09T14:10:38Z",
          "tree_id": "6eb60a20152c74d87b6688b25040cbbe8238d6ee",
          "url": "https://github.com/aws/jsii/commit/5ed2977ad45bbee7c3d99192c30d1eede60a22c8"
        },
        "date": 1652106439444,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 70438.484816,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 70438.484816 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "285705b6febae6886f15a4c28e1bc902e20d9571",
          "message": "chore(deps): Bump xunit.runner.visualstudio from 2.4.3 to 2.4.5 in /packages/@jsii/dotnet-runtime-test/test (#3529)\n\nBumps [xunit.runner.visualstudio](https://github.com/xunit/visualstudio.xunit) from 2.4.3 to 2.4.5.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/xunit/visualstudio.xunit/releases\">xunit.runner.visualstudio's releases</a>.</em></p>\n<blockquote>\n<h2>v2.4.4.1</h2>\n<h2>Changes:</h2>\n<h3>Bugs:</h3>\n<ul>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/292\">#292</a>: Fixing a hang in test discovery</li>\n</ul>\n<h3>Others:</h3>\n<ul>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/304\">#304</a>: Update xunit version to 2.4.2-pre.12</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/297\">#297</a>: Bump NSubstitute from 4.2.2 to 4.3.0</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/294\">#294</a>: Bump Microsoft.NET.Test.Sdk from 16.10.0 to 17.0.0</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/293\">#293</a>: Bump Nerdbank.GitVersioning from 3.4.231 to 3.4.255</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/296\">#296</a>: Bump Microsoft.NETCore.UniversalWindowsPlatform from 6.2.12 to 6.2.13</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/299\">#299</a>: Bump MSBuild.Sdk.Extras from 3.0.23 to 3.0.44</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/270\">#270</a>: Upgrade to GitHub-native Dependabot</li>\n</ul>\n\n<ul>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/281\">#281</a>: Bump Nerdbank.GitVersioning from 3.4.228 to 3.4.231</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/280\">#280</a>: Bump Nerdbank.GitVersioning from 3.4.220 to 3.4.228</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/277\">#277</a>: Bump Nerdbank.GitVersioning from 3.4.216 to 3.4.220</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/275\">#275</a>: Bump Nerdbank.GitVersioning from 3.4.205 to 3.4.216</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/274\">#274</a>: Bump Nerdbank.GitVersioning from 3.4.203 to 3.4.205</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/273\">#273</a>: Bump Microsoft.NET.Test.Sdk from 16.9.4 to 16.10.0</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/272\">#272</a>: Bump Microsoft.TestPlatform.ObjectModel from 16.9.4 to 16.10.0</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/271\">#271</a>: Bump Nerdbank.GitVersioning from 3.4.194 to 3.4.203</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/268\">#268</a>: Bump Nerdbank.GitVersioning from 3.4.190 to 3.4.194</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/267\">#267</a>: Bump Nerdbank.GitVersioning from 3.3.37 to 3.4.190</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/265\">#265</a>: Bump Microsoft.NET.Test.Sdk from 16.9.1 to 16.9.4</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/264\">#264</a>: Bump Microsoft.TestPlatform.ObjectModel from 16.9.1 to 16.9.4</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/260\">#260</a>: Bump Microsoft.TestPlatform.ObjectModel from 16.8.3 to 16.9.1</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/261\">#261</a>: Bump Microsoft.NET.Test.Sdk from 16.8.3 to 16.9.1</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/258\">#258</a>: Bump Microsoft.NETCore.UniversalWindowsPlatform from 6.2.11 to 6.2.12</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/256\">#256</a>: Bump MSBuild.Sdk.Extras from 3.0.22 to 3.0.23</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/255\">#255</a>: Bump MSBuild.Sdk.Extras from 2.1.2 to 3.0.22</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/254\">#254</a>: Bump Microsoft.TestPlatform.ObjectModel from 16.8.0 to 16.8.3</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/253\">#253</a>: Bump Microsoft.NET.Test.Sdk from 16.8.0 to 16.8.3</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/250\">#250</a>: Bump Microsoft.NETCore.UniversalWindowsPlatform from 6.2.10 to 6.2.11</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/246\">#246</a>: Bump Microsoft.TestPlatform.ObjectModel from 16.7.0 to 16.8.0</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/245\">#245</a>: Bump Microsoft.NET.Test.Sdk from 16.6.1 to 16.8.0</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/240\">#240</a>: Bump Nerdbank.GitVersioning from 3.2.31 to 3.3.37</li>\n<li><a href=\"https://github-redirect.dependabot.com/xunit/visualstudio.xunit/issues/231\">#231</a>: Bump Microsoft.TestPlatform.ObjectModel from 16.6.1 to 16.7.0</li>\n</ul>\n<p>This list of changes was <a href=\"https://dev.azure.com/dotnet/fe18572b-d1ba-496a-9e95-1af3bc3df99b/_release?releaseId=175&amp;_a=release-summary\">auto generated</a>.</p>\n</blockquote>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li>See full diff in <a href=\"https://github.com/xunit/visualstudio.xunit/commits\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\n[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=xunit.runner.visualstudio&package-manager=nuget&previous-version=2.4.3&new-version=2.4.5)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-05-09T17:50:21Z",
          "tree_id": "b25d3782d2c26027bf4a9cabae732f61c468c01b",
          "url": "https://github.com/aws/jsii/commit/285705b6febae6886f15a4c28e1bc902e20d9571"
        },
        "date": 1652119545599,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 74107.494938,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 74107.494938 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "andrestone@users.noreply.github.com",
            "name": "André Fontenele",
            "username": "andrestone"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "2751ca852ee751d3d7a49ee991004f3b5a6bde21",
          "message": "feat(jsii): enable source maps for declaration files (#3521)\n\nGenerates [declaration maps](https://www.typescriptlang.org/tsconfig#declarationMap) when compiling.\n\nThis is useful to help navigate source files when developing against a JSII library's repo (e.g using yarn link).\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-05-10T14:06:44Z",
          "tree_id": "7254b3fe295f0d9190d5cecb09582d0484dea5f2",
          "url": "https://github.com/aws/jsii/commit/2751ca852ee751d3d7a49ee991004f3b5a6bde21"
        },
        "date": 1652192664434,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 78270.776942,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 78270.776942 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "eltociear@gmail.com",
            "name": "Ikko Ashimine",
            "username": "eltociear"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "a89f64c5a32580ec46921827bf5d91da81d8f6ea",
          "message": "chore: fix typo in intended (#3533)",
          "timestamp": "2022-05-11T11:18:41+02:00",
          "tree_id": "3fcc96e0136d495b8e6b11414539a7558630ec7f",
          "url": "https://github.com/aws/jsii/commit/a89f64c5a32580ec46921827bf5d91da81d8f6ea"
        },
        "date": 1652261713325,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 64502.249458,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 64502.249458 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "43080478+aws-cdk-automation@users.noreply.github.com",
            "name": "AWS CDK Automation",
            "username": "aws-cdk-automation"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "d8b31d91c15c5da7ab1f09c76d89aba47711cff9",
          "message": "chore: npm-check-updates && yarn upgrade (#3532)\n\nCo-authored-by: AWS CDK Automation <aws-cdk-automation@users.noreply.github.com>\r\nCo-authored-by: Cory Hall <43035978+corymhall@users.noreply.github.com>",
          "timestamp": "2022-05-11T11:20:08+02:00",
          "tree_id": "94e547e4245303477c776ef100a1fc15b7826830",
          "url": "https://github.com/aws/jsii/commit/d8b31d91c15c5da7ab1f09c76d89aba47711cff9"
        },
        "date": 1652261742188,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 74111.275984,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 74111.275984 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "173fba42e7238258d8eb1e7cc96bac2fdf11020d",
          "message": "chore(@jsii/kernel): build out-of-tree (#3535)\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-05-12T13:10:17Z",
          "tree_id": "c083ea78d5f1614823283487eeaccc6f81383b1b",
          "url": "https://github.com/aws/jsii/commit/173fba42e7238258d8eb1e7cc96bac2fdf11020d"
        },
        "date": 1652361928212,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 63891.033126,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 63891.033126 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "8ef8ef2fe1e5559ef77a5b7ba0dbb67f52329927",
          "message": "fix(python): cannot import nested submodules (#3540)\n\nNested submodules were not registered in the `__all__` list of their\nparent, and so were not visible to import statement such as\n`from fully.qualified.submodule.path import Name`.\n\nThis changes how submodules get loaded so that they are always declared\nand loaded with the context of their immediate parent sub•module, which\nguarantees they are present in the relevant `__all__` list.\n\nFixes #3408\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-05-13T11:45:47Z",
          "tree_id": "5fe92878a728353c2a5d6735d74d465299897625",
          "url": "https://github.com/aws/jsii/commit/8ef8ef2fe1e5559ef77a5b7ba0dbb67f52329927"
        },
        "date": 1652443261713,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 64687.176274,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 64687.176274 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "37929162+mergify[bot]@users.noreply.github.com",
            "name": "mergify[bot]",
            "username": "mergify[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "eb02c920aa01e98e5ed166adc02a0562c908b50e",
          "message": "chore(release): 1.59.0 (#3545)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/bump/1.59.0/CHANGELOG.md)",
          "timestamp": "2022-05-16T21:27:22Z",
          "tree_id": "e48a6ab58c02bd2098ff3c60f2dba20e2ae337ab",
          "url": "https://github.com/aws/jsii/commit/eb02c920aa01e98e5ed166adc02a0562c908b50e"
        },
        "date": 1652737340669,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 61028.588766,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 61028.588766 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "37929162+mergify[bot]@users.noreply.github.com",
            "name": "mergify[bot]",
            "username": "mergify[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "d222a1f56fce3516f610fc9bd5bc40d651158e30",
          "message": "chore(merge-back): 1.59.0 (#3546)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/merge-back/1.59.0/CHANGELOG.md)",
          "timestamp": "2022-05-17T00:52:35Z",
          "tree_id": "e48a6ab58c02bd2098ff3c60f2dba20e2ae337ab",
          "url": "https://github.com/aws/jsii/commit/d222a1f56fce3516f610fc9bd5bc40d651158e30"
        },
        "date": 1652749770157,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 85539.979887,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 85539.979887 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "8fdd5f59be9b6026b39711627febdd7ce0b8a220",
          "message": "chore(deps): Bump Microsoft.CodeAnalysis.CSharp.Workspaces from 4.1.0 to 4.2.0 in /packages/@jsii/dotnet-runtime-test/test (#3542)\n\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2022-05-17T11:25:26+02:00",
          "tree_id": "1e9b6517e920dddadae5907712285f74567b9980",
          "url": "https://github.com/aws/jsii/commit/8fdd5f59be9b6026b39711627febdd7ce0b8a220"
        },
        "date": 1652780425921,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 71930.284993,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 71930.284993 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "c892954ae1661b71b4078ad9901e3353d5749c6a",
          "message": "chore(deps-dev): Update mkdocs-material requirement from ~=8.2.14 to ~=8.2.15 in /gh-pages (#3544)\n\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2022-05-17T11:25:05+02:00",
          "tree_id": "eba76d734a9cc11cefb3c89d94c2ccbbfc12081b",
          "url": "https://github.com/aws/jsii/commit/c892954ae1661b71b4078ad9901e3353d5749c6a"
        },
        "date": 1652780471707,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 77622.068773,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 77622.068773 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "d2d5de469a9ba5caadd15f9a67c6bb98b2c2d9a4",
          "message": "chore(deps): Bump Microsoft.NET.Test.Sdk from 17.1.0 to 17.2.0 in /packages/@jsii/dotnet-runtime-test/test (#3543)\n\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2022-05-17T11:25:16+02:00",
          "tree_id": "2d687fd0b258f41c0ed61f091c6e4cc5fb6e3bd4",
          "url": "https://github.com/aws/jsii/commit/d2d5de469a9ba5caadd15f9a67c6bb98b2c2d9a4"
        },
        "date": 1652780536995,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 89259.895172,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 89259.895172 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "43080478+aws-cdk-automation@users.noreply.github.com",
            "name": "AWS CDK Automation",
            "username": "aws-cdk-automation"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "72621a6c38df8a191d2001cd607301474e8f71bb",
          "message": "chore: npm-check-updates && yarn upgrade (#3537)\n\nCo-authored-by: AWS CDK Automation <aws-cdk-automation@users.noreply.github.com>",
          "timestamp": "2022-05-17T11:26:45+02:00",
          "tree_id": "9a1a2c44523ae0cc80c22f72494560a356c1d3a5",
          "url": "https://github.com/aws/jsii/commit/72621a6c38df8a191d2001cd607301474e8f71bb"
        },
        "date": 1652780628000,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 77754.629496,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 77754.629496 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "46e40c9929835c81164f08a16a52f6d9e2e041c4",
          "message": "chore: stop using ts-jest (#3539)\n\nOur process compiles before tests are run, and using\nts-jest causes the test files to be transformed a second\ntime, which is a waste of resources.\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-05-17T10:22:09Z",
          "tree_id": "a0d80c53add3d98e0ea767834671dbf58748b3ce",
          "url": "https://github.com/aws/jsii/commit/46e40c9929835c81164f08a16a52f6d9e2e041c4"
        },
        "date": 1652783885689,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 62602.966603,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 62602.966603 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rix0rrr@gmail.com",
            "name": "Rico Huijbers",
            "username": "rix0rrr"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "f3fec0c10dd72ae734047d2d8e242f8fb4e98812",
          "message": "fix(jsii): `assert` not allowed as interface member (#3553)\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-05-19T10:03:41Z",
          "tree_id": "eef61a5bdd66d080b95628a99338997139b97e20",
          "url": "https://github.com/aws/jsii/commit/f3fec0c10dd72ae734047d2d8e242f8fb4e98812"
        },
        "date": 1652955607095,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 62560.698316,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 62560.698316 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rix0rrr@gmail.com",
            "name": "Rico Huijbers",
            "username": "rix0rrr"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "9fd3c71c4edc4d7c03c05930b47fe34fe364bd29",
          "message": "fix(java): rendering of `@see` hyperlink leads to errors (#3554)\n\nJavaDoc complains about unexpected text when seeing:\n\n```\n@see https://example.com/path\n```\n\nApparently it needs to be:\n\n```\n@see <a href=\"https://example.com/path\">...</a>\n```\n\nChange the JavaDoc renderer.\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-05-19T14:11:11Z",
          "tree_id": "5738cb0887157f1f6400ae6ba9ab9ef91fba0d2f",
          "url": "https://github.com/aws/jsii/commit/9fd3c71c4edc4d7c03c05930b47fe34fe364bd29"
        },
        "date": 1652970340139,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 64637.731339,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 64637.731339 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "4acff2c432e4bfe830fe5fe471db6db2f5af0199",
          "message": "chore: build all packages with TypeScript 4.6 (#3549)\n\nUse TypeScript 4.6 for building all packages, but continue to use\nTypeScript 3.9 in the compiler and rosetta in order to avoid introducing\nbreaking changes.\n\nMoved several \"universal\" devDependencies all the way to the root of the\nmono-repository to minimize changes when updating these (`@types/jest`,\n`jest`, `eslint`, etc...).\n\nSome code changes were required due to the breaking changes introduced\nbetween TypeScript 3.9 and 4.6, but nothing particularly substantial.\nThere seems to be an odd interaction between webpack and actually\nimporting `node:process`, so the `jsii/runtime` package switched to\nusing the global `process` value instead of importing the module.\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-05-20T09:41:46Z",
          "tree_id": "8c182327a9fc9a6ba314a5d4af7058981cd5f350",
          "url": "https://github.com/aws/jsii/commit/4acff2c432e4bfe830fe5fe471db6db2f5af0199"
        },
        "date": 1653040689983,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 63765.552268,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 63765.552268 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "43080478+aws-cdk-automation@users.noreply.github.com",
            "name": "AWS CDK Automation",
            "username": "aws-cdk-automation"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ac939ce138948e43001f1aea1da0dd9617cc37cb",
          "message": "chore: npm-check-updates && yarn upgrade (#3556)\n\nRan npm-check-updates and yarn upgrade to keep the `yarn.lock` file up-to-date.",
          "timestamp": "2022-05-20T11:16:24Z",
          "tree_id": "85ce41a0548f91fded8a8cc7b8cdba69ccc914ce",
          "url": "https://github.com/aws/jsii/commit/ac939ce138948e43001f1aea1da0dd9617cc37cb"
        },
        "date": 1653046547512,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 87130.068528,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 87130.068528 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "bd1d0424db470ba7dae1ea470448ef4bb8e16ff1",
          "message": "chore: use a venv to build github pages (#3557)",
          "timestamp": "2022-05-20T13:22:47+02:00",
          "tree_id": "7a8b2f7387343c0a42f7cef69ee24f26d51f2141",
          "url": "https://github.com/aws/jsii/commit/bd1d0424db470ba7dae1ea470448ef4bb8e16ff1"
        },
        "date": 1653046725653,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 60382.326108,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 60382.326108 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "3403cb7ee615881ca0b91e7b1a7c6acdb9108290",
          "message": "chore: use a venv to build github pages (#3557)",
          "timestamp": "2022-05-20T11:24:28Z",
          "tree_id": "90878f628ddc993ecf659e162b8abc0a5513b325",
          "url": "https://github.com/aws/jsii/commit/3403cb7ee615881ca0b91e7b1a7c6acdb9108290"
        },
        "date": 1653047009332,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 65772.64169,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 65772.64169 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "rmuller@amazon.com",
            "name": "🧑🏻‍💻 Romain Marcadier",
            "username": "RomainMuller"
          },
          "distinct": true,
          "id": "8af6353de079511f2afcf0fc21ca7c11e3005f5d",
          "message": "chore: use a venv to build github pages (#3557)",
          "timestamp": "2022-05-20T13:37:02+02:00",
          "tree_id": "6b06a6caeece70f597b0875d200c937aa98bce2b",
          "url": "https://github.com/aws/jsii/commit/8af6353de079511f2afcf0fc21ca7c11e3005f5d"
        },
        "date": 1653047683526,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 61071.801027,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 61071.801027 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "rmuller@amazon.com",
            "name": "🧑🏻‍💻 Romain Marcadier",
            "username": "RomainMuller"
          },
          "distinct": true,
          "id": "7c847b6e437eb52775384892b4629b2a3dd62dea",
          "message": "chore: use a venv to build github pages (#3557)",
          "timestamp": "2022-05-20T13:46:10+02:00",
          "tree_id": "d174ccc6b027ac950a3b3f5191cac6a03b17d2b6",
          "url": "https://github.com/aws/jsii/commit/7c847b6e437eb52775384892b4629b2a3dd62dea"
        },
        "date": 1653048241066,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 60302.307079,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 60302.307079 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "rmuller@amazon.com",
            "name": "🧑🏻‍💻 Romain Marcadier",
            "username": "RomainMuller"
          },
          "distinct": true,
          "id": "27c610d67f96beb36b374f898a76eb8db65fc5b6",
          "message": "chore: use a venv to build github pages (#3557)",
          "timestamp": "2022-05-20T13:50:29+02:00",
          "tree_id": "4ee3545268d5f69aa193dba0fa80f4fa108d6496",
          "url": "https://github.com/aws/jsii/commit/27c610d67f96beb36b374f898a76eb8db65fc5b6"
        },
        "date": 1653048511380,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 61149.383537,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 61149.383537 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "f015e28b24343cf4e2470d16f3e7f038374bc2d7",
          "message": "chore(@jsii/spec): build out-of-tree (#3534)\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-05-24T12:20:06Z",
          "tree_id": "1d5b2bfe21e18e7b65c2595db89173f9fdf2ab1f",
          "url": "https://github.com/aws/jsii/commit/f015e28b24343cf4e2470d16f3e7f038374bc2d7"
        },
        "date": 1653396029516,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 77175.619195,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 77175.619195 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "mitchellvaline@yahoo.com",
            "name": "Mitchell Valine",
            "username": "MrArnoldPalmer"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "d9ba2330f2d8a6fc8ccd5d14d04eade2dfdad2b4",
          "message": "chore: remove Go dev preview from docs (#3564)\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-05-26T16:24:07Z",
          "tree_id": "1d1b75e02a76c57f43b9ede8c409b49b5f0fa86b",
          "url": "https://github.com/aws/jsii/commit/d9ba2330f2d8a6fc8ccd5d14d04eade2dfdad2b4"
        },
        "date": 1653583405441,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 87051.226976,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 87051.226976 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "mitchellvaline@yahoo.com",
            "name": "Mitchell Valine",
            "username": "MrArnoldPalmer"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "d9ba2330f2d8a6fc8ccd5d14d04eade2dfdad2b4",
          "message": "chore: remove Go dev preview from docs (#3564)\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-05-26T16:24:07Z",
          "tree_id": "1d1b75e02a76c57f43b9ede8c409b49b5f0fa86b",
          "url": "https://github.com/aws/jsii/commit/d9ba2330f2d8a6fc8ccd5d14d04eade2dfdad2b4"
        },
        "date": 1653586706176,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 60210.018283,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 60210.018283 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rybickic@amazon.com",
            "name": "Christopher Rybicki",
            "username": "Chriscbr"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "c40f26cdc7bef7835fbddbae983783a495be2d0e",
          "message": "fix(@jsii/spec): speed up assembly validation by 20x for large libraries (#3565)",
          "timestamp": "2022-05-31T08:28:21-07:00",
          "tree_id": "a6cf58440cca14facddb7983f51a8a85bf365996",
          "url": "https://github.com/aws/jsii/commit/c40f26cdc7bef7835fbddbae983783a495be2d0e"
        },
        "date": 1654011908655,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 62396.667273,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 62396.667273 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "06d9a39cec8254ebab76a81026ab0e64a2f05462",
          "message": "feat(jsii): make source map behavior fully configurable (#3558)\n\nInstead of enabling declarations maps everywhere as was done in #3521,\nallow customers to define their desired source-map related configuration\nin the `jsii.tsc` stanza of `package.json`.\n\nThis change in stance is motivated by how introduction of declarations\nmap causes broad asset hash changes in consumer code, which effectively\nbreaks many snapshot-based regression tests, and this feature should\nhence be opt-in.\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-06-01T13:59:20Z",
          "tree_id": "a89ff5f87fea2c6e28fc2ae95a92c7c87c0ff7f2",
          "url": "https://github.com/aws/jsii/commit/06d9a39cec8254ebab76a81026ab0e64a2f05462"
        },
        "date": 1654092949001,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 73062.548551,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 73062.548551 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "5744707f38e4d1e295eb17aa905b2d2f909ca974",
          "message": "chore(deps-dev): Update twine requirement from ~=4.0.0 to ~=4.0.1 in /packages/jsii-pacmak/lib/targets/python (#3568)\n\nUpdates the requirements on [twine](https://github.com/pypa/twine) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/pypa/twine/releases\">twine's releases</a>.</em></p>\n<blockquote>\n<h2>4.0.1</h2>\n<p><a href=\"https://pypi.org/project/twine/4.0.1/\">https://pypi.org/project/twine/4.0.1/</a></p>\n<p><a href=\"https://twine.readthedocs.io/en/stable/changelog.html#twine-4-0-1-2022-06-01\">Changelog</a></p>\n</blockquote>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/pypa/twine/blob/main/docs/changelog.rst\">twine's changelog</a>.</em></p>\n<blockquote>\n<h2>Twine 4.0.1 (2022-06-01)</h2>\n<p>Bugfixes\n^^^^^^^^</p>\n<ul>\n<li>Improve logging when keyring fails. (<code>[#890](https://github.com/pypa/twine/issues/890) &lt;https://github.com/pypa/twine/issues/890&gt;</code>_)</li>\n<li>Reconfgure root logger to show all log messages. (<code>[#896](https://github.com/pypa/twine/issues/896) &lt;https://github.com/pypa/twine/issues/896&gt;</code>_)</li>\n</ul>\n<h2>Twine 4.0.0 (2022-03-31)</h2>\n<p>Features\n^^^^^^^^</p>\n<ul>\n<li>Drop support for Python 3.6. (<code>[#869](https://github.com/pypa/twine/issues/869) &lt;https://github.com/pypa/twine/issues/869&gt;</code>_)</li>\n<li>Use Rich to add color to <code>upload</code> output. (<code>[#851](https://github.com/pypa/twine/issues/851) &lt;https://github.com/pypa/twine/issues/851&gt;</code>_)</li>\n<li>Use Rich to add color to <code>check</code> output. (<code>[#874](https://github.com/pypa/twine/issues/874) &lt;https://github.com/pypa/twine/issues/874&gt;</code>_)</li>\n<li>Use Rich instead of tqdm for upload progress bar. (<code>[#877](https://github.com/pypa/twine/issues/877) &lt;https://github.com/pypa/twine/issues/877&gt;</code>_)</li>\n</ul>\n<p>Bugfixes\n^^^^^^^^</p>\n<ul>\n<li>Remove Twine's dependencies from the <code>User-Agent</code> header when uploading. (<code>[#871](https://github.com/pypa/twine/issues/871) &lt;https://github.com/pypa/twine/issues/871&gt;</code>_)</li>\n<li>Improve detection of disabled BLAKE2 hashing due to FIPS mode. (<code>[#879](https://github.com/pypa/twine/issues/879) &lt;https://github.com/pypa/twine/issues/879&gt;</code>_)</li>\n<li>Restore warning for missing <code>long_description</code>. (<code>[#887](https://github.com/pypa/twine/issues/887) &lt;https://github.com/pypa/twine/issues/887&gt;</code>_)</li>\n</ul>\n<h2>Twine 3.8.0 (2022-02-02)</h2>\n<p>Features\n^^^^^^^^</p>\n<ul>\n<li>Add <code>--verbose</code> logging for querying keyring credentials. (<code>[#849](https://github.com/pypa/twine/issues/849) &lt;https://github.com/pypa/twine/issues/849&gt;</code>_)</li>\n<li>Log all upload responses with <code>--verbose</code>. (<code>[#859](https://github.com/pypa/twine/issues/859) &lt;https://github.com/pypa/twine/issues/859&gt;</code>_)</li>\n<li>Show more helpful error message for invalid metadata. (<code>[#861](https://github.com/pypa/twine/issues/861) &lt;https://github.com/pypa/twine/issues/861&gt;</code>_)</li>\n</ul>\n<p>Bugfixes\n^^^^^^^^</p>\n<ul>\n<li>Require a recent version of urllib3. (<code>[#858](https://github.com/pypa/twine/issues/858) &lt;https://github.com/pypa/twine/issues/858&gt;</code>_)</li>\n</ul>\n<h2>Twine 3.7.1 (2021-12-07)</h2>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/pypa/twine/commit/8f5e5d6d42d582ef3ea6ef07da277e0cabd22fd2\"><code>8f5e5d6</code></a> Update changelog for 4.0.1 (<a href=\"https://github-redirect.dependabot.com/pypa/twine/issues/904\">#904</a>)</li>\n<li><a href=\"https://github.com/pypa/twine/commit/62f3c67fa2f74cde433d6003b7ebf4256f129a7d\"><code>62f3c67</code></a> Log keyring tracebacks (<a href=\"https://github-redirect.dependabot.com/pypa/twine/issues/890\">#890</a>)</li>\n<li><a href=\"https://github.com/pypa/twine/commit/d30df7038fd3545e30a2c9bd3728aa787659aa38\"><code>d30df70</code></a> Update links to requests docs (<a href=\"https://github-redirect.dependabot.com/pypa/twine/issues/899\">#899</a>)</li>\n<li><a href=\"https://github.com/pypa/twine/commit/5525a2a628317eecb891859e395b0a54f2c57043\"><code>5525a2a</code></a> Restore missing <code>__main__</code> logs (<a href=\"https://github-redirect.dependabot.com/pypa/twine/issues/896\">#896</a>)</li>\n<li><a href=\"https://github.com/pypa/twine/commit/b0b932f2da604e90f8a7a5a5c7e2841f519a8fb7\"><code>b0b932f</code></a> Fix typos in tests (<a href=\"https://github-redirect.dependabot.com/pypa/twine/issues/898\">#898</a>)</li>\n<li><a href=\"https://github.com/pypa/twine/commit/4223ee154f1c962a0c33e2a3a95ed4c42bc62d41\"><code>4223ee1</code></a> Require latest version of readme_renderer (<a href=\"https://github-redirect.dependabot.com/pypa/twine/issues/892\">#892</a>)</li>\n<li>See full diff in <a href=\"https://github.com/pypa/twine/compare/4.0.0...4.0.1\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-06-01T14:48:42Z",
          "tree_id": "1252b7352bf10e7b903786e932e4c499bf3e23ff",
          "url": "https://github.com/aws/jsii/commit/5744707f38e4d1e295eb17aa905b2d2f909ca974"
        },
        "date": 1654096043372,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 66268.56614,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 66268.56614 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "5a0e164e8cbe5c77421ff7a85986a24fae60ba0a",
          "message": "chore(deps-dev): Bump mypy from 0.950 to 0.960 in /packages/jsii-pacmak/test/generated-code (#3563)\n\nBumps [mypy](https://github.com/python/mypy) from 0.950 to 0.960.\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/python/mypy/commit/0a4a190f25ed90f73f6290656ec65ddd6bdb1d4e\"><code>0a4a190</code></a> Update version to 0.960</li>\n<li><a href=\"https://github.com/python/mypy/commit/128661ccbf4396ed1538421c481f1773c7490169\"><code>128661c</code></a> Friendlier errors for PEP 612 (<a href=\"https://github-redirect.dependabot.com/python/mypy/issues/12832\">#12832</a>)</li>\n<li><a href=\"https://github.com/python/mypy/commit/a54c84d0b0be3676e791960cb474dea00ac7f3bf\"><code>a54c84d</code></a> Bring back type annotation support of dunder methods in stub generator (<a href=\"https://github-redirect.dependabot.com/python/mypy/issues/12828\">#12828</a>)</li>\n<li><a href=\"https://github.com/python/mypy/commit/290f013dc11a955ff2d87e3610d873c0fef71e55\"><code>290f013</code></a> FindModuleCache: optionally leverage BuildSourceSet (<a href=\"https://github-redirect.dependabot.com/python/mypy/issues/12616\">#12616</a>)</li>\n<li><a href=\"https://github.com/python/mypy/commit/aa7c21a363271caed276c61899a7cb59bd2af49e\"><code>aa7c21a</code></a> Typeshed cherry-pick: Ignore mypy errors in Python 2 builtins and typing (<a href=\"https://github-redirect.dependabot.com/python/mypy/issues/78\">#78</a>...</li>\n<li><a href=\"https://github.com/python/mypy/commit/644d5f6f2f503f115e6656336ad266a7e03fd79d\"><code>644d5f6</code></a> checkexpr: cache type of container literals when possible (<a href=\"https://github-redirect.dependabot.com/python/mypy/issues/12707\">#12707</a>)</li>\n<li><a href=\"https://github.com/python/mypy/commit/b673366df0b0ee859abe0de3e2e82d99203fcd84\"><code>b673366</code></a> speedup typechecking of nested if expressions (<a href=\"https://github-redirect.dependabot.com/python/mypy/issues/12700\">#12700</a>)</li>\n<li><a href=\"https://github.com/python/mypy/commit/6db3d96cf28879dc9018d5d8bcd45d30ba9b6817\"><code>6db3d96</code></a> Avoid crashing on invalid python executables (<a href=\"https://github-redirect.dependabot.com/python/mypy/issues/12812\">#12812</a>)</li>\n<li><a href=\"https://github.com/python/mypy/commit/cb2c07bd1b0cb8ff3dbf38d0ee2092ebc1c1162f\"><code>cb2c07b</code></a> Fix crash on type alias definition inside dataclass declaration (<a href=\"https://github-redirect.dependabot.com/python/mypy/issues/12792\">#12792</a>)</li>\n<li><a href=\"https://github.com/python/mypy/commit/3cd1e2c4d9213793adff1973c4b68f473154df21\"><code>3cd1e2c</code></a> Fix namedtuple crash in unannotated function (<a href=\"https://github-redirect.dependabot.com/python/mypy/issues/12804\">#12804</a>)</li>\n<li>Additional commits viewable in <a href=\"https://github.com/python/mypy/compare/v0.950...v0.960\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\n[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=mypy&package-manager=pip&previous-version=0.950&new-version=0.960)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-06-01T15:38:29Z",
          "tree_id": "061bc58f173800be32aa1d18d9bd5afe91cd1d74",
          "url": "https://github.com/aws/jsii/commit/5a0e164e8cbe5c77421ff7a85986a24fae60ba0a"
        },
        "date": 1654098899292,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 64625.72485,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 64625.72485 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "6f74b78b0ecf1782ced3eac6fd763af36e1300c0",
          "message": "chore(deps-dev): Update mkdocs-material requirement from ~=8.2.15 to ~=8.2.16 in /gh-pages (#3566)\n\nUpdates the requirements on [mkdocs-material](https://github.com/squidfunk/mkdocs-material) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/releases\">mkdocs-material's releases</a>.</em></p>\n<blockquote>\n<h2>mkdocs-material-8.2.16</h2>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3957\">#3957</a>: Only animate code annotations when visible (save CPU cycles)</li>\n</ul>\n</blockquote>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/blob/master/CHANGELOG\">mkdocs-material's changelog</a>.</em></p>\n<blockquote>\n<p>mkdocs-material-8.2.16+insiders-4.16.2 (2022-05-28)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3961\">#3961</a>: Nested sections triggered build error for navigation tabs</li>\n</ul>\n<p>mkdocs-material-8.2.16+insiders-4.16.1 (2022-05-28)</p>\n<ul>\n<li>Switched feedback widget rating titles to tooltips</li>\n<li>Improved contrast of link colors for light/dark color schemes</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3950\">#3950</a>: Sticky navigation tabs rendering broken (4.15.2 regression)</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3958\">#3958</a>: Links invisible when using white primary color</li>\n</ul>\n<p>mkdocs-material-8.2.16 (2022-05-28)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3957\">#3957</a>: Only animate code annotations when visible (save CPU cycles)</li>\n</ul>\n<p>mkdocs-material-8.2.15+insiders-4.16.0 (2022-05-25)</p>\n<ul>\n<li>Added support for navigation pruning</li>\n<li>Fixed search results for non-segmented characters (4.15.2 regression)</li>\n</ul>\n<p>mkdocs-material-8.2.15+insiders-4.15.2 (2022-05-22)</p>\n<ul>\n<li>Removed workaround for abbr on touch devices (superseded by tooltips)</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3915\">#3915</a>: Improved Chinese search query segmentation</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3938\">#3938</a>: Fixed tooltips position for navigation titles with ellipsis</li>\n</ul>\n<p>mkdocs-material-8.2.15+insiders-4.15.1 (2022-05-14)</p>\n<ul>\n<li>Improved performance of element focus obervables</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3531\">#3531</a>: Added prev/next buttons to content tabs</li>\n<li>Fixed tooltip positioning when host element is hidden</li>\n</ul>\n<p>mkdocs-material-8.2.15 (2022-05-14)</p>\n<ul>\n<li>Added Uzbek translations</li>\n<li>Fixed spacing for code block results in content tabs</li>\n</ul>\n<p>mkdocs-material-8.2.14+insiders-4.15.0 (2022-05-08)</p>\n<ul>\n<li>Added support for improved tooltips</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3785\">#3785</a>: Show tooltip on hover for overflowing navigation link</li>\n</ul>\n<p>mkdocs-material-8.2.14 (2022-05-08)</p>\n<ul>\n<li>Fixed missing top right rounded border on admonition</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3886\">#3886</a>: 4xx status codes not handled when using instant loading</li>\n</ul>\n<p>mkdocs-material-8.2.13+insiders-4.14.0 (2022-05-05)</p>\n<ul>\n<li>Added Chinese language support to built-in search plugin</li>\n</ul>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/fd4f82cd082c6accd2b035df7bab36551e5c4a20\"><code>fd4f82c</code></a> Updated Insiders changelog</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/b25844d51ee87354e902849d661e0134546a2d24\"><code>b25844d</code></a> Prepare 8.2.16 release</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/0d24a26958e1bbc5fc5161cf05dd2645d15a8182\"><code>0d24a26</code></a> Documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/97b291664c850b9375a15be132e1575d49da9251\"><code>97b2916</code></a> Formatting</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/5e442eb46f74c8ed34733be6c5a6a4a2e74a4b8f\"><code>5e442eb</code></a> Reduced GPU cycles by only animating annotations when visible</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/23cec7f441cee5e3f1aa64157d669dee6bd2c727\"><code>23cec7f</code></a> Documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/3ceef1515531f53176f90cfeb0507e1861b4935e\"><code>3ceef15</code></a> Documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/26053e0a4b3dadf465afc6fefb6096e3f9cc2925\"><code>26053e0</code></a> Added navigation pruning to schema</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/132d79a681a1808e56c7d5312dc2d1d3369ac733\"><code>132d79a</code></a> Updated Insiders changelog</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/80c65cbb5bd21f06e0715042d3e43289c8cbe823\"><code>80c65cb</code></a> Updated Insiders changelog</li>\n<li>Additional commits viewable in <a href=\"https://github.com/squidfunk/mkdocs-material/compare/8.2.15...8.2.16\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-06-01T16:23:04Z",
          "tree_id": "96bed5b9cc9e91a75b0ac0c7f868eb7d4463482f",
          "url": "https://github.com/aws/jsii/commit/6f74b78b0ecf1782ced3eac6fd763af36e1300c0"
        },
        "date": 1654101710663,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 63266.246291,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 63266.246291 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "6f74b78b0ecf1782ced3eac6fd763af36e1300c0",
          "message": "chore(deps-dev): Update mkdocs-material requirement from ~=8.2.15 to ~=8.2.16 in /gh-pages (#3566)\n\nUpdates the requirements on [mkdocs-material](https://github.com/squidfunk/mkdocs-material) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/releases\">mkdocs-material's releases</a>.</em></p>\n<blockquote>\n<h2>mkdocs-material-8.2.16</h2>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3957\">#3957</a>: Only animate code annotations when visible (save CPU cycles)</li>\n</ul>\n</blockquote>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/blob/master/CHANGELOG\">mkdocs-material's changelog</a>.</em></p>\n<blockquote>\n<p>mkdocs-material-8.2.16+insiders-4.16.2 (2022-05-28)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3961\">#3961</a>: Nested sections triggered build error for navigation tabs</li>\n</ul>\n<p>mkdocs-material-8.2.16+insiders-4.16.1 (2022-05-28)</p>\n<ul>\n<li>Switched feedback widget rating titles to tooltips</li>\n<li>Improved contrast of link colors for light/dark color schemes</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3950\">#3950</a>: Sticky navigation tabs rendering broken (4.15.2 regression)</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3958\">#3958</a>: Links invisible when using white primary color</li>\n</ul>\n<p>mkdocs-material-8.2.16 (2022-05-28)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3957\">#3957</a>: Only animate code annotations when visible (save CPU cycles)</li>\n</ul>\n<p>mkdocs-material-8.2.15+insiders-4.16.0 (2022-05-25)</p>\n<ul>\n<li>Added support for navigation pruning</li>\n<li>Fixed search results for non-segmented characters (4.15.2 regression)</li>\n</ul>\n<p>mkdocs-material-8.2.15+insiders-4.15.2 (2022-05-22)</p>\n<ul>\n<li>Removed workaround for abbr on touch devices (superseded by tooltips)</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3915\">#3915</a>: Improved Chinese search query segmentation</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3938\">#3938</a>: Fixed tooltips position for navigation titles with ellipsis</li>\n</ul>\n<p>mkdocs-material-8.2.15+insiders-4.15.1 (2022-05-14)</p>\n<ul>\n<li>Improved performance of element focus obervables</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3531\">#3531</a>: Added prev/next buttons to content tabs</li>\n<li>Fixed tooltip positioning when host element is hidden</li>\n</ul>\n<p>mkdocs-material-8.2.15 (2022-05-14)</p>\n<ul>\n<li>Added Uzbek translations</li>\n<li>Fixed spacing for code block results in content tabs</li>\n</ul>\n<p>mkdocs-material-8.2.14+insiders-4.15.0 (2022-05-08)</p>\n<ul>\n<li>Added support for improved tooltips</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3785\">#3785</a>: Show tooltip on hover for overflowing navigation link</li>\n</ul>\n<p>mkdocs-material-8.2.14 (2022-05-08)</p>\n<ul>\n<li>Fixed missing top right rounded border on admonition</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3886\">#3886</a>: 4xx status codes not handled when using instant loading</li>\n</ul>\n<p>mkdocs-material-8.2.13+insiders-4.14.0 (2022-05-05)</p>\n<ul>\n<li>Added Chinese language support to built-in search plugin</li>\n</ul>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/fd4f82cd082c6accd2b035df7bab36551e5c4a20\"><code>fd4f82c</code></a> Updated Insiders changelog</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/b25844d51ee87354e902849d661e0134546a2d24\"><code>b25844d</code></a> Prepare 8.2.16 release</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/0d24a26958e1bbc5fc5161cf05dd2645d15a8182\"><code>0d24a26</code></a> Documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/97b291664c850b9375a15be132e1575d49da9251\"><code>97b2916</code></a> Formatting</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/5e442eb46f74c8ed34733be6c5a6a4a2e74a4b8f\"><code>5e442eb</code></a> Reduced GPU cycles by only animating annotations when visible</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/23cec7f441cee5e3f1aa64157d669dee6bd2c727\"><code>23cec7f</code></a> Documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/3ceef1515531f53176f90cfeb0507e1861b4935e\"><code>3ceef15</code></a> Documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/26053e0a4b3dadf465afc6fefb6096e3f9cc2925\"><code>26053e0</code></a> Added navigation pruning to schema</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/132d79a681a1808e56c7d5312dc2d1d3369ac733\"><code>132d79a</code></a> Updated Insiders changelog</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/80c65cbb5bd21f06e0715042d3e43289c8cbe823\"><code>80c65cb</code></a> Updated Insiders changelog</li>\n<li>Additional commits viewable in <a href=\"https://github.com/squidfunk/mkdocs-material/compare/8.2.15...8.2.16\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-06-01T16:23:04Z",
          "tree_id": "96bed5b9cc9e91a75b0ac0c7f868eb7d4463482f",
          "url": "https://github.com/aws/jsii/commit/6f74b78b0ecf1782ced3eac6fd763af36e1300c0"
        },
        "date": 1654105098496,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 65294.172526,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 65294.172526 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "skuenzli@gmail.com",
            "name": "Stephen Kuenzli",
            "username": "skuenzli"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "f034e2c70bc0dcd26e02694e56fc86e426406431",
          "message": "chore(docs): add newline so markdown list renders (#3567)\n\nAdd newline so markdown list of supported parameterized types renders properly",
          "timestamp": "2022-06-02T11:07:03+02:00",
          "tree_id": "f3ac12457d4b05a1c9d8d0299be9064fff47dd4a",
          "url": "https://github.com/aws/jsii/commit/f034e2c70bc0dcd26e02694e56fc86e426406431"
        },
        "date": 1654162002334,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 65042.2417,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 65042.2417 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "47dfd8208928a8f7c2124fa06f915501c0b53346",
          "message": "chore(oo-ascii-tree): build out-of-tree (#3572)",
          "timestamp": "2022-06-03T14:18:13+02:00",
          "tree_id": "ba9dcb6c6fa68ab907712c79f66b6f03af769495",
          "url": "https://github.com/aws/jsii/commit/47dfd8208928a8f7c2124fa06f915501c0b53346"
        },
        "date": 1654259779584,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 64403.149735,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 64403.149735 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "8e51631a7c40dcd97c4f631cbfe92244679038a6",
          "message": "chore(codemaker): build out-of-tree (#3571)",
          "timestamp": "2022-06-03T14:17:55+02:00",
          "tree_id": "e8353bcac6187039071333133c29551626a57b7f",
          "url": "https://github.com/aws/jsii/commit/8e51631a7c40dcd97c4f631cbfe92244679038a6"
        },
        "date": 1654259820920,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 66113.330399,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 66113.330399 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "mitchellvaline@yahoo.com",
            "name": "Mitchell Valine",
            "username": "MrArnoldPalmer"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "67e8d36efa424574b944e1d78bb2d22f636fb565",
          "message": "chore(jsii-rosetta): export `GoVisitor` from index (#3579)\n\nExports the `GoVisitor` class to allow Go doc generation\nprogramatically.\n\nFixes: #3552\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-06-07T22:24:05Z",
          "tree_id": "6d4a03b2428cae4950ef86632e8d2d1ab76cbad9",
          "url": "https://github.com/aws/jsii/commit/67e8d36efa424574b944e1d78bb2d22f636fb565"
        },
        "date": 1654641658509,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 65628.914501,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 65628.914501 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "06a7889514cb0939f5b8224f8961e6d578ea3986",
          "message": "chore: drop support for Node 12 (#3547)\n\nUpgrade the minimal required node release to 14.x, since Node 12 has\r\nbeen end-of-life since `2022-04-01`. This allows us to upgrade our\r\nTypeScript `target` from `ES2019` to `ES2020` (native support for\r\nnullish-coalescing and optional chaining, among other things).\r\n\r\nRemoved the `node12` entries from the various test matrices and stop\r\npublishing `node12` tags for `jsii/superchain`.\r\n\r\nBREAKING CHANGE: Beginning with this release, jsii packages no longer\r\nsupport node 12. Users should migrate to a supported node release (14.x,\r\n16.x, or 18.x).",
          "timestamp": "2022-06-08T14:11:38+02:00",
          "tree_id": "fe140c0693b8476a0c1fd92adae04149c7ea38f6",
          "url": "https://github.com/aws/jsii/commit/06a7889514cb0939f5b8224f8961e6d578ea3986"
        },
        "date": 1654691476403,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 110302.076057,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 110302.076057 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "a7dc294a11c7667f5bb54216da52a62f00e3daeb",
          "message": "chore(deps-dev): Update mkdocs-material requirement from ~=8.2.16 to ~=8.3.3 in /gh-pages (#3581)\n\nUpdates the requirements on [mkdocs-material](https://github.com/squidfunk/mkdocs-material) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/releases\">mkdocs-material's releases</a>.</em></p>\n<blockquote>\n<h2>mkdocs-material-8.3.3</h2>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4000\">#4000</a>: Mermaid diagrams too dark in dark mode (8.3.0 regression)</li>\n</ul>\n</blockquote>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/blob/master/CHANGELOG\">mkdocs-material's changelog</a>.</em></p>\n<blockquote>\n<p>mkdocs-material-8.3.3 (2022-06-07)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4000\">#4000</a>: Mermaid diagrams too dark in dark mode (8.3.0 regression)</li>\n</ul>\n<p>mkdocs-material-8.3.2+insiders-4.17.2 (2022-06-05)</p>\n<ul>\n<li>Added support for custom jieba dictionaries (Chinese search)</li>\n</ul>\n<p>mkdocs-material-8.3.2+insiders-4.17.1 (2022-06-05)</p>\n<ul>\n<li>Added support for cookie consent reject button</li>\n<li>Added support for cookie consent custom button ordering</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3988\">#3988</a>: Content tab not focused after alternating anchor links</li>\n</ul>\n<p>mkdocs-material-8.3.2 (2022-06-05)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3987\">#3987</a>: Custom admonition icons don't work when defining color palette</li>\n</ul>\n<p>mkdocs-material-8.3.1+insiders-4.17.0 (2022-06-04)</p>\n<ul>\n<li>Added support for content tabs anchor links (deep linking)</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3975\">#3975</a>: Detect composition events in search interface (Chinese)</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3980\">#3980</a>: Search plugin doesn't use title set via front matter</li>\n</ul>\n<p>mkdocs-material-8.3.1 (2022-06-04)</p>\n<ul>\n<li>Bump required Jinja version to 3.0.2</li>\n<li>Removed unnecessary conditions in templates</li>\n<li>Fixed scroll offset when content tabs are brought into view</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3977\">#3977</a>: Content tabs snapping oddly in Firefox</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3983\">#3983</a>: Missing condition in footer partial (8.3.0 regression)</li>\n</ul>\n<p>mkdocs-material-8.3.0 (2022-06-02)</p>\n<ul>\n<li>Added support for custom admonition icons</li>\n<li>Added support for linking of content tabs</li>\n<li>Added support for boosting pages in search</li>\n<li>Added support for hiding footer navigation</li>\n<li>Added previous/next indicators to content tabs</li>\n<li>Improved typeset link colors in light and dark modes</li>\n</ul>\n<p>mkdocs-material-8.2.16+insiders-4.16.2 (2022-05-28)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3961\">#3961</a>: Nested sections triggered build error for navigation tabs</li>\n</ul>\n<p>mkdocs-material-8.2.16+insiders-4.16.1 (2022-05-28)</p>\n<ul>\n<li>Switched feedback widget rating titles to tooltips</li>\n<li>Improved contrast of link colors for light/dark color schemes</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3950\">#3950</a>: Sticky navigation tabs rendering broken (4.15.2 regression)</li>\n</ul>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/e35efbb4f3497c8e002e6d277330488747f57b1d\"><code>e35efbb</code></a> Prepare 8.3.3 release</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/5c481255d3fe9f882a7fea8463ea9b70eafd7f0a\"><code>5c48125</code></a> Updated dependencies</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/26010be27a08e00c9b00ee79a45cb571c9941bc7\"><code>26010be</code></a> Fixed Mermaid.js styles for dark mode (8.3.0 regression)</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/08f38332448fa954a44c0bf42e2e3f423d865912\"><code>08f3833</code></a> Documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/0fce9a0d9ec9ca6d51e551c38f49f154ee0be8d2\"><code>0fce9a0</code></a> Documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/1c957e0f56ff9d9186db6955c2bf1889ae828620\"><code>1c957e0</code></a> Updated schema.json</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/10859be3564899d196e8c99c0de3fdc8858d6a17\"><code>10859be</code></a> Documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/187711fa298bedc2d118906bc95883817baa9b01\"><code>187711f</code></a> Documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/df41b268fbe6b7520bef90402110343ad1f6e981\"><code>df41b26</code></a> Reworked cookie consent documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/ce0484e546846bddce1f90f9912b351de1a65d6c\"><code>ce0484e</code></a> Replaced hidden classes with hidden attributes</li>\n<li>Additional commits viewable in <a href=\"https://github.com/squidfunk/mkdocs-material/compare/8.2.16...8.3.3\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-06-08T12:57:45Z",
          "tree_id": "27035c31c1dbb8fe51a25cbece462d6c80daeb7d",
          "url": "https://github.com/aws/jsii/commit/a7dc294a11c7667f5bb54216da52a62f00e3daeb"
        },
        "date": 1654694135644,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 76568.7966,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 76568.7966 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "86998f05f96396a11ed27c4f3eb417f027e34f8b",
          "message": "chore(deps-dev): Bump mypy from 0.960 to 0.961 in /packages/jsii-pacmak/test/generated-code (#3578)\n\nBumps [mypy](https://github.com/python/mypy) from 0.960 to 0.961.\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/python/mypy/commit/89bdcfb8c658340dae70312c5b76b703838d8123\"><code>89bdcfb</code></a> Update version to 0.961</li>\n<li><a href=\"https://github.com/python/mypy/commit/154ac75150c9339b081218da08588ea01e9b9bc6\"><code>154ac75</code></a> Run dataclass plugin before checking type var bounds (<a href=\"https://github-redirect.dependabot.com/python/mypy/issues/12908\">#12908</a>)</li>\n<li><a href=\"https://github.com/python/mypy/commit/f649e2d400b53936c458f620ff112add6047316c\"><code>f649e2d</code></a> Fix crash with nested attrs class (<a href=\"https://github-redirect.dependabot.com/python/mypy/issues/12872\">#12872</a>)</li>\n<li><a href=\"https://github.com/python/mypy/commit/64e9c0d87a2da45162a89a53ed1b31bfe8b78795\"><code>64e9c0d</code></a> Update version to 0.961+dev</li>\n<li>See full diff in <a href=\"https://github.com/python/mypy/compare/v0.960...v0.961\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\n[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=mypy&package-manager=pip&previous-version=0.960&new-version=0.961)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-06-08T13:50:14Z",
          "tree_id": "17d7e4aedc60f07cf053ddcb865c2a9f85e41c0b",
          "url": "https://github.com/aws/jsii/commit/86998f05f96396a11ed27c4f3eb417f027e34f8b"
        },
        "date": 1654697232384,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 66234.719142,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 66234.719142 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "37929162+mergify[bot]@users.noreply.github.com",
            "name": "mergify[bot]",
            "username": "mergify[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ebcefe6799b053365d8eee635cd4b76836b0f2e7",
          "message": "chore(release): 1.60.0 (#3582)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/bump/1.60.0/CHANGELOG.md)",
          "timestamp": "2022-06-08T13:55:01Z",
          "tree_id": "a6f31536b4d7865bb7791a5793b5c6b04d619155",
          "url": "https://github.com/aws/jsii/commit/ebcefe6799b053365d8eee635cd4b76836b0f2e7"
        },
        "date": 1654697593461,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 79127.390213,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 79127.390213 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "37929162+mergify[bot]@users.noreply.github.com",
            "name": "mergify[bot]",
            "username": "mergify[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "1ef3747231af7adf42ead037e95c4f0b6c2d9047",
          "message": "chore(merge-back): 1.60.0 (#3584)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/merge-back/1.60.0/CHANGELOG.md)",
          "timestamp": "2022-06-08T19:11:43Z",
          "tree_id": "e9e2456affb00e554e6cceeb191980b8182fa3fd",
          "url": "https://github.com/aws/jsii/commit/1ef3747231af7adf42ead037e95c4f0b6c2d9047"
        },
        "date": 1654716733675,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 86662.932948,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 86662.932948 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "de3fc03f085840610a7fca428d6aa39f6e934b00",
          "message": "chore(deps): Bump github.com/stretchr/testify from 1.7.1 to 1.7.2 in /packages/@jsii/go-runtime/jsii-runtime-go (#3575)\n\nBumps [github.com/stretchr/testify](https://github.com/stretchr/testify) from 1.7.1 to 1.7.2.\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/stretchr/testify/commit/41453c009af9a942261b7a25a88521d0d6804e7f\"><code>41453c0</code></a> Update gopkg.in/yaml.v3</li>\n<li><a href=\"https://github.com/stretchr/testify/commit/285adcc5ced0bb267a7c874cfa3ca238266ce14f\"><code>285adcc</code></a> Update go versions in build matrix</li>\n<li><a href=\"https://github.com/stretchr/testify/commit/6e7fab43fc3294f4e7c079e260746edcf8d66639\"><code>6e7fab4</code></a> Bump actions/setup-go from 2 to 3.1.0</li>\n<li><a href=\"https://github.com/stretchr/testify/commit/106ec21d14df07d4c33ec1155328800300c28c7f\"><code>106ec21</code></a> use RWMutex</li>\n<li><a href=\"https://github.com/stretchr/testify/commit/a409ccf19e17d8a90156521ce71c5e8ef8f6bca8\"><code>a409ccf</code></a> fix data race in the suit</li>\n<li><a href=\"https://github.com/stretchr/testify/commit/35864782d21250c3ff66874e87e5fdc9c79e0be1\"><code>3586478</code></a> assert: fix typo</li>\n<li><a href=\"https://github.com/stretchr/testify/commit/77977386932ab1866a4b9556a7af1ae347531786\"><code>7797738</code></a> Update versions supported to include <code>go 1.16</code></li>\n<li>See full diff in <a href=\"https://github.com/stretchr/testify/compare/v1.7.1...v1.7.2\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\n[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=github.com/stretchr/testify&package-manager=go_modules&previous-version=1.7.1&new-version=1.7.2)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-06-09T10:12:50Z",
          "tree_id": "6260c1d637c92755a8220bc0b98fb96a7e074428",
          "url": "https://github.com/aws/jsii/commit/de3fc03f085840610a7fca428d6aa39f6e934b00"
        },
        "date": 1654770680900,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 77938.341484,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 77938.341484 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "a1582bf7d9cc4081dd89e51efb4b3bc76b6e407e",
          "message": "fix: @jsii/check-node crashes on loading with older node releases (#3588)",
          "timestamp": "2022-06-09T14:00:28+02:00",
          "tree_id": "bbcda34a7593db252d18fe1f9729a26638aaf450",
          "url": "https://github.com/aws/jsii/commit/a1582bf7d9cc4081dd89e51efb4b3bc76b6e407e"
        },
        "date": 1654777337702,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 64722.55452,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 64722.55452 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "2799dc8d5336f4fc359caed8a5c9b21ce3ecef6a",
          "message": "chore(release): v1.60.1  (#3590)\n\nSee CHANGELOG.\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-06-09T13:28:31Z",
          "tree_id": "92c781c0d5b05c2172c7d9baf895ec43d6743c26",
          "url": "https://github.com/aws/jsii/commit/2799dc8d5336f4fc359caed8a5c9b21ce3ecef6a"
        },
        "date": 1654782239825,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 64741.733499,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 64741.733499 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "37929162+mergify[bot]@users.noreply.github.com",
            "name": "mergify[bot]",
            "username": "mergify[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "066788f222a54c25a5144cbce25268d24681ad26",
          "message": "chore(merge-back): 1.60.1 (#3591)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/merge-back/1.60.1/CHANGELOG.md)",
          "timestamp": "2022-06-09T16:40:32Z",
          "tree_id": "47eb7535cb6a46f48dc8c234f7bde640f4763057",
          "url": "https://github.com/aws/jsii/commit/066788f222a54c25a5144cbce25268d24681ad26"
        },
        "date": 1654793861671,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 67677.601671,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 67677.601671 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "vous.trouvez.le.bonheur@gmail.com",
            "name": "Takahiro Sugiura",
            "username": "touchez-du-bois"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "f754baa81f78cce2f269732272fe305f6b34ca86",
          "message": "fix: italics in Markdown notation (#3594)\n\nFix italics in Markdown notation\r\n\r\nCo-authored-by: 🧑🏻‍💻 Romain Marcadier <rmuller@amazon.com>",
          "timestamp": "2022-06-13T15:40:34+02:00",
          "tree_id": "6c105dbc6b875099ddbb37e1b869dd146a6bd856",
          "url": "https://github.com/aws/jsii/commit/f754baa81f78cce2f269732272fe305f6b34ca86"
        },
        "date": 1655128713258,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 65575.993065,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 65575.993065 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "43080478+aws-cdk-automation@users.noreply.github.com",
            "name": "AWS CDK Automation",
            "username": "aws-cdk-automation"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "3052275e2eb2152aa2627642f4e725b203a4b343",
          "message": "chore: npm-check-updates && yarn upgrade (#3583)\n\nRan npm-check-updates and yarn upgrade to keep the `yarn.lock` file up-to-date.\r\n\r\nCo-authored-by: AWS CDK Automation <aws-cdk-automation@users.noreply.github.com>",
          "timestamp": "2022-06-13T15:49:54+02:00",
          "tree_id": "5222ea49bd777a6f0593b1c8227abbdbc31b64fb",
          "url": "https://github.com/aws/jsii/commit/3052275e2eb2152aa2627642f4e725b203a4b343"
        },
        "date": 1655129257388,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 77302.763243,
            "unit": "milliseconds",
            "range": 0,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 77302.763243 milliseconds over 1 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "mitchellvaline@yahoo.com",
            "name": "Mitchell Valine",
            "username": "MrArnoldPalmer"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "3827d93d7a1c1c83247a79647e84a56c2b5e321a",
          "message": "fix: instantiate perf observer for each iteration (#3585)\n\nChanges to instantiate a `PerformanceObserver` instance for each\niteration of a benchmark run. This prevents the observer from being\nkilled before all iterations of the wrapped function run due to\nenvironment changes that may cause the observer from falling out of\nscope and being GCed. Previously in github actions only a single run's\nresults were recorded as the observer was killed after the first\niteration, though this wasn't the case when running locally.\n\nAdditionally adds the option to record profiles for benchmarks and write\nthem to a directory. This can be used to compare call stacks of\nbenchmarks across changes to the code.\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-06-13T14:37:31Z",
          "tree_id": "06b8f74743bae9fca4ac7b769560058517bdf136",
          "url": "https://github.com/aws/jsii/commit/3827d93d7a1c1c83247a79647e84a56c2b5e321a"
        },
        "date": 1655132220180,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 65405.607872,
            "unit": "milliseconds",
            "range": 4678.737964,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 65405.607872 milliseconds over 5 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "51220968+agdimech@users.noreply.github.com",
            "name": "Adrian Dimech",
            "username": "agdimech"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "0003c8a22dd44a2c89fcc117e1b1064b221aacfe",
          "message": "feat: add support for using custom .m2 directory (#3573)\n\nThe existing Java packaging process uses a localRepository which points to a newly created tmp directory. This means that when building, all dependencies need to be freshly downloaded which is contributing a significant portion of time to the packaging process.\n\nThis PR provides the option to the user (hidden) to use a non-transient .m2 local repository if they so choose. I have experienced a huge improvement to performance by enabling this setting (5s with enabled vs 4 minutes using defaults).\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-06-13T15:24:46Z",
          "tree_id": "2de4bf060f382c46719d979a6eb59e2acb633b67",
          "url": "https://github.com/aws/jsii/commit/0003c8a22dd44a2c89fcc117e1b1064b221aacfe"
        },
        "date": 1655135124278,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 83195.57455520002,
            "unit": "milliseconds",
            "range": 5755.260330999998,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 83195.57455520002 milliseconds over 5 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "21316aa39a871d85da2f8cb1bc9e402d91e59a07",
          "message": "chore(deps): Bump golang.org/x/tools from 0.1.10 to 0.1.11 in /packages/@jsii/go-runtime (#3593)\n\nBumps [golang.org/x/tools](https://github.com/golang/tools) from 0.1.10 to 0.1.11.\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/golang/tools/commit/1d19788894f308098139d81ac980580298f45d6b\"><code>1d19788</code></a> internal/lsp/cache: always compute IsIntermediateTestVariant</li>\n<li><a href=\"https://github.com/golang/tools/commit/4a8620f6ba299c055abe8fd0fa64fb0871f3ed30\"><code>4a8620f</code></a> internal/lsp/cache: move metadata fields to a new metadataGraph type</li>\n<li><a href=\"https://github.com/golang/tools/commit/a3d129cecf0b0741cbd1f486c15e3accfaba03aa\"><code>a3d129c</code></a> internal/lsp/cache: extract module load errors when go.work is used</li>\n<li><a href=\"https://github.com/golang/tools/commit/6bfd3a440e1be26457f330f29597931576ad848b\"><code>6bfd3a4</code></a> Revert &quot;internal: temporarily disable tests so we can land CL 410955&quot;</li>\n<li><a href=\"https://github.com/golang/tools/commit/5ca4cc8b9a248cff0a36b2a0ec82adf418c46ea9\"><code>5ca4cc8</code></a> internal: temporarily disable tests so we can land CL 410955</li>\n<li><a href=\"https://github.com/golang/tools/commit/63dfc2d3a9c936e6c11ef46dc4b4a899ea7e1e70\"><code>63dfc2d</code></a> internal/lsp/cache: two minor optimizations</li>\n<li><a href=\"https://github.com/golang/tools/commit/030812f079b6d1a4b08ff6a26eb6455a27221910\"><code>030812f</code></a> internal: remove unneeded FileSets</li>\n<li><a href=\"https://github.com/golang/tools/commit/2417911076f3ac2430f93d4da99e72fea721129a\"><code>2417911</code></a> go/analysis/internal/checker: add -test flag for single/multi-checkers</li>\n<li><a href=\"https://github.com/golang/tools/commit/43cce678a1932ffe0f15982da862f7e775426889\"><code>43cce67</code></a> go/analysis: document need for deterministic Fact encoding</li>\n<li><a href=\"https://github.com/golang/tools/commit/af82757ce06909d72478bb74408412eb3ed4828a\"><code>af82757</code></a> cmd/callgraph: add test of -algo=vta</li>\n<li>Additional commits viewable in <a href=\"https://github.com/golang/tools/compare/v0.1.10...v0.1.11\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\n[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=golang.org/x/tools&package-manager=go_modules&previous-version=0.1.10&new-version=0.1.11)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\nDependabot will merge this PR once CI passes on it, as requested by @RomainMuller.\n\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-06-13T16:21:43Z",
          "tree_id": "1c4cc20ace7255c2907495f5a47ba025992cdaa6",
          "url": "https://github.com/aws/jsii/commit/21316aa39a871d85da2f8cb1bc9e402d91e59a07"
        },
        "date": 1655138475037,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 90853.0797038,
            "unit": "milliseconds",
            "range": 7211.500115999996,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 90853.0797038 milliseconds over 5 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "366baa450ea1ce1556558baea22d58df06231024",
          "message": "chore(deps): Bump actions/setup-python from 3 to 4 (#3587)\n\nBumps [actions/setup-python](https://github.com/actions/setup-python) from 3 to 4.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/actions/setup-python/releases\">actions/setup-python's releases</a>.</em></p>\n<blockquote>\n<h2>v4.0.0</h2>\n<h3>What's Changed</h3>\n<ul>\n<li>Support for <code>python-version-file</code> input: <a href=\"https://github-redirect.dependabot.com/actions/setup-python/issues/336\">#336</a></li>\n</ul>\n<p>Example of usage:</p>\n<pre lang=\"yaml\"><code>- uses: actions/setup-python@v4\n  with:\n    python-version-file: '.python-version' # Read python version from a file\n- run: python my_script.py\n</code></pre>\n<p>There is no default python version for this <code>setup-python</code> major version, the action requires to specify either <code>python-version</code> input or <code>python-version-file</code> input. If the <code>python-version</code> input is not specified the action will try to read required version from file from <code>python-version-file</code> input.</p>\n<ul>\n<li>Use pypyX.Y for PyPy <code>python-version</code> input: <a href=\"https://github-redirect.dependabot.com/actions/setup-python/issues/349\">#349</a></li>\n</ul>\n<p>Example of usage:</p>\n<pre lang=\"yaml\"><code>- uses: actions/setup-python@v4\n  with:\n    python-version: 'pypy3.9' # pypy-X.Y kept for backward compatibility\n- run: python my_script.py\n</code></pre>\n<ul>\n<li>\n<p><code>RUNNER_TOOL_CACHE</code> environment variable is equal <code>AGENT_TOOLSDIRECTORY</code>: <a href=\"https://github-redirect.dependabot.com/actions/setup-python/issues/338\">#338</a></p>\n</li>\n<li>\n<p>Bugfix: create missing <code>pypyX.Y</code> symlinks: <a href=\"https://github-redirect.dependabot.com/actions/setup-python/issues/347\">#347</a></p>\n</li>\n<li>\n<p><code>PKG_CONFIG_PATH</code> environment variable: <a href=\"https://github-redirect.dependabot.com/actions/setup-python/issues/400\">#400</a></p>\n</li>\n<li>\n<p>Added <code>python-path</code> output: <a href=\"https://github-redirect.dependabot.com/actions/setup-python/issues/405\">#405</a>\n<code>python-path</code> output contains Python executable path.</p>\n</li>\n<li>\n<p>Updated <code>zeit/ncc</code> to <code>vercel/ncc</code> package: <a href=\"https://github-redirect.dependabot.com/actions/setup-python/issues/393\">#393</a></p>\n</li>\n<li>\n<p>Bugfix: fixed output for prerelease version of poetry: <a href=\"https://github-redirect.dependabot.com/actions/setup-python/issues/409\">#409</a></p>\n</li>\n<li>\n<p>Made <code>pythonLocation</code> environment variable consistent for Python and PyPy: <a href=\"https://github-redirect.dependabot.com/actions/setup-python/issues/418\">#418</a></p>\n</li>\n<li>\n<p>Bugfix for <code>3.x-dev</code> syntax: <a href=\"https://github-redirect.dependabot.com/actions/setup-python/issues/417\">#417</a></p>\n</li>\n<li>\n<p>Other improvements: <a href=\"https://github-redirect.dependabot.com/actions/setup-python/issues/318\">#318</a> <a href=\"https://github-redirect.dependabot.com/actions/setup-python/issues/396\">#396</a> <a href=\"https://github-redirect.dependabot.com/actions/setup-python/issues/384\">#384</a> <a href=\"https://github-redirect.dependabot.com/actions/setup-python/issues/387\">#387</a> <a href=\"https://github-redirect.dependabot.com/actions/setup-python/issues/388\">#388</a></p>\n</li>\n</ul>\n<h2>Update actions/cache version to 2.0.2</h2>\n<p>In scope of this release we updated <code>actions/cache</code> package as the new version contains fixes related to GHES 3.5 (<a href=\"https://github-redirect.dependabot.com/actions/setup-python/pull/382\">actions/setup-python#382</a>)</p>\n<h2>Add &quot;cache-hit&quot; output and fix &quot;python-version&quot; output for PyPy</h2>\n<p>This release introduces new output cache-hit (<a href=\"https://github-redirect.dependabot.com/actions/setup-python/pull/373\">actions/setup-python#373</a>) and fix python-version output for PyPy (<a href=\"https://github-redirect.dependabot.com/actions/setup-python/pull/365\">actions/setup-python#365</a>)</p>\n<p>The cache-hit output contains boolean value indicating that an exact match was found for the key. It shows that the action uses already existing cache or not. The output is available only if cache is enabled.</p>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/actions/setup-python/commit/d09bd5e6005b175076f227b13d9730d56e9dcfcb\"><code>d09bd5e</code></a> fix: 3.x-dev can install a 3.y version (<a href=\"https://github-redirect.dependabot.com/actions/setup-python/issues/417\">#417</a>)</li>\n<li><a href=\"https://github.com/actions/setup-python/commit/f72db171abf897c3f4cea0427d5af95fa57fb1bc\"><code>f72db17</code></a> Made env.var pythonLocation consistent for Python and PyPy (<a href=\"https://github-redirect.dependabot.com/actions/setup-python/issues/418\">#418</a>)</li>\n<li><a href=\"https://github.com/actions/setup-python/commit/53e15292cd6a522cb460037b6f031eadbd6f6920\"><code>53e1529</code></a> add support for python-version-file (<a href=\"https://github-redirect.dependabot.com/actions/setup-python/issues/336\">#336</a>)</li>\n<li><a href=\"https://github.com/actions/setup-python/commit/3f82819745be54edd3bd8a83639605e58826bfe9\"><code>3f82819</code></a> Fix output for prerelease version of poetry (<a href=\"https://github-redirect.dependabot.com/actions/setup-python/issues/409\">#409</a>)</li>\n<li><a href=\"https://github.com/actions/setup-python/commit/397252c5825684a4ffed92b79e0d840c618c0a93\"><code>397252c</code></a> Update zeit/ncc to vercel/ncc (<a href=\"https://github-redirect.dependabot.com/actions/setup-python/issues/393\">#393</a>)</li>\n<li><a href=\"https://github.com/actions/setup-python/commit/de977ad1321ff211fd43f0f232a4d8851726d4bb\"><code>de977ad</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/actions/setup-python/issues/412\">#412</a> from vsafonkin/v-vsafonkin/fix-poetry-cache-test</li>\n<li><a href=\"https://github.com/actions/setup-python/commit/22c6af91ce03997c5925db1f6e9f0b9b2364adcc\"><code>22c6af9</code></a> Change PyPy version to rebuild cache</li>\n<li><a href=\"https://github.com/actions/setup-python/commit/081a3cf1a51ab5fff2ae9d70f0cfacf0686293ea\"><code>081a3cf</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/actions/setup-python/issues/405\">#405</a> from mayeut/interpreter-path</li>\n<li><a href=\"https://github.com/actions/setup-python/commit/ff706563d754e642609a7008f4568a5386f3e94c\"><code>ff70656</code></a> feature: add a <code>python-path</code> output</li>\n<li><a href=\"https://github.com/actions/setup-python/commit/fff15a21cc8b16191cb1249f621fa3a55b9005b8\"><code>fff15a2</code></a> Use pypyX.Y for PyPy python-version input (<a href=\"https://github-redirect.dependabot.com/actions/setup-python/issues/349\">#349</a>)</li>\n<li>Additional commits viewable in <a href=\"https://github.com/actions/setup-python/compare/v3...v4\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\n[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=actions/setup-python&package-manager=github_actions&previous-version=3&new-version=4)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\nDependabot will merge this PR once CI passes on it, as requested by @RomainMuller.\n\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-06-13T17:06:55Z",
          "tree_id": "929810191939e80fe59faa83a2e31672fc64715c",
          "url": "https://github.com/aws/jsii/commit/366baa450ea1ce1556558baea22d58df06231024"
        },
        "date": 1655141184423,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 72952.73981479999,
            "unit": "milliseconds",
            "range": 5564.423028999998,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 72952.73981479999 milliseconds over 5 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "1b846de57f5259253d6cc1a27a7d0ee1c0577173",
          "message": "chore(deps-dev): Update mkdocs-material requirement from ~=8.3.3 to ~=8.3.4 in /gh-pages (#3595)\n\nUpdates the requirements on [mkdocs-material](https://github.com/squidfunk/mkdocs-material) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/releases\">mkdocs-material's releases</a>.</em></p>\n<blockquote>\n<h2>mkdocs-material-8.3.4</h2>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4004\">#4004</a>: Tags with multiple words not searchable</li>\n</ul>\n</blockquote>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/blob/master/CHANGELOG\">mkdocs-material's changelog</a>.</em></p>\n<blockquote>\n<p>mkdocs-material-8.3.4+insiders-4.18.0 (2022-06-11)</p>\n<ul>\n<li>Added support for automatic dark/light mode</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4009\">#4009</a>: Privacy plugin uses invalid paths for file cache on Windows</li>\n</ul>\n<p>mkdocs-material-8.3.4 (2022-06-11)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4004\">#4004</a>: Tags with multiple words not searchable</li>\n</ul>\n<p>mkdocs-material-8.3.3 (2022-06-07)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4000\">#4000</a>: Mermaid diagrams too dark in dark mode (8.3.0 regression)</li>\n</ul>\n<p>mkdocs-material-8.3.2+insiders-4.17.2 (2022-06-05)</p>\n<ul>\n<li>Added support for custom jieba dictionaries (Chinese search)</li>\n</ul>\n<p>mkdocs-material-8.3.2+insiders-4.17.1 (2022-06-05)</p>\n<ul>\n<li>Added support for cookie consent reject button</li>\n<li>Added support for cookie consent custom button ordering</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3988\">#3988</a>: Content tab not focused after alternating anchor links</li>\n</ul>\n<p>mkdocs-material-8.3.2 (2022-06-05)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3987\">#3987</a>: Custom admonition icons don't work when defining color palette</li>\n</ul>\n<p>mkdocs-material-8.3.1+insiders-4.17.0 (2022-06-04)</p>\n<ul>\n<li>Added support for content tabs anchor links (deep linking)</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3975\">#3975</a>: Detect composition events in search interface (Chinese)</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3980\">#3980</a>: Search plugin doesn't use title set via front matter</li>\n</ul>\n<p>mkdocs-material-8.3.1 (2022-06-04)</p>\n<ul>\n<li>Bump required Jinja version to 3.0.2</li>\n<li>Removed unnecessary conditions in templates</li>\n<li>Fixed scroll offset when content tabs are brought into view</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3977\">#3977</a>: Content tabs snapping oddly in Firefox</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3983\">#3983</a>: Missing condition in footer partial (8.3.0 regression)</li>\n</ul>\n<p>mkdocs-material-8.3.0 (2022-06-02)</p>\n<ul>\n<li>Added support for custom admonition icons</li>\n<li>Added support for linking of content tabs</li>\n<li>Added support for boosting pages in search</li>\n<li>Added support for hiding footer navigation</li>\n<li>Added previous/next indicators to content tabs</li>\n<li>Improved typeset link colors in light and dark modes</li>\n</ul>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/2d132ba544898855500e9c001506c4226cbcbd38\"><code>2d132ba</code></a> Prepare 8.3.4 release</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/492d3d3141caff52b9216490414574aa81babe1d\"><code>492d3d3</code></a> Merge branch 'master' of github.com:squidfunk/mkdocs-material</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/d140acf21948962b69fc8fd8f3f408f4b82f0983\"><code>d140acf</code></a> Removed schema for mdpo-plugin due to hacked domain</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/a80b8b7ccd0e41d2cb73d2270fd4d5320c37d50c\"><code>a80b8b7</code></a> Documentation (<a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4010\">#4010</a>)</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/148a7fdc8c4143f35e9f889a897c5329a266d299\"><code>148a7fd</code></a> Added World Wide Technology to premium sponsors</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/cfe83ccbbaf8ac33d39187b289ec61cd0a349cb5\"><code>cfe83cc</code></a> Fixed search indexing of multi-word tags</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/ff9e41f329c2878eecbe89a885d749e9756af171\"><code>ff9e41f</code></a> Fixed linter errors</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/b7032b5476a08533c3779c1ce96310f556d97d9a\"><code>b7032b5</code></a> Updated dependencies</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/c0389d858d2ac1f19139007a2cc76711882a727e\"><code>c0389d8</code></a> Added Dogado to premium sponsors</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/b0fa1ac5ade3fd1b53d56d264e9d3a4339373c88\"><code>b0fa1ac</code></a> Fixed linter errors</li>\n<li>See full diff in <a href=\"https://github.com/squidfunk/mkdocs-material/compare/8.3.3...8.3.4\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\nDependabot will merge this PR once CI passes on it, as requested by @RomainMuller.\n\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-06-13T17:54:22Z",
          "tree_id": "26345281dcd79ae24a611e5d870329eb3bac6b86",
          "url": "https://github.com/aws/jsii/commit/1b846de57f5259253d6cc1a27a7d0ee1c0577173"
        },
        "date": 1655144023120,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 61186.467203600005,
            "unit": "milliseconds",
            "range": 5955.449013999998,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 61186.467203600005 milliseconds over 5 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "1b846de57f5259253d6cc1a27a7d0ee1c0577173",
          "message": "chore(deps-dev): Update mkdocs-material requirement from ~=8.3.3 to ~=8.3.4 in /gh-pages (#3595)\n\nUpdates the requirements on [mkdocs-material](https://github.com/squidfunk/mkdocs-material) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/releases\">mkdocs-material's releases</a>.</em></p>\n<blockquote>\n<h2>mkdocs-material-8.3.4</h2>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4004\">#4004</a>: Tags with multiple words not searchable</li>\n</ul>\n</blockquote>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/blob/master/CHANGELOG\">mkdocs-material's changelog</a>.</em></p>\n<blockquote>\n<p>mkdocs-material-8.3.4+insiders-4.18.0 (2022-06-11)</p>\n<ul>\n<li>Added support for automatic dark/light mode</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4009\">#4009</a>: Privacy plugin uses invalid paths for file cache on Windows</li>\n</ul>\n<p>mkdocs-material-8.3.4 (2022-06-11)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4004\">#4004</a>: Tags with multiple words not searchable</li>\n</ul>\n<p>mkdocs-material-8.3.3 (2022-06-07)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4000\">#4000</a>: Mermaid diagrams too dark in dark mode (8.3.0 regression)</li>\n</ul>\n<p>mkdocs-material-8.3.2+insiders-4.17.2 (2022-06-05)</p>\n<ul>\n<li>Added support for custom jieba dictionaries (Chinese search)</li>\n</ul>\n<p>mkdocs-material-8.3.2+insiders-4.17.1 (2022-06-05)</p>\n<ul>\n<li>Added support for cookie consent reject button</li>\n<li>Added support for cookie consent custom button ordering</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3988\">#3988</a>: Content tab not focused after alternating anchor links</li>\n</ul>\n<p>mkdocs-material-8.3.2 (2022-06-05)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3987\">#3987</a>: Custom admonition icons don't work when defining color palette</li>\n</ul>\n<p>mkdocs-material-8.3.1+insiders-4.17.0 (2022-06-04)</p>\n<ul>\n<li>Added support for content tabs anchor links (deep linking)</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3975\">#3975</a>: Detect composition events in search interface (Chinese)</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3980\">#3980</a>: Search plugin doesn't use title set via front matter</li>\n</ul>\n<p>mkdocs-material-8.3.1 (2022-06-04)</p>\n<ul>\n<li>Bump required Jinja version to 3.0.2</li>\n<li>Removed unnecessary conditions in templates</li>\n<li>Fixed scroll offset when content tabs are brought into view</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3977\">#3977</a>: Content tabs snapping oddly in Firefox</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3983\">#3983</a>: Missing condition in footer partial (8.3.0 regression)</li>\n</ul>\n<p>mkdocs-material-8.3.0 (2022-06-02)</p>\n<ul>\n<li>Added support for custom admonition icons</li>\n<li>Added support for linking of content tabs</li>\n<li>Added support for boosting pages in search</li>\n<li>Added support for hiding footer navigation</li>\n<li>Added previous/next indicators to content tabs</li>\n<li>Improved typeset link colors in light and dark modes</li>\n</ul>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/2d132ba544898855500e9c001506c4226cbcbd38\"><code>2d132ba</code></a> Prepare 8.3.4 release</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/492d3d3141caff52b9216490414574aa81babe1d\"><code>492d3d3</code></a> Merge branch 'master' of github.com:squidfunk/mkdocs-material</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/d140acf21948962b69fc8fd8f3f408f4b82f0983\"><code>d140acf</code></a> Removed schema for mdpo-plugin due to hacked domain</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/a80b8b7ccd0e41d2cb73d2270fd4d5320c37d50c\"><code>a80b8b7</code></a> Documentation (<a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4010\">#4010</a>)</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/148a7fdc8c4143f35e9f889a897c5329a266d299\"><code>148a7fd</code></a> Added World Wide Technology to premium sponsors</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/cfe83ccbbaf8ac33d39187b289ec61cd0a349cb5\"><code>cfe83cc</code></a> Fixed search indexing of multi-word tags</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/ff9e41f329c2878eecbe89a885d749e9756af171\"><code>ff9e41f</code></a> Fixed linter errors</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/b7032b5476a08533c3779c1ce96310f556d97d9a\"><code>b7032b5</code></a> Updated dependencies</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/c0389d858d2ac1f19139007a2cc76711882a727e\"><code>c0389d8</code></a> Added Dogado to premium sponsors</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/b0fa1ac5ade3fd1b53d56d264e9d3a4339373c88\"><code>b0fa1ac</code></a> Fixed linter errors</li>\n<li>See full diff in <a href=\"https://github.com/squidfunk/mkdocs-material/compare/8.3.3...8.3.4\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\nDependabot will merge this PR once CI passes on it, as requested by @RomainMuller.\n\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-06-13T17:54:22Z",
          "tree_id": "26345281dcd79ae24a611e5d870329eb3bac6b86",
          "url": "https://github.com/aws/jsii/commit/1b846de57f5259253d6cc1a27a7d0ee1c0577173"
        },
        "date": 1655147282830,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 60763.78911639999,
            "unit": "milliseconds",
            "range": 8306.689307,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 60763.78911639999 milliseconds over 5 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "41e2df35b88d84ca29adf1fb5ab2afffeaa76a17",
          "message": "chore: use fast-deep-equal instead of deep-equal (#3597)\n\nIt turns out `fast-deep-equal` is *significantly* faster than\n`deep-equal` and appears to produce consistent results. Migrating to\nthis allows us to yield faster compile times as `deepEqual` is\nfrequently used when resolving type union references.\n\nAlso de-duplicated a couple of calls to `Case.pascal`, which is also\na pretty significant time consumer (but `fast-case` is not iso-functional\nwith `case`, so this isn't as easy to replace as `deep-equal`).\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-06-14T15:52:04Z",
          "tree_id": "9d31c445f102b5c816a9fdc2bd4cef59d3b19882",
          "url": "https://github.com/aws/jsii/commit/41e2df35b88d84ca29adf1fb5ab2afffeaa76a17"
        },
        "date": 1655222982764,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 56971.023108199995,
            "unit": "milliseconds",
            "range": 6382.535283999998,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 56971.023108199995 milliseconds over 5 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "41e2df35b88d84ca29adf1fb5ab2afffeaa76a17",
          "message": "chore: use fast-deep-equal instead of deep-equal (#3597)\n\nIt turns out `fast-deep-equal` is *significantly* faster than\n`deep-equal` and appears to produce consistent results. Migrating to\nthis allows us to yield faster compile times as `deepEqual` is\nfrequently used when resolving type union references.\n\nAlso de-duplicated a couple of calls to `Case.pascal`, which is also\na pretty significant time consumer (but `fast-case` is not iso-functional\nwith `case`, so this isn't as easy to replace as `deep-equal`).\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-06-14T15:52:04Z",
          "tree_id": "9d31c445f102b5c816a9fdc2bd4cef59d3b19882",
          "url": "https://github.com/aws/jsii/commit/41e2df35b88d84ca29adf1fb5ab2afffeaa76a17"
        },
        "date": 1655226488779,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 81145.70220019999,
            "unit": "milliseconds",
            "range": 3903.107394000006,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 81145.70220019999 milliseconds over 5 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "2153d638504083a041581d79b8bca3bb1c0c6a72",
          "message": "chore: cache heavy elements in assemblyRelativeSourceFile (#3598)\n\nThe readFileSync calls there tend to process large JSON documents, which\nis time-consuming. Basic profiling showed this is called repeatedly with\nsimilar directories, so the time spent can be greatly reduced.\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-06-14T20:34:28Z",
          "tree_id": "5a261343f8d8a02473da24e663f43d06d7da99b4",
          "url": "https://github.com/aws/jsii/commit/2153d638504083a041581d79b8bca3bb1c0c6a72"
        },
        "date": 1655240766285,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 60214.15639685,
            "unit": "milliseconds",
            "range": 4733.19339,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 60214.15639685 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "e912ad54a5e011123e78ca4131831812eb74bae3",
          "message": "chore(superchain): update to Maven 3.8.6 (#3601)",
          "timestamp": "2022-06-15T10:16:28+02:00",
          "tree_id": "0aba8b5e025bd4f9fa383aaa3bec1767a84fb4d1",
          "url": "https://github.com/aws/jsii/commit/e912ad54a5e011123e78ca4131831812eb74bae3"
        },
        "date": 1655283619389,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 87260.50794435,
            "unit": "milliseconds",
            "range": 8883.621071000001,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 87260.50794435 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "epolon@amazon.com",
            "name": "Eli Polonsky",
            "username": "iliapolo"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "837f300daff24b1169d0bbfc44d50070944d2664",
          "message": "chore: switch dotnet feed to avoid CDN caching (#3604)\n\nThe current feed points to a CDN endpoint that may not include the latest version of the SDK.\n\nThis PR changes the feed to the one used by https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-install-script, which is the recommended way of installing the SDK in CI environments. \n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-06-15T18:28:20Z",
          "tree_id": "790eb9838ae93bc640109048afed92016bb6c07b",
          "url": "https://github.com/aws/jsii/commit/837f300daff24b1169d0bbfc44d50070944d2664"
        },
        "date": 1655319520692,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 54922.489037549996,
            "unit": "milliseconds",
            "range": 7181.586139999999,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 54922.489037549996 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "8e2eea65274b8543334313c4bfd9d361609e7667",
          "message": "chore(jsii): cache results of case conversions (#3602)\n\nThe `Case` library appears on top of the heavy weights when profiling\n`jsii` compilation runs on `aws-cdk-lib`, accounting for about `9.6%` of\nthe overall execution time (`6,712` out of `68,935` ms). This is quite\nsignificant.\n\nFaster libraries performing case conversions exist, however they do not\noffer the same level of functinoality that `Case` does, and often\nrequire knowing which casing the string is presently at, when `Case`\nperforms normalization before conversion (this likely explains why these\nconversions are somewhat expensive), which is convenient in our\nuse-case. It does not seem to be possible to replace `Case` with a\nfaster implementation, as there does not seem to be any.\n\nRunning a survey on the usage of all functions from `Case` being used\nduring usch a compilation resulted in the following results:\n\n```\nCase.camel: 1881755 cached out of 1893235 (99.39%) - 11480 entries / 164.9 hits per entry\nCase.pascal: 1890795 cached out of 1909959 (99.00%) - 19164 entries / 99.7 hits per entry\nCase.snake: 1882773 cached out of 1895359 (99.34%) - 12586 entries / 150.6 hits per entry\n```\n\nSince there is a cache hit rate of `99%` and entries are re-used `100`\ntimes each on average, it appears that adding a cache on those functions\nwill help alleviate that cost. Indeed, after making this change, `Case`\nis no longer present above the `100ms` mark in the list of heavy\nweights produced by the profiler.\n\nIn order to avoid possibly trading performance for out-of-memory errors,\nthe caches are keyed off of weak references, so that the caches can be\ngarbage collected when under memory pressure.\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-06-16T11:32:36Z",
          "tree_id": "d46315c512380e1ce89943b9c109ed0e04604b40",
          "url": "https://github.com/aws/jsii/commit/8e2eea65274b8543334313c4bfd9d361609e7667"
        },
        "date": 1655381246167,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 62077.02250055,
            "unit": "milliseconds",
            "range": 11694.340785,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 62077.02250055 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "43080478+aws-cdk-automation@users.noreply.github.com",
            "name": "AWS CDK Automation",
            "username": "aws-cdk-automation"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "c56db0cd38ef7f67236e3cbe324de593ae549788",
          "message": "chore: npm-check-updates && yarn upgrade (#3603)\n\nCo-authored-by: AWS CDK Automation <aws-cdk-automation@users.noreply.github.com>\r\nCo-authored-by: Romain Marcadier <rmuller@amazon.fr>",
          "timestamp": "2022-06-16T13:45:48+02:00",
          "tree_id": "04c4f2d8dbe19eed4eb9d94ccac2157085045f5f",
          "url": "https://github.com/aws/jsii/commit/c56db0cd38ef7f67236e3cbe324de593ae549788"
        },
        "date": 1655381845924,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 59049.0825308,
            "unit": "milliseconds",
            "range": 9577.006533,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 59049.0825308 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "735c5302f33348aac5c7c5758d53bdd74f4b47f0",
          "message": "chore: update layer cache last in workflow (#3606)",
          "timestamp": "2022-06-16T14:58:24+02:00",
          "tree_id": "4cdeb80e2c61723313ff9a666c9631bad1efa3dc",
          "url": "https://github.com/aws/jsii/commit/735c5302f33348aac5c7c5758d53bdd74f4b47f0"
        },
        "date": 1655385991048,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 49123.7722448,
            "unit": "milliseconds",
            "range": 6380.298078,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 49123.7722448 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "37929162+mergify[bot]@users.noreply.github.com",
            "name": "mergify[bot]",
            "username": "mergify[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "abf403986030707073c27e61d4e125e9f706b89a",
          "message": "chore(release): 1.61.0 (#3605)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/bump/1.61.0/CHANGELOG.md)",
          "timestamp": "2022-06-16T13:08:53Z",
          "tree_id": "cdbba6c8b12082d6fcdaff413d22c1cb4f190fe0",
          "url": "https://github.com/aws/jsii/commit/abf403986030707073c27e61d4e125e9f706b89a"
        },
        "date": 1655386715437,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 53222.16080305,
            "unit": "milliseconds",
            "range": 6905.236082999996,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 53222.16080305 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "vous.trouvez.le.bonheur@gmail.com",
            "name": "Takahiro Sugiura",
            "username": "touchez-du-bois"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "1762310ee59539d1dd604b639aae979ace5818af",
          "message": "fix: Status icon for Go language that it is generally available. (#3607)\n\nSince Go language  is generally available, change the status icon, too.\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-06-16T14:45:36Z",
          "tree_id": "575106e1762d25c0d15826dd5a994db49b6af31c",
          "url": "https://github.com/aws/jsii/commit/1762310ee59539d1dd604b639aae979ace5818af"
        },
        "date": 1655392593691,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 53568.50120409999,
            "unit": "milliseconds",
            "range": 6817.050961000001,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 53568.50120409999 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "37929162+mergify[bot]@users.noreply.github.com",
            "name": "mergify[bot]",
            "username": "mergify[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "c8c88a812370a0f7229886a4ea246ac5450330c6",
          "message": "chore(merge-back): 1.61.0 (#3608)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/merge-back/1.61.0/CHANGELOG.md)",
          "timestamp": "2022-06-16T16:21:34Z",
          "tree_id": "54f487d869a91da00a2b0594927eea2cc3484134",
          "url": "https://github.com/aws/jsii/commit/c8c88a812370a0f7229886a4ea246ac5450330c6"
        },
        "date": 1655398384146,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 51303.042456699986,
            "unit": "milliseconds",
            "range": 8569.700792000003,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 51303.042456699986 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "11394fbfe7d51ad1976e7e34ea98e1199fed55a0",
          "message": "chore: keep @jsii/kernel loadable with Node 12+ (#3596)\n\nThis is to ensure jsii runtimes are able to warn about unsupported Node releases (all the code is rolled up via webpack, and is hence loaded as a single file, so all of it needs to be valid ES2018 or else it won't load.\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-06-20T23:26:42Z",
          "tree_id": "5f023c5bee2ce5788c535b1192f59a9934378c89",
          "url": "https://github.com/aws/jsii/commit/11394fbfe7d51ad1976e7e34ea98e1199fed55a0"
        },
        "date": 1655769900106,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 71418.89251589999,
            "unit": "milliseconds",
            "range": 11731.742524000001,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 71418.89251589999 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "eltociear@gmail.com",
            "name": "Ikko Ashimine",
            "username": "eltociear"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "0b1ce2bc76818b4b65e99350743ed8d096e591a7",
          "message": "chore(python): fix typo in python.ts (#3613)",
          "timestamp": "2022-06-23T10:23:32+02:00",
          "tree_id": "0289d317993da4a6e3372e251e0e0525475c1d27",
          "url": "https://github.com/aws/jsii/commit/0b1ce2bc76818b4b65e99350743ed8d096e591a7"
        },
        "date": 1655974217798,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 43984.38717075001,
            "unit": "milliseconds",
            "range": 10020.201626999995,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 43984.38717075001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "606de78b226b426c8b7c18e779d0d623d8929bb8",
          "message": "chore(deps-dev): Update mkdocs-material requirement from ~=8.3.4 to ~=8.3.6 in /gh-pages (#3611)\n\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2022-06-23T10:24:13+02:00",
          "tree_id": "6cc406434fa26a3d61572e1868d61b081949cd44",
          "url": "https://github.com/aws/jsii/commit/606de78b226b426c8b7c18e779d0d623d8929bb8"
        },
        "date": 1655974689259,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 52034.3312662,
            "unit": "milliseconds",
            "range": 7488.438925000002,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 52034.3312662 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "2ee35a52771919b2d8bf988d57da82ee2a29b180",
          "message": "chore(deps): Bump github.com/stretchr/testify from 1.7.2 to 1.7.4 in /packages/@jsii/go-runtime/jsii-runtime-go (#3614)\n\nBumps [github.com/stretchr/testify](https://github.com/stretchr/testify) from 1.7.2 to 1.7.4.\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/stretchr/testify/commit/48391ba5eb8c5f49132138e67ec112d180b88f63\"><code>48391ba</code></a> Fix panic in AssertExpectations for mocks without expectations (<a href=\"https://github-redirect.dependabot.com/stretchr/testify/issues/1207\">#1207</a>)</li>\n<li><a href=\"https://github.com/stretchr/testify/commit/840cb801497147a6d30a568e0874dfefb10867a9\"><code>840cb80</code></a> arrays value types in a zero-initialized state are considered empty (<a href=\"https://github-redirect.dependabot.com/stretchr/testify/issues/1126\">#1126</a>)</li>\n<li><a href=\"https://github.com/stretchr/testify/commit/07dc7ee5abe6d1c0ef6449f731ca9bf08e1787f8\"><code>07dc7ee</code></a> Bump actions/setup-go from 3.1.0 to 3.2.0 (<a href=\"https://github-redirect.dependabot.com/stretchr/testify/issues/1191\">#1191</a>)</li>\n<li><a href=\"https://github.com/stretchr/testify/commit/c33fc8d30db6f6d2c5d270c5023eb0f2181bbab5\"><code>c33fc8d</code></a> Bump actions/checkout from 2 to 3 (<a href=\"https://github-redirect.dependabot.com/stretchr/testify/issues/1163\">#1163</a>)</li>\n<li><a href=\"https://github.com/stretchr/testify/commit/3c33e07c4c233bf61e1414f5acb3cda06ffef1d1\"><code>3c33e07</code></a> Added Go 1.18.1 as a build/supported version (<a href=\"https://github-redirect.dependabot.com/stretchr/testify/issues/1182\">#1182</a>)</li>\n<li><a href=\"https://github.com/stretchr/testify/commit/e2b56b3a384eb40136b2cff13e07e932dd95bf28\"><code>e2b56b3</code></a> Bump github.com/stretchr/objx from 0.1.0 to 0.4.0</li>\n<li>See full diff in <a href=\"https://github.com/stretchr/testify/compare/v1.7.2...v1.7.4\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\n[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=github.com/stretchr/testify&package-manager=go_modules&previous-version=1.7.2&new-version=1.7.4)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\nDependabot will merge this PR once CI passes on it, as requested by @RomainMuller.\n\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-06-23T10:02:20Z",
          "tree_id": "99b7a75152dc239d11bfc97776d3e7889bdceb17",
          "url": "https://github.com/aws/jsii/commit/2ee35a52771919b2d8bf988d57da82ee2a29b180"
        },
        "date": 1655980092468,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 45158.305222400006,
            "unit": "milliseconds",
            "range": 7878.162295999995,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 45158.305222400006 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "crybicki98@gmail.com",
            "name": "Christopher Rybicki",
            "username": "Chriscbr"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "00b165ef73fd2fb5797f0ee386c3b9f21c7626a1",
          "message": "chore(check-node): update Node 16 EOL date (#3618)",
          "timestamp": "2022-06-27T11:36:32+02:00",
          "tree_id": "9559173655395b5dd684b9b33db50fbbae645e15",
          "url": "https://github.com/aws/jsii/commit/00b165ef73fd2fb5797f0ee386c3b9f21c7626a1"
        },
        "date": 1656324469332,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 53412.92505480001,
            "unit": "milliseconds",
            "range": 7725.7282140000025,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 53412.92505480001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "vous.trouvez.le.bonheur@gmail.com",
            "name": "Takahiro Sugiura",
            "username": "touchez-du-bois"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "0a0b0f223f6d66c08edc97734ca01d6bc0661e32",
          "message": "chore(docs): typo in User guides (#3617)",
          "timestamp": "2022-06-27T11:37:42+02:00",
          "tree_id": "0929ec110063e13e4fa61f3fda33df7732e7d3ee",
          "url": "https://github.com/aws/jsii/commit/0a0b0f223f6d66c08edc97734ca01d6bc0661e32"
        },
        "date": 1656324876392,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 68827.15588155,
            "unit": "milliseconds",
            "range": 10030.236056999995,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 68827.15588155 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "6cb83eb751b933243b8174023737ed2808d5bf44",
          "message": "chore(deps): Bump github.com/stretchr/testify from 1.7.4 to 1.7.5 in /packages/@jsii/go-runtime/jsii-runtime-go (#3616)\n\nBumps [github.com/stretchr/testify](https://github.com/stretchr/testify) from 1.7.4 to 1.7.5.\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/stretchr/testify/commit/b5ce16571001d6e96e1693ac891fed5c2510c651\"><code>b5ce165</code></a> fixing panic in calls to assertion with nil m.mutex (<a href=\"https://github-redirect.dependabot.com/stretchr/testify/issues/1212\">#1212</a>)</li>\n<li><a href=\"https://github.com/stretchr/testify/commit/c206b2e823e70c1e4e7ca8eded9e410acc8f71be\"><code>c206b2e</code></a> Mock can be deadlocked by a panic (<a href=\"https://github-redirect.dependabot.com/stretchr/testify/issues/1157\">#1157</a>)</li>\n<li><a href=\"https://github.com/stretchr/testify/commit/1b73601ae8d1c3e389e93092f595b1f6e3d68251\"><code>1b73601</code></a> suite: correctly set stats on test panic (<a href=\"https://github-redirect.dependabot.com/stretchr/testify/issues/1195\">#1195</a>)</li>\n<li><a href=\"https://github.com/stretchr/testify/commit/ba1076d8b3b67cdaf7bf92c95b3641636a039be2\"><code>ba1076d</code></a> Add .Unset method to mock (<a href=\"https://github-redirect.dependabot.com/stretchr/testify/issues/982\">#982</a>)</li>\n<li><a href=\"https://github.com/stretchr/testify/commit/c31ea0312f8a96ca55801db5ebdf62119800fb70\"><code>c31ea03</code></a> Support comparing byte slice (<a href=\"https://github-redirect.dependabot.com/stretchr/testify/issues/1202\">#1202</a>)</li>\n<li>See full diff in <a href=\"https://github.com/stretchr/testify/compare/v1.7.4...v1.7.5\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\n[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=github.com/stretchr/testify&package-manager=go_modules&previous-version=1.7.4&new-version=1.7.5)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-06-27T10:42:54Z",
          "tree_id": "ed41ab18f33057eab9e3e44cb0698f33b1a03a15",
          "url": "https://github.com/aws/jsii/commit/6cb83eb751b933243b8174023737ed2808d5bf44"
        },
        "date": 1656328530872,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 63351.42698580001,
            "unit": "milliseconds",
            "range": 13263.712327999994,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 63351.42698580001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "28db6e3c7696da919b8cf3a3a99e22dd53fcedd9",
          "message": "fix(benchmark): compilation fails due to missing dependencies (#3610)\n\nAlso, adding a reference benchmark building the same code using the\nTypeScript compiler only.\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-06-27T14:52:45Z",
          "tree_id": "fb932f123c34cd203a0012a2fa1193ffeba77de0",
          "url": "https://github.com/aws/jsii/commit/28db6e3c7696da919b8cf3a3a99e22dd53fcedd9"
        },
        "date": 1656345794425,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 102729.93810015,
            "unit": "milliseconds",
            "range": 79072911.29679444,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 102729.93810015 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.21.1 (tsc)",
            "value": 69662.7095428,
            "unit": "milliseconds",
            "range": 4268790.182490392,
            "extra": "Compile aws-cdk-lib@v2.21.1 (tsc) averaged 69662.7095428 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "aa8568e119f57f29599d3292c060edf31e139429",
          "message": "chore(deps-dev): Update mkdocs-material requirement from ~=8.3.6 to ~=8.3.8 in /gh-pages (#3621)\n\nUpdates the requirements on [mkdocs-material](https://github.com/squidfunk/mkdocs-material) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/releases\">mkdocs-material's releases</a>.</em></p>\n<blockquote>\n<h2>mkdocs-material-8.3.8</h2>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4053\">#4053</a>: Limit width of videos to content area</li>\n<li>Fixed empty tags in front matter breaking search</li>\n</ul>\n</blockquote>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/blob/master/CHANGELOG\">mkdocs-material's changelog</a>.</em></p>\n<blockquote>\n<p>mkdocs-material-8.3.8+insiders-4.19.1 (2022-06-25)</p>\n<ul>\n<li>Added mkdocs-git-committers-plugin to Dockerfile</li>\n<li>Added mkdocs-git-revision-date-localized-plugin to Dockerfile</li>\n</ul>\n<p>mkdocs-material-8.3.8+insiders-4.19.0 (2022-06-24)</p>\n<ul>\n<li>Added support for document contributors</li>\n<li>Updated French translations for cookie consent</li>\n</ul>\n<p>mkdocs-material-8.3.8 (2022-06-24)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4053\">#4053</a>: Limit width of videos to content area</li>\n<li>Fixed empty tags in front matter breaking search</li>\n</ul>\n<p>mkdocs-material-8.3.7 (2022-06-22)</p>\n<ul>\n<li>Fixed search being stuck initializing when using tags (8.3.4 regression)</li>\n</ul>\n<p>mkdocs-material-8.3.6+insiders-4.18.2 (2022-06-16)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4026\">#4026</a>: Fixed tooltips not mounted for nested navigation links</li>\n</ul>\n<p>mkdocs-material-8.3.6 (2022-06-16)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4028\">#4028</a>: Links not clickable when using versioning (8.3.5 regression)</li>\n</ul>\n<p>mkdocs-material-8.3.5+insiders-4.18.1 (2022-06-14)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3990\">#3990</a>: Chinese search highlighting not working on non-boundaries</li>\n</ul>\n<p>mkdocs-material-8.3.5 (2022-06-14)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4012\">#4012</a>: Stay on page not working for alias of active version</li>\n</ul>\n<p>mkdocs-material-8.3.4+insiders-4.18.0 (2022-06-11)</p>\n<ul>\n<li>Added support for automatic dark/light mode</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4009\">#4009</a>: Privacy plugin uses invalid paths for file cache on Windows</li>\n</ul>\n<p>mkdocs-material-8.3.4 (2022-06-11)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4004\">#4004</a>: Tags with multiple words not searchable</li>\n</ul>\n<p>mkdocs-material-8.3.3 (2022-06-07)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4000\">#4000</a>: Mermaid diagrams too dark in dark mode (8.3.0 regression)</li>\n</ul>\n<p>mkdocs-material-8.3.2+insiders-4.17.2 (2022-06-05)</p>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/5860dac074480c2f925824ff1cf3d29eb760f1aa\"><code>5860dac</code></a> Updated Insiders changelog</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/6f8b640ec7b5a8a923c096670b9106657b51af68\"><code>6f8b640</code></a> Prepare 8.3.8 release</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/5ed04897db4819f0a0c2c0779ad12bb0921e0f09\"><code>5ed0489</code></a> Limit width of HTML5 videos to content area</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/2e99447155cf251265d20f005ef52d9667172230\"><code>2e99447</code></a> Debug GitHub Actions workflow</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/d7d9e059330fc8711563b404f6a3fa21aa6f3f73\"><code>d7d9e05</code></a> Debug GitHub Actions workflow</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/3ed984d691488dd3beb1408715910edf8f8e4282\"><code>3ed984d</code></a> Debug GitHub Actions workflow</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/17e276fe6b99d5b3613b60e03672bc5bac9314e8\"><code>17e276f</code></a> Debug GitHub Actions workflow</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/b44aa0641bd454d2f19fc7a3fea0b36db087da92\"><code>b44aa06</code></a> Debug GitHub Actions workflow</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/8ab4e3d7e40d878cad8a692568ef5fa33d11d651\"><code>8ab4e3d</code></a> Debug GitHub Actions workflow</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/3cce3ea9b172f06aefc831ae58fec2d4a26a8ea8\"><code>3cce3ea</code></a> Documentation</li>\n<li>Additional commits viewable in <a href=\"https://github.com/squidfunk/mkdocs-material/compare/8.3.6...8.3.8\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-06-27T15:41:10Z",
          "tree_id": "5e2c89bb9087943a39a0ef2acc06edb4a0f92b3f",
          "url": "https://github.com/aws/jsii/commit/aa8568e119f57f29599d3292c060edf31e139429"
        },
        "date": 1656349321370,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 107038.94807414999,
            "unit": "milliseconds",
            "range": 36265653.53016504,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 107038.94807414999 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.21.1 (tsc)",
            "value": 84508.03776955002,
            "unit": "milliseconds",
            "range": 10315500.524130905,
            "extra": "Compile aws-cdk-lib@v2.21.1 (tsc) averaged 84508.03776955002 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "aa8568e119f57f29599d3292c060edf31e139429",
          "message": "chore(deps-dev): Update mkdocs-material requirement from ~=8.3.6 to ~=8.3.8 in /gh-pages (#3621)\n\nUpdates the requirements on [mkdocs-material](https://github.com/squidfunk/mkdocs-material) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/releases\">mkdocs-material's releases</a>.</em></p>\n<blockquote>\n<h2>mkdocs-material-8.3.8</h2>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4053\">#4053</a>: Limit width of videos to content area</li>\n<li>Fixed empty tags in front matter breaking search</li>\n</ul>\n</blockquote>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/blob/master/CHANGELOG\">mkdocs-material's changelog</a>.</em></p>\n<blockquote>\n<p>mkdocs-material-8.3.8+insiders-4.19.1 (2022-06-25)</p>\n<ul>\n<li>Added mkdocs-git-committers-plugin to Dockerfile</li>\n<li>Added mkdocs-git-revision-date-localized-plugin to Dockerfile</li>\n</ul>\n<p>mkdocs-material-8.3.8+insiders-4.19.0 (2022-06-24)</p>\n<ul>\n<li>Added support for document contributors</li>\n<li>Updated French translations for cookie consent</li>\n</ul>\n<p>mkdocs-material-8.3.8 (2022-06-24)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4053\">#4053</a>: Limit width of videos to content area</li>\n<li>Fixed empty tags in front matter breaking search</li>\n</ul>\n<p>mkdocs-material-8.3.7 (2022-06-22)</p>\n<ul>\n<li>Fixed search being stuck initializing when using tags (8.3.4 regression)</li>\n</ul>\n<p>mkdocs-material-8.3.6+insiders-4.18.2 (2022-06-16)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4026\">#4026</a>: Fixed tooltips not mounted for nested navigation links</li>\n</ul>\n<p>mkdocs-material-8.3.6 (2022-06-16)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4028\">#4028</a>: Links not clickable when using versioning (8.3.5 regression)</li>\n</ul>\n<p>mkdocs-material-8.3.5+insiders-4.18.1 (2022-06-14)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3990\">#3990</a>: Chinese search highlighting not working on non-boundaries</li>\n</ul>\n<p>mkdocs-material-8.3.5 (2022-06-14)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4012\">#4012</a>: Stay on page not working for alias of active version</li>\n</ul>\n<p>mkdocs-material-8.3.4+insiders-4.18.0 (2022-06-11)</p>\n<ul>\n<li>Added support for automatic dark/light mode</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4009\">#4009</a>: Privacy plugin uses invalid paths for file cache on Windows</li>\n</ul>\n<p>mkdocs-material-8.3.4 (2022-06-11)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4004\">#4004</a>: Tags with multiple words not searchable</li>\n</ul>\n<p>mkdocs-material-8.3.3 (2022-06-07)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4000\">#4000</a>: Mermaid diagrams too dark in dark mode (8.3.0 regression)</li>\n</ul>\n<p>mkdocs-material-8.3.2+insiders-4.17.2 (2022-06-05)</p>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/5860dac074480c2f925824ff1cf3d29eb760f1aa\"><code>5860dac</code></a> Updated Insiders changelog</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/6f8b640ec7b5a8a923c096670b9106657b51af68\"><code>6f8b640</code></a> Prepare 8.3.8 release</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/5ed04897db4819f0a0c2c0779ad12bb0921e0f09\"><code>5ed0489</code></a> Limit width of HTML5 videos to content area</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/2e99447155cf251265d20f005ef52d9667172230\"><code>2e99447</code></a> Debug GitHub Actions workflow</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/d7d9e059330fc8711563b404f6a3fa21aa6f3f73\"><code>d7d9e05</code></a> Debug GitHub Actions workflow</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/3ed984d691488dd3beb1408715910edf8f8e4282\"><code>3ed984d</code></a> Debug GitHub Actions workflow</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/17e276fe6b99d5b3613b60e03672bc5bac9314e8\"><code>17e276f</code></a> Debug GitHub Actions workflow</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/b44aa0641bd454d2f19fc7a3fea0b36db087da92\"><code>b44aa06</code></a> Debug GitHub Actions workflow</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/8ab4e3d7e40d878cad8a692568ef5fa33d11d651\"><code>8ab4e3d</code></a> Debug GitHub Actions workflow</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/3cce3ea9b172f06aefc831ae58fec2d4a26a8ea8\"><code>3cce3ea</code></a> Documentation</li>\n<li>Additional commits viewable in <a href=\"https://github.com/squidfunk/mkdocs-material/compare/8.3.6...8.3.8\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-06-27T15:41:10Z",
          "tree_id": "5e2c89bb9087943a39a0ef2acc06edb4a0f92b3f",
          "url": "https://github.com/aws/jsii/commit/aa8568e119f57f29599d3292c060edf31e139429"
        },
        "date": 1656354447834,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 94765.82288309999,
            "unit": "milliseconds",
            "range": 61270859.020364724,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 94765.82288309999 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.21.1 (tsc)",
            "value": 64380.843273350016,
            "unit": "milliseconds",
            "range": 4323093.965674711,
            "extra": "Compile aws-cdk-lib@v2.21.1 (tsc) averaged 64380.843273350016 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "5b8466abdce3291bfd3093c06252ee8e91a1f850",
          "message": "chore: run benchmarks in separate VMs (#3622)\n\nThe idea is to try and achieve a situation where iteration\ntimes are not tainted by different memory situations (caches\nmay cause memory pressure and will skew the benchmark results).\n\nRunning in node sub-processes should allow removing this unknown\nfrom the picture.\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-06-27T18:34:35Z",
          "tree_id": "ff557f1234d864b39ab2781bccc96bf8972fe1d5",
          "url": "https://github.com/aws/jsii/commit/5b8466abdce3291bfd3093c06252ee8e91a1f850"
        },
        "date": 1656357937877,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 61150.70364010001,
            "unit": "milliseconds",
            "range": 360650.93495285313,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 61150.70364010001 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.21.1 (tsc)",
            "value": 45375.21177085001,
            "unit": "milliseconds",
            "range": 69507.03209437312,
            "extra": "Compile aws-cdk-lib@v2.21.1 (tsc) averaged 45375.21177085001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "36202692+kaizencc@users.noreply.github.com",
            "name": "Kaizen Conroy",
            "username": "kaizencc"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "635404a561a52033f2c93ce238c861a7518a47f4",
          "message": "feat(@jsii/utils): add a utility library to be consumed by jsii modules (#3570)\n\nAdds a set of utility functions under `@jsii/spec` that can (and will) be leveraged by other jsii modules.\n\nCurrently has the following functions exposed:\n\n- `getAssemblyFile()`\n- `writeAssembly()`\n- `loadAssemblyFromPath()`\n- `loadAssemblyFromFile()`\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-06-28T08:21:55Z",
          "tree_id": "a1c7595eac4365dc64f1efed9b19db2061a78c2f",
          "url": "https://github.com/aws/jsii/commit/635404a561a52033f2c93ce238c861a7518a47f4"
        },
        "date": 1656407968436,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 77602.32939939987,
            "unit": "milliseconds",
            "range": 785420.2141342406,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 77602.32939939987 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.21.1 (tsc)",
            "value": 55813.89929479999,
            "unit": "milliseconds",
            "range": 91418.6414199578,
            "extra": "Compile aws-cdk-lib@v2.21.1 (tsc) averaged 55813.89929479999 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "36202692+kaizencc@users.noreply.github.com",
            "name": "Kaizen Conroy",
            "username": "kaizencc"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "623c0c14fbe4c4a50c208c5415e689e45f9f54c4",
          "message": "feat: use new read/load assembly functions everywhere (#3600)\n\nThis PR utilizes the functions added in #3570 everywhere in the jsii monorepo. The benefit of this is two-fold -- it refactors all places where we load/read assemblies and points them to the source of truth (introduced in #3570). This also means the logic for compressing assemblies will be available for all packages in the jsii monorepo if/when we flip that switch.\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-06-28T16:22:41Z",
          "tree_id": "a7a00c0b15a1c5d52ed72627d3207a864fcfa740",
          "url": "https://github.com/aws/jsii/commit/623c0c14fbe4c4a50c208c5415e689e45f9f54c4"
        },
        "date": 1656436969991,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 71551.12803175005,
            "unit": "milliseconds",
            "range": 2805227.4025914683,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 71551.12803175005 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.21.1 (tsc)",
            "value": 50549.7367025,
            "unit": "milliseconds",
            "range": 2014093.59968748,
            "extra": "Compile aws-cdk-lib@v2.21.1 (tsc) averaged 50549.7367025 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "6d9dda58331fa70c1505368bf0c9fb671b66dcf8",
          "message": "chore: stop aliasing typescript in dependencies (#3623)\n\nAliasing `typescript` to `typescript-3.9` results in occasionally\nsurprising hoisting behavior, in particular using `npm 18`. In\nparticular, if two distinct  versions of `typescript` are installed,\naliasing allows both to be hoisted at the top-level, which results in\nambiguity as to which of them gets to have the `node_modules/.bin/tsc`\nsymlink.\n\nThis PR stops aliasing `typescript` to `typescript-3.9` and does the\nnecessary work to ensure builds continue to operate smoothly, menaing\nit replaced TypeScript configuration files for jest with plain ESM\nconfiguration files including typed JSDoc comments (for IDE supprot to\ncontinue working as before), as `jest` otherwise uses `ts-node` to\ntransform the configuration files, and  `ts-node` uses the \"most local\"\n`typescript` library to perform this parsing (and unfortunately,\n`typescript@3.9` does not support the `ES2020` target we are using).\n\n\nThis also required allowing `jsii.tsc.types` to be specified in the\n`package.json` file of jsii projects, as otherwise the TypeScript\ncompiler attempts to load `@types/*` packages that are not compatible\nwith `typescript@3.9` (for example, `@synclair/typebox` requires\n`typescript@>=4.5`). This setting is anyway generally useful in\ncomplex monorepo situations.\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-06-28T18:18:43Z",
          "tree_id": "13890b72a00c1d73d4f60d656e7df53e34592397",
          "url": "https://github.com/aws/jsii/commit/6d9dda58331fa70c1505368bf0c9fb671b66dcf8"
        },
        "date": 1656444194765,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.21.1",
            "value": 82730.65653564999,
            "unit": "milliseconds",
            "range": 3133427.7411592156,
            "extra": "Compile aws-cdk-lib@v2.21.1 averaged 82730.65653564999 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.21.1 (tsc)",
            "value": 57516.08620025,
            "unit": "milliseconds",
            "range": 554674.6173815883,
            "extra": "Compile aws-cdk-lib@v2.21.1 (tsc) averaged 57516.08620025 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "523ba90dba08f43620964990daa10e7b25ae1389",
          "message": "chore: upgrade benchmark to aws-cdk-lib v2.31.0 (#3650)\n\nThis is necessary as the previous benchark target had multiple occurrences\r\nof enums with several constants having the same value, which is now illegal\r\nin jsii code (#3207).\r\n\r\nThe fix for this (https://github.com/aws/aws-cdk/commit/7f4f150b97b5f58b936e6ed221a1b9bf67dad107) was released in CDK 2.31.0.",
          "timestamp": "2022-07-07T14:52:56+02:00",
          "tree_id": "b968d66db0cfc211a39261b67a139b726812f277",
          "url": "https://github.com/aws/jsii/commit/523ba90dba08f43620964990daa10e7b25ae1389"
        },
        "date": 1657201530029,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 71024.67324660001,
            "unit": "milliseconds",
            "range": 3177110.9950538883,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 71024.67324660001 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 48911.88968895,
            "unit": "milliseconds",
            "range": 2104099.5516137118,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 48911.88968895 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "43080478+aws-cdk-automation@users.noreply.github.com",
            "name": "AWS CDK Automation",
            "username": "aws-cdk-automation"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "c51bf37c5af7e26be4be4cd083951b2e362f7261",
          "message": "chore: npm-check-updates && yarn upgrade (#3631)\n\nRan npm-check-updates and yarn upgrade to keep the `yarn.lock` file up-to-date.",
          "timestamp": "2022-07-07T13:55:32Z",
          "tree_id": "7fc469e6d194ef4c44110d04589ceae9a64eb8dd",
          "url": "https://github.com/aws/jsii/commit/c51bf37c5af7e26be4be4cd083951b2e362f7261"
        },
        "date": 1657205162249,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 63846.39952224998,
            "unit": "milliseconds",
            "range": 2552884.545449053,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 63846.39952224998 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 45633.50392894999,
            "unit": "milliseconds",
            "range": 32805.14430244101,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 45633.50392894999 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "afada33635beaaa630e74dbecc91c181054ab232",
          "message": "chore(@jsii/kernel): various improvements (#3648)\n\nMoved away from using objects as maps to using actual `Map` objects,\nwhich is expected to have better performance characteristics at that\nkind of scale (lower memory footprint, less churn, ...).\n\nAdditionally, improved context information produced in error messages\naround callbacks, etc...\n\nFixes #3638\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-07-07T21:22:16Z",
          "tree_id": "affe007a2de50e6de29092e9c0c8764ab88058ac",
          "url": "https://github.com/aws/jsii/commit/afada33635beaaa630e74dbecc91c181054ab232"
        },
        "date": 1657232180544,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 62513.19139470003,
            "unit": "milliseconds",
            "range": 2439096.0431267796,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 62513.19139470003 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 44597.07849025,
            "unit": "milliseconds",
            "range": 38768.788978789285,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 44597.07849025 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "8d8444007ecfe6e3cc6dabb7c18dd2cd8fcaf7f5",
          "message": "revert: do not use node: protocol for imports (#3651)\n\nIt requires node 14.18.0 or greater, which is way more recent than\nthe earliest node engine we claim to support.\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-07-08T09:45:43Z",
          "tree_id": "f9d089cd2bac7ae2700fd4c409053bb75dc3f9ab",
          "url": "https://github.com/aws/jsii/commit/8d8444007ecfe6e3cc6dabb7c18dd2cd8fcaf7f5"
        },
        "date": 1657277121562,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 83850.92559914994,
            "unit": "milliseconds",
            "range": 7441366.572938683,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 83850.92559914994 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 56477.02542310001,
            "unit": "milliseconds",
            "range": 2176068.216334836,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 56477.02542310001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "36202692+kaizencc@users.noreply.github.com",
            "name": "Kaizen Conroy",
            "username": "kaizencc"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "359e74f3c05a682ef1e55297e27f9e2d538b0694",
          "message": "feat(rosetta): tablets can be compressed (#3652)\n\nUsage: `yarn rosetta extract --compress-tablet`\n\nThis should reduce the `.jsii.tabl.json` size by about 90%.\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-07-11T19:49:53Z",
          "tree_id": "a703134932a7eb27afe9e7d648cd560614b422d4",
          "url": "https://github.com/aws/jsii/commit/359e74f3c05a682ef1e55297e27f9e2d538b0694"
        },
        "date": 1657572411815,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 75512.34349089992,
            "unit": "milliseconds",
            "range": 1236419.6424389905,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 75512.34349089992 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 52662.92358280001,
            "unit": "milliseconds",
            "range": 152748.401294183,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 52662.92358280001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "36202692+kaizencc@users.noreply.github.com",
            "name": "Kaizen Conroy",
            "username": "kaizencc"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "f98c69efda179efca392d483aef4c74f96fcbf08",
          "message": "add team members to contribution/core (#3655)",
          "timestamp": "2022-07-12T12:17:38-04:00",
          "tree_id": "894148297a495cb674fa19f917a0a335ff22c634",
          "url": "https://github.com/aws/jsii/commit/f98c69efda179efca392d483aef4c74f96fcbf08"
        },
        "date": 1657645884679,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 71745.5969702499,
            "unit": "milliseconds",
            "range": 2877400.3448059433,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 71745.5969702499 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 50262.79251295,
            "unit": "milliseconds",
            "range": 99889.68043115156,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 50262.79251295 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "37929162+mergify[bot]@users.noreply.github.com",
            "name": "mergify[bot]",
            "username": "mergify[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "293ac17323af2f7d7764c3c99e0f14548c965e71",
          "message": "chore(release): 1.62.0 (#3658)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/bump/1.62.0/CHANGELOG.md)",
          "timestamp": "2022-07-12T17:40:10Z",
          "tree_id": "e136c13c11f73f6be08a150d430f5dfa9cda0d67",
          "url": "https://github.com/aws/jsii/commit/293ac17323af2f7d7764c3c99e0f14548c965e71"
        },
        "date": 1657651292367,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 84514.98164794996,
            "unit": "milliseconds",
            "range": 2879327.6071765935,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 84514.98164794996 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 58323.58672355001,
            "unit": "milliseconds",
            "range": 730369.1136912977,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 58323.58672355001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "342cbc2903790fb56a82af9a271e61ca5f3cee21",
          "message": "chore(deps): Bump NSubstitute from 4.3.0 to 4.4.0 in /packages/@jsii/dotnet-runtime-test/test (#3653)\n\nBumps NSubstitute from 4.3.0 to 4.4.0.\n\n\n[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=NSubstitute&package-manager=nuget&previous-version=4.3.0&new-version=4.4.0)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-07-14T02:07:51Z",
          "tree_id": "b239671829b8156671e38e75458ba8b4bd051c41",
          "url": "https://github.com/aws/jsii/commit/342cbc2903790fb56a82af9a271e61ca5f3cee21"
        },
        "date": 1657767395800,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 63309.06229260001,
            "unit": "milliseconds",
            "range": 1998369.9733397122,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 63309.06229260001 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 45525.50730729999,
            "unit": "milliseconds",
            "range": 42882.28985872452,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 45525.50730729999 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "eabb3c37c31999227f5b1acc4fd8525fd635eaf0",
          "message": "chore(deps-dev): Update mkdocs-material requirement from ~=8.3.8 to ~=8.3.9 in /gh-pages (#3654)\n\nUpdates the requirements on [mkdocs-material](https://github.com/squidfunk/mkdocs-material) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/releases\">mkdocs-material's releases</a>.</em></p>\n<blockquote>\n<h2>mkdocs-material-8.3.9</h2>\n<ul>\n<li>Updated Taiwanese translations for search</li>\n<li>Allow ids for content tabs with special characters (for mkdocstrings)</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4083\">#4083</a>: home not clickable when using versioning (8.3.5 regression)</li>\n</ul>\n</blockquote>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/blob/master/CHANGELOG\">mkdocs-material's changelog</a>.</em></p>\n<blockquote>\n<p>mkdocs-material-8.3.9+insiders-4.20.1 (2022-07-11)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4105\">#4105</a>: Tags plugin fails if tags_file is not set (4.20.0 regression)</li>\n</ul>\n<p>mkdocs-material-8.3.9+insiders-4.20.0 (2022-07-07)</p>\n<ul>\n<li>Added support for additional tags indexes</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4100\">#4100</a>: Tag icons not shown in tags index</li>\n</ul>\n<p>mkdocs-material-8.3.9+insiders-4.19.2 (2022-07-04)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4051\">#4051</a>: Privacy plugin fails if symlinking isn't allowed on Windows</li>\n</ul>\n<p>mkdocs-material-8.3.9 (2022-07-04)</p>\n<ul>\n<li>Updated Taiwanese translations for search</li>\n<li>Allow ids for content tabs with special characters (for mkdocstrings)</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4083\">#4083</a>: home not clickable when using versioning (8.3.5 regression)</li>\n</ul>\n<p>mkdocs-material-8.3.8+insiders-4.19.1 (2022-06-25)</p>\n<ul>\n<li>Added mkdocs-git-committers-plugin to Dockerfile</li>\n<li>Added mkdocs-git-revision-date-localized-plugin to Dockerfile</li>\n</ul>\n<p>mkdocs-material-8.3.8+insiders-4.19.0 (2022-06-24)</p>\n<ul>\n<li>Added support for document contributors</li>\n<li>Updated French translations for cookie consent</li>\n</ul>\n<p>mkdocs-material-8.3.8 (2022-06-24)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4053\">#4053</a>: Limit width of videos to content area</li>\n<li>Fixed empty tags in front matter breaking search</li>\n</ul>\n<p>mkdocs-material-8.3.7 (2022-06-22)</p>\n<ul>\n<li>Fixed search being stuck initializing when using tags (8.3.4 regression)</li>\n</ul>\n<p>mkdocs-material-8.3.6+insiders-4.18.2 (2022-06-16)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4026\">#4026</a>: Fixed tooltips not mounted for nested navigation links</li>\n</ul>\n<p>mkdocs-material-8.3.6 (2022-06-16)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4028\">#4028</a>: Links not clickable when using versioning (8.3.5 regression)</li>\n</ul>\n<p>mkdocs-material-8.3.5+insiders-4.18.1 (2022-06-14)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/3990\">#3990</a>: Chinese search highlighting not working on non-boundaries</li>\n</ul>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/87cac53bc6163ed59ded15cf496a5f608a885e07\"><code>87cac53</code></a> Prepare 8.3.9 release</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/409e342dfa5dc9afbe39200ea4245c90bf6dec4d\"><code>409e342</code></a> Updated dependencies</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/a261130204371e7dab3d4a961926b2cde43048b4\"><code>a261130</code></a> Fixed home button not working occasionally when using versioning</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/adabdd0bec756203653d8230a89fdf9187afe07f\"><code>adabdd0</code></a> Allow pymdownx.magiclink without arguments in schema</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/4151f326dcfc2734eed62bc4f02b8ee415f3a429\"><code>4151f32</code></a> Merge branch 'master' of github.com:squidfunk/mkdocs-material</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/209856e724e67aac689744223f48f13e1c2fe3c4\"><code>209856e</code></a> Allow ids for content tabs with special characters</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/016300d0504ff7d9560092492a10546e3dc21f7e\"><code>016300d</code></a> Documentation (<a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4080\">#4080</a>)</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/940cfb27f18420316791920c8a421cb7781269f4\"><code>940cfb2</code></a> Added Elastic to premium sponsors</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/415daf62f5429c723e4ce33c6e9ad791b122dcc8\"><code>415daf6</code></a> Updated documentation workflow</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/40fe9f6ffdfb46fe4e2b7cb857d1c06c0d812e62\"><code>40fe9f6</code></a> Updated dependencies</li>\n<li>Additional commits viewable in <a href=\"https://github.com/squidfunk/mkdocs-material/compare/8.3.8...8.3.9\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-07-14T03:00:38Z",
          "tree_id": "70b9a6f425f5158be9dacad3740d7c9948955ce6",
          "url": "https://github.com/aws/jsii/commit/eabb3c37c31999227f5b1acc4fd8525fd635eaf0"
        },
        "date": 1657770836515,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 70940.0477562,
            "unit": "milliseconds",
            "range": 1762904.6371508215,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 70940.0477562 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 49685.24225210001,
            "unit": "milliseconds",
            "range": 219440.2700697138,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 49685.24225210001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "43080478+aws-cdk-automation@users.noreply.github.com",
            "name": "AWS CDK Automation",
            "username": "aws-cdk-automation"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "f1ac3937f94c54a0339fd6ea3963cd7f42626e29",
          "message": "chore: npm-check-updates && yarn upgrade (#3661)\n\nCo-authored-by: AWS CDK Automation <aws-cdk-automation@users.noreply.github.com>",
          "timestamp": "2022-07-18T14:38:33+02:00",
          "tree_id": "3fc26b1b698721788c423bc6fe9a98cfb4e3cb9f",
          "url": "https://github.com/aws/jsii/commit/f1ac3937f94c54a0339fd6ea3963cd7f42626e29"
        },
        "date": 1658151709492,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 87199.75201149996,
            "unit": "milliseconds",
            "range": 1321879.570817154,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 87199.75201149996 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 60866.39610939999,
            "unit": "milliseconds",
            "range": 106751.11431675991,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 60866.39610939999 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "7eb11b7d3173f450cd6bd4c29180f6edf7f6b219",
          "message": "feat(jsii): allow specifying baseUrl and paths in tsconfig.json (#3662)\n\nAllow user control of the `baseUrl` and `paths` compiler options in\n`tsconfig.json` via the `jsii.tsc` stanza in `package.json`.\n\nFixes #865\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-07-18T13:59:40Z",
          "tree_id": "9c31172f7a3e55cca064fcb129e1578586252cc1",
          "url": "https://github.com/aws/jsii/commit/7eb11b7d3173f450cd6bd4c29180f6edf7f6b219"
        },
        "date": 1658155917470,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 69843.74070884993,
            "unit": "milliseconds",
            "range": 313673.585088533,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 69843.74070884993 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 48072.48092699999,
            "unit": "milliseconds",
            "range": 154391.98193002763,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 48072.48092699999 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "3974083577c0db7c9d0f815f8c34e923949aba15",
          "message": "Merge pull request #3659 from aws/merge-back/1.62.0\n\nCo-authored-by: AWS CDK Team <aws-cdk@amazon.com>\r\nCo-authored-by: Kaizen Conroy <36202692+kaizencc@users.noreply.github.com>\r\nCo-authored-by: mergify[bot] <37929162+mergify[bot]@users.noreply.github.com>",
          "timestamp": "2022-07-18T16:38:09+02:00",
          "tree_id": "4f95efc3c037e881f5a83212592b710d0bd760fe",
          "url": "https://github.com/aws/jsii/commit/3974083577c0db7c9d0f815f8c34e923949aba15"
        },
        "date": 1658158360963,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 74351.39397129999,
            "unit": "milliseconds",
            "range": 1516221.262825183,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 74351.39397129999 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 51533.33003395,
            "unit": "milliseconds",
            "range": 334013.1169686866,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 51533.33003395 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "49c4efc2e67bd25cb3511d78cb367c10bb4830aa",
          "message": "chore: stop testing .NET 5 (#3663)\n\n.NET 5 has been out of support since May 10, 2022. It no longer receives\r\nupdates, and it is hence no longer useful to continue testing against\r\nit. It has been superceded by .NET 6.",
          "timestamp": "2022-07-18T16:37:37+02:00",
          "tree_id": "0c6bfcf44abcb564ff163568940a0065fd0eefe8",
          "url": "https://github.com/aws/jsii/commit/49c4efc2e67bd25cb3511d78cb367c10bb4830aa"
        },
        "date": 1658159660966,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 107423.02274685004,
            "unit": "milliseconds",
            "range": 1496481.9254842591,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 107423.02274685004 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 73520.59856144995,
            "unit": "milliseconds",
            "range": 914047.3833875762,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 73520.59856144995 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ed370df964d63568830be5e8c3e4e1bb32b6cb68",
          "message": "chore(deps-dev): Bump mypy in /packages/jsii-pacmak/test/generated-code (#3665)\n\nBumps [mypy](https://github.com/python/mypy) from 0.961 to 0.971.\r\n- [Release notes](https://github.com/python/mypy/releases)\r\n- [Commits](https://github.com/python/mypy/compare/v0.961...v0.971)\r\n\r\n---\r\nupdated-dependencies:\r\n- dependency-name: mypy\r\n  dependency-type: direct:development\r\n  update-type: version-update:semver-minor\r\n...\r\n\r\nSigned-off-by: dependabot[bot] <support@github.com>\r\n\r\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2022-07-20T15:20:04+02:00",
          "tree_id": "8f31f9314adc17b5ae16ee06100364248cc0cc3e",
          "url": "https://github.com/aws/jsii/commit/ed370df964d63568830be5e8c3e4e1bb32b6cb68"
        },
        "date": 1658326409623,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 65144.93363564999,
            "unit": "milliseconds",
            "range": 3282924.966295148,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 65144.93363564999 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 46462.95008825001,
            "unit": "milliseconds",
            "range": 278535.3285494068,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 46462.95008825001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "d220fd694aba97fb6df31aab4a6d218d0d2e7321",
          "message": "chore(kernel): remove unnecessary v8 sandbox (#3657)\n\nUse of the v8 sandbox had already been reduced to the point of being\nentirely unnecessary. Finish removing what is left of it, as it also\nturns out to make inline debugging a lot easier to perform.\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-07-20T16:35:11Z",
          "tree_id": "8310be869836da6a9558c82cedf7f994113998be",
          "url": "https://github.com/aws/jsii/commit/d220fd694aba97fb6df31aab4a6d218d0d2e7321"
        },
        "date": 1658338194243,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 64739.25402965001,
            "unit": "milliseconds",
            "range": 2688689.8230239563,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 64739.25402965001 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 45954.40835665002,
            "unit": "milliseconds",
            "range": 45947.22642928038,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 45954.40835665002 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "43080478+aws-cdk-automation@users.noreply.github.com",
            "name": "AWS CDK Automation",
            "username": "aws-cdk-automation"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "3abe20f559d5a9c16f148843d029b6992a95912e",
          "message": "chore: npm-check-updates && yarn upgrade (#3667)\n\nCo-authored-by: AWS CDK Automation <aws-cdk-automation@users.noreply.github.com>",
          "timestamp": "2022-07-20T19:07:58+02:00",
          "tree_id": "803d083a79bc05b290b68e3e9b4ce24d946ac221",
          "url": "https://github.com/aws/jsii/commit/3abe20f559d5a9c16f148843d029b6992a95912e"
        },
        "date": 1658340444706,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 72731.69083615005,
            "unit": "milliseconds",
            "range": 1269768.8394097486,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 72731.69083615005 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 50491.34110429998,
            "unit": "milliseconds",
            "range": 138434.4774566489,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 50491.34110429998 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "68a80d98f1faa5772862c18b6907ca2298dccc76",
          "message": "fix(go): unused imports emitted for type unions (#3664)\n\nWhen imported types are solely referenced by type unions, a go import\r\nis emitted, but is never used (type unions end up represented as opaque\r\n`interface{}` type). This causes compilation failures.\r\n\r\nAdded a test case for this scenario in particular, and adjusted go code\r\ngeneration to not emit dependency imports for type unions.\r\n\r\nThese imports may be re-introduced soon, as we are working to add\r\ndynamic type checking around type unions in go (at which point those\r\nimports would no longer be unused).\r\n\r\nFixes #3399",
          "timestamp": "2022-07-21T09:54:39+02:00",
          "tree_id": "2d9427488f2568ad01d7f7f04d1fffe95b419180",
          "url": "https://github.com/aws/jsii/commit/68a80d98f1faa5772862c18b6907ca2298dccc76"
        },
        "date": 1658393523898,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 76886.2485582,
            "unit": "milliseconds",
            "range": 3573496.0309714032,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 76886.2485582 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 54207.09757815001,
            "unit": "milliseconds",
            "range": 1072750.6867823033,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 54207.09757815001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "6c4b77301341add25df059c66fabde225377a48a",
          "message": "feat(python): add dynamic type checking (#3660)\n\nUse `typeguard` to perform runtime type checking of arguments passed\ninto methods (static or instance), setters, and constructors. This\nensures a pythonic error message is produced (and raised as a\n`TypeError`), to help developers identify bugs in their code and fix\nthem.\n\nThese checks are disabled when running Python in optimized mode (via\n`python3 -O`, which sets `__debug__` to false).\n\nFixes #3639 \n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-07-21T15:47:39Z",
          "tree_id": "91fc5ccb6c6801ae90c53a7b0f80275278d54146",
          "url": "https://github.com/aws/jsii/commit/6c4b77301341add25df059c66fabde225377a48a"
        },
        "date": 1658422411581,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 83225.31302034996,
            "unit": "milliseconds",
            "range": 3592902.5808503316,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 83225.31302034996 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 58885.36864099997,
            "unit": "milliseconds",
            "range": 4779621.824235408,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 58885.36864099997 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "36202692+kaizencc@users.noreply.github.com",
            "name": "Kaizen Conroy",
            "username": "kaizencc"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "a5bd2196f2e2e43686c3013a4671c55ddd8ee248",
          "message": "fix(rosetta): infuse incorrectly handles compressed assemblies (#3669)\n\nThe behavior of `rosetta infuse` was incorrectly handled before. `infuse` would always overwrite the `.jsii` file with the uncompressed assembly. This PR fixes that behavior by detecting whether or not there is a compressed file in the directory, and compressing if that is the case.\n\nThere are two alternative solutions I considered, primarily because I'm concerned that looking up the location of the compressed assembly can be considered a leaky abstraction:\n- loading and looking into the contents of `.jsii` again to determine whether or not it is a file redirect. I did not choose this option as it involves additional loading, which will slow things down.\n- We can expand the `LoadedAssembly` type to include information on whether or not the assembly was originally compressed. Then pass that into the `replaceAssembly()` function. I ultimately decided against this because it would involve changing the function signature of all `loadAssemblyFromXxx` functions. It's both a breaking change, and unnecessary clutter for a single use case.\n\nBased on the reasoning above, I think what is included in this PR makes the most sense: expose an independent function, `compressedAssemblyExists`, that returns whether or not there is a file located at `SPEC_FILE_NAME_COMPRESSED`. \n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-07-22T07:50:07Z",
          "tree_id": "97ef52a9dc65887a2a216de5517af733b6e89b6f",
          "url": "https://github.com/aws/jsii/commit/a5bd2196f2e2e43686c3013a4671c55ddd8ee248"
        },
        "date": 1658481075182,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 110170.39402194996,
            "unit": "milliseconds",
            "range": 7030586.802987812,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 110170.39402194996 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 78176.98466300001,
            "unit": "milliseconds",
            "range": 997901.5163429824,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 78176.98466300001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "36202692+kaizencc@users.noreply.github.com",
            "name": "Kaizen Conroy",
            "username": "kaizencc"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "30eded98ec05734f687023ca04ec09769fb1e331",
          "message": "fix(rosetta): tablet compression handled incorrectly in multiple places (#3670)\n\nUnfortunately, #3652 was half-baked and this PR serves to finish handling tablet compression. It introduces the following:\n\n- `compress-cache` cli option so that you can use a compressed cache file\n- update  to all usages of `languageTablet.save()` to explicitly pass the compress flag\n- `languageTablet.compressedSource`, which is set when we load from a compressed source, so that we can remember to save as a compressed source.\n- `loadAllDefaultTablets` now handles compressed default tablets.\n- a far more encompassing set of unit tests for the above features\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-07-22T14:36:05Z",
          "tree_id": "d421ad9d1b376db5fd784e0a5da51a716db34bf1",
          "url": "https://github.com/aws/jsii/commit/30eded98ec05734f687023ca04ec09769fb1e331"
        },
        "date": 1658503624861,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 66084.15727039997,
            "unit": "milliseconds",
            "range": 2423084.731835116,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 66084.15727039997 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 47432.13518150001,
            "unit": "milliseconds",
            "range": 63834.02462046743,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 47432.13518150001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "89b2ebe58025cf5d1b1fb81f415dd1cb661d1f54",
          "message": "chore: federate into AWS to authenticate to ECR Public (#3679)\n\nIn order to reduce throttlin events, federate into AWS using the\r\nGitHub OpenID Connect provider, and authenticate to ECR Public.\r\nWhen no `AWS_ROLE_TO_ASSUME` secret is configured, federation is\r\nskipped and the jitter is applied instead.\r\n\r\nAlso reduces parallelism of the `buildx` OCI provider so that\r\nwe can more reliably re-use layer caches across all platforms\r\nwithout choking the runner's IO.",
          "timestamp": "2022-07-26T14:00:41+02:00",
          "tree_id": "c9ac5aadc6d85ec5608f890ae6f245bfde583d71",
          "url": "https://github.com/aws/jsii/commit/89b2ebe58025cf5d1b1fb81f415dd1cb661d1f54"
        },
        "date": 1658839819860,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 62943.418573949995,
            "unit": "milliseconds",
            "range": 2425638.5615622774,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 62943.418573949995 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 45480.9306148,
            "unit": "milliseconds",
            "range": 89973.12029082238,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 45480.9306148 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "0f71e262956bbb18a029ead6b19b656ded5419d4",
          "message": "chore: add missing permissions for OIDC Federation",
          "timestamp": "2022-07-26T14:27:27+02:00",
          "tree_id": "fb54ffa1dd9c8a24a7e5bc1f55b0c212d77282eb",
          "url": "https://github.com/aws/jsii/commit/0f71e262956bbb18a029ead6b19b656ded5419d4"
        },
        "date": 1658841441386,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 64008.36340324996,
            "unit": "milliseconds",
            "range": 2846010.2753881514,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 64008.36340324996 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 45682.19757769997,
            "unit": "milliseconds",
            "range": 34580.61849130991,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 45682.19757769997 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "4b152265df455de32ef60123132d2a15be054c1a",
          "message": "chore(deps-dev): Update mkdocs-awesome-pages-plugin requirement from ~=2.7.0 to ~=2.8.0 in /gh-pages (#3675)\n\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2022-07-26T16:02:25+02:00",
          "tree_id": "ddfae25f7d6b01e0d5b80c4a3e86d471dfac9f18",
          "url": "https://github.com/aws/jsii/commit/4b152265df455de32ef60123132d2a15be054c1a"
        },
        "date": 1658847076777,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 62451.244740850016,
            "unit": "milliseconds",
            "range": 2715511.2851225953,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 62451.244740850016 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 44781.60374685001,
            "unit": "milliseconds",
            "range": 58372.58638687071,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 44781.60374685001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "b89c1276f1cd62421a0a32dddd9784c13b23f176",
          "message": "chore(deps-dev): Update mkdocs requirement from ~=1.3.0 to ~=1.3.1 in /gh-pages (#3674)\n\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2022-07-26T16:01:47+02:00",
          "tree_id": "34f5dcfca5d9193cdfee4dbbddca13af4b9df0d6",
          "url": "https://github.com/aws/jsii/commit/b89c1276f1cd62421a0a32dddd9784c13b23f176"
        },
        "date": 1658847078557,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 63589.87934265006,
            "unit": "milliseconds",
            "range": 2951940.399814052,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 63589.87934265006 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 45237.6501086,
            "unit": "milliseconds",
            "range": 52727.25425055154,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 45237.6501086 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "bcc3f149929d76f71bb98f3b04e8e62a56d71b5c",
          "message": "chore(java): extend dependency ranges to allow new versions (#3672)\n\nIn particular, allow using newer versions of Jackson that are not\r\nsusceptible to CVE-2020-36518. Also update junit, mockto and jetbrains\r\nannotations to allow most recent versions.",
          "timestamp": "2022-07-26T15:56:37+02:00",
          "tree_id": "ac3c25eed86fdbd376a66d8a425c7574d6721a66",
          "url": "https://github.com/aws/jsii/commit/bcc3f149929d76f71bb98f3b04e8e62a56d71b5c"
        },
        "date": 1658847271552,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 78161.42820994995,
            "unit": "milliseconds",
            "range": 1599707.1532140065,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 78161.42820994995 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 54213.86878704999,
            "unit": "milliseconds",
            "range": 142723.59008650001,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 54213.86878704999 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ec7e2fdd953e4aedb5bc7ba1ede821307fdfae92",
          "message": "chore(deps): Update pip requirement from ~=22.1 to ~=22.2 in /packages/@jsii/python-runtime (#3673)\n\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2022-07-26T16:02:08+02:00",
          "tree_id": "bb3a05c6157eb73d8ceb622d209e4a00310ba317",
          "url": "https://github.com/aws/jsii/commit/ec7e2fdd953e4aedb5bc7ba1ede821307fdfae92"
        },
        "date": 1658847872056,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 86161.00891684998,
            "unit": "milliseconds",
            "range": 3231968.775612292,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 86161.00891684998 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 60437.785849149994,
            "unit": "milliseconds",
            "range": 272872.8555782713,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 60437.785849149994 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "3bfa17bf83606599d859ddd50194e86170566f7e",
          "message": "chore(jsii-reflect): use `Map`s instead of `Record`s (#3671)\n\nInstead of using objects as maps, use actual `Map` as this has better\r\nperformance characteristics (results in fewer shadow classes being\r\ngenerated, and is friendlier with the optimizer).",
          "timestamp": "2022-07-26T16:02:53+02:00",
          "tree_id": "cd0015b0f64ab41fa16894671fba24fb6060cd2a",
          "url": "https://github.com/aws/jsii/commit/3bfa17bf83606599d859ddd50194e86170566f7e"
        },
        "date": 1658849277677,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 122874.71835364992,
            "unit": "milliseconds",
            "range": 4075697.165665458,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 122874.71835364992 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 86386.19455340001,
            "unit": "milliseconds",
            "range": 1456920.1140642734,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 86386.19455340001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "4b152265df455de32ef60123132d2a15be054c1a",
          "message": "chore(deps-dev): Update mkdocs-awesome-pages-plugin requirement from ~=2.7.0 to ~=2.8.0 in /gh-pages (#3675)\n\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2022-07-26T16:02:25+02:00",
          "tree_id": "ddfae25f7d6b01e0d5b80c4a3e86d471dfac9f18",
          "url": "https://github.com/aws/jsii/commit/4b152265df455de32ef60123132d2a15be054c1a"
        },
        "date": 1658850419092,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 71000.63365644997,
            "unit": "milliseconds",
            "range": 6976281.069621587,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 71000.63365644997 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 49117.70178270001,
            "unit": "milliseconds",
            "range": 742484.4430196739,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 49117.70178270001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "37929162+mergify[bot]@users.noreply.github.com",
            "name": "mergify[bot]",
            "username": "mergify[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "7c24e36864054ee906333b56585efe2d77ba3650",
          "message": "chore(release): 1.63.0 (#3680)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/bump/1.63.0/CHANGELOG.md)",
          "timestamp": "2022-07-26T16:04:41Z",
          "tree_id": "7aea8cc245db0aa09deb25cbf787e5706d4ed012",
          "url": "https://github.com/aws/jsii/commit/7c24e36864054ee906333b56585efe2d77ba3650"
        },
        "date": 1658855748632,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 100447.37314595003,
            "unit": "milliseconds",
            "range": 3231130.7449892526,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 100447.37314595003 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 69881.81589704998,
            "unit": "milliseconds",
            "range": 368026.01535661647,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 69881.81589704998 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "37929162+mergify[bot]@users.noreply.github.com",
            "name": "mergify[bot]",
            "username": "mergify[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "4ea8ce3f7cdb13969f07f06556ace83a536bfcdc",
          "message": "chore(merge-back): 1.63.0 (#3681)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/merge-back/1.63.0/CHANGELOG.md)",
          "timestamp": "2022-07-26T18:27:20Z",
          "tree_id": "7aea8cc245db0aa09deb25cbf787e5706d4ed012",
          "url": "https://github.com/aws/jsii/commit/4ea8ce3f7cdb13969f07f06556ace83a536bfcdc"
        },
        "date": 1658863430709,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 75291.25695415009,
            "unit": "milliseconds",
            "range": 1294591.003805006,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 75291.25695415009 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 50795.98635414999,
            "unit": "milliseconds",
            "range": 171538.28167951351,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 50795.98635414999 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "1a5ac9d59432be5371dfc4045970149ba77131bd",
          "message": "feat(python): formally allow dicts to be passed in lieu of structs (#3683)\n\nFormalize the contract that it is allowed to pass a dict in places where\r\na struct instance is expected (this provides less type checking guarantees,\r\nand the developer is responsible for passing the right keys in).\r\n\r\nThis should address a false-positive issue with the runtime type-checking\r\nintroduced in 1.63.0 (#3660).",
          "timestamp": "2022-07-27T18:37:51+02:00",
          "tree_id": "bd4eac99cac6b8a2ab0896fc984151d0561a258b",
          "url": "https://github.com/aws/jsii/commit/1a5ac9d59432be5371dfc4045970149ba77131bd"
        },
        "date": 1658944781138,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 107306.24994009992,
            "unit": "milliseconds",
            "range": 5427151.229675539,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 107306.24994009992 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 74890.86783890001,
            "unit": "milliseconds",
            "range": 317848.6406460127,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 74890.86783890001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "185bb34ea82865264c4e50e42c4f16cbab7cb29c",
          "message": "chore(release): 1.63.1 (#3684)",
          "timestamp": "2022-07-27T19:41:18+02:00",
          "tree_id": "8199a5ee03edd0af6da3813276c15ee077c172c2",
          "url": "https://github.com/aws/jsii/commit/185bb34ea82865264c4e50e42c4f16cbab7cb29c"
        },
        "date": 1658947589398,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 70632.46350924995,
            "unit": "milliseconds",
            "range": 666517.615595714,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 70632.46350924995 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 48867.76077320002,
            "unit": "milliseconds",
            "range": 91381.76600852826,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 48867.76077320002 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "1a5ac9d59432be5371dfc4045970149ba77131bd",
          "message": "feat(python): formally allow dicts to be passed in lieu of structs (#3683)\n\nFormalize the contract that it is allowed to pass a dict in places where\r\na struct instance is expected (this provides less type checking guarantees,\r\nand the developer is responsible for passing the right keys in).\r\n\r\nThis should address a false-positive issue with the runtime type-checking\r\nintroduced in 1.63.0 (#3660).",
          "timestamp": "2022-07-27T18:37:51+02:00",
          "tree_id": "bd4eac99cac6b8a2ab0896fc984151d0561a258b",
          "url": "https://github.com/aws/jsii/commit/1a5ac9d59432be5371dfc4045970149ba77131bd"
        },
        "date": 1658949433245,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 64959.155140899995,
            "unit": "milliseconds",
            "range": 1697215.4207979306,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 64959.155140899995 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 45997.02952720001,
            "unit": "milliseconds",
            "range": 62323.61970161459,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 45997.02952720001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "185bb34ea82865264c4e50e42c4f16cbab7cb29c",
          "message": "chore(release): 1.63.1 (#3684)",
          "timestamp": "2022-07-27T19:41:18+02:00",
          "tree_id": "8199a5ee03edd0af6da3813276c15ee077c172c2",
          "url": "https://github.com/aws/jsii/commit/185bb34ea82865264c4e50e42c4f16cbab7cb29c"
        },
        "date": 1658955031026,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 93769.1948586,
            "unit": "milliseconds",
            "range": 2048624.03457961,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 93769.1948586 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 65715.1674237,
            "unit": "milliseconds",
            "range": 692048.4274724603,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 65715.1674237 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "1a5ac9d59432be5371dfc4045970149ba77131bd",
          "message": "feat(python): formally allow dicts to be passed in lieu of structs (#3683)\n\nFormalize the contract that it is allowed to pass a dict in places where\r\na struct instance is expected (this provides less type checking guarantees,\r\nand the developer is responsible for passing the right keys in).\r\n\r\nThis should address a false-positive issue with the runtime type-checking\r\nintroduced in 1.63.0 (#3660).",
          "timestamp": "2022-07-27T18:37:51+02:00",
          "tree_id": "bd4eac99cac6b8a2ab0896fc984151d0561a258b",
          "url": "https://github.com/aws/jsii/commit/1a5ac9d59432be5371dfc4045970149ba77131bd"
        },
        "date": 1658955363124,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 70202.33736820002,
            "unit": "milliseconds",
            "range": 847362.3866057284,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 70202.33736820002 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 48508.428560100016,
            "unit": "milliseconds",
            "range": 468245.0872244694,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 48508.428560100016 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "f372e93a73ee57aace8427d326a7e91f7405b96c",
          "message": "chore(merge-back): 1.63.1 (#3685)",
          "timestamp": "2022-07-28T11:07:50+02:00",
          "tree_id": "8199a5ee03edd0af6da3813276c15ee077c172c2",
          "url": "https://github.com/aws/jsii/commit/f372e93a73ee57aace8427d326a7e91f7405b96c"
        },
        "date": 1659002630779,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 75078.50403395004,
            "unit": "milliseconds",
            "range": 2708330.902996634,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 75078.50403395004 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 50500.14231564998,
            "unit": "milliseconds",
            "range": 1966129.89298696,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 50500.14231564998 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "43080478+aws-cdk-automation@users.noreply.github.com",
            "name": "AWS CDK Automation",
            "username": "aws-cdk-automation"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "69559a585fa13f79856d6c954a909a1f6d175e64",
          "message": "chore: npm-check-updates && yarn upgrade (#3682)\n\nCo-authored-by: AWS CDK Automation <aws-cdk-automation@users.noreply.github.com>\r\nCo-authored-by: 🧑🏻‍💻 Romain Marcadier <rmuller@amazon.com>\r\nCo-authored-by: Romain Marcadier <rmuller@amazon.fr>",
          "timestamp": "2022-07-29T17:06:35+02:00",
          "tree_id": "88115de8e48433023cdca19021d9a37c38a45301",
          "url": "https://github.com/aws/jsii/commit/69559a585fa13f79856d6c954a909a1f6d175e64"
        },
        "date": 1659110412218,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 62493.55988814998,
            "unit": "milliseconds",
            "range": 1496055.308499135,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 62493.55988814998 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 44679.8986335,
            "unit": "milliseconds",
            "range": 69651.33396643195,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 44679.8986335 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "833a71781c9e4fee1522d75e53d3de76b93439f5",
          "message": "fix(pyhon): under-qualified types used by dynamic type checking (#3688)\n\nThe types must be referenced from the current module's root, including\r\nnesting class names, or the names will not be defined.",
          "timestamp": "2022-07-29T17:04:57+02:00",
          "tree_id": "033bbb68b5a505bbc4aada07c5d90484b86f10a7",
          "url": "https://github.com/aws/jsii/commit/833a71781c9e4fee1522d75e53d3de76b93439f5"
        },
        "date": 1659111167487,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 96077.86675060002,
            "unit": "milliseconds",
            "range": 15736395.77804502,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 96077.86675060002 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 65587.66003535,
            "unit": "milliseconds",
            "range": 622955.3516407812,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 65587.66003535 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "a8a88336e40caf772b7a2bea6b17a6904ffbf0cf",
          "message": "chore(release): 1.63.2 (#3689)",
          "timestamp": "2022-07-29T17:10:09+02:00",
          "tree_id": "52365b6abb11e5d150055346f35e68e65bfa5f72",
          "url": "https://github.com/aws/jsii/commit/a8a88336e40caf772b7a2bea6b17a6904ffbf0cf"
        },
        "date": 1659111782197,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 63842.46754520004,
            "unit": "milliseconds",
            "range": 1311859.2422564414,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 63842.46754520004 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 44936.345852800005,
            "unit": "milliseconds",
            "range": 31251.70629950639,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 44936.345852800005 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "a8a88336e40caf772b7a2bea6b17a6904ffbf0cf",
          "message": "chore(release): 1.63.2 (#3689)",
          "timestamp": "2022-07-29T17:10:09+02:00",
          "tree_id": "52365b6abb11e5d150055346f35e68e65bfa5f72",
          "url": "https://github.com/aws/jsii/commit/a8a88336e40caf772b7a2bea6b17a6904ffbf0cf"
        },
        "date": 1659116427753,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 63633.14103654995,
            "unit": "milliseconds",
            "range": 1529743.408584412,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 63633.14103654995 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 45339.89470674997,
            "unit": "milliseconds",
            "range": 107083.91877353456,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 45339.89470674997 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "182f4d4d2872da43e3f93de930ac216470e37fd0",
          "message": "chore(merge-back): 1.63.2 (#3690)",
          "timestamp": "2022-08-01T11:52:15+02:00",
          "tree_id": "52365b6abb11e5d150055346f35e68e65bfa5f72",
          "url": "https://github.com/aws/jsii/commit/182f4d4d2872da43e3f93de930ac216470e37fd0"
        },
        "date": 1659350554879,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 64117.63272705003,
            "unit": "milliseconds",
            "range": 1900913.637137865,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 64117.63272705003 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 45953.58732725,
            "unit": "milliseconds",
            "range": 51556.34849341899,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 45953.58732725 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "23981d0ea48aef974cc6b5ee6bfe306b1ab7f989",
          "message": "chore(deps): Bump golang.org/x/tools from 0.1.11 to 0.1.12 in /packages/@jsii/go-runtime (#3687)\n\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2022-08-01T11:53:03+02:00",
          "tree_id": "6a738e1af7c9521dc4fcfb326c47657eab63990c",
          "url": "https://github.com/aws/jsii/commit/23981d0ea48aef974cc6b5ee6bfe306b1ab7f989"
        },
        "date": 1659350738153,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 71216.43333820006,
            "unit": "milliseconds",
            "range": 595592.3062310622,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 71216.43333820006 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 49120.92915315002,
            "unit": "milliseconds",
            "range": 96031.33872335001,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 49120.92915315002 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "4b47c7b7923e46737319454a607c7d4a73b18256",
          "message": "chore: stop testing Node 17 (EOL for > 1 month) (#3691)",
          "timestamp": "2022-08-01T12:21:07+02:00",
          "tree_id": "6be8877e81a31d7fabeb731f2f087096fa8e118f",
          "url": "https://github.com/aws/jsii/commit/4b47c7b7923e46737319454a607c7d4a73b18256"
        },
        "date": 1659353550065,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 95619.21178770004,
            "unit": "milliseconds",
            "range": 4003663.3506648513,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 95619.21178770004 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 68281.18264060003,
            "unit": "milliseconds",
            "range": 857607.0894225125,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 68281.18264060003 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "053004afd6d576894b51b7cc3fcb11aa38ca3a1b",
          "message": "chore(deps): Bump golang.org/x/tools from 0.1.11 to 0.1.12 in /packages/@jsii/go-runtime-test/project (#3686)\n\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>\r\nCo-authored-by: 🧑🏻‍💻 Romain Marcadier <rmuller@amazon.com>\r\nCo-authored-by: Romain Marcadier <rmuller@amazon.fr>",
          "timestamp": "2022-08-01T12:21:52+02:00",
          "tree_id": "55e8739e5cd26a2c67fe28072fb35ae66363de97",
          "url": "https://github.com/aws/jsii/commit/053004afd6d576894b51b7cc3fcb11aa38ca3a1b"
        },
        "date": 1659353797483,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 103566.1386036499,
            "unit": "milliseconds",
            "range": 3147299.407862692,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 103566.1386036499 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 71803.36251260001,
            "unit": "milliseconds",
            "range": 518394.2952191156,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 71803.36251260001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "053004afd6d576894b51b7cc3fcb11aa38ca3a1b",
          "message": "chore(deps): Bump golang.org/x/tools from 0.1.11 to 0.1.12 in /packages/@jsii/go-runtime-test/project (#3686)\n\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>\r\nCo-authored-by: 🧑🏻‍💻 Romain Marcadier <rmuller@amazon.com>\r\nCo-authored-by: Romain Marcadier <rmuller@amazon.fr>",
          "timestamp": "2022-08-01T12:21:52+02:00",
          "tree_id": "55e8739e5cd26a2c67fe28072fb35ae66363de97",
          "url": "https://github.com/aws/jsii/commit/053004afd6d576894b51b7cc3fcb11aa38ca3a1b"
        },
        "date": 1659358073026,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 72121.48100519998,
            "unit": "milliseconds",
            "range": 2350413.912711912,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 72121.48100519998 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 49761.07910884998,
            "unit": "milliseconds",
            "range": 165057.90275577997,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 49761.07910884998 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "5275da6585272491628e4b954f4d84a791c40d6b",
          "message": "chore(deps): Update attrs requirement from ~=21.2 to >=21.2,<23.0 in /packages/@jsii/python-runtime (#3692)\n\nUpdates the requirements on [attrs](https://github.com/python-attrs/attrs) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/python-attrs/attrs/releases\">attrs's releases</a>.</em></p>\n<blockquote>\n<h2>22.1.0</h2>\n<h1>Highlights</h1>\n<p>The main features of this release are:</p>\n<ul>\n<li>The departure of Python 2.7 (enjoy your retirement!),</li>\n<li>and the arrival of Python 3.11.</li>\n</ul>\n<p>We had loftier goals feature-wise, but didn't want to block others embracing Python 3.11.</p>\n<p>❤️ <strong>Huge</strong> thanks to my <a href=\"https://github.com/sponsors/hynek\">GitHub sponsors</a>, <a href=\"https://tidelift.com/subscription/pkg/pypi-attrs\">Tidelift subscribers</a>, and <a href=\"https://ko-fi.com/the_hynek\">Ko-fi buyers</a>! ❤️</p>\n<p>None of my projects would exist in their current form without you!</p>\n<h1>Full Changelog</h1>\n<h2>Backwards-incompatible Changes</h2>\n<ul>\n<li>\n<p>Python 2.7 is not supported anymore.</p>\n<p>Dealing with Python 2.7 tooling has become too difficult for a volunteer-run project.</p>\n<p>We have supported Python 2 more than 2 years after it was officially discontinued and feel that we have paid our dues. All version up to 21.4.0 from December 2021 remain fully functional, of course. <a href=\"https://github-redirect.dependabot.com/python-attrs/attrs/issues/936\">#936</a></p>\n</li>\n<li>\n<p>The deprecated <code>cmp</code> attribute of <code>attrs.Attribute</code> has been removed. This does not affect the <em>cmp</em> argument to <code>attr.s</code> that can be used as a shortcut to set <em>eq</em> and <em>order</em> at the same time. <a href=\"https://github-redirect.dependabot.com/python-attrs/attrs/issues/939\">#939</a></p>\n</li>\n</ul>\n<h2>Changes</h2>\n<ul>\n<li>Instantiation of frozen slotted classes is now faster. <a href=\"https://github-redirect.dependabot.com/python-attrs/attrs/issues/898\">#898</a></li>\n<li>If an <code>eq</code> key is defined, it is also used before hashing the attribute. <a href=\"https://github-redirect.dependabot.com/python-attrs/attrs/issues/909\">#909</a></li>\n<li>Added <code>attrs.validators.min_len()</code>. <a href=\"https://github-redirect.dependabot.com/python-attrs/attrs/issues/916\">#916</a></li>\n<li><code>attrs.validators.deep_iterable()</code>'s <em>member_validator</em> argument now also accepts a list of validators and wraps them in an <code>attrs.validators.and_()</code>. <a href=\"https://github-redirect.dependabot.com/python-attrs/attrs/issues/925\">#925</a></li>\n<li>Added missing type stub re-imports for <code>attrs.converters</code> and <code>attrs.filters</code>. <a href=\"https://github-redirect.dependabot.com/python-attrs/attrs/issues/931\">#931</a></li>\n<li>Added missing stub for <code>attr(s).cmp_using()</code>. <a href=\"https://github-redirect.dependabot.com/python-attrs/attrs/issues/949\">#949</a></li>\n<li><code>attrs.validators._in()</code>'s <code>ValueError</code> is not missing the attribute, expected options, and the value it got anymore. <a href=\"https://github-redirect.dependabot.com/python-attrs/attrs/issues/951\">#951</a></li>\n<li>Python 3.11 is now officially supported. <a href=\"https://github-redirect.dependabot.com/python-attrs/attrs/issues/969\">#969</a></li>\n</ul>\n</blockquote>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/python-attrs/attrs/blob/main/CHANGELOG.rst\">attrs's changelog</a>.</em></p>\n<blockquote>\n<h2>22.1.0 (2022-07-28)</h2>\n<p>Backwards-incompatible Changes\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^</p>\n<ul>\n<li>\n<p>Python 2.7 is not supported anymore.</p>\n<p>Dealing with Python 2.7 tooling has become too difficult for a volunteer-run project.</p>\n<p>We have supported Python 2 more than 2 years after it was officially discontinued and feel that we have paid our dues.\nAll version up to 21.4.0 from December 2021 remain fully functional, of course.\n<code>[#936](https://github.com/python-attrs/attrs/issues/936) &lt;https://github.com/python-attrs/attrs/issues/936&gt;</code>_</p>\n</li>\n<li>\n<p>The deprecated <code>cmp</code> attribute of <code>attrs.Attribute</code> has been removed.\nThis does not affect the <em>cmp</em> argument to <code>attr.s</code> that can be used as a shortcut to set <em>eq</em> and <em>order</em> at the same time.\n<code>[#939](https://github.com/python-attrs/attrs/issues/939) &lt;https://github.com/python-attrs/attrs/issues/939&gt;</code>_</p>\n</li>\n</ul>\n<p>Changes\n^^^^^^^</p>\n<ul>\n<li>Instantiation of frozen slotted classes is now faster.\n<code>[#898](https://github.com/python-attrs/attrs/issues/898) &lt;https://github.com/python-attrs/attrs/issues/898&gt;</code>_</li>\n<li>If an <code>eq</code> key is defined, it is also used before hashing the attribute.\n<code>[#909](https://github.com/python-attrs/attrs/issues/909) &lt;https://github.com/python-attrs/attrs/issues/909&gt;</code>_</li>\n<li>Added <code>attrs.validators.min_len()</code>.\n<code>[#916](https://github.com/python-attrs/attrs/issues/916) &lt;https://github.com/python-attrs/attrs/issues/916&gt;</code>_</li>\n<li><code>attrs.validators.deep_iterable()</code>'s <em>member_validator</em> argument now also accepts a list of validators and wraps them in an <code>attrs.validators.and_()</code>.\n<code>[#925](https://github.com/python-attrs/attrs/issues/925) &lt;https://github.com/python-attrs/attrs/issues/925&gt;</code>_</li>\n<li>Added missing type stub re-imports for <code>attrs.converters</code> and <code>attrs.filters</code>.\n<code>[#931](https://github.com/python-attrs/attrs/issues/931) &lt;https://github.com/python-attrs/attrs/issues/931&gt;</code>_</li>\n<li>Added missing stub for <code>attr(s).cmp_using()</code>.\n<code>[#949](https://github.com/python-attrs/attrs/issues/949) &lt;https://github.com/python-attrs/attrs/issues/949&gt;</code>_</li>\n<li><code>attrs.validators._in()</code>'s <code>ValueError</code> is not missing the attribute, expected options, and the value it got anymore.\n<code>[#951](https://github.com/python-attrs/attrs/issues/951) &lt;https://github.com/python-attrs/attrs/issues/951&gt;</code>_</li>\n<li>Python 3.11 is now officially supported.\n<code>[#969](https://github.com/python-attrs/attrs/issues/969) &lt;https://github.com/python-attrs/attrs/issues/969&gt;</code>_</li>\n</ul>\n<hr />\n<h2>21.4.0 (2021-12-29)</h2>\n<p>Changes\n^^^^^^^</p>\n<ul>\n<li>Fixed the test suite on PyPy3.8 where <code>cloudpickle</code> does not work.\n<code>[#892](https://github.com/python-attrs/attrs/issues/892) &lt;https://github.com/python-attrs/attrs/issues/892&gt;</code>_</li>\n</ul>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/python-attrs/attrs/commit/b3dfebe2e10b44437c4f97d788fb5220d790efd0\"><code>b3dfebe</code></a> Prepare 22.1.0</li>\n<li><a href=\"https://github.com/python-attrs/attrs/commit/c89abcd6e6a826b00898f93e851c96b78c80891f\"><code>c89abcd</code></a> It totally is correct</li>\n<li><a href=\"https://github.com/python-attrs/attrs/commit/9f118b7dd5328ee5abd7f3880971ab9554047c3a\"><code>9f118b7</code></a> Tune first steps</li>\n<li><a href=\"https://github.com/python-attrs/attrs/commit/a3d7f20e54ba29d5ec73563c167d877351228cf2\"><code>a3d7f20</code></a> Polish contributing guide</li>\n<li><a href=\"https://github.com/python-attrs/attrs/commit/899497f165b3c8291b66c9c3a01b64881b69cf39\"><code>899497f</code></a> Clarify (c) ownership</li>\n<li><a href=\"https://github.com/python-attrs/attrs/commit/696fd786901a6b82b828dd71e3fd64bfae1014ca\"><code>696fd78</code></a> Hyphenate compound adjectives</li>\n<li><a href=\"https://github.com/python-attrs/attrs/commit/65c06831c1eee4d9895511c7db5caffba9d93c0e\"><code>65c0683</code></a> Use NG APIs in glossary</li>\n<li><a href=\"https://github.com/python-attrs/attrs/commit/5d84d9a5686e8210b1616447ac05021b6b211157\"><code>5d84d9a</code></a> Move mypy config to pyproject.toml</li>\n<li><a href=\"https://github.com/python-attrs/attrs/commit/1590917bf7c49e35bb429d117650f660aa45e0e4\"><code>1590917</code></a> Update readme.rst (<a href=\"https://github-redirect.dependabot.com/python-attrs/attrs/issues/986\">#986</a>)</li>\n<li><a href=\"https://github.com/python-attrs/attrs/commit/a67c84f51e4e3df875961d287583abaef673eb48\"><code>a67c84f</code></a> Add more prominent callout about slots to API docs</li>\n<li>Additional commits viewable in <a href=\"https://github.com/python-attrs/attrs/compare/21.2.0...22.1.0\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-08-01T14:20:19Z",
          "tree_id": "0b7560db06f3b9a4d50f2dbc7e40e80fe8f1d2dc",
          "url": "https://github.com/aws/jsii/commit/5275da6585272491628e4b954f4d84a791c40d6b"
        },
        "date": 1659368493646,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 113191.92914405008,
            "unit": "milliseconds",
            "range": 7351580.948356998,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 113191.92914405008 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 80248.58118250001,
            "unit": "milliseconds",
            "range": 902868.0720169125,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 80248.58118250001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "bcffb4bb65846fcada33755269e72ce708ebeacf",
          "message": "fix(python): unable to override methods with keyword arguments (#3695)\n\nThe callback logic in the jsii runtime library for Python was\nincorrectly passing keyword arguments to Python implementations,\nforwarding a struct instance as-is instead of destructuring it into a\nkeyword arguments mapping.\n\nUsing `inspect.signature()`, detect the presence of keyword arguments on\nthe callback target, and destructure the struct as relevant.\n\nFixes #3656\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-08-02T15:03:00Z",
          "tree_id": "ed7ebaa17b6b4d4839e39cdaaa8bca134345e817",
          "url": "https://github.com/aws/jsii/commit/bcffb4bb65846fcada33755269e72ce708ebeacf"
        },
        "date": 1659456287545,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 87601.74502315003,
            "unit": "milliseconds",
            "range": 5553126.5605016295,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 87601.74502315003 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 57615.90109374999,
            "unit": "milliseconds",
            "range": 1863444.8473016392,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 57615.90109374999 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "c65b1d9fd1e0a6e37dad96c763c0bb1a1d15f57d",
          "message": "feat(.net): embed package icon when configured (#3676)\n\nWhen an `iconUrl` is configured for a .NET target, attempt to download\nit for inclusion in the NuGet package with the `PackageIcon` attribute,\nas the `PackageIconUrl` attribute is deprecated.\n\nThis feature can be opted out of by setting the\n`JSII_PACMAK_DOTNET_NO_DOWNLOAD_ICON` environment variable (no matter\nwhat value it has).\n\nIf the download somehow fails, the previous behavior is preserved.\n\nThe `PackageIconUrl` attribute is still emitted for backwards\ncompatibility with tools that do not (yet) support `PackageIcon`.\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-08-04T09:13:24Z",
          "tree_id": "93910b66b4ce7c986621cdf5934a0d8986cf6549",
          "url": "https://github.com/aws/jsii/commit/c65b1d9fd1e0a6e37dad96c763c0bb1a1d15f57d"
        },
        "date": 1659607625611,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 71629.89791524998,
            "unit": "milliseconds",
            "range": 1136280.0808880297,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 71629.89791524998 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 49652.394317150014,
            "unit": "milliseconds",
            "range": 52236.79290819411,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 49652.394317150014 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "43080478+aws-cdk-automation@users.noreply.github.com",
            "name": "AWS CDK Automation",
            "username": "aws-cdk-automation"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "7a23f9faf500177e138af46c290a2df3eadb842d",
          "message": "chore: npm-check-updates && yarn upgrade (#3697)\n\nRan npm-check-updates and yarn upgrade to keep the `yarn.lock` file up-to-date.",
          "timestamp": "2022-08-08T12:30:20Z",
          "tree_id": "e8723e5be41e5379becc216853a9df0c7a77378c",
          "url": "https://github.com/aws/jsii/commit/7a23f9faf500177e138af46c290a2df3eadb842d"
        },
        "date": 1659964860852,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 66052.15084089998,
            "unit": "milliseconds",
            "range": 3648947.3037441624,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 66052.15084089998 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 46505.817598400004,
            "unit": "milliseconds",
            "range": 215189.39733996784,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 46505.817598400004 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "0804133d650746924f3f546ecf7508ca4fee32f9",
          "message": "chore(deps): Bump xunit from 2.4.1 to 2.4.2 in /packages/@jsii/dotnet-runtime-test/test (#3699)\n\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>\r\nCo-authored-by: 🧑🏻‍💻 Romain Marcadier <rmuller@amazon.com>",
          "timestamp": "2022-08-08T18:00:04+02:00",
          "tree_id": "1a53580fddcac15e1b9062557d4b40f1dae54b91",
          "url": "https://github.com/aws/jsii/commit/0804133d650746924f3f546ecf7508ca4fee32f9"
        },
        "date": 1659978129183,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 80573.54289814996,
            "unit": "milliseconds",
            "range": 2582015.845869423,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 80573.54289814996 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 59715.39264554998,
            "unit": "milliseconds",
            "range": 1950081.6237591654,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 59715.39264554998 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "36202692+kaizencc@users.noreply.github.com",
            "name": "Kaizen Conroy",
            "username": "kaizencc"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "611323b9a68f02b10782d8020bf82a458ff67bdf",
          "message": "chore: move replaceAssembly to @jsii/spec and expose it (#3696)\n\nThis PR is meant to do two things:\n\n- move `replaceAssembly` to `assembly-utils.ts` in `@jsii/spec`, because it is currently being duplicated in `cdk-generate-synthetic-examples`. This causes problems whenever we try to change `replaceAssembly`, as we did in this [commit](https://github.com/aws/jsii/pull/3669/files), because we will forget to change the function in `cdk-generate-synthetic-examples`. The plan is to have `cdk-generate-synthetic-examples` reference the `replaceAssembly` function in `@jsii/spec` in a separate PR.\n- finish the effort started in this closed [PR](https://github.com/aws/jsii/pull/3146), where we meant to make sure that we don't re-fingerprint assemblies after they've been changed. It was closed due to staleness.\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-08-09T07:55:29Z",
          "tree_id": "6da99f567155d47eeee469300bd55caea63c3f53",
          "url": "https://github.com/aws/jsii/commit/611323b9a68f02b10782d8020bf82a458ff67bdf"
        },
        "date": 1660034801681,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 62565.654989699935,
            "unit": "milliseconds",
            "range": 2032528.8723277852,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 62565.654989699935 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 45256.59447324998,
            "unit": "milliseconds",
            "range": 252792.65251980728,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 45256.59447324998 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "f5e06038adfa6912baabc9ea004ad40a5ad87295",
          "message": "feat(.net): dynmic type checking for union-typed parameters (#3668)\n\nWeaving runtime type checks around union-typed parameters to help\ndevelopers receive actionable error messages in case mistakes are made.\nThe checks are only performed if the\n`Amazon.JSII.Runtime.Configuration.RuntimeTypeChecking` configuration\nproperty is `true` (which it is by default).\n\nA pre-processor macro such as `DEBUG` could not be used as the packages\npublished to NuGet are already built and this does not afford any control\nto the end-user.\n\nFixes #3640\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-08-09T17:36:24Z",
          "tree_id": "a996e805c542145a791013a79e7415701354cda4",
          "url": "https://github.com/aws/jsii/commit/f5e06038adfa6912baabc9ea004ad40a5ad87295"
        },
        "date": 1660069534529,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 63251.14386869994,
            "unit": "milliseconds",
            "range": 1425702.4811206697,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 63251.14386869994 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 44588.11703675001,
            "unit": "milliseconds",
            "range": 43501.396137003365,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 44588.11703675001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ed2557a797ee8322fa698be9a10396df9894d7e5",
          "message": "chore(go): emit one file per type (#3698)\n\nInstead of generating one file will ALL the types in a given\n(sub)module, emit one file per type within the (sub)module,\nso that the compiler operates on smaller compilation units.\nThis should reduce the memory pressure the compiler\nexperiences when dealing with large libraries.\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-08-10T09:12:10Z",
          "tree_id": "1c7e2a32f3243d19dc0b614d55bf510f8d28a3aa",
          "url": "https://github.com/aws/jsii/commit/ed2557a797ee8322fa698be9a10396df9894d7e5"
        },
        "date": 1660125855327,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 66611.07413260001,
            "unit": "milliseconds",
            "range": 1605819.0550446182,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 66611.07413260001 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 47051.2756668,
            "unit": "milliseconds",
            "range": 55351.986477111954,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 47051.2756668 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "rmuller@amazon.com",
            "name": "🧑🏻‍💻 Romain Marcadier",
            "username": "RomainMuller"
          },
          "distinct": true,
          "id": "f584a173d2427c94b20f79b45b56bb9eb161f45f",
          "message": "chore(go): emit one file per type (#3698)\n\nInstead of generating one file will ALL the types in a given\n(sub)module, emit one file per type within the (sub)module,\nso that the compiler operates on smaller compilation units.\nThis should reduce the memory pressure the compiler\nexperiences when dealing with large libraries.\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-08-10T13:33:59+02:00",
          "tree_id": "14cce55e35042907b69cba46dd65ce2a9199653f",
          "url": "https://github.com/aws/jsii/commit/f584a173d2427c94b20f79b45b56bb9eb161f45f"
        },
        "date": 1660134459790,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 70500.32887474998,
            "unit": "milliseconds",
            "range": 3553676.2033588598,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 70500.32887474998 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 49716.05468965,
            "unit": "milliseconds",
            "range": 835071.2292507921,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 49716.05468965 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "5413720a274fbcc9d3b62823197b76589f99329c",
          "message": "fix(python): classproperty not working with type checkers (#3694)\n\nThe `jsii.python` submodule was not re-exported in `__init__.py`, which\nmade type resolves not manage to access the. `@classproperty` decorator\nand default to treating it as `Any`.\n\nThis adds some missing type annotations, runs `pyright` on the runtime\nlibrary and tests thereof (as `mypy` did not identify this problem),\nand adds the missing export declaration.\n\nFixes #3633\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-08-11T09:24:24Z",
          "tree_id": "c304fbbe39f41459a734bb8d32e535cac25a54ef",
          "url": "https://github.com/aws/jsii/commit/5413720a274fbcc9d3b62823197b76589f99329c"
        },
        "date": 1660214244734,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 103554.36891655003,
            "unit": "milliseconds",
            "range": 2685678.5885327645,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 103554.36891655003 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 72724.69652185003,
            "unit": "milliseconds",
            "range": 630437.5939098299,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 72724.69652185003 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "37929162+mergify[bot]@users.noreply.github.com",
            "name": "mergify[bot]",
            "username": "mergify[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "4c1eae83b412f71ef833961c133dd07eeab5968e",
          "message": "chore(release): 1.64.0 (#3702)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/bump/1.64.0/CHANGELOG.md)",
          "timestamp": "2022-08-12T16:43:33Z",
          "tree_id": "95a5cda903df3c536f949de8ea1af60fc4fd9d7c",
          "url": "https://github.com/aws/jsii/commit/4c1eae83b412f71ef833961c133dd07eeab5968e"
        },
        "date": 1660326413705,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 85591.59920500002,
            "unit": "milliseconds",
            "range": 2045767.7126882796,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 85591.59920500002 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 59536.6086108,
            "unit": "milliseconds",
            "range": 276548.5622073529,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 59536.6086108 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "37929162+mergify[bot]@users.noreply.github.com",
            "name": "mergify[bot]",
            "username": "mergify[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "143d9107757ade4931f12becd1b53695ef1e9eaf",
          "message": "chore(merge-back): 1.64.0 (#3704)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/merge-back/1.64.0/CHANGELOG.md)",
          "timestamp": "2022-08-12T19:03:32Z",
          "tree_id": "95a5cda903df3c536f949de8ea1af60fc4fd9d7c",
          "url": "https://github.com/aws/jsii/commit/143d9107757ade4931f12becd1b53695ef1e9eaf"
        },
        "date": 1660335117331,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 86957.90707525003,
            "unit": "milliseconds",
            "range": 3838089.2277228027,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 86957.90707525003 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 61156.516853699984,
            "unit": "milliseconds",
            "range": 229259.628142339,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 61156.516853699984 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "eltociear@gmail.com",
            "name": "Ikko Ashimine",
            "username": "eltociear"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "d1a3eaad58fa24ca0b5ea9773b33c3fd41783bc5",
          "message": "chore(python): fix typo in type-name.ts (#3705)\n\nIdentifiy -> Identify\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-08-17T11:21:15Z",
          "tree_id": "61d7839db0937ded17b2ecf4ce529c782c0433e4",
          "url": "https://github.com/aws/jsii/commit/d1a3eaad58fa24ca0b5ea9773b33c3fd41783bc5"
        },
        "date": 1660739192986,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 85706.44352654992,
            "unit": "milliseconds",
            "range": 2416404.2596900277,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 85706.44352654992 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 59812.90843819999,
            "unit": "milliseconds",
            "range": 375904.9354954654,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 59812.90843819999 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "43080478+aws-cdk-automation@users.noreply.github.com",
            "name": "AWS CDK Automation",
            "username": "aws-cdk-automation"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "52afd93d28dfc2ba096fa4d07d3d7ac955231d94",
          "message": "chore: npm-check-updates && yarn upgrade (#3701)\n\nRan npm-check-updates and yarn upgrade to keep the `yarn.lock` file up-to-date.",
          "timestamp": "2022-08-17T13:07:12Z",
          "tree_id": "90b74720c5c871afbd8b159139e3171661618d05",
          "url": "https://github.com/aws/jsii/commit/52afd93d28dfc2ba096fa4d07d3d7ac955231d94"
        },
        "date": 1660744657408,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 63596.19871700002,
            "unit": "milliseconds",
            "range": 2328287.284861443,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 63596.19871700002 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 45418.48279364999,
            "unit": "milliseconds",
            "range": 55803.85454746782,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 45418.48279364999 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "0a3c0e54b820cb307f6e8114dcb6fff34ecabc04",
          "message": "chore(deps-dev): Update mkdocs-material requirement from ~=8.3.9 to ~=8.4.0 in /gh-pages (#3708)\n\nUpdates the requirements on [mkdocs-material](https://github.com/squidfunk/mkdocs-material) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/releases\">mkdocs-material's releases</a>.</em></p>\n<blockquote>\n<h2>mkdocs-material-8.4.0</h2>\n<ul>\n<li>Added support for cookie consent</li>\n<li>Added support for feedback widget (Was this page helpful?)</li>\n<li>Added support for dismissable announcement bar</li>\n<li>Added Armenian, Lithuanian, Tagalog, and Urdu translations</li>\n</ul>\n</blockquote>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/blob/master/CHANGELOG\">mkdocs-material's changelog</a>.</em></p>\n<blockquote>\n<p>mkdocs-material-8.4.0+insiders-4.21.1 (2022-08-13)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4176\">#4176</a>: Broken image when avatar is served by Gravatar</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4212\">#4212</a>: Deferred search initialization for file:// locations</li>\n</ul>\n<p>mkdocs-material-8.4.0 (2022-08-13)</p>\n<ul>\n<li>Added support for cookie consent</li>\n<li>Added support for feedback widget (Was this page helpful?)</li>\n<li>Added support for dismissable announcement bar</li>\n<li>Added Armenian, Lithuanian, Tagalog, and Urdu translations</li>\n</ul>\n<p>mkdocs-material-8.3.9+insiders-4.21.0 (2022-07-17)</p>\n<ul>\n<li>Added meta plugin: set front matter for all pages in a folder</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4114\">#4114</a>: Tags plugin fails if only tags_extra_files is set</li>\n</ul>\n<p>mkdocs-material-8.3.9+insiders-4.20.1 (2022-07-11)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4105\">#4105</a>: Tags plugin fails if tags_file is not set (4.20.0 regression)</li>\n</ul>\n<p>mkdocs-material-8.3.9+insiders-4.20.0 (2022-07-07)</p>\n<ul>\n<li>Added support for additional tags indexes</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4100\">#4100</a>: Tag icons not shown in tags index</li>\n</ul>\n<p>mkdocs-material-8.3.9+insiders-4.19.2 (2022-07-04)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4051\">#4051</a>: Privacy plugin fails if symlinking isn't allowed on Windows</li>\n</ul>\n<p>mkdocs-material-8.3.9 (2022-07-04)</p>\n<ul>\n<li>Updated Taiwanese translations for search</li>\n<li>Allow ids for content tabs with special characters (for mkdocstrings)</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4083\">#4083</a>: home not clickable when using versioning (8.3.5 regression)</li>\n</ul>\n<p>mkdocs-material-8.3.8+insiders-4.19.1 (2022-06-25)</p>\n<ul>\n<li>Added mkdocs-git-committers-plugin to Dockerfile</li>\n<li>Added mkdocs-git-revision-date-localized-plugin to Dockerfile</li>\n</ul>\n<p>mkdocs-material-8.3.8+insiders-4.19.0 (2022-06-24)</p>\n<ul>\n<li>Added support for document contributors</li>\n<li>Updated French translations for cookie consent</li>\n</ul>\n<p>mkdocs-material-8.3.8 (2022-06-24)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4053\">#4053</a>: Limit width of videos to content area</li>\n<li>Fixed empty tags in front matter breaking search</li>\n</ul>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/04c0defa358593c51afcf3e01ece7510d4b8e25f\"><code>04c0def</code></a> Updated changelog</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/88a65fe298585e4466377df2bee8a354cc1ff682\"><code>88a65fe</code></a> Updated changelog</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/7427662fe2f5a5cc81de077560ba51015ef5d699\"><code>7427662</code></a> Fixed syntax error in Chinese (Simplified) translations</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/e297c8c6f072113e1dcf6590f6af73b666326a56\"><code>e297c8c</code></a> Fixed syntax error in Chinese (Simplified) translations</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/5f360d27711f428e3da8dc33df916e26ee792965\"><code>5f360d2</code></a> Added Tagalog translations</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/eef9bdece91c435cf28312b6fc01b4c3d2cc0fb0\"><code>eef9bde</code></a> Added Lithuanian translations</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/53482b61ba0387c36794d748557104eee3ebbd14\"><code>53482b6</code></a> Added Urdu translations</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/63f736bbddfe19a45370cfa4c56c79e5ee521e80\"><code>63f736b</code></a> Added Armenian translations</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/b5df9b868616c5b2b4658557d6dcca40d5531c60\"><code>b5df9b8</code></a> Updated Chinese (Simplified) translations (<a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4181\">#4181</a>)</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/954112e2fa84f2198d981bf28c04106daa6bb17f\"><code>954112e</code></a> Prepare 8.4.0 release</li>\n<li>Additional commits viewable in <a href=\"https://github.com/squidfunk/mkdocs-material/compare/8.3.9...8.4.0\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-08-17T14:05:04Z",
          "tree_id": "7b15644003044b90d05962e6a9f62348effdddd3",
          "url": "https://github.com/aws/jsii/commit/0a3c0e54b820cb307f6e8114dcb6fff34ecabc04"
        },
        "date": 1660748349390,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 70555.85338010002,
            "unit": "milliseconds",
            "range": 1662753.5242958083,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 70555.85338010002 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 49281.60417959999,
            "unit": "milliseconds",
            "range": 1899264.7905791823,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 49281.60417959999 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "6b8e75da2c83784b5ae3c584c37b72dd8de9e112",
          "message": "chore(deps): Bump Microsoft.NET.Test.Sdk from 17.2.0 to 17.3.0 in /packages/@jsii/dotnet-runtime-test/test (#3707)\n\nBumps [Microsoft.NET.Test.Sdk](https://github.com/microsoft/vstest) from 17.2.0 to 17.3.0.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/microsoft/vstest/releases\">Microsoft.NET.Test.Sdk's releases</a>.</em></p>\n<blockquote>\n<h2>v17.3.0</h2>\n<p>See the release notes <a href=\"https://github.com/microsoft/vstest-docs/blob/main/docs/releases.md#1730\">here</a>.</p>\n<h2>v17.3.0-preview-20220612-01</h2>\n<p>See the release notes <a href=\"https://github.com/microsoft/vstest-docs/blob/master/docs/releases.md#1730-preview-20220612-01\">here</a>.</p>\n<h2>v17.3.0-preview-20220530-08</h2>\n<p>See the release notes <a href=\"https://github.com/microsoft/vstest-docs/blob/master/docs/releases.md#1730-preview-20220530-08\">here</a>.</p>\n<h2>v17.3.0-preview-20220426-02</h2>\n<p>See the release notes <a href=\"https://github.com/microsoft/vstest-docs/blob/master/docs/releases.md#1730-preview-20220426-02\">here</a>.</p>\n</blockquote>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/microsoft/vstest/commit/c7ba2ca721808f830482ace6be06ae93077e0e7b\"><code>c7ba2ca</code></a> Reverts change that breaks DOTNET_ROOT (<a href=\"https://github-redirect.dependabot.com/microsoft/vstest/issues/3844\">#3844</a>)</li>\n<li><a href=\"https://github.com/microsoft/vstest/commit/4fbb74fc9fdb39d278ee0886f5310dbdc1efd88c\"><code>4fbb74f</code></a> Updated version tag to release.</li>\n<li><a href=\"https://github.com/microsoft/vstest/commit/fbcc5c2b3656f6b375c386849a980c9d5f9c1128\"><code>fbcc5c2</code></a> [main] Update dependencies from devdiv/DevDiv/vs-code-coverage (<a href=\"https://github-redirect.dependabot.com/microsoft/vstest/issues/3817\">#3817</a>)</li>\n<li><a href=\"https://github.com/microsoft/vstest/commit/ac884f5ae063c89171328b3da03c4f4f65774352\"><code>ac884f5</code></a> Update dependencies from <a href=\"https://dev.azure.com/devdiv/DevDiv/_git/vs-code-cov\">https://dev.azure.com/devdiv/DevDiv/_git/vs-code-cov</a>...</li>\n<li><a href=\"https://github.com/microsoft/vstest/commit/fbbe699fdbc647c708828daca1f3ca9532dc756c\"><code>fbbe699</code></a> [main] Update dependencies from devdiv/DevDiv/vs-code-coverage (<a href=\"https://github-redirect.dependabot.com/microsoft/vstest/issues/3803\">#3803</a>)</li>\n<li><a href=\"https://github.com/microsoft/vstest/commit/5b3bb9c3d27938ecd9a86160c233aebaaf7a71bd\"><code>5b3bb9c</code></a> Add runtime location to host log (<a href=\"https://github-redirect.dependabot.com/microsoft/vstest/issues/3806\">#3806</a>)</li>\n<li><a href=\"https://github.com/microsoft/vstest/commit/8f7fba5638a830264c93ad244cc8992698d16cb1\"><code>8f7fba5</code></a> Localized file check-in by OneLocBuild Task: Build definition ID 2923: Build ...</li>\n<li><a href=\"https://github.com/microsoft/vstest/commit/84caa8f11bb444a597c154e011bbc22943d201dc\"><code>84caa8f</code></a> LEGO: Pull request from lego/hb_ad8466e4-8d65-4d1a-832b-2c88012fccb5_20220624...</li>\n<li><a href=\"https://github.com/microsoft/vstest/commit/4c81723ba012ee002c8a348eeb06f3c4d039e6bf\"><code>4c81723</code></a> Localized file check-in by OneLocBuild Task: Build definition ID 2923: Build ...</li>\n<li><a href=\"https://github.com/microsoft/vstest/commit/e46ca8a834fdfd2bf8018c17b01e3d08e46c63c7\"><code>e46ca8a</code></a> Localized string updated. (<a href=\"https://github-redirect.dependabot.com/microsoft/vstest/issues/3804\">#3804</a>)</li>\n<li>Additional commits viewable in <a href=\"https://github.com/microsoft/vstest/compare/v17.2.0...v17.3.0\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\n[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=Microsoft.NET.Test.Sdk&package-manager=nuget&previous-version=17.2.0&new-version=17.3.0)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-08-17T15:01:38Z",
          "tree_id": "9d8e73f59b4a66bf91629e2072155ec0a1641224",
          "url": "https://github.com/aws/jsii/commit/6b8e75da2c83784b5ae3c584c37b72dd8de9e112"
        },
        "date": 1660752191398,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 85531.76692740005,
            "unit": "milliseconds",
            "range": 3919573.141891592,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 85531.76692740005 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 57333.02915460001,
            "unit": "milliseconds",
            "range": 902689.6890286931,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 57333.02915460001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "e7fadc0866a9dbd1a0061ec184ae840b0f2f58a1",
          "message": "fix(dotnet): AnonymousObject fails runtime type checks (#3709)\n\nThe `AnonymousObject` class is used when a value is passed from JS to\n.NET through a union or `any` typed return point, and there is not\nsufficient runtime type information on the value to decisively identify\nits dynamic type. The `AnonymousObject` class will be converted by the\njsii runtime to any interface type implicitly (even if that is\ntechnically not correct), and it must hence be allowed through runtime\ntype-checks for interfaces. Essentially, this is a blind spot of the\nruntime type checks, and should not cause valid code to break.\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-08-18T08:23:15Z",
          "tree_id": "dfc94cccd2ddc7f8846b433cd538deee07f99d7e",
          "url": "https://github.com/aws/jsii/commit/e7fadc0866a9dbd1a0061ec184ae840b0f2f58a1"
        },
        "date": 1660814285718,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 73361.69473879994,
            "unit": "milliseconds",
            "range": 868275.3562825226,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 73361.69473879994 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 50673.14367614999,
            "unit": "milliseconds",
            "range": 197700.37335595203,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 50673.14367614999 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "39923a5885f33e99cc8c9181b8f36f20b6208551",
          "message": "feat(pacmak): allow opt-out of runtime type checking generation (#3710)\n\nAdds a new CLI flag `--no-runtime-type-checking` to allow library authors to\nopt out of generating runtime type checking code if they are not interested\nin those.\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-08-18T10:13:18Z",
          "tree_id": "ce1c3e2d3c9cf1905882d6301d86d405bb2b846b",
          "url": "https://github.com/aws/jsii/commit/39923a5885f33e99cc8c9181b8f36f20b6208551"
        },
        "date": 1660821063478,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 72481.29598220003,
            "unit": "milliseconds",
            "range": 1288346.6289247521,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 72481.29598220003 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 50304.60234944998,
            "unit": "milliseconds",
            "range": 134646.63145651988,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 50304.60234944998 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "37929162+mergify[bot]@users.noreply.github.com",
            "name": "mergify[bot]",
            "username": "mergify[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "7a02b7fd7597089a3a1a7fba5efc3c4ec4db810c",
          "message": "chore(release): 1.65.0 (#3713)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/bump/1.65.0/CHANGELOG.md)",
          "timestamp": "2022-08-18T14:08:52Z",
          "tree_id": "b83647958cfcc6322f27c93402fd0209c80cc9e1",
          "url": "https://github.com/aws/jsii/commit/7a02b7fd7597089a3a1a7fba5efc3c4ec4db810c"
        },
        "date": 1660835401434,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 79466.33084535002,
            "unit": "milliseconds",
            "range": 1038464.468913441,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 79466.33084535002 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 55277.76104755001,
            "unit": "milliseconds",
            "range": 696372.686257475,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 55277.76104755001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "37929162+mergify[bot]@users.noreply.github.com",
            "name": "mergify[bot]",
            "username": "mergify[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "bdab47bce955936d3859547e8387bc6c10d98483",
          "message": "chore(merge-back): 1.65.0 (#3715)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/merge-back/1.65.0/CHANGELOG.md)",
          "timestamp": "2022-08-18T16:29:49Z",
          "tree_id": "b83647958cfcc6322f27c93402fd0209c80cc9e1",
          "url": "https://github.com/aws/jsii/commit/bdab47bce955936d3859547e8387bc6c10d98483"
        },
        "date": 1660843325009,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 67812.56005849999,
            "unit": "milliseconds",
            "range": 1633787.6759508392,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 67812.56005849999 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 46855.94750635001,
            "unit": "milliseconds",
            "range": 291095.8126611408,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 46855.94750635001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "bf9c1427c4c8175b396f7f9fd092920044a37861",
          "message": "chore: remove reviewer request from reps upgrade pr",
          "timestamp": "2022-08-22T10:17:18+02:00",
          "tree_id": "a3c87d0eb42af2347fc67f8fe816fa011cdbc61d",
          "url": "https://github.com/aws/jsii/commit/bf9c1427c4c8175b396f7f9fd092920044a37861"
        },
        "date": 1661160718361,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 101067.74945024999,
            "unit": "milliseconds",
            "range": 2960157.2545126127,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 101067.74945024999 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 71042.69530109999,
            "unit": "milliseconds",
            "range": 315509.0140572012,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 71042.69530109999 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "43080478+aws-cdk-automation@users.noreply.github.com",
            "name": "AWS CDK Automation",
            "username": "aws-cdk-automation"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "0cc5b1179d1f738b8cbbcb0cb3ff5b118c1c8429",
          "message": "chore: npm-check-updates && yarn upgrade (#3711)\n\nRan npm-check-updates and yarn upgrade to keep the `yarn.lock` file up-to-date.",
          "timestamp": "2022-08-22T09:13:26Z",
          "tree_id": "0c4d9155c7efad23c2c33a7a91007f1fb271ff39",
          "url": "https://github.com/aws/jsii/commit/0cc5b1179d1f738b8cbbcb0cb3ff5b118c1c8429"
        },
        "date": 1661162816726,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 71258.24730114995,
            "unit": "milliseconds",
            "range": 3384756.673218604,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 71258.24730114995 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 49125.470913399986,
            "unit": "milliseconds",
            "range": 40608.73039458287,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 49125.470913399986 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "43080478+aws-cdk-automation@users.noreply.github.com",
            "name": "AWS CDK Automation",
            "username": "aws-cdk-automation"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "0cc5b1179d1f738b8cbbcb0cb3ff5b118c1c8429",
          "message": "chore: npm-check-updates && yarn upgrade (#3711)\n\nRan npm-check-updates and yarn upgrade to keep the `yarn.lock` file up-to-date.",
          "timestamp": "2022-08-22T09:13:26Z",
          "tree_id": "0c4d9155c7efad23c2c33a7a91007f1fb271ff39",
          "url": "https://github.com/aws/jsii/commit/0cc5b1179d1f738b8cbbcb0cb3ff5b118c1c8429"
        },
        "date": 1661167059443,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 75844.57096299999,
            "unit": "milliseconds",
            "range": 1808724.1269743398,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 75844.57096299999 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 52485.237516449975,
            "unit": "milliseconds",
            "range": 105046.71264358552,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 52485.237516449975 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "3cf5c28b26e189db1a05f9543a5f6f38583e8868",
          "message": "feat(go): emit deprecation warning when using go1.16 and go1.17 (#3718)",
          "timestamp": "2022-08-22T16:22:49+02:00",
          "tree_id": "2079b708bd41cf8d9e3663680bef300e2c15d910",
          "url": "https://github.com/aws/jsii/commit/3cf5c28b26e189db1a05f9543a5f6f38583e8868"
        },
        "date": 1661181246496,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 63550.89709284999,
            "unit": "milliseconds",
            "range": 1328265.653569439,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 63550.89709284999 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 45107.04321680001,
            "unit": "milliseconds",
            "range": 26403.92598203129,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 45107.04321680001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "897155ebb00899a4c783bd10e77f818b777c600a",
          "message": "chore(deps-dev): Update mkdocs-material requirement from ~=8.4.0 to ~=8.4.1 in /gh-pages (#3719)\n\nUpdates the requirements on [mkdocs-material](https://github.com/squidfunk/mkdocs-material) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/releases\">mkdocs-material's releases</a>.</em></p>\n<blockquote>\n<h2>mkdocs-material-8.4.1</h2>\n<ul>\n<li>Updated Croatian and Hebrew translations</li>\n</ul>\n</blockquote>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/blob/master/CHANGELOG\">mkdocs-material's changelog</a>.</em></p>\n<blockquote>\n<p>mkdocs-material-8.4.1+insiders-4.22.0 (2022-08-21)</p>\n<ul>\n<li>Added support for navigation status</li>\n</ul>\n<p>mkdocs-material-8.4.1 (2022-08-21)</p>\n<ul>\n<li>Updated Croatian and Hebrew translations</li>\n</ul>\n<p>mkdocs-material-8.4.0+insiders-4.21.1 (2022-08-13)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4176\">#4176</a>: Broken image when avatar is served by Gravatar</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4212\">#4212</a>: Deferred search initialization for file:// locations</li>\n</ul>\n<p>mkdocs-material-8.4.0 (2022-08-13)</p>\n<ul>\n<li>Added support for cookie consent</li>\n<li>Added support for feedback widget (Was this page helpful?)</li>\n<li>Added support for dismissable announcement bar</li>\n<li>Added Armenian, Lithuanian, Tagalog, and Urdu translations</li>\n</ul>\n<p>mkdocs-material-8.3.9+insiders-4.21.0 (2022-07-17)</p>\n<ul>\n<li>Added meta plugin: set front matter for all pages in a folder</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4114\">#4114</a>: Tags plugin fails if only tags_extra_files is set</li>\n</ul>\n<p>mkdocs-material-8.3.9+insiders-4.20.1 (2022-07-11)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4105\">#4105</a>: Tags plugin fails if tags_file is not set (4.20.0 regression)</li>\n</ul>\n<p>mkdocs-material-8.3.9+insiders-4.20.0 (2022-07-07)</p>\n<ul>\n<li>Added support for additional tags indexes</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4100\">#4100</a>: Tag icons not shown in tags index</li>\n</ul>\n<p>mkdocs-material-8.3.9+insiders-4.19.2 (2022-07-04)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4051\">#4051</a>: Privacy plugin fails if symlinking isn't allowed on Windows</li>\n</ul>\n<p>mkdocs-material-8.3.9 (2022-07-04)</p>\n<ul>\n<li>Updated Taiwanese translations for search</li>\n<li>Allow ids for content tabs with special characters (for mkdocstrings)</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4083\">#4083</a>: home not clickable when using versioning (8.3.5 regression)</li>\n</ul>\n<p>mkdocs-material-8.3.8+insiders-4.19.1 (2022-06-25)</p>\n<ul>\n<li>Added mkdocs-git-committers-plugin to Dockerfile</li>\n<li>Added mkdocs-git-revision-date-localized-plugin to Dockerfile</li>\n</ul>\n<p>mkdocs-material-8.3.8+insiders-4.19.0 (2022-06-24)</p>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/acd154dfbd7672665bc07116ffb9e141a651d69b\"><code>acd154d</code></a> Updated Insiders documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/07bc90ea72f709d9249b907c4771830bb3598874\"><code>07bc90e</code></a> Prepare 8.4.1 release</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/71f40c5efa72bae3bce30f5d3793b2278c9f6af8\"><code>71f40c5</code></a> Fixed Croatian translations</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/2d44af6598f34219585db276866449834556ae50\"><code>2d44af6</code></a> Updated Croatian translations</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/f9c40d26b2449cfe61eb269e45cd52ddad86a3e2\"><code>f9c40d2</code></a> Updated Croatian translations (<a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4265\">#4265</a>)</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/09a6e7966cbde30c469ff3c26f80a1e660a8191f\"><code>09a6e79</code></a> Documentation (<a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4252\">#4252</a>)</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/eec2e743e0d61414b33644a945d9a9663a0ebb4e\"><code>eec2e74</code></a> Merge branch 'master' of github.com:squidfunk/mkdocs-material</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/e06839b3730876a879be5b59bde454a7073b1d16\"><code>e06839b</code></a> Updated dependencies</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/612429c903b1edee68a5fcd561e7b5f3b54ec362\"><code>612429c</code></a> Updated Hebrew translations (<a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4243\">#4243</a>)</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/ec09b718e157d6d0003336b6fba8085329ebd362\"><code>ec09b71</code></a> Updated README</li>\n<li>Additional commits viewable in <a href=\"https://github.com/squidfunk/mkdocs-material/compare/8.4.0...8.4.1\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-08-22T15:36:16Z",
          "tree_id": "4da3dafee849a317977aef8477385d4f5e170efe",
          "url": "https://github.com/aws/jsii/commit/897155ebb00899a4c783bd10e77f818b777c600a"
        },
        "date": 1661186583694,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 91779.41892735,
            "unit": "milliseconds",
            "range": 4845234.633591523,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 91779.41892735 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 65491.07487925,
            "unit": "milliseconds",
            "range": 818030.1535548579,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 65491.07487925 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "362326e989e1d9f2a032d4c15c34f3d60e712051",
          "message": "fix(.net): missing dynamic type checking for collection-nested unions (#3720)\n\nThe .NET runtime type checking was not checking type unions that\nare nested within a collection (list or map), although this is\nnecessary since the `is <type>` guard does not allow making any\nassumption about the contents of the collection.\n\nThis adds the missing checks, and replaces the guard clauses\nwith a `switch` statement using pattern matching, resulting\nin somewhat more elegant code (also with better `null` safety).\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-08-23T22:14:33Z",
          "tree_id": "f63c81f427467ba9c48c0fd271f0063e499aa5d3",
          "url": "https://github.com/aws/jsii/commit/362326e989e1d9f2a032d4c15c34f3d60e712051"
        },
        "date": 1661295929617,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 63240.12026379999,
            "unit": "milliseconds",
            "range": 1210931.2003451346,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 63240.12026379999 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 44635.721034999995,
            "unit": "milliseconds",
            "range": 29633.890308461723,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 44635.721034999995 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "c73c2ee6d973ea8ff14b320a5f97ae017107ebab",
          "message": "feat(go): runtime type check type unions (#3712)\n\nRuntime type-checking can be disabled by adding\r\n`--tag=no_runtime_type_checking` to go compiler invocations. This can\r\nbe used to avoid paying the performance toll of runtime type checking\r\n(which should be modest in most cases), or to work around a bug in the\r\ntype checking code.",
          "timestamp": "2022-08-24T12:51:17+02:00",
          "tree_id": "7813efb8eb1d4ebe10f0f32fc52154b08133f9e8",
          "url": "https://github.com/aws/jsii/commit/c73c2ee6d973ea8ff14b320a5f97ae017107ebab"
        },
        "date": 1661341699873,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 77572.04523955,
            "unit": "milliseconds",
            "range": 1536231.9571285194,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 77572.04523955 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 53644.2063912,
            "unit": "milliseconds",
            "range": 172727.0591901959,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 53644.2063912 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "93aec85ada9fd9e505591766b8e87ee53c0bde6b",
          "message": "fix: type unions in variadic position leads to invalid code-gen (#3722)\n\nThe code-gen for type unions was incorrect, as the value is typically\r\narray-typed, and the generated code hence needs to treat the value as\r\nsuch.",
          "timestamp": "2022-08-24T18:47:27+02:00",
          "tree_id": "5d1dc0412e7732024d42ef2af18159d4bf9a2514",
          "url": "https://github.com/aws/jsii/commit/93aec85ada9fd9e505591766b8e87ee53c0bde6b"
        },
        "date": 1661363187792,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 77616.76348845001,
            "unit": "milliseconds",
            "range": 1851488.2034130245,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 77616.76348845001 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 54436.943459650014,
            "unit": "milliseconds",
            "range": 275795.8068163713,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 54436.943459650014 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "36202692+kaizencc@users.noreply.github.com",
            "name": "Kaizen Conroy",
            "username": "kaizencc"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "9768e2a7f2eb8847d8d06e3f40deeedac0c7dec4",
          "message": "fix(rosetta): rosetta reader expects default tablet file to be uncompressed (#3723)\n\nDue to a bug in `rosetta-reader.ts`, we always expect to find the implicit tablet at `.jsii.tabl.json`. This means that any compressed implicit tablets will be unable to be used as a cache, and causes the following failure:\n\n```bash\nThe following snippet was not found in any of the loaded tablets: ...\n```\n\nThis PR also slightly changes the default behavior of `compressTablet`; previously it was `false` by default. Now it respects the original compression status of the implicit tablet, i.e. if it was previously compressed, then `extract` will update it as compressed.\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-08-26T18:36:02Z",
          "tree_id": "e8269d05b91f98ee89d392c0be65a548a4671b13",
          "url": "https://github.com/aws/jsii/commit/9768e2a7f2eb8847d8d06e3f40deeedac0c7dec4"
        },
        "date": 1661542409531,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 72881.35604079996,
            "unit": "milliseconds",
            "range": 5569966.245313966,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 72881.35604079996 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 50224.770119449975,
            "unit": "milliseconds",
            "range": 1904439.47343355,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 50224.770119449975 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "e626597b0deda6d8fdb3e09249388b81e068afd3",
          "message": "fix(python): reference to type does not use alias (#3728)\n\nType references in a keyword property position may not have used\nthe aliased import as intended, resulting in a runtime error due\nto referring to an undefined symbol.\n\nAdditionally, keyword properties referencing structs did not\nallow dicts to be used in lieu of a struct instance.\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-08-29T16:09:19Z",
          "tree_id": "bd752be86b5528c9833af670c3cecd1cb9baac69",
          "url": "https://github.com/aws/jsii/commit/e626597b0deda6d8fdb3e09249388b81e068afd3"
        },
        "date": 1661792892850,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 78329.85152135,
            "unit": "milliseconds",
            "range": 1315800.2378688273,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 78329.85152135 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 53475.43280334999,
            "unit": "milliseconds",
            "range": 148662.70379325224,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 53475.43280334999 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "b0947e40d2c6e32ea47a5d33c0c462207d779b37",
          "message": "chore(release): v1.65.1 (#3729)",
          "timestamp": "2022-08-29T19:10:14+02:00",
          "tree_id": "684945aec5fa0d8a9dc1e4b41e34a9101586638e",
          "url": "https://github.com/aws/jsii/commit/b0947e40d2c6e32ea47a5d33c0c462207d779b37"
        },
        "date": 1661796806119,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 81581.5905159,
            "unit": "milliseconds",
            "range": 1548339.521175166,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 81581.5905159 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 56977.6342938,
            "unit": "milliseconds",
            "range": 658197.7349386462,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 56977.6342938 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "37929162+mergify[bot]@users.noreply.github.com",
            "name": "mergify[bot]",
            "username": "mergify[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "5d8e5cd921d476f1d1e9f8b662807d9a11af77fc",
          "message": "chore(merge-back): 1.65.1 (#3731)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/merge-back/1.65.1/CHANGELOG.md)",
          "timestamp": "2022-08-29T21:42:13Z",
          "tree_id": "46d477515659c57bb7b0e242e87cc40000a9cd6a",
          "url": "https://github.com/aws/jsii/commit/5d8e5cd921d476f1d1e9f8b662807d9a11af77fc"
        },
        "date": 1661812978624,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 64633.85699264998,
            "unit": "milliseconds",
            "range": 2546144.2576815216,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 64633.85699264998 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 47430.76842065,
            "unit": "milliseconds",
            "range": 402369.94246678194,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 47430.76842065 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "37929162+mergify[bot]@users.noreply.github.com",
            "name": "mergify[bot]",
            "username": "mergify[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "3c9512bfabef5c62baf34c79ac4bc7b63066c6b6",
          "message": "chore(release): 1.66.0 (#3732)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/bump/1.66.0/CHANGELOG.md)",
          "timestamp": "2022-08-29T23:26:49Z",
          "tree_id": "93a0bf4a71ad9b88878a46c8fa5f3f9740d8dd76",
          "url": "https://github.com/aws/jsii/commit/3c9512bfabef5c62baf34c79ac4bc7b63066c6b6"
        },
        "date": 1661819427427,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 87024.09844599995,
            "unit": "milliseconds",
            "range": 2128089.6508958265,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 87024.09844599995 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 61135.635022350005,
            "unit": "milliseconds",
            "range": 189137.59692460124,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 61135.635022350005 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "37929162+mergify[bot]@users.noreply.github.com",
            "name": "mergify[bot]",
            "username": "mergify[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "23a5baa7d3e09adbad233d045df6ac9d944fd1c3",
          "message": "chore(merge-back): 1.66.0 (#3733)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/merge-back/1.66.0/CHANGELOG.md)",
          "timestamp": "2022-08-30T02:09:30Z",
          "tree_id": "93a0bf4a71ad9b88878a46c8fa5f3f9740d8dd76",
          "url": "https://github.com/aws/jsii/commit/23a5baa7d3e09adbad233d045df6ac9d944fd1c3"
        },
        "date": 1661828601147,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 64230.99987525,
            "unit": "milliseconds",
            "range": 3207177.124993819,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 64230.99987525 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 46281.936668099996,
            "unit": "milliseconds",
            "range": 220742.70278171048,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 46281.936668099996 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "66279577+comcalvi@users.noreply.github.com",
            "name": "Calvin Combs",
            "username": "comcalvi"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "26ca47cfef15ce346f610d75991e62d5bd0597e3",
          "message": "feat(java): dynamic type checking for union-typed parameters (#3703)\n\nAdd runtime type checks for Java around type unions to provide better error messages for developers when union types are being used. \n\nOnly performed if `software.amazon.jsii.Configuration.getRuntimeTypeChecking()` is `true`, which it is by default. \n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-08-30T09:07:21Z",
          "tree_id": "e63caa6bed29952676ff86a0d7c7869a5a33a555",
          "url": "https://github.com/aws/jsii/commit/26ca47cfef15ce346f610d75991e62d5bd0597e3"
        },
        "date": 1661853489357,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 63794.59183440001,
            "unit": "milliseconds",
            "range": 2630610.375091639,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 63794.59183440001 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 46507.61887100001,
            "unit": "milliseconds",
            "range": 743017.7121855654,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 46507.61887100001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "c482bcd3260758c350a9322e0788edcd25fe22cf",
          "message": "chore(deps-dev): Update mkdocs-material requirement from ~=8.4.1 to ~=8.4.2 in /gh-pages (#3727)\n\nUpdates the requirements on [mkdocs-material](https://github.com/squidfunk/mkdocs-material) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/releases\">mkdocs-material's releases</a>.</em></p>\n<blockquote>\n<h2>mkdocs-material-8.4.2</h2>\n<ul>\n<li>Updated Slovenian translations</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4277\">#4277</a>: Feedback widget hidden after navigation with instant loading</li>\n<li>Fixed numeric tags in front matter breaking search functionality</li>\n</ul>\n</blockquote>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/blob/master/CHANGELOG\">mkdocs-material's changelog</a>.</em></p>\n<blockquote>\n<p>mkdocs-material-8.4.2 (2022-08-27)</p>\n<ul>\n<li>Updated Slovenian translations</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4277\">#4277</a>: Feedback widget hidden after navigation with instant loading</li>\n<li>Fixed numeric tags in front matter breaking search functionality</li>\n</ul>\n<p>mkdocs-material-8.4.1+insiders-4.22.0 (2022-08-21)</p>\n<ul>\n<li>Added support for navigation status</li>\n</ul>\n<p>mkdocs-material-8.4.1 (2022-08-21)</p>\n<ul>\n<li>Updated Croatian and Hebrew translations</li>\n</ul>\n<p>mkdocs-material-8.4.0+insiders-4.21.1 (2022-08-13)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4176\">#4176</a>: Broken image when avatar is served by Gravatar</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4212\">#4212</a>: Deferred search initialization for file:// locations</li>\n</ul>\n<p>mkdocs-material-8.4.0 (2022-08-13)</p>\n<ul>\n<li>Added support for cookie consent</li>\n<li>Added support for feedback widget (Was this page helpful?)</li>\n<li>Added support for dismissable announcement bar</li>\n<li>Added Armenian, Lithuanian, Tagalog, and Urdu translations</li>\n</ul>\n<p>mkdocs-material-8.3.9+insiders-4.21.0 (2022-07-17)</p>\n<ul>\n<li>Added meta plugin: set front matter for all pages in a folder</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4114\">#4114</a>: Tags plugin fails if only tags_extra_files is set</li>\n</ul>\n<p>mkdocs-material-8.3.9+insiders-4.20.1 (2022-07-11)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4105\">#4105</a>: Tags plugin fails if tags_file is not set (4.20.0 regression)</li>\n</ul>\n<p>mkdocs-material-8.3.9+insiders-4.20.0 (2022-07-07)</p>\n<ul>\n<li>Added support for additional tags indexes</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4100\">#4100</a>: Tag icons not shown in tags index</li>\n</ul>\n<p>mkdocs-material-8.3.9+insiders-4.19.2 (2022-07-04)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4051\">#4051</a>: Privacy plugin fails if symlinking isn't allowed on Windows</li>\n</ul>\n<p>mkdocs-material-8.3.9 (2022-07-04)</p>\n<ul>\n<li>Updated Taiwanese translations for search</li>\n<li>Allow ids for content tabs with special characters (for mkdocstrings)</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4083\">#4083</a>: home not clickable when using versioning (8.3.5 regression)</li>\n</ul>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/ad3d720c620397baeba62e3c5677524c24b28aee\"><code>ad3d720</code></a> Documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/3125543c4f1ac22b7bf5be9a3cea9680aee98f05\"><code>3125543</code></a> Prepare 8.4.2 release</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/46d06c1c1df6a371cbdb35ecbe2db2e0871997c3\"><code>46d06c1</code></a> Fixed feedback widget not shown when using instant loading</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/86378edb601d2c44a936977cda80b919ccbc377b\"><code>86378ed</code></a> Updated dependencies</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/662b33d6edc2591617a6bfdecf3eb9db941c843a\"><code>662b33d</code></a> Merge branch 'master' of github.com:squidfunk/mkdocs-material</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/4c4e3c0aea21757b808f24d5b4e90173dbc1c074\"><code>4c4e3c0</code></a> Fixed numeric tags breaking search</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/2e8ebf58a50ff52c22f45598f2c14dc16b9fc1a8\"><code>2e8ebf5</code></a> Updated Slovenian translations (<a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4284\">#4284</a>)</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/3fbd04860eb6b6eda522afc02c55eafdba08d7c6\"><code>3fbd048</code></a> Merge branch 'master' of github.com:squidfunk/mkdocs-material</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/60dd31d69721fcbeb9e21e7199ea225b29922f83\"><code>60dd31d</code></a> Added Jitterbit to premium sponsors</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/fdf90b7ba16fb2d84f80cf05fecf8005ac431fd5\"><code>fdf90b7</code></a> Updated FontAwesome icon names (<a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4279\">#4279</a>)</li>\n<li>See full diff in <a href=\"https://github.com/squidfunk/mkdocs-material/compare/8.4.1...8.4.2\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\nDependabot will merge this PR once it's up-to-date and CI passes on it, as requested by @RomainMuller.\n\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-08-30T10:29:58Z",
          "tree_id": "ec073e42518d6b174fac664f66db2ca0eaf9e32d",
          "url": "https://github.com/aws/jsii/commit/c482bcd3260758c350a9322e0788edcd25fe22cf"
        },
        "date": 1661859963428,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 107840.48310850002,
            "unit": "milliseconds",
            "range": 8368057.326457444,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 107840.48310850002 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 74985.27718615002,
            "unit": "milliseconds",
            "range": 1382168.1510322925,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 74985.27718615002 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.com",
            "name": "🧑🏻‍💻 Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "rmuller@amazon.com",
            "name": "🧑🏻‍💻 Romain Marcadier",
            "username": "RomainMuller"
          },
          "distinct": true,
          "id": "1fd58db1e94a0024d173d53597416f1d2a2fa941",
          "message": "fix(pacmak): crash when generating java code\n\nA missing condition in the code generator could have resulted\nin attempting to read a property on undefined, resulting in\na crash.",
          "timestamp": "2022-08-30T13:21:51+02:00",
          "tree_id": "0327e905ac2f027cf49d7b9f54cc21d9e11d6842",
          "url": "https://github.com/aws/jsii/commit/1fd58db1e94a0024d173d53597416f1d2a2fa941"
        },
        "date": 1661862394781,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 85335.52889234999,
            "unit": "milliseconds",
            "range": 8535489.535748985,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 85335.52889234999 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 58547.724800749995,
            "unit": "milliseconds",
            "range": 797659.7645818049,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 58547.724800749995 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "43080478+aws-cdk-automation@users.noreply.github.com",
            "name": "AWS CDK Automation",
            "username": "aws-cdk-automation"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "283aa56675c0df843149563e073649a373a5837d",
          "message": "chore: npm-check-updates && yarn upgrade (#3721)\n\nRan npm-check-updates and yarn upgrade to keep the `yarn.lock` file up-to-date.",
          "timestamp": "2022-08-30T12:17:38Z",
          "tree_id": "b808056ab2328a56d3836f66e75e26025018649a",
          "url": "https://github.com/aws/jsii/commit/283aa56675c0df843149563e073649a373a5837d"
        },
        "date": 1661865123365,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 71608.75392395006,
            "unit": "milliseconds",
            "range": 254339.16404986737,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 71608.75392395006 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 49516.256124249994,
            "unit": "milliseconds",
            "range": 34184.60557686035,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 49516.256124249994 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "4a52d4cbc31e88d744ed84d5a64df8c8f9651017",
          "message": "feat(java): utility to perform unsafe cast (#3730)\n\nAdds an `UnsafeCast.unsafeCast` method to the Jsii runtime for Java that\nallows unsafely casting an instance to a managed interface of the user's\nchoice.\n\nThis can be useful when dealing with type unions composed of interfaces\nor structs, as there is otherwise no way to convert the instance without\njumping through hoops.\n\nFixes https://github.com/aws/jsii/issues/3726 (sort of)\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-08-30T13:57:58Z",
          "tree_id": "71e748d4b26a5a1d2acc7ab180f5a502ac476fc0",
          "url": "https://github.com/aws/jsii/commit/4a52d4cbc31e88d744ed84d5a64df8c8f9651017"
        },
        "date": 1661872528831,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 105289.98083235002,
            "unit": "milliseconds",
            "range": 2389241.458852303,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 105289.98083235002 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 74684.03570879999,
            "unit": "milliseconds",
            "range": 251100.74232410817,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 74684.03570879999 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "4c2dcd5562b2abdfb2a454cb0ee487c4a0533e12",
          "message": "feat(kernel): experimental runtime package cache (#3724)\n\nAdds an experimental (hence opt-in) feature that caches the contents of\nloaded libraries in a directory that persists between executions, in\norder to spare the time it takes to extract the tarballs.\n\nWhen this feature is enabled, packages present in the cache will be used\nas-is (i.e: they are not checked for tampering) instead of being\nextracted from the tarball. The cache is keyed on:\n- The hash of the tarball\n- The name of the library\n- The version of the library\n\nObjects in the cache will expire if they are not used for 30 days, and\nare subsequently removed from disk (this avoids a cache growing\nextremely large over time).\n\nIn order to enable the feature, the following environment variables are\nused:\n- `JSII_RUNTIME_PACKAGE_CACHE` must be set to `enabled` in order for the\n  package cache to be active at all;\n- `JSII_RUNTIME_PACKAGE_CACHE_ROOT` can be used to change which\n  directory is used as a cache root. It defaults to:\n  * On MacOS: `$HOME/Library/Caches/com.amazonaws.jsii`\n  * On Linux: `$HOME/.cache/aws/jsii/package-cache`\n  * On Windows: `%LOCALAPPDATA%\\AWS\\jsii\\package-cache`\n  * On other platforms: `$TMP/aws-jsii-package-cache`\n- `JSII_RUNTIME_PACKAGE_CACHE_TTL` can be used to change the default\n  time entries will remain in cache before expiring if they are not\n  used. This defaults to 30 days, and the value is expressed in days.\n  Set to `0` to immediately expire all the cache's content.\n\nWhen troubleshooting load performance, it is possible to obtain timing\ndata for some critical parts of the library load process within the jsii\nkernel by setting `JSII_DEBUG_TIMING` environment variable.\n\nRelated to #3389\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-08-30T15:11:23Z",
          "tree_id": "a1f41b4deaa23a0bb1843ac2743a8778df9f9b3f",
          "url": "https://github.com/aws/jsii/commit/4c2dcd5562b2abdfb2a454cb0ee487c4a0533e12"
        },
        "date": 1661875293905,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 63524.494314950054,
            "unit": "milliseconds",
            "range": 3078905.1623573476,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 63524.494314950054 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 46175.39797960002,
            "unit": "milliseconds",
            "range": 61337.13373678913,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 46175.39797960002 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "cf04f79d28d10861a7e3e7d80b7dfb5dabd0068b",
          "message": "fix(java): type generation code-gen issues (#3735)\n\nSome collection validations were emitted twice, due to a bad merge\nconflict resolution.\n\nAdditionally, in certain cases where overrides are being emitted for\ntype unions, the type checking code made unnecessary assertions, some of\nwhich ending up being prohibited by the compiler.\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-08-30T21:27:15Z",
          "tree_id": "873369955add60bd2cc024a1aff104505e9cdeff",
          "url": "https://github.com/aws/jsii/commit/cf04f79d28d10861a7e3e7d80b7dfb5dabd0068b"
        },
        "date": 1661899458448,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 106237.78462295006,
            "unit": "milliseconds",
            "range": 5683287.894118441,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 106237.78462295006 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 73758.26778485,
            "unit": "milliseconds",
            "range": 887906.490916339,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 73758.26778485 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "883f17efad38e2d81bcb931060b5ff09f41fc719",
          "message": "chore: update sudoers settings (#3737)\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-09-01T19:45:55Z",
          "tree_id": "fdafb14f16f0687872f6fe94b37f0e04f8ed0ce0",
          "url": "https://github.com/aws/jsii/commit/883f17efad38e2d81bcb931060b5ff09f41fc719"
        },
        "date": 1662064725497,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 65617.20817094999,
            "unit": "milliseconds",
            "range": 3748702.24289273,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 65617.20817094999 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 47186.645235650016,
            "unit": "milliseconds",
            "range": 479560.6352310837,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 47186.645235650016 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "37929162+mergify[bot]@users.noreply.github.com",
            "name": "mergify[bot]",
            "username": "mergify[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "2c027f5ca66865a81a47b7f51922644987d8397e",
          "message": "chore(release): 1.67.0 (#3739)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/bump/1.67.0/CHANGELOG.md)",
          "timestamp": "2022-09-02T15:42:22Z",
          "tree_id": "bc156afc5b17148e27df2ab2a885fcabd3114b1c",
          "url": "https://github.com/aws/jsii/commit/2c027f5ca66865a81a47b7f51922644987d8397e"
        },
        "date": 1662137913316,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 104133.73287110003,
            "unit": "milliseconds",
            "range": 5887096.039000919,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 104133.73287110003 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 72415.40099834996,
            "unit": "milliseconds",
            "range": 2144049.6607575137,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 72415.40099834996 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "37929162+mergify[bot]@users.noreply.github.com",
            "name": "mergify[bot]",
            "username": "mergify[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "0269e1ba0463f0c9f9d4ef2d9ffd5d9eb3ca6b74",
          "message": "chore(merge-back): 1.67.0 (#3740)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/merge-back/1.67.0/CHANGELOG.md)",
          "timestamp": "2022-09-02T19:43:14Z",
          "tree_id": "bc156afc5b17148e27df2ab2a885fcabd3114b1c",
          "url": "https://github.com/aws/jsii/commit/0269e1ba0463f0c9f9d4ef2d9ffd5d9eb3ca6b74"
        },
        "date": 1662151873691,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 94494.55420505004,
            "unit": "milliseconds",
            "range": 2078331.7953953748,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 94494.55420505004 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 65644.050838,
            "unit": "milliseconds",
            "range": 490610.12161104335,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 65644.050838 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "2f918bdfe27cf22ba6067ada3fd87e5b9ef58005",
          "message": "chore(deps): Bump Microsoft.CodeAnalysis.CSharp.Workspaces from 4.2.0 to 4.3.0 in /packages/@jsii/dotnet-runtime-test/test (#3744)\n\nBumps [Microsoft.CodeAnalysis.CSharp.Workspaces](https://github.com/dotnet/roslyn) from 4.2.0 to 4.3.0.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/dotnet/roslyn/releases\">Microsoft.CodeAnalysis.CSharp.Workspaces's releases</a>.</em></p>\n<blockquote>\n<h2>.NET 6.0.1</h2>\n<p><a href=\"https://github.com/dotnet/core/releases/tag/v6.0.1\">Release</a></p>\n<h2>.NET 5.0.4</h2>\n<p><a href=\"https://github.com/dotnet/core/releases/tag/v5.0.4\">Release</a></p>\n<h2>.NET 5.0.2</h2>\n<p><a href=\"https://github.com/dotnet/core/blob/master/release-notes/5.0/5.0.2/5.0.2.md\">Release Notes</a>\n<a href=\"https://github.com/dotnet/core/blob/master/release-notes/5.0/5.0.2/5.0.2-install-instructions.md\">Install Instructions</a></p>\n<h1>Repos</h1>\n<ul>\n<li><a href=\"https://github.com/dotnet/core/releases/tag/v5.0.2\">Core</a></li>\n</ul>\n</blockquote>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/dotnet/roslyn/blob/main/docs/Breaking%20API%20Changes.md\">Microsoft.CodeAnalysis.CSharp.Workspaces's changelog</a>.</em></p>\n<blockquote>\n<h1>API Breaking Changes</h1>\n<h1>Version 1.1.0</h1>\n<h3>Removed VisualBasicCommandLineParser.ctor</h3>\n<p>During a toolset update we noticed the constructor on <code>VisualBasicCommandLineParser</code> was <code>public</code>.  This in turn made many of the <code>protected</code> members of <code>CommandLineParser</code> a part of the API surface as it gave external customers an inheritance path.</p>\n<p>It was never the intent for these members to be a part of the supported API surface.  Creation of the parsers is meant to be done via the <code>Default</code> singleton properties.  There seems to be little risk that we broke any customers here and hence we decided to remove this API.</p>\n<p>PR: <a href=\"https://github-redirect.dependabot.com/dotnet/roslyn/pull/4169\">dotnet/roslyn#4169</a></p>\n<h3>Changed Simplifier methods to throw ArgumentNullExceptions</h3>\n<p>Changed Simplifier.ReduceAsync, Simplifier.ExpandAsync, and Simplifier.Expand methods to throw ArgumentNullExceptions if any non-optional, nullable arguments are passed in.  Previously the user would get a NullReferenceException for synchronous methods and an AggregateException containing a NullReferenceException for asynchronous methods.</p>\n<p>PR: <a href=\"https://github-redirect.dependabot.com/dotnet/roslyn/pull/5144\">dotnet/roslyn#5144</a></p>\n<h1>Version 1.3.0</h1>\n<h3>Treat a method marked with both public and private flags as private</h3>\n<p>The scenario is loading an assembly where some methods, fields or nested types have accessibility flags set to 7 (all three bits set), which mean public AND private.\nAfter the fix, such flags are loaded to mean private.\nThe compat change is we’re trading a compile-time success and runtime failure (native compiler) against a compile-time error (restoring the behavior of v1.2).</p>\n<p>Details below:</p>\n<ul>\n<li>The native compiler successfully compiles the method and field case (those only yield runtime error System.TypeLoadException: Invalid Field Access Flags) and reported an accessibility error on the nested type.</li>\n<li>The 1.2 compiler generated errors:</li>\n</ul>\n<pre><code>error BC30390: 'C.Private Overloads Sub M()' is not accessible in this context because it is 'Private'.\nerror BC30389: 'C.F' is not accessible in this context because it is 'Private'.\nerror BC30389: 'C.C2' is not accessible in this context because it is 'Protected Friend'.\nerror BC30390: 'C2.Private Overloads Sub M2()' is not accessible in this context because it is 'Private'.\n</code></pre>\n<ul>\n<li>The 1.3 compiler crashes.</li>\n<li>After fix, the same errors as 1.2 are generated again.</li>\n</ul>\n<p>PR: <a href=\"https://github-redirect.dependabot.com/dotnet/roslyn/pull/11547\">dotnet/roslyn#11547</a></p>\n<h3>Don't emit bad DateTimeConstant, and load bad BadTimeConstant as default value instead</h3>\n<p>The change affects compatibility in two ways:</p>\n<ul>\n<li>When loading an invalid DateTimeConstant(-1), the compiler will use default(DateTime) instead, whereas the native compiler would produce code that fails to execute.</li>\n<li>DateTimeConstant(-1) will still count when we check that you don’t specify two default values. The compiler will produce an error, instead of succeeding (and producing IL with two attributes).</li>\n</ul>\n<p>PR: <a href=\"https://github-redirect.dependabot.com/dotnet/roslyn/pull/11536\">dotnet/roslyn#11536</a></p>\n<h1>Version 4.1.0</h1>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/dotnet/roslyn/commit/88ca01f726a023cf7cf84667c2b82e68fa4dfca3\"><code>88ca01f</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/dotnet/roslyn/issues/33940\">#33940</a> from v-mdriml/localization</li>\n<li><a href=\"https://github.com/dotnet/roslyn/commit/f68445e17089c5de80d07e39b0152ecef1792646\"><code>f68445e</code></a> LOC CHECKIN | dotnet/roslyn dev16.0-vs-deps | 20190312 fix</li>\n<li><a href=\"https://github.com/dotnet/roslyn/commit/1a1120ccc5f2af1ddfbff488a629308a0fdf3cdf\"><code>1a1120c</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/dotnet/roslyn/issues/34023\">#34023</a> from dotnet/merges/dev16.0-to-dev16.0-vs-deps</li>\n<li><a href=\"https://github.com/dotnet/roslyn/commit/aaa74511adf85a12a36f15df163bf85ef2c1067a\"><code>aaa7451</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/dotnet/roslyn/issues/33902\">#33902</a> from genlu/fix33890</li>\n<li><a href=\"https://github.com/dotnet/roslyn/commit/d57da974d61652923a75feb414aab203bcce5497\"><code>d57da97</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/dotnet/roslyn/issues/33990\">#33990</a> from dotnet/merges/dev16.0-to-dev16.0-vs-deps</li>\n<li><a href=\"https://github.com/dotnet/roslyn/commit/90ce25341862025e1f1db2381737735882054a66\"><code>90ce253</code></a> Update to Arcade 1.0.0-beta.19157.23 (<a href=\"https://github-redirect.dependabot.com/dotnet/roslyn/issues/33974\">#33974</a>)</li>\n<li><a href=\"https://github.com/dotnet/roslyn/commit/c03b88306d6688e732ba708d2fc4f27de4d6c9b0\"><code>c03b883</code></a> Fix type</li>\n<li><a href=\"https://github.com/dotnet/roslyn/commit/68db1a0f2fcea2425f950125fd18d1cc1b230d9f\"><code>68db1a0</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/dotnet/roslyn/issues/33827\">#33827</a> from sharwell/caret-visible</li>\n<li><a href=\"https://github.com/dotnet/roslyn/commit/516a25d0456fb8cc00c3df39ba94740200d474b5\"><code>516a25d</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/dotnet/roslyn/issues/33828\">#33828</a> from sharwell/line-ender</li>\n<li><a href=\"https://github.com/dotnet/roslyn/commit/b6c6008b86538ec0effdefa7626d956be368931d\"><code>b6c6008</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/dotnet/roslyn/issues/33830\">#33830</a> from sharwell/readonly-completion</li>\n<li>Additional commits viewable in <a href=\"https://github.com/dotnet/roslyn/compare/v4.2.0...Visual-Studio-2019-Version-16.0-Preview-4.3\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\n[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=Microsoft.CodeAnalysis.CSharp.Workspaces&package-manager=nuget&previous-version=4.2.0&new-version=4.3.0)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-09-08T16:58:52Z",
          "tree_id": "b345b7e56c94de1fadbabfcba6c90a280e360a7e",
          "url": "https://github.com/aws/jsii/commit/2f918bdfe27cf22ba6067ada3fd87e5b9ef58005"
        },
        "date": 1662659458231,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 64369.001627849975,
            "unit": "milliseconds",
            "range": 2597272.2594176014,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 64369.001627849975 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 46499.61470905001,
            "unit": "milliseconds",
            "range": 61518.60546806003,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 46499.61470905001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "63983f92be39129a4328b07022260a301aa57b21",
          "message": "chore(deps): Update black requirement from ~=22.6 to ~=22.8 in /packages/@jsii/python-runtime (#3743)\n\nUpdates the requirements on [black](https://github.com/psf/black) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/psf/black/releases\">black's releases</a>.</em></p>\n<blockquote>\n<h2>22.8.0</h2>\n<h3>Highlights</h3>\n<ul>\n<li>Python 3.11 is now supported, except for <em>blackd</em> as aiohttp does not support 3.11 as of publishing (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3234\">#3234</a>)</li>\n<li>This is the last release that supports running <em>Black</em> on Python 3.6 (formatting 3.6 code will continue to be supported until further notice)</li>\n<li>Reword the stability policy to say that we may, in rare cases, make changes that affect code that was not previously formatted by <em>Black</em> (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3155\">#3155</a>)</li>\n</ul>\n<h3>Stable style</h3>\n<ul>\n<li>Fix an infinite loop when using <code># fmt: on/off</code> in the middle of an expression or code block (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3158\">#3158</a>)</li>\n<li>Fix incorrect handling of <code># fmt: skip</code> on colon (<code>:</code>) lines (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3148\">#3148</a>)</li>\n<li>Comments are no longer deleted when a line had spaces removed around power operators (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/2874\">#2874</a>)</li>\n</ul>\n<h3>Preview style</h3>\n<ul>\n<li>Single-character closing docstring quotes are no longer moved to their own line as this is invalid. This was a bug introduced in version 22.6.0. (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3166\">#3166</a>)</li>\n<li><code>--skip-string-normalization</code> / <code>-S</code> now prevents docstring prefixes from being normalized as expected (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3168\">#3168</a>)</li>\n<li>When using <code>--skip-magic-trailing-comma</code> or <code>-C</code>, trailing commas are stripped from subscript expressions with more than 1 element (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3209\">#3209</a>)</li>\n<li>Implicitly concatenated strings inside a list, set, or tuple are now wrapped inside parentheses (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3162\">#3162</a>)</li>\n<li>Fix a string merging/split issue when a comment is present in the middle of implicitly concatenated strings on its own line (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3227\">#3227</a>)</li>\n</ul>\n<h3><em>Blackd</em></h3>\n<ul>\n<li><code>blackd</code> now supports enabling the preview style via the <code>X-Preview</code> header (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3217\">#3217</a>)</li>\n</ul>\n<h3>Configuration</h3>\n<ul>\n<li>Black now uses the presence of debug f-strings to detect target version (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3215\">#3215</a>)</li>\n<li>Fix misdetection of project root and verbose logging of sources in cases involving <code>--stdin-filename</code> (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3216\">#3216</a>)</li>\n<li>Immediate <code>.gitignore</code> files in source directories given on the command line are now also respected, previously only <code>.gitignore</code> files in the project root and automatically discovered directories were respected (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3237\">#3237</a>)</li>\n</ul>\n<h3>Documentation</h3>\n<ul>\n<li>Recommend using BlackConnect in IntelliJ IDEs (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3150\">#3150</a>)</li>\n</ul>\n<h3>Integrations</h3>\n<ul>\n<li>Vim plugin: prefix messages with <code>Black: </code> so it's clear they come from Black (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3194\">#3194</a>)</li>\n<li>Docker: changed to a /opt/venv installation + added to PATH to be available to non-root users (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3202\">#3202</a>)</li>\n</ul>\n<h3>Output</h3>\n<ul>\n<li>Change from deprecated <code>asyncio.get_event_loop()</code> to create our event loop which removes DeprecationWarning (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3164\">#3164</a>)</li>\n<li>Remove logging from internal <code>blib2to3</code> library since it regularly emits error logs about failed caching that can and should be ignored (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3193\">#3193</a>)</li>\n</ul>\n<h3>Parser</h3>\n<ul>\n<li>Type comments are now included in the AST equivalence check consistently so accidental deletion raises an error. Though type comments can't be tracked when running on PyPy 3.7 due to standard library limitations. (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/2874\">#2874</a>)</li>\n</ul>\n<h3>Performance</h3>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/psf/black/blob/main/CHANGES.md\">black's changelog</a>.</em></p>\n<blockquote>\n<h2>22.8.0</h2>\n<h3>Highlights</h3>\n<ul>\n<li>Python 3.11 is now supported, except for <em>blackd</em> as aiohttp does not support 3.11 as\nof publishing (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3234\">#3234</a>)</li>\n<li>This is the last release that supports running <em>Black</em> on Python 3.6 (formatting 3.6\ncode will continue to be supported until further notice)</li>\n<li>Reword the stability policy to say that we may, in rare cases, make changes that\naffect code that was not previously formatted by <em>Black</em> (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3155\">#3155</a>)</li>\n</ul>\n<h3>Stable style</h3>\n<ul>\n<li>Fix an infinite loop when using <code># fmt: on/off</code> in the middle of an expression or code\nblock (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3158\">#3158</a>)</li>\n<li>Fix incorrect handling of <code># fmt: skip</code> on colon (<code>:</code>) lines (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3148\">#3148</a>)</li>\n<li>Comments are no longer deleted when a line had spaces removed around power operators\n(<a href=\"https://github-redirect.dependabot.com/psf/black/issues/2874\">#2874</a>)</li>\n</ul>\n<h3>Preview style</h3>\n<ul>\n<li>Single-character closing docstring quotes are no longer moved to their own line as\nthis is invalid. This was a bug introduced in version 22.6.0. (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3166\">#3166</a>)</li>\n<li><code>--skip-string-normalization</code> / <code>-S</code> now prevents docstring prefixes from being\nnormalized as expected (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3168\">#3168</a>)</li>\n<li>When using <code>--skip-magic-trailing-comma</code> or <code>-C</code>, trailing commas are stripped from\nsubscript expressions with more than 1 element (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3209\">#3209</a>)</li>\n<li>Implicitly concatenated strings inside a list, set, or tuple are now wrapped inside\nparentheses (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3162\">#3162</a>)</li>\n<li>Fix a string merging/split issue when a comment is present in the middle of implicitly\nconcatenated strings on its own line (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3227\">#3227</a>)</li>\n</ul>\n<h3><em>Blackd</em></h3>\n<ul>\n<li><code>blackd</code> now supports enabling the preview style via the <code>X-Preview</code> header (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3217\">#3217</a>)</li>\n</ul>\n<h3>Configuration</h3>\n<ul>\n<li>Black now uses the presence of debug f-strings to detect target version (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3215\">#3215</a>)</li>\n<li>Fix misdetection of project root and verbose logging of sources in cases involving\n<code>--stdin-filename</code> (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3216\">#3216</a>)</li>\n<li>Immediate <code>.gitignore</code> files in source directories given on the command line are now\nalso respected, previously only <code>.gitignore</code> files in the project root and\nautomatically discovered directories were respected (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3237\">#3237</a>)</li>\n</ul>\n<h3>Documentation</h3>\n<ul>\n<li>Recommend using BlackConnect in IntelliJ IDEs (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3150\">#3150</a>)</li>\n</ul>\n<h3>Integrations</h3>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/psf/black/commit/2018e667a6a36ee3fbfa8041cd36512f92f60d49\"><code>2018e66</code></a> Prepare docs for release 22.8.0 (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3248\">#3248</a>)</li>\n<li><a href=\"https://github.com/psf/black/commit/0019261abcf6d9e564ba32d3cc15534b9026f29e\"><code>0019261</code></a> Update stable branch after publishing to PyPI (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3223\">#3223</a>)</li>\n<li><a href=\"https://github.com/psf/black/commit/7757078ecd84d349bb24ab61e79062ba50162ef9\"><code>7757078</code></a> Improve &amp; update release process to reflect recent changes (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3242\">#3242</a>)</li>\n<li><a href=\"https://github.com/psf/black/commit/767604e03f5e454ae5b5c268cd5831c672f46de8\"><code>767604e</code></a> Use .gitignore files in the initial source directories (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3237\">#3237</a>)</li>\n<li><a href=\"https://github.com/psf/black/commit/2c90480e1a102ab0fac57737d2ba5143d82abed7\"><code>2c90480</code></a> Use strict mypy checking (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3222\">#3222</a>)</li>\n<li><a href=\"https://github.com/psf/black/commit/ba618a307a30a119b4fafe526ebf7d5f092ba981\"><code>ba618a3</code></a> Add parens around implicit string concatenations where it increases readabili...</li>\n<li><a href=\"https://github.com/psf/black/commit/c0cc19b5b3371842d696875897bebefebd5e1596\"><code>c0cc19b</code></a> Delay worker count determination</li>\n<li><a href=\"https://github.com/psf/black/commit/afed2c01903465f9a486ac481a66aa3413cc1b01\"><code>afed2c0</code></a> Load .gitignore and exclude regex at time of use</li>\n<li><a href=\"https://github.com/psf/black/commit/e269f44b25737360e0dc65379f889dfa931dc68a\"><code>e269f44</code></a> Lazily import parallelized format modules</li>\n<li><a href=\"https://github.com/psf/black/commit/c47b91f513052cd39b818ea7c19716423c85c04e\"><code>c47b91f</code></a> Fix misdetection of project root with <code>--stdin-filename</code> (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3216\">#3216</a>)</li>\n<li>Additional commits viewable in <a href=\"https://github.com/psf/black/compare/22.6.0...22.8.0\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-09-08T18:11:27Z",
          "tree_id": "b878036298b875323e46c78b92ddb42a3072e2e2",
          "url": "https://github.com/aws/jsii/commit/63983f92be39129a4328b07022260a301aa57b21"
        },
        "date": 1662663665351,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 63427.70640914998,
            "unit": "milliseconds",
            "range": 1759645.6873605892,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 63427.70640914998 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 45612.20373735001,
            "unit": "milliseconds",
            "range": 103236.34311696954,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 45612.20373735001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "74b3eaebb1d0fc654de404876e80ee22e43135b6",
          "message": "chore(deps): Bump Microsoft.NET.Test.Sdk from 17.3.0 to 17.3.1 in /packages/@jsii/dotnet-runtime-test/test (#3745)\n\nBumps [Microsoft.NET.Test.Sdk](https://github.com/microsoft/vstest) from 17.3.0 to 17.3.1.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/microsoft/vstest/releases\">Microsoft.NET.Test.Sdk's releases</a>.</em></p>\n<blockquote>\n<h2>v17.3.1</h2>\n<p>See the release notes <a href=\"https://github.com/microsoft/vstest-docs/blob/main/docs/releases.md#1731\">here</a>.</p>\n</blockquote>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/microsoft/vstest/commit/83d2f8162d29a66a8ff323c4bba93c8250013511\"><code>83d2f81</code></a> Bump version to 17.3.1 and cherry-pick loc files (<a href=\"https://github-redirect.dependabot.com/microsoft/vstest/issues/3966\">#3966</a>)</li>\n<li><a href=\"https://github.com/microsoft/vstest/commit/016e237314184136ec3512e615d6d8cc4d78b41d\"><code>016e237</code></a> [rel/17.3] Do not match .NET Standard to Dotnet testhost runner (<a href=\"https://github-redirect.dependabot.com/microsoft/vstest/issues/3958\">#3958</a>)</li>\n<li>See full diff in <a href=\"https://github.com/microsoft/vstest/compare/v17.3.0...v17.3.1\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\n[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=Microsoft.NET.Test.Sdk&package-manager=nuget&previous-version=17.3.0&new-version=17.3.1)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-09-08T19:23:56Z",
          "tree_id": "b451bd0cf9f363815df77b584c9f609dfcf40894",
          "url": "https://github.com/aws/jsii/commit/74b3eaebb1d0fc654de404876e80ee22e43135b6"
        },
        "date": 1662668419053,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 76422.46655919998,
            "unit": "milliseconds",
            "range": 204498.08717032825,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 76422.46655919998 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 53126.24290675002,
            "unit": "milliseconds",
            "range": 407907.1156291029,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 53126.24290675002 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "danielmschmidt92@gmail.com",
            "name": "Daniel Schmidt",
            "username": "DanielMSchmidt"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "12173b29a8458c94c3e08ef540f7a2a16b41c3bc",
          "message": "perf(jsii-pacmak): cache type lookups for go (#3748)\n\nThis improved the performance of cdktf get on our go/azure example by two minutes\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-09-12T15:45:26Z",
          "tree_id": "36c40d69de19469118104aa9851a3a08bb176107",
          "url": "https://github.com/aws/jsii/commit/12173b29a8458c94c3e08ef540f7a2a16b41c3bc"
        },
        "date": 1663000876412,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 72562.19938915002,
            "unit": "milliseconds",
            "range": 1441226.758126701,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 72562.19938915002 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 50365.57910894999,
            "unit": "milliseconds",
            "range": 111694.14023090512,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 50365.57910894999 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "1cffb04a83ee58713e897b578ded6bbcbbf7a326",
          "message": "chore(deps-dev): Update mkdocs-material requirement from ~=8.4.2 to ~=8.4.4 in /gh-pages (#3749)\n\nUpdates the requirements on [mkdocs-material](https://github.com/squidfunk/mkdocs-material) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/releases\">mkdocs-material's releases</a>.</em></p>\n<blockquote>\n<h2>mkdocs-material-8.4.4</h2>\n<ul>\n<li>Moved comments integration to separate partial (<code>comments.html</code>)</li>\n</ul>\n</blockquote>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/blob/master/CHANGELOG\">mkdocs-material's changelog</a>.</em></p>\n<blockquote>\n<p>mkdocs-material-8.4.4+insiders-4.23.0 (2022-09-12)</p>\n<ul>\n<li>Added blogging support via built-in blog plugin</li>\n</ul>\n<p>mkdocs-material-8.4.4 (2022-09-12)</p>\n<ul>\n<li>Moved comments integration to separate partial (comments.html)</li>\n</ul>\n<p>mkdocs-material-8.4.3+insiders-4.22.1 (2022-09-07)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4217\">#4217</a>: Tooltips in data tables render in wrong position</li>\n</ul>\n<p>mkdocs-material-8.4.3 (2022-09-07)</p>\n<ul>\n<li>Added Simple Icons to bundled icons (+2,300 icons)</li>\n<li>Added support for changing edit icon</li>\n<li>Moved page actions to separate partial (actions.html)</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4291\">#4291</a>: Version switching doesn't stay on page when anchors are used</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4327\">#4327</a>: Links in data tables do not receive link styling</li>\n</ul>\n<p>mkdocs-material-8.4.2 (2022-08-27)</p>\n<ul>\n<li>Updated Slovenian translations</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4277\">#4277</a>: Feedback widget hidden after navigation with instant loading</li>\n<li>Fixed numeric tags in front matter breaking search functionality</li>\n</ul>\n<p>mkdocs-material-8.4.1+insiders-4.22.0 (2022-08-21)</p>\n<ul>\n<li>Added support for navigation status</li>\n</ul>\n<p>mkdocs-material-8.4.1 (2022-08-21)</p>\n<ul>\n<li>Updated Croatian and Hebrew translations</li>\n</ul>\n<p>mkdocs-material-8.4.0+insiders-4.21.1 (2022-08-13)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4176\">#4176</a>: Broken image when avatar is served by Gravatar</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4212\">#4212</a>: Deferred search initialization for file:// locations</li>\n</ul>\n<p>mkdocs-material-8.4.0 (2022-08-13)</p>\n<ul>\n<li>Added support for cookie consent</li>\n<li>Added support for feedback widget (Was this page helpful?)</li>\n<li>Added support for dismissable announcement bar</li>\n<li>Added Armenian, Lithuanian, Tagalog, and Urdu translations</li>\n</ul>\n<p>mkdocs-material-8.3.9+insiders-4.21.0 (2022-07-17)</p>\n<ul>\n<li>Added meta plugin: set front matter for all pages in a folder</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4114\">#4114</a>: Tags plugin fails if only tags_extra_files is set</li>\n</ul>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/f91eadca3c96b86ae26a426678c810e4eca44798\"><code>f91eadc</code></a> Updated Insiders changelog</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/edf17842e861f590ae227cc96412803efea78466\"><code>edf1784</code></a> Updated Insiders changelog</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/69265de79c45d814e96fc5ffef62efc3b45f92db\"><code>69265de</code></a> Updated dependencies</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/a66e8f53305bf0385f2d355093e616b5961b96a3\"><code>a66e8f5</code></a> Prepare 8.4.4 release</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/09748aa3580f559396dc8de5c62c41cc2c48bc95\"><code>09748aa</code></a> Documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/a2f2bcee6b51b29df997eb00889de0fcaa67344f\"><code>a2f2bce</code></a> Fixed Github Actions workflow</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/1cf9d45c28a14548170ce007935b20f41692db61\"><code>1cf9d45</code></a> Updated documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/871f6939aa70341d7b9bf1079fd6ea0883e95338\"><code>871f693</code></a> Updated dependencies</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/d9ce9bd933934fadbbad105aad4ffdc770dc9fcc\"><code>d9ce9bd</code></a> Documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/54d0a992b7f27453f4a4b12b58e7b33cc8cf4b46\"><code>54d0a99</code></a> Using <code>{{ super() }}</code> for extending a block (<a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4309\">#4309</a>)</li>\n<li>Additional commits viewable in <a href=\"https://github.com/squidfunk/mkdocs-material/compare/8.4.2...8.4.4\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-09-19T06:02:39Z",
          "tree_id": "03acffacbe61bc29d36a55f1bdcf1cec43675d7b",
          "url": "https://github.com/aws/jsii/commit/1cffb04a83ee58713e897b578ded6bbcbbf7a326"
        },
        "date": 1663570655709,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 72961.25222774994,
            "unit": "milliseconds",
            "range": 2220914.838581371,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 72961.25222774994 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 51173.68587640001,
            "unit": "milliseconds",
            "range": 348208.2797479095,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 51173.68587640001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "852b3dc5da113546bc090d99f9250104f526f5af",
          "message": "fix(jsii): unable to return Promise<void> (#3752)\n\nThe void-check only accounted for the literal `void` type, but failed to account for the `Promise<void>` case. This is now fixed.\n\nFixes #51\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-09-19T17:58:47Z",
          "tree_id": "5e0ef696bec147003a8347b9e7dd50c65a971fc5",
          "url": "https://github.com/aws/jsii/commit/852b3dc5da113546bc090d99f9250104f526f5af"
        },
        "date": 1663613263665,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 63108.62290309996,
            "unit": "milliseconds",
            "range": 2731974.107906886,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 63108.62290309996 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 45278.974355299986,
            "unit": "milliseconds",
            "range": 43519.46739098861,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 45278.974355299986 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "43080478+aws-cdk-automation@users.noreply.github.com",
            "name": "AWS CDK Automation",
            "username": "aws-cdk-automation"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "3d2126cea542f1adbb0e3cae18b8f4f0bfd6b8b0",
          "message": "chore: npm-check-updates && yarn upgrade (#3736)\n\nRan npm-check-updates and yarn upgrade to keep the `yarn.lock` file up-to-date.",
          "timestamp": "2022-09-20T10:23:40Z",
          "tree_id": "fdf45419e6ee240eb09422fbdebcc3d70465c5a6",
          "url": "https://github.com/aws/jsii/commit/3d2126cea542f1adbb0e3cae18b8f4f0bfd6b8b0"
        },
        "date": 1663673324124,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 85164.52534080006,
            "unit": "milliseconds",
            "range": 2544718.3759713443,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 85164.52534080006 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 59559.15144210004,
            "unit": "milliseconds",
            "range": 273881.7874700662,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 59559.15144210004 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "79951b73aedfbd5c639d72194846fd3da95d9462",
          "message": "chore(superchain): grant passwordless sudo to superchain user (#3758)\n\nInstead of granting only via `sudo` group, allow the `superchain` user to passwordless sudo, in hopes this fixes the currently broken behavior in GitHub Actions.\n\nAdditionally, remove the `dockerd-entrypoint.sh` script that did not work propertly and was neither tested, nor used (to our knowledge).\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-09-20T11:33:36Z",
          "tree_id": "bedb127aeeab5898cf00e7df2692c2c2c7fb40be",
          "url": "https://github.com/aws/jsii/commit/79951b73aedfbd5c639d72194846fd3da95d9462"
        },
        "date": 1663677741663,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 96323.00279139997,
            "unit": "milliseconds",
            "range": 3325061.8179154545,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 96323.00279139997 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 67611.30861050003,
            "unit": "milliseconds",
            "range": 180511.9009586855,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 67611.30861050003 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ee52c245896da346ea2395c5c50b2b09636ec1c4",
          "message": "chore(deps-dev): Update mkdocs-material requirement from ~=8.4.4 to ~=8.5.2 in /gh-pages (#3753)\n\nUpdates the requirements on [mkdocs-material](https://github.com/squidfunk/mkdocs-material) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/releases\">mkdocs-material's releases</a>.</em></p>\n<blockquote>\n<h2>mkdocs-material-8.5.2</h2>\n<ul>\n<li>Updated Mermaid.js to version 9.1.7</li>\n<li>Fixed overly large headlines in search results (8.5.0 regression)</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4358\">#4358</a>: Navigation sections appear as clickable (8.5.0 regression)</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4356\">#4356</a>: GitHub repository statistics fetched before consent</li>\n</ul>\n</blockquote>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/blob/master/CHANGELOG\">mkdocs-material's changelog</a>.</em></p>\n<blockquote>\n<p>mkdocs-material-8.5.2+insiders-4.23.5 (2022-09-18)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4367\">#4367</a>: Improved blog plugin date handling for MultiMarkdown syntax</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4374\">#4374</a>: Fixed invalid URLs of related links to other blog posts</li>\n</ul>\n<p>mkdocs-material-8.5.2 (2022-09-18)</p>\n<ul>\n<li>Updated Mermaid.js to version 9.1.7</li>\n<li>Fixed overly large headlines in search results (8.5.0 regression)</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4358\">#4358</a>: Navigation sections appear as clickable (8.5.0 regression)</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4356\">#4356</a>: GitHub repository statistics fetched before consent</li>\n</ul>\n<p>mkdocs-material-8.5.1 (2022-09-15)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4366\">#4366</a>: Removed dependencies with native extensions</li>\n</ul>\n<p>mkdocs-material-8.5.0+insiders-4.23.4 (2022-09-14)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4365\">#4365</a>: Recursion error in blog plugin due to deepcopy</li>\n<li>Fixed path errors for blog plugin on Windows</li>\n<li>Fixed publishing workflow in forked repositories</li>\n</ul>\n<p>mkdocs-material-8.5.0+insiders-4.23.3 (2022-09-13)</p>\n<ul>\n<li>Fixed previous and next page links for drafts of blog posts</li>\n</ul>\n<p>mkdocs-material-8.5.0 (2022-09-13)</p>\n<ul>\n<li>Added support for social cards</li>\n<li>Added support for code annotation anchor links (deep linking)</li>\n<li>Added support for code annotation comment stripping (syntax modifier)</li>\n<li>Added support for sidebars scrolling automatically to active item</li>\n<li>Added support for anchor following table of contents (= auto scroll)</li>\n<li>Added support for tag icons</li>\n</ul>\n<p>mkdocs-material-8.4.4+insiders-4.23.2 (2022-09-13)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4348\">#4348</a>: Blog plugin crashes on custom nav title</li>\n<li>Fixed blog plugin crashing when category contained only drafts</li>\n<li>Fixed rendering of content from blog index file</li>\n</ul>\n<p>mkdocs-material-8.4.4+insiders-4.23.1 (2022-09-12)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4345\">#4345</a>: Blog plugin errors with default settings</li>\n</ul>\n<p>mkdocs-material-8.4.4+insiders-4.23.0 (2022-09-12)</p>\n<ul>\n<li>Added blogging support via built-in blog plugin</li>\n</ul>\n<p>mkdocs-material-8.4.4 (2022-09-12)</p>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/c8a1f55947fd60409f21606092bc59a099016f2b\"><code>c8a1f55</code></a> Prepare 8.5.2 release</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/30d812888cb9dc1f4d3eb8699df0ecc887390a61\"><code>30d8128</code></a> Updated Mermaid to 9.1.7</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/8ee2de9998db71c85328fde4d8021394d649752b\"><code>8ee2de9</code></a> Fixed overly large headlines in search results (8.5.0 regression)</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/fc0e4fe6114e3bd94bc5f40339e4ea429ad577ba\"><code>fc0e4fe</code></a> Documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/6bd88485d29d9c9bc41fbccf8f8e6353e06950ca\"><code>6bd8848</code></a> Added recommended fonts for social cards and Asian languages (<a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4357\">#4357</a>)</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/a750a66f9c61783ceade9921e3a531d8f033b660\"><code>a750a66</code></a> Added guide for updating translations to contributing guide</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/06629ffdad51590bfdcc3ecd542072b1e5712a22\"><code>06629ff</code></a> Documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/6b1ce146832a1c8cc3578b17f4ca4d6f3af2553a\"><code>6b1ce14</code></a> Require consent for GitHub repository stats if consent is enabled</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/f30775fa0a77942247228510bd9cf50199ca7aed\"><code>f30775f</code></a> Fixed non-index navigation links appearing as clickable</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/c834dff30b03ef4f9dbe43416ad16234c2331163\"><code>c834dff</code></a> Added peer dependencies to documentation workflow</li>\n<li>Additional commits viewable in <a href=\"https://github.com/squidfunk/mkdocs-material/compare/8.4.4...8.5.2\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-09-20T12:30:58Z",
          "tree_id": "fc958ad303c3bb95669a97e3271313c16242f7b6",
          "url": "https://github.com/aws/jsii/commit/ee52c245896da346ea2395c5c50b2b09636ec1c4"
        },
        "date": 1663680340253,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 73591.61281230005,
            "unit": "milliseconds",
            "range": 138956.11861231067,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 73591.61281230005 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 50887.20083240002,
            "unit": "milliseconds",
            "range": 104725.24767358169,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 50887.20083240002 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ee52c245896da346ea2395c5c50b2b09636ec1c4",
          "message": "chore(deps-dev): Update mkdocs-material requirement from ~=8.4.4 to ~=8.5.2 in /gh-pages (#3753)\n\nUpdates the requirements on [mkdocs-material](https://github.com/squidfunk/mkdocs-material) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/releases\">mkdocs-material's releases</a>.</em></p>\n<blockquote>\n<h2>mkdocs-material-8.5.2</h2>\n<ul>\n<li>Updated Mermaid.js to version 9.1.7</li>\n<li>Fixed overly large headlines in search results (8.5.0 regression)</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4358\">#4358</a>: Navigation sections appear as clickable (8.5.0 regression)</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4356\">#4356</a>: GitHub repository statistics fetched before consent</li>\n</ul>\n</blockquote>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/blob/master/CHANGELOG\">mkdocs-material's changelog</a>.</em></p>\n<blockquote>\n<p>mkdocs-material-8.5.2+insiders-4.23.5 (2022-09-18)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4367\">#4367</a>: Improved blog plugin date handling for MultiMarkdown syntax</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4374\">#4374</a>: Fixed invalid URLs of related links to other blog posts</li>\n</ul>\n<p>mkdocs-material-8.5.2 (2022-09-18)</p>\n<ul>\n<li>Updated Mermaid.js to version 9.1.7</li>\n<li>Fixed overly large headlines in search results (8.5.0 regression)</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4358\">#4358</a>: Navigation sections appear as clickable (8.5.0 regression)</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4356\">#4356</a>: GitHub repository statistics fetched before consent</li>\n</ul>\n<p>mkdocs-material-8.5.1 (2022-09-15)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4366\">#4366</a>: Removed dependencies with native extensions</li>\n</ul>\n<p>mkdocs-material-8.5.0+insiders-4.23.4 (2022-09-14)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4365\">#4365</a>: Recursion error in blog plugin due to deepcopy</li>\n<li>Fixed path errors for blog plugin on Windows</li>\n<li>Fixed publishing workflow in forked repositories</li>\n</ul>\n<p>mkdocs-material-8.5.0+insiders-4.23.3 (2022-09-13)</p>\n<ul>\n<li>Fixed previous and next page links for drafts of blog posts</li>\n</ul>\n<p>mkdocs-material-8.5.0 (2022-09-13)</p>\n<ul>\n<li>Added support for social cards</li>\n<li>Added support for code annotation anchor links (deep linking)</li>\n<li>Added support for code annotation comment stripping (syntax modifier)</li>\n<li>Added support for sidebars scrolling automatically to active item</li>\n<li>Added support for anchor following table of contents (= auto scroll)</li>\n<li>Added support for tag icons</li>\n</ul>\n<p>mkdocs-material-8.4.4+insiders-4.23.2 (2022-09-13)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4348\">#4348</a>: Blog plugin crashes on custom nav title</li>\n<li>Fixed blog plugin crashing when category contained only drafts</li>\n<li>Fixed rendering of content from blog index file</li>\n</ul>\n<p>mkdocs-material-8.4.4+insiders-4.23.1 (2022-09-12)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4345\">#4345</a>: Blog plugin errors with default settings</li>\n</ul>\n<p>mkdocs-material-8.4.4+insiders-4.23.0 (2022-09-12)</p>\n<ul>\n<li>Added blogging support via built-in blog plugin</li>\n</ul>\n<p>mkdocs-material-8.4.4 (2022-09-12)</p>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/c8a1f55947fd60409f21606092bc59a099016f2b\"><code>c8a1f55</code></a> Prepare 8.5.2 release</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/30d812888cb9dc1f4d3eb8699df0ecc887390a61\"><code>30d8128</code></a> Updated Mermaid to 9.1.7</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/8ee2de9998db71c85328fde4d8021394d649752b\"><code>8ee2de9</code></a> Fixed overly large headlines in search results (8.5.0 regression)</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/fc0e4fe6114e3bd94bc5f40339e4ea429ad577ba\"><code>fc0e4fe</code></a> Documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/6bd88485d29d9c9bc41fbccf8f8e6353e06950ca\"><code>6bd8848</code></a> Added recommended fonts for social cards and Asian languages (<a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4357\">#4357</a>)</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/a750a66f9c61783ceade9921e3a531d8f033b660\"><code>a750a66</code></a> Added guide for updating translations to contributing guide</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/06629ffdad51590bfdcc3ecd542072b1e5712a22\"><code>06629ff</code></a> Documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/6b1ce146832a1c8cc3578b17f4ca4d6f3af2553a\"><code>6b1ce14</code></a> Require consent for GitHub repository stats if consent is enabled</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/f30775fa0a77942247228510bd9cf50199ca7aed\"><code>f30775f</code></a> Fixed non-index navigation links appearing as clickable</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/c834dff30b03ef4f9dbe43416ad16234c2331163\"><code>c834dff</code></a> Added peer dependencies to documentation workflow</li>\n<li>Additional commits viewable in <a href=\"https://github.com/squidfunk/mkdocs-material/compare/8.4.4...8.5.2\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-09-20T12:30:58Z",
          "tree_id": "fc958ad303c3bb95669a97e3271313c16242f7b6",
          "url": "https://github.com/aws/jsii/commit/ee52c245896da346ea2395c5c50b2b09636ec1c4"
        },
        "date": 1663684905092,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 63674.22508815002,
            "unit": "milliseconds",
            "range": 3852050.16790771,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 63674.22508815002 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 46013.459683299996,
            "unit": "milliseconds",
            "range": 411103.8457209204,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 46013.459683299996 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "43080478+aws-cdk-automation@users.noreply.github.com",
            "name": "AWS CDK Automation",
            "username": "aws-cdk-automation"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "8ab7c57cd4e4bec0beede773079beb722ce79563",
          "message": "chore: npm-check-updates && yarn upgrade (#3761)\n\nRan npm-check-updates and yarn upgrade to keep the `yarn.lock` file up-to-date.",
          "timestamp": "2022-09-21T14:51:03Z",
          "tree_id": "c6f932534bdf813b766c6f3251f015a1be4ee012",
          "url": "https://github.com/aws/jsii/commit/8ab7c57cd4e4bec0beede773079beb722ce79563"
        },
        "date": 1663775881711,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 87336.55342565001,
            "unit": "milliseconds",
            "range": 2484644.42310681,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 87336.55342565001 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 61979.296060949986,
            "unit": "milliseconds",
            "range": 432922.3748500951,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 61979.296060949986 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "66279577+comcalvi@users.noreply.github.com",
            "name": "Calvin Combs",
            "username": "comcalvi"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "a4d39c6fb619cd4d7c9103ec70a731ab6fb23374",
          "message": "feat(kernel): distinguish framework errors from userland errors in Java (#3747)\n\nAdds the `JsiiFault` and `JsError` types to the Kernel and corresponding types in Java. This will provide a better error experience and make it clearer which errors come from the jsii framework itself (eg a broken pipe) and which errors from the user code (eg a CDK construct validation error).\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-09-21T21:53:40Z",
          "tree_id": "bae23df94de5c7303d6dcdbbc4ef8373c318fc5c",
          "url": "https://github.com/aws/jsii/commit/a4d39c6fb619cd4d7c9103ec70a731ab6fb23374"
        },
        "date": 1663800811203,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 82375.71440394994,
            "unit": "milliseconds",
            "range": 2445812.3224855345,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 82375.71440394994 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 56948.750173399996,
            "unit": "milliseconds",
            "range": 2664504.2694712034,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 56948.750173399996 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "783ec7f1d40619677f34318ee247244b682cd92d",
          "message": "fix(pacmak): .NET bindings fail to compile with error CS8120 (#3760)\n\nIf a type union includes several candidates that are related to each other (A extends B or A implements B), `jsii-pacmak` may generate type checking clauses in a pattern matching `switch` statement in an order such that the compiler identifies dead clauses, which is an error in C#.\n\nThis adds a provision to NOT emit such a clause so as to not cause the error. It is worth mentioning that the error cannot be \"opted out\" of via a `#pragma` directive like a warning would be, which is unfortunate.\n\nFixes #3759\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-09-22T10:02:32Z",
          "tree_id": "f9482661f8500e2a7aa911e63b05f0fc01e9c89b",
          "url": "https://github.com/aws/jsii/commit/783ec7f1d40619677f34318ee247244b682cd92d"
        },
        "date": 1663843818551,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 62085.16938250007,
            "unit": "milliseconds",
            "range": 2708483.6181845893,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 62085.16938250007 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 46065.92762665001,
            "unit": "milliseconds",
            "range": 193724.56013436473,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 46065.92762665001 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ad085ebd279c29cd8b2697c26e65677ef46514c0",
          "message": "chore(pacmak): use Map instead of object (#3757)\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-09-22T15:16:10Z",
          "tree_id": "2649c31a3bf7911b0585f41e0cbe6577c159ab3e",
          "url": "https://github.com/aws/jsii/commit/ad085ebd279c29cd8b2697c26e65677ef46514c0"
        },
        "date": 1663864118355,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 105682.01966485006,
            "unit": "milliseconds",
            "range": 1951430.3316973816,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 105682.01966485006 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 75440.32738365003,
            "unit": "milliseconds",
            "range": 370817.7354224497,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 75440.32738365003 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rmuller@amazon.fr",
            "name": "Romain Marcadier",
            "username": "RomainMuller"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "c7dfad3ec905a5ee795be1d313d9c078ab3b4234",
          "message": "fix(runtime): type not found (#3763)\n\nWhen a jsii module returned a private class implementation of an interface, consuming jsii.rtti data may return an FQN for the internal class, which does not exist in foreign languages, leading to an error.\r\n\r\nRevert to tagging FQNs directly instead.\r\n\r\nFixes #3742",
          "timestamp": "2022-09-22T20:11:22+02:00",
          "tree_id": "656bb4744c447436e902f7d4280de88f8d0b7216",
          "url": "https://github.com/aws/jsii/commit/c7dfad3ec905a5ee795be1d313d9c078ab3b4234"
        },
        "date": 1663874457870,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 101657.02220954993,
            "unit": "milliseconds",
            "range": 4048219.580712837,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 101657.02220954993 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 71943.93953195002,
            "unit": "milliseconds",
            "range": 5581805.271785507,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 71943.93953195002 milliseconds over 20 runs"
          }
        ]
      }
    ]
  }
}