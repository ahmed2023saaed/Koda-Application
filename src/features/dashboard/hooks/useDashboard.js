import { useEffect, useState } from "react";
import { fetchDashboard } from "../api/dashboardApi";
import { mapDashboard } from "../utils/mapDashboard";

function useDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetchDashboard()
      .then((res) => {
        if (!cancelled) setData(mapDashboard(res.dashboard));
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}

export default useDashboard;