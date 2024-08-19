import { Commit, GitHub, PluginFactoryOptions, Strategy } from "release-please";
import {
  CandidateReleasePullRequest,
  RepositoryConfig,
} from "release-please/build/src/manifest";
import { ManifestPlugin } from "release-please/build/src/plugin";
import * as core from '@actions/core';

export class VersionInBranchName extends ManifestPlugin {
  constructor(
    github: GitHub,
    targetBranch: string,
    repositoryConfig: RepositoryConfig,
  ) {
    super(github, targetBranch, repositoryConfig);
  }

  async run(
    candidates: CandidateReleasePullRequest[],
  ): Promise<CandidateReleasePullRequest[]> {
    core.debug(`Repo config keys: ${Object.keys(this.repositoryConfig)}`)
    core.debug(`Repo config: ${JSON.stringify(this.repositoryConfig)}`)
    core.debug(
      `Renaming branches for ${candidates.length} pull requests`,
    );

    const modifiedCandidates = candidates.map(
      ({ config, path, pullRequest }) => {
        pullRequest.labels;
        return {
          config,
          path,
          pullRequest: {
            ...pullRequest,
            headRefName: `release-release-please-v${pullRequest.version}`
          },
        };
      },
    );

    return modifiedCandidates;
  }
}

export const versionInBranchNamePluginBuilder = (options: PluginFactoryOptions) => {
  return new VersionInBranchName(
    options.github,
    options.targetBranch,
    options.repositoryConfig,
  );
};
