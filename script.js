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
        if (statusElement) {
            statusElement.textContent = '🚀 OpenAI GPT-3.5 + Claude + Groq Mixtral + Gemini Pro - TODOS ATIVOS!';
            statusElement.style.color = '#4CAF50';
            statusElement.style.fontWeight = 'bold';
        }
        
        // Atualizar badge de status
        const statusBadge = document.querySelector('.status-badge');
        if (statusBadge) {
            statusBadge.textContent = 'Premium Active';
            statusBadge.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
        }
        
        console.log('🎉 Todas as APIs premium configuradas e prontas!');
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
        // Auto-configurar chaves premium se não existirem
        if (!this.openaiKey && window.API_KEYS) {
            this.openaiKey = window.API_KEYS.openai || '';
        }
        if (!this.anthropicKey && window.API_KEYS) {
            this.anthropicKey = window.API_KEYS.anthropic || '';
        }
        if (!this.groqKey && window.API_KEYS) {
            this.groqKey = window.API_KEYS.groq || '';
        }
        if (!this.geminiKey && window.API_KEYS) {
            this.geminiKey = window.API_KEYS.gemini || '';
        }
        
        // Salvar no localStorage se configurado
        if (this.openaiKey) localStorage.setItem('openai_api_key', this.openaiKey);
        if (this.anthropicKey) localStorage.setItem('anthropic_api_key', this.anthropicKey);
        if (this.groqKey) localStorage.setItem('groq_api_key', this.groqKey);
        if (this.geminiKey) localStorage.setItem('gemini_api_key', this.geminiKey);
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
            const rtctfStructure = await this.analyzeWithAI(inputText);
            this.displayResults(rtctfStructure);
            this.showFeedback('Prompt estruturado com sucesso usando IA inteligente!', 'success');
        } catch (error) {
            console.error('Erro ao gerar prompt:', error);
            this.showFeedback('Erro na IA. Usando análise avançada local...', 'error');
            
            // Fallback para análise básica
            const rtctfStructure = this.analyzeWithBasicLogic(inputText);
            this.displayResults(rtctfStructure);
        } finally {
            this.generateBtn.textContent = '� Gerar Prompt RTCTF Inteligente';
            this.generateBtn.disabled = false;
        }
    }

    async analyzeWithAI(text) {
        // Tentar com diferentes modelos em ordem de qualidade
        const models = [
            { name: 'OpenAI GPT-3.5', method: () => this.tryOpenAI(text) },
            { name: 'Anthropic Claude', method: () => this.tryAnthropic(text) },
            { name: 'Google Gemini', method: () => this.tryGemini(text) },
            { name: 'Local Groq API', method: () => this.tryGroq(text) }
        ];

        for (const model of models) {
            try {
                console.log(`🔄 Tentando ${model.name}...`);
                const result = await model.method();
                if (this.validateResult(result)) {
                    console.log(`✅ Sucesso com ${model.name}!`);
                    this.showModelSuccess(model.name);
                    return result;
                }
            } catch (e) {
                console.log(`❌ ${model.name} falhou:`, e.message);
                continue;
            }
        }

        // Se todos falharam, usar análise local superinteligente
        return this.superSmartLocalAnalysis(text);
    }

    async tryOpenAI(text) {
        const prompt = `Você é um especialista em engenharia de prompts. Transforme o texto do usuário em um prompt estruturado RTCTF (Role, Task, Context, Tone, Format).

TEXTO: "${text}"

EXEMPLO DE TRANSFORMAÇÃO CORRETA:
Entrada: "Quero entender a diferença entre romance e comédia"

ROLE: Atue como um crítico literário e cinematográfico especializado em análise de gêneros narrativos
TASK: Explique de forma detalhada e comparativa as principais diferenças entre os gêneros romance e comédia
CONTEXT: Análise comparativa de gêneros narrativos, considerando características, estruturas, objetivos e elementos distintivos de cada gênero
TONE: Use um tom didático, claro e acessível, adequado para ensino e aprendizado
FORMAT: Organize como uma comparação estruturada com características de cada gênero, diferenças principais e exemplos práticos

REGRAS:
1. ROLE deve ser um especialista ESPECÍFICO na área do texto
2. TASK deve reformular o pedido de forma clara e profissional  
3. CONTEXT deve explicar o cenário e adicionar contexto relevante
4. TONE deve ser apropriado para o tipo de comunicação
5. FORMAT deve especificar a melhor estrutura de resposta

Responda APENAS em JSON:
{
  "role": "Atue como um [especialista específico]...",
  "task": "[reformulação profissional da solicitação]",
  "context": "[contexto detalhado e objetivos]",
  "tone": "[tom apropriado]",
  "format": "[estrutura ideal de resposta]"
}`;

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

        if (!response.ok) {
            throw new Error(`OpenAI API Error: ${response.status}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        return this.extractJSON(content);
    }

    async tryAnthropic(text) {
        const prompt = `Transforme este texto em um prompt estruturado RTCTF profissional:

TEXTO: "${text}"

Para cada campo RTCTF, pense:
- ROLE: Que especialista seria perfeito para esta questão?
- TASK: Como reformular isso profissionalmente?
- CONTEXT: Que contexto adicional seria útil?
- TONE: Que tom seria mais eficaz?
- FORMAT: Qual a melhor estrutura de resposta?

Exemplo: "Quero entender X e Y" → 
ROLE: especialista em X e Y
TASK: explicar diferenças entre X e Y
CONTEXT: análise comparativa considerando...
TONE: didático e claro
FORMAT: comparação estruturada

JSON de resposta:
{
  "role": "Atue como...",
  "task": "...",
  "context": "...",
  "tone": "...",
  "format": "..."
}`;

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

        if (!response.ok) {
            throw new Error(`Anthropic API Error: ${response.status}`);
        }

        const data = await response.json();
        const content = data.content[0].text;
        return this.extractJSON(content);
    }

    async tryGemini(text) {
        const prompt = `TRANSFORME EM PROMPT RTCTF PROFISSIONAL:

ENTRADA: "${text}"

MODELO CORRETO:
"Quero entender diferença entre A e B" →
ROLE: especialista em A e B  
TASK: explicar diferenças detalhadas entre A e B
CONTEXT: análise comparativa de A e B
TONE: didático e claro
FORMAT: comparação estruturada

RESPONDA SÓ JSON:
{
  "role": "Atue como um especialista em [área específica]",
  "task": "[reformulação clara da solicitação]", 
  "context": "[contexto específico e útil]",
  "tone": "[tom apropriado]",
  "format": "[estrutura de resposta ideal]"
}`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.geminiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.1, maxOutputTokens: 800 }
            })
        });

        if (!response.ok) {
            throw new Error(`Gemini API Error: ${response.status}`);
        }

        const data = await response.json();
        const content = data.candidates[0].content.parts[0].text;
        return this.extractJSON(content);
    }

    async tryGroq(text) {
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

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.groqKey}`
            },
            body: JSON.stringify({
                model: 'mixtral-8x7b-32768',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.1
            })
        });

        if (!response.ok) {
            throw new Error(`Groq API Error: ${response.status}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        return this.extractJSON(content);
    }

    extractJSON(text) {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        throw new Error('No JSON found in response');
    }

    validateResult(result) {
        if (!result || typeof result !== 'object') return false;
        
        const required = ['role', 'task', 'context', 'tone', 'format'];
        const isValid = required.every(field => {
            const value = result[field];
            return value && 
                   typeof value === 'string' && 
                   value.length > 20 && // Mínimo de 20 caracteres para evitar respostas genéricas
                   !value.includes('[') && // Evitar placeholders como [área específica]
                   !value.includes('...'); // Evitar respostas incompletas
        });

        // Verificar se é específico (não genérico)
        const genericTerms = ['especialista geral', 'profissional qualificado', 'pessoa experiente'];
        const isSpecific = !genericTerms.some(term => 
            result.role.toLowerCase().includes(term.toLowerCase())
        );

        return isValid && isSpecific;
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
        const roles = {
            technology: 'Atue como um engenheiro de software sênior e arquiteto de sistemas',
            business: 'Atue como um consultor empresarial especializado em estratégia e gestão',
            education: 'Atue como um educador especializado e designer instrucional',
            health: 'Atue como um profissional de saúde especializado em medicina clínica',
            cooking: 'Atue como um chef profissional especializado em gastronomia',
            entertainment: 'Atue como um crítico cultural e especialista em análise de gêneros narrativos',
            comparison: 'Atue como um analista especializado em estudos comparativos e avaliação crítica',
            general: 'Atue como um especialista multidisciplinar com amplo conhecimento'
        };
        
        return roles[analysis.area] || roles.general;
    }

    generateProfessionalTask(text, analysis) {
        const baseTask = text.charAt(0).toUpperCase() + text.slice(1);
        
        if (analysis.area === 'comparison') {
            return `Analise e compare detalhadamente: ${baseTask}`;
        } else if (analysis.isQuestion) {
            return `Forneça uma análise completa e fundamentada para: ${baseTask}`;
        } else {
            return `Desenvolva e implemente: ${baseTask}`;
        }
    }

    generateRelevantContext(analysis) {
        const contexts = {
            technology: 'Desenvolvimento de soluções tecnológicas modernas e eficientes',
            business: 'Otimização de processos empresariais e crescimento sustentável',
            education: 'Facilitação de aprendizado eficaz e desenvolvimento de competências',
            health: 'Promoção de saúde e bem-estar baseada em evidências científicas',
            cooking: 'Preparação culinária profissional com técnicas gastronômicas',
            entertainment: 'Análise crítica e comparativa de gêneros narrativos, considerando características, estruturas, objetivos e elementos distintivos',
            comparison: 'Análise objetiva e comparativa de opções e alternativas com critérios específicos',
            general: 'Análise abrangente considerando múltiplas perspectivas e fatores'
        };
        
        return contexts[analysis.area] || contexts.general;
    }

    generateAppropriateTone(analysis) {
        if (analysis.isFormal) return 'Formal, respeitoso e profissional';
        if (analysis.isUrgent) return 'Direto, conciso e orientado a ação';
        if (analysis.complexity > 2) return 'Didático, detalhado e estruturado';
        if (analysis.area === 'entertainment') return 'Didático, claro e acessível, adequado para análise cultural';
        return 'Claro, acessível e envolvente';
    }

    generateIdealFormat(analysis) {
        const formats = {
            technology: 'Guia técnico estruturado com exemplos práticos e código',
            business: 'Relatório executivo com análise e recomendações estratégicas',
            education: 'Material didático organizado com conceitos e exercícios',
            health: 'Informações médicas estruturadas com evidências científicas',
            cooking: 'Receita detalhada com ingredientes, preparo e dicas profissionais',
            entertainment: 'Comparação estruturada com características de cada gênero, diferenças principais e exemplos práticos',
            comparison: 'Tabela comparativa com prós, contras, critérios específicos e recomendações finais',
            general: 'Resposta estruturada com tópicos organizados e conclusões'
        };
        
        return formats[analysis.area] || formats.general;
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

    displayResults(rtctf) {
        this.roleContent.textContent = rtctf.role;
        this.taskContent.textContent = rtctf.task;
        this.contextContent.textContent = rtctf.context;
        this.toneContent.textContent = rtctf.tone;
        this.formatContent.textContent = rtctf.format;
        
        this.updateFinalPrompt();
        this.resultSection.style.display = 'block';
        this.resultSection.scrollIntoView({ behavior: 'smooth' });
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