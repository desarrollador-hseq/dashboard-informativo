"use client";

import React, { useState } from "react";
import { Inspection } from "@prisma/client";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Chart } from "@/components/chart";

interface InspectionsReportsProps {
  inspections: Inspection[];
}

export const InspectionsCity = ({ inspections }: InspectionsReportsProps) => {
  const processDataForBarChart = () => {
    const countsByCity = inspections.reduce((acc: any, inspection) => {
      const city = capitalizeFirstLetter(inspection.city) || "Desconocida";
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {});

    const cities = Object.keys(countsByCity);
    const counts = Object.values(countsByCity);

    return { cities, counts };
  };

  const { cities, counts } = processDataForBarChart();

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: cities,
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: (value: any) => Math.round(value),
      },
      interval: 1,
    },
    series: [
      {
        label: {
          show: false,
          position: "center",
        },
        data: counts,
        itemStyle: {
          color: "#4e71b1",
        },
        type: "bar",
      },
    ],
    title: {
      show: counts.length === 0,
      textStyle: {
        color: "grey",
        fontSize: 20,
      },
      text: "Sin datos",
      left: "center",
      top: "center",
    },
  };

  return <Chart option={option} title="Número de inspecciones por ciudad" />;
};
