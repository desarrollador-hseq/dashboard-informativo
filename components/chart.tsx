


import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Separator } from './ui/separator'
import { Loader2 } from 'lucide-react'
import ReactEcharts from "echarts-for-react";
import { EChartsOption } from 'echarts';




export const Chart = ({option, title}: {option: object; title: string}) => {
  const [isChartLoaded, setIsChartLoaded] = useState(false);

  const onChartReady = () => {
    setTimeout(() => {
      setIsChartLoaded(true);
    }, 500); 
  };


  return (
    <Card>
      <CardHeader>
        <span className="font-bold text-xl">{title}</span>
      </CardHeader>
      <Separator />

      <CardContent className="relative min-h-[300px]">
        {!isChartLoaded && (
          <div className="absolute w-full h-full top-0 bottom-0 right-0 flex justify-center items-center">
            <Loader2 className="w-7 h-7 z-0 animate-spin text-secondary" />
          </div>
        )}
        <ReactEcharts
          className="z-10"
          onChartReady={() => onChartReady()}
          option={option}
        />
      </CardContent>
    </Card>
  )
}
