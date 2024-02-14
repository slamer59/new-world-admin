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


export function GroupPerfoTable({ groupPerfos }: { groupPerfo: any }) {

    // List groupPerfo keys
    const tableHeader = [...new Set([].concat(...groupPerfos.map(Object.keys)))]
    const sums = groupPerfos.reduce((acc: { [x: string]: any; }, obj: { [x: string]: any; }) => {
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
            <TableCaption>A list of your recent perfos.</TableCaption>
            <TableHeader>
                <TableRow>
                    {tableHeader.map((header) => (
                        <TableHead key={header}>{header}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {groupPerfos.map((perfo: any) => (
                    <TableRow key={perfo.name}>
                        {Object.keys(perfo).map((key) => {
                            return <TableCell className="" key={key}>{perfo[key]}
                            </TableCell>
                        }
                        )}
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
