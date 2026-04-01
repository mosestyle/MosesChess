import { StatusCodes } from "http-status-codes";
import { clone } from "lodash-es";

import AnalysisOptions from "shared/lib/reporter/types/AnalysisOptions";
import { getGameAnalysis } from "shared/lib/reporter/report";
import { GameAnalysis } from "shared/types/game/GameAnalysis";
import {
    StateTreeNode,
    serializeNode,
    deserializeNode
} from "shared/types/game/position/StateTreeNode";
import APIResponse from "@/types/APIResponse";

export async function analyseStateTree(
    rootNode: StateTreeNode,
    options?: AnalysisOptions
): Promise<APIResponse<{ gameAnalysis: GameAnalysis }>> {
    try {
        const serializedRoot = serializeNode(rootNode);
        const clonedRoot = deserializeNode(serializedRoot, rootNode);

        const gameAnalysis = getGameAnalysis(clonedRoot, {
            includeBrilliant: options?.includeBrilliant,
            includeCritical: options?.includeCritical,
            includeTheory: options?.includeTheory
        });

        return {
            status: StatusCodes.OK,
            gameAnalysis
        };
    } catch {
        return { status: StatusCodes.INTERNAL_SERVER_ERROR };
    }
}

export async function analyseNode(
    node: StateTreeNode,
    options?: AnalysisOptions
): Promise<APIResponse<{ node: StateTreeNode }>> {
    if (!node.parent)
        return { status: StatusCodes.BAD_REQUEST };

    const childlessNode = clone(node);
    childlessNode.children = [];

    const parentNode = clone(node.parent);
    parentNode.children = [childlessNode];

    const reportResult = await analyseStateTree(parentNode, options);
    const analysedNode = reportResult.gameAnalysis?.stateTree.children.at(0);

    return {
        status: reportResult.status,
        node: analysedNode
    };
}
