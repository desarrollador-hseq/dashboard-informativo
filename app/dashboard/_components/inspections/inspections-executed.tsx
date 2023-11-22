"use client";
import React from "react";
import ReactEcharts from "echarts-for-react";
import { Inspection } from "@prisma/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface InspectionReportsProps {
  inspections: Inspection[];
}

export const InspectionsExecuted = ({
  inspections,
}: InspectionReportsProps) => {

  
  const countExecutedInspections = () => {
    return inspections.reduce((count, inspection) => {
      if (inspection.isExecuted) {
        return count + 1;
      }
      return count;
    }, 0);
  };

  const executedCount = countExecutedInspections();
  const totalCount = inspections.length;
  const notExecutedCount = totalCount - executedCount;

  const chartData = [
    { value: executedCount, name: 'Ejecutadas' },
    { value: notExecutedCount, name: 'Programadas' }
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
        data: inspections.length !== 0 ? chartData : [],
        color: ["#cf5a40", "#6e7f98"], 
      },
    ],
    title: {
      show: inspections.length === 0,
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
        <span  className="font-bold text-xl">Estado de inspecciones</span>
      </CardHeader>
      <Separator />

      <CardContent>
        <ReactEcharts option={options} />
      </CardContent>
    </Card>
  );
};
