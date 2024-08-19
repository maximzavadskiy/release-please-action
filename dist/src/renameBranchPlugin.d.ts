import { Commit, GitHub, PluginFactoryOptions, Strategy } from "release-please";
import { CandidateReleasePullRequest, RepositoryConfig } from "release-please/build/src/manifest";
import { ManifestPlugin } from "release-please/build/src/plugin";
import { Release } from "release-please/build/src/release";
export declare class RenameBranches extends ManifestPlugin {
    constructor(github: GitHub, targetBranch: string, repositoryConfig: RepositoryConfig);
    run(candidates: CandidateReleasePullRequest[]): Promise<CandidateReleasePullRequest[]>;
    preconfigure(strategiesByPath: Record<string, Strategy>, _commitsByPath: Record<string, Commit[]>, _releasesByPath: Record<string, Release>): Promise<Record<string, Strategy>>;
}
export declare const renameBranchesPluginBuilder: (options: PluginFactoryOptions) => RenameBranches;
