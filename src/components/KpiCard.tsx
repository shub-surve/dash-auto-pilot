import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
  icon?: React.ReactNode;
  className?: string;
}

export const KpiCard = ({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon,
  className 
}: KpiCardProps) => {
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      if (val >= 1000000) {
        return `${(val / 1000000).toFixed(1)}M`;
      } else if (val >= 1000) {
        return `${(val / 1000).toFixed(1)}K`;
      }
      return val.toLocaleString();
    }
    return val;
  };

  const getTrendIcon = () => {
    switch (changeType) {
      case "increase":
        return <TrendingUp className="h-4 w-4 text-notion-green" />;
      case "decrease":
        return <TrendingDown className="h-4 w-4 text-notion-red" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = () => {
    switch (changeType) {
      case "increase":
        return "text-notion-green";
      case "decrease":
        return "text-notion-red";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className={cn("border border-border shadow-sm hover:shadow-md transition-all duration-200", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground tracking-wide">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent className="pb-4">
        <div className="text-3xl font-bold text-foreground mb-2 tracking-tight">
          {formatValue(value)}
        </div>
        {change !== undefined && (
          <div className="flex items-center space-x-2">
            {getTrendIcon()}
            <span className={cn("text-sm font-medium", getTrendColor())}>
              {changeType === "increase" ? "+" : changeType === "decrease" ? "-" : ""}{Math.abs(change)}%
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};