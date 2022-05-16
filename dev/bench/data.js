window.BENCHMARK_DATA = {
  "lastUpdate": 1652737342314,
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
      }
    ]
  }
}