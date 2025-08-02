// 🚀 Sistema de Aviso Discreto para Configuração de APIs
// Mostra um banner sutil na home quando não há chaves configuradas

(function() {
    'use strict';
    
    // Verificar se já tem alguma chave de API configurada
    function checkAPIKeys() {
        const keys = [
            localStorage.getItem('groq_api_key'),
            localStorage.getItem('openai_api_key'),
            localStorage.getItem('anthropic_api_key'),
            localStorage.getItem('gemini_api_key')
        ];
        
        // Verificar se alguma chave é válida (não demo e tem tamanho adequado)
        const validKeys = keys.filter(key => 
            key && 
            !key.includes('DEMO') && 
            !key.includes('SUBSTITUA') && 
            key.length > 20
        );
        
        console.log(`🔍 Chaves válidas encontradas: ${validKeys.length}`);
        return validKeys.length > 0;
    }
    
    // Mostrar banner discreto na home
    function showConfigBanner() {
        // Só mostrar se não tiver chaves válidas
        if (checkAPIKeys()) {
            console.log('✅ APIs já configuradas - banner não necessário');
            return;
        }
        
        // Encontrar onde inserir o banner (depois do header)
        const header = document.querySelector('.header');
        if (!header) return;
        
        // Criar banner de configuração
        const banner = document.createElement('div');
        banner.id = 'config-banner';
        banner.style.cssText = `
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 15px 25px;
            margin: 20px 0;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 15px;
        `;
        
        banner.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <div style="font-size: 24px;">🚀</div>
                <div>
                    <strong style="display: block; font-size: 16px;">Ative IA Premium para Resultados Perfeitos!</strong>
                    <small style="opacity: 0.9;">Configure APIs gratuitas (Groq) ou premium (OpenAI, Claude) para resultados muito melhores</small>
                </div>
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
                <a href="config-apis.html" style="
                    background: rgba(255,255,255,0.2);
                    color: white;
                    text-decoration: none;
                    padding: 8px 16px;
                    border-radius: 6px;
                    font-weight: bold;
                    transition: all 0.3s ease;
                    border: 1px solid rgba(255,255,255,0.3);
                " onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                    ⚙️ Configurar APIs
                </a>
                <button onclick="dismissBanner()" style="
                    background: none;
                    border: none;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                    opacity: 0.7;
                    padding: 5px;
                " title="Dispensar por hoje">
                    ✕
                </button>
            </div>
        `;
        
        // Inserir banner após o header
        header.insertAdjacentElement('afterend', banner);
        
        console.log('📢 Banner de configuração exibido');
    }
    
    // Função global para dispensar banner
    window.dismissBanner = function() {
        const banner = document.getElementById('config-banner');
        if (banner) {
            banner.style.transform = 'translateY(-100%)';
            banner.style.opacity = '0';
            setTimeout(() => banner.remove(), 300);
        }
        
        // Salvar que foi dispensado hoje
        localStorage.setItem('banner_dismissed', new Date().toDateString());
    };
    
    // Verificar se banner foi dispensado hoje
    function wasDismissedToday() {
        const dismissed = localStorage.getItem('banner_dismissed');
        return dismissed === new Date().toDateString();
    }
    
    // Mostrar status atual das APIs na interface
    function updateAPIStatus() {
        const statusElement = document.querySelector('.ai-status-indicator');
        if (!statusElement) return;
        
        const hasValidKeys = checkAPIKeys();
        
        if (hasValidKeys) {
            statusElement.innerHTML = `
                <span style="color: #4CAF50;">🚀 IA Premium Ativada!</span>
                <br><small style="color: #666;">APIs configuradas e funcionando</small>
            `;
        } else {
            statusElement.innerHTML = `
                <span style="color: #ff6b35;">🔬 Análise Local Ativa</span>
                <br><small style="color: #666;">
                    <a href="config-apis.html" style="color: #4CAF50; text-decoration: none;">
                        Configure APIs para IA premium
                    </a>
                </small>
            `;
        }
    }
    
    // Executar quando a página carregar
    document.addEventListener('DOMContentLoaded', function() {
        // Atualizar status das APIs
        updateAPIStatus();
        
        // Mostrar banner apenas se necessário e não foi dispensado hoje
        if (!wasDismissedToday()) {
            setTimeout(showConfigBanner, 1500); // Delay para não interferir com carregamento
        }
    });
    
    // Se já estiver carregado
    if (document.readyState === 'loading') {
        // Ainda carregando, evento já configurado acima
    } else {
        // Já carregado, executar diretamente
        updateAPIStatus();
        if (!wasDismissedToday()) {
            setTimeout(showConfigBanner, 1500);
        }
    }
})();
