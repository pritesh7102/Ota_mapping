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

const initialNodes = [];
const initialEdges = [];

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [yConfirmed, setYConfirmed] = React.useState(50);
  const [yPosition, setYPosition] = React.useState(yConfirmed + 100);
  const [yPositionOta, setYPositionOta] = React.useState(yConfirmed + 100);

  useEffect(() => {
    edges.map((edge) => {
      const sourceConfirmed = nodes.find((node) => node.id === edge.source);
      const targetConfirmed = nodes.find((node) => node.id === edge.target);
      console.log(sourceConfirmed, targetConfirmed, "confirmed");

      // edges.filter((ed) => {ed.source !== sourceConfirmed.id && ed.target !== targetConfirmed.id})
      // nodes.filter((nd) => {nd.id !== sourceConfirmed.id || nd.id !== targetConfirmed.id})
      handleAddConfirm(sourceConfirmed.data.label, 450, sourceConfirmed.id, targetConfirmed.data.label, 950, targetConfirmed.id);
    //   handleAdd(sourceConfirmed.label, yConfirmed, sourceConfirmed.id);
    });
    console.log("called useEffect");
  }, [edges])

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

  const handleAddConfirm = (typeS, positionS, idS, typeT, positionT, idT) => {
    console.log(typeS, positionS, idS, typeT, positionT, idT, "logging");
    const newNodeS = {
      id: idS.toString(),
      position: { x: positionS, y: yConfirmed },
      data: { label: typeS },
      sourcePosition: "right",
      targetPosition: "left",
    };
    const newNodeT = {
        id: idT.toString(),
        position: { x: positionT, y: yConfirmed },
        data: { label: typeT },
        sourcePosition: "right",
        targetPosition: "left",
      };
    setYConfirmed(yConfirmed + 100);
    const newNodes = [...nodes, newNodeS, newNodeT];
    setNodes(newNodes);
  };

  const handleDrag = (e) => {
    // console.log(e[0]?.position?.x);
    // if (e[0]?.position?.x < 100 || e[0]?.position?.x > 1000) {
    //   initialNodes.map((node) => {
    //     if (node.id === e[0].id) {
    //       e[0].position.x = node.position.x;
    //     }
    //   });
    // // } else {
    // //   onNodesChange(e);
    // // }
    onNodesChange(e);
  };

  // const handleConfirm = () => {
  //   edges.map((edge) => {
  //     const sourceConfirmed = nodes.find((node) => node.id === edge.source);
  //     const targetConfirmed = nodes.find((node) => node.id === edge.target);
  //     console.log(sourceConfirmed, targetConfirmed, "confirmed");

  //     // edges.filter((ed) => {ed.source !== sourceConfirmed.id && ed.target !== targetConfirmed.id})
  //     // nodes.filter((nd) => {nd.id !== sourceConfirmed.id || nd.id !== targetConfirmed.id})
  //     handleAddConfirm(sourceConfirmed.data.label, 450, sourceConfirmed.id, targetConfirmed.data.label, 950, targetConfirmed.id);
  //   //   handleAdd(sourceConfirmed.label, yConfirmed, sourceConfirmed.id);
  //   });
  // };

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
        {/* <Panel position="bottom-center">
          <div onClick={handleConfirm} className="button-cms-mapping">
            Confirm Mapping
          </div>
        </Panel> */}
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
