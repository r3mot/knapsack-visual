import { KnapsackContext } from "@/context/knapsack-provider";
import { useContext, useState } from "react";
import { useVisual } from "./use-visual";

export function useKnapsack() {
  const { data, matrix, dispatch } = useContext(KnapsackContext);
  const [running, setRunning] = useState(false);
  const visual = useVisual();

  async function start() {
    setRunning(true);
    const currentMatrix = matrix.map((row) => [...row]);

    for (let i = 0; i <= data.weights.length; i++) {
      for (let j = 0; j <= data.capacity; j++) {
        if (i === 0 || j === 0) {
          if (visual.aborted()) return;
          currentMatrix[i][j] = 0;
          dispatch({ type: "SET_MATRIX", payload: currentMatrix });
          await visual.visualStep(i, j);
        } else if (data.weights[i - 1] <= j) {
          await visual.visualLess(i, j);

          const A =
            data.values[i - 1] + currentMatrix[i - 1][j - data.weights[i - 1]];
          const B = currentMatrix[i - 1][j];

          if (A > B) {
            currentMatrix[i][j] = A;
            await visual.visualOption(i, j);
          } else {
            currentMatrix[i][j] = B;
            await visual.visualOption(i, j);
          }

          dispatch({ type: "SET_MATRIX", payload: currentMatrix });
          await visual.deselect(i, j);
        } else {
          currentMatrix[i][j] = currentMatrix[i - 1][j];
          dispatch({ type: "SET_MATRIX", payload: currentMatrix });
          await visual.visualStep(i, j);
        }
      }
    }

    const selectedItems: number[] = [];
    let i = data.weights.length;
    let w = data.capacity;

    // Results as an object with cost and items
    while (i > 0 && w > 0) {
      if (currentMatrix[i][w] !== currentMatrix[i - 1][w]) {
        selectedItems.push(i - 1);
        w -= data.weights[i - 1];
      }
      i -= 1;
    }

    console.log(selectedItems);

    dispatch({
      type: "SET_RESULTS",
      payload: {
        value: currentMatrix[data.weights.length][data.capacity],
        items: selectedItems.reverse(),
      },
    });

    setRunning(false);
  }

  return {
    start,
    running,
  };
}
