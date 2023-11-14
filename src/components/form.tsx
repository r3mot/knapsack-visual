import { useContext, useEffect, useRef } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { KnapsackContext } from "@/context/knapsack-provider";
import { useForm } from "@/hooks/use-form";
import { useKnapsack } from "@/hooks/use-knapsack";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function ControlsForm() {
  const weightsRef = useRef<HTMLInputElement | null>(null);
  const valuesRef = useRef<HTMLInputElement | null>(null);
  const capacityRef = useRef<HTMLInputElement | null>(null);
  const startRef = useRef<HTMLButtonElement | null>(null);
  const resetRef = useRef<HTMLButtonElement | null>(null);
  const randomRef = useRef<HTMLButtonElement | null>(null);

  const { defaults, data, dispatch } = useContext(KnapsackContext);

  const { random, reset } = useForm();
  const { start, running } = useKnapsack();

  useEffect(() => {
    const refs = [
      weightsRef,
      valuesRef,
      capacityRef,
      startRef,
      resetRef,
      randomRef,
    ];

    if (running) {
      refs.map((ref) => (ref.current!.disabled = true));
    } else {
      refs.map((ref) => (ref.current!.disabled = false));
    }
  }, [running]);

  return (
    <Card className='w-[350px] '>
      <CardHeader>
        <CardTitle>Input Data</CardTitle>
        <CardDescription>
          Randomly generate data or enter your own
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid items-center w-full gap-4'>
            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor='values'>Values</Label>
              <Input
                ref={valuesRef}
                type='values'
                id='values'
                placeholder={defaults.values.toString()}
                value={data.values.toString()}
                onChange={(e) => {
                  dispatch({
                    type: "SET_DATA",
                    payload: { ...data, values: parseInt(e.target.value) },
                  });
                }}
              />
            </div>
            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor='capacity'>Capacity</Label>
              <Input
                ref={capacityRef}
                type='capacity'
                id='capacity'
                placeholder={defaults.capacity.toString()}
                value={data.capacity.toString()}
                onChange={(e) => {
                  dispatch({
                    type: "SET_DATA",
                    payload: { ...data, capacity: parseInt(e.target.value) },
                  });
                }}
              />
            </div>
            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor='weights'>Weights</Label>
              <Input
                ref={weightsRef}
                type='weights'
                id='weights'
                placeholder={defaults.weights.toString()}
                value={data.weights.toString()}
                onChange={(e) => {
                  dispatch({
                    type: "SET_DATA",
                    payload: { ...data, weights: parseInt(e.target.value) },
                  });
                }}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex flex-col w-full'>
        <Button
          className='w-full mb-4'
          ref={startRef}
          onClick={async (e) => {
            e.preventDefault();
            await start();
          }}>
          Start
        </Button>
        <div className='flex justify-between w-full gap-4'>
          <Button
            ref={randomRef}
            variant={"outline"}
            onClick={(e) => random(e)}
            className='w-full mb-4'>
            Randomize
          </Button>

          <Button
            variant={"destructive"}
            ref={resetRef}
            onClick={(e) => reset(e)}
            className='w-full mb-4'>
            Reset
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

// <div className='grid w-full items-center gap-1.5'>
//       <Label htmlFor='values'>Values</Label>
//       <Input
//         ref={valuesRef}
//         type='values'
//         id='values'
//         placeholder={defaults.values.toString()}
//         value={data.values.toString()}
//         onChange={(e) => {
//           dispatch({
//             type: "SET_DATA",
//             payload: { ...data, values: parseInt(e.target.value) },
//           });
//         }}
//       />
//     </div>
//     <div className='grid w-full items-center gap-1.5'>
//       <Label htmlFor='capacity'>Capacity</Label>
//       <Input
//         ref={capacityRef}
//         type='capacity'
//         id='capacity'
//         placeholder={defaults.capacity.toString()}
//         value={data.capacity.toString()}
//         onChange={(e) => {
//           dispatch({
//             type: "SET_DATA",
//             payload: { ...data, capacity: parseInt(e.target.value) },
//           });
//         }}
//       />
//     </div>
//     <div className='grid w-full items-center gap-1.5'>
//       <Label htmlFor='weights'>Weights</Label>
//       <Input
//         ref={weightsRef}
//         type='weights'
//         id='weights'
//         placeholder={defaults.weights.toString()}
//         value={data.weights.toString()}
//         onChange={(e) => {
//           dispatch({
//             type: "SET_DATA",
//             payload: { ...data, weights: parseInt(e.target.value) },
//           });
//         }}
//       />
//     </div>
// <Button
//   className='mb-4'
//   ref={startRef}
//   onClick={async (e) => {
//     e.preventDefault();
//     await start();
//   }}>
//   Start
// </Button>

//     <Button variant={"destructive"} ref={resetRef} onClick={(e) => reset(e)}>
//       Reset
//     </Button>
