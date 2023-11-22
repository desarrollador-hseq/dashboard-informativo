"use client";
import React from "react";
import ReactEcharts from "echarts-for-react";
import { Collaborator } from "@prisma/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useDashboard } from "@/components/providers/dashboard-provider";

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

  // Datos procesados para el gráfico
  const { cities, counts } = processDataForBarChart();

  // Opciones del gráfico
  const options = {
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
      interval: 1, // Ajusta este valor según tus necesidades
    },
    series: [
      {
        label: {
          show: false,
          position: "center",
        },
        data: counts,
        itemStyle: {
          color: '#cf5a40', // Reemplaza 'aqui_tu_color' con el color que prefieras
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

  return (
    <Card className="">
      <CardHeader>
        <span className="font-bold text-xl">Colaboradores por ciudad</span>
      </CardHeader>
      <Separator />

      <CardContent>
        <ReactEcharts option={options} />
      </CardContent>
    </Card>
  );
};
