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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Database className="h-5 w-5" />
          <span>Data Preview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {data.columns.map((column, index) => (
                  <TableHead key={index} className="font-semibold">
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.rows.slice(0, maxRows).map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex} className="text-sm">
                      {typeof cell === 'number' ? cell.toLocaleString() : cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {data.rows.length > maxRows && (
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Showing {maxRows} of {data.rows.length} rows
          </p>
        )}
      </CardContent>
    </Card>
  );
};