import React from "react";
import { useNavigate } from "react-router-dom";
import "./Royalty.css";

const RoyaltyMembers = () => {
  const navigate = useNavigate();

  // Tree structure data - Start from Kumar R (no root "You" node)
  const treeData = {
    name: "Kumar R",
    id: "LLK123457",
    children: [
      { name: "Priya S", id: "LLK123458", children: [
        { name: "Member 1", id: "LLK123463" },
        { name: "Member 2", id: "LLK123464" },
        { name: "Member 3", id: "LLK123465" },
        { name: "Member 4", id: "LLK123466" },
        { name: "Member 5", id: "LLK123467" }
      ]},
      { name: "Arun M", id: "LLK123459", children: [
        { name: "Member 6", id: "LLK123468" },
        { name: "Member 7", id: "LLK123469" },
        { name: "Member 8", id: "LLK123470" },
        { name: "Member 9", id: "LLK123471" },
        { name: "Member 10", id: "LLK123472" }
      ]},
      { name: "Divya K", id: "LLK123460", children: [
        { name: "Member 11", id: "LLK123473" },
        { name: "Member 12", id: "LLK123474" },
        { name: "Member 13", id: "LLK123475" },
        { name: "Member 14", id: "LLK123476" },
        { name: "Member 15", id: "LLK123477" }
      ]},
      { name: "Ravi P", id: "LLK123461", children: [
        { name: "Member 16", id: "LLK123478" },
        { name: "Member 17", id: "LLK123479" },
        { name: "Member 18", id: "LLK123480" },
        { name: "Member 19", id: "LLK123481" },
        { name: "Member 20", id: "LLK123482" }
      ]},
      { name: "Meena V", id: "LLK123462", children: [
        { name: "Member 21", id: "LLK123483" },
        { name: "Member 22", id: "LLK123484" },
        { name: "Member 23", id: "LLK123485" },
        { name: "Member 24", id: "LLK123486" },
        { name: "Member 25", id: "LLK123487" }
      ]}
    ]
  };

  const TreeNode = ({ node, isRoot = false }) => {
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div className="tree-node-container">
        <div className={`tree-node ${isRoot ? 'root-node' : ''}`}>
          <div className="node-avatar">
            {node.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div className="node-info">
            <div className="node-name">{node.name}</div>
            <div className="node-id">{node.id}</div>
          </div>
        </div>

        {hasChildren && (
          <>
            <div className="tree-line-down"></div>
            <div className="tree-children">
              <div className="tree-line-horizontal"></div>
              {node.children.map((child, index) => (
                <div key={child.id} className="tree-child-wrapper">
                  <div className="tree-line-vertical"></div>
                  <TreeNode node={child} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <main className="lotto-home ll-royalty-members">
      {/* Page Header with Back Button */}
      <div className="page-header-inline">
        <button className="back-button" onClick={() => navigate('/royalty')}>
          ← Back
        </button>
        <div className="header-content">
          <h1>Royalty Network Tree</h1>
          <p>Your complete referral hierarchy</p>
        </div>
      </div>

      {/* Tree Visualization */}
      <div className="tree-visualization-simple">
        <div className="tree-container-simple">
          <TreeNode node={treeData} isRoot={true} />
        </div>
      </div>
    </main>
  );
};

export default RoyaltyMembers;
