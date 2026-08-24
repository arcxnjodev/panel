# Frida Injection - Quick Start Guide

## 🚀 Setup Rápido

### 1. Instalar Dependências

```bash
npm install
```

### 2. Setup Emulador MSI Android 5.x

```bash
# Download Frida Server (ARM)
wget https://github.com/frida/frida/releases/download/16.1.2/frida-server-16.1.2-android-arm.xz
xz -d frida-server-*.xz

# Push para emulador
adb push frida-server-* /data/local/tmp/
adb shell chmod +x /data/local/tmp/frida-server-*

# Iniciar Frida Server (com root)
adb shell su -c '/data/local/tmp/frida-server-16.1.2-android-arm -l 0.0.0.0:27042'
```

### 3. Port Forwarding

```bash
adb forward tcp:27042 tcp:27042
```

### 4. Iniciar Painel

```bash
npm run dev
```

Acesse `http://localhost:8080` no navegador.

### 5. Abrir Free Fire 1.71.4 no Emulador

O painel vai automaticamente:
- ✅ Detectar processo do FF
- ✅ Fazer attach via Frida
- ✅ Injetar agent script
- ✅ Ficar pronto pra receber comandos

## 📝 Usando o Painel

### Aimbot
```
Menu (padrão ESC) → Aimbot → Toggle Enable
Ajustar FOV, Smooth, Speed conforme necessário
```

### ESP
```
Menu → ESP → Toggle Enable
Ativar Box, Skeleton, Health Bar
Configurar distância máxima
```

### No Recoil
```
Menu → No Recoil → Toggle Enable
Ajustar Strength e Smooth
```

## 🔧 Arquivos Criados

```
server/
├── frida-server.ts          # Gerenciador Frida
├── frida-agent.js           # Script injetado (JS)
└── api/
    └── injection.ts         # Endpoint POST /api/injection/execute

src/
├── lib/
│   └── frida-client.ts      # Cliente frontend
└── components/
    └── arcxnjo-panel.tsx    # UI do painel
```

## 📡 API Endpoint

**POST** `/api/injection/execute`

```json
{
  "type": "aimbot",
  "action": "enable",
  "params": {
    "fov": 45,
    "smooth": 10,
    "speed": 5,
    "target": "nearest"
  }
}
```

**Response:**

```json
{
  "success": true,
  "result": { ... },
  "timestamp": "2026-08-24T10:30:00.000Z"
}
```

## 🐛 Troubleshooting

**Frida não conecta:**
```bash
# Verificar se Frida server está rodando
adb shell ps | grep frida-server

# Verificar port forward
adb forward --list

# Reiniciar
adb kill-server && adb start-server
```

**Processo FF não encontrado:**
```bash
# Listar todos os processos
frida-ps -U

# Verificar nome correto do pacote
adb shell pm list packages | grep free
```

**Permission denied:**
```bash
# Device precisa estar rooted
adb shell id

# Reiniciar Frida com su
adb shell su -c '/data/local/tmp/frida-server-* -l 0.0.0.0:27042'
```

## ⚙️ Configuração Avançada

### Custom Process Name

Em `server/frida-server.ts`:
```typescript
const config = {
  processName: "com.seu.processo", // Altere aqui
  host: "127.0.0.1",
  port: 27042,
};
```

### Hooks Customizados

Em `server/frida-agent.js`:
```javascript
// Adicionar hooks no Aimbot
Aimbot.customHook = function() {
  // Sua lógica aqui
};
```

## 📊 Fluxo de Dados

```
1. User clica "Enable Aimbot" no painel
   ↓
2. fridaClient.ts envia POST /api/injection/execute
   ↓
3. server/api/injection.ts recebe e chama FridaServer
   ↓
4. FridaServer.executeCommand() chama script.exports.execute()
   ↓
5. frida-agent.js (no processo FF) processa comando
   ↓
6. Aimbot é ativado no jogo em tempo real
   ↓
7. Response volta: { success: true, result: {...} }
```

## ⚠️ Importante

- ✅ Funciona apenas em Android rooted
- ✅ Requer Frida server rodando no emulador
- ✅ FF precisa estar aberto
- ⚠️ Anti-cheat pode detectar Frida
- ⚠️ Use apenas em testes pessoais

## 🎯 Próximos Passos

1. ✅ Testar conexão Frida
2. ✅ Validar injection do script
3. ✅ Implementar hooks reais (addresses específicas do FF)
4. ✅ Otimizar performance
5. ✅ Adicionar proteção anti-detecção

## 📚 Referências

- [Frida Docs](https://frida.re/docs/home/)
- [Frida TypeScript Bindings](https://github.com/frida/frida-node)
- [Android Reverse Engineering](https://github.com/radareorg/radare2)

---

**Status:** ✅ Configuração básica completa
**Última atualização:** 2026-08-24
