import React, { useCallback, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import HotelPlans from "./hotelPlans";
import OtaPlans from "./otaPlans";

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [initialNodes, setInitialNodes] = useNodesState([]);
  const [initialEdges, setInitialEdges] = useEdgesState([]);
  const [yConfirmed, setYConfirmed] = React.useState(50);
  const [yPosition, setYPosition] = React.useState(yConfirmed + 100);
  const [yPositionOta, setYPositionOta] = React.useState(yConfirmed + 100);

  // useEffect(() => {
  //   edges.forEach((edge) => {
  //     const sourceConfirmed = nodes.find((node) => node.id === edge.source);
  //     const targetConfirmed = nodes.find((node) => node.id === edge.target);
  //     console.log(sourceConfirmed.position, targetConfirmed.position, "found");
  //     console.log(yConfirmed, "yConfirmed position")
  //     handleAddConfirm(
  //       sourceConfirmed.data.label,
  //       450,
  //       sourceConfirmed.id,
  //       targetConfirmed.data.label,
  //       950,
  //       targetConfirmed.id
  //     );
  //   });
  //   console.log(nodes, "nodes elements");
  //   console.log(edges, "edges elements")
  //   const unMappedNodes = nodes.filter((node) => {
  //     return !edges.some((e) => node.id === e.source || node.id === e.target);
  //   });
  //   console.log(unMappedNodes, "unmapped nodes");
  // }, [edges.length]);

  const onConnect = useCallback((params) => {
    console.log(params);
    return (
      setEdges((eds) => {
        console.log(eds);
        return addEdge(params, eds);
      }),
      [setEdges]
    );
  });

  const handleAdd = (type, position, id) => {
    const newNode = {
      id: id,
      position: { x: position, y: yPosition },
      data: { label: type },
      sourcePosition: "right",
      targetPosition: "left",
    };
    setYPosition(yPosition + 100);
    const newNodes = [...nodes, newNode];
    setNodes(newNodes);
  };

  const handleAddOta = (type, position, id) => {
    const newNode = {
      id: id.toString(),
      position: { x: position, y: yPositionOta },
      data: { label: type },
      sourcePosition: "right",
      targetPosition: "left",
    };
    setYPositionOta(yPositionOta + 100);
    const newNodes = [...nodes, newNode];
    setNodes(newNodes);
  };

  // const handleAddConfirm = (typeS, positionS, idS, typeT, positionT, idT) => {
  //   console.log(typeS, positionS, idS, typeT, positionT, idT, "logging");
  //   const newNodeS = {
  //     id: idS.toString(),
  //     position: { x: positionS, y: yConfirmed },
  //     data: { label: typeS },
  //     sourcePosition: "right",
  //     targetPosition: "left",
  //   };
  //   const newNodeT = {
  //     id: idT.toString(),
  //     position: { x: positionT, y: yConfirmed },
  //     data: { label: typeT },
  //     sourcePosition: "right",
  //     targetPosition: "left",
  //   };
  //   console.log(newNodeS.position, newNodeT.position, "position changed");
  //   setYConfirmed(yConfirmed + 100);
  //   const temp = nodes.filter((n) => !(n.id === idS || n.id === idT))
  //   const newNodes = [...temp, newNodeS, newNodeT];
  //   setNodes(newNodes);
  // };

  const handleDrag = (e) => {
    onNodesChange(e);
  };

  const handleConfirm = () => {
    const mappedNodes = edges.map((edge) => {
      const source = nodes.find((node) => node.id === edge.source);
      const target = nodes.find((node) => node.id === edge.target);
      return {
        source: source.data.label,
        target: target.data.label,
      };
    });
    setInitialNodes(mappedNodes);
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleDrag}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Panel position="left">
          <HotelPlans handleAdd={handleAdd} />
        </Panel>
        <Panel position="right">
          <OtaPlans handleAdd={handleAddOta} />
        </Panel>
        <Panel onClick={handleConfirm} position="bottom-center">
          <div className="button-cms-mapping">
            Confirm Mapping
          </div>
        </Panel>
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}