"use client";
import React from "react";
import ReactEcharts from "echarts-for-react";
import { Collaborator } from "@prisma/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useDashboard } from "@/components/providers/dashboard-provider";

interface CollaboratorsReportsProps {
  collaborators: Collaborator[];
}

export const CollaboratorFormed = ({
  collaborators,
}: CollaboratorsReportsProps) => {



  const countFormedCollaborators = () => {
    return collaborators.reduce((count, collaborator) => {
      if (collaborator.percentage === 100 && collaborator.evaluationPass) {
        return count + 1;
      }
      return count;
    }, 0);
  };

  const formedCount = countFormedCollaborators();
  const totalCount = collaborators.length;
  const notFormedCount = totalCount - formedCount;

  const chartData = [
    { value: formedCount, name: 'Colaboradores Formados' },
    { value: notFormedCount, name: 'Colaboradores No Formados' }
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
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
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
