import { KnapsackContext } from "@/context/knapsack-provider";
import { useContext } from "react";

export function useVisual() {
  const { data, matrix, visual } = useContext(KnapsackContext);

  async function visualStep(i: number, j: number) {
    if (visual.ac.signal.aborted) return;
    visual.select(i, j);
    await visual.delay();
    visual.unselect(i, j);
  }

  async function visualLess(i: number, j: number) {
    if (visual.ac.signal.aborted) return;
    visual.select(i - 1, j - data.weights[i - 1]);
    visual.select(i - 1, j);
    await visual.delay();
  }

  async function visualOption(i: number, j: number) {
    if (visual.ac.signal.aborted) return;
    visual.option(i, j, matrix[i][j]);
    await visual.delay();
  }

  async function deselect(i: number, j: number) {
    visual.unselect(i - 1, j - data.weights[i - 1]);
    visual.unselect(i - 1, j);
    visual.deoption(i, j);
  }

  function aborted() {
    return visual.ac.signal.aborted;
  }

  return {
    visualStep,
    visualLess,
    visualOption,
    deselect,
    aborted,
  };
}
