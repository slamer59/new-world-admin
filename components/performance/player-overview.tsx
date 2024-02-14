"use client";

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function PlayerPerfOverview({ playerStats }: { playerStats: any[] }) {

  /* @ts-ignore */
  const tableHeader: string[] = [...new Set([].concat(...playerStats.map(Object.keys)))]
  // remove key id,playerId, warId
  tableHeader.splice(tableHeader.indexOf("id"), 1)
  tableHeader.splice(tableHeader.indexOf("playerId"), 1)
  tableHeader.splice(tableHeader.indexOf("warId"), 1)

  // capitalize first letter of keys
  // tableHeader.forEach((key, i) => {
  //   tableHeader[i] = key.charAt(0).toUpperCase() + key.slice(1)
  // })

  const strokeColors = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "#ffa600",
  ]
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        width={500}
        height={300}
        data={playerStats}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="warId" />
        <YAxis />
        <Tooltip />
        <Legend />
        {playerStats && tableHeader.map((header, i) => (
          <Line
            key={i}
            type="monotone"
            dataKey={header}
            stroke={strokeColors[i]}
            activeDot={{ r: 8 }}
            strokeWidth={4}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
