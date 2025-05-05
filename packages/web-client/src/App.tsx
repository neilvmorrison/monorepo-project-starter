import { useState } from "react";
import { Button } from "design-system";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="app">
        <h1>Web Client</h1>
        <div className="card">
          <Button
            onClick={() => setCount((count) => count + 1)}
            variant="primary"
          >
            count is {count}
          </Button>

          <div className="button-showcase">
            <h2>Button Variants</h2>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="text">Text</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
