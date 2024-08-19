import { Commit, GitHub, PluginFactoryOptions, Strategy } from "release-please";
import {
  CandidateReleasePullRequest,
  RepositoryConfig,
} from "release-please/build/src/manifest";
import { ManifestPlugin } from "release-please/build/src/plugin";
import * as core from '@actions/core';
import { CANCELLED } from "dns";
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

  preconfigure(strategiesByPath: Record<string, Strategy>, _commitsByPath: Record<string, Commit[]>, _releasesByPath: Record<string, Release>): Promise<Record<string, Strategy>> {
    core.info(
      `preconfiguring strategines`,
    );
    for (let path in strategiesByPath) {
      core.info(
        `strategy for path ${path}`
      );
      // @ts-ignore
      strategiesByPath[path].component = "mine"  // TODO find how to change stragegy.component / strategy.packageName
      // @ts-ignore
      strategiesByPath[path].packageName = "mine"  // TODO find how to change stragegy.component / strategy.packageName
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
