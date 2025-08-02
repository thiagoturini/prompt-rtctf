#!/bin/bash

echo "🚀 RTCTF - Configuração Rápida"
echo "================================"
echo ""

# Verificar se config.local.js existe
if [ -f "config.local.js" ]; then
    echo "✅ config.local.js já existe"
else
    echo "📝 Criando config.local.js..."
    
    # Criar arquivo de configuração local
    cat > config.local.js << 'EOF'
// 🔐 Configuração Local Segura - Este arquivo é ignorado pelo Git
// Adicione suas chaves reais aqui - elas não serão enviadas para o GitHub

window.LOCAL_API_KEYS = {
    // Chave Groq (100% gratuita): https://console.groq.com/keys
    groq: 'SUBSTITUA_PELA_SUA_CHAVE_GROQ',
    
    // Outras chaves opcionais:
    openai: 'DEMO_KEY', // https://platform.openai.com/api-keys
    anthropic: 'DEMO_KEY', // https://console.anthropic.com/
    gemini: 'DEMO_KEY' // https://aistudio.google.com/app/apikey
};

// Auto-configurar localStorage quando o arquivo carregar
if (typeof window !== 'undefined') {
    console.log('🔐 Carregando configuração local segura...');
    
    // Salvar chaves no localStorage automaticamente
    Object.entries(window.LOCAL_API_KEYS).forEach(([service, key]) => {
        if (key && !key.includes('DEMO') && !key.includes('SUBSTITUA')) {
            localStorage.setItem(`${service}_api_key`, key);
            console.log(`✅ Chave ${service.toUpperCase()} configurada automaticamente`);
        }
    });
}
EOF
    
    echo "✅ config.local.js criado!"
    echo ""
    echo "📋 PRÓXIMOS PASSOS:"
    echo "1. Edite config.local.js com suas chaves reais"
    echo "2. Execute: python3 -m http.server 8000"
    echo "3. Acesse: http://localhost:8000"
    echo ""
    echo "🔑 CHAVES GRATUITAS:"
    echo "• Groq (recomendado): https://console.groq.com/keys"
    echo "• Outras: Veja o README.md"
fi

echo ""
echo "🌐 ACESSO ONLINE:"
echo "https://thiagoturini.github.io/prompt-rtctf/"
echo ""
echo "🎯 Sistema pronto para uso!"
