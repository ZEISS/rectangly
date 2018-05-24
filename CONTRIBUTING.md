# Contributing to rectangly

In order to give your contribution to this projects, there are a couple of important things that each potential contributor should be aware of, and that's the purpose of this document, so please read it thoroughly through.

The team rigorously reviews and tests all code submissions. The submissions must meet an extremely high bar for quality, design, and roadmap appropriateness.

## Who can contribute?

Potentially, any SIP developer can become contributor, or other partner that SIP grants privilage, but it's important that she/he is aware of high quality standards that need to be met.

External contributors are also welcome, even though their motivation and area of work must be communicated up front.

## Branching

Few facts about branching in this project. There is only one branch, `master`, and all other development is based on this branch. Release candidates and distribution versions are done by tagging master.

Meaning, for developing new features and/or bug fixes, the master branch should be pulled and built upon.

In case that you are branching for a known feature or a bug, please prefix your branch with the type, for example, `feature/name` or `bugfix/name`.

Possible types:

| Type      | Description                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------ |
| feature/  | New Feature                                                                                            |
| bugfix/   | A bug fix                                                                                              |
| docs/     | Only documentation changes                                                                             |
| style/    | Changes that do not affect the meaning of the code (whitespaces, formatting, missing semicolons, etc.) |
| refactor/ | The code that neither fixes the bug or adds a feature                                                  |
| test/     | Adding missing test                                                                                    |
| chore/    | Changing to the build process or auxiliary tools and libraries such as documentation generation        |

You can always create a new branch based on the upstream master. For convinience the following command can be used:

```sh
git checkout -b feature/my-branch -t origin/master
```

Finally, after finishing the work make sure to pull from `master` again (to avoid conflicts) then push the branch (e.g., `feature/my-branch`) upstream.
