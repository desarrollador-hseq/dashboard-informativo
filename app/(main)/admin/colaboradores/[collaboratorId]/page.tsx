import React from "react";
import { db } from "@/lib/db";
import { AddCollaboratorForm } from "./_components/add-collaborator-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUploadForm } from "@/components/file-upload-form";
import { Card, CardContent } from "@/components/ui/card";
import { LockKeyhole } from "lucide-react";
import { TooltipInfo } from "@/components/tooltip-info";

const CreateCollaborator = async ({
  params,
}: {
  params: { collaboratorId: string };
}) => {
  const collaborator = await db.collaborator.findUnique({
    where: {
      id: params.collaboratorId,
    },
  });

  if (!collaborator) {
    params.collaboratorId = "crear";
  }

  const cities = await db.city.findMany({});

  return (
    <div className="h-fit">
      {collaborator ? (
        <div>
          <Tabs
            defaultValue="info"
            className="w-full flex flex-col items-center"
          >
            <TabsList className="w-[70%] my-2">
              <TabsTrigger className="w-full" value="info">
                Información
              </TabsTrigger>

              <TooltipInfo text="El porcentaje de evaluación debe ser diferente de 0% para gestionar las evidencias">
                <TabsTrigger
                  className="w-full"
                  disabled={collaborator.percentage === 0}
                  value="files"
                >
                  <div className="w-full flex justify-between">
                    {collaborator.percentage === 0 && (
                      <LockKeyhole className="w-5 h-5 text-white mr-2" />
                    )}
                    Archivos
                    <div />
                  </div>
                </TabsTrigger>
              </TooltipInfo>
            </TabsList>
            <TabsContent value="info" className="w-full">
              <AddCollaboratorForm
                collaborator={collaborator}
                cities={cities}
              />
            </TabsContent>
            <TabsContent value="files" className="w-full">
              {collaborator && (
                <Card className="max-h-[1000px] overflow-hidden">
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-5 max-h-[900px] overflow-hidden ">
                      <FileUploadForm
                        apiUrl={`/api/collaborators/${collaborator!.id}/upload`}
                        field="certificateUrl"
                        label="Certificado"
                        file={collaborator!.certificateUrl}
                        ubiPath="colaboradores/certificados"
                      />
                      <FileUploadForm
                        apiUrl={`/api/collaborators/${collaborator!.id}/upload`}
                        field="evaluationUrl"
                        label="Registro de evaluación"
                        file={collaborator!.evaluationUrl}
                        ubiPath="colaboradores/evaluaciones"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <AddCollaboratorForm cities={cities} />
      )}
    </div>
  );
};

export default CreateCollaborator;
