---
id: workflows-introduction
title: Workflows
---
Workflows allow you to automate, schedule, and orchestrate computational tasks on the DSRI, from CI/CD pipelines that build and test your code, to pipelines that process large datasets

The tools below are supported on DSRI. Choose the one that best fits your use-case and team setup.

## Supported solutions
These technologies are available to run workflows on the DSRI:

### GitHub Runners

GitHub Actions allows you to define containerized workflows through a simple YAML file hosted in your GitHub repository. Runners can be deployed directly on the DSRI, enabling you to run your CI/CD pipelines with more resources than GitHub-hosted runners.

See the [GitHub Actions runners page](/docs/workflows-github-actions) for deployment instructions.

### GitLab Runners

GitLab Runners allow you to run your GitLab CI/CD pipelines on DSRI infrastructure. Jobs are executed as Kubernetes pods, giving you access to DSRI's CPU and memory resources directly from your UM GitLab repository.

See the [GitLab Runners page](/docs/workflows-gitlab-runner) for deployment instructions.

### Nextflow

[Nextflow](https://www.nextflow.io/) was developed by the genomics research community and is designed to run bioinformatics pipelines. Workflows are defined in a Bash-like scripting language with built-in support for Conda and Docker containers.

See the [Nextflow page](/docs/workflows-nextflow) for deployment instructions.

## Other options

:::info Contact us

Feel free to [contact us](mailto:rcs-ub@maastrichtuniversity.nl) if you have any questions about running workflows on DSRI or to request support for a new tool.

:::