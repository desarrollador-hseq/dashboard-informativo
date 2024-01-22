

import { LogoGrupoHseq } from '@/components/logo-grupo-hseq'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'
import { ConsultCertificateForm } from '../_components/consult-certificate-form'

const ConsultCertificatePage = () => {
  return (
    <div className="bg-slate-50 h-screen">
      <div className="relative p-1 border-b h-[55px] max-h-[70px] w-full bg-primary shadow-sm flex items-center">
        <div className="mx-auto w-full max-w-[1500px] mt-1">
          <div className="mx-3 flex items-center justify-between">
            <div className="p-2 flex gap-1">
              <LogoGrupoHseq  />
            </div>
          </div>
        </div>
      </div>
      <div className="container w-full flex items-start justify-center pt-14 h-fit">
        <Card className="p-3 w-[550px] space-y-4 md:space-y-6 rounded-sm">
          <CardHeader>
            <h2 className="text-2xl  font-bold leading-tight tracking-tight text-slate-500 text-center dark:text-white">
              Consultar certificado
            </h2>
          </CardHeader>
          <CardContent className="space-y-4 md:space-y-6">
              <ConsultCertificateForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ConsultCertificatePage