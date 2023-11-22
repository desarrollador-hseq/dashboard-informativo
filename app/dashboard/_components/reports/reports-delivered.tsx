
"use client";
import React from "react";
import ReactEcharts from "echarts-for-react";
import { Report } from "@prisma/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ReportChartReportsProps {
  reports: Report[];
}

export const ReportsDelivered = ({
    reports,
}: ReportChartReportsProps) => {

  
  const countExecutedInspections = () => {
    return reports.reduce((count, report) => {
      if (report.conformity) {
        return count + 1;
      }
      return count;
    }, 0);
  };

  const executedCount = countExecutedInspections();
  const totalCount = reports.length;
  const notExecutedCount = totalCount - executedCount;

  const chartData = [
    { value: executedCount, name: 'Conformidad' },
    { value: notExecutedCount, name: 'Sin Conformidad' }
  ];

  const options = {
    tooltip: {
      trigger: "item",
    },

    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        type: "pie",
        radius: "50%",
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
            position: "bottom"
            
          },
        },
        labelLine: {
          show: true,
        },
        data: reports.length !== 0 ? chartData : [],
        color: ["#cf5a40", "#6e7f98"], 
      },
    ],
    title: {
      show: reports.length === 0,
      textStyle: {
        color: "grey",
        fontSize: 20,
      },
      text: "Sin datos",
      left: "center",
      top: "center",
    },
  };

  return (
    <Card className="">
      <CardHeader>
        <span  className="font-bold text-xl">Estado de informes</span>
      </CardHeader>
      <Separator />

      <CardContent>
        <ReactEcharts option={options} />
      </CardContent>
    </Card>
  );
};
