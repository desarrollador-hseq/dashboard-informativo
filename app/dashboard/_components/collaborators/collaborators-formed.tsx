"use client";
import React from "react";
import ReactEcharts from "echarts-for-react";
import { Collaborator } from "@prisma/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useDashboard } from "@/components/providers/dashboard-provider";

interface CollaboratorsReportsProps {
  collaborators: Collaborator[];
  threshold: number
}

export const CollaboratorFormed = ({
  collaborators,
  threshold
}: CollaboratorsReportsProps) => {



  const countFormedCollaborators = () => {
    return collaborators.reduce((count, collaborator) => {
      if (collaborator.percentage >= threshold) {
        return count + 1;
      }
      return count;
    }, 0);
  };

  const formedCount = countFormedCollaborators();
  const totalCount = collaborators.length;
  const notFormedCount = totalCount - formedCount;

  const formedCountValue = (formedCount / totalCount) * 100
  const notFormedCountValue = 100 - formedCountValue;

  const chartData = [
    { value: formedCountValue.toFixed(0) , name: 'Formados' },
    { value: notFormedCountValue.toFixed(0) , name: 'En formación' }
  ];

  const options = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {d}%"
    },
    legend: {
      show: false,
      top: "0%",
      left: "center",   
    },
    series: [
      {
        name: "",
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: true,

          formatter(param: any) {
            // correct the percentage
            return param.name + ' (' + param.value + '%)';
          }
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: true,
        },
        data:  collaborators.length !== 0 ? chartData : [],
        color: ["#cf5a40", "#6e7f98"], 
    
      },
    ],
    title: {
      show: formedCount === 0 && notFormedCount === 0,
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
        <span  className="font-bold text-xl">Colaboradores formados</span>
      </CardHeader>
      <Separator />

      <CardContent>
        <ReactEcharts option={options} />
      </CardContent>
    </Card>
  );
};
