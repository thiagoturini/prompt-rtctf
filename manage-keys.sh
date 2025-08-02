#!/bin/bash

# 🔐 Script para Backup/Restore de Chaves API
# Use antes e depois de commits para não perder configurações

BACKUP_FILE=".api-keys-backup.tmp"

function backup_keys() {
    echo "🔐 Fazendo backup das chaves API..."
    
    # Verificar se há localStorage (simulação via arquivo temporário)
    if [ -f "config.local.js" ]; then
        cp config.local.js $BACKUP_FILE
        echo "✅ Backup salvo em $BACKUP_FILE"
    else
        echo "ℹ️ Nenhuma configuração local encontrada"
    fi
}

function restore_keys() {
    echo "🔄 Restaurando chaves API..."
    
    if [ -f "$BACKUP_FILE" ]; then
        cp $BACKUP_FILE config.local.js
        echo "✅ Chaves restauradas para config.local.js"
        rm $BACKUP_FILE
    else
        echo "ℹ️ Nenhum backup encontrado"
    fi
}

function save_current_keys() {
    echo "💾 Salvando chaves atuais do localStorage para arquivo local..."
    
    # Criar config.local.js baseado nas chaves que você tem
    read -p "🔑 Cole sua chave Groq (ou Enter para pular): " groq_key
    read -p "🔑 Cole sua chave OpenAI (ou Enter para pular): " openai_key
    read -p "🔑 Cole sua chave Claude (ou Enter para pular): " claude_key
    read -p "🔑 Cole sua chave Gemini (ou Enter para pular): " gemini_key
    
    cat > config.local.js << EOF
// 🔐 Configuração Local Segura - Este arquivo é ignorado pelo Git
window.LOCAL_API_KEYS = {
    groq: '${groq_key:-DEMO_KEY}',
    openai: '${openai_key:-DEMO_KEY}',
    anthropic: '${claude_key:-DEMO_KEY}',
    gemini: '${gemini_key:-DEMO_KEY}'
};

// Auto-configurar localStorage quando o arquivo carregar
if (typeof window !== 'undefined') {
    console.log('🔐 Carregando configuração local segura...');
    Object.entries(window.LOCAL_API_KEYS).forEach(([service, key]) => {
        if (key && !key.includes('DEMO')) {
            localStorage.setItem(\`\${service}_api_key\`, key);
            console.log(\`✅ Chave \${service.toUpperCase()} configurada automaticamente\`);
        }
    });
}
EOF
    
    echo "✅ Chaves salvas em config.local.js"
}

# Menu principal
case "$1" in
    "backup")
        backup_keys
        ;;
    "restore") 
        restore_keys
        ;;
    "save")
        save_current_keys
        ;;
    *)
        echo "🔐 Gerenciador de Chaves API"
        echo ""
        echo "Uso:"
        echo "  ./manage-keys.sh backup   - Fazer backup das chaves"
        echo "  ./manage-keys.sh restore  - Restaurar chaves"
        echo "  ./manage-keys.sh save     - Salvar chaves manualmente"
        echo ""
        echo "💡 Workflow recomendado:"
        echo "1. ./manage-keys.sh save     (primeira vez)"
        echo "2. ./manage-keys.sh backup   (antes de commit)"
        echo "3. git add . && git commit   (seu commit normal)"
        echo "4. ./manage-keys.sh restore  (depois de commit)"
        ;;
esac
