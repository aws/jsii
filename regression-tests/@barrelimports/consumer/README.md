# @barrelimport/consumer

This library re-exports a type imported from a barrel location within
`@barrelimport/provider`, without actually importing `@barrelimport/provider`
itself, so we validate the jsii compiler correctly identifies the submodule
declarations.
