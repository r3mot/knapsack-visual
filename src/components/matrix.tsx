import { useContext, useState, useEffect } from "react";
import { KnapsackContext } from "@/context/knapsack-provider";
import { cn, gridSize } from "@/lib/utils";

export function Matrix() {
  const { data, matrix } = useContext(KnapsackContext);
  const [style, setStyle] = useState("grid-cols-1");

  useEffect(() => {
    const size = gridSize(data.capacity + 1)!;
    setStyle(size);
  }, [data.capacity]);

  return (
    <div className='flex flex-col'>
      <div className='w-fit h-fit'>
        <div className={cn(style, "grid")}>
          {matrix.map((row, rowIndex) =>
            row.map((cell: number, colIndex: number) => (
              <div
                data-trace={`${rowIndex}-${colIndex}`}
                key={`${rowIndex}-${colIndex}`}
                className='p-4 border bg-neutral-700 border-neutral-600'>
                {cell}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
