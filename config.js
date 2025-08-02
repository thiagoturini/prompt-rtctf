// 🔒 CONFIGURAÇÃO SEGURA DE APIs - GitHub Pages Safe
// Este arquivo NÃO contém chaves reais para manter a segurança

// Sistema de configuração em camadas:
// 1. Primeiro tenta usar chaves do localStorage (configuradas pelo usuário)
// 2. Depois tenta usar config.local.js (arquivo local, ignorado pelo git)  
// 3. Por último usa chaves de demonstração (não funcionais)

window.API_KEYS = {
    // ⚠️ CHAVES DE DEMONSTRAÇÃO - NÃO FUNCIONAIS
    // Para usar o sistema, configure suas próprias chaves em:
    // 👉 config-apis.html (página de configuração)
    openai: 'sk-proj-DEMO_SUBSTITUA_POR_SUA_CHAVE',
    anthropic: 'sk-ant-api03-DEMO_SUBSTITUA_POR_SUA_CHAVE', 
    groq: 'gsk_DEMO_SUBSTITUA_POR_SUA_CHAVE',
    gemini: 'AIzaSy_DEMO_SUBSTITUA_POR_SUA_CHAVE'
};

// Sistema de configuração segura
window.configureAPIs = function() {
    console.log('🔐 Configurando APIs de forma segura...');
    
    // Tentar carregar chaves do localStorage primeiro (mais seguro)
    const savedKeys = {
        openai: localStorage.getItem('openai_api_key'),
        anthropic: localStorage.getItem('anthropic_api_key'),
        groq: localStorage.getItem('groq_api_key'),
        gemini: localStorage.getItem('gemini_api_key')
    };
    
    // Substituir chaves demo pelas salvas localmente
    Object.keys(savedKeys).forEach(key => {
        if (savedKeys[key] && savedKeys[key] !== '' && !savedKeys[key].includes('DEMO')) {
            window.API_KEYS[key] = savedKeys[key];
            console.log(`✅ Chave ${key} carregada do localStorage`);
        }
    });
    
    // Tentar carregar config.local.js se existir (desenvolvimento local)
    if (typeof window.LOCAL_API_KEYS !== 'undefined') {
        Object.assign(window.API_KEYS, window.LOCAL_API_KEYS);
        console.log('✅ Chaves locais carregadas do config.local.js');
    }
    
    // Verificar se há chaves válidas configuradas
    const hasValidKeys = Object.values(window.API_KEYS).some(key => 
        key && !key.includes('DEMO') && !key.includes('SUBSTITUA')
    );
    
    if (!hasValidKeys) {
        console.warn('⚠️ Nenhuma chave de API válida encontrada!');
        console.log('📝 Para configurar:');
        console.log('1. Clique no botão "⚙️ Config APIs" na interface');
        console.log('2. Ou crie um arquivo config.local.js com suas chaves');
        console.log('3. Ou configure via localStorage no script.js');
    } else {
        console.log('🎉 APIs configuradas e prontas para uso!');
    }
};

// Autoconfiguração quando o script carrega
window.configureAPIs();

// Instruções para o usuário
console.log(`
🚀 RTCTF System - Configuração de APIs
=====================================

Para usar as APIs premium:

1️⃣ MÉTODO RECOMENDADO (Interface):
   - Clique em "⚙️ Config APIs" na interface
   - Insira suas chaves de API
   - Elas serão salvas localmente no navegador

2️⃣ MÉTODO DESENVOLVIMENTO (Local):
   - Crie um arquivo "config.local.js" 
   - Adicione: window.LOCAL_API_KEYS = { openai: 'sua-chave', ... }
   - Este arquivo é ignorado pelo git (.gitignore)

3️⃣ APIs Suportadas:
   - OpenAI (GPT-3.5/4) - Melhor qualidade
   - Anthropic (Claude) - Muito rápido  
   - Groq (Mixtral) - 100% gratuito
   - Google Gemini - Backup

🔒 Suas chaves ficam seguras no seu navegador!
`);