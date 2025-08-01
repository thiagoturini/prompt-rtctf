# 🔑 Configuração de Chaves API - Instruções

Para usar o sistema com máxima qualidade, você precisa configurar as chaves das APIs.

## 🚀 Opção 1: Interface Gráfica (Recomendado)

1. Abra a aplicação
2. Clique em "⚙️ Config APIs"
3. Cole suas chaves
4. Salvar

## 🛠️ Opção 2: Arquivo Local (Para Desenvolvedores)

1. Copie o arquivo `config.local.js.example`
2. Renomeie para `config.local.js`
3. Adicione suas chaves no arquivo
4. Inclua antes do script principal no HTML:

```html
<script src="config.local.js"></script>
<script src="script.js"></script>
```

## 🔗 Onde Obter as Chaves (GRATUITAS)

### OpenAI GPT-3.5 ($5 grátis)
- Link: https://platform.openai.com/api-keys
- Formato: `sk-proj-...`

### Groq Mixtral (100% gratuito)
- Link: https://console.groq.com/keys
- Formato: `gsk_...`

### Anthropic Claude ($5 grátis)
- Link: https://console.anthropic.com/
- Formato: `sk-ant-...`

## ⚠️ Segurança

- ✅ Chaves ficam apenas no seu navegador
- ✅ Nunca enviadas para servidores externos
- ✅ Arquivo `config.local.js` não é commitado (está no .gitignore)

## 🎯 Fallback

Se nenhuma chave for configurada, o sistema usará:
1. Google Gemini (pré-configurado)
2. Análise local inteligente
