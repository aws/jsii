window.BENCHMARK_DATA = {
  "lastUpdate": 1655147284928,
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
      }
    ]
  }
}