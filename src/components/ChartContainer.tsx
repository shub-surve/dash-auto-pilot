import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface ChartContainerProps {
  title: string;
  icon?: React.ReactNode;
  type: "bar" | "pie" | "line";
  data: any;
}

export const ChartContainer = ({ title, icon, type, data }: ChartContainerProps) => {
  // Transform data for charts
  const getChartData = () => {
    if (type === "bar") {
      // Group by region and sum revenue
      const regionData: { [key: string]: number } = {};
      data.rows.forEach((row: any[]) => {
        const region = row[3]; // Region column
        const revenue = row[0]; // Revenue column
        regionData[region] = (regionData[region] || 0) + revenue;
      });
      
      return Object.entries(regionData).map(([region, revenue]) => ({
        name: region,
        value: revenue
      }));
    }
    
    if (type === "pie") {
      // Group by product
      const productData: { [key: string]: number } = {};
      data.rows.forEach((row: any[]) => {
        const product = row[4]; // Product column
        productData[product] = (productData[product] || 0) + 1;
      });
      
      return Object.entries(productData).map(([product, count]) => ({
        name: product,
        value: count
      }));
    }
    
    return [];
  };

  const chartData = getChartData();
  const colors = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [value.toLocaleString(), "Revenue"]} />
              <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return <div className="h-[300px] flex items-center justify-center text-muted-foreground">Chart not implemented</div>;
    }
  };

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3 text-lg font-semibold text-foreground">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-6">
        {renderChart()}
      </CardContent>
    </Card>
  );
};