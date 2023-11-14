import { ControlsForm } from "./components/form";

// import Header from "./components/header";
import { Matrix } from "./components/matrix";
import { ResultsBanner } from "./components/results";
// import { ResultsBanner } from "./components/results";

export function App() {
  return (
    <div className='h-screen overflow-hidden'>
      <ResultsBanner />
      <div className='grid w-full h-screen grid-cols-[350px_1fr]'>
        <ControlsForm />
        <div className='flex items-center justify-center w-full h-full divide-y-4'>
          <Matrix />
        </div>
      </div>
    </div>
  );
}
