import { useContext } from "react";
import { KnapsackContext } from "@/context/knapsack-provider";
import { randomData } from "@/lib/utils";

export function useForm() {
  const { defaults, dispatch } = useContext(KnapsackContext);

  function random(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    const data = randomData();
    dispatch({
      type: "SET_DATA",
      payload: {
        values: data.values,
        weights: data.weights,
        capacity: data.capacity,
      },
    });
  }

  function reset(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    const temp = Array(defaults.capacity + 1)
      .fill(0)
      .map(() => Array(defaults.weights.length + 1).fill(0));

    dispatch({ type: "SET_DATA", payload: defaults });
    dispatch({ type: "SET_RESULTS", payload: { value: 0, items: [] } });
    dispatch({ type: "SET_MATRIX", payload: temp });
  }

  return { random, reset };
}
