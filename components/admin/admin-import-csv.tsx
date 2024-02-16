"use client"

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState } from "react";
import { usePapaParse } from "react-papaparse";
import { Label } from "recharts";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export function ImportCSV() {
    const { readString } = usePapaParse()
    const [data, setData] = useState([])
    const [headers, setHeaders] = useState([])

    function handleFile(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const CSVString = e.target.result;
            readString(CSVString, {
                header: true,
                worker: true,
                complete: (results) => {
                    setData(results.data)
                    setHeaders(Object.keys(results.data[0]))
                }
            }
            )

        };
        reader.readAsText(file);
    }

    return (
        <>
            <div className="flex items-center">
                <h1>Import CSV</h1>
                <Label htmlFor="csv">Parse</Label>
                <Input id="csv" type="file" onChange={handleFile} />
            </div>
            <ScrollArea className="h-[800px] rounded-md border overflow-auto">
                {data.length > 0 && (
                    <Table>
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader className="">
                            <TableRow className="sticky top-0 bg-secondary hover:bg-secondary">
                                {headers.map((header) => (
                                    <TableHead key={header}>{header}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow key={index}>
                                    {Object.values(row).map((cell, id) => (
                                        <TableCell key={id}>{cell}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </ScrollArea>
        </>
    )
}