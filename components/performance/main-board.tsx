"use client"

import { GroupPerfoTable } from "./group-table";




export function PerformanceBoard() {
  const groupPerfos = [

    {
      name: "Kiara",
      "Kills": 2,
      "Deaths": 14,
      "Assists": 84,
      "Heal": 15765,
      "Dmg": 781615
    },
    {
      name: "Diluc",
      "Kills": 4,
      "Deaths": 3,
      "Assists": 8,
      "Heal": 15765,
      "Dmg": 781615
    },
    {
      name: "Venti",
      "Kills": 5,
      "Deaths": 1,
      "Assists": 1,
      "Heal": 15765,
      "Dmg": 781615
    },
    {
      name: "Jean",
      "Kills": 6,
      "Deaths": 2,
      "Assists": 3,
      "Heal": 15765,
      "Dmg": 781615
    },
    {
      name: "Razor",
      "Kills": 7,
      "Deaths": 4,
      "Assists": 5,
      "Heal": 15765,
      "Dmg": 781615
    }]


  return (
    <>
      <GroupPerfoTable groupPerfos={groupPerfos} />
    </>
  )
}