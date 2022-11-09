window.BENCHMARK_DATA = {
  "lastUpdate": 1668006896214,
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
          "id": "b45f2f6782c8050504e487e50838cc997c52f1f8",
          "message": "chore(release): 1.68.0 (#3765)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/bump/1.68.0/CHANGELOG.md)",
          "timestamp": "2022-09-22T19:15:14Z",
          "tree_id": "dcebf8c437ac0c41011c47bb7543bd66a2b705a0",
          "url": "https://github.com/aws/jsii/commit/b45f2f6782c8050504e487e50838cc997c52f1f8"
        },
        "date": 1663878521856,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 104357.73931004995,
            "unit": "milliseconds",
            "range": 4240298.026159878,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 104357.73931004995 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 74402.25053209999,
            "unit": "milliseconds",
            "range": 1402344.5394710223,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 74402.25053209999 milliseconds over 20 runs"
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
          "id": "b45f2f6782c8050504e487e50838cc997c52f1f8",
          "message": "chore(release): 1.68.0 (#3765)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/bump/1.68.0/CHANGELOG.md)",
          "timestamp": "2022-09-22T19:15:14Z",
          "tree_id": "dcebf8c437ac0c41011c47bb7543bd66a2b705a0",
          "url": "https://github.com/aws/jsii/commit/b45f2f6782c8050504e487e50838cc997c52f1f8"
        },
        "date": 1663883185406,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 74330.25485689999,
            "unit": "milliseconds",
            "range": 492356.26834949,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 74330.25485689999 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 52272.236394750005,
            "unit": "milliseconds",
            "range": 647519.0788774554,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 52272.236394750005 milliseconds over 20 runs"
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
          "id": "3569018913eae1fc6bc134c94af424cc6475044a",
          "message": "chore(merge-back): 1.68.0 (#3766)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/merge-back/1.68.0/CHANGELOG.md)",
          "timestamp": "2022-09-22T22:05:23Z",
          "tree_id": "dcebf8c437ac0c41011c47bb7543bd66a2b705a0",
          "url": "https://github.com/aws/jsii/commit/3569018913eae1fc6bc134c94af424cc6475044a"
        },
        "date": 1663888620854,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 100167.38576955002,
            "unit": "milliseconds",
            "range": 3660195.460715232,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 100167.38576955002 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 72532.63924000003,
            "unit": "milliseconds",
            "range": 946968.88922198,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 72532.63924000003 milliseconds over 20 runs"
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
          "id": "3569018913eae1fc6bc134c94af424cc6475044a",
          "message": "chore(merge-back): 1.68.0 (#3766)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/merge-back/1.68.0/CHANGELOG.md)",
          "timestamp": "2022-09-22T22:05:23Z",
          "tree_id": "dcebf8c437ac0c41011c47bb7543bd66a2b705a0",
          "url": "https://github.com/aws/jsii/commit/3569018913eae1fc6bc134c94af424cc6475044a"
        },
        "date": 1663891726492,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 62136.98834730006,
            "unit": "milliseconds",
            "range": 3047862.732707153,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 62136.98834730006 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 45232.052128500014,
            "unit": "milliseconds",
            "range": 295398.1279781651,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 45232.052128500014 milliseconds over 20 runs"
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
          "id": "72f2e7ca82555c2dce647f873bed923a98808f95",
          "message": "fix(jsii): missing deprecation warning in collections (#3756)\n\nWhen a deprecated member was nested under a collection of values, no deprecation warning was being generated, despite all the necessary information being available.\n\nThere was a missing case that caused the collection to be validated as if it was the element type, which is obviously incorrect, but thankfully did not cause errors as it typically led to verifying `undefined`, which silently succeeds.\n\nAdded the necessary code so that collections are deep-validated as they should have been.\n\nFixes #3755\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-09-23T14:39:47Z",
          "tree_id": "5aa853dbc16a698ee022feece31cc07559fe046d",
          "url": "https://github.com/aws/jsii/commit/72f2e7ca82555c2dce647f873bed923a98808f95"
        },
        "date": 1663946906527,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 62418.19116005003,
            "unit": "milliseconds",
            "range": 1292833.9891289657,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 62418.19116005003 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 46206.99908125,
            "unit": "milliseconds",
            "range": 167038.66258621533,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 46206.99908125 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "jmalins@gmail.com",
            "name": "Jeff Malins",
            "username": "jmalins"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "0cf500864c918a799505625b08025293431031c7",
          "message": "fix(python): bin script python support, test argument passing (#3762)\n\nCorrects multiple issues with running `bin` scripts from python.\n\nThese were discovered in the context of this `projen` issue: https://github.com/projen/projen/issues/2103\n\n - Corrects broken argument marshaling to binary scripts introduced in #3694\n - Exposes exit code and stderr from script execution instead of failing silently\n\nAdditionally, adds more robust test coverage of passing arguments to `bin` scripts.\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-09-23T16:06:00Z",
          "tree_id": "28571601069c32a0278a76b935dd1641d09480eb",
          "url": "https://github.com/aws/jsii/commit/0cf500864c918a799505625b08025293431031c7"
        },
        "date": 1663953305307,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 99009.20731515002,
            "unit": "milliseconds",
            "range": 4684672.643765152,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 99009.20731515002 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 70768.1393982,
            "unit": "milliseconds",
            "range": 2954105.942897587,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 70768.1393982 milliseconds over 20 runs"
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
          "id": "283dae57647cb28323f4f02ef040deef81248f3a",
          "message": "feat(dotnet): distinguish error types (#3764)\n\nAdds a new class `JsiiError` that subclasses `JsiiException` to help\ndistinguish jsii kernel errors that are likely unrecoverable from\n`RuntimeErrors` which may be errors expected and handled within the JS\nprocess and may be caught and handled in the host language runtime.\n\nSee https://github.com/aws/jsii/pull/3747 for more information\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-09-24T15:48:51Z",
          "tree_id": "4951006e2c930407f242dc7273e626ea97c37baa",
          "url": "https://github.com/aws/jsii/commit/283dae57647cb28323f4f02ef040deef81248f3a"
        },
        "date": 1664038102481,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 84756.0113165,
            "unit": "milliseconds",
            "range": 2045165.5233031765,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 84756.0113165 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 60454.687932100016,
            "unit": "milliseconds",
            "range": 846002.7737163402,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 60454.687932100016 milliseconds over 20 runs"
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
          "id": "bcce9897a2f0da20c3af6b3573ae08d5cd8398df",
          "message": "chore(jsii): enable skipLibCheck (#3754)\n\nDisable type-checking declarations files from dependencies, which is the recommended setting of the TypeScript compiler, and might speed up compilation of modules with large dependencies where only a subset of the dependency is being used (as is often the case with AWS CDK use).\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-09-26T08:56:27Z",
          "tree_id": "12d8b14f44a8b12ca84ca3adc592109fd21df9d7",
          "url": "https://github.com/aws/jsii/commit/bcce9897a2f0da20c3af6b3573ae08d5cd8398df"
        },
        "date": 1664185871653,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 70898.32435844999,
            "unit": "milliseconds",
            "range": 622117.380934553,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 70898.32435844999 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 52550.1509736,
            "unit": "milliseconds",
            "range": 289038.5720521424,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 52550.1509736 milliseconds over 20 runs"
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
          "id": "bab1d388e8bed41c4930566ba5834acf57cc696c",
          "message": "fix(kernel): EPERM on rename operation on Windows (#3769)\n\nWindows does not allow renaming files that are currently open, or directories that contain open files. When antivirus software is used, files are open for analysis by the A/V software, making it impossible to rename files too quickly after they've been created.\n\nThis was already reported in #992 and addressed, however the issue was re-introduced in #3724, in which tarballs were extracted into temporary directories that were then renamed.\n\nChanged the code back to a form taht extracts files directly into their final place instead of staging via a temporary space, and added comments warning maintainers about the specific issue being solved here, so that hopefully the problem does not get re-introduced again in the future.\n\nFixes #3751\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-09-26T14:27:57Z",
          "tree_id": "9ceff25bd6678487d87c59708f98ed987bcebc20",
          "url": "https://github.com/aws/jsii/commit/bab1d388e8bed41c4930566ba5834acf57cc696c"
        },
        "date": 1664205236146,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 58251.77098545001,
            "unit": "milliseconds",
            "range": 2436569.609387734,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 58251.77098545001 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 44911.37697194998,
            "unit": "milliseconds",
            "range": 375124.58977236296,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 44911.37697194998 milliseconds over 20 runs"
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
          "id": "686631a778412db220ad91db3522421f49dcacd7",
          "message": "chore(deps-dev): Update mkdocs-material requirement from ~=8.5.2 to ~=8.5.3 in /gh-pages (#3768)\n\nUpdates the requirements on [mkdocs-material](https://github.com/squidfunk/mkdocs-material) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/releases\">mkdocs-material's releases</a>.</em></p>\n<blockquote>\n<h2>mkdocs-material-8.5.3</h2>\n<ul>\n<li>Fixed build error when enabling cookie consent without analytics</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4381\">#4381</a>: Code blocks render ligatures for some fonts</li>\n</ul>\n</blockquote>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/blob/master/CHANGELOG\">mkdocs-material's changelog</a>.</em></p>\n<blockquote>\n<p>mkdocs-material-8.5.3+insiders-4.23.6 (2022-09-22)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4389\">#4389</a>: Blog posts in first week of year in wrong archive</li>\n<li>Fixed (= switched) footer previous and next links for blog posts</li>\n</ul>\n<p>mkdocs-material-8.5.3 (2022-09-20)</p>\n<ul>\n<li>Fixed build error when enabling cookie consent without analytics</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4381\">#4381</a>: Code blocks render ligatures for some fonts</li>\n</ul>\n<p>mkdocs-material-8.5.2+insiders-4.23.5 (2022-09-18)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4367\">#4367</a>: Improved blog plugin date handling for MultiMarkdown syntax</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4374\">#4374</a>: Fixed invalid URLs of related links to other blog posts</li>\n</ul>\n<p>mkdocs-material-8.5.2 (2022-09-18)</p>\n<ul>\n<li>Updated Mermaid.js to version 9.1.7</li>\n<li>Fixed overly large headlines in search results (8.5.0 regression)</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4358\">#4358</a>: Navigation sections appear as clickable (8.5.0 regression)</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4356\">#4356</a>: GitHub repository statistics fetched before cookie consent</li>\n</ul>\n<p>mkdocs-material-8.5.1 (2022-09-15)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4366\">#4366</a>: Removed dependencies with native extensions</li>\n</ul>\n<p>mkdocs-material-8.5.0+insiders-4.23.4 (2022-09-14)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4365\">#4365</a>: Recursion error in blog plugin due to deepcopy</li>\n<li>Fixed path errors for blog plugin on Windows</li>\n<li>Fixed publishing workflow in forked repositories</li>\n</ul>\n<p>mkdocs-material-8.5.0+insiders-4.23.3 (2022-09-13)</p>\n<ul>\n<li>Fixed previous and next page links for drafts of blog posts</li>\n</ul>\n<p>mkdocs-material-8.5.0 (2022-09-13)</p>\n<ul>\n<li>Added support for social cards</li>\n<li>Added support for code annotation anchor links (deep linking)</li>\n<li>Added support for code annotation comment stripping (syntax modifier)</li>\n<li>Added support for sidebars scrolling automatically to active item</li>\n<li>Added support for anchor following table of contents (= auto scroll)</li>\n<li>Added support for tag icons</li>\n</ul>\n<p>mkdocs-material-8.4.4+insiders-4.23.2 (2022-09-13)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4348\">#4348</a>: Blog plugin crashes on custom nav title</li>\n<li>Fixed blog plugin crashing when category contained only drafts</li>\n<li>Fixed rendering of content from blog index file</li>\n</ul>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/e607379e70dc68987a0a93dfa0f8d4eb6842c9ce\"><code>e607379</code></a> Prepare 8.5.3 release</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/c7deb06b790fbf68034407c29bcf845641796198\"><code>c7deb06</code></a> Fixed cookie consent when analytics was not set</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/1f0578849c74c69546d2431b8985233d9c92f7fe\"><code>1f05788</code></a> Updated dependencies</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/dcab57dd1cced4b77875c1aa1b53467c62709d31\"><code>dcab57d</code></a> Removed ligatures from code blocks</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/1410254c1a5f2a5372b987a460d9acdea3c58286\"><code>1410254</code></a> Merge branch 'master' of github.com:squidfunk/mkdocs-material</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/35b3e17f817a7c715f074e8a54322f7c939385e2\"><code>35b3e17</code></a> Added Automation Technology to premium sponsors</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/e6d829556aaa78cff59f91433943708488fb290c\"><code>e6d8295</code></a> Fix typo (<a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4375\">#4375</a>)</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/af613275fb78c8eaac2d10c2a37138936cb09815\"><code>af61327</code></a> Formatting</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/16bb4379d1868ef1ae8ac3f8ee0b796657e56422\"><code>16bb437</code></a> Modernized metadata (<a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4341\">#4341</a>)</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/209b653cb6e09fada48a92b76dbf560056799d0c\"><code>209b653</code></a> Updated Insiders changelog</li>\n<li>Additional commits viewable in <a href=\"https://github.com/squidfunk/mkdocs-material/compare/8.5.2...8.5.3\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\nDependabot will merge this PR once it's up-to-date and CI passes on it, as requested by @RomainMuller.\n\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-09-26T15:41:20Z",
          "tree_id": "b64c9f2a51631e01d6fb18b4d27619dc5b5d6707",
          "url": "https://github.com/aws/jsii/commit/686631a778412db220ad91db3522421f49dcacd7"
        },
        "date": 1664210792967,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 90560.54593809997,
            "unit": "milliseconds",
            "range": 3651995.6717857695,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 90560.54593809997 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 69458.01871389998,
            "unit": "milliseconds",
            "range": 1537051.5708713315,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 69458.01871389998 milliseconds over 20 runs"
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
          "id": "03da71baf2e716f9a85ca64c504f1f7cbf628514",
          "message": "chore: add @andipabst to all-contributors manifest (#3770)",
          "timestamp": "2022-09-26T18:13:08+02:00",
          "tree_id": "ca24c2046c0e2cb8fc4438235f54c4d23a2c907d",
          "url": "https://github.com/aws/jsii/commit/03da71baf2e716f9a85ca64c504f1f7cbf628514"
        },
        "date": 1664211540237,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 59305.74614059997,
            "unit": "milliseconds",
            "range": 4196206.5097749615,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 59305.74614059997 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 45847.46358324999,
            "unit": "milliseconds",
            "range": 120810.96472079691,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 45847.46358324999 milliseconds over 20 runs"
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
          "id": "03da71baf2e716f9a85ca64c504f1f7cbf628514",
          "message": "chore: add @andipabst to all-contributors manifest (#3770)",
          "timestamp": "2022-09-26T18:13:08+02:00",
          "tree_id": "ca24c2046c0e2cb8fc4438235f54c4d23a2c907d",
          "url": "https://github.com/aws/jsii/commit/03da71baf2e716f9a85ca64c504f1f7cbf628514"
        },
        "date": 1664216397119,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 81922.37055025002,
            "unit": "milliseconds",
            "range": 1649619.9456572458,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 81922.37055025002 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 60557.11136280002,
            "unit": "milliseconds",
            "range": 539173.7607503866,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 60557.11136280002 milliseconds over 20 runs"
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
          "id": "f656c3157d457acc90eddd354bd8cc3825e3e252",
          "message": "chore(release): 1.69.0 (#3773)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/bump/1.69.0/CHANGELOG.md)",
          "timestamp": "2022-09-27T10:25:10Z",
          "tree_id": "5dadb1c8b412b5edbaae5cac69341d23a3886ac2",
          "url": "https://github.com/aws/jsii/commit/f656c3157d457acc90eddd354bd8cc3825e3e252"
        },
        "date": 1664277385078,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 64261.86899584994,
            "unit": "milliseconds",
            "range": 2171888.7982613,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 64261.86899584994 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 50034.006723199986,
            "unit": "milliseconds",
            "range": 309537.4242128574,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 50034.006723199986 milliseconds over 20 runs"
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
          "id": "36135d4de1cba2666470049b1374f728366f39ac",
          "message": "chore(merge-back): 1.69.0 (#3776)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/merge-back/1.69.0/CHANGELOG.md)",
          "timestamp": "2022-09-27T12:59:14Z",
          "tree_id": "5dadb1c8b412b5edbaae5cac69341d23a3886ac2",
          "url": "https://github.com/aws/jsii/commit/36135d4de1cba2666470049b1374f728366f39ac"
        },
        "date": 1664286262391,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 58825.20928525001,
            "unit": "milliseconds",
            "range": 2813649.640489206,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 58825.20928525001 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 45903.600288400005,
            "unit": "milliseconds",
            "range": 186643.07356461632,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 45903.600288400005 milliseconds over 20 runs"
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
          "id": "cd00bcddf8ae6df9140cceabe97455b4b52c2abb",
          "message": "chore(deps-dev): Bump mypy from 0.971 to 0.981 in /packages/jsii-pacmak/test/generated-code (#3775)\n\nBumps [mypy](https://github.com/python/mypy) from 0.971 to 0.981.\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/python/mypy/commit/c7b4714e1f5e3cb8f3fec7426b6538fe1a3dcab1\"><code>c7b4714</code></a> Update version to 0.981</li>\n<li><a href=\"https://github.com/python/mypy/commit/2bd7da21462a59643f2aec546304db1a624ba285\"><code>2bd7da2</code></a> [0.980 backport] build changes (<a href=\"https://github-redirect.dependabot.com/python/mypy/issues/13688\">#13688</a>)</li>\n<li><a href=\"https://github.com/python/mypy/commit/2b2953a1392368f623331d5168ccdfd39e37bbee\"><code>2b2953a</code></a> [0.980 backport] Update pos-only unit tests for Python 3.10.7 (<a href=\"https://github-redirect.dependabot.com/python/mypy/issues/13660\">#13660</a>) (<a href=\"https://github-redirect.dependabot.com/python/mypy/issues/13665\">#13665</a>)</li>\n<li><a href=\"https://github.com/python/mypy/commit/ada007841f6a96f68d114769624a0f7b523814a7\"><code>ada0078</code></a> Remove dev from version</li>\n<li><a href=\"https://github.com/python/mypy/commit/efd1d38fb1db188e56fe6068ebe69d2164462b34\"><code>efd1d38</code></a> [0.980 backport] Fix stubtest custom_typeshed_dir regression (<a href=\"https://github-redirect.dependabot.com/python/mypy/issues/13656\">#13656</a>) (<a href=\"https://github-redirect.dependabot.com/python/mypy/issues/13658\">#13658</a>)</li>\n<li><a href=\"https://github.com/python/mypy/commit/70bc34837ecbafc528e511a46219262736781d43\"><code>70bc348</code></a> [0.980 backport] Allow unpacking from TypeVars with iterable bounds (<a href=\"https://github-redirect.dependabot.com/python/mypy/issues/13425\">#13425</a>) ...</li>\n<li><a href=\"https://github.com/python/mypy/commit/e43dbb91be8eb167875bb8a9468cf7d286cf0c3e\"><code>e43dbb9</code></a> Work around mypyc test failures in CI (<a href=\"https://github-redirect.dependabot.com/python/mypy/issues/13593\">#13593</a>)</li>\n<li><a href=\"https://github.com/python/mypy/commit/64add912d9b58340b055df58c8c0e16ba2e8e667\"><code>64add91</code></a> Another cherry-pick fix</li>\n<li><a href=\"https://github.com/python/mypy/commit/228bd29babd95373867e845b049f0938fe083f44\"><code>228bd29</code></a> Fix error codes option serialization (<a href=\"https://github-redirect.dependabot.com/python/mypy/issues/13523\">#13523</a>)</li>\n<li><a href=\"https://github.com/python/mypy/commit/1f8061167faac10c02eafba260f6ab8543496f90\"><code>1f80611</code></a> Allow per-module error codes (<a href=\"https://github-redirect.dependabot.com/python/mypy/issues/13502\">#13502</a>)</li>\n<li>Additional commits viewable in <a href=\"https://github.com/python/mypy/compare/v0.971...v0.981\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\n[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=mypy&package-manager=pip&previous-version=0.971&new-version=0.981)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-09-27T13:46:11Z",
          "tree_id": "c2e42749342d685dd47fc9e15ca64375fa79844b",
          "url": "https://github.com/aws/jsii/commit/cd00bcddf8ae6df9140cceabe97455b4b52c2abb"
        },
        "date": 1664290434305,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 96315.26513075,
            "unit": "milliseconds",
            "range": 1682060.940912915,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 96315.26513075 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 72052.85299434999,
            "unit": "milliseconds",
            "range": 816726.8256214012,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 72052.85299434999 milliseconds over 20 runs"
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
          "id": "d98aa1b7120d0f0b62482cbee3a6253c6ea06715",
          "message": "chore(deps): Bump Microsoft.NET.Test.Sdk from 17.3.1 to 17.3.2 in /packages/@jsii/dotnet-runtime-test/test (#3767)\n\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>\r\nCo-authored-by: mergify[bot] <37929162+mergify[bot]@users.noreply.github.com>\r\nCo-authored-by: Romain Marcadier <rmuller@amazon.fr>",
          "timestamp": "2022-09-27T17:49:03+02:00",
          "tree_id": "01fadfb63e72d11d0b3352c38609f19e119643fb",
          "url": "https://github.com/aws/jsii/commit/d98aa1b7120d0f0b62482cbee3a6253c6ea06715"
        },
        "date": 1664297987326,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 99298.1363324,
            "unit": "milliseconds",
            "range": 5307272.678999484,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 99298.1363324 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 73308.69520540003,
            "unit": "milliseconds",
            "range": 1704843.5398118235,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 73308.69520540003 milliseconds over 20 runs"
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
          "id": "4fd370b886b4fd915c23f91e3d5947b5c1211da8",
          "message": "chore: drop support for go < 1.18 (#3774)\n\nThose have been end-of-life for a while now, and\r\ngo 1.20 is expected to release in February 2023.",
          "timestamp": "2022-09-27T18:54:57+02:00",
          "tree_id": "0bf1c07e0793f8c929703a1ce6455dea08362108",
          "url": "https://github.com/aws/jsii/commit/4fd370b886b4fd915c23f91e3d5947b5c1211da8"
        },
        "date": 1664301656724,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 92620.4183669,
            "unit": "milliseconds",
            "range": 3015157.568770352,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 92620.4183669 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 70667.26222974999,
            "unit": "milliseconds",
            "range": 1190557.5879071436,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 70667.26222974999 milliseconds over 20 runs"
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
          "id": "e3f7d5e2c9683b13092e4ba05c13ade8b2a5e823",
          "message": "feat(python): add error differentiation to Python. (#3772)\n\nUses `RuntimeError` and `JsiiError` to indicate recoverable vs non-recoverable errors respectively. Also fixes three bugs in the Java logic for the same feature:\n\n* Callbacks did not pass the error type over the wire, meaning that some faults were rethrown as runtime errors and vice versa\n* async method invocations did not pass the error type over the wire, meaning that some faults were rethrown as runtime errors and vice versa.\n* the java enum used `RuntimeException` in the string where it should have used `RuntimeError`, meaning that some errors would always be rethrown as `RuntimeException`s even when they should be `JsiiError`s. \n\nThese bugs happened because the Java tests did not check for type of the exception thrown, meaning that `JsiiError`s could be passed where `RuntimeException`s were expected. The tests now verify the type of the exception thrown. \n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-09-28T09:12:55Z",
          "tree_id": "2aa674fdbc5b15b767465eb75a4d5ceb8377f159",
          "url": "https://github.com/aws/jsii/commit/e3f7d5e2c9683b13092e4ba05c13ade8b2a5e823"
        },
        "date": 1664359206078,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 58987.15812429999,
            "unit": "milliseconds",
            "range": 2693075.3456985885,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 58987.15812429999 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 46181.2214454,
            "unit": "milliseconds",
            "range": 174079.76754395757,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 46181.2214454 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "chrisr@monada.co",
            "name": "Chris Rybicki",
            "username": "Chriscbr"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "db809e212735b559d54e96666a2be6b18e432893",
          "message": "fix(jsii-reflect): TypeMember is not SourceLocatable (#3778)\n\nFixes #3777\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-09-28T10:23:44Z",
          "tree_id": "946104fd63c5ac4fa310ccc92dfbd3d93ae00d23",
          "url": "https://github.com/aws/jsii/commit/db809e212735b559d54e96666a2be6b18e432893"
        },
        "date": 1664364297302,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 82185.64767019996,
            "unit": "milliseconds",
            "range": 1369673.254435615,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 82185.64767019996 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 61430.417934599995,
            "unit": "milliseconds",
            "range": 333854.48515013896,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 61430.417934599995 milliseconds over 20 runs"
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
          "id": "a5221a2aae31f053344be74eb803efcf3594f682",
          "message": "chore: npm-check-updates && yarn upgrade (#3780)\n\nRan npm-check-updates and yarn upgrade to keep the `yarn.lock` file up-to-date.",
          "timestamp": "2022-09-29T09:40:04Z",
          "tree_id": "16cb5d639b73284daabf03271aeaa653e6961858",
          "url": "https://github.com/aws/jsii/commit/a5221a2aae31f053344be74eb803efcf3594f682"
        },
        "date": 1664447089494,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 58553.08088420002,
            "unit": "milliseconds",
            "range": 3608785.9455258073,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 58553.08088420002 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 45513.15245785001,
            "unit": "milliseconds",
            "range": 170293.68908177843,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 45513.15245785001 milliseconds over 20 runs"
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
          "id": "a5221a2aae31f053344be74eb803efcf3594f682",
          "message": "chore: npm-check-updates && yarn upgrade (#3780)\n\nRan npm-check-updates and yarn upgrade to keep the `yarn.lock` file up-to-date.",
          "timestamp": "2022-09-29T09:40:04Z",
          "tree_id": "16cb5d639b73284daabf03271aeaa653e6961858",
          "url": "https://github.com/aws/jsii/commit/a5221a2aae31f053344be74eb803efcf3594f682"
        },
        "date": 1664451501977,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 58816.88561255,
            "unit": "milliseconds",
            "range": 3353339.448330437,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 58816.88561255 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 45851.03286600001,
            "unit": "milliseconds",
            "range": 184768.58831903842,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 45851.03286600001 milliseconds over 20 runs"
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
          "id": "a5221a2aae31f053344be74eb803efcf3594f682",
          "message": "chore: npm-check-updates && yarn upgrade (#3780)\n\nRan npm-check-updates and yarn upgrade to keep the `yarn.lock` file up-to-date.",
          "timestamp": "2022-09-29T09:40:04Z",
          "tree_id": "16cb5d639b73284daabf03271aeaa653e6961858",
          "url": "https://github.com/aws/jsii/commit/a5221a2aae31f053344be74eb803efcf3594f682"
        },
        "date": 1664456381794,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 92624.54005005004,
            "unit": "milliseconds",
            "range": 2662201.7412940785,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 92624.54005005004 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 70707.05412680002,
            "unit": "milliseconds",
            "range": 678470.2199032204,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 70707.05412680002 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "jeff@curisium.com",
            "name": "Jeff Malins",
            "username": "jmalins"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "306b24845d6b36a7079ddb88aaeab2847f7bb238",
          "message": "feat(superchain): add 'acl' package to support projen GHA (#3783)\n\nAdds the `acl` package to the superchain image.\n\nA recent [projen PR](https://github.com/projen/projen/issues/2103) added a build-time dependency on the `getfacl` and `setfacl` tools in this package to workaround a bug in GitHub Actions. The package is included in the GHA `ubuntu-latest` image, but not superchain.\n\nShould address: https://github.com/projen/projen/issues/2134\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-10-01T07:38:40Z",
          "tree_id": "dcde964765102a8ffba4a31d183e4469b816af5b",
          "url": "https://github.com/aws/jsii/commit/306b24845d6b36a7079ddb88aaeab2847f7bb238"
        },
        "date": 1664613906134,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 93931.8258916,
            "unit": "milliseconds",
            "range": 4265781.192750851,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 93931.8258916 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 65329.323369549995,
            "unit": "milliseconds",
            "range": 5595335.855279341,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 65329.323369549995 milliseconds over 20 runs"
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
          "id": "38775b768615b18cf6c4ad24138d1277d4c20f6a",
          "message": "chore(deps): Bump actions/setup-dotnet from 2 to 3 (#3781)\n\nBumps [actions/setup-dotnet](https://github.com/actions/setup-dotnet) from 2 to 3.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/actions/setup-dotnet/releases\">actions/setup-dotnet's releases</a>.</em></p>\n<blockquote>\n<h2>v3.0.0</h2>\n<p>This major release includes the following <strong>changes:</strong></p>\n<ul>\n<li><a href=\"https://github-redirect.dependabot.com/actions/setup-dotnet/issues/219\">#219</a> New input <code>dotnet-quality</code> was added in <a href=\"https://github-redirect.dependabot.com/actions/setup-dotnet/pull/315\">#315</a>:</li>\n</ul>\n<pre lang=\"yaml\"><code>    - uses: actions/setup-dotnet@v3\n      with:\n        dotnet-version: '6.0.x'\n        dotnet-quality: 'preview'\n    - run: dotnet build &lt;my project&gt;\n</code></pre>\n<p>More in detail <a href=\"https://github.com/actions/setup-dotnet#using-the-dotnet-quality-input\">here</a>.</p>\n<ul>\n<li><a href=\"https://github-redirect.dependabot.com/actions/setup-dotnet/issues/241\">#241</a> The output variable <code>dotnet-version</code> which contains the installed by the action SDK version was added in <a href=\"https://github-redirect.dependabot.com/actions/setup-dotnet/pull/324\">#324</a>:</li>\n</ul>\n<pre lang=\"yaml\"><code>    - uses: actions/setup-dotnet@v3\n      id: cp310\n      with:\n        dotnet-version: '3.1.422'\n    - run: echo '${{ steps.cp310.outputs.dotnet-version }}' # outputs 3.1.422\n</code></pre>\n<p>More in detail <a href=\"https://github.com/actions/setup-dotnet/tree/main#dotnet-version\">here</a>.</p>\n<ul>\n<li>The <code>dotnet-version</code> syntax was updated and now it allows to specify the prerelease version without using <code>include-prerelease</code> input. The <code>include-prerelease</code> input was cut out:</li>\n</ul>\n<pre lang=\"yaml\"><code>    - uses: actions/setup-dotnet@v3\n      with:\n        dotnet-version: '5.0.0-preview.6'\n</code></pre>\n<p>More in detail <a href=\"https://github.com/actions/setup-dotnet#supported-version-syntax\">here</a>.</p>\n<ul>\n<li><a href=\"https://github-redirect.dependabot.com/actions/setup-dotnet/issues/251\">#251</a> The problem with out of support .NET version warnings was solved in <a href=\"https://github-redirect.dependabot.com/actions/setup-dotnet/pull/315\">#315</a>.</li>\n</ul>\n<p><strong>Breaking changes</strong>:</p>\n<ul>\n<li>Installation paths for Windows and Ubuntu images were changed to match the location of pre-installed SDKs. In more detail, read <a href=\"https://github.com/actions/setup-dotnet/blob/main/docs/adrs/v3-setup-dotnet.md#breaking-changes\">here</a>.</li>\n</ul>\n<h2>Add support for Windows-arm</h2>\n<p>In scope of this release we <a href=\"https://github-redirect.dependabot.com/actions/setup-dotnet/pull/320\">add support for Windows-arm</a>. Besides, we change getInput to <a href=\"https://github-redirect.dependabot.com/actions/setup-dotnet/pull/250\">getBooleanInput</a> for include-prerelease.</p>\n<h2>Package updates, support for global json file in a subdirectory, installer scripts updates</h2>\n<p>This release includes the following PRs:</p>\n<ul>\n<li>Adding support for the <code>global-json-file</code> input: <a href=\"https://github-redirect.dependabot.com/actions/setup-dotnet/issues/276\">#276</a>\nExample of usage:\n<pre lang=\"yaml\"><code>- uses: actions/setup-dotnet@v2\n  with:\n    global-json-file: csharp/global.json\n- run: dotnet build &lt;my project&gt;\n  working-directory: csharp\n</code></pre>\n</li>\n</ul>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/actions/setup-dotnet/commit/c7e7147fd3e41056e75a761416c06f5fa781b5fb\"><code>c7e7147</code></a> Add ability to write resolved version of SDK into the output variable (<a href=\"https://github-redirect.dependabot.com/actions/setup-dotnet/issues/324\">#324</a>)</li>\n<li><a href=\"https://github.com/actions/setup-dotnet/commit/0705ef0281736c0ca177266c8d04eb08f72072de\"><code>0705ef0</code></a> Implement proposal stated in ADR for setup-dotnet v3 and functionality from f...</li>\n<li>See full diff in <a href=\"https://github.com/actions/setup-dotnet/compare/v2...v3\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\n[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=actions/setup-dotnet&package-manager=github_actions&previous-version=2&new-version=3)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\nDependabot will merge this PR once it's up-to-date and CI passes on it, as requested by @RomainMuller.\n\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-10-03T11:09:42Z",
          "tree_id": "0fab77d7391cb3f8aab4871df4adbfc0de5fe8d7",
          "url": "https://github.com/aws/jsii/commit/38775b768615b18cf6c4ad24138d1277d4c20f6a"
        },
        "date": 1664798109955,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 59362.81319450001,
            "unit": "milliseconds",
            "range": 3386635.524559798,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 59362.81319450001 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 45752.64453479998,
            "unit": "milliseconds",
            "range": 232416.93376625297,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 45752.64453479998 milliseconds over 20 runs"
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
          "id": "d422dbb65257be1d0b969caac24e08641a68ea20",
          "message": "chore(deps): Update cattrs requirement from <22.2,>=1.8 to >=1.8,<22.3 in /packages/@jsii/python-runtime (#3785)\n\nUpdates the requirements on [cattrs](https://github.com/python-attrs/cattrs) to permit the latest version.\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/python-attrs/cattrs/blob/main/HISTORY.rst\">cattrs's changelog</a>.</em></p>\n<blockquote>\n<h2>22.2.0 (2022-10-03)</h2>\n<ul>\n<li><em>Potentially breaking</em>: <code>cattrs.Converter</code> has been renamed to <code>cattrs.BaseConverter</code>, and <code>cattrs.GenConverter</code> to <code>cattrs.Converter</code>.\nThe <code>GenConverter</code> name is still available for backwards compatibility, but is deprecated.\nIf you were depending on functionality specific to the old <code>Converter</code>, change your import to <code>from cattrs import BaseConverter</code>.</li>\n<li><code>NewTypes &lt;https://docs.python.org/3/library/typing.html#newtype&gt;</code>_ are now supported by the <code>cattrs.Converter</code>.\n(<code>[#255](https://github.com/python-attrs/cattrs/issues/255) &lt;https://github.com/python-attrs/cattrs/pull/255&gt;</code><em>, <code>[#94](https://github.com/python-attrs/cattrs/issues/94) &lt;https://github.com/python-attrs/cattrs/issues/94&gt;</code></em>, <code>[#297](https://github.com/python-attrs/cattrs/issues/297) &lt;https://github.com/python-attrs/cattrs/issues/297&gt;</code>_)</li>\n<li><code>cattrs.Converter</code> and <code>cattrs.BaseConverter</code> can now copy themselves using the <code>copy</code> method.\n(<code>[#284](https://github.com/python-attrs/cattrs/issues/284) &lt;https://github.com/python-attrs/cattrs/pull/284&gt;</code>_)</li>\n<li>Python 3.11 support.</li>\n<li>cattrs now supports un/structuring <code>kw_only</code> fields on attrs classes into/from dictionaries.\n(<code>[#247](https://github.com/python-attrs/cattrs/issues/247) &lt;https://github.com/python-attrs/cattrs/pull/247&gt;</code>_)</li>\n<li>PyPy support (and tests, using a minimal Hypothesis profile) restored.\n(<code>[#253](https://github.com/python-attrs/cattrs/issues/253) &lt;https://github.com/python-attrs/cattrs/issues/253&gt;</code>_)</li>\n<li>Fix propagating the <code>detailed_validation</code> flag to mapping and counter structuring generators.</li>\n<li>Fix <code>typing.Set</code> applying too broadly when used with the <code>GenConverter.unstruct_collection_overrides</code> parameter on Python versions below 3.9. Switch to <code>typing.AbstractSet</code> on those versions to restore the old behavior.\n(<code>[#264](https://github.com/python-attrs/cattrs/issues/264) &lt;https://github.com/python-attrs/cattrs/issues/264&gt;</code>_)</li>\n<li>Uncap the required Python version, to avoid problems detailed in <a href=\"https://iscinumpy.dev/post/bound-version-constraints/#pinning-the-python-version-is-special\">https://iscinumpy.dev/post/bound-version-constraints/#pinning-the-python-version-is-special</a>\n(<code>[#275](https://github.com/python-attrs/cattrs/issues/275) &lt;https://github.com/python-attrs/cattrs/issues/275&gt;</code>_)</li>\n<li>Fix <code>Converter.register_structure_hook_factory</code> and <code>cattrs.gen.make_dict_unstructure_fn</code> type annotations.\n(<code>[#281](https://github.com/python-attrs/cattrs/issues/281) &lt;https://github.com/python-attrs/cattrs/issues/281&gt;</code>_)</li>\n<li>Expose all error classes in the <code>cattr.errors</code> namespace. Note that it is deprecated, just use <code>cattrs.errors</code>.\n(<code>[#252](https://github.com/python-attrs/cattrs/issues/252) &lt;https://github.com/python-attrs/cattrs/issues/252&gt;</code>_)</li>\n<li>Fix generating structuring functions for types with quotes in the name.\n(<code>[#291](https://github.com/python-attrs/cattrs/issues/291) &lt;https://github.com/python-attrs/cattrs/issues/291&gt;</code>_ <code>[#277](https://github.com/python-attrs/cattrs/issues/277) &lt;https://github.com/python-attrs/cattrs/issues/277&gt;</code>_)</li>\n<li>Fix usage of notes for the final version of <code>PEP 678 &lt;https://peps.python.org/pep-0678/&gt;</code><em>, supported since <code>exceptiongroup&gt;=1.0.0rc4</code>.\n(<code>[#303](https://github.com/python-attrs/cattrs/issues/303) &lt;303 &lt;https://github.com/python-attrs/cattrs/pull/303&gt;</code></em>)</li>\n</ul>\n<h2>22.1.0 (2022-04-03)</h2>\n<ul>\n<li>cattrs now uses the CalVer versioning convention.</li>\n<li>cattrs now has a detailed validation mode, which is enabled by default. Learn more <code>here &lt;https://cattrs.readthedocs.io/en/latest/validation.html&gt;</code>_.\nThe old behavior can be restored by creating the converter with <code>detailed_validation=False</code>.</li>\n<li><code>attrs</code> and dataclass structuring is now ~25% faster.</li>\n<li>Fix an issue structuring bare <code>typing.List</code> s on Pythons lower than 3.9.\n(<code>[#209](https://github.com/python-attrs/cattrs/issues/209) &lt;https://github.com/python-attrs/cattrs/issues/209&gt;</code>_)</li>\n<li>Fix structuring of non-parametrized containers like <code>list/dict/...</code> on Pythons lower than 3.9.\n(<code>[#218](https://github.com/python-attrs/cattrs/issues/218) &lt;https://github.com/python-attrs/cattrs/issues/218&gt;</code>_)</li>\n<li>Fix structuring bare <code>typing.Tuple</code> on Pythons lower than 3.9.\n(<code>[#218](https://github.com/python-attrs/cattrs/issues/218) &lt;https://github.com/python-attrs/cattrs/issues/218&gt;</code>_)</li>\n<li>Fix a wrong <code>AttributeError</code> of an missing <code>__parameters__</code> attribute. This could happen\nwhen inheriting certain generic classes – for example <code>typing.*</code> classes are affected.\n(<code>[#217](https://github.com/python-attrs/cattrs/issues/217) &lt;https://github.com/python-attrs/cattrs/issues/217&gt;</code>_)</li>\n<li>Fix structuring of <code>enum.Enum</code> instances in <code>typing.Literal</code> types.\n(<code>[#231](https://github.com/python-attrs/cattrs/issues/231) &lt;https://github.com/python-attrs/cattrs/pull/231&gt;</code>_)</li>\n<li>Fix unstructuring all tuples - unannotated, variable-length, homogenous and heterogenous - to <code>list</code>.\n(<code>[#226](https://github.com/python-attrs/cattrs/issues/226) &lt;https://github.com/python-attrs/cattrs/issues/226&gt;</code>_)</li>\n<li>For <code>forbid_extra_keys</code> raise custom <code>ForbiddenExtraKeyError</code> instead of generic <code>Exception</code>.\n(<code>[#225](https://github.com/python-attrs/cattrs/issues/225) &lt;https://github.com/python-attrs/cattrs/pull/225&gt;</code>_)</li>\n<li>All preconf converters now support <code>loads</code> and <code>dumps</code> directly. See an example <code>here &lt;https://cattrs.readthedocs.io/en/latest/preconf.html&gt;</code>_.</li>\n</ul>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/python-attrs/cattrs/commit/405f0291b958ae9eb45ee38febeb91fb65dd644f\"><code>405f029</code></a> v22.2.0</li>\n<li><a href=\"https://github.com/python-attrs/cattrs/commit/89de04f57aa774d6abfb0ae62517dc8a8064e3c2\"><code>89de04f</code></a> Fix some mor</li>\n<li><a href=\"https://github.com/python-attrs/cattrs/commit/0abbf271461babca203862f3581c20743f6118e0\"><code>0abbf27</code></a> Fix tests</li>\n<li><a href=\"https://github.com/python-attrs/cattrs/commit/3b750439aec826a8fd20976ca113f30a27e75408\"><code>3b75043</code></a> <strong>notes</strong> is list[str]</li>\n<li><a href=\"https://github.com/python-attrs/cattrs/commit/906b95cfef4903e2d6247abf0fdd72f7da21617a\"><code>906b95c</code></a> Reorder HISTORY</li>\n<li><a href=\"https://github.com/python-attrs/cattrs/commit/ed7f86a0ccd9adeab895b9afac2dea69fa02bcff\"><code>ed7f86a</code></a> Improve NewTypes (<a href=\"https://github-redirect.dependabot.com/python-attrs/cattrs/issues/310\">#310</a>)</li>\n<li><a href=\"https://github.com/python-attrs/cattrs/commit/e7926599ad44e07d8325ae4072626e1a24705542\"><code>e792659</code></a> Fix missing imports of preconf converters (<a href=\"https://github-redirect.dependabot.com/python-attrs/cattrs/issues/309\">#309</a>)</li>\n<li><a href=\"https://github.com/python-attrs/cattrs/commit/e425d6378aa8dfc74bbdd9e152365e1b962fd8cf\"><code>e425d63</code></a> Reorder HISTORY</li>\n<li><a href=\"https://github.com/python-attrs/cattrs/commit/cc56b2b873852a4e91b16706a39da00755c87759\"><code>cc56b2b</code></a> Remove spurious type comment</li>\n<li><a href=\"https://github.com/python-attrs/cattrs/commit/cbd6f29d2c0ebc40805b3ca0d81accfc330eb10c\"><code>cbd6f29</code></a> Reformat</li>\n<li>Additional commits viewable in <a href=\"https://github.com/python-attrs/cattrs/compare/v1.8.0...v22.2.0\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-10-03T12:03:14Z",
          "tree_id": "f80ccd524abba0c026061d690ad2a0a534bf1fe1",
          "url": "https://github.com/aws/jsii/commit/d422dbb65257be1d0b969caac24e08641a68ea20"
        },
        "date": 1664802693772,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 96064.97640590006,
            "unit": "milliseconds",
            "range": 4313002.714897176,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 96064.97640590006 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 73435.19035480001,
            "unit": "milliseconds",
            "range": 851119.1169465216,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 73435.19035480001 milliseconds over 20 runs"
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
          "id": "e0701a977f457ef177776e190efc3cfd8b6affe1",
          "message": "chore(deps): Bump Microsoft.CodeAnalysis.CSharp.Workspaces from 4.3.0 to 4.3.1 in /packages/@jsii/dotnet-runtime-test/test (#3784)\n\nBumps [Microsoft.CodeAnalysis.CSharp.Workspaces](https://github.com/dotnet/roslyn) from 4.3.0 to 4.3.1.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/dotnet/roslyn/releases\">Microsoft.CodeAnalysis.CSharp.Workspaces's releases</a>.</em></p>\n<blockquote>\n<h2>.NET 6.0.1</h2>\n<p><a href=\"https://github.com/dotnet/core/releases/tag/v6.0.1\">Release</a></p>\n<h2>.NET 5.0.4</h2>\n<p><a href=\"https://github.com/dotnet/core/releases/tag/v5.0.4\">Release</a></p>\n<h2>.NET 5.0.2</h2>\n<p><a href=\"https://github.com/dotnet/core/blob/master/release-notes/5.0/5.0.2/5.0.2.md\">Release Notes</a>\n<a href=\"https://github.com/dotnet/core/blob/master/release-notes/5.0/5.0.2/5.0.2-install-instructions.md\">Install Instructions</a></p>\n<h1>Repos</h1>\n<ul>\n<li><a href=\"https://github.com/dotnet/core/releases/tag/v5.0.2\">Core</a></li>\n</ul>\n</blockquote>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li>See full diff in <a href=\"https://github.com/dotnet/roslyn/commits\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\n[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=Microsoft.CodeAnalysis.CSharp.Workspaces&package-manager=nuget&previous-version=4.3.0&new-version=4.3.1)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-10-03T12:50:36Z",
          "tree_id": "1d5dbd7e48e1cabbb3ea7845be84ce824b424544",
          "url": "https://github.com/aws/jsii/commit/e0701a977f457ef177776e190efc3cfd8b6affe1"
        },
        "date": 1664805744442,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 97963.45527800004,
            "unit": "milliseconds",
            "range": 3979664.836619973,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 97963.45527800004 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 74221.80583055,
            "unit": "milliseconds",
            "range": 654777.8707001713,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 74221.80583055 milliseconds over 20 runs"
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
          "id": "b7fc7fed80185fe1fbeb82398b5201619b85bcbe",
          "message": "chore(deps-dev): Update mkdocs-material requirement from ~=8.5.3 to ~=8.5.6 in /gh-pages (#3788)\n\nUpdates the requirements on [mkdocs-material](https://github.com/squidfunk/mkdocs-material) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/releases\">mkdocs-material's releases</a>.</em></p>\n<blockquote>\n<h2>mkdocs-material-8.5.6</h2>\n<ul>\n<li>Modernized appearance of admonitions (with fallback, see <a href=\"https://squidfunk.github.io/mkdocs-material/reference/admonitions/#classic-admonitions\">docs</a>)</li>\n<li>Improved appearance of inline code blocks in admonition titles</li>\n</ul>\n</blockquote>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/blob/master/CHANGELOG\">mkdocs-material's changelog</a>.</em></p>\n<blockquote>\n<p>mkdocs-material-8.5.6+insiders-4.25.0 (2022-10-02)</p>\n<ul>\n<li>Added support for navigation subtitles</li>\n<li>Added support for defining an allow list for built-in tags plugin</li>\n<li>Added support for custom slugify functions for built-in tags plugin</li>\n<li>Improved stability of search plugin when using --dirtyreload</li>\n</ul>\n<p>mkdocs-material-8.5.6 (2022-10-02)</p>\n<ul>\n<li>Modernized appearance of admonitions (with fallback, see docs)</li>\n<li>Improved appearance of inline code blocks in admonition titles</li>\n</ul>\n<p>mkdocs-material-8.5.5+insiders-4.24.2 (2022-10-01)</p>\n<ul>\n<li>Updated MkDocs to 1.4</li>\n<li>Fixed compatibility issues with MkDocs 1.4</li>\n<li>Fixed incorrectly generated paths in privacy plugin</li>\n<li>Fixed blog index page not showing navigation when using meta plugin</li>\n</ul>\n<p>mkdocs-material-8.5.5 (2022-10-01)</p>\n<ul>\n<li>Updated MkDocs to 1.4</li>\n<li>Fixed compatibility issues with MkDocs 1.4</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4430\">#4430</a>: build error when enabling consent without repository URL</li>\n</ul>\n<p>mkdocs-material-8.5.4+insiders-4.24.1 (2022-09-30)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4430\">#4430</a>: build error when enabling consent without repository URL</li>\n</ul>\n<p>mkdocs-material-8.5.4 (2022-09-30)</p>\n<ul>\n<li>Fixed expand icons shift on sidebar overflow (using scrollbar-gutter)</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4429\">#4429</a>: Text in sequence diagrams overflows in Firefox</li>\n</ul>\n<p>mkdocs-material-8.5.3+insiders-4.24.0 (2022-09-27)</p>\n<ul>\n<li>Added support for custom content on index pages (blog)</li>\n<li>Added support for keeping content on paginated index pages (blog)</li>\n<li>Added support for limiting categories in post excerpts (blog)</li>\n<li>Added support for simple override of templates via front matter (blog)</li>\n<li>Added icon in navigation for pages with encrypted content</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4396\">#4396</a>: Front matter of index pages not inherited by pagination (blog)</li>\n<li>Improved performance by building post excerpts once (blog)</li>\n</ul>\n<p>mkdocs-material-8.5.3+insiders-4.23.6 (2022-09-22)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4389\">#4389</a>: Blog posts in first week of year in wrong archive</li>\n<li>Fixed (= switched) footer previous and next links for blog posts</li>\n</ul>\n<p>mkdocs-material-8.5.3 (2022-09-20)</p>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/f139b54c61b2df4512f15149cba2c222475e2bc9\"><code>f139b54</code></a> Prepare 8.5.6 release</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/d1fc8598212532a58c924a43f18b8f1fa8a096d3\"><code>d1fc859</code></a> Prepare 8.5.6 release</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/c44baee78d5cffec89c5d39c79b6504609795331\"><code>c44baee</code></a> Documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/ee1e675da613fb26b71d0385f732a55eac6aea73\"><code>ee1e675</code></a> Update slug reference</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/29f00a5bb8edabddaf2d6d211434b59bdde25c3d\"><code>29f00a5</code></a> Modernized look of admonitions</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/6edbcf896833026667149c47514542a8c438d490\"><code>6edbcf8</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4392\">#4392</a> from squidfunk/pin</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/1e508d6292a5b7fb7e57ddea75b0c672e0a4ffc5\"><code>1e508d6</code></a> Documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/0a5ab025b5a356facb6d2fc3b1bbbe1e4b6e806c\"><code>0a5ab02</code></a> Updated documentation and fixed syntax error in schema</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/cec89f0c6dd95fb6c6c6f2ae17551090f5639f1d\"><code>cec89f0</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4303\">#4303</a> from ojacques/master</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/26b307070ad60d2bc4a103ef4c0d27a1d888d62f\"><code>26b3070</code></a> Updated Insiders changelog</li>\n<li>Additional commits viewable in <a href=\"https://github.com/squidfunk/mkdocs-material/compare/8.5.3...8.5.6\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-10-03T13:42:16Z",
          "tree_id": "c0f19c97fc56b78410088056670e7a1c2fa5c6ae",
          "url": "https://github.com/aws/jsii/commit/b7fc7fed80185fe1fbeb82398b5201619b85bcbe"
        },
        "date": 1664807688140,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 72190.62955479999,
            "unit": "milliseconds",
            "range": 962642.1614251466,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 72190.62955479999 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 52410.8136532,
            "unit": "milliseconds",
            "range": 816253.3526256571,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 52410.8136532 milliseconds over 20 runs"
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
          "id": "d86aa92cd18ba67d02adaa32ed2238fd6db482d9",
          "message": "chore(deps-dev): Update mkdocs requirement from ~=1.3.1 to ~=1.4.0 in /gh-pages (#3787)\n\nUpdates the requirements on [mkdocs](https://github.com/mkdocs/mkdocs) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/mkdocs/mkdocs/releases\">mkdocs's releases</a>.</em></p>\n<blockquote>\n<h2>1.4.0</h2>\n<h2>Feature upgrades</h2>\n<h3>Hooks (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/2978\">#2978</a>)</h3>\n<p>The new <code>hooks:</code> config allows you to add plugin-like event handlers from local Python files, without needing to set up and install an actual plugin.</p>\n<p>See <a href=\"https://www.mkdocs.org/user-guide/configuration/#hooks\"><strong>documentation</strong></a>.</p>\n<h3><code>edit_uri</code> flexibility (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/2927\">#2927</a>)</h3>\n<p>There is a new <code>edit_uri_template:</code> config.<br />\nIt works like <code>edit_uri</code> but more generally covers ways to construct an edit URL.<br />\nSee <a href=\"https://www.mkdocs.org/user-guide/configuration/#edit_uri_template\"><strong>documentation</strong></a>.</p>\n<p>Additionally, the <code>edit_uri</code> functionality will now fully work even if <code>repo_url</code> is omitted (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/2928\">#2928</a>)</p>\n<h2>Upgrades for plugin developers</h2>\n<p>NOTE: This release has big changes to the implementation of plugins and their configs. But, the intention is to have zero breaking changes in all reasonably common use cases. Or at the very least if a code fix is required, there should always be a way to stay compatible with older MkDocs versions. Please report if this release breaks something.</p>\n<h3>Customize event order for plugin event handlers (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/2973\">#2973</a>)</h3>\n<p>Plugins can now choose to set a priority value for their event handlers. This can override the old behavior where for each event type, the handlers are called in the order that their plugins appear in the <a href=\"https://www.mkdocs.org/user-guide/configuration/#plugins\"><code>plugins</code> config</a>.</p>\n<p>If this is set, events with higher priority are called first. Events without a chosen priority get a default of 0. Events that have the same priority are ordered as they appear in the config.</p>\n<p>Recommended priority values: <code>100</code> &quot;first&quot;, <code>50</code> &quot;early&quot;, <code>0</code> &quot;default&quot;, <code>-50</code> &quot;late&quot;, <code>-100</code> &quot;last&quot;.<br />\nAs different plugins discover more precise relations to each other, the values should be further tweaked.</p>\n<p>See <a href=\"https://www.mkdocs.org/dev-guide/plugins/#event-priorities\"><strong>documentation</strong></a>.</p>\n<h3>New events that persist across builds in <code>mkdocs serve</code> (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/2972\">#2972</a>)</h3>\n<p>The new events are <code>on_startup</code> and <code>on_shutdown</code>. They run at the very beginning and very end of an <code>mkdocs</code> invocation.<br />\n<code>on_startup</code> also receives information on how <code>mkdocs</code> was invoked (e.g. <code>serve</code> <code>--dirtyreload</code>).</p>\n<p>See <a href=\"https://www.mkdocs.org/dev-guide/plugins/#events\"><strong>documentation</strong></a>.</p>\n<h3>Replace <code>File.src_path</code> to not deal with backslashes (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/2930\">#2930</a>)</h3>\n<p>The property <code>src_path</code> uses backslashes on Windows, which doesn't make sense as it's a virtual path.<br />\nTo not make a breaking change, there's no change to how <em>this</em> property is used, but now you should:</p>\n<ul>\n<li>Use <strong><code>File.src_uri</code></strong> instead of <code>File.src_path</code></li>\n<li>and <strong><code>File.dest_uri</code></strong> instead of <code>File.dest_path</code>.</li>\n</ul>\n<p>These consistently use forward slashes, and are now the definitive source that MkDocs itself uses.</p>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/927ee2684b7534b6dedf681fcb5cf753c8c47b7b\"><code>927ee26</code></a> Release 1.4.0 (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/2986\">#2986</a>)</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/5cce5012b4a35e11dcd31a7bd9d10800fd90b17a\"><code>5cce501</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/2962\">#2962</a> from mkdocs/meta</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/5015fa72af4d7fc6b42089c15825396ef7c3e657\"><code>5015fa7</code></a> Add examples of class-based schema with ListOfItems</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/cc627f7ba3bfb667b63df0cfd297dd456972d447\"><code>cc627f7</code></a> Prevent wrapping into Optional when the option has a default</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/aeffe614990a6ca3024dc7f3ddd0a3b7bfcff550\"><code>aeffe61</code></a> Change config_options.URL's default from '' to None</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/51569476c054103fa8e23123ae6c924a91188979\"><code>5156947</code></a> Add a test for subclassing a config schema</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/ff8552a57abf2c32f2d0344ef12707b88e008493\"><code>ff8552a</code></a> Add tests for new class-based configs</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/6d8c4d1c7fb1ccb8de21e2b03c697541d15705d5\"><code>6d8c4d1</code></a> Preserve a copy of config_options_tests before reworking it</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/452f56c61fb4afbb402784ba5e714ab7ed8c6ea1\"><code>452f56c</code></a> Move config_options_tests.py before reworking it</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/cf9d23757e4da73b3f4bf6346a86e67eb7619756\"><code>cf9d237</code></a> Change ListOfItems' &quot;default default&quot; from [] to None</li>\n<li>Additional commits viewable in <a href=\"https://github.com/mkdocs/mkdocs/compare/1.3.1...1.4.0\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-10-03T14:36:41Z",
          "tree_id": "da969a53ac70ca49d15d04ef8c1f176a2878a837",
          "url": "https://github.com/aws/jsii/commit/d86aa92cd18ba67d02adaa32ed2238fd6db482d9"
        },
        "date": 1664811025239,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 72399.88236835001,
            "unit": "milliseconds",
            "range": 442408.62306641985,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 72399.88236835001 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 53194.71829115,
            "unit": "milliseconds",
            "range": 442220.63448934455,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 53194.71829115 milliseconds over 20 runs"
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
          "id": "63f729faa54480fc09659f25094940ddc8e24381",
          "message": "chore(deps): Update pytest-mypy requirement from ~=0.9 to ~=0.10 in /packages/@jsii/python-runtime (#3786)\n\nUpdates the requirements on [pytest-mypy](https://github.com/dbader/pytest-mypy) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/dbader/pytest-mypy/releases\">pytest-mypy's releases</a>.</em></p>\n<blockquote>\n<h2>v0.10.0</h2>\n<p><a href=\"https://github.com/dbader/pytest-mypy/milestone/18\">https://github.com/dbader/pytest-mypy/milestone/18</a></p>\n</blockquote>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/dbader/pytest-mypy/blob/master/changelog.md\">pytest-mypy's changelog</a>.</em></p>\n<blockquote>\n<h2><a href=\"https://github.com/dbader/pytest-mypy/milestone/18\">0.10.0</a></h2>\n<ul>\n<li>Drop support for python&lt;3.6.</li>\n</ul>\n<h2><a href=\"https://github.com/dbader/pytest-mypy/milestone/17\">0.9.1</a></h2>\n<ul>\n<li>Add support for pytest 7.</li>\n</ul>\n<h2><a href=\"https://github.com/dbader/pytest-mypy/milestone/14\">0.9.0</a></h2>\n<ul>\n<li>Drop support for pytest&lt;4.6.</li>\n<li>Add --mypy-config-file.</li>\n</ul>\n<h2><a href=\"https://github.com/dbader/pytest-mypy/milestone/16\">0.8.1</a></h2>\n<ul>\n<li>Add a partial workaround for <a href=\"https://github-redirect.dependabot.com/pytest-dev/pytest/issues/8016\">pytest-dev/pytest#8016</a>.</li>\n</ul>\n<h2><a href=\"https://github.com/dbader/pytest-mypy/milestone/15\">0.8.0</a></h2>\n<ul>\n<li>Add support for Python 3.9.</li>\n<li>Stop injecting <code>MypyStatusItem</code> in <code>pytest_collection_modifyitems</code> to fix <code>--looponfail</code>.</li>\n</ul>\n<h2><a href=\"https://github.com/dbader/pytest-mypy/milestone/13\">0.7.0</a></h2>\n<ul>\n<li>Remove the upper bound on <code>python_requires</code>.</li>\n<li>Require Python 3.5 or greater.</li>\n<li>Enable custom error formatting.</li>\n<li>Fix compatibility with pytest-xdist 2.</li>\n</ul>\n<h2><a href=\"https://github.com/dbader/pytest-mypy/milestone/12\">0.6.2</a></h2>\n<ul>\n<li>Stop ignoring <code>.pyi</code> files.</li>\n</ul>\n<h2><a href=\"https://github.com/dbader/pytest-mypy/milestone/11\">0.6.1</a></h2>\n<ul>\n<li>Fix a PytestDeprecationWarning emitted by pytest&gt;=5.4</li>\n</ul>\n<h2><a href=\"https://github.com/dbader/pytest-mypy/milestone/10\">0.6.0</a></h2>\n<ul>\n<li>Inject a test that checks the mypy exit status</li>\n</ul>\n<h2><a href=\"https://github.com/dbader/pytest-mypy/milestone/9\">0.5.0</a></h2>\n<ul>\n<li>Remove <code>MypyItem.mypy_path</code></li>\n<li>Add support for pytest-xdist</li>\n<li>Add a configurable name to MypyItem node IDs</li>\n</ul>\n<h2><a href=\"https://github.com/dbader/pytest-mypy/milestone/8\">0.4.2</a></h2>\n<ul>\n<li>Make success message green instead of red</li>\n<li>Remove Python 3.8 beta/dev references</li>\n<li>Stop blacklisting early 0.5x and 0.7x mypy releases</li>\n</ul>\n<h2><a href=\"https://github.com/dbader/pytest-mypy/milestone/7\">0.4.1</a></h2>\n<ul>\n<li>Stop overlapping <code>python_version</code>s in <code>install_requires</code></li>\n</ul>\n<h2><a href=\"https://github.com/dbader/pytest-mypy/milestone/6\">0.4.0</a></h2>\n<ul>\n<li>Run mypy once per session instead of once per file</li>\n<li>Stop passing --incremental (which mypy now defaults to)</li>\n<li>Support configuring the plugin in a conftest.py</li>\n<li>Add support for Python 3.8</li>\n</ul>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/dbader/pytest-mypy/commit/7575b6462b2d96b6cdcb79f4a4ac0a816ec010dc\"><code>7575b64</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/dbader/pytest-mypy/issues/140\">#140</a> from dmtucker/mypy13701</li>\n<li><a href=\"https://github.com/dbader/pytest-mypy/commit/3e6c6e552130204a5cc12db848b7f2b5a256edc4\"><code>3e6c6e5</code></a> Xfail <a href=\"https://github-redirect.dependabot.com/python/mypy/issues/13701\">python/mypy#13701</a></li>\n<li><a href=\"https://github.com/dbader/pytest-mypy/commit/9710ab44edb57f6e7048c5909351f629b19c832a\"><code>9710ab4</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/dbader/pytest-mypy/issues/136\">#136</a> from dmtucker/dev</li>\n<li><a href=\"https://github.com/dbader/pytest-mypy/commit/29823367a96d145966106f74aad134a43b560c20\"><code>2982336</code></a> Upgrade flake8</li>\n<li><a href=\"https://github.com/dbader/pytest-mypy/commit/e9bc67b9b6aa603aee08dd64de0d2bdd395dd940\"><code>e9bc67b</code></a> Drop Python 3.5 support</li>\n<li><a href=\"https://github.com/dbader/pytest-mypy/commit/0c68c07c7639d3910e974524b1fb576a817ae099\"><code>0c68c07</code></a> Upgrade black</li>\n<li><a href=\"https://github.com/dbader/pytest-mypy/commit/3c9d8d5ff8d090e63d80a7a7c6c82d37b0ae2d2a\"><code>3c9d8d5</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/dbader/pytest-mypy/issues/132\">#132</a> from dmtucker/pytest7</li>\n<li><a href=\"https://github.com/dbader/pytest-mypy/commit/00c720446707b36506989f017c10f806d711faf5\"><code>00c7204</code></a> Update the changelog for 0.9.1</li>\n<li><a href=\"https://github.com/dbader/pytest-mypy/commit/2b6e20704b4044063214be3b701e183163cb196e\"><code>2b6e207</code></a> Add support for pytest 7</li>\n<li>See full diff in <a href=\"https://github.com/dbader/pytest-mypy/compare/v0.9.0...v0.10.0\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-10-03T15:25:56Z",
          "tree_id": "69277ac579fb28141d20b16dfd3aa64e351d5af7",
          "url": "https://github.com/aws/jsii/commit/63f729faa54480fc09659f25094940ddc8e24381"
        },
        "date": 1664814411259,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 84859.61526695002,
            "unit": "milliseconds",
            "range": 1963223.9334318954,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 84859.61526695002 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 63723.97458434999,
            "unit": "milliseconds",
            "range": 1134608.9445408208,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 63723.97458434999 milliseconds over 20 runs"
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
          "id": "63f729faa54480fc09659f25094940ddc8e24381",
          "message": "chore(deps): Update pytest-mypy requirement from ~=0.9 to ~=0.10 in /packages/@jsii/python-runtime (#3786)\n\nUpdates the requirements on [pytest-mypy](https://github.com/dbader/pytest-mypy) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/dbader/pytest-mypy/releases\">pytest-mypy's releases</a>.</em></p>\n<blockquote>\n<h2>v0.10.0</h2>\n<p><a href=\"https://github.com/dbader/pytest-mypy/milestone/18\">https://github.com/dbader/pytest-mypy/milestone/18</a></p>\n</blockquote>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/dbader/pytest-mypy/blob/master/changelog.md\">pytest-mypy's changelog</a>.</em></p>\n<blockquote>\n<h2><a href=\"https://github.com/dbader/pytest-mypy/milestone/18\">0.10.0</a></h2>\n<ul>\n<li>Drop support for python&lt;3.6.</li>\n</ul>\n<h2><a href=\"https://github.com/dbader/pytest-mypy/milestone/17\">0.9.1</a></h2>\n<ul>\n<li>Add support for pytest 7.</li>\n</ul>\n<h2><a href=\"https://github.com/dbader/pytest-mypy/milestone/14\">0.9.0</a></h2>\n<ul>\n<li>Drop support for pytest&lt;4.6.</li>\n<li>Add --mypy-config-file.</li>\n</ul>\n<h2><a href=\"https://github.com/dbader/pytest-mypy/milestone/16\">0.8.1</a></h2>\n<ul>\n<li>Add a partial workaround for <a href=\"https://github-redirect.dependabot.com/pytest-dev/pytest/issues/8016\">pytest-dev/pytest#8016</a>.</li>\n</ul>\n<h2><a href=\"https://github.com/dbader/pytest-mypy/milestone/15\">0.8.0</a></h2>\n<ul>\n<li>Add support for Python 3.9.</li>\n<li>Stop injecting <code>MypyStatusItem</code> in <code>pytest_collection_modifyitems</code> to fix <code>--looponfail</code>.</li>\n</ul>\n<h2><a href=\"https://github.com/dbader/pytest-mypy/milestone/13\">0.7.0</a></h2>\n<ul>\n<li>Remove the upper bound on <code>python_requires</code>.</li>\n<li>Require Python 3.5 or greater.</li>\n<li>Enable custom error formatting.</li>\n<li>Fix compatibility with pytest-xdist 2.</li>\n</ul>\n<h2><a href=\"https://github.com/dbader/pytest-mypy/milestone/12\">0.6.2</a></h2>\n<ul>\n<li>Stop ignoring <code>.pyi</code> files.</li>\n</ul>\n<h2><a href=\"https://github.com/dbader/pytest-mypy/milestone/11\">0.6.1</a></h2>\n<ul>\n<li>Fix a PytestDeprecationWarning emitted by pytest&gt;=5.4</li>\n</ul>\n<h2><a href=\"https://github.com/dbader/pytest-mypy/milestone/10\">0.6.0</a></h2>\n<ul>\n<li>Inject a test that checks the mypy exit status</li>\n</ul>\n<h2><a href=\"https://github.com/dbader/pytest-mypy/milestone/9\">0.5.0</a></h2>\n<ul>\n<li>Remove <code>MypyItem.mypy_path</code></li>\n<li>Add support for pytest-xdist</li>\n<li>Add a configurable name to MypyItem node IDs</li>\n</ul>\n<h2><a href=\"https://github.com/dbader/pytest-mypy/milestone/8\">0.4.2</a></h2>\n<ul>\n<li>Make success message green instead of red</li>\n<li>Remove Python 3.8 beta/dev references</li>\n<li>Stop blacklisting early 0.5x and 0.7x mypy releases</li>\n</ul>\n<h2><a href=\"https://github.com/dbader/pytest-mypy/milestone/7\">0.4.1</a></h2>\n<ul>\n<li>Stop overlapping <code>python_version</code>s in <code>install_requires</code></li>\n</ul>\n<h2><a href=\"https://github.com/dbader/pytest-mypy/milestone/6\">0.4.0</a></h2>\n<ul>\n<li>Run mypy once per session instead of once per file</li>\n<li>Stop passing --incremental (which mypy now defaults to)</li>\n<li>Support configuring the plugin in a conftest.py</li>\n<li>Add support for Python 3.8</li>\n</ul>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/dbader/pytest-mypy/commit/7575b6462b2d96b6cdcb79f4a4ac0a816ec010dc\"><code>7575b64</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/dbader/pytest-mypy/issues/140\">#140</a> from dmtucker/mypy13701</li>\n<li><a href=\"https://github.com/dbader/pytest-mypy/commit/3e6c6e552130204a5cc12db848b7f2b5a256edc4\"><code>3e6c6e5</code></a> Xfail <a href=\"https://github-redirect.dependabot.com/python/mypy/issues/13701\">python/mypy#13701</a></li>\n<li><a href=\"https://github.com/dbader/pytest-mypy/commit/9710ab44edb57f6e7048c5909351f629b19c832a\"><code>9710ab4</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/dbader/pytest-mypy/issues/136\">#136</a> from dmtucker/dev</li>\n<li><a href=\"https://github.com/dbader/pytest-mypy/commit/29823367a96d145966106f74aad134a43b560c20\"><code>2982336</code></a> Upgrade flake8</li>\n<li><a href=\"https://github.com/dbader/pytest-mypy/commit/e9bc67b9b6aa603aee08dd64de0d2bdd395dd940\"><code>e9bc67b</code></a> Drop Python 3.5 support</li>\n<li><a href=\"https://github.com/dbader/pytest-mypy/commit/0c68c07c7639d3910e974524b1fb576a817ae099\"><code>0c68c07</code></a> Upgrade black</li>\n<li><a href=\"https://github.com/dbader/pytest-mypy/commit/3c9d8d5ff8d090e63d80a7a7c6c82d37b0ae2d2a\"><code>3c9d8d5</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/dbader/pytest-mypy/issues/132\">#132</a> from dmtucker/pytest7</li>\n<li><a href=\"https://github.com/dbader/pytest-mypy/commit/00c720446707b36506989f017c10f806d711faf5\"><code>00c7204</code></a> Update the changelog for 0.9.1</li>\n<li><a href=\"https://github.com/dbader/pytest-mypy/commit/2b6e20704b4044063214be3b701e183163cb196e\"><code>2b6e207</code></a> Add support for pytest 7</li>\n<li>See full diff in <a href=\"https://github.com/dbader/pytest-mypy/compare/v0.9.0...v0.10.0\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-10-03T15:25:56Z",
          "tree_id": "69277ac579fb28141d20b16dfd3aa64e351d5af7",
          "url": "https://github.com/aws/jsii/commit/63f729faa54480fc09659f25094940ddc8e24381"
        },
        "date": 1664819039506,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 69205.20390994997,
            "unit": "milliseconds",
            "range": 895492.4493903264,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 69205.20390994997 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 50875.498204849995,
            "unit": "milliseconds",
            "range": 715641.5989643487,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 50875.498204849995 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "46447321+allcontributors[bot]@users.noreply.github.com",
            "name": "allcontributors[bot]",
            "username": "allcontributors[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "0b09cb34b42b2556f5a3532b6819bf171b04a39a",
          "message": "docs: add Chriscbr as a contributor for bug, and code (#3779)\n\nCo-authored-by: allcontributors[bot] <46447321+allcontributors[bot]@users.noreply.github.com>\r\nCo-authored-by: Romain Marcadier <rmuller@amazon.fr>\r\nCo-authored-by: mergify[bot] <37929162+mergify[bot]@users.noreply.github.com>",
          "timestamp": "2022-10-04T11:19:44+02:00",
          "tree_id": "614d2da57d34da7c9a684060cb93d61fb82e1420",
          "url": "https://github.com/aws/jsii/commit/0b09cb34b42b2556f5a3532b6819bf171b04a39a"
        },
        "date": 1664878810029,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 81585.5582134,
            "unit": "milliseconds",
            "range": 1549097.5412921102,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 81585.5582134 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 60801.51966749999,
            "unit": "milliseconds",
            "range": 299423.7852356708,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 60801.51966749999 milliseconds over 20 runs"
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
          "id": "27cd853784f151de41bd31a787b86cbf7fbac86e",
          "message": "chore(spec): improve assembly validation error messages (#3790)\n\nuse the ajv error message formatter instead of only outputting the `e.message` as the later fails to include useful information to determine where the actual error is.\n\nTurn the validation test into a snapshot test to draw attention on the error message format.\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-10-04T13:33:38Z",
          "tree_id": "33003503c2af2d9011a1d9b72b6b87780a8dc804",
          "url": "https://github.com/aws/jsii/commit/27cd853784f151de41bd31a787b86cbf7fbac86e"
        },
        "date": 1664894560136,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 97496.51468015001,
            "unit": "milliseconds",
            "range": 16438812.016895432,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 97496.51468015001 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 74402.71448419997,
            "unit": "milliseconds",
            "range": 4806921.088762746,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 74402.71448419997 milliseconds over 20 runs"
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
          "id": "dae724c39ba274c6facd8fb9f4b93cc2db52e311",
          "message": "fix(python): KeyError in type checks when decorating methods (#3791)\n\nWhen methods are decorated by users (e.g: replaced with an alternate function that delegates back to the original one), type annotations are not carried over to the new function.\n\nSince type checking code relied on dynamically accessing the checked function for the purpose of getting type hints,this resulted in unexpected errors when executing type checking code.\n\nIn order to address this, the type checking code now declares a stub function locally with the relevant type information in order to have a reliable/stable source of type annotations (these cannot be constructed dynamically as Python does not expose the necessary constructors).\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-10-05T15:03:53Z",
          "tree_id": "b06573af1ea6b00d163ce8db7b8d8aaf0bffee00",
          "url": "https://github.com/aws/jsii/commit/dae724c39ba274c6facd8fb9f4b93cc2db52e311"
        },
        "date": 1664984957628,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 58810.78670399993,
            "unit": "milliseconds",
            "range": 4056905.1534684584,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 58810.78670399993 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 45581.06782320001,
            "unit": "milliseconds",
            "range": 101907.02402220706,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 45581.06782320001 milliseconds over 20 runs"
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
          "id": "9b6a3072ae4c95be152196f8fea36237fa2d0f99",
          "message": "feat: add error awareness to go deserialization (#3793)\n\nAdds logic to detect when error responses are returned from the kernel within the go runtime library. This allows us to bubble up the correct error messaging from the kernel instead of just failed deserialization with unexpected response format.\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-10-06T13:40:02Z",
          "tree_id": "f061df5fd5838d3fd06181513de6f0adfdc908ee",
          "url": "https://github.com/aws/jsii/commit/9b6a3072ae4c95be152196f8fea36237fa2d0f99"
        },
        "date": 1665067880049,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 99000.40928610002,
            "unit": "milliseconds",
            "range": 5202300.704647409,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 99000.40928610002 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 76646.31684320002,
            "unit": "milliseconds",
            "range": 1461718.5387059662,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 76646.31684320002 milliseconds over 20 runs"
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
          "id": "7591af96aec9d44f64a8398203d65730ab19b637",
          "message": "chore: npm-check-updates && yarn upgrade (#3792)\n\nRan npm-check-updates and yarn upgrade to keep the `yarn.lock` file up-to-date.",
          "timestamp": "2022-10-10T10:30:45Z",
          "tree_id": "0fdcfb07acb18483a4558d11fe46fc70cf92ab51",
          "url": "https://github.com/aws/jsii/commit/7591af96aec9d44f64a8398203d65730ab19b637"
        },
        "date": 1665401560200,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 86012.63372875,
            "unit": "milliseconds",
            "range": 3323472.011482009,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 86012.63372875 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 64298.253602900004,
            "unit": "milliseconds",
            "range": 332387.4711425203,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 64298.253602900004 milliseconds over 20 runs"
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
          "id": "9a63055c2250bbe919660d9d7ae9d7db1f3b40ff",
          "message": "chore(deps-dev): Bump mypy from 0.981 to 0.982 in /packages/jsii-pacmak/test/generated-code (#3789)\n\nBumps [mypy](https://github.com/python/mypy) from 0.981 to 0.982.\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/python/mypy/commit/1c2b899fa9029538b9b9e6d30401901d94536202\"><code>1c2b899</code></a> Bump version to 0.982</li>\n<li><a href=\"https://github.com/python/mypy/commit/51d9858b09c82499c79023d0a80693a71baa7bed\"><code>51d9858</code></a> Restore Type vs Callable special-casing that was broken in refactoring (<a href=\"https://github-redirect.dependabot.com/python/mypy/issues/13784\">#13784</a>)</li>\n<li><a href=\"https://github.com/python/mypy/commit/d03f201762df7138c6da157b5cbb8e634acef45f\"><code>d03f201</code></a> Suggest using upper bound for unbound tvar (<a href=\"https://github-redirect.dependabot.com/python/mypy/issues/13730\">#13730</a>)</li>\n<li><a href=\"https://github.com/python/mypy/commit/5b17cc6c393280326ed15d763e599cbaeefbc0e6\"><code>5b17cc6</code></a> Fix overload overlap check for UninhabitedType (<a href=\"https://github-redirect.dependabot.com/python/mypy/issues/13461\">#13461</a>)</li>\n<li>See full diff in <a href=\"https://github.com/python/mypy/compare/v0.981...v0.982\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\n[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=mypy&package-manager=pip&previous-version=0.981&new-version=0.982)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-10-10T11:26:26Z",
          "tree_id": "dad20b76b9047416c60c49599358779bf6223352",
          "url": "https://github.com/aws/jsii/commit/9a63055c2250bbe919660d9d7ae9d7db1f3b40ff"
        },
        "date": 1665404212062,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 69334.09446035002,
            "unit": "milliseconds",
            "range": 316923.70037029736,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 69334.09446035002 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 50488.36880090002,
            "unit": "milliseconds",
            "range": 445220.3851431164,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 50488.36880090002 milliseconds over 20 runs"
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
          "id": "a45a7b2d203d08e4453d0f7cb43f5ebae12ecc36",
          "message": "chore(deps): Update black requirement from ~=22.8 to ~=22.10 in /packages/@jsii/python-runtime (#3795)\n\nUpdates the requirements on [black](https://github.com/psf/black) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/psf/black/releases\">black's releases</a>.</em></p>\n<blockquote>\n<h2>22.10.0</h2>\n<h3>Highlights</h3>\n<ul>\n<li>Runtime support for Python 3.6 has been removed. Formatting 3.6 code will still be\nsupported until further notice.</li>\n</ul>\n<h3>Stable style</h3>\n<ul>\n<li>Fix a crash when <code># fmt: on</code> is used on a different block level than <code># fmt: off</code>\n(<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3281\">#3281</a>)</li>\n</ul>\n<h3>Preview style</h3>\n<ul>\n<li>Fix a crash when formatting some dicts with parenthesis-wrapped long string keys\n(<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3262\">#3262</a>)</li>\n</ul>\n<h3>Configuration</h3>\n<ul>\n<li><code>.ipynb_checkpoints</code> directories are now excluded by default (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3293\">#3293</a>)</li>\n<li>Add <code>--skip-source-first-line</code> / <code>-x</code> option to ignore the first line of source code\nwhile formatting (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3299\">#3299</a>)</li>\n</ul>\n<h3>Packaging</h3>\n<ul>\n<li>Executables made with PyInstaller will no longer crash when formatting several files\nat once on macOS. Native x86-64 executables for macOS are available once again.\n(<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3275\">#3275</a>)</li>\n<li>Hatchling is now used as the build backend. This will not have any effect for users\nwho install Black with its wheels from PyPI. (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3233\">#3233</a>)</li>\n<li>Faster compiled wheels are now available for CPython 3.11 (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3276\">#3276</a>)</li>\n</ul>\n<h3><em>Blackd</em></h3>\n<ul>\n<li>Windows style (CRLF) newlines will be preserved (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3257\">#3257</a>).</li>\n</ul>\n<h3>Integrations</h3>\n<ul>\n<li>Vim plugin: add flag (<code>g:black_preview</code>) to enable/disable the preview style (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3246\">#3246</a>)</li>\n<li>Update GitHub Action to support formatting of Jupyter Notebook files via a <code>jupyter</code>\noption (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3282\">#3282</a>)</li>\n<li>Update GitHub Action to support use of version specifiers (e.g. <code>&lt;23</code>) for Black\nversion (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3265\">#3265</a>)</li>\n</ul>\n</blockquote>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/psf/black/blob/main/CHANGES.md\">black's changelog</a>.</em></p>\n<blockquote>\n<h2>22.10.0</h2>\n<h3>Highlights</h3>\n<ul>\n<li>Runtime support for Python 3.6 has been removed. Formatting 3.6 code will still be\nsupported until further notice.</li>\n</ul>\n<h3>Stable style</h3>\n<ul>\n<li>Fix a crash when <code># fmt: on</code> is used on a different block level than <code># fmt: off</code>\n(<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3281\">#3281</a>)</li>\n</ul>\n<h3>Preview style</h3>\n<ul>\n<li>Fix a crash when formatting some dicts with parenthesis-wrapped long string keys\n(<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3262\">#3262</a>)</li>\n</ul>\n<h3>Configuration</h3>\n<ul>\n<li><code>.ipynb_checkpoints</code> directories are now excluded by default (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3293\">#3293</a>)</li>\n<li>Add <code>--skip-source-first-line</code> / <code>-x</code> option to ignore the first line of source code\nwhile formatting (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3299\">#3299</a>)</li>\n</ul>\n<h3>Packaging</h3>\n<ul>\n<li>Executables made with PyInstaller will no longer crash when formatting several files\nat once on macOS. Native x86-64 executables for macOS are available once again.\n(<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3275\">#3275</a>)</li>\n<li>Hatchling is now used as the build backend. This will not have any effect for users\nwho install Black with its wheels from PyPI. (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3233\">#3233</a>)</li>\n<li>Faster compiled wheels are now available for CPython 3.11 (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3276\">#3276</a>)</li>\n</ul>\n<h3><em>Blackd</em></h3>\n<ul>\n<li>Windows style (CRLF) newlines will be preserved (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3257\">#3257</a>).</li>\n</ul>\n<h3>Integrations</h3>\n<ul>\n<li>Vim plugin: add flag (<code>g:black_preview</code>) to enable/disable the preview style (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3246\">#3246</a>)</li>\n<li>Update GitHub Action to support formatting of Jupyter Notebook files via a <code>jupyter</code>\noption (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3282\">#3282</a>)</li>\n<li>Update GitHub Action to support use of version specifiers (e.g. <code>&lt;23</code>) for Black\nversion (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3265\">#3265</a>)</li>\n</ul>\n<h2>22.8.0</h2>\n<h3>Highlights</h3>\n<ul>\n<li>Python 3.11 is now supported, except for <em>blackd</em> as aiohttp does not support 3.11 as\nof publishing (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3234\">#3234</a>)</li>\n</ul>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/psf/black/commit/27d20144a7517594e24a1649451177b2a11284be\"><code>27d2014</code></a> Prepare release 22.10.0 (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3311\">#3311</a>)</li>\n<li><a href=\"https://github.com/psf/black/commit/4da0851809e024760d3861ff43309125de34157a\"><code>4da0851</code></a> Add option to skip the first line of source code (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3299\">#3299</a>)</li>\n<li><a href=\"https://github.com/psf/black/commit/0359b85b5800dd77f8f1cfaa88ca8ab8215df685\"><code>0359b85</code></a> Preserve crlf line endings in blackd (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3257\">#3257</a>)</li>\n<li><a href=\"https://github.com/psf/black/commit/27d7ea43eb127cc5189a724a7d194d94ba312861\"><code>27d7ea4</code></a> Bump docutils from 0.18.1 to 0.19 in /docs (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3161\">#3161</a>)</li>\n<li><a href=\"https://github.com/psf/black/commit/1a20c4d4874f912822f6a42cb61816330a4f6508\"><code>1a20c4d</code></a> Bump sphinx from 5.2.1 to 5.2.3 in /docs (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3305\">#3305</a>)</li>\n<li><a href=\"https://github.com/psf/black/commit/980997f215d25deb27e03ea704258f62199b8a5f\"><code>980997f</code></a> Bump furo from 2022.9.15 to 2022.9.29 in /docs (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3304\">#3304</a>)</li>\n<li><a href=\"https://github.com/psf/black/commit/b1077aa14ee6afc90aac15549a1f5d0aff4fd524\"><code>b1077aa</code></a> Bump myst-parser from 0.18.0 to 0.18.1 in /docs (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3303\">#3303</a>)</li>\n<li><a href=\"https://github.com/psf/black/commit/956bf3962edff284d05ad42576bac7e74ae8788d\"><code>956bf39</code></a> Add .ipynb_checkpoints to DEFAULT_EXCLUDES (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3293\">#3293</a>)</li>\n<li><a href=\"https://github.com/psf/black/commit/141291a1d86d43158da89d0254b7c2cc79609679\"><code>141291a</code></a> Enable build isolation under CIWB (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3297\">#3297</a>)</li>\n<li><a href=\"https://github.com/psf/black/commit/ddb99241b583f45e01df622c0d8f119aecd0188e\"><code>ddb9924</code></a> Bump pypa/cibuildwheel from 2.10.0 to 2.10.2 (<a href=\"https://github-redirect.dependabot.com/psf/black/issues/3290\">#3290</a>)</li>\n<li>Additional commits viewable in <a href=\"https://github.com/psf/black/compare/22.8.0...22.10.0\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-10-10T12:44:40Z",
          "tree_id": "7944fe9186e5c956b9b99f8a432341f5ff0f5ef8",
          "url": "https://github.com/aws/jsii/commit/a45a7b2d203d08e4453d0f7cb43f5ebae12ecc36"
        },
        "date": 1665409904202,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 92204.24963990002,
            "unit": "milliseconds",
            "range": 6220834.995521367,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 92204.24963990002 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 69267.19490740001,
            "unit": "milliseconds",
            "range": 1671602.0301635512,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 69267.19490740001 milliseconds over 20 runs"
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
          "id": "4bc08e75e1412ce9b5bc32b353da27ee4d0b49c7",
          "message": "chore(deps): Bump @xmldom/xmldom from 0.8.2 to 0.8.3 (#3797)\n\nBumps [@xmldom/xmldom](https://github.com/xmldom/xmldom) from 0.8.2 to 0.8.3.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/xmldom/xmldom/releases\"><code>@​xmldom/xmldom</code>'s releases</a>.</em></p>\n<blockquote>\n<h2>0.8.3</h2>\n<p><a href=\"https://github.com/xmldom/xmldom/compare/0.8.3...0.8.2\">Commits</a></p>\n<h3>Fixed</h3>\n<ul>\n<li>Avoid iterating over prototype properties <a href=\"https://github-redirect.dependabot.com/xmldom/xmldom/pull/437\"><code>[#437](https://github.com/xmldom/xmldom/issues/437)</code></a> / <a href=\"https://github-redirect.dependabot.com/xmldom/xmldom/issues/436\"><code>[#436](https://github.com/xmldom/xmldom/issues/436)</code></a></li>\n</ul>\n<p>Thank you, <a href=\"https://github.com/Supraja9726\"><code>@​Supraja9726</code></a> for your contributions</p>\n</blockquote>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/xmldom/xmldom/blob/master/CHANGELOG.md\"><code>@​xmldom/xmldom</code>'s changelog</a>.</em></p>\n<blockquote>\n<h1>Changelog</h1>\n<p>All notable changes to this project will be documented in this file.</p>\n<p>This project adheres to <a href=\"https://semver.org/spec/v2.0.0.html\">Semantic Versioning</a>.</p>\n<h2><a href=\"https://github.com/xmldom/xmldom/compare/0.8.3...0.8.2\">0.8.3</a></h2>\n<h3>Fixed</h3>\n<ul>\n<li>Avoid iterating over prototype properties <a href=\"https://github-redirect.dependabot.com/xmldom/xmldom/pull/437\"><code>[#437](https://github.com/xmldom/xmldom/issues/437)</code></a> / <a href=\"https://github-redirect.dependabot.com/xmldom/xmldom/issues/436\"><code>[#436](https://github.com/xmldom/xmldom/issues/436)</code></a></li>\n</ul>\n<p>Thank you, <a href=\"https://github.com/Supraja9726\"><code>@​Supraja9726</code></a> for your contributions</p>\n<h2><a href=\"https://github.com/xmldom/xmldom/compare/0.9.0-beta.1...0.9.0-beta.2\">0.9.0-beta.2</a></h2>\n<h3>Fixed</h3>\n<ul>\n<li>Avoid iterating over prototype properties <a href=\"https://github-redirect.dependabot.com/xmldom/xmldom/pull/437\"><code>[#437](https://github.com/xmldom/xmldom/issues/437)</code></a> / <a href=\"https://github-redirect.dependabot.com/xmldom/xmldom/issues/436\"><code>[#436](https://github.com/xmldom/xmldom/issues/436)</code></a></li>\n</ul>\n<p>Thank you, <a href=\"https://github.com/Supraja9726\"><code>@​Supraja9726</code></a> for your contributions</p>\n<h2><a href=\"https://github.com/xmldom/xmldom/compare/0.8.3...0.8.2\">0.8.3</a></h2>\n<h3>Fixed</h3>\n<ul>\n<li>Avoid iterating over prototype properties <a href=\"https://github-redirect.dependabot.com/xmldom/xmldom/pull/437\"><code>[#437](https://github.com/xmldom/xmldom/issues/437)</code></a> / <a href=\"https://github-redirect.dependabot.com/xmldom/xmldom/issues/436\"><code>[#436](https://github.com/xmldom/xmldom/issues/436)</code></a></li>\n</ul>\n<p>Thank you, <a href=\"https://github.com/Supraja9726\"><code>@​Supraja9726</code></a> for your contributions</p>\n<h2><a href=\"https://github.com/xmldom/xmldom/compare/0.8.2...0.9.0-beta.1\">0.9.0-beta.1</a></h2>\n<h3>Fixed</h3>\n<p><strong>Only use HTML rules if mimeType matches</strong> <a href=\"https://github-redirect.dependabot.com/xmldom/xmldom/pull/338\"><code>[#338](https://github.com/xmldom/xmldom/issues/338)</code></a>, fixes <a href=\"https://github-redirect.dependabot.com/xmldom/xmldom/issues/203\"><code>[#203](https://github.com/xmldom/xmldom/issues/203)</code></a></p>\n<p>In the living specs for parsing XML and HTML, that this library is trying to implement,\nthere is a distinction between the different types of documents being parsed:\nThere are quite some rules that are different for parsing, constructing and serializing XML vs HTML documents.</p>\n<p>So far xmldom was always &quot;detecting&quot; whether &quot;the HTML rules should be applied&quot; by looking at the current namespace. So from the first time an the HTML default namespace (<code>http://www.w3.org/1999/xhtml</code>) was found, every node was treated as being part of an HTML document. This misconception is the root cause for quite some reported bugs.</p>\n<p>BREAKING CHANGE: HTML rules are no longer applied just because of the namespace, but require the <code>mimeType</code> argument passed to <code>DOMParser.parseFromString(source, mimeType)</code> to match <code>'text/html'</code>. Doing so implies all rules for handling casing for tag and attribute names when parsing, creation of nodes and searching nodes.</p>\n<p>BREAKING CHANGE: Correct the return type of <code>DOMParser.parseFromString</code> to <code>Document | undefined</code>. In case of parsing errors it was always possible that &quot;the returned <code>Document</code>&quot; has not been created. In case you are using Typescript you now need to handle those cases.</p>\n<p>BREAKING CHANGE: The instance property <code>DOMParser.options</code> is no longer available, instead use the individual <code>readonly</code> property per option (<code>assign</code>, <code>domHandler</code>, <code>errorHandler</code>, <code>normalizeLineEndings</code>, <code>locator</code>, <code>xmlns</code>). Those also provides the default value if the option was not passed. The 'locator' option is now just a boolean (default remains <code>true</code>).</p>\n<p>BREAKING CHANGE: The following methods no longer allow a (non spec compliant) boolean argument to toggle &quot;HTML rules&quot;:</p>\n<ul>\n<li><code>XMLSerializer.serializeToString</code></li>\n<li><code>Node.toString</code></li>\n<li><code>Document.toString</code></li>\n</ul>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/xmldom/xmldom/commit/c9df7a299aa2862780c7b6e308f0f0dbcffd0a8c\"><code>c9df7a2</code></a> 0.8.3</li>\n<li><a href=\"https://github.com/xmldom/xmldom/commit/1c57b5ea3b27eb8c65b51ec900689fae8c1fa74d\"><code>1c57b5e</code></a> docs: Prepare CHANGELOG for 0.8.3</li>\n<li><a href=\"https://github.com/xmldom/xmldom/commit/7c0d4b7fbf74079060a2f135a369adeeccaf4b18\"><code>7c0d4b7</code></a> fix: Avoid iterating over prototype properties</li>\n<li><a href=\"https://github.com/xmldom/xmldom/commit/a701915e70e568d116334a79dd5eda591eeb0d8f\"><code>a701915</code></a> chore(deps): update dependency eslint to v8.25.0 (<a href=\"https://github-redirect.dependabot.com/xmldom/xmldom/issues/433\">#433</a>)</li>\n<li><a href=\"https://github.com/xmldom/xmldom/commit/2aef5ef532bbb708c0211da8929e3a7681bd475c\"><code>2aef5ef</code></a> chore(deps): update actions/setup-node action to v3 (<a href=\"https://github-redirect.dependabot.com/xmldom/xmldom/issues/431\">#431</a>)</li>\n<li><a href=\"https://github.com/xmldom/xmldom/commit/0842586aa79c8a35d847e9a66816430ca3314a95\"><code>0842586</code></a> chore(deps): update dependency eslint-plugin-prettier to v4.2.1 (<a href=\"https://github-redirect.dependabot.com/xmldom/xmldom/issues/418\">#418</a>)</li>\n<li><a href=\"https://github.com/xmldom/xmldom/commit/8f1ee5e9609742035df17809313c1a48a55c1d3d\"><code>8f1ee5e</code></a> chore(deps): update dependency eslint to v8.24.0 (<a href=\"https://github-redirect.dependabot.com/xmldom/xmldom/issues/430\">#430</a>)</li>\n<li><a href=\"https://github.com/xmldom/xmldom/commit/8a34f293b5a693b5a6987f493e0339e494ce7889\"><code>8a34f29</code></a> chore(deps): update dependency nodemon to v2.0.20 (<a href=\"https://github-redirect.dependabot.com/xmldom/xmldom/issues/429\">#429</a>)</li>\n<li><a href=\"https://github.com/xmldom/xmldom/commit/ac8012ff998e6948a4a12858d9055b2c39f15c6d\"><code>ac8012f</code></a> chore(deps): update dependency eslint to v8.23.1 (<a href=\"https://github-redirect.dependabot.com/xmldom/xmldom/issues/419\">#419</a>)</li>\n<li><a href=\"https://github.com/xmldom/xmldom/commit/7efca8c4b7a7b9c2be045d35b4963c8301cb7c80\"><code>7efca8c</code></a> chore(deps): update dependency nodemon to v2.0.19 (<a href=\"https://github-redirect.dependabot.com/xmldom/xmldom/issues/420\">#420</a>)</li>\n<li>Additional commits viewable in <a href=\"https://github.com/xmldom/xmldom/compare/0.8.2...0.8.3\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\n[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=@xmldom/xmldom&package-manager=npm_and_yarn&previous-version=0.8.2&new-version=0.8.3)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\nYou can disable automated security fix PRs for this repo from the [Security Alerts page](https://github.com/aws/jsii/network/alerts).\n\n</details>",
          "timestamp": "2022-10-17T11:43:23Z",
          "tree_id": "44b7c8cd7e3a49f47d3916dceb8623e949cbc9f0",
          "url": "https://github.com/aws/jsii/commit/4bc08e75e1412ce9b5bc32b353da27ee4d0b49c7"
        },
        "date": 1666010606166,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 81876.96274350004,
            "unit": "milliseconds",
            "range": 1561180.9107795055,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 81876.96274350004 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 60253.395471750024,
            "unit": "milliseconds",
            "range": 1423644.6730043334,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 60253.395471750024 milliseconds over 20 runs"
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
          "id": "5d5e9216438c32dc279d578c8a7f1dd3a2134fdf",
          "message": "chore(deps): Bump Microsoft.Extensions.DependencyInjection from 6.0.0 to 6.0.1 in /packages/@jsii/dotnet-runtime-test/test (#3802)\n\nBumps [Microsoft.Extensions.DependencyInjection](https://github.com/dotnet/runtime) from 6.0.0 to 6.0.1.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/dotnet/runtime/releases\">Microsoft.Extensions.DependencyInjection's releases</a>.</em></p>\n<blockquote>\n<h2>.NET 6.0.1</h2>\n<p><a href=\"https://github.com/dotnet/core/releases/tag/v6.0.1\">Release</a></p>\n</blockquote>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/dotnet/runtime/commit/3a25a7f1cc446b60678ed25c9d829420d6321eba\"><code>3a25a7f</code></a> Merge in 'release/6.0' changes</li>\n<li><a href=\"https://github.com/dotnet/runtime/commit/e9036b04357e8454439a0e6cf22186a0cb19e616\"><code>e9036b0</code></a> [release/6.0] Add packaging changes for System.Text.Json (<a href=\"https://github-redirect.dependabot.com/dotnet/runtime/issues/61703\">#61703</a>)</li>\n<li><a href=\"https://github.com/dotnet/runtime/commit/bfdc5e92677d896f3c96318ddffbf3b70138bb20\"><code>bfdc5e9</code></a> Merge branch 'internal/release/6.0' of <a href=\"https://dev.azure.com/dnceng/internal/\">https://dev.azure.com/dnceng/internal/</a>...</li>\n<li><a href=\"https://github.com/dotnet/runtime/commit/756a3c0edbafe83c6f37b16c7680ea457b2e85c9\"><code>756a3c0</code></a> Merge remote-tracking branch 'upstream/release/6.0' into internal/release/6.0</li>\n<li><a href=\"https://github.com/dotnet/runtime/commit/479322e221506aada3bc0a983a1246807a5819e3\"><code>479322e</code></a> Merge in 'release/6.0' changes</li>\n<li><a href=\"https://github.com/dotnet/runtime/commit/f35d5b02ee6b702b982c0fde5a3b382341bb05e7\"><code>f35d5b0</code></a> Merge in 'release/6.0' changes</li>\n<li><a href=\"https://github.com/dotnet/runtime/commit/c1e9122f0c3202545aee28243c18b0f33c5c12d9\"><code>c1e9122</code></a> [release/6.0] Disable native ports package validation (<a href=\"https://github-redirect.dependabot.com/dotnet/runtime/issues/61697\">#61697</a>)</li>\n<li><a href=\"https://github.com/dotnet/runtime/commit/c91170a7ae2d8529541ad846bde1a8a563429bd8\"><code>c91170a</code></a> HostFactoryResolver - Increase default timeout and add env var option (<a href=\"https://github-redirect.dependabot.com/dotnet/runtime/issues/61688\">#61688</a>)</li>\n<li><a href=\"https://github.com/dotnet/runtime/commit/32a62c9ff81c706c609d39b346cebe1c6825757e\"><code>32a62c9</code></a> Merge in 'release/6.0' changes</li>\n<li><a href=\"https://github.com/dotnet/runtime/commit/1aaf3bf3a17241438d9ad615304ab194be573949\"><code>1aaf3bf</code></a> [release/6.0] Disable activation host tests that fail with a 6.0 RC2 or newer...</li>\n<li>Additional commits viewable in <a href=\"https://github.com/dotnet/runtime/compare/v6.0.0...v6.0.1\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\n[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=Microsoft.Extensions.DependencyInjection&package-manager=nuget&previous-version=6.0.0&new-version=6.0.1)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-10-17T12:58:35Z",
          "tree_id": "8198c77c1a1411f915e662a745f258be1c7b2772",
          "url": "https://github.com/aws/jsii/commit/5d5e9216438c32dc279d578c8a7f1dd3a2134fdf"
        },
        "date": 1666015589361,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 96069.66250669998,
            "unit": "milliseconds",
            "range": 7629031.561627778,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 96069.66250669998 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 72987.64245245002,
            "unit": "milliseconds",
            "range": 1805292.3226772964,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 72987.64245245002 milliseconds over 20 runs"
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
          "id": "e6f497b15848f8a6a55a66c5e4b7291ca98c1b59",
          "message": "chore(deps-dev): Update mkdocs requirement from ~=1.4.0 to ~=1.4.1 in /gh-pages (#3804)\n\nUpdates the requirements on [mkdocs](https://github.com/mkdocs/mkdocs) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/mkdocs/mkdocs/releases\">mkdocs's releases</a>.</em></p>\n<blockquote>\n<h2>1.4.1</h2>\n<ul>\n<li>\n<p>Support theme-namespaced plugin loading (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/2998\">#2998</a>)</p>\n<p>Plugins' entry points can be named as 'sometheme/someplugin'. That will have the following outcome:</p>\n<ul>\n<li>If the current theme is 'sometheme', the plugin 'sometheme/someplugin' will always be preferred over 'someplugin'.</li>\n<li>If the current theme <em>isn't</em> 'sometheme', the only way to use this plugin is by specifying <code>plugins: [sometheme/someplugin]</code>.</li>\n</ul>\n<p>One can also specify <code>plugins: ['/someplugin']</code> instead of <code>plugins: ['someplugin']</code> to definitely avoid the theme-namespaced plugin.</p>\n</li>\n<li>\n<p>Bugfix: <code>mkdocs serve</code> will work correctly with non-ASCII paths and redirects (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/3001\">#3001</a>)</p>\n</li>\n<li>\n<p>Windows: 'colorama' is now a dependency of MkDocs, to ensure colorful log output (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/2987\">#2987</a>)</p>\n</li>\n<li>\n<p>Plugin-related config options have more reliable validation and error reporting (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/2997\">#2997</a>)</p>\n</li>\n<li>\n<p>Translation sub-commands of <code>setup.py</code> were completely dropped. See documentation <a href=\"https://www.mkdocs.org/about/contributing/#submitting-changes-to-the-builtin-themes\">[1]</a> <a href=\"https://www.mkdocs.org/dev-guide/translations/#updating-the-translation-catalogs\">[2]</a> for their new replacements (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/2990\">#2990</a>)</p>\n</li>\n<li>\n<p>The <a href=\"https://pypi.org/project/mkdocs/#files\">'mkdocs' package</a> (wheel and source) is now produced by Hatch build system and pyproject.toml instead of setup.py (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/2988\">#2988</a>)</p>\n</li>\n</ul>\n<p>Other small improvements; see <a href=\"https://github.com/mkdocs/mkdocs/compare/1.4.0...1.4.1\">commit log</a>.</p>\n</blockquote>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/aa9eabea1a474ddaf817bbdca8bada7cec61aa11\"><code>aa9eabe</code></a> Release 1.4.1 (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/3004\">#3004</a>)</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/79fa445717d059071f09c10418eb531992e05027\"><code>79fa445</code></a> URL-encode paths when serving a redirect (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/3001\">#3001</a>)</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/64c42a69430cf4b2a3d021e4cbc43bf5b1dd5354\"><code>64c42a6</code></a> Fix tests for previous commit</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/6b7d0a55e094259dbd6d84c88721f43ed1869394\"><code>6b7d0a5</code></a> Prevent a confusing stack trace when theme config fails validation</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/6fca6b59a29c07b7106d3c2ec58b7a3c136b09d8\"><code>6fca6b5</code></a> Support theme-namespaced plugin loading (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/2998\">#2998</a>)</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/568e63ec3f55d8764dee9917b7060c5380416be7\"><code>568e63e</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/2997\">#2997</a> from mkdocs/plugconf</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/aaf819f183fec9f2bda14449ad9fc875ad830e45\"><code>aaf819f</code></a> Better guard an edge case in plugin config</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/b964e05372b04a557663f5a963c1c772f8b0f4c6\"><code>b964e05</code></a> Refactor <code>load_plugin</code> usage</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/9ada9bf96918153fd6e28eee5292e63040f57d23\"><code>9ada9bf</code></a> Also tighten warnings of plugin configs</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/6b4d20e1eb922e010617ee65f48dc470a82a3584\"><code>6b4d20e</code></a> Refactor plugin_cache usage to avoid nested exception</li>\n<li>Additional commits viewable in <a href=\"https://github.com/mkdocs/mkdocs/compare/1.4.0...1.4.1\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-10-17T14:22:54Z",
          "tree_id": "24841fd1ab9f0888a2466d8ba6c69b7a4ae1e07d",
          "url": "https://github.com/aws/jsii/commit/e6f497b15848f8a6a55a66c5e4b7291ca98c1b59"
        },
        "date": 1666019601122,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 69497.31916295002,
            "unit": "milliseconds",
            "range": 132568.1189311519,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 69497.31916295002 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 51143.192391350014,
            "unit": "milliseconds",
            "range": 175427.51478696777,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 51143.192391350014 milliseconds over 20 runs"
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
          "id": "e6f497b15848f8a6a55a66c5e4b7291ca98c1b59",
          "message": "chore(deps-dev): Update mkdocs requirement from ~=1.4.0 to ~=1.4.1 in /gh-pages (#3804)\n\nUpdates the requirements on [mkdocs](https://github.com/mkdocs/mkdocs) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/mkdocs/mkdocs/releases\">mkdocs's releases</a>.</em></p>\n<blockquote>\n<h2>1.4.1</h2>\n<ul>\n<li>\n<p>Support theme-namespaced plugin loading (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/2998\">#2998</a>)</p>\n<p>Plugins' entry points can be named as 'sometheme/someplugin'. That will have the following outcome:</p>\n<ul>\n<li>If the current theme is 'sometheme', the plugin 'sometheme/someplugin' will always be preferred over 'someplugin'.</li>\n<li>If the current theme <em>isn't</em> 'sometheme', the only way to use this plugin is by specifying <code>plugins: [sometheme/someplugin]</code>.</li>\n</ul>\n<p>One can also specify <code>plugins: ['/someplugin']</code> instead of <code>plugins: ['someplugin']</code> to definitely avoid the theme-namespaced plugin.</p>\n</li>\n<li>\n<p>Bugfix: <code>mkdocs serve</code> will work correctly with non-ASCII paths and redirects (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/3001\">#3001</a>)</p>\n</li>\n<li>\n<p>Windows: 'colorama' is now a dependency of MkDocs, to ensure colorful log output (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/2987\">#2987</a>)</p>\n</li>\n<li>\n<p>Plugin-related config options have more reliable validation and error reporting (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/2997\">#2997</a>)</p>\n</li>\n<li>\n<p>Translation sub-commands of <code>setup.py</code> were completely dropped. See documentation <a href=\"https://www.mkdocs.org/about/contributing/#submitting-changes-to-the-builtin-themes\">[1]</a> <a href=\"https://www.mkdocs.org/dev-guide/translations/#updating-the-translation-catalogs\">[2]</a> for their new replacements (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/2990\">#2990</a>)</p>\n</li>\n<li>\n<p>The <a href=\"https://pypi.org/project/mkdocs/#files\">'mkdocs' package</a> (wheel and source) is now produced by Hatch build system and pyproject.toml instead of setup.py (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/2988\">#2988</a>)</p>\n</li>\n</ul>\n<p>Other small improvements; see <a href=\"https://github.com/mkdocs/mkdocs/compare/1.4.0...1.4.1\">commit log</a>.</p>\n</blockquote>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/aa9eabea1a474ddaf817bbdca8bada7cec61aa11\"><code>aa9eabe</code></a> Release 1.4.1 (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/3004\">#3004</a>)</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/79fa445717d059071f09c10418eb531992e05027\"><code>79fa445</code></a> URL-encode paths when serving a redirect (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/3001\">#3001</a>)</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/64c42a69430cf4b2a3d021e4cbc43bf5b1dd5354\"><code>64c42a6</code></a> Fix tests for previous commit</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/6b7d0a55e094259dbd6d84c88721f43ed1869394\"><code>6b7d0a5</code></a> Prevent a confusing stack trace when theme config fails validation</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/6fca6b59a29c07b7106d3c2ec58b7a3c136b09d8\"><code>6fca6b5</code></a> Support theme-namespaced plugin loading (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/2998\">#2998</a>)</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/568e63ec3f55d8764dee9917b7060c5380416be7\"><code>568e63e</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/2997\">#2997</a> from mkdocs/plugconf</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/aaf819f183fec9f2bda14449ad9fc875ad830e45\"><code>aaf819f</code></a> Better guard an edge case in plugin config</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/b964e05372b04a557663f5a963c1c772f8b0f4c6\"><code>b964e05</code></a> Refactor <code>load_plugin</code> usage</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/9ada9bf96918153fd6e28eee5292e63040f57d23\"><code>9ada9bf</code></a> Also tighten warnings of plugin configs</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/6b4d20e1eb922e010617ee65f48dc470a82a3584\"><code>6b4d20e</code></a> Refactor plugin_cache usage to avoid nested exception</li>\n<li>Additional commits viewable in <a href=\"https://github.com/mkdocs/mkdocs/compare/1.4.0...1.4.1\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-10-17T14:22:54Z",
          "tree_id": "24841fd1ab9f0888a2466d8ba6c69b7a4ae1e07d",
          "url": "https://github.com/aws/jsii/commit/e6f497b15848f8a6a55a66c5e4b7291ca98c1b59"
        },
        "date": 1666109660641,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 72176.96359409997,
            "unit": "milliseconds",
            "range": 349699.4733774592,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 72176.96359409997 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 53465.97214695,
            "unit": "milliseconds",
            "range": 443413.95562441676,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 53465.97214695 milliseconds over 20 runs"
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
          "id": "6a8606a2835e23752ed4235d16f2fd2c62bc2246",
          "message": "chore: npm-check-updates && yarn upgrade (#3799)\n\nRan npm-check-updates and yarn upgrade to keep the `yarn.lock` file up-to-date.",
          "timestamp": "2022-10-18T20:55:12Z",
          "tree_id": "cf181bc1a5061e66e8a9d69a067f4e3805784e9f",
          "url": "https://github.com/aws/jsii/commit/6a8606a2835e23752ed4235d16f2fd2c62bc2246"
        },
        "date": 1666129817739,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 71547.17284635,
            "unit": "milliseconds",
            "range": 297160.90317424515,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 71547.17284635 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 52414.752350250004,
            "unit": "milliseconds",
            "range": 324632.7872429322,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 52414.752350250004 milliseconds over 20 runs"
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
          "id": "6a8606a2835e23752ed4235d16f2fd2c62bc2246",
          "message": "chore: npm-check-updates && yarn upgrade (#3799)\n\nRan npm-check-updates and yarn upgrade to keep the `yarn.lock` file up-to-date.",
          "timestamp": "2022-10-18T20:55:12Z",
          "tree_id": "cf181bc1a5061e66e8a9d69a067f4e3805784e9f",
          "url": "https://github.com/aws/jsii/commit/6a8606a2835e23752ed4235d16f2fd2c62bc2246"
        },
        "date": 1666132975283,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 67751.2736025,
            "unit": "milliseconds",
            "range": 109509.31662638679,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 67751.2736025 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 50174.09460809997,
            "unit": "milliseconds",
            "range": 192101.0326027809,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 50174.09460809997 milliseconds over 20 runs"
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
          "id": "ecac06eed55ea0626f2191b94c530619b753b4a4",
          "message": "chore: npm-check-updates && yarn upgrade (#3805)\n\nRan npm-check-updates and yarn upgrade to keep the `yarn.lock` file up-to-date.",
          "timestamp": "2022-10-19T15:13:39Z",
          "tree_id": "94d0b0f532e89379d2af9d40fd3a60c950471441",
          "url": "https://github.com/aws/jsii/commit/ecac06eed55ea0626f2191b94c530619b753b4a4"
        },
        "date": 1666195304881,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 59495.57103600004,
            "unit": "milliseconds",
            "range": 3050234.519974066,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 59495.57103600004 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 46138.64337775,
            "unit": "milliseconds",
            "range": 45685.113097014015,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 46138.64337775 milliseconds over 20 runs"
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
          "id": "03c2f6fa06c7e90b3474a7916e05ca082d6d89aa",
          "message": "chore(release): 1.70.0 (#3806)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/bump/1.70.0/CHANGELOG.md)",
          "timestamp": "2022-10-19T16:53:17Z",
          "tree_id": "2530e9a2c7f48175f060a3e2f38b2b06ad8b9109",
          "url": "https://github.com/aws/jsii/commit/03c2f6fa06c7e90b3474a7916e05ca082d6d89aa"
        },
        "date": 1666201287464,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 60377.477952600006,
            "unit": "milliseconds",
            "range": 3068723.4092816813,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 60377.477952600006 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 46295.646322500004,
            "unit": "milliseconds",
            "range": 211110.9162135765,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 46295.646322500004 milliseconds over 20 runs"
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
          "id": "977e81b2bf927d49015f440da4ee2e5e2c2bfa5e",
          "message": "chore(merge-back): 1.70.0 (#3807)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/merge-back/1.70.0/CHANGELOG.md)",
          "timestamp": "2022-10-19T19:20:33Z",
          "tree_id": "2530e9a2c7f48175f060a3e2f38b2b06ad8b9109",
          "url": "https://github.com/aws/jsii/commit/977e81b2bf927d49015f440da4ee2e5e2c2bfa5e"
        },
        "date": 1666209988300,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 59674.77204290002,
            "unit": "milliseconds",
            "range": 3538341.653382531,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 59674.77204290002 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 46425.62426944998,
            "unit": "milliseconds",
            "range": 193039.79983155185,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 46425.62426944998 milliseconds over 20 runs"
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
          "id": "12ea38ef6123ff2293c7d15f4b318c79e9ccddbe",
          "message": "fix(jsii-diff): does not check types in submodules (#3808)\n\n`jsii-diff` was ignoring types in submodules, meaning no compatibility checks were being done on CDK v2 at all anymore.\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-10-20T14:10:36Z",
          "tree_id": "75f1fe592922367cd59d42f23bf1254f1b4817f7",
          "url": "https://github.com/aws/jsii/commit/12ea38ef6123ff2293c7d15f4b318c79e9ccddbe"
        },
        "date": 1666278221665,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 68054.06037209998,
            "unit": "milliseconds",
            "range": 2468180.2636050116,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 68054.06037209998 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 51524.37694044998,
            "unit": "milliseconds",
            "range": 511489.3448345531,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 51524.37694044998 milliseconds over 20 runs"
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
          "id": "a9c375b86968c65b4a829b16243444b35b0c9250",
          "message": "chore(deps): Update pip requirement from ~=22.2 to ~=22.3 in /packages/@jsii/python-runtime (#3803)\n\nUpdates the requirements on [pip](https://github.com/pypa/pip) to permit the latest version.\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/pypa/pip/blob/main/NEWS.rst\">pip's changelog</a>.</em></p>\n<blockquote>\n<h1>22.3 (2022-10-15)</h1>\n<h2>Deprecations and Removals</h2>\n<ul>\n<li>Deprecate <code>--install-options</code> which forces pip to use the deprecated <code>install</code>\ncommand of <code>setuptools</code>. (<code>[#11358](https://github.com/pypa/pip/issues/11358) &lt;https://github.com/pypa/pip/issues/11358&gt;</code>_)</li>\n<li>Deprecate installation with 'setup.py install' when no-binary is enabled for\nsource distributions without 'pyproject.toml'. (<code>[#11452](https://github.com/pypa/pip/issues/11452) &lt;https://github.com/pypa/pip/issues/11452&gt;</code>_)</li>\n<li>Deprecate ```--no-binary`` disabling the wheel cache. (<code>[#11454](https://github.com/pypa/pip/issues/11454) &lt;https://github.com/pypa/pip/issues/11454&gt;</code>_)</li>\n<li>Remove <code>--use-feature=2020-resolver</code> opt-in flag. This was supposed to be removed in 21.0, but missed during that release cycle. (<code>[#11493](https://github.com/pypa/pip/issues/11493) &lt;https://github.com/pypa/pip/issues/11493&gt;</code>_)</li>\n<li>Deprecate installation with 'setup.py install' when the 'wheel' package is absent for\nsource distributions without 'pyproject.toml'. (<code>[#8559](https://github.com/pypa/pip/issues/8559) &lt;https://github.com/pypa/pip/issues/8559&gt;</code>_)</li>\n<li>Remove the ability to use <code>pip list --outdated</code> in combination with <code>--format=freeze</code>. (<code>[#9789](https://github.com/pypa/pip/issues/9789) &lt;https://github.com/pypa/pip/issues/9789&gt;</code>_)</li>\n</ul>\n<h2>Features</h2>\n<ul>\n<li>Use <code>shell=True</code> for opening the editor with <code>pip config edit</code>. (<code>[#10716](https://github.com/pypa/pip/issues/10716) &lt;https://github.com/pypa/pip/issues/10716&gt;</code>_)</li>\n<li>Use the <code>data-dist-info-metadata</code> attribute from :pep:<code>658</code> to resolve distribution metadata without downloading the dist yet. (<code>[#11111](https://github.com/pypa/pip/issues/11111) &lt;https://github.com/pypa/pip/issues/11111&gt;</code>_)</li>\n<li>Add an option to run the test suite with pip built as a zipapp. (<code>[#11250](https://github.com/pypa/pip/issues/11250) &lt;https://github.com/pypa/pip/issues/11250&gt;</code>_)</li>\n<li>Add a <code>--python</code> option to allow pip to manage Python environments other\nthan the one pip is installed in. (<code>[#11320](https://github.com/pypa/pip/issues/11320) &lt;https://github.com/pypa/pip/issues/11320&gt;</code>_)</li>\n<li>Document the new (experimental) zipapp distribution of pip. (<code>[#11459](https://github.com/pypa/pip/issues/11459) &lt;https://github.com/pypa/pip/issues/11459&gt;</code>_)</li>\n<li>Use the much faster 'bzr co --lightweight' to obtain a copy of a Bazaar tree. (<code>[#5444](https://github.com/pypa/pip/issues/5444) &lt;https://github.com/pypa/pip/issues/5444&gt;</code>_)</li>\n</ul>\n<h2>Bug Fixes</h2>\n<ul>\n<li>Fix <code>--no-index</code> when <code>--index-url</code> or <code>--extra-index-url</code> is specified\ninside a requirements file. (<code>[#11276](https://github.com/pypa/pip/issues/11276) &lt;https://github.com/pypa/pip/issues/11276&gt;</code>_)</li>\n<li>Ensure that the candidate <code>pip</code> executable exists, when checking for a new version of pip. (<code>[#11309](https://github.com/pypa/pip/issues/11309) &lt;https://github.com/pypa/pip/issues/11309&gt;</code>_)</li>\n<li>Ignore distributions with invalid <code>Name</code> in metadata instead of crashing, when\nusing the <code>importlib.metadata</code> backend. (<code>[#11352](https://github.com/pypa/pip/issues/11352) &lt;https://github.com/pypa/pip/issues/11352&gt;</code>_)</li>\n<li>Raise RequirementsFileParseError when parsing malformed requirements options that can't be sucessfully parsed by shlex. (<code>[#11491](https://github.com/pypa/pip/issues/11491) &lt;https://github.com/pypa/pip/issues/11491&gt;</code>_)</li>\n<li>Fix build environment isolation on some system Pythons. (<code>[#6264](https://github.com/pypa/pip/issues/6264) &lt;https://github.com/pypa/pip/issues/6264&gt;</code>_)</li>\n</ul>\n<h2>Vendored Libraries</h2>\n<ul>\n<li>Upgrade certifi to 2022.9.24</li>\n<li>Upgrade distlib to 0.3.6</li>\n<li>Upgrade idna to 3.4</li>\n<li>Upgrade pep517 to 0.13.0</li>\n<li>Upgrade pygments to 2.13.0</li>\n<li>Upgrade tenacity to 8.1.0</li>\n<li>Upgrade typing_extensions to 4.4.0</li>\n<li>Upgrade urllib3 to 1.26.12</li>\n</ul>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/pypa/pip/commit/0a76da3a94130fad58b086e331c3d3e1b02a89eb\"><code>0a76da3</code></a> Bump for release</li>\n<li><a href=\"https://github.com/pypa/pip/commit/25638287f8b8bd571a10c4f5ae1b7f4eae454dcc\"><code>2563828</code></a> Update AUTHORS.txt</li>\n<li><a href=\"https://github.com/pypa/pip/commit/e86f27fe4ee3fe45fc0fcd2372f71d39d1d013c1\"><code>e86f27f</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/pypa/pip/issues/11493\">#11493</a> from pradyunsg/remove-2020-resolver-opt-in</li>\n<li><a href=\"https://github.com/pypa/pip/commit/1fcc3ce4b531ac6bc80c1d102d4ef9610074e195\"><code>1fcc3ce</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/pypa/pip/issues/11514\">#11514</a> from pradyunsg/certifi-update</li>\n<li><a href=\"https://github.com/pypa/pip/commit/65c23fa99d19af8ebd375e7129213794dce4b4b2\"><code>65c23fa</code></a> Unnormalise the certifi version</li>\n<li><a href=\"https://github.com/pypa/pip/commit/739158cc80f138dbed9e426f3408811acef2d993\"><code>739158c</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/pypa/pip/issues/11516\">#11516</a> from pradyunsg/check-manifest</li>\n<li><a href=\"https://github.com/pypa/pip/commit/4e48bbc31cf34b1b4ccd100a787d1204ddb8866b\"><code>4e48bbc</code></a> Move check-manifest to a CI check</li>\n<li><a href=\"https://github.com/pypa/pip/commit/1b7e5ef34f926f33fa7932239229220dd65eb7a6\"><code>1b7e5ef</code></a> Upgrade certifi to 2022.9.24</li>\n<li><a href=\"https://github.com/pypa/pip/commit/2a0552ac61ee26df04e08e21943a1e36aa880db1\"><code>2a0552a</code></a> Replace complex certifi patch with a more targetted requests patch</li>\n<li><a href=\"https://github.com/pypa/pip/commit/eb906997da97bbbd1f74127297d7ce9a54a6a2a0\"><code>eb90699</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/pypa/pip/issues/11502\">#11502</a> from pradyunsg/vendoring-updates</li>\n<li>Additional commits viewable in <a href=\"https://github.com/pypa/pip/compare/22.2...22.3\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-10-20T15:21:02Z",
          "tree_id": "48a6bb429d8f9b9ee4424349ef21fc4b85b1b444",
          "url": "https://github.com/aws/jsii/commit/a9c375b86968c65b4a829b16243444b35b0c9250"
        },
        "date": 1666282459680,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 71277.59012699996,
            "unit": "milliseconds",
            "range": 1599058.6154930436,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 71277.59012699996 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 52486.02212615003,
            "unit": "milliseconds",
            "range": 672344.8889900292,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 52486.02212615003 milliseconds over 20 runs"
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
          "id": "5d9b703c3675a1741257c020ac69740885f25a37",
          "message": "chore(deps): Bump golang.org/x/tools from 0.1.12 to 0.2.0 in /packages/@jsii/go-runtime-test/project (#3810)\n\nBumps [golang.org/x/tools](https://github.com/golang/tools) from 0.1.12 to 0.2.0.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/golang/tools/releases\">golang.org/x/tools's releases</a>.</em></p>\n<blockquote>\n<h2>gopls/v0.2.0</h2>\n<ul>\n<li>Many improvements to autocompletion. In particular, support for completions of array, slice, map, and function literals (<a href=\"https://github.com/muirdm\"><code>@​muirdm</code></a>).</li>\n<li>A new diff algorithm (<a href=\"https://github.com/sergi/go-diff\">github.com/sergi/go-diff</a>) that improves handling of line endings on different operating systems (<a href=\"https://github.com/ianthehat\"><code>@​ianthehat</code></a>).</li>\n<li>Improved caching and memory usage (<a href=\"https://github.com/stamblerre\"><code>@​stamblerre</code></a>).</li>\n<li>Command-line support for links, suggested fixes, and imports (<a href=\"https://github.com/kalmanb\"><code>@​kalmanb</code></a>).</li>\n<li>Command-line support for references, signature, and symbols (<a href=\"https://github.com/rentziass\"><code>@​rentziass</code></a>).</li>\n<li>Command-line support for rename (<a href=\"https://github.com/hartzell\"><code>@​hartzell</code></a>).</li>\n</ul>\n<h3>Opt-in:</h3>\n<ul>\n<li>Get diagnostics from <a href=\"https://staticcheck.io/\">staticcheck</a> by configuring <code>&quot;staticcheck&quot;: true</code> in your gopls settings (<a href=\"https://github.com/ianthehat\"><code>@​ianthehat</code></a>).</li>\n<li>Get autocompletion of unimported packages and symbols by configuring <code>&quot;completeUnimported&quot;: true</code> in your gopls settings (<a href=\"https://github.com/heschik\"><code>@​heschik</code></a>).</li>\n</ul>\n</blockquote>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/golang/tools/commit/f112c43328372460f7ac5bc951711609e22b01cc\"><code>f112c43</code></a> go.mod: update golang.org/x dependencies</li>\n<li><a href=\"https://github.com/golang/tools/commit/207f456f2d4057372e2612f699c66598e5cdd5f4\"><code>207f456</code></a> go/internal/gcimporter: bump version number in skew check</li>\n<li><a href=\"https://github.com/golang/tools/commit/65196caeed0001ac363270d53feaf62d9b90873f\"><code>65196ca</code></a> gopls/README.md: fix wording around supported Go versions</li>\n<li><a href=\"https://github.com/golang/tools/commit/61280309af36ad3b716dc3d4a1703b362ff5fc35\"><code>6128030</code></a> gopls/internal: support renaming packages with int. test variants</li>\n<li><a href=\"https://github.com/golang/tools/commit/649df2ea1a9b6e73d1fd5c4dacd95a1be74683d5\"><code>649df2e</code></a> go.mod: mark as requiring -compat 1.16</li>\n<li><a href=\"https://github.com/golang/tools/commit/91311ab3b8fbb39d8d1df146082b6313ec6e2d55\"><code>91311ab</code></a> gopls/internal/lsp/cache: better import path hygiene</li>\n<li><a href=\"https://github.com/golang/tools/commit/9eda97bc2d7c2fa6ed3f23c9511a6cdeb174b4c8\"><code>9eda97b</code></a> go/analysis: enable a test that applies after go list behavior change</li>\n<li><a href=\"https://github.com/golang/tools/commit/b50d7ba6eeb13c2ded0ec2d8535be9170c065059\"><code>b50d7ba</code></a> gopls: minor cleanup of standalone package support</li>\n<li><a href=\"https://github.com/golang/tools/commit/502b93c33e3e519598e1a93f25ea8e4304def4de\"><code>502b93c</code></a> gopls/internal/lsp: tolerate missing end position in RelatedInformation</li>\n<li><a href=\"https://github.com/golang/tools/commit/d67c3ada0900abbc8e2bf23bb224ebf294fa2026\"><code>d67c3ad</code></a> internal/imports: repair warnings from default analyzers</li>\n<li>Additional commits viewable in <a href=\"https://github.com/golang/tools/compare/v0.1.12...v0.2.0\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\n[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=golang.org/x/tools&package-manager=go_modules&previous-version=0.1.12&new-version=0.2.0)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-10-24T16:20:49Z",
          "tree_id": "e4aad378c0bbc8126b0a2df68b74226488996403",
          "url": "https://github.com/aws/jsii/commit/5d9b703c3675a1741257c020ac69740885f25a37"
        },
        "date": 1666632839741,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 101903.9198453,
            "unit": "milliseconds",
            "range": 6971829.940872076,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 101903.9198453 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 75977.19630439996,
            "unit": "milliseconds",
            "range": 1647915.5676482553,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 75977.19630439996 milliseconds over 20 runs"
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
          "id": "d9e03596d73e6da8e06a8892aaf733ec186e0608",
          "message": "chore(deps): Bump golang.org/x/tools from 0.1.12 to 0.2.0 in /packages/@jsii/go-runtime/jsii-runtime-go (#3809)\n\nBumps [golang.org/x/tools](https://github.com/golang/tools) from 0.1.12 to 0.2.0.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/golang/tools/releases\">golang.org/x/tools's releases</a>.</em></p>\n<blockquote>\n<h2>gopls/v0.2.0</h2>\n<ul>\n<li>Many improvements to autocompletion. In particular, support for completions of array, slice, map, and function literals (<a href=\"https://github.com/muirdm\"><code>@​muirdm</code></a>).</li>\n<li>A new diff algorithm (<a href=\"https://github.com/sergi/go-diff\">github.com/sergi/go-diff</a>) that improves handling of line endings on different operating systems (<a href=\"https://github.com/ianthehat\"><code>@​ianthehat</code></a>).</li>\n<li>Improved caching and memory usage (<a href=\"https://github.com/stamblerre\"><code>@​stamblerre</code></a>).</li>\n<li>Command-line support for links, suggested fixes, and imports (<a href=\"https://github.com/kalmanb\"><code>@​kalmanb</code></a>).</li>\n<li>Command-line support for references, signature, and symbols (<a href=\"https://github.com/rentziass\"><code>@​rentziass</code></a>).</li>\n<li>Command-line support for rename (<a href=\"https://github.com/hartzell\"><code>@​hartzell</code></a>).</li>\n</ul>\n<h3>Opt-in:</h3>\n<ul>\n<li>Get diagnostics from <a href=\"https://staticcheck.io/\">staticcheck</a> by configuring <code>&quot;staticcheck&quot;: true</code> in your gopls settings (<a href=\"https://github.com/ianthehat\"><code>@​ianthehat</code></a>).</li>\n<li>Get autocompletion of unimported packages and symbols by configuring <code>&quot;completeUnimported&quot;: true</code> in your gopls settings (<a href=\"https://github.com/heschik\"><code>@​heschik</code></a>).</li>\n</ul>\n</blockquote>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/golang/tools/commit/f112c43328372460f7ac5bc951711609e22b01cc\"><code>f112c43</code></a> go.mod: update golang.org/x dependencies</li>\n<li><a href=\"https://github.com/golang/tools/commit/207f456f2d4057372e2612f699c66598e5cdd5f4\"><code>207f456</code></a> go/internal/gcimporter: bump version number in skew check</li>\n<li><a href=\"https://github.com/golang/tools/commit/65196caeed0001ac363270d53feaf62d9b90873f\"><code>65196ca</code></a> gopls/README.md: fix wording around supported Go versions</li>\n<li><a href=\"https://github.com/golang/tools/commit/61280309af36ad3b716dc3d4a1703b362ff5fc35\"><code>6128030</code></a> gopls/internal: support renaming packages with int. test variants</li>\n<li><a href=\"https://github.com/golang/tools/commit/649df2ea1a9b6e73d1fd5c4dacd95a1be74683d5\"><code>649df2e</code></a> go.mod: mark as requiring -compat 1.16</li>\n<li><a href=\"https://github.com/golang/tools/commit/91311ab3b8fbb39d8d1df146082b6313ec6e2d55\"><code>91311ab</code></a> gopls/internal/lsp/cache: better import path hygiene</li>\n<li><a href=\"https://github.com/golang/tools/commit/9eda97bc2d7c2fa6ed3f23c9511a6cdeb174b4c8\"><code>9eda97b</code></a> go/analysis: enable a test that applies after go list behavior change</li>\n<li><a href=\"https://github.com/golang/tools/commit/b50d7ba6eeb13c2ded0ec2d8535be9170c065059\"><code>b50d7ba</code></a> gopls: minor cleanup of standalone package support</li>\n<li><a href=\"https://github.com/golang/tools/commit/502b93c33e3e519598e1a93f25ea8e4304def4de\"><code>502b93c</code></a> gopls/internal/lsp: tolerate missing end position in RelatedInformation</li>\n<li><a href=\"https://github.com/golang/tools/commit/d67c3ada0900abbc8e2bf23bb224ebf294fa2026\"><code>d67c3ad</code></a> internal/imports: repair warnings from default analyzers</li>\n<li>Additional commits viewable in <a href=\"https://github.com/golang/tools/compare/v0.1.12...v0.2.0\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\n[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=golang.org/x/tools&package-manager=go_modules&previous-version=0.1.12&new-version=0.2.0)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-10-24T17:30:25Z",
          "tree_id": "16b02293864a0acdcc2a0d3ec841b6d5b6510261",
          "url": "https://github.com/aws/jsii/commit/d9e03596d73e6da8e06a8892aaf733ec186e0608"
        },
        "date": 1666635811566,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 73668.69841135,
            "unit": "milliseconds",
            "range": 132922.85660458266,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 73668.69841135 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 53546.8535193,
            "unit": "milliseconds",
            "range": 687732.4224656799,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 53546.8535193 milliseconds over 20 runs"
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
          "id": "b7141e3357c79e8c740e830e96f9b20c3f514b7e",
          "message": "chore(deps): Bump github.com/stretchr/testify from 1.8.0 to 1.8.1 in /packages/@jsii/go-runtime-test/project (#3813)\n\nBumps [github.com/stretchr/testify](https://github.com/stretchr/testify) from 1.8.0 to 1.8.1.\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/stretchr/testify/commit/b747d7c5f853d017ddbc5e623d026d7fc2770a58\"><code>b747d7c</code></a> Bump github.com/stretchr/objx from 0.4.0 to 0.5.0 (<a href=\"https://github-redirect.dependabot.com/stretchr/testify/issues/1283\">#1283</a>)</li>\n<li>See full diff in <a href=\"https://github.com/stretchr/testify/compare/v1.8.0...v1.8.1\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\n[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=github.com/stretchr/testify&package-manager=go_modules&previous-version=1.8.0&new-version=1.8.1)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-10-24T18:42:58Z",
          "tree_id": "b42312c7a2be1ce0406865ead23fdb07713cacee",
          "url": "https://github.com/aws/jsii/commit/b7141e3357c79e8c740e830e96f9b20c3f514b7e"
        },
        "date": 1666640579029,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 82472.24102190004,
            "unit": "milliseconds",
            "range": 1499263.13139219,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 82472.24102190004 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 61429.70328995,
            "unit": "milliseconds",
            "range": 730972.3465767562,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 61429.70328995 milliseconds over 20 runs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "43035978+corymhall@users.noreply.github.com",
            "name": "Cory Hall",
            "username": "corymhall"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "fb278c0fa243ed58266e765f1ab4f5576a1edaf2",
          "message": "chore: fix auto-approve workflow (#3814)\n\nThe condition could only pass for `pull_request` events. For most auto-approve PRs though this workflow would be triggered by `labeled` event, which requires a different condition.\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-10-24T19:41:48Z",
          "tree_id": "79a7bc61d85e981f0d1ceea67f4f4fe46ef74377",
          "url": "https://github.com/aws/jsii/commit/fb278c0fa243ed58266e765f1ab4f5576a1edaf2"
        },
        "date": 1666643521063,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 68406.18974029997,
            "unit": "milliseconds",
            "range": 363144.1556386238,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 68406.18974029997 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 50258.46544419999,
            "unit": "milliseconds",
            "range": 212890.38933709744,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 50258.46544419999 milliseconds over 20 runs"
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
          "id": "e27ba71634df8a6f618673b7f683cceab2fd454c",
          "message": "chore(deps): Bump github.com/stretchr/testify from 1.8.0 to 1.8.1 in /packages/@jsii/go-runtime/jsii-runtime-go (#3812)\n\nBumps [github.com/stretchr/testify](https://github.com/stretchr/testify) from 1.8.0 to 1.8.1.\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/stretchr/testify/commit/b747d7c5f853d017ddbc5e623d026d7fc2770a58\"><code>b747d7c</code></a> Bump github.com/stretchr/objx from 0.4.0 to 0.5.0 (<a href=\"https://github-redirect.dependabot.com/stretchr/testify/issues/1283\">#1283</a>)</li>\n<li>See full diff in <a href=\"https://github.com/stretchr/testify/compare/v1.8.0...v1.8.1\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\n[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=github.com/stretchr/testify&package-manager=go_modules&previous-version=1.8.0&new-version=1.8.1)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-10-24T21:19:35Z",
          "tree_id": "77bc5b24ef621b0fdcdde9a2741ebd7abbd5ae52",
          "url": "https://github.com/aws/jsii/commit/e27ba71634df8a6f618673b7f683cceab2fd454c"
        },
        "date": 1666649894907,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 81146.6827886,
            "unit": "milliseconds",
            "range": 588455.9342173019,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 81146.6827886 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 60272.796493949994,
            "unit": "milliseconds",
            "range": 518612.2192111031,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 60272.796493949994 milliseconds over 20 runs"
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
          "id": "f91eeeead018f5fed1bb431df89dcbd39d07d99a",
          "message": "chore(deps-dev): Update mkdocs-material requirement from ~=8.5.6 to ~=8.5.7 in /gh-pages (#3811)\n\nUpdates the requirements on [mkdocs-material](https://github.com/squidfunk/mkdocs-material) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/releases\">mkdocs-material's releases</a>.</em></p>\n<blockquote>\n<h2>mkdocs-material-8.5.7</h2>\n<ul>\n<li>Deprecated additional admonition qualifiers to reduce size of CSS</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4511\">#4511</a>: Search boost does not apply to sections</li>\n</ul>\n</blockquote>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/blob/master/CHANGELOG\">mkdocs-material's changelog</a>.</em></p>\n<blockquote>\n<p>mkdocs-material-8.5.7+insiders-4.26.0 (2022-10-22)</p>\n<ul>\n<li>Improved reporting of configuration errors in tags plugin</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4515\">#4515</a>: Privacy plugin fails when site URL is not defined</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4514\">#4514</a>: Privacy plugin doesn't fetch Google fonts (4.26.0 regression)</li>\n</ul>\n<p>mkdocs-material-8.5.7 (2022-10-22)</p>\n<ul>\n<li>Deprecated additional admonition qualifiers to reduce size of CSS</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4511\">#4511</a>: Search boost does not apply to sections</li>\n</ul>\n<p>mkdocs-material-8.5.6+insiders-4.26.0 (2022-10-18)</p>\n<ul>\n<li>Refactored privacy plugin to prepare for new features</li>\n<li>Added support for rel=noopener links in privacy plugin</li>\n<li>Resolve encoding issues with blog and privacy plugin</li>\n</ul>\n<p>mkdocs-material-8.5.6+insiders-4.25.5 (2022-10-16)</p>\n<ul>\n<li>Updated MkDocs to 1.4.1</li>\n<li>Added namespace prefix to built-in plugins</li>\n<li>Updated content and header partial</li>\n</ul>\n<p>mkdocs-material-8.5.6+insiders-4.25.4 (2022-10-09)</p>\n<ul>\n<li>Fixed other path issues for standalone blogs (4.24.2 regression)</li>\n</ul>\n<p>mkdocs-material-8.5.6+insiders-4.25.3 (2022-10-09)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4457\">#4457</a>: Posts not collected for standalone blog (4.24.2 regression)</li>\n</ul>\n<p>mkdocs-material-8.5.6+insiders-4.25.2 (2022-10-04)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4452\">#4452</a>: Blog and tags plugin crash when specifying slugify function</li>\n</ul>\n<p>mkdocs-material-8.5.6+insiders-4.25.1 (2022-10-03)</p>\n<ul>\n<li>Updated mkdocs-rss-plugin in Dockerfile to fix MkDocs compat errors</li>\n</ul>\n<p>mkdocs-material-8.5.6+insiders-4.25.0 (2022-10-02)</p>\n<ul>\n<li>Added support for navigation subtitles</li>\n<li>Added support for defining an allow list for built-in tags plugin</li>\n<li>Added support for custom slugify functions for built-in tags plugin</li>\n<li>Improved stability of search plugin when using --dirtyreload</li>\n</ul>\n<p>mkdocs-material-8.5.6 (2022-10-02)</p>\n<ul>\n<li>Modernized appearance of admonitions (with fallback, see docs)</li>\n<li>Improved appearance of inline code blocks in admonition titles</li>\n</ul>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/23f12fe7675d2865af06ca5bfe756c5bc2fa92c8\"><code>23f12fe</code></a> Prepare 8.5.7 release</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/922fde070166898cbde561739670e1249423abe2\"><code>922fde0</code></a> Fixed search boost not being applied to document sections</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/f13a5526d024bb646f4dfdb48904a8adea81d026\"><code>f13a552</code></a> Documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/b2f310a2201724ed9292521399fbbb3f417654ed\"><code>b2f310a</code></a> Documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/93daab252d229e6ec2c9fd0a0a88eea4a191d4c3\"><code>93daab2</code></a> Updated Insiders changelog and documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/b8161e01790d02277623dfebf3e6b0c7b2404365\"><code>b8161e0</code></a> Added warning for social plugin when site_url is not defined</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/ed6f0b1b57a379df797b2d9891d33efd4f81cbb5\"><code>ed6f0b1</code></a> Updated Insiders changelog</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/34f563cfd23dbb6d6015f38112a4dc056384a7aa\"><code>34f563c</code></a> Temporarily disabled no-misused-promise check due to ESLint error</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/2b08c42c09c058d01664ff958b807e0abe048fd0\"><code>2b08c42</code></a> Fixed linter errors</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/b0afb7f1dfea2cc8003f7f592bccc095914bf143\"><code>b0afb7f</code></a> Updated dependencies</li>\n<li>Additional commits viewable in <a href=\"https://github.com/squidfunk/mkdocs-material/compare/8.5.6...8.5.7\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-10-24T23:20:13Z",
          "tree_id": "712d054dd10f2dbd319959ed37f4bf5235b31447",
          "url": "https://github.com/aws/jsii/commit/f91eeeead018f5fed1bb431df89dcbd39d07d99a"
        },
        "date": 1666657254546,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 83498.2389389,
            "unit": "milliseconds",
            "range": 998300.472482558,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 83498.2389389 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 62410.341404399995,
            "unit": "milliseconds",
            "range": 277167.80891974346,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 62410.341404399995 milliseconds over 20 runs"
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
          "id": "2dd020991571824504b3a7ebdfaa5b1fb7731a6e",
          "message": "chore: npm-check-updates && yarn upgrade (#3815)\n\nRan npm-check-updates and yarn upgrade to keep the `yarn.lock` file up-to-date.",
          "timestamp": "2022-10-26T15:07:02Z",
          "tree_id": "a6dc265c6a2a071080f9714ac7b0908bbabb7490",
          "url": "https://github.com/aws/jsii/commit/2dd020991571824504b3a7ebdfaa5b1fb7731a6e"
        },
        "date": 1666799866644,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 67030.75053099994,
            "unit": "milliseconds",
            "range": 2337244.500062247,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 67030.75053099994 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 48919.07021639999,
            "unit": "milliseconds",
            "range": 1997935.0114590474,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 48919.07021639999 milliseconds over 20 runs"
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
          "id": "e9d4084d06cd2611e4ff25cc7533f823878d1281",
          "message": "fix(python): type-checking may require incorrect type (#3820)\n\nSince dae724c, Python type-checking\nrelies on a nested stub function as a type annotations source. The\nparameter signature of that stub was copied verbatim from the\nsurrounding function, including any forward type references.\n\nHowever, the forward references can safely be replaced with regular type\nreferences as the module is guaranteed to be fully loaded by the time\nthe stub is created, and using forward-references there results in\n`typeguard` possibly evaluating those in a different context than the\none where the surrounding function was defined. The consequence of this\nis that multiple different foward references by the same name may be\nincorrectly treated as referring to the same type, despite coming from\ndifferent modules.\n\nThis is fixed by turning forward type references in the stub with\nregular type references (in other words, removing any `\"` from the\nparameter signature of the stub), which lets the type be resolved from\nthe local definition context instead of the final runtime context in\nwhich the function is called.\n\nFixes #3818\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-11-02T14:17:14Z",
          "tree_id": "2a1eb344e36e7d31096358a2d17b6e89c8c67e7e",
          "url": "https://github.com/aws/jsii/commit/e9d4084d06cd2611e4ff25cc7533f823878d1281"
        },
        "date": 1667401420710,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 60286.59737375002,
            "unit": "milliseconds",
            "range": 3431313.5053056567,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 60286.59737375002 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 45923.86456975001,
            "unit": "milliseconds",
            "range": 217699.05267295442,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 45923.86456975001 milliseconds over 20 runs"
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
          "id": "e9d4084d06cd2611e4ff25cc7533f823878d1281",
          "message": "fix(python): type-checking may require incorrect type (#3820)\n\nSince dae724c, Python type-checking\nrelies on a nested stub function as a type annotations source. The\nparameter signature of that stub was copied verbatim from the\nsurrounding function, including any forward type references.\n\nHowever, the forward references can safely be replaced with regular type\nreferences as the module is guaranteed to be fully loaded by the time\nthe stub is created, and using forward-references there results in\n`typeguard` possibly evaluating those in a different context than the\none where the surrounding function was defined. The consequence of this\nis that multiple different foward references by the same name may be\nincorrectly treated as referring to the same type, despite coming from\ndifferent modules.\n\nThis is fixed by turning forward type references in the stub with\nregular type references (in other words, removing any `\"` from the\nparameter signature of the stub), which lets the type be resolved from\nthe local definition context instead of the final runtime context in\nwhich the function is called.\n\nFixes #3818\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-11-02T14:17:14Z",
          "tree_id": "2a1eb344e36e7d31096358a2d17b6e89c8c67e7e",
          "url": "https://github.com/aws/jsii/commit/e9d4084d06cd2611e4ff25cc7533f823878d1281"
        },
        "date": 1667408214284,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 87820.62409820003,
            "unit": "milliseconds",
            "range": 7562601.914837581,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 87820.62409820003 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 65298.1092543,
            "unit": "milliseconds",
            "range": 4151612.9495866983,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 65298.1092543 milliseconds over 20 runs"
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
          "id": "d3c3b170057b976cdbd196f357e287e6437bb1aa",
          "message": "feat(superchain): add Amazon SSM agent (#3819)\n\nAdd the Amazon SSM agent to our image, so that we will be able to debug builds using the CodeBuild `<->` SSM breakpoint feature.\n\n\n\n---\n\nBy submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].\n\n[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0",
          "timestamp": "2022-11-02T18:12:55Z",
          "tree_id": "68842523d031cfde8920aa26087bb84a0390aea0",
          "url": "https://github.com/aws/jsii/commit/d3c3b170057b976cdbd196f357e287e6437bb1aa"
        },
        "date": 1667416889682,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 96003.62993044998,
            "unit": "milliseconds",
            "range": 5207979.23569861,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 96003.62993044998 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 73008.14844825,
            "unit": "milliseconds",
            "range": 1062370.7986406432,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 73008.14844825 milliseconds over 20 runs"
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
          "id": "962be4f97aa75147cef3eebfe1bbfe46d1077aff",
          "message": "chore(deps): Update pytest requirement from ~=7.1 to ~=7.2 in /packages/@jsii/python-runtime (#3816)\n\nUpdates the requirements on [pytest](https://github.com/pytest-dev/pytest) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/pytest-dev/pytest/releases\">pytest's releases</a>.</em></p>\n<blockquote>\n<h2>7.2.0</h2>\n<h1>pytest 7.2.0 (2022-10-23)</h1>\n<h2>Deprecations</h2>\n<ul>\n<li>\n<p><a href=\"https://github-redirect.dependabot.com/pytest-dev/pytest/issues/10012\">#10012</a>: Update <code>pytest.PytestUnhandledCoroutineWarning</code>{.interpreted-text role=&quot;class&quot;} to a deprecation; it will raise an error in pytest 8.</p>\n</li>\n<li>\n<p><a href=\"https://github-redirect.dependabot.com/pytest-dev/pytest/issues/10396\">#10396</a>: pytest no longer depends on the <code>py</code> library. <code>pytest</code> provides a vendored copy of <code>py.error</code> and <code>py.path</code> modules but will use the <code>py</code> library if it is installed. If you need other <code>py.*</code> modules, continue to install the deprecated <code>py</code> library separately, otherwise it can usually be removed as a dependency.</p>\n</li>\n<li>\n<p><a href=\"https://github-redirect.dependabot.com/pytest-dev/pytest/issues/4562\">#4562</a>: Deprecate configuring hook specs/impls using attributes/marks.</p>\n<p>Instead use :py<code>pytest.hookimpl</code>{.interpreted-text role=&quot;func&quot;} and :py<code>pytest.hookspec</code>{.interpreted-text role=&quot;func&quot;}.\nFor more details, see the <code>docs &lt;legacy-path-hooks-deprecated&gt;</code>{.interpreted-text role=&quot;ref&quot;}.</p>\n</li>\n<li>\n<p><a href=\"https://github-redirect.dependabot.com/pytest-dev/pytest/issues/9886\">#9886</a>: The functionality for running tests written for <code>nose</code> has been officially deprecated.</p>\n<p>This includes:</p>\n<ul>\n<li>Plain <code>setup</code> and <code>teardown</code> functions and methods: this might catch users by surprise, as <code>setup()</code> and <code>teardown()</code> are not pytest idioms, but part of the <code>nose</code> support.</li>\n<li>Setup/teardown using the <a href=\"https://github.com/pytest-dev/pytest/blob/HEAD/with-setup-nose\"><code>@​with_setup</code></a> decorator.</li>\n</ul>\n<p>For more details, consult the <code>deprecation docs &lt;nose-deprecation&gt;</code>{.interpreted-text role=&quot;ref&quot;}.</p>\n</li>\n</ul>\n<h2>Features</h2>\n<ul>\n<li><a href=\"https://github-redirect.dependabot.com/pytest-dev/pytest/issues/9897\">#9897</a>: Added shell-style wildcard support to <code>testpaths</code>.</li>\n</ul>\n<h2>Improvements</h2>\n<ul>\n<li>\n<p><a href=\"https://github-redirect.dependabot.com/pytest-dev/pytest/issues/10218\">#10218</a>: <code>@pytest.mark.parametrize()</code> (and similar functions) now accepts any <code>Sequence[str]</code> for the argument names,\ninstead of just <code>list[str]</code> and <code>tuple[str, ...]</code>.</p>\n<p>(Note that <code>str</code>, which is itself a <code>Sequence[str]</code>, is still treated as a\ncomma-delimited name list, as before).</p>\n</li>\n<li>\n<p><a href=\"https://github-redirect.dependabot.com/pytest-dev/pytest/issues/10381\">#10381</a>: The <code>--no-showlocals</code> flag has been added. This can be passed directly to tests to override <code>--showlocals</code> declared through <code>addopts</code>.</p>\n</li>\n<li>\n<p><a href=\"https://github-redirect.dependabot.com/pytest-dev/pytest/issues/3426\">#3426</a>: Assertion failures with strings in NFC and NFD forms that normalize to the same string now have a dedicated error message detailing the issue, and their utf-8 representation is expresed instead.</p>\n</li>\n<li>\n<p><a href=\"https://github-redirect.dependabot.com/pytest-dev/pytest/issues/7337\">#7337</a>: A warning is now emitted if a test function returns something other than [None]{.title-ref}. This prevents a common mistake among beginners that expect that returning a [bool]{.title-ref} (for example [return foo(a, b) == result]{.title-ref}) would cause a test to pass or fail, instead of using [assert]{.title-ref}.</p>\n</li>\n<li>\n<p><a href=\"https://github-redirect.dependabot.com/pytest-dev/pytest/issues/8508\">#8508</a>: Introduce multiline display for warning matching via :py<code>pytest.warns</code>{.interpreted-text role=&quot;func&quot;} and\nenhance match comparison for :py<code>_pytest._code.ExceptionInfo.match</code>{.interpreted-text role=&quot;func&quot;} as returned by :py<code>pytest.raises</code>{.interpreted-text role=&quot;func&quot;}.</p>\n</li>\n<li>\n<p><a href=\"https://github-redirect.dependabot.com/pytest-dev/pytest/issues/8646\">#8646</a>: Improve :py<code>pytest.raises</code>{.interpreted-text role=&quot;func&quot;}. Previously passing an empty tuple would give a confusing\nerror. We now raise immediately with a more helpful message.</p>\n</li>\n<li>\n<p><a href=\"https://github-redirect.dependabot.com/pytest-dev/pytest/issues/9741\">#9741</a>: On Python 3.11, use the standard library's <code>tomllib</code>{.interpreted-text role=&quot;mod&quot;} to parse TOML.</p>\n<p><code>tomli</code>{.interpreted-text role=&quot;mod&quot;}` is no longer a dependency on Python 3.11.</p>\n</li>\n<li>\n<p><a href=\"https://github-redirect.dependabot.com/pytest-dev/pytest/issues/9742\">#9742</a>: Display assertion message without escaped newline characters with <code>-vv</code>.</p>\n</li>\n<li>\n<p><a href=\"https://github-redirect.dependabot.com/pytest-dev/pytest/issues/9823\">#9823</a>: Improved error message that is shown when no collector is found for a given file.</p>\n</li>\n</ul>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/pytest-dev/pytest/commit/3af3f569d5394bb1a18426b0d57a04a094800974\"><code>3af3f56</code></a> Prepare release version 7.2.0</li>\n<li><a href=\"https://github.com/pytest-dev/pytest/commit/bc2c3b66aa084fa4ff64f836aee73eae4cb72818\"><code>bc2c3b6</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/pytest-dev/pytest/issues/10408\">#10408</a> from NateMeyvis/patch-2</li>\n<li><a href=\"https://github.com/pytest-dev/pytest/commit/d84ed48f39f1629a180baea29ec8ec6dac2e386b\"><code>d84ed48</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/pytest-dev/pytest/issues/10409\">#10409</a> from pytest-dev/asottile-patch-1</li>\n<li><a href=\"https://github.com/pytest-dev/pytest/commit/ffe49ac17c9a9a8aea9a2682897d7b2f10dc9992\"><code>ffe49ac</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/pytest-dev/pytest/issues/10396\">#10396</a> from pytest-dev/pylib-hax</li>\n<li><a href=\"https://github.com/pytest-dev/pytest/commit/d35209826190c831a338fb2a958215c7e4b5b269\"><code>d352098</code></a> allow jobs to pass if codecov.io fails</li>\n<li><a href=\"https://github.com/pytest-dev/pytest/commit/c5c562b645a62a919856d255fd83015cce75014c\"><code>c5c562b</code></a> Fix typos in CONTRIBUTING.rst</li>\n<li><a href=\"https://github.com/pytest-dev/pytest/commit/d543a45a6802defbafcff259bdc235af76f7af3a\"><code>d543a45</code></a> add deprecation changelog for py library vendoring</li>\n<li><a href=\"https://github.com/pytest-dev/pytest/commit/f341a5c559e00c5ac8d7f48cca7107da6c62b204\"><code>f341a5c</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/pytest-dev/pytest/issues/10407\">#10407</a> from NateMeyvis/patch-1</li>\n<li><a href=\"https://github.com/pytest-dev/pytest/commit/1027dc8c091369ff5e67d97d2a9c09cbf7bc921e\"><code>1027dc8</code></a> [pre-commit.ci] auto fixes from pre-commit.com hooks</li>\n<li><a href=\"https://github.com/pytest-dev/pytest/commit/6b905ee6dc7301f95714006037f869a15d518d58\"><code>6b905ee</code></a> Add note on tags to CONTRIBUTING.rst</li>\n<li>Additional commits viewable in <a href=\"https://github.com/pytest-dev/pytest/compare/7.1.0...7.2.0\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-11-03T11:37:07Z",
          "tree_id": "f72fc28314ecff7ed249fecd4e3a680c51587789",
          "url": "https://github.com/aws/jsii/commit/962be4f97aa75147cef3eebfe1bbfe46d1077aff"
        },
        "date": 1667478351649,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 60992.32843995003,
            "unit": "milliseconds",
            "range": 2932970.2348041805,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 60992.32843995003 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 46274.81420310001,
            "unit": "milliseconds",
            "range": 208995.55623348124,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 46274.81420310001 milliseconds over 20 runs"
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
          "id": "ec202e2a4d78dd8082f9222968ca2ad591f930ad",
          "message": "chore: npm-check-updates && yarn upgrade (#3821)\n\nRan npm-check-updates and yarn upgrade to keep the `yarn.lock` file up-to-date.",
          "timestamp": "2022-11-08T10:34:05Z",
          "tree_id": "c5ca96a91bf5a2a4a74a8658be6673467bbb6003",
          "url": "https://github.com/aws/jsii/commit/ec202e2a4d78dd8082f9222968ca2ad591f930ad"
        },
        "date": 1667907734475,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 96369.37955729998,
            "unit": "milliseconds",
            "range": 5530814.517522546,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 96369.37955729998 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 72236.42602854998,
            "unit": "milliseconds",
            "range": 1409153.5468440384,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 72236.42602854998 milliseconds over 20 runs"
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
          "id": "8ac1f415920a171639a0be5d462ec9b67906bef3",
          "message": "chore(deps-dev): Update mkdocs requirement from ~=1.4.1 to ~=1.4.2 in /gh-pages (#3823)\n\nUpdates the requirements on [mkdocs](https://github.com/mkdocs/mkdocs) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/mkdocs/mkdocs/releases\">mkdocs's releases</a>.</em></p>\n<blockquote>\n<h2>1.4.2</h2>\n<ul>\n<li>\n<p>Officially support Python 3.11 (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/3020\">#3020</a>)</p>\n<blockquote>\n<p><strong>Note</strong>: Simply upgrading to Python 3.11 can cut off 10-15% of your site's build time.</p>\n</blockquote>\n</li>\n<li>\n<p>Support multiple instances of the same plugin (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/3027\">#3027</a>)</p>\n<p>If a plugin is specified multiple times in the list under the <code>plugins:</code> config, that will create 2 (or more) instances of the plugin with their own config each.</p>\n<p>Previously this case was unforeseen and, as such, bugged.</p>\n<p>Now even though this works, by default a warning will appear from MkDocs anyway, unless the plugin adds a class variable <code>supports_multiple_instances = True</code>.</p>\n</li>\n<li>\n<p>Bugfix (regression in 1.4.1): Don't error when a plugin puts a plain string into <code>warnings</code> (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/3016\">#3016</a>)</p>\n</li>\n<li>\n<p>Bugfix: Relative links will always render with a trailing slash (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/3022\">#3022</a>)</p>\n<p>Previously under <code>use_directory_urls</code>, links <em>from</em> a sub-page <em>to</em> the main index page rendered as e.g. <code>&lt;a href=&quot;../..&quot;&gt;</code> even though in all other cases the links look like <code>&lt;a href=&quot;../../&quot;&gt;</code>. This caused unwanted behavior on some combinations of Web browsers and servers. Now this special-case bug was removed.</p>\n</li>\n<li>\n<p>Built-in &quot;mkdocs&quot; theme now also supports Norwegian language (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/3024\">#3024</a>)</p>\n</li>\n<li>\n<p>Plugin-related warnings look more readable (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/3016\">#3016</a>)</p>\n</li>\n</ul>\n<p>See <a href=\"https://github.com/mkdocs/mkdocs/compare/1.4.1...1.4.2\">commit log</a>.</p>\n</blockquote>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/ec7eee6ce375e2599458a2502c259ec185adce53\"><code>ec7eee6</code></a> Release 1.4.2 (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/3032\">#3032</a>)</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/c99ec45a320194d8f05f6f7124656294e3cb8098\"><code>c99ec45</code></a> Support multiple instances of the same plugin (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/3027\">#3027</a>)</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/452c39eae25f5ac3140f3d1b3889b5425b07da87\"><code>452c39e</code></a> Chore dependency upgrade</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/f190c35a9909c16bcc9394573c0992b8b69dbade\"><code>f190c35</code></a> Translate mkdocs theme to Norwegian (nb and nn) (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/3024\">#3024</a>)</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/c576f07d30e7f1e20ee2292c94dab3b585d9006c\"><code>c576f07</code></a> Declare support for Python 3.11 (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/3020\">#3020</a>)</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/32359f3e93f5ca7778b9f7c3d6d92f49a629c84c\"><code>32359f3</code></a> Relative links end with slash even for homepage links (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/3022\">#3022</a>)</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/1fa2af7926b334a5b02229c3ea1649ff04955b77\"><code>1fa2af7</code></a> Expand type checking coverage (<a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/3019\">#3019</a>)</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/d76cae90590b9735c7690cd1cca0638321b20152\"><code>d76cae9</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/mkdocs/mkdocs/issues/3016\">#3016</a> from mkdocs/optw</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/9d73c2a82462cc0daba1574e4fb11b428b3b1490\"><code>9d73c2a</code></a> Reduce redundancy in config errors/warnings</li>\n<li><a href=\"https://github.com/mkdocs/mkdocs/commit/427d553c2bf2e1c7e7a71a78a544f174dba082ac\"><code>427d553</code></a> Let plugins put strings into <code>warnings</code></li>\n<li>Additional commits viewable in <a href=\"https://github.com/mkdocs/mkdocs/compare/1.4.1...1.4.2\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-11-08T11:29:06Z",
          "tree_id": "460a133a08cc24580ddd21f7eef2eaa2a957989e",
          "url": "https://github.com/aws/jsii/commit/8ac1f415920a171639a0be5d462ec9b67906bef3"
        },
        "date": 1667911171923,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 100624.84405989994,
            "unit": "milliseconds",
            "range": 4343374.904988489,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 100624.84405989994 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 75654.13811460002,
            "unit": "milliseconds",
            "range": 801130.7195972356,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 75654.13811460002 milliseconds over 20 runs"
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
          "id": "fd30d5b542ff959fa2af9c9c11219138c80f5c49",
          "message": "chore(deps-dev): Update mkdocs-material requirement from ~=8.5.7 to ~=8.5.8 in /gh-pages (#3824)\n\nUpdates the requirements on [mkdocs-material](https://github.com/squidfunk/mkdocs-material) to permit the latest version.\n<details>\n<summary>Release notes</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/releases\">mkdocs-material's releases</a>.</em></p>\n<blockquote>\n<h2>mkdocs-material-8.5.8</h2>\n<ul>\n<li>Added support for always showing settings in cookie consent</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4571\">#4571</a>: Buttons invisible if primary color is <code>white</code> or <code>black</code></li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4517\">#4517</a>: Illegible note in sequence diagram when using <code>slate</code> scheme</li>\n</ul>\n</blockquote>\n</details>\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/squidfunk/mkdocs-material/blob/master/CHANGELOG\">mkdocs-material's changelog</a>.</em></p>\n<blockquote>\n<p>mkdocs-material-8.5.8+insiders-4.26.2 (2022-11-03)</p>\n<ul>\n<li>Updated MkDocs to 1.4.2</li>\n<li>Added support for tag compare functions when sorting on index pages</li>\n<li>Fixed footnotes being rendered in post excerpts without separators</li>\n<li>Fixed error in blog plugin when toc extension is not enabled</li>\n<li>Fixed issues with invalid asset paths and linked post titles</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4572\">#4572</a>: Privacy plugin fails when symlinks cannot be created</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4545\">#4545</a>: Blog plugin doesn't automatically link headline to post</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4542\">#4542</a>: Blog plugin doesn't allow for multiple instances</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4532\">#4532</a>: Blog plugin doesn't allow for mixed use of date and datetime</li>\n</ul>\n<p>mkdocs-material-8.5.8 (2022-11-03)</p>\n<ul>\n<li>Added support for always showing settings in cookie consent</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4571\">#4571</a>: Buttons invisible if primary color is white or black</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4517\">#4517</a>: Illegible note in sequence diagram when using slate scheme</li>\n</ul>\n<p>mkdocs-material-8.5.7+insiders-4.26.1 (2022-10-22)</p>\n<ul>\n<li>Improved reporting of configuration errors in tags plugin</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4515\">#4515</a>: Privacy plugin fails when site URL is not defined</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4514\">#4514</a>: Privacy plugin doesn't fetch Google fonts (4.26.0 regression)</li>\n</ul>\n<p>mkdocs-material-8.5.7 (2022-10-22)</p>\n<ul>\n<li>Deprecated additional admonition qualifiers to reduce size of CSS</li>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4511\">#4511</a>: Search boost does not apply to sections</li>\n</ul>\n<p>mkdocs-material-8.5.6+insiders-4.26.0 (2022-10-18)</p>\n<ul>\n<li>Refactored privacy plugin to prepare for new features</li>\n<li>Added support for rel=noopener links in privacy plugin</li>\n<li>Resolve encoding issues with blog and privacy plugin</li>\n</ul>\n<p>mkdocs-material-8.5.6+insiders-4.25.5 (2022-10-16)</p>\n<ul>\n<li>Updated MkDocs to 1.4.1</li>\n<li>Added namespace prefix to built-in plugins</li>\n<li>Updated content and header partial</li>\n</ul>\n<p>mkdocs-material-8.5.6+insiders-4.25.4 (2022-10-09)</p>\n<ul>\n<li>Fixed other path issues for standalone blogs (4.24.2 regression)</li>\n</ul>\n<p>mkdocs-material-8.5.6+insiders-4.25.3 (2022-10-09)</p>\n<ul>\n<li>Fixed <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4457\">#4457</a>: Posts not collected for standalone blog (4.24.2 regression)</li>\n</ul>\n<p>mkdocs-material-8.5.6+insiders-4.25.2 (2022-10-04)</p>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/dcd4a3d73fc81874157fbb4b135ae5e427e2e844\"><code>dcd4a3d</code></a> Prepare 8.5.8 release</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/9e8446e357b81a64bf933fef24eda165369b7b05\"><code>9e8446e</code></a> Merge pull request <a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4585\">#4585</a> from squidfunk/docs/simplify-overrides</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/d616b42031c6c257b8a36ce86a6ef78a3ea7355e\"><code>d616b42</code></a> Fixed Docker image check on publish</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/713bf41403ed56eb1e6290ee52afd2d7a809fa13\"><code>713bf41</code></a> Removed unnecessary templates in overrides</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/04d678bab426d122b4def31cb00cb6b9d1965059\"><code>04d678b</code></a> Merge branch 'master' into docs/simplify-overrides</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/487140e5380d55154aaeabd6bd5b8418382660f3\"><code>487140e</code></a> Replaced hex with hsl color</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/96e2119bfc4eb06a8bbd47b51b9f3089cbb34b17\"><code>96e2119</code></a> Fixed text color for notes in diagrams in dark mode (<a href=\"https://github-redirect.dependabot.com/squidfunk/mkdocs-material/issues/4518\">#4518</a>)</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/941d634b781d60929fb5d8c7497e598422576814\"><code>941d634</code></a> Updated dependencies</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/8aef978e713d743ec7cf497a89183d21f1894262\"><code>8aef978</code></a> Documentation</li>\n<li><a href=\"https://github.com/squidfunk/mkdocs-material/commit/4c8e6532c8ea6e98f5becf78217dc0b26d0cfedf\"><code>4c8e653</code></a> Documentation</li>\n<li>Additional commits viewable in <a href=\"https://github.com/squidfunk/mkdocs-material/compare/8.5.7...8.5.8\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-11-08T12:40:35Z",
          "tree_id": "e1e2ddf095c2bac1ddb582904f34c907409fba23",
          "url": "https://github.com/aws/jsii/commit/fd30d5b542ff959fa2af9c9c11219138c80f5c49"
        },
        "date": 1667914226647,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 68081.54185929999,
            "unit": "milliseconds",
            "range": 593335.0853659415,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 68081.54185929999 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 49581.621368150016,
            "unit": "milliseconds",
            "range": 323758.90839932126,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 49581.621368150016 milliseconds over 20 runs"
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
          "id": "c7d80beeeee6916ef30839d9874548a53d5ec3e9",
          "message": "chore(deps): Update wheel requirement from ~=0.37 to ~=0.38 in /packages/@jsii/python-runtime (#3822)\n\nUpdates the requirements on [wheel](https://github.com/pypa/wheel) to permit the latest version.\n<details>\n<summary>Changelog</summary>\n<p><em>Sourced from <a href=\"https://github.com/pypa/wheel/blob/main/docs/news.rst\">wheel's changelog</a>.</em></p>\n<blockquote>\n<h1>Release Notes</h1>\n<p><strong>0.38.2 (2022-11-05)</strong></p>\n<ul>\n<li>Fixed regression introduced in v0.38.1 which broke parsing of wheel file names with\nmultiple platform tags</li>\n</ul>\n<p><strong>0.38.1 (2022-11-04)</strong></p>\n<ul>\n<li>Removed install dependency on setuptools</li>\n<li>The future-proof fix in 0.36.0 for converting PyPy's SOABI into a abi tag was\nfaulty. Fixed so that future changes in the SOABI will not change the tag.</li>\n</ul>\n<p><strong>0.38.0 (2022-10-21)</strong></p>\n<ul>\n<li>Dropped support for Python &lt; 3.7</li>\n<li>Updated vendored <code>packaging</code> to 21.3</li>\n<li>Replaced all uses of <code>distutils</code> with <code>setuptools</code></li>\n<li>The handling of <code>license_files</code> (including glob patterns and default\nvalues) is now delegated to <code>setuptools&gt;=57.0.0</code> (<a href=\"https://github-redirect.dependabot.com/pypa/wheel/issues/466\">#466</a>).\nThe package dependencies were updated to reflect this change.</li>\n<li>Fixed potential DoS attack via the <code>WHEEL_INFO_RE</code> regular expression</li>\n<li>Fixed <code>ValueError: ZIP does not support timestamps before 1980</code> when using\n<code>SOURCE_DATE_EPOCH=0</code> or when on-disk timestamps are earlier than 1980-01-01. Such\ntimestamps are now changed to the minimum value before packaging.</li>\n</ul>\n<p><strong>0.37.1 (2021-12-22)</strong></p>\n<ul>\n<li>Fixed <code>wheel pack</code> duplicating the <code>WHEEL</code> contents when the build number has changed (<a href=\"https://github-redirect.dependabot.com/pypa/wheel/issues/415\">#415</a>)</li>\n<li>Fixed parsing of file names containing commas in <code>RECORD</code> (PR by Hood Chatham)</li>\n</ul>\n<p><strong>0.37.0 (2021-08-09)</strong></p>\n<ul>\n<li>Added official Python 3.10 support</li>\n<li>Updated vendored <code>packaging</code> library to v20.9</li>\n</ul>\n<p><strong>0.36.2 (2020-12-13)</strong></p>\n<ul>\n<li>Updated vendored <code>packaging</code> library to v20.8</li>\n<li>Fixed wheel sdist missing <code>LICENSE.txt</code></li>\n<li>Don't use default <code>macos/arm64</code> deployment target in calculating the\nplatform tag for fat binaries (PR by Ronald Oussoren)</li>\n</ul>\n<p><strong>0.36.1 (2020-12-04)</strong></p>\n<ul>\n<li>Fixed <code>AssertionError</code> when <code>MACOSX_DEPLOYMENT_TARGET</code> was set to <code>11</code>\n(PR by Grzegorz Bokota and François-Xavier Coudert)</li>\n<li>Fixed regression introduced in 0.36.0 on Python 2.7 when a custom generator\nname was passed as unicode (Scikit-build)</li>\n</ul>\n\n</blockquote>\n<p>... (truncated)</p>\n</details>\n<details>\n<summary>Commits</summary>\n<ul>\n<li><a href=\"https://github.com/pypa/wheel/commit/44193907eb308930de05deed863fb4d157c5c866\"><code>4419390</code></a> Fixed parsing of wheel file names with multiple platform tags</li>\n<li><a href=\"https://github.com/pypa/wheel/commit/6f1608dc1a88f00d2390b9044bd655753f39234c\"><code>6f1608d</code></a> Created a new release</li>\n<li><a href=\"https://github.com/pypa/wheel/commit/cf8f5ef50e32b836c4ffb43af68107f78dca8d80\"><code>cf8f5ef</code></a> Moved news item from PR <a href=\"https://github-redirect.dependabot.com/pypa/wheel/issues/484\">#484</a> to its proper place</li>\n<li><a href=\"https://github.com/pypa/wheel/commit/9ec201660fa07ee0714edd17c979a7039ea852a4\"><code>9ec2016</code></a> Removed install dependency on setuptools (<a href=\"https://github-redirect.dependabot.com/pypa/wheel/issues/483\">#483</a>)</li>\n<li><a href=\"https://github.com/pypa/wheel/commit/747e1f6090547abcf65108c5a229cbe21a64a2ae\"><code>747e1f6</code></a> Fixed PyPy SOABI parsing (<a href=\"https://github-redirect.dependabot.com/pypa/wheel/issues/484\">#484</a>)</li>\n<li><a href=\"https://github.com/pypa/wheel/commit/76275484bc0de72d1f56601dbba3e816fc2f00c6\"><code>7627548</code></a> [pre-commit.ci] pre-commit autoupdate (<a href=\"https://github-redirect.dependabot.com/pypa/wheel/issues/480\">#480</a>)</li>\n<li><a href=\"https://github.com/pypa/wheel/commit/7b9e8e1022b9c850756ef34bc1a4a88042988a86\"><code>7b9e8e1</code></a> Test on Python 3.11 final</li>\n<li><a href=\"https://github.com/pypa/wheel/commit/a04dfef41be0ab10eadbb2ed5d02b600682dc487\"><code>a04dfef</code></a> Updated the pypi-publish action</li>\n<li><a href=\"https://github.com/pypa/wheel/commit/94bb62cb182023ac6586c5510ae9031ea56bd682\"><code>94bb62c</code></a> Fixed docs not building due to code style changes</li>\n<li><a href=\"https://github.com/pypa/wheel/commit/d635664abe560d48723cfc3b73c52ad8c906760a\"><code>d635664</code></a> Updated the codecov action to the latest version</li>\n<li>Additional commits viewable in <a href=\"https://github.com/pypa/wheel/compare/0.37.0...0.38.2\">compare view</a></li>\n</ul>\n</details>\n<br />\n\n\nDependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n\n[//]: # (dependabot-automerge-start)\n[//]: # (dependabot-automerge-end)\n\n---\n\n<details>\n<summary>Dependabot commands and options</summary>\n<br />\n\nYou can trigger Dependabot actions by commenting on this PR:\n- `@dependabot rebase` will rebase this PR\n- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n- `@dependabot merge` will merge this PR after your CI passes on it\n- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n- `@dependabot reopen` will reopen this PR if it is closed\n- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n\n\n</details>",
          "timestamp": "2022-11-08T13:48:50Z",
          "tree_id": "11e575bc4c454757c4bcc9a07223168b249d729b",
          "url": "https://github.com/aws/jsii/commit/c7d80beeeee6916ef30839d9874548a53d5ec3e9"
        },
        "date": 1667918968362,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 83050.2789459,
            "unit": "milliseconds",
            "range": 3034773.6159285377,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 83050.2789459 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 61143.8774082,
            "unit": "milliseconds",
            "range": 1338271.9764610732,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 61143.8774082 milliseconds over 20 runs"
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
          "id": "f1f58aeff31c1206207d87cfc7eda0b28eda83fa",
          "message": "chore(release): 1.71.0 (#3827)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/bump/1.71.0/CHANGELOG.md)",
          "timestamp": "2022-11-09T11:44:13Z",
          "tree_id": "41b1e5249c444db55aa42c84d31efbb06814a571",
          "url": "https://github.com/aws/jsii/commit/f1f58aeff31c1206207d87cfc7eda0b28eda83fa"
        },
        "date": 1667997160982,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 62535.79802990003,
            "unit": "milliseconds",
            "range": 813143.8705537226,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 62535.79802990003 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 45445.24545365,
            "unit": "milliseconds",
            "range": 361662.57880668197,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 45445.24545365 milliseconds over 20 runs"
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
          "id": "9ff1fdea44ff6d80a64ca9c2f7ef550f8a2c814a",
          "message": "chore(merge-back): 1.71.0 (#3829)\n\nSee [CHANGELOG](https://github.com/aws/jsii/blob/merge-back/1.71.0/CHANGELOG.md)",
          "timestamp": "2022-11-09T14:08:25Z",
          "tree_id": "41b1e5249c444db55aa42c84d31efbb06814a571",
          "url": "https://github.com/aws/jsii/commit/9ff1fdea44ff6d80a64ca9c2f7ef550f8a2c814a"
        },
        "date": 1668006890185,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Compile aws-cdk-lib@v2.31.0",
            "value": 93358.42952984996,
            "unit": "milliseconds",
            "range": 11727429.429848988,
            "extra": "Compile aws-cdk-lib@v2.31.0 averaged 93358.42952984996 milliseconds over 20 runs"
          },
          {
            "name": "Compile aws-cdk-lib@v2.31.0 (tsc)",
            "value": 68814.77376140002,
            "unit": "milliseconds",
            "range": 3922762.341465883,
            "extra": "Compile aws-cdk-lib@v2.31.0 (tsc) averaged 68814.77376140002 milliseconds over 20 runs"
          }
        ]
      }
    ]
  }
}