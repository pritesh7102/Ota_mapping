import React, { useCallback } from "react";
import './index.css';

import "reactflow/dist/style.css";
import Flow from "./components/flow";

export default function App() {
  return (
    <div>
      <Flow />
    </div>
  );
}
