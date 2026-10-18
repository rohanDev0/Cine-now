import React, { useEffect } from "react";

const CONTROL_URL =
  "https://wild-glitter-263d.rohantemp9.workers.dev/";

function MaintenanceControl({ onMaintenanceChange }) {
  useEffect(() => {
    async function checkMaintenance() {
      try {
        const response = await fetch(CONTROL_URL);
        const data = await response.json();

        onMaintenanceChange(data.maintenance);
      } catch (error) {
        console.error("Maintenance check failed:", error);
      }
    }

    checkMaintenance();
  }, [onMaintenanceChange]);

  return null;
}

export default MaintenanceControl;
