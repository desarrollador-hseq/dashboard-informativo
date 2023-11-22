"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import ReactEcharts from "echarts-for-react"; 
import { useResizeDetector } from "react-resize-detector";


export const CollaboratorsCard = () => {
    const { width, ref, height } = useResizeDetector();

    
   const option = {
        title: {
          text: '',
          subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      return (
        <Card className="p-">
            <CardTitle className="p-3">
                {/* <span className="text-primary">user info</span> */}
            </CardTitle>
            <CardContent className="mt-2">

            {/* <ReactEcharts option={option} /> */}
            {/* <iframe className="w-full h-auto" title="test" width="" height="" src="https://app.powerbi.com/reportEmbed?reportId=fea490f0-526b-4fb2-83af-931cc63a722a&autoAuth=true&ctid=984cc2a1-08b4-4e10-b14a-dd79b3604edb" frameBorder={0} allowFullScreen></iframe> */}
           
            {/* <iframe title="Sample Report Demo" className="w-full h-full min-h-[700px]" src="https://playground.powerbi.com/sampleReportEmbed" frameBorder={0} allowFullScreen></iframe> */}
            <iframe title="Report Section" className="w-full h-full min-h-[700px]"  src="https://app.powerbi.com/view?r=eyJrIjoiNDIxYjJlMjktNDcyYi00YTEwLWI2NDMtZWI3OGJjYzkyMTNlIiwidCI6Ijk4NGNjMmExLTA4YjQtNGUxMC1iMTRhLWRkNzliMzYwNGVkYiJ9&pageName=ReportSectiona919ecbd730ab73c0704" frameBorder={0} allowFullScreen></iframe>
            </CardContent>
        </Card >
      ) 
};

