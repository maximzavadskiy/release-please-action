import { GitHub, PluginFactoryOptions } from "release-please";
import { CandidateReleasePullRequest, RepositoryConfig } from "release-please/build/src/manifest";
import { ManifestPlugin } from "release-please/build/src/plugin";
export declare class VersionInBranchName extends ManifestPlugin {
    constructor(github: GitHub, targetBranch: string, repositoryConfig: RepositoryConfig);
    run(candidates: CandidateReleasePullRequest[]): Promise<CandidateReleasePullRequest[]>;
}
export declare const versionInBranchNamePluginBuilder: (options: PluginFactoryOptions) => VersionInBranchName;
