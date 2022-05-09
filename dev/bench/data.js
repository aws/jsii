window.BENCHMARK_DATA = {
  "lastUpdate": 1652094220736,
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
      }
    ]
  }
}