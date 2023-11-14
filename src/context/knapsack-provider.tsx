/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useEffect, useReducer } from "react";
import { Visual } from "@/scripts/visual";

interface DataProps {
  values: number[];
  weights: number[];
  capacity: number;
}

interface ResultsProps {
  value: number;
  items: number[];
}

interface ContextProps {
  data: DataProps;
  defaults: DataProps;
  results: ResultsProps;
  matrix: number[][];

  visual: Visual;
  dispatch: React.Dispatch<Action>;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: ContextProps = {
  data: {
    values: [1, 4, 5, 7],
    weights: [1, 3, 4, 5],
    capacity: 7,
  },
  defaults: {
    values: [1, 4, 5, 7],
    weights: [1, 3, 4, 5],
    capacity: 7,
  },
  results: { value: 0, items: [] },
  matrix: [[]],

  visual: new Visual(),
  dispatch: () => {},
};

const knapsackReducer = (state: ContextProps, action: Action): ContextProps => {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, data: action.payload };
    case "SET_RESULTS":
      return { ...state, results: action.payload };
    case "SET_MATRIX":
      return { ...state, matrix: action.payload };
    default:
      return state;
  }
};

export const KnapsackContext = createContext(initialState);

export function KnapsackProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(knapsackReducer, initialState);

  useEffect(() => {
    const temp = Array(state.data.weights.length + 1)
      .fill(0)
      .map(() => Array(state.data.capacity + 1).fill(0));

    dispatch({ type: "SET_MATRIX", payload: temp });
  }, [state.data.capacity, state.data.weights.length]);

  const contextValue: ContextProps = {
    ...state,
    dispatch,
  };

  return (
    <KnapsackContext.Provider value={contextValue}>
      {children}
    </KnapsackContext.Provider>
  );
}
