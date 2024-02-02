import React from "react";
import { db } from "@/lib/db";
import { Info, LockKeyhole } from "lucide-react";
import { AddCollaboratorForm } from "./_components/add-collaborator-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUploadForm } from "@/components/file-upload-form";
import { Card, CardContent } from "@/components/ui/card";
import { TooltipInfo } from "@/components/tooltip-info";
import { ArchivesLinkForm } from "./_components/archives-link-form";
import { GenerateCertificate } from "./_components/generate-certificate";

const CreateCollaborator = async ({
  params,
}: {
  params: { collaboratorId: string };
}) => {
  const collaborator = await db.collaborator.findUnique({
    where: {
      id: params.collaboratorId,
    },
    include: {
      city: {
        select: {
          realName: true,
        },
      },
    },
  });

  if (!collaborator) {
    params.collaboratorId = "crear";
  }

  const cities = await db.city.findMany({
    orderBy: {
      realName: "asc",
    },
  });

  return (
    <div className="h-fit">
      {collaborator ? (
        <div className="w-full flex flex-col gap-5">
          <Tabs
            defaultValue="info"
            className="w-full flex flex-col items-center "
          >
            <TabsList className="w-[70%] my-2 relative">
              {collaborator.percentage === 0 ? (
                <div className="z-40 absolute top-2 right-2">
                  <TooltipInfo text="El porcentaje de evaluación debe ser diferente de 0% para gestionar las evidencias">
                    <Info className="w-5 h-5 text-white mr-2 z-20" />
                  </TooltipInfo>
                </div>
              ) : (
                <div />
              )}
              <TabsTrigger className="w-full" value="info">
                Información
              </TabsTrigger>

              <TabsTrigger
                className="w-full "
                disabled={collaborator.percentage === 0}
                value="archives"
              >
                <div className="w-full flex justify-between ">
                  {collaborator.percentage === 0 ? (
                    <LockKeyhole className="w-5 h-5 text-white mr-2" />
                  ) : (
                    <div />
                  )}
                  Evidencias
                  <div />
                </div>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="w-full">
              <AddCollaboratorForm
                collaborator={collaborator}
                cities={cities}
              />
            </TabsContent>
            <TabsContent value="archives" className="w-full">
              <div>
                {collaborator && (
                  <Card className="max-h-[1000px] overflow-hidden">
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-5 max-h-[900px] overflow-hidden ">
                        <FileUploadForm
                          apiUrl={`/api/collaborators/${
                            collaborator!.id
                          }/upload`}
                          field="evaluationUrl"
                          label="Registro de evaluación"
                          file={collaborator!.evaluationUrl}
                          ubiPath="colaboradores/evaluaciones"
                        />
                        <ArchivesLinkForm
                          archivesLink={collaborator.archivesLink}
                          collaboratorId={collaborator.id}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
          {collaborator.percentage >= 80 && (
            <GenerateCertificate collaborator={collaborator} />
          )}
        </div>
      ) : (
        <AddCollaboratorForm cities={cities} />
      )}
    </div>
  );
};

export default CreateCollaborator;
