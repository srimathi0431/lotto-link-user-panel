import React from "react";
import { useNavigate } from "react-router-dom";
import "./Referral.css";

const JoiningCommission = () => {
  const navigate = useNavigate();

  // Referral List Data - Simple Table
  const referralData = [
    { id: 1, userId: "LLK001234", name: "Rajesh Kumar", level: 1, earnings: 120.50 },
    { id: 2, userId: "LLK001235", name: "Priya S", level: 1, earnings: 95.00 },
    { id: 3, userId: "LLK001236", name: "Vijay M", level: 1, earnings: 180.00 },
    { id: 4, userId: "LLK001237", name: "Anitha R", level: 1, earnings: 45.00 },
    { id: 5, userId: "LLK001238", name: "Kumar S", level: 1, earnings: 210.00 },
    { id: 6, userId: "LLK001239", name: "Lakshmi P", level: 2, earnings: 155.50 },
    { id: 7, userId: "LLK001240", name: "Suresh B", level: 2, earnings: 88.00 },
    { id: 8, userId: "LLK001241", name: "Divya K", level: 2, earnings: 32.00 },
    { id: 9, userId: "LLK001242", name: "Ravi T", level: 3, earnings: 65.00 },
    { id: 10, userId: "LLK001243", name: "Meena R", level: 3, earnings: 42.50 },
    { id: 11, userId: "LLK001244", name: "Ganesh P", level: 4, earnings: 28.00 },
    { id: 12, userId: "LLK001245", name: "Kavitha M", level: 4, earnings: 35.75 },
  ];

  const formatMoney = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);

  const totalEarnings = referralData.reduce((sum, ref) => sum + ref.earnings, 0);

  return (
    <div className="referral-page">
      <div className="page-header-inline">
        <button className="back-button-inline" onClick={() => navigate('/referral')}>
          ← Back
        </button>
        <div className="header-content-inline">
          <h1>🎯 Joining Commission</h1>
          <p>Your referral earnings from sign-ups</p>
        </div>
      </div>

      {/* Classic Table with Borders */}
      <div className="classic-table-container">
        <table className="classic-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>User ID</th>
              <th>Level</th>
              <th>Earnings</th>
            </tr>
          </thead>
          <tbody>
            {referralData.map((referral) => (
              <tr key={referral.id}>
                <td>{referral.name}</td>
                <td>{referral.userId}</td>
                <td>Level {referral.level}</td>
                <td>{formatMoney(referral.earnings)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JoiningCommission;
