import { useContext, useEffect } from "react";
import { KnapsackContext } from "@/context/knapsack-provider";
import { Label } from "./ui/label";

export function ResultsBanner() {
  const { results } = useContext(KnapsackContext);

  useEffect(() => {
    console.log(results);
  }, [results]);
  return (
    <div className='flex items-center justify-center w-full h-20 gap-4 py-4 mb-4 border-b'>
      <div className='flex items-center'>
        <Label className='p-4 border'>Value:</Label>
        <Label className='p-4 border'>{results.value}</Label>
      </div>
      <div className='flex items-center'>
        <Label className='p-4 border'>Items</Label>
        <div className='flex'>
          {results.items.map((item, index) => (
            <Label key={index} className='p-4 border'>
              {item}
            </Label>
          ))}
        </div>
      </div>
    </div>
  );
}
