"use client";

import { Inspection } from "@prisma/client";
import { Chart } from "@/components/chart";
import { capitalizeFirstLetter } from "@/lib/utils";

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
        return [capitalizeFirstLetter(city), executed, notExecuted];
      }
    );
  };

  const datasetSource = [
    ["Ciudad", "Ejecutadas", "Programadas"],
    ...countInspectionsByCity(inspections),
  ];

  const option = {
    legend: {},
    tooltip: {},
    dataset: {
      source: inspections.length !== 0 ? datasetSource : [],
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
      { type: "bar", itemStyle: { color: "#4e71b1" } },
      { type: "bar", itemStyle: { color: "#bae0fc" } },
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

  return <Chart option={option} title="Estado por ciudades" />;
};
