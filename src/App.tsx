import { useState } from "react";
import "./App.css";
import Button from "./components/ui/button.tsx";

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <div className={` ${theme}`}>
      <div className="p-5 min-h-screen dark:bg-gray-950 space-x-4 space-y-4">
        <div>
          <Button
            onClick={() =>
              setTheme(() => (theme === "light" ? "dark" : "light"))
            }
          >
            {theme}
          </Button>
        </div>
        <div>
          <div className="flex space-x-3 space-y-3">
            <Button variant="solid" color="blue" size="middle">
              Solide Primary
            </Button>
            <Button variant="outlined" color="blue" size="middle">
              Outline Primary
            </Button>
            <Button variant="dashed" color="blue" size="middle">
              Dashed Primary
            </Button>
            <Button variant="filled" color="blue" size="middle">
              Filled Primary
            </Button>
            <Button variant="text" color="blue" size="middle">
              Filled Primary
            </Button>
            <Button variant="link" color="blue" size="middle">
              Filled Primary
            </Button>
          </div>
          <div className="flex space-x-3 space-y-3">
            <Button variant="solid" color="green" size="middle">
              Solide Primary
            </Button>
            <Button variant="outlined" color="green" size="middle">
              Outline Primary
            </Button>
            <Button variant="dashed" color="green" size="middle">
              Dashed Primary
            </Button>
            <Button variant="filled" color="green" size="middle">
              Filled Primary
            </Button>
            <Button variant="text" color="green" size="middle">
              Filled Primary
            </Button>
            <Button variant="link" color="green" size="middle">
              Filled Primary
            </Button>
          </div>
          <div className="flex space-x-3 space-y-3">
            <Button variant="solid" color="red" size="middle">
              Solide Primary
            </Button>
            <Button variant="outlined" color="red" size="middle">
              Outline Primary
            </Button>
            <Button variant="dashed" color="red" size="middle">
              Dashed Primary
            </Button>
            <Button variant="filled" color="red" size="middle">
              Filled Primary
            </Button>
            <Button variant="text" color="red" size="middle">
              Filled Primary
            </Button>
            <Button variant="link" color="red" size="middle">
              Filled Primary
            </Button>
          </div>
          <div className="flex space-x-3 space-y-3">
            <Button variant="solid" color="gray" size="middle">
              Solide Primary
            </Button>
            <Button variant="outlined" color="gray" size="middle">
              Outline Primary
            </Button>
            <Button variant="dashed" color="gray" size="middle">
              Dashed Primary
            </Button>
            <Button variant="filled" color="gray" size="middle">
              Filled Primary
            </Button>
            <Button variant="text" color="gray" size="middle">
              Filled Primary
            </Button>
            <Button variant="link" color="gray" size="middle">
              Filled Primary
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
