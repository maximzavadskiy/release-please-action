import { Commit, GitHub, PluginFactoryOptions, Strategy } from "release-please";
import {
  CandidateReleasePullRequest,
  RepositoryConfig,
} from "release-please/build/src/manifest";
import { ManifestPlugin } from "release-please/build/src/plugin";
import * as core from '@actions/core';
import { Release } from "release-please/build/src/release";

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
            headRefName: "release-release-please-v1.2.3-rc"
          },
        };
      },
    );

    return modifiedCandidates;
  }

  preconfigure(strategiesByPath: Record<string, Strategy>, _commitsByPath: Record<string, Commit[]>, _releasesByPath: Record<string, Release>): Promise<Record<string, Strategy>> {
    core.debug(
      `preconfiguring strategines`,
    );
    for (let path in strategiesByPath) {
      core.debug(
        `strategy for path ${path}`
      );
      // @ts-ignore
      strategiesByPath[path].component = "version"  // TODO find how to change stragegy.component / strategy.packageName
      // @ts-ignore
      strategiesByPath[path].packageName = "version"  // TODO find how to change stragegy.component / strategy.packageName
    }
    return Promise.resolve(strategiesByPath)
  }
}

export const renameBranchesPluginBuilder = (options: PluginFactoryOptions) => {
  return new RenameBranches(
    options.github,
    options.targetBranch,
    options.repositoryConfig,
  );
};
