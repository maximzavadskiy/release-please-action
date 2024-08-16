import { GitHub, PluginFactoryOptions } from "release-please";
import {
  CandidateReleasePullRequest,
  RepositoryConfig,
} from "release-please/build/src/manifest";
import { ManifestPlugin } from "release-please/build/src/plugin";

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
    this.logger.info(
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
            labels: [...pullRequest.labels, 'debug-touched-by-rename-plugin'],
          },
        };
      },
    );

    this.logger.debug('renamed candidates', JSON.stringify(modifiedCandidates));

    return candidates;
  }
}

export const renameBranchesPluginBuilder = (options: PluginFactoryOptions) => {
  return new RenameBranches(
    options.github,
    options.targetBranch,
    options.repositoryConfig,
  );
};
