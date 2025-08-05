import { useState } from "react";
import { FileUpload } from "./FileUpload";
import { KpiCard } from "./KpiCard";
import { DataPreview } from "./DataPreview";
import { ChartContainer } from "./ChartContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, PieChart, TrendingUp, Users, DollarSign, Target } from "lucide-react";

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [kpis, setKpis] = useState<any[]>([]);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    try {
      // TODO: Process file with backend/edge function
      // For now, simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock data for demonstration
      const mockData = {
        columns: ['Revenue', 'Users', 'Conversion Rate', 'Region', 'Product'],
        rows: [
          [50000, 1200, 3.2, 'North', 'Product A'],
          [65000, 1500, 4.1, 'South', 'Product B'],
          [45000, 980, 2.8, 'East', 'Product A'],
          [78000, 1800, 4.5, 'West', 'Product C'],
        ]
      };
      
      const mockKpis = [
        { title: "Total Revenue", value: 238000, change: 12.5, changeType: "increase", icon: <DollarSign className="h-4 w-4" /> },
        { title: "Total Users", value: 5480, change: 8.2, changeType: "increase", icon: <Users className="h-4 w-4" /> },
        { title: "Avg Conversion", value: "3.65%", change: -2.1, changeType: "decrease", icon: <Target className="h-4 w-4" /> },
        { title: "Growth Rate", value: "15.3%", change: 5.7, changeType: "increase", icon: <TrendingUp className="h-4 w-4" /> },
      ];
      
      setData(mockData);
      setKpis(mockKpis);
    } catch (error) {
      console.error('Error processing file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            VibeBoard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your data into powerful insights with automated analytics and beautiful visualizations
          </p>
        </div>

        {/* File Upload */}
        <div className="max-w-2xl mx-auto">
          <FileUpload onFileUpload={handleFileUpload} isLoading={isLoading} />
        </div>

        {/* Loading State */}
        {isLoading && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Processing your data...</p>
            </CardContent>
          </Card>
        )}

        {/* Dashboard Content */}
        {data && !isLoading && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map((kpi, index) => (
                <KpiCard
                  key={index}
                  title={kpi.title}
                  value={kpi.value}
                  change={kpi.change}
                  changeType={kpi.changeType}
                  icon={kpi.icon}
                />
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartContainer
                title="Revenue by Region"
                icon={<BarChart3 className="h-5 w-5" />}
                type="bar"
                data={data}
              />
              <ChartContainer
                title="Product Distribution"
                icon={<PieChart className="h-5 w-5" />}
                type="pie"
                data={data}
              />
            </div>

            {/* Data Preview */}
            <DataPreview data={data} />

            {/* Export Actions */}
            <div className="flex justify-center space-x-4">
              <Button variant="outline">
                Export to PDF
              </Button>
              <Button variant="outline">
                Export to PPT
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};