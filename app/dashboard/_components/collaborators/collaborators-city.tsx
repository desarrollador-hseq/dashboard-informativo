"use client";

import { Collaborator } from "@prisma/client";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { Chart } from "@/components/chart";

interface CollaboratorsReportsProps {
  collaborators: Collaborator[];
}

export const CollaboratorsCity = ({
  collaborators,
}: CollaboratorsReportsProps) => {
  const processDataForBarChart = () => {
    const countsByCity = collaborators.reduce((acc: any, collaborator) => {
      const city = capitalizeFirstLetter(collaborator.city) || "Desconocida";
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {});

    const cities = Object.keys(countsByCity);
    const counts = Object.values(countsByCity);

    return { cities, counts };
  };

  const { cities, counts } = processDataForBarChart();

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const seriesData = cities.map(() => ({
    value: Math.random() * 100, // Cambia esto según tus datos
    itemStyle: {
      color: generateRandomColor(), // Asignar color aleatorio
    },
  }));
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
        data: seriesData,


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

  return <Chart option={option} title="Número de colaboradores por ciudad" />;
};
