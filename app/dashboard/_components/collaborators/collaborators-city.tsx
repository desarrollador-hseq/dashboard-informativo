"use client";

import { Collaborator, City } from "@prisma/client";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { Chart } from "@/components/chart";
import { useState } from "react";

interface CollaboratorWithFormated extends Collaborator {
  city: City | null;
}

interface CollaboratorsReportsProps {
  collaborators: CollaboratorWithFormated[];
}

export const CollaboratorsCity = ({
  collaborators,
}: CollaboratorsReportsProps) => {
  const processDataForBarChart = () => {
    const cityData = collaborators.map((collaborator) => {
      const cityName = collaborator.city?.realName || "desconocida" || "Desconocida";
      const color = collaborator.city ? collaborator.city.color : "#CCCCCC"; // Usa un color gris para ciudades desconocidas
      
      return {
        cityName,
        count: 1, // Ajusta según tu lógica
        color,
      };
    });
  
    const countsByCity = cityData.reduce((acc: any, { cityName, count, color }) => {
      acc[cityName] = (acc[cityName] || 0) + count, color;
      return acc;
    }, {});
  
    const cities = Object.keys(countsByCity);
    const counts = Object.values(countsByCity);
    const colors = cityData.map(({ color }) => color)
  
    return { cities, counts, colors };
  };
  
  const { cities, counts, colors } = processDataForBarChart();

  console.log({cities, counts})


  const col = [
    "#1DACD6", "#6699CC", "#3B3B6D", "#4CB7A5", "#ACE5EE",
    "#00B9FB", "#551B8C", "#9966CC", "#33FFDD", "#841B2D",
    "#C46210", "#8833FF", "#FF3363", "#33FF70", "#FF5733",
    "#33FF57", "#5733FF", "#FF33A1", "#33B8FF", "#FFC733",
    "#6E33FF", "#FF3354", "#33FFDD", "#FF8E33", "#33FF8B",
    "#8833FF", "#FF3363", "#33FF70", "#FF5733", "#33FF57"
  ]

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
        data: cities.map((city, index) => ({
          value: counts[index],
          itemStyle: { color: col[index] },
          name: city,
        })),
        type: "bar",
      },
    ],
    title: {
      show: counts.length === 0,
      textStyle: {
        color: "grey",
        fontSize: 18,
      },
      text: "Sin datos",
      left: "center",
      top: "center",
    },
  };

  return <Chart option={option} title="Número de colaboradores por ciudad" />;
};
