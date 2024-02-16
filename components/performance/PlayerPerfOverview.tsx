// @ts-nocheck

"use client";

import {
    ma
} from "moving-averages";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const windowSize = 3;

export function PlayerPerfOverview({ playerStats }: { playerStats: any[]; }) {


    const playerStatsCleaned = playerStats.map((playerStat) => {
        return {
            name: playerStat.player.name,
            warId: playerStat.warId,
            assist: playerStat.assist,
            death: playerStat.death,
            dmg: playerStat.dmg,
            healing: playerStat.healing,
            kill: playerStat.kill,
        };
    });
    const playerStatsInlined = {
        assist: [],
        death: [],
        dmg: [],
        healing: [],
        kill: []

    }
    playerStatsCleaned.forEach((playerStat) => {
        playerStatsInlined.assist.push(playerStat.assist);
        playerStatsInlined.death.push(playerStat.death);
        playerStatsInlined.dmg.push(playerStat.dmg);
        playerStatsInlined.healing.push(playerStat.healing);
        playerStatsInlined.kill.push(playerStat.kill);
    })

    const weightedPlayerStats = {
        assist: ma(playerStatsInlined.assist, windowSize),
        death: ma(playerStatsInlined.death, windowSize),
        dmg: ma(playerStatsInlined.dmg, windowSize),
        healing: ma(playerStatsInlined.healing, windowSize),
        kill: ma(playerStatsInlined.kill, windowSize),
    };

    const evolutionsPlayerStats = {
        assist: ((playerStatsCleaned[playerStatsCleaned.length - 1]?.assist - weightedPlayerStats.assist[weightedPlayerStats.assist.length - 1]) / weightedPlayerStats.assist[weightedPlayerStats.assist.length - 1] * 100).toFixed(0),
        death: ((playerStatsCleaned[playerStatsCleaned.length - 1]?.death - weightedPlayerStats.death[weightedPlayerStats.death.length - 1]) / weightedPlayerStats.death[weightedPlayerStats.death.length - 1] * 100).toFixed(0),
        dmg: ((playerStatsCleaned[playerStatsCleaned.length - 1]?.dmg - weightedPlayerStats.dmg[weightedPlayerStats.dmg.length - 1]) / weightedPlayerStats.dmg[weightedPlayerStats.dmg.length - 1] * 100).toFixed(0),
        healing: ((playerStatsCleaned[playerStatsCleaned.length - 1]?.healing - weightedPlayerStats.healing[weightedPlayerStats.healing.length - 1]) / weightedPlayerStats.healing[weightedPlayerStats.healing.length - 1] * 100).toFixed(0),
        kill: ((playerStatsCleaned[playerStatsCleaned.length - 1]?.kill - weightedPlayerStats.kill[weightedPlayerStats.kill.length - 1]) / weightedPlayerStats.kill[weightedPlayerStats.kill.length - 1] * 100).toFixed(0),
    };

    /* @ts-ignore */
    const tableHeader: string[] = [...new Set([].concat(...playerStatsCleaned.map(Object.keys)))];

    // remove key id,playerId, warId
    tableHeader.splice(tableHeader.indexOf("warId"), 1);
    const strokeColors = [
        "#003f5c",
        "#2f4b7c",
        "#665191",
        "#a05195",
        "#d45087",
        "#f95d6a",
        "#ff7c43",
        "#ffa600",
    ];
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 m-2">
                {weightedPlayerStats && Object.keys(weightedPlayerStats).map((playerStat, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium capitalize"
                            >
                                {playerStat}
                            </CardTitle>
                            {/* {svgs[playerStat]} */}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{playerStatsCleaned[playerStatsCleaned.length - 1][playerStat].toFixed(0)}</div>
                            <p className="text-xs text-muted-foreground">
                                {evolutionsPlayerStats[playerStat] > 0 ? "🔺" : "🔻"}
                                {evolutionsPlayerStats[playerStat]}% from last war
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <ResponsiveContainer width="100%" height={350} className="rounded-xl border bg-card text-card-foreground shadow m-2">
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
                            strokeWidth={4} />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
