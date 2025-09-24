# Script de Importação para Replit

## Passos para Usar:

### 1. Configurar Replit
- Criar novo Repl Node.js
- Instalar dependência: `npm install @supabase/supabase-js`

### 2. Preparar Arquivos
- Copiar `replit-import-script.js` para o Repl
- Copiar `public/matriz_final_consolidada.json` para o Repl (mesmo diretório)

### 3. Configurar Credenciais
Editar o script e substituir:
```javascript
const SUPABASE_SERVICE_KEY = "SUA_SERVICE_KEY_AQUI";
```

**Onde encontrar a Service Key:**
- Acesse: https://supabase.com/dashboard/project/ehjpdcbyoqaoazknymbj/settings/api
- Copie a "service_role" key (não a anon key)

### 4. Executar
```bash
node replit-import-script.js
```

## O que o Script Faz:

### ✅ Processamento Inteligente:
- Extrai suplementos únicos de todas as condições
- Remove duplicatas baseado em nome + agente
- Categoriza automaticamente os suplementos
- Mapeia níveis de evidência (A/B/D)

### ✅ Importação em Lotes:
- Processa 50 itens por vez para evitar timeouts
- Usa upsert para evitar duplicatas
- Progress logging detalhado
- Tratamento de erros por lote

### ✅ Dados Completos:
- **Suplementos**: Nome, categoria, dosagens, evidências, mecanismos
- **Protocolos**: Combinações, sinergia, eficácia, fases de implementação

### ✅ Compatibilidade:
- Usa exatamente a mesma estrutura do seu banco Supabase
- Mantém todas as funcionalidades do frontend intactas
- IDs consistentes para referências futuras

## Tempo Estimado:
- **Processamento**: ~2-5 minutos
- **Importação**: ~5-10 minutos
- **Total**: ~15 minutos máximo

## Depois da Importação:
1. Verificar dados no Supabase Dashboard
2. Testar funcionalidades no seu app Lovable
3. Deletar o Repl (não precisa mais)

## Troubleshooting:
- **Erro de permissão**: Verificar service key
- **Timeout**: Script já tem retry automático
- **JSON não encontrado**: Verificar nome e localização do arquivo
- **Dados duplicados**: Script usa upsert, é seguro rodar múltiplas vezes