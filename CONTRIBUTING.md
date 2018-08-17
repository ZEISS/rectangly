# Contributing to rectangly

In order to give your contribution to this projects, there are a couple of important things that each potential contributor should be aware of, and that's the purpose of this document, so please read it thoroughly through.

The team rigorously reviews and tests all code submissions. The submissions must meet a high bar for quality, design, and roadmap appropriateness.

## Who can contribute?

Potentially, any developer can become contributor, or other partner that grants privilage, but it's important that she/he is aware of high quality standards that need to be met.

For non-ZEISS contributors a contributor license agreement (abbr. CLA) must be signed.

## Branching

There are two branches, `master` and `develop`. Release candidates are aggregated in `develop`, while distribution versions are done by pushing to `master`. Finally, each new release is marked by tagging `master`.

Meaning, for developing new features and/or bug fixes, the `develop` branch should be pulled and built upon.

In case that you are branching for a known feature or a bug, please prefix your branch with the type, for example, `feature/name` or `bugfix/name`.

Possible types (this is a list of recommendations, you are not limited to these suggestions):

| Type      | Description                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------ |
| feature/  | New Feature                                                                                            |
| bugfix/   | A bug fix                                                                                              |
| docs/     | Only documentation changes                                                                             |
| style/    | Changes that do not affect the meaning of the code (whitespaces, formatting, missing semicolons, etc.) |
| refactor/ | The code that neither fixes the bug or adds a feature                                                  |
| test/     | Adding missing test                                                                                    |
| chore/    | Changing to the build process or auxiliary tools and libraries such as documentation generation        |

You can always create a new branch based on the upstream `develop`. For convinience the following command can be used (change `my-branch` with the name of your branch):

```sh
git checkout -b feature/my-branch -t origin/develop
```

Ideally, the name of your branch also contains a GitHub issue number.

Finally, after finishing the work make sure to pull from `develop` again (to avoid conflicts) then push the branch (e.g., `feature/my-branch`) upstream. Make sure to always target `develop` in your pull requests (PR). Since targets cannot be changed any PR to `master` needs to be abandoned.
