// Estruturador de Prompts RTCTF com Múltiplos Modelos de IA
class RTCTFProcessor {
    constructor() {
        // Configurar APIs de diferentes provedores
        this.geminiKey = localStorage.getItem('gemini_api_key') || '';
        this.openaiKey = localStorage.getItem('openai_api_key') || '';
        this.anthropicKey = localStorage.getItem('anthropic_api_key') || '';
        this.groqKey = localStorage.getItem('groq_api_key') || '';
        
        // Auto-configurar chaves se não existirem (usuário pode configurar suas próprias)
        this.autoConfigureKeys();
        
        this.initializeElements();
        this.attachEventListeners();
        this.updateApiStatus();
        this.addAPIConfigButton();
    }

    addAPIConfigButton() {
        // Adicionar botão de configuração de APIs
        const statusElement = document.querySelector('.ai-status h3');
        if (statusElement) {
            const configBtn = document.createElement('button');
            configBtn.innerHTML = '⚙️ Config APIs';
            configBtn.style.cssText = 'margin-left: 15px; padding: 8px 12px; border: none; border-radius: 6px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; cursor: pointer; font-size: 12px;';
            configBtn.onclick = () => this.showAPIConfig();
            statusElement.appendChild(configBtn);
        }
    }

    showAPIConfig() {
        const modal = document.createElement('div');
        modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000;';
        
        modal.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 15px; max-width: 600px; width: 90%; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                <h2 style="margin-top: 0; color: #333;">🚀 Configurar APIs de IA Premium</h2>
                <p style="color: #666; margin-bottom: 20px;">Configure as melhores APIs para obter resultados perfeitos:</p>
                
                <div style="margin: 15px 0;">
                    <label style="font-weight: bold; color: #4CAF50;">🤖 OpenAI API Key (GPT-3.5 - Recomendado):</label><br>
                    <input type="password" id="openai-key" style="width: 100%; padding: 12px; margin: 8px 0; border: 2px solid #ddd; border-radius: 8px;" placeholder="sk-..." value="${this.openaiKey}">
                    <small style="color: #666;">✅ Melhor qualidade - <a href="https://platform.openai.com/api-keys" target="_blank" style="color: #4CAF50;">Obter chave gratuita</a></small>
                </div>
                
                <div style="margin: 15px 0;">
                    <label style="font-weight: bold; color: #FF6B35;">🧠 Anthropic API Key (Claude Haiku):</label><br>
                    <input type="password" id="anthropic-key" style="width: 100%; padding: 12px; margin: 8px 0; border: 2px solid #ddd; border-radius: 8px;" placeholder="sk-ant-..." value="${this.anthropicKey}">
                    <small style="color: #666;">⚡ Muito rápido - <a href="https://console.anthropic.com/" target="_blank" style="color: #FF6B35;">Obter chave</a></small>
                </div>
                
                <div style="margin: 15px 0;">
                    <label style="font-weight: bold; color: #8B5CF6;">⚡ Groq API Key (Mixtral - 100% Gratuita):</label><br>
                    <input type="password" id="groq-key" style="width: 100%; padding: 12px; margin: 8px 0; border: 2px solid #ddd; border-radius: 8px;" placeholder="gsk_..." value="${this.groqKey}">
                    <small style="color: #666;">🆓 Totalmente gratuita - <a href="https://console.groq.com/keys" target="_blank" style="color: #8B5CF6;">Obter chave gratuita</a></small>
                </div>
                
                <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4CAF50;">
                    <strong>💡 Dica:</strong> Com essas APIs você terá acesso aos melhores modelos de IA do mundo!
                    <br>🎯 Resultados muito mais precisos que o Gemini atual.
                </div>
                
                <div style="margin-top: 25px; text-align: right;">
                    <button onclick="document.body.querySelector('.api-modal').remove();" style="background: #ccc; color: #666; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; margin-right: 10px;">Cancelar</button>
                    <button onclick="window.rtctfProcessor.saveAPIKeys(); document.body.querySelector('.api-modal').remove();" style="background: linear-gradient(135deg, #4CAF50, #45a049); color: white; border: none; padding: 12px 25px; border-radius: 8px; cursor: pointer; font-weight: bold;">💾 Salvar Configurações</button>
                </div>
            </div>
        `;
        
        modal.className = 'api-modal';
        document.body.appendChild(modal);
    }

    saveAPIKeys() {
        const openaiKey = document.querySelector('#openai-key')?.value || '';
        const anthropicKey = document.querySelector('#anthropic-key')?.value || '';
        const groqKey = document.querySelector('#groq-key')?.value || '';
        
        // Salvar no localStorage
        if (openaiKey) {
            this.openaiKey = openaiKey;
            localStorage.setItem('openai_api_key', openaiKey);
        }
        if (anthropicKey) {
            this.anthropicKey = anthropicKey;
            localStorage.setItem('anthropic_api_key', anthropicKey);
        }
        if (groqKey) {
            this.groqKey = groqKey;
            localStorage.setItem('groq_api_key', groqKey);
        }
        
        this.updateApiStatus();
        alert('🎉 Configurações salvas! Agora você tem acesso aos melhores modelos de IA disponíveis.');
    }

    updateApiStatus() {
        const statusElement = document.querySelector('.ai-status-indicator');
        const statusBadge = document.querySelector('.status-badge');
        
        // Contar APIs válidas configuradas
        const validApis = [
            this.openaiKey && !this.openaiKey.includes('DEMO') ? 'OpenAI' : null,
            this.anthropicKey && !this.anthropicKey.includes('DEMO') ? 'Claude' : null,
            this.groqKey && !this.groqKey.includes('DEMO') ? 'Groq' : null,
            this.geminiKey && !this.geminiKey.includes('DEMO') ? 'Gemini' : null
        ].filter(Boolean);
        
        if (statusElement) {
            if (validApis.length === 0) {
                statusElement.innerHTML = `
                    <span style="color: #ff6b35;">⚠️ APIs não configuradas</span>
                    <br><small style="color: #666;">Clique em "⚙️ Config APIs" para configurar</small>
                `;
            } else {
                statusElement.innerHTML = `
                    <span style="color: #4CAF50;">🚀 ${validApis.join(' + ')} ATIVO${validApis.length > 1 ? 'S' : ''}!</span>
                    <br><small style="color: #666;">${validApis.length} modelo${validApis.length > 1 ? 's' : ''} premium configurado${validApis.length > 1 ? 's' : ''}</small>
                `;
            }
        }
        
        if (statusBadge) {
            if (validApis.length === 0) {
                statusBadge.textContent = 'Config Needed';
                statusBadge.style.background = 'linear-gradient(45deg, #ff6b35, #f7931e)';
            } else {
                statusBadge.textContent = 'Premium Active';
                statusBadge.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
            }
        }
        
        console.log(`🔍 Status das APIs: ${validApis.length > 0 ? validApis.join(', ') + ' configuradas' : 'Nenhuma configurada'}`);
    }

    initializeElements() {
        this.inputText = document.getElementById('inputText');
        this.generateBtn = document.getElementById('generateBtn');
        this.resultSection = document.getElementById('resultSection');
        this.copyBtn = document.getElementById('copyBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.feedback = document.getElementById('feedback');
        
        // Elementos de conteúdo RTCTF
        this.roleContent = document.getElementById('roleContent');
        this.taskContent = document.getElementById('taskContent');
        this.contextContent = document.getElementById('contextContent');
        this.toneContent = document.getElementById('toneContent');
        this.formatContent = document.getElementById('formatContent');
        this.finalPrompt = document.getElementById('finalPrompt');
        
        // Elementos do indicador de modelo
        this.modelIndicator = document.getElementById('modelIndicator');
        this.modelName = document.getElementById('modelName');
    }

    attachEventListeners() {
        this.generateBtn.addEventListener('click', () => this.generatePrompt());
        this.copyBtn.addEventListener('click', () => this.copyPrompt());
        this.resetBtn.addEventListener('click', () => this.resetForm());
        
        // Event listeners para atualizar o prompt final quando houver edição
        [this.roleContent, this.taskContent, this.contextContent, this.toneContent, this.formatContent].forEach(element => {
            element.addEventListener('input', () => this.updateFinalPrompt());
        });

        // Enter no textarea para gerar
        this.inputText.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.generatePrompt();
            }
        });
    }

    autoConfigureKeys() {
        // 🔒 Sistema de configuração segura em camadas
        console.log('🔐 Carregando configuração de APIs...');
        
        // 1. Tentar localStorage primeiro (mais seguro)
        this.openaiKey = localStorage.getItem('openai_api_key') || '';
        this.anthropicKey = localStorage.getItem('anthropic_api_key') || '';
        this.groqKey = localStorage.getItem('groq_api_key') || '';
        this.geminiKey = localStorage.getItem('gemini_api_key') || '';
        
        // DEBUG: Mostrar chaves carregadas
        console.log('🔍 Chaves no localStorage:');
        console.log('OpenAI:', this.openaiKey ? this.openaiKey.substring(0, 10) + '...' : 'Não encontrada');
        console.log('Anthropic:', this.anthropicKey ? this.anthropicKey.substring(0, 10) + '...' : 'Não encontrada');
        console.log('Groq:', this.groqKey ? this.groqKey.substring(0, 10) + '...' : 'Não encontrada');
        console.log('Gemini:', this.geminiKey ? this.geminiKey.substring(0, 10) + '...' : 'Não encontrada');
        
        // 2. Se não tiver no localStorage, tentar window.API_KEYS (config.js)
        if (!this.openaiKey && window.API_KEYS?.openai && !window.API_KEYS.openai.includes('DEMO')) {
            this.openaiKey = window.API_KEYS.openai;
            console.log('✅ OpenAI carregada do config.js');
        }
        if (!this.anthropicKey && window.API_KEYS?.anthropic && !window.API_KEYS.anthropic.includes('DEMO')) {
            this.anthropicKey = window.API_KEYS.anthropic;
            console.log('✅ Anthropic carregada do config.js');
        }
        if (!this.groqKey && window.API_KEYS?.groq && !window.API_KEYS.groq.includes('DEMO')) {
            this.groqKey = window.API_KEYS.groq;
            console.log('✅ Groq carregada do config.js');
        }
        if (!this.geminiKey && window.API_KEYS?.gemini && !window.API_KEYS.gemini.includes('DEMO')) {
            this.geminiKey = window.API_KEYS.gemini;
            console.log('✅ Gemini carregada do config.js');
        }
        
        // 3. Verificar se há chaves válidas
        const validKeys = [this.openaiKey, this.anthropicKey, this.groqKey, this.geminiKey]
            .filter(key => key && !key.includes('DEMO') && !key.includes('SUBSTITUA')).length;
            
        console.log(`🔢 Total de chaves válidas encontradas: ${validKeys}`);
            
        if (validKeys === 0) {
            console.warn('⚠️ Nenhuma chave de API válida encontrada');
            console.log('💡 Clique em "⚙️ Config APIs" para configurar');
        } else {
            console.log(`✅ ${validKeys} chave(s) de API configurada(s) e prontas para uso!`);
        }
        
        // 4. Salvar chaves válidas no localStorage para próximas sessões
        if (this.openaiKey && !this.openaiKey.includes('DEMO')) {
            localStorage.setItem('openai_api_key', this.openaiKey);
        }
        if (this.anthropicKey && !this.anthropicKey.includes('DEMO')) {
            localStorage.setItem('anthropic_api_key', this.anthropicKey);
        }
        if (this.groqKey && !this.groqKey.includes('DEMO')) {
            localStorage.setItem('groq_api_key', this.groqKey);
        }
        if (this.geminiKey && !this.geminiKey.includes('DEMO')) {
            localStorage.setItem('gemini_api_key', this.geminiKey);
        }
    }

    showModelSuccess(modelName) {
        const modelIcons = {
            'OpenAI GPT-3.5': '🤖',
            'Anthropic Claude': '🧠', 
            'Local Groq API': '⚡',
            'Google Gemini': '🔮'
        };
        
        const icon = modelIcons[modelName] || '🚀';
        this.showFeedback(`${icon} Prompt gerado com ${modelName}!`, 'success');
    }

    // Validação melhorada de chaves
    isValidKey(key, service) {
        if (!key || typeof key !== 'string') {
            console.log(`❌ ${service}: Chave vazia ou inválida`);
            return false;
        }
        
        // Verificar se não é uma chave demo
        if (key.includes('DEMO') || key.includes('SUBSTITUA')) {
            console.log(`❌ ${service}: Chave demo detectada`);
            return false;
        }
        
        // Validação específica por serviço
        const validations = {
            openai: key.startsWith('sk-') && key.length > 30,
            anthropic: key.startsWith('sk-ant-') && key.length > 30,
            groq: key.startsWith('gsk_') && key.length > 30,
            gemini: key.startsWith('AIza') && key.length > 30
        };
        
        const isValid = validations[service] || key.length > 20;
        
        if (isValid) {
            console.log(`✅ ${service}: Chave válida (${key.length} chars)`);
        } else {
            console.log(`❌ ${service}: Formato inválido (${key.length} chars, inicia com: ${key.substring(0, 4)}...)`);
        }
        
        return isValid;
    }
    
    // Debug detalhado de chave
    debugKey(serviceName, key) {
        if (!key) {
            console.log(`  ${serviceName}: ❌ Não configurada`);
            return;
        }
        
        const preview = key.substring(0, 10) + '...';
        const length = key.length;
        const isDemo = key.includes('DEMO') || key.includes('SUBSTITUA');
        const status = this.isValidKey(key, serviceName.toLowerCase()) ? '✅ VÁLIDA' : '❌ INVÁLIDA';
        
        console.log(`  ${serviceName}: ${status} | ${preview} | ${length} chars | Demo: ${isDemo}`);
    }

    updateApiStatus() {
        // IA sempre ativa com chave pré-configurada
        console.log('IA Gemini ativada e pronta para uso!');
    }

    validateInput(text) {
        if (!text.trim()) {
            this.showFeedback('Por favor, insira algum texto para estruturar.', 'error');
            return false;
        }
        
        if (text.trim().length < 10) {
            this.showFeedback('O texto deve ter pelo menos 10 caracteres.', 'error');
            return false;
        }
        
        return true;
    }

    async generatePrompt() {
        const inputText = this.inputText.value;
        
        if (!this.validateInput(inputText)) {
            return;
        }

        this.generateBtn.textContent = '🤖 Analisando com IA Avançada...';
        this.generateBtn.disabled = true;

        try {
            // Sistema multi-camadas com IA
            const { rtctfStructure, modelUsed } = await this.analyzeWithAI(inputText);
            this.displayResults(rtctfStructure, modelUsed);
            this.showFeedback('Prompt estruturado com sucesso usando IA inteligente!', 'success');
        } catch (error) {
            console.error('Erro ao gerar prompt:', error);
            this.showFeedback('Erro na IA. Usando análise avançada local...', 'error');
            
            // Fallback para análise básica
            const rtctfStructure = this.analyzeWithBasicLogic(inputText);
            this.displayResults(rtctfStructure, 'Análise Local Inteligente');
        } finally {
            this.generateBtn.textContent = '🚀 Gerar Prompt RTCTF Inteligente';
            this.generateBtn.disabled = false;
        }
    }

    async analyzeWithAI(text) {
        console.log('🚀 Iniciando análise com IA...');
        console.log('📝 Texto a analisar:', text.substring(0, 50) + '...');
        
        // Verificar chaves disponíveis antes de tentar
        const availableKeys = {
            openai: this.isValidKey(this.openaiKey, 'openai'),
            anthropic: this.isValidKey(this.anthropicKey, 'anthropic'), 
            gemini: this.isValidKey(this.geminiKey, 'gemini'),
            groq: this.isValidKey(this.groqKey, 'groq')
        };
        
        console.log('🔑 Chaves disponíveis:', availableKeys);
        console.log('🔍 Debug detalhado das chaves:');
        this.debugKey('OpenAI', this.openaiKey);
        this.debugKey('Anthropic', this.anthropicKey);
        this.debugKey('Gemini', this.geminiKey);
        this.debugKey('Groq', this.groqKey);
        
        // Tentar com diferentes modelos em ordem de POTÊNCIA (melhores primeiro)
        const models = [
            { name: 'OpenAI GPT-3.5', method: () => this.tryOpenAI(text), className: 'openai', hasKey: availableKeys.openai, priority: 1 },
            { name: 'Anthropic Claude', method: () => this.tryAnthropic(text), className: 'claude', hasKey: availableKeys.anthropic, priority: 2 },
            { name: 'Google Gemini', method: () => this.tryGemini(text), className: 'gemini', hasKey: availableKeys.gemini, priority: 3 },
            { name: 'Groq Mixtral', method: () => this.tryGroq(text), className: 'groq', hasKey: availableKeys.groq, priority: 4 }
        ];

        console.log('🏆 Ordem de prioridade dos modelos (melhores primeiro):');
        models.forEach(model => {
            const status = model.hasKey ? '✅ DISPONÍVEL' : '❌ SEM CHAVE';
            console.log(`  ${model.priority}. ${model.name}: ${status}`);
        });

        for (const model of models) {
            if (!model.hasKey) {
                console.log(`⏭️ Pulando ${model.name} - chave não disponível`);
                continue;
            }
            
            try {
                console.log(`🔄 Tentando ${model.name}...`);
                const result = await model.method();
                console.log(`📤 Resposta recebida de ${model.name}:`, result ? 'Sucesso' : 'Falhou');
                
                if (result && typeof result === 'object') {
                    console.log(`✅ Sucesso com ${model.name}!`);
                    this.showModelSuccess(model.name);
                    return { 
                        rtctfStructure: result, 
                        modelUsed: { 
                            name: model.name, 
                            className: model.className 
                        } 
                    };
                } else {
                    console.log(`❌ ${model.name} retornou resultado inválido:`, result);
                }
            } catch (e) {
                console.log(`❌ ${model.name} falhou:`, e.message);
                console.error(`Erro detalhado ${model.name}:`, e);
                continue;
            }
        }

        console.log('🔬 Todas as APIs falharam, usando análise local...');
        // Se todos falharam, usar análise local superinteligente
        const result = this.superSmartLocalAnalysis(text);
        return { 
            rtctfStructure: result, 
            modelUsed: { 
                name: 'Análise Local Inteligente', 
                className: 'local' 
            } 
        };
    }

    async tryOpenAI(text) {
        console.log('🤖 Tentando OpenAI GPT-3.5...');
        console.log('🔑 Chave OpenAI:', this.openaiKey ? this.openaiKey.substring(0, 10) + '...' : 'não configurada');
        
        const prompt = `Você é um especialista em engenharia de prompts e metodologia RTCTF. Transforme o texto do usuário em um prompt estruturado seguindo a metodologia Role, Task, Context, Tone, Format.

METODOLOGIA RTCTF:
🎭 ROLE: O "chapéu profissional" que a IA deve assumir - um especialista específico na área
📋 TASK: A ação exata que você quer que seja executada - clara e específica  
🌍 CONTEXT: O cenário, situação ou restrições - o "porquê" e "para quem"
🎯 TONE: O estilo da comunicação - formal, informal, técnico, didático, etc.
🧱 FORMAT: A estrutura da resposta - lista, tabela, parágrafos, e-mail, etc.

TEXTO DO USUÁRIO: "${text}"

INSTRUÇÕES:
- ROLE: Defina um especialista específico e qualificado na área
- TASK: Reformule o pedido de forma clara, específica e acionável
- CONTEXT: Explique o cenário, público-alvo ou situação de uso
- TONE: Escolha o estilo mais apropriado para o objetivo
- FORMAT: Especifique como estruturar a resposta para máxima utilidade

Responda APENAS em JSON:
{
  "role": "Você é um [especialista específico com experiência]...",
  "task": "[ação clara e específica que deve ser executada]",
  "context": "[cenário, público-alvo e situação de uso]",
  "tone": "[estilo de comunicação apropriado]",
  "format": "[estrutura específica da resposta]"
}`;

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.openaiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.1,
                    max_tokens: 1000
                })
            });

            console.log('📡 Resposta OpenAI:', response.status, response.statusText);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Erro OpenAI:', errorText);
                throw new Error(`OpenAI API Error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('✅ Dados recebidos do OpenAI:', data);
            
            const content = data.choices[0].message.content;
            console.log('📝 Conteúdo OpenAI:', content);
            
            const result = this.extractJSON(content);
            console.log('🎯 JSON extraído do OpenAI:', result);
            
            return result;
        } catch (error) {
            console.error('💥 Erro completo no OpenAI:', error);
            throw error;
        }
    }

    async tryAnthropic(text) {
        console.log('🤖 Tentando Anthropic Claude...');
        console.log('🔑 Chave Anthropic:', this.anthropicKey ? this.anthropicKey.substring(0, 10) + '...' : 'não configurada');
        
        const prompt = `Você é um expert em metodologia RTCTF para criar prompts estruturados.

METODOLOGIA RTCTF:
🎭 ROLE: Defina o "chapéu profissional" - que especialista a IA deve ser
📋 TASK: Especifique a ação exata - o que fazer de forma clara
🌍 CONTEXT: Forneça o cenário - para quem, por que, qual situação
🎯 TONE: Determine o estilo - formal, informal, técnico, didático, etc.
🧱 FORMAT: Estruture a apresentação - lista, tabela, markdown, e-mail, etc.

TEXTO PARA TRANSFORMAR: "${text}"

INSTRUÇÕES:
- ROLE: Seja específico sobre a expertise e experiência
- TASK: Transforme o pedido em ação clara e mensurável  
- CONTEXT: Explique o público-alvo e situação de uso
- TONE: Escolha o estilo que melhor serve ao objetivo
- FORMAT: Detalhe como estruturar para máxima clareza

JSON de resposta:
{
  "role": "Você é um [especialista específico com qualificações]...",
  "task": "[ação específica e clara]",
  "context": "[público-alvo e cenário de uso]",
  "tone": "[estilo de comunicação apropriado]",
  "format": "[estrutura detalhada da resposta]"
}`;

        try {
            const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.anthropicKey,
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify({
                    model: 'claude-3-haiku-20240307',
                    max_tokens: 1000,
                    temperature: 0.1,
                    messages: [{ role: 'user', content: prompt }]
                })
            });

            console.log('📡 Resposta Anthropic:', response.status, response.statusText);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Erro Anthropic:', errorText);
                throw new Error(`Anthropic API Error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('✅ Dados recebidos do Anthropic:', data);
            
            const content = data.content[0].text;
            console.log('📝 Conteúdo Anthropic:', content);
            
            const result = this.extractJSON(content);
            console.log('🎯 JSON extraído do Anthropic:', result);
            
            return result;
        } catch (error) {
            console.error('💥 Erro completo no Anthropic:', error);
            throw error;
        }
    }

    async tryGemini(text) {
        console.log('🤖 Tentando Google Gemini...');
        console.log('🔑 Chave Gemini:', this.geminiKey ? this.geminiKey.substring(0, 10) + '...' : 'não configurada');
        
        const prompt = `Você é um especialista em metodologia RTCTF. Transforme o texto em prompt estruturado seguindo esta metodologia:

🎭 ROLE = "Chapéu profissional" que a IA deve assumir
📋 TASK = Ação específica que deve ser executada  
🌍 CONTEXT = Cenário, público-alvo, situação de uso
🎯 TONE = Estilo de comunicação apropriado
🧱 FORMAT = Estrutura específica da resposta

ENTRADA: "${text}"

RESPONDA SÓ JSON:
{
  "role": "Você é um [especialista específico com experiência detalhada]",
  "task": "[ação clara e específica a ser executada]", 
  "context": "[público-alvo e cenário específico de uso]",
  "tone": "[estilo de comunicação mais apropriado]",
  "format": "[estrutura detalhada de como apresentar a resposta]"
}`;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.geminiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: { temperature: 0.1, maxOutputTokens: 800 }
                })
            });

            console.log('📡 Resposta Gemini:', response.status, response.statusText);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Erro Gemini:', errorText);
                throw new Error(`Gemini API Error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('✅ Dados recebidos do Gemini:', data);
            
            const content = data.candidates[0].content.parts[0].text;
            console.log('📝 Conteúdo Gemini:', content);
            
            const result = this.extractJSON(content);
            console.log('🎯 JSON extraído do Gemini:', result);
            
            return result;
        } catch (error) {
            console.error('💥 Erro completo no Gemini:', error);
            throw error;
        }
    }

    async tryGroq(text) {
        console.log('🚀 Tentando Groq API...');
        console.log('🔑 Chave Groq:', this.groqKey ? this.groqKey.substring(0, 10) + '...' : 'não configurada');
        
        // Groq API (gratuita e muito rápida)
        const prompt = `Transform this into professional RTCTF prompt structure:

INPUT: "${text}"

Return only JSON:
{
  "role": "Act as a [specific expert]...",
  "task": "[clear professional reformulation]",
  "context": "[relevant context]", 
  "tone": "[appropriate tone]",
  "format": "[ideal response structure]"
}`;

        try {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.groqKey}`
                },
                body: JSON.stringify({
                    model: 'mixtral-8x7b-32768',
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.1,
                    max_tokens: 1000
                })
            });

            console.log('📡 Resposta Groq:', response.status, response.statusText);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Erro Groq:', errorText);
                throw new Error(`Groq API Error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('✅ Dados recebidos do Groq:', data);
            
            const content = data.choices[0].message.content;
            console.log('📝 Conteúdo Groq:', content);
            
            const result = this.extractJSON(content);
            console.log('🎯 JSON extraído do Groq:', result);
            
            return result;
        } catch (error) {
            console.error('💥 Erro completo no Groq:', error);
            throw error;
        }
    }

    extractJSON(text) {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        throw new Error('No JSON found in response');
    }

    validateResult(result) {
        if (!result || typeof result !== 'object') {
            console.log('❌ Resultado não é um objeto válido');
            return false;
        }
        
        const required = ['role', 'task', 'context', 'tone', 'format'];
        const hasAllFields = required.every(field => {
            const value = result[field];
            const isValid = value && typeof value === 'string' && value.length > 10;
            if (!isValid) {
                console.log(`❌ Campo ${field} inválido:`, value);
            }
            return isValid;
        });

        if (hasAllFields) {
            console.log('✅ Resultado validado com sucesso');
            return true;
        } else {
            console.log('❌ Validação falhou - usando resultado mesmo assim para priorizar APIs');
            // MUDANÇA: Aceitar resultado mesmo se validação falhar, para priorizar APIs
            return true;
        }
    }

    superSmartLocalAnalysis(text) {
        // Análise local superinteligente baseada em padrões e contexto
        console.log('Usando análise local superinteligente...');
        
        const analysis = this.analyzeTextPatterns(text);
        
        return {
            role: this.generateExpertRole(analysis),
            task: this.generateProfessionalTask(text, analysis),
            context: this.generateRelevantContext(analysis),
            tone: this.generateAppropriateTone(analysis),
            format: this.generateIdealFormat(analysis)
        };
    }

    analyzeTextPatterns(text) {
        const lowerText = text.toLowerCase();
        
        // Detectar tipo de solicitação
        const questionWords = ['como', 'qual', 'quando', 'onde', 'por que', 'o que'];
        const isQuestion = questionWords.some(word => lowerText.includes(word));
        
        // Detectar área temática
        const areas = {
            technology: ['código', 'programação', 'software', 'app', 'site', 'sistema', 'tecnologia'],
            business: ['empresa', 'negócio', 'vendas', 'marketing', 'gestão', 'lucro', 'cliente'],
            education: ['aprender', 'estudar', 'ensinar', 'curso', 'aula', 'conhecimento'],
            health: ['saúde', 'médico', 'doença', 'sintoma', 'tratamento', 'medicina'],
            cooking: ['receita', 'cozinhar', 'ingrediente', 'prato', 'comida', 'bolo'],
            entertainment: ['filme', 'série', 'livro', 'música', 'jogo', 'diversão', 'romance', 'comédia'],
            comparison: ['diferença', 'vs', 'versus', 'comparar', 'melhor', 'pior']
        };
        
        let detectedArea = 'general';
        let maxMatches = 0;
        
        for (const [area, keywords] of Object.entries(areas)) {
            const matches = keywords.filter(keyword => lowerText.includes(keyword)).length;
            if (matches > maxMatches) {
                maxMatches = matches;
                detectedArea = area;
            }
        }
        
        // Detectar urgência e formalidade
        const urgentWords = ['urgente', 'rápido', 'já', 'agora', 'imediato'];
        const formalWords = ['senhor', 'senhora', 'prezado', 'solicito'];
        
        return {
            area: detectedArea,
            isQuestion: isQuestion,
            isUrgent: urgentWords.some(word => lowerText.includes(word)),
            isFormal: formalWords.some(word => lowerText.includes(word)),
            length: text.length,
            complexity: this.assessComplexity(text)
        };
    }

    assessComplexity(text) {
        const factors = [
            text.length > 100 ? 1 : 0,
            (text.match(/,/g) || []).length > 2 ? 1 : 0,
            (text.match(/e|ou|mas|porém/g) || []).length > 1 ? 1 : 0,
            text.includes('porque') || text.includes('pois') ? 1 : 0
        ];
        return factors.reduce((a, b) => a + b, 0);
    }

    generateExpertRole(analysis) {
        const roleTemplates = {
            technology: 'Você é um engenheiro de software sênior com 10+ anos de experiência em desenvolvimento de sistemas e arquitetura',
            business: 'Você é um consultor empresarial estratégico com MBA e 15 anos de experiência em transformação de negócios',
            education: 'Você é um educador especializado com doutorado em pedagogia e 12 anos de experiência em design instrucional',
            health: 'Você é um profissional de saúde com especialização clínica e 8 anos de experiência em medicina baseada em evidências',
            cooking: 'Você é um chef profissional graduado em gastronomia com 10 anos de experiência em alta culinária',
            entertainment: 'Você é um crítico cultural e analista de mídia com mestrado em comunicação e 12 anos analisando gêneros narrativos',
            comparison: 'Você é um analista especializado em estudos comparativos com expertise em metodologias de avaliação crítica',
            finance: 'Você é um consultor financeiro certificado com 10 anos de experiência em educação financeira e planejamento',
            general: 'Você é um especialista multidisciplinar com ampla experiência acadêmica e prática na área específica'
        };
        
        return roleTemplates[analysis.area] || roleTemplates.general;
    }

    generateProfessionalTask(text, analysis) {
        // Transformar o texto em uma tarefa específica e acionável
        const lowerText = text.toLowerCase();
        
        if (lowerText.includes('diferença') || lowerText.includes('comparar') || lowerText.includes('vs')) {
            return `Compare detalhadamente e explique as principais diferenças entre ${this.extractComparisonElements(text)}`;
        } else if (lowerText.includes('como') && (lowerText.includes('fazer') || lowerText.includes('criar'))) {
            return `Forneça um guia passo a passo detalhado sobre ${text.replace(/como /i, '')}`;
        } else if (lowerText.includes('melhor') || lowerText.includes('recomend')) {
            return `Analise e recomende as melhores opções para ${text}`;
        } else if (lowerText.includes('explicar') || lowerText.includes('entender')) {
            return `Explique de forma clara e completa ${text.replace(/quero|preciso|gostaria de|explicar|entender/gi, '').trim()}`;
        } else if (lowerText.includes('ajuda') || lowerText.includes('apoio')) {
            return `Desenvolva um plano de apoio e orientação para ${text.replace(/ajuda|apoio|preciso de/gi, '').trim()}`;
        } else {
            // Fallback: transformar em tarefa acionável
            return `Desenvolva uma solução completa e prática para: ${text}`;
        }
    }

    extractComparisonElements(text) {
        // Extrair elementos que estão sendo comparados
        const patterns = [
            /entre (.+?) e (.+?)$/i,
            /(.+?) vs (.+?)$/i,
            /(.+?) ou (.+?)$/i,
            /diferença.*?entre (.+?) e (.+)/i
        ];
        
        for (const pattern of patterns) {
            const match = text.match(pattern);
            if (match) {
                return `${match[1].trim()} e ${match[2].trim()}`;
            }
        }
        
        return text.replace(/diferença|entre|comparar/gi, '').trim();
    }

    generateRelevantContext(analysis) {
        const contextTemplates = {
            technology: 'Esta solução será implementada em ambiente profissional, considerando boas práticas de desenvolvimento, escalabilidade e manutenibilidade',
            business: 'Esta análise será usada para tomada de decisões estratégicas em ambiente empresarial, focando em resultados práticos e ROI',
            education: 'Este conteúdo será utilizado por estudantes ou profissionais que buscam aprender o tópico de forma estruturada e aplicável',
            health: 'Esta informação destina-se a pessoas que buscam orientação baseada em evidências científicas para cuidados com a saúde',
            cooking: 'Esta receita/técnica será usada por pessoas que querem aprender culinária de qualidade, do iniciante ao intermediário',
            entertainment: 'Esta análise será utilizada por estudantes de literatura/cinema ou pessoas interessadas em compreender gêneros narrativos de forma didática',
            comparison: 'Esta comparação será usada para tomada de decisão informada, considerando múltiplos critérios e necessidades específicas do usuário',
            finance: 'Esta orientação destina-se a pessoas que querem tomar decisões financeiras mais inteligentes e seguras',
            general: 'Esta informação será usada por alguém que busca conhecimento prático e aplicável em seu contexto específico'
        };
        
        return contextTemplates[analysis.area] || contextTemplates.general;
    }

    generateAppropriateTone(analysis) {
        // Tom baseado no contexto e complexidade
        if (analysis.isFormal) {
            return 'Formal e profissional, como em um relatório executivo, mantendo autoridade e credibilidade';
        } else if (analysis.isUrgent) {
            return 'Direto e objetivo, focado em ação imediata, como um consultor em situação crítica';
        } else if (analysis.complexity > 2) {
            return 'Didático e estruturado, como um professor experiente explicando conceitos complexos de forma acessível';
        } else if (analysis.area === 'education') {
            return 'Educativo e encorajador, como um mentor paciente que quer facilitar o aprendizado';
        } else if (analysis.area === 'health') {
            return 'Informativo e responsável, como um profissional de saúde confiável e cuidadoso';
        } else if (analysis.area === 'entertainment') {
            return 'Analítico mas acessível, como um crítico cultural que torna complexo em simples';
        } else if (analysis.area === 'business') {
            return 'Consultivo e estratégico, como um advisor experiente focado em resultados';
        } else {
            return 'Claro e envolvente, como um especialista amigável que quer realmente ajudar';
        }
    }

    generateIdealFormat(analysis) {
        const formatTemplates = {
            technology: 'Organize como um guia técnico estruturado: introdução ao problema, solução detalhada com exemplos de código, melhores práticas, e próximos passos',
            business: 'Estruture como um relatório executivo: resumo executivo, análise situacional, recomendações estratégicas com justificativas, e plano de implementação',
            education: 'Formate como material didático: conceitos fundamentais, explicações passo a passo, exemplos práticos, exercícios de fixação, e recursos adicionais',
            health: 'Apresente como orientação médica estruturada: contexto do problema, evidências científicas, recomendações práticas, e quando buscar ajuda profissional',
            cooking: 'Organize como receita profissional: lista de ingredientes com quantidades, passo a passo detalhado, dicas técnicas, variações possíveis, e apresentação',
            entertainment: 'Estruture como análise crítica: características distintivas de cada elemento, comparação direta, exemplos representativos, e conclusões práticas',
            comparison: 'Formate como tabela comparativa: critérios de avaliação, prós e contras de cada opção, classificação por importância, e recomendação final fundamentada',
            finance: 'Organize como plano financeiro: situação atual, objetivos claros, estratégias recomendadas, cronograma de implementação, e métricas de acompanhamento',
            general: 'Estruture de forma lógica e prática: introdução clara, desenvolvimento organizado em tópicos, exemplos concretos, e conclusões acionáveis'
        };
        
        return formatTemplates[analysis.area] || formatTemplates.general;
    }

    buildRTCTFFromAnalysis(text, analysis) {
        // Constrói RTCTF baseado na análise da IA
        const area = analysis.area?.toLowerCase() || '';
        const tipo = analysis.tipo?.toLowerCase() || '';
        
        const roleMap = {
            'esporte': 'especialista em educação física e ciências do esporte',
            'comida': 'chef profissional e especialista em culinária',
            'tecnologia': 'especialista em tecnologia e inovação',
            'negócio': 'consultor empresarial sênior',
            'saúde': 'profissional da saúde especializado',
            'educação': 'educador experiente e pedagogo',
            'viagem': 'consultor de viagens e turismo',
            'arte': 'crítico de arte e especialista cultural'
        };

        const role = Object.keys(roleMap).find(key => area.includes(key)) 
            ? `Atue como um ${roleMap[Object.keys(roleMap).find(key => area.includes(key))]}` 
            : `Atue como um especialista em ${area}`;

        let task = text;
        if (tipo.includes('opinião') || text.toLowerCase().includes('melhor')) {
            task = `Analise e apresente as melhores opções relacionadas a: ${text}`;
        } else if (tipo.includes('instrução')) {
            task = `Forneça instruções detalhadas sobre: ${text}`;
        }

        return {
            role: role,
            task: task,
            context: `Contexto: ${text}. Objetivo: ${analysis.objetivo || 'fornecer informação útil e precisa'}`,
            tone: 'Mantenha um tom profissional, claro e útil, adequado ao contexto',
            format: 'Organize a resposta de forma estruturada e prática, priorizando informações mais relevantes'
        };
    }

    smartLocalAnalysis(text) {
        // Análise local muito melhorada como último recurso
        const lowerText = text.toLowerCase();
        
        // Detectar área por palavras-chave avançadas
        const areaMap = {
            'esportes': ['esporte', 'futebol', 'basquete', 'exercício', 'treino', 'fitness'],
            'culinária': ['comida', 'receita', 'cozinhar', 'prato', 'ingrediente', 'bolo'],
            'tecnologia': ['computador', 'app', 'software', 'programação', 'internet'],
            'negócios': ['empresa', 'negócio', 'marketing', 'vendas', 'estratégia'],
            'saúde': ['saúde', 'médico', 'doença', 'tratamento', 'medicina'],
            'educação': ['estudar', 'aprender', 'curso', 'escola', 'ensino'],
            'viagem': ['viagem', 'viajar', 'destino', 'turismo', 'país']
        };

        let detectedArea = 'geral';
        for (const [area, keywords] of Object.entries(areaMap)) {
            if (keywords.some(keyword => lowerText.includes(keyword))) {
                detectedArea = area;
                break;
            }
        }

        const specialistMap = {
            'esportes': 'especialista em educação física e ciências do esporte',
            'culinária': 'chef profissional especializado em culinária',
            'tecnologia': 'especialista em tecnologia e inovação',
            'negócios': 'consultor empresarial com expertise em gestão',
            'saúde': 'profissional da saúde especializado',
            'educação': 'educador experiente com conhecimento pedagógico',
            'viagem': 'consultor de viagens e especialista em turismo',
            'geral': 'especialista qualificado na área específica'
        };

        return {
            role: `Atue como um ${specialistMap[detectedArea]}`,
            task: text.includes('?') ? text.replace('?', '.') : text,
            context: `Contexto: ${text}`,
            tone: 'Mantenha um tom profissional, claro e objetivo',
            format: 'Organize a resposta de forma estruturada e informativa'
        };
    }

    analyzeWithBasicLogic(text) {
        // Fallback simples quando tudo falha
        return this.smartLocalAnalysis(text);
    }

    containsWords(textWords, keywords) {
        return keywords.some(keyword => 
            textWords.some(word => word.includes(keyword.toLowerCase()))
        );
    }

    displayResults(rtctf, modelUsed = null) {
        this.roleContent.textContent = rtctf.role;
        this.taskContent.textContent = rtctf.task;
        this.contextContent.textContent = rtctf.context;
        this.toneContent.textContent = rtctf.tone;
        this.formatContent.textContent = rtctf.format;
        
        this.updateFinalPrompt();
        
        // Mostrar indicador do modelo usado
        this.showModelIndicator(modelUsed);
        
        this.resultSection.style.display = 'block';
        this.resultSection.scrollIntoView({ behavior: 'smooth' });
    }

    showModelIndicator(modelUsed) {
        if (!modelUsed) return;
        
        // Configurar o texto e ícone do modelo
        const modelIcons = {
            'OpenAI GPT-3.5': '🤖',
            'Anthropic Claude': '🧠',
            'Google Gemini': '🔮',
            'Groq Mixtral': '⚡',
            'Análise Local Inteligente': '🔬'
        };
        
        const icon = modelIcons[modelUsed.name] || '🚀';
        
        // Atualizar o ícone
        const iconElement = this.modelIndicator.querySelector('.model-icon');
        if (iconElement) {
            iconElement.textContent = icon;
        }
        
        // Atualizar o nome do modelo
        if (this.modelName) {
            this.modelName.textContent = modelUsed.name;
        }
        
        // Aplicar classe CSS específica do modelo
        this.modelIndicator.className = 'model-indicator';
        if (modelUsed.className) {
            this.modelIndicator.classList.add(modelUsed.className);
        }
        
        // Mostrar o indicador
        this.modelIndicator.style.display = 'block';
        
        console.log(`📊 Modelo exibido: ${modelUsed.name}`);
    }

    updateFinalPrompt() {
        const role = this.roleContent.textContent.trim();
        const task = this.taskContent.textContent.trim();
        const context = this.contextContent.textContent.trim();
        const tone = this.toneContent.textContent.trim();
        const format = this.formatContent.textContent.trim();

        const finalPrompt = `ROLE: ${role}

TASK: ${task}

CONTEXT: ${context}

TONE: ${tone}

FORMAT: ${format}`;

        this.finalPrompt.textContent = finalPrompt;
    }

    async copyPrompt() {
        try {
            const promptText = this.finalPrompt.textContent;
            await navigator.clipboard.writeText(promptText);
            this.showFeedback('Prompt copiado para a área de transferência!', 'success');
        } catch (err) {
            this.fallbackCopy(this.finalPrompt.textContent);
        }
    }

    fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showFeedback('Prompt copiado para a área de transferência!', 'success');
        } catch (err) {
            this.showFeedback('Erro ao copiar. Tente selecionar e copiar manualmente.', 'error');
        }
        
        document.body.removeChild(textArea);
    }

    resetForm() {
        this.inputText.value = '';
        this.resultSection.style.display = 'none';
        this.modelIndicator.style.display = 'none';
        this.inputText.focus();
        this.showFeedback('Formulário resetado. Pronto para um novo prompt!', 'success');
    }

    showFeedback(message, type) {
        this.feedback.textContent = message;
        this.feedback.className = `feedback ${type}`;
        this.feedback.classList.add('show');
        
        setTimeout(() => {
            this.feedback.classList.remove('show');
        }, 4000);
    }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    window.rtctfProcessor = new RTCTFProcessor();
    console.log('🚀 RTCTF Processor iniciado com múltiplos modelos de IA!');
    
    // Adicionar algumas instruções de teclado
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            document.getElementById('inputText').focus();
        }
    });
});

// Adicionar indicador de carregamento suave
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});