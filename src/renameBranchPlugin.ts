import { GitHub, PluginFactoryOptions } from "release-please";
import {
  CandidateReleasePullRequest,
  RepositoryConfig,
} from "release-please/build/src/manifest";
import { ManifestPlugin } from "release-please/build/src/plugin";
import * as core from '@actions/core';
import { CANCELLED } from "dns";

export class RenameBranches extends ManifestPlugin {
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
    core.info(
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
            headRefName: "release-randomversion-v1.2.3-rc"
          },
        };
      },
    );

    return modifiedCandidates;
  }
}

export const renameBranchesPluginBuilder = (options: PluginFactoryOptions) => {
  return new RenameBranches(
    options.github,
    options.targetBranch,
    options.repositoryConfig,
  );
};
