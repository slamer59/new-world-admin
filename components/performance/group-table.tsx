import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Link as LLink } from "lucide-react";
import Link from "next/link";

export function GroupPerfoTable({ groupPerfos, links, title }: { groupPerfos: any, links: any, title?: string }) {
    console.log("🚀 ~ GroupPerfoTable ~ links:", links)
    // List groupPerfo keys
    const tableHeader = [...new Set([].concat(...groupPerfos.map(Object.keys)))]
    const sums = groupPerfos.reduce((acc: any, obj: any) => {
        Object.keys(obj).forEach(key => {
            if (!acc[key]) {
                acc[key] = 0;
            }
            acc[key] += obj[key];
        });
        return acc;
    }, {});
    // Hack
    sums.name = "Total"

    return (
        <Table>
            <TableCaption>{title || "A list of your recent perfos."}</TableCaption>
            <TableHeader>
                <TableRow>
                    {tableHeader.map((header) => (
                        <TableHead className="capitalize" key={header}>{header}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {groupPerfos.map((perfo: any, id: number) => (
                    <TableRow key={perfo.name}>
                        {Object.keys(perfo).map((key) => {
                            return (
                                <TableCell className="" key={key}>
                                    {links?.[id] && key === "name" ? <>

                                        <Link href={links[id].href || ""}>
                                            <LLink className="w-4" />{perfo[key]}
                                        </Link>
                                    </>
                                        : perfo[key]
                                    }

                                </TableCell>
                            );
                        })}
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    {sums && Object.keys(sums).map((key) => {
                        return <TableCell key={key}>{sums[key]}</TableCell>
                    }
                    )}
                </TableRow>
            </TableFooter>
        </Table>
    )
}
