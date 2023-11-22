"use client";
import React from "react";
import ReactEcharts from "echarts-for-react";
import { Inspection } from "@prisma/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface InspectionsReportProps {
  inspections: Inspection[];
}

export const InspectionsExecutedCity = ({
  inspections,
}: InspectionsReportProps) => {
  const countInspectionsByCity = (inspections: Inspection[]) => {
    const counts = inspections.reduce((acc: any, { city, isExecuted }) => {
      if (!acc[city]) {
        acc[city] = { executed: 0, notExecuted: 0 };
      }
      if (isExecuted) {
        acc[city].executed += 1;
      } else {
        acc[city].notExecuted += 1;
      }
      return acc;
    }, {});

    return Object.entries(counts).map(
      ([city, { executed, notExecuted }]: any) => {
        return [city, executed, notExecuted];
      }
    );
  };

  const datasetSource = [
    ["Ciudad", "Ejecutadas", "No Ejecutadas"],
    ...countInspectionsByCity(inspections),
  ];

  const option = {
    legend: {},
    tooltip: {},
    dataset: {
      source:  inspections.length !== 0 ? datasetSource : [],
    },
    xAxis: { type: "category" },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: (value: any) => Math.round(value),
      },
      interval: 1,
    },
    series: [
      { type: "bar", itemStyle: { color: "#cf5a40" } },
      { type: "bar", itemStyle: { color: "#64748b" } },
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
        <span className="font-bold text-xl">Estado de inspecciones por ciudad</span>
      </CardHeader>
      <Separator />

      <CardContent>
        <ReactEcharts option={option} />
      </CardContent>
    </Card>
  );
};
