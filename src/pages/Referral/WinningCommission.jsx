import React from "react";
import { useNavigate } from "react-router-dom";
import "./Referral.css";

const WinningCommission = () => {
  const navigate = useNavigate();

  // All winners data flattened - ticket numbers match prize structure
  const allWinners = [
    // LTK-005 winners
    { id: 1, drawNumber: "LTK-005", position: "1st Prize", name: "Rajesh Kumar", ticketNumber: "3729", prize: 5000, yourCommission: 250, level: 1 },
    { id: 2, drawNumber: "LTK-005", position: "2nd Prize", name: "Priya S", ticketNumber: "729", prize: 2000, yourCommission: 100, level: 1 },
    { id: 3, drawNumber: "LTK-005", position: "3rd Prize", name: "Suresh B", ticketNumber: "29", prize: 1000, yourCommission: 100.50, level: 2 },
    { id: 4, drawNumber: "LTK-005", position: "4th Prize", name: "Kumar S", ticketNumber: "9", prize: 500, yourCommission: 50, level: 1 },
    // LTK-004 winners
    { id: 5, drawNumber: "LTK-004", position: "1st Prize", name: "Vijay M", ticketNumber: "8154", prize: 3000, yourCommission: 150, level: 1 },
    { id: 6, drawNumber: "LTK-004", position: "2nd Prize", name: "Lakshmi P", ticketNumber: "154", prize: 1500, yourCommission: 75, level: 2 },
    { id: 7, drawNumber: "LTK-004", position: "3rd Prize", name: "Divya K", ticketNumber: "54", prize: 800, yourCommission: 40, level: 2 },
    { id: 8, drawNumber: "LTK-004", position: "4th Prize", name: "Anitha R", ticketNumber: "4", prize: 400, yourCommission: 20, level: 1 },
    // LTK-003 winners
    { id: 9, drawNumber: "LTK-003", position: "1st Prize", name: "Ravi T", ticketNumber: "5642", prize: 2500, yourCommission: 125, level: 1 },
    { id: 10, drawNumber: "LTK-003", position: "2nd Prize", name: "Meena R", ticketNumber: "642", prize: 1100, yourCommission: 55, level: 1 },
    { id: 11, drawNumber: "LTK-003", position: "3rd Prize", name: "Ganesh P", ticketNumber: "42", prize: 600, yourCommission: 30, level: 2 },
    { id: 12, drawNumber: "LTK-003", position: "4th Prize", name: "Kavitha M", ticketNumber: "2", prize: 300, yourCommission: 15, level: 2 },
  ];

  const formatMoney = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);

  return (
    <div className="referral-page">
      <div className="page-header-inline">
        <button className="back-button-inline" onClick={() => navigate('/referral')}>
          ← Back
        </button>
        <div className="header-content-inline">
          <h1>🏆 Winning Commission</h1>
          <p>Commission from referral wins</p>
        </div>
      </div>

      {/* Winners Table */}
      <div className="classic-table-container">
        <table className="classic-table winners-table">
          <thead>
            <tr>
              <th>Draw</th>
              <th>Position</th>
              <th>Winner Name</th>
              <th>Ticket Number</th>
              <th>Prize</th>
              <th>Your Commission</th>
            </tr>
          </thead>
          <tbody>
            {allWinners.map((winner) => (
              <tr key={winner.id}>
                <td>{winner.drawNumber}</td>
                <td>
                  <span className="position-badge">{winner.position}</span>
                </td>
                <td>{winner.name}</td>
                <td>{winner.ticketNumber}</td>
                <td>{formatMoney(winner.prize)}</td>
                <td className="commission-amount">{formatMoney(winner.yourCommission)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WinningCommission;
