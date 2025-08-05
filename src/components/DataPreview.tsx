import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Database } from "lucide-react";

interface DataPreviewProps {
  data: {
    columns: string[];
    rows: any[][];
  };
}

export const DataPreview = ({ data }: DataPreviewProps) => {
  const maxRows = 10; // Show only first 10 rows for preview

  return (
    <Card className="border border-border shadow-sm">
      <CardContent className="p-0">
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                {data.columns.map((column, index) => (
                  <TableHead key={index} className="font-semibold text-foreground py-4 px-6">
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.rows.slice(0, maxRows).map((row, rowIndex) => (
                <TableRow key={rowIndex} className="hover:bg-muted/20 transition-colors">
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex} className="py-4 px-6 text-foreground">
                      {typeof cell === 'number' ? cell.toLocaleString() : cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {data.rows.length > maxRows && (
          <div className="px-6 py-4 border-t border-border bg-muted/20">
            <p className="text-sm text-muted-foreground text-center font-medium">
              Showing {maxRows} of {data.rows.length} rows
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};