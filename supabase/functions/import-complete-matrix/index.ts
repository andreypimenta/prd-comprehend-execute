import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Auto-execute import on startup
let importExecuted = false

async function autoExecuteImport() {
  if (importExecuted) return
  importExecuted = true
  
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    console.log('🔍 Verificando se importação é necessária...')
    
    // Verificar se já temos dados completos
    const { count: supplementsCount } = await supabase
      .from('supplements')
      .select('*', { count: 'exact', head: true })
    
    const { count: protocolsCount } = await supabase
      .from('therapeutic_protocols')
      .select('*', { count: 'exact', head: true })

    console.log(`📊 Estado atual: ${supplementsCount} suplementos, ${protocolsCount} protocolos`)
    
    // Se temos menos de 500 suplementos ou menos de 50 protocolos, executar importação
    if ((supplementsCount || 0) < 500 || (protocolsCount || 0) < 50) {
      console.log('🚀 Iniciando importação automática completa...')
      await executeCompleteImport(supabase)
    } else {
      console.log('✅ Base de dados já está completa')
    }
  } catch (error) {
    console.error('❌ Erro na auto-execução:', error)
  }
}

async function executeCompleteImport(supabase: any) {

  // Step 1: Preparar dados (upload matrix data)
  console.log('1. 📤 Preparando dados...')
  const { data: prepareData, error: prepareError } = await supabase.functions.invoke('upload-matrix-data', {
    body: { action: 'upload_matrix_data' }
  })
  
  if (prepareError) {
    throw new Error(`Erro na preparação: ${prepareError.message}`)
  }
  
  console.log('✅ Dados preparados:', prepareData)

  // Step 2: Importar suplementos
  console.log('2. 💊 Importando suplementos...')
  const { data: supplementsData, error: supplementsError } = await supabase.functions.invoke('import-supplements', {
    body: { action: 'import_supplements' }
  })
  
  if (supplementsError) {
    throw new Error(`Erro na importação de suplementos: ${supplementsError.message}`)
  }
  
  console.log('✅ Suplementos importados:', supplementsData)

  // Step 3: Importar protocolos
  console.log('3. 📋 Importando protocolos...')
  const { data: protocolsData, error: protocolsError } = await supabase.functions.invoke('import-protocols', {
    body: { action: 'import_protocols' }
  })
  
  if (protocolsError) {
    throw new Error(`Erro na importação de protocolos: ${protocolsError.message}`)
  }
  
  console.log('✅ Protocolos importados:', protocolsData)

  // Consolidar estatísticas
  const stats = {
    totalSupplements: supplementsData?.stats?.total || 0,
    importedSupplements: supplementsData?.stats?.imported || 0,
    skippedSupplements: supplementsData?.stats?.skipped || 0,
    therapeuticProtocols: protocolsData?.stats?.imported || 0,
  }

  console.log('🎉 Importação completa finalizada:', stats)
  return stats
}

// Auto-execute on function startup
autoExecuteImport()

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    console.log('🚀 Executando importação completa via requisição...')
    const stats = await executeCompleteImport(supabase)

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Importação completa finalizada com sucesso',
        stats: stats
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error: any) {
    console.error('❌ Erro na importação completa:', error)
    
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