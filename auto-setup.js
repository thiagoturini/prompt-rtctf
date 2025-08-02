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
        const statusText = document.querySelector('.status-text p');
        const statusBadge = document.querySelector('.status-badge');
        
        if (!statusText || !statusBadge) return;
        
        const hasValidKeys = checkAPIKeys();
        
        if (hasValidKeys) {
            statusText.textContent = 'Sistema com APIs configuradas e funcionando - resultados premium!';
            statusBadge.textContent = 'IA Premium Ativa';
            statusBadge.className = 'status-badge connected';
        } else {
            statusText.innerHTML = 'Sistema usando análise local inteligente. <a href="config-apis.html" style="color: #4CAF50; text-decoration: none; font-weight: bold;">Configure APIs premium aqui</a>';
            statusBadge.textContent = 'Config Needed';
            statusBadge.className = 'status-badge warning';
            statusBadge.style.background = 'linear-gradient(45deg, #ff6b35, #f7931e)';
        }
        
        // Adicionar botão de configuração se não existir
        addConfigButton();
    }
    
    // Adicionar botão de configuração
    function addConfigButton() {
        // Verificar se já existe
        if (document.getElementById('config-apis-btn')) return;
        
        const statusCard = document.querySelector('.ai-status-card');
        if (!statusCard) return;
        
        const configBtn = document.createElement('a');
        configBtn.id = 'config-apis-btn';
        configBtn.href = 'config-apis.html';
        configBtn.innerHTML = '⚙️ Configurar APIs';
        configBtn.style.cssText = `
            position: absolute;
            top: 15px;
            right: 15px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            text-decoration: none;
            padding: 8px 15px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: bold;
            transition: transform 0.3s ease;
        `;
        configBtn.addEventListener('mouseenter', () => {
            configBtn.style.transform = 'translateY(-2px)';
        });
        configBtn.addEventListener('mouseleave', () => {
            configBtn.style.transform = 'translateY(0)';
        });
        
        // Tornar o status-card relativo para posicionamento
        statusCard.style.position = 'relative';
        statusCard.appendChild(configBtn);
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
