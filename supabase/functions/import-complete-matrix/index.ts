import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    console.log('Iniciando importação completa da matriz...')
    
    // Step 1: Preparar dados (upload matrix data)
    console.log('1. Preparando dados...')
    const { data: prepareData, error: prepareError } = await supabase.functions.invoke('upload-matrix-data', {
      body: { action: 'upload_matrix_data' }
    })
    
    if (prepareError) {
      throw new Error(`Erro na preparação: ${prepareError.message}`)
    }
    
    console.log('Dados preparados:', prepareData)

    // Step 2: Importar suplementos
    console.log('2. Importando suplementos...')
    const { data: supplementsData, error: supplementsError } = await supabase.functions.invoke('import-supplements', {
      body: { action: 'import_supplements' }
    })
    
    if (supplementsError) {
      throw new Error(`Erro na importação de suplementos: ${supplementsError.message}`)
    }
    
    console.log('Suplementos importados:', supplementsData)

    // Step 3: Importar protocolos
    console.log('3. Importando protocolos...')
    const { data: protocolsData, error: protocolsError } = await supabase.functions.invoke('import-protocols', {
      body: { action: 'import_protocols' }
    })
    
    if (protocolsError) {
      throw new Error(`Erro na importação de protocolos: ${protocolsError.message}`)
    }
    
    console.log('Protocolos importados:', protocolsData)

    // Consolidar estatísticas
    const stats = {
      totalSupplements: supplementsData?.stats?.total || 0,
      importedSupplements: supplementsData?.stats?.imported || 0,
      skippedSupplements: supplementsData?.stats?.skipped || 0,
      therapeuticProtocols: protocolsData?.stats?.imported || 0,
    }

    console.log('Importação completa finalizada:', stats)

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Importação completa finalizada com sucesso',
        stats: stats,
        details: {
          prepare: prepareData,
          supplements: supplementsData,
          protocols: protocolsData
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error: any) {
    console.error('Erro na importação completa:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        details: error.stack
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})