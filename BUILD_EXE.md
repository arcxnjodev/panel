# Build EXE Guide - Arcxnjo Panel

## 📦 Compilar para EXE

### Pré-requisitos

```bash
# Node.js 18+
node --version

# npm 9+
npm --version
```

### 1. Instalar Dependências

```bash
npm install
```

### 2. Build Development (com DevTools)

```bash
npm run electron-dev
```

Isso vai:
- ✅ Compilar a aplicação React
- ✅ Iniciar servidor Vite (localhost:8080)
- ✅ Abrir Electron com DevTools

### 3. Build Portable EXE (sem instalador)

```bash
npm run electron-build:exe
```

Saída: `dist/Arcxnjo Panel.exe`
- Arquivo único
- Sem instalação necessária
- ~200MB

### 4. Build com Instalador NSIS

```bash
npm run electron-build
```

Saída: 
- `dist/Arcxnjo Panel Setup 1.0.0.exe` (instalador)
- `dist/Arcxnjo Panel 1.0.0.exe` (portable)

## 🚀 Usando o EXE

### Requisitos

1. **Android Emulator** (MSI com Android 5.x)
2. **Frida Server rodando** no emulador
3. **ADB Port Forwarding** ativo
4. **Free Fire 1.71.4** aberto

### Iniciar

1. Duplo-clique em `Arcxnjo Panel.exe`
2. Painel abre automaticamente
3. Frida detecta FF e conecta
4. Use o painel normalmente

## 📁 Estrutura do Build

```
dist/
├── Arcxnjo Panel.exe          # Portable (sem instalador)
├── Arcxnjo Panel Setup.exe    # Instalador NSIS
└── (outros arquivos)
```

## ⚙️ Configuração Avançada

### Customizar Ícone

Substituir `assets/icon.png` por sua imagem:
- Tamanho: 256x256px mínimo
- Formato: PNG

Exemplo:
```bash
# Linux/Mac
convert icon.png -define icon:auto-resize=256,128,96,64,48,32,16 icon.ico

# Windows (use online converter)
# https://icoconvert.com/
```

### Customizar Nome da Aplicação

Em `package.json`:
```json
{
  "name": "meu-app",
  "build": {
    "productName": "Meu App"
  }
}
```

### Adicionar Auto-Update

```bash
npm install electron-updater
```

Em `main.js`:
```javascript
const { autoUpdater } = require("electron-updater");
autoUpdater.checkForUpdatesAndNotify();
```

## 🔒 Assinatura de Código (Opcional)

Para distribuir comercialmente, assine o executável:

```bash
# Gerar certificado (auto-assinado, apenas teste)
certutil -genkey -exportable -out mykey.pvk MyKeyContainerName
pvk2pfx -pvk mykey.pvk -spc mycert.cer -pfx mycert.pfx -po password

# No package.json:
{
  "build": {
    "win": {
      "certificateFile": "mycert.pfx",
      "certificatePassword": "password"
    }
  }
}
```

## 🐛 Troubleshooting

### EXE não abre

```bash
# Verificar erros
npm run electron-dev

# Check logs
# Windows: %APPDATA%/Arcxnjo Panel/
```

### Frida não conecta dentro do EXE

1. ✅ Verificar se Frida Server está rodando
2. ✅ Verificar port forwarding: `adb forward --list`
3. ✅ Abrir DevTools (Ctrl+Shift+I) e checar console

### Instalador não funciona

```bash
# Limpar cache build
rm -rf dist node_modules
npm install
npm run electron-build
```

## 📊 Tamanho do Arquivo

- **Portable**: ~200MB
- **Instalador**: ~150MB (comprimido)
- **Instalado**: ~400MB (no disco)

Para reduzir:
```json
{
  "build": {
    "asar": true,
    "extraMetadata": {
      "prune": true
    }
  }
}
```

## 🔄 CI/CD (GitHub Actions)

Automatizar builds:

```yaml
# .github/workflows/build.yml
name: Build EXE

on:
  push:
    tags:
      - 'v*'

jobs:
  build-windows:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run electron-build
      - uses: softprops/action-gh-release@v1
        with:
          files: dist/Arcxnjo*.exe
```

## 📋 Checklist Final

- [ ] Testes funcionam em dev
- [ ] Frida conecta corretamente
- [ ] Aimbot, ESP, No Recoil funcionam
- [ ] Ícone customizado
- [ ] Nome do app correto
- [ ] Versão atualizada (`package.json`)
- [ ] Build compila sem erros
- [ ] EXE inicia e funciona

## 🎯 Próximos Passos

1. ✅ Build local e testar
2. ✅ Distribuir via GitHub Releases
3. ✅ Criar instalador customizado
4. ✅ Setup de auto-update

## 📚 Referências

- [Electron Builder Docs](https://www.electron.build/)
- [Electron Security](https://www.electronjs.org/docs/tutorial/security)
- [NSIS Installer](https://nsis.sourceforge.io/)

---

**Status:** ✅ Build system pronto
**Última atualização:** 2026-08-24
