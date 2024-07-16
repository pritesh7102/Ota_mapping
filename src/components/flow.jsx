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
  const [yConfirmed, setYConfirmed] = React.useState(0);
  const [yPosition, setYPosition] = React.useState(yConfirmed + 100);
  const [yPositionOta, setYPositionOta] = React.useState(yConfirmed + 100);
  const [confirmedEdges, setConfirmedEdges] = React.useState([]);
  const [checkEffect, setCheckEffect] = React.useState(false);
  const [text, setText] = React.useState("");

  // const [check, setCheck] = React.useState(false);
  useEffect(() => {
    edges.forEach((edge) => {
      const sourceConfirmed = nodes.find((node) => node.id === edge.source);
      const targetConfirmed = nodes.find((node) => node.id === edge.target);

      // Check if the edge is already in confirmedEdges
      const edgeAlreadyConfirmed = confirmedEdges.some(
        (confirmedEdge) =>
          confirmedEdge.sourceid === sourceConfirmed.id &&
          confirmedEdge.targetid === targetConfirmed.id
      );

      if (!edgeAlreadyConfirmed) {
        // If the edge is not already confirmed, add it to confirmedEdges
        setConfirmedEdges((prev) => [
          ...prev,
          {
            sourcelabel: sourceConfirmed.data.label,
            sourceid: sourceConfirmed.id,
            positionS: 450,
            positionT: 950,
            targetid: targetConfirmed.id,
            targetlabel: targetConfirmed.data.label,
          },
        ]);
      }
    });
  }, [edges.length]); // Include all dependencies used inside useEffect

  // useEffect(() => {
  //   confirmedEdges.forEach((edge) => {
  //     handleAddConfirm(
  //       edge.sourcelabel,
  //       450,
  //       edge.sourceid,
  //       edge.targetlabel,
  //       950,
  //       edge.targetid
  //     );
  //   });
  // }, [edges.length]);
  useEffect(() => {
    confirmedEdges.forEach((edge) => {
      handleAddConfirm(
        edge.sourcelabel,
        450,
        edge.sourceid,
        edge.targetlabel,
        950,
        edge.targetid
      );
      const filteredCustomEdges = confirmedEdges.filter((customEdge) => {
        return !(
          customEdge.sourceid === edge.sourceid &&
          customEdge.targetid === edge.targetid
        );
      });
      setConfirmedEdges(filteredCustomEdges);
    });
  }, [checkEffect]);

  const handleClick = () => {
    setCheckEffect(!checkEffect);
  };

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

  const handleAdd = (type, positionX, positionY, id) => {
    let check = false;
    nodes.forEach((node) => {
      if (node.id === id) {
        check = true;
      }
    });
    if (check !== true) {
      const newNode = {
        id: id,
        position: { x: positionX + 250, y: positionY - 40 },
        data: { label: type },
        sourcePosition: "right",
        targetPosition: "left",
      };
      // setYPosition(yPosition + 100);
      const newNodes = [...nodes, newNode];
      setNodes(newNodes);
    } else {
      console.log("Already added");
    }
  };

  const handleAddOta = (type, positionX, positionY, id) => {
    let check = false;
    nodes.forEach((node) => {
      if (node.id === id) {
        check = true;
      }
    });
    if (check !== true) {
      const newNode = {
        id: id.toString(),
        position: { x: positionX - 400, y: positionY - 40 },
        data: { label: type },
        sourcePosition: "right",
        targetPosition: "left",
      };
      // setYPositionOta(yPositionOta + 100);
      const newNodes = [...nodes, newNode];
      setNodes(newNodes);
    } else {
      console.log("Already added");
    }
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
    console.log(newNodeS.position, newNodeT.position, "position changed");
    setYConfirmed(yConfirmed + 100);
    const temp = nodes.filter((n) => !(n.id === idS || n.id === idT));
    const newNodes = [...temp, newNodeS, newNodeT];
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

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleDrag}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Panel>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <button
              className="button-cms-mapping"
              onClick={() => {
                handleClick();
              }}
            >
              Home{" "}
            </button>
            <input
              type="text"
              placeholder="Search"
              className="input-cms-mapping"
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <button
              className="button-cms-mapping"
              onClick={() => {
                handleClick();
              }}
            >
              Search
            </button>
          </div>
        </Panel>
        <Panel position="left">
          <HotelPlans handleAdd={handleAdd} />
        </Panel>
        <Panel position="right">
          <OtaPlans handleAdd={handleAddOta} />
        </Panel>
        <Panel position="bottom-center">
          <button
            className="button-cms-mapping"
            onClick={() => {
              handleClick();
            }}
          >
            Confirm Mapping
          </button>
        </Panel>
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
