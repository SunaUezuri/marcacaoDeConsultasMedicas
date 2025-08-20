# 🏥 Aplicação Mobile de Marcação de Consultas Médicas

## 📋 Descrição do Projeto

Esta é uma aplicação mobile completa desenvolvida em **React Native** com **Expo** para gerenciamento e agendamento de consultas médicas. A aplicação oferece uma solução integrada para pacientes, médicos e administradores, permitindo o agendamento, gerenciamento e acompanhamento de consultas médicas de forma eficiente e intuitiva.

## Integrantes

### **Wesley Sena dos Santos** - **RM**: 558043

## 🎯 Principais Funcionalidades

### 👥 **Sistema de Usuários Multi-Perfil**
- **Pacientes**: Agendamento de consultas, visualização de histórico, gerenciamento de perfil
- **Médicos**: Dashboard com consultas agendadas, confirmação/cancelamento, estatísticas pessoais
- **Administradores**: Controle total do sistema, gerenciamento de usuários, estatísticas gerais

### 📅 **Agendamento de Consultas**
- Seleção de médicos por especialidade
- Escolha de data e horário disponível
- Sistema de validação de datas (máximo 3 meses à frente)
- Horários disponíveis das 9h às 18h (intervalos de 30 minutos)
- Descrição detalhada do motivo da consulta

### 🏥 **Gerenciamento de Consultas**
- Status de consultas (Pendente, Confirmada, Cancelada)
- Ações de confirmação e cancelamento
- Histórico completo de consultas
- Filtros por status e período

### 📊 **Dashboard e Estatísticas**
- **Dashboard do Paciente**: Consultas agendadas, histórico, perfil
- **Dashboard do Médico**: Consultas do dia, estatísticas pessoais, ações rápidas
- **Dashboard do Admin**: Visão geral do sistema, estatísticas gerais, gerenciamento

### 🔔 **Sistema de Notificações**
- Notificações push para lembretes de consultas
- Sistema de notificações in-app
- Lembretes automáticos

### 👤 **Gerenciamento de Perfil**
- Edição de informações pessoais
- Upload e gerenciamento de foto de perfil
- Configurações de conta
- Histórico de atividades

## 🏗️ Arquitetura do Projeto

### **Estrutura de Pastas**
```
src/
├── components/          # Componentes reutilizáveis da UI
├── contexts/           # Contextos React (Auth, etc.)
├── navigation/         # Configuração de navegação
├── routes/             # Definição de rotas
├── screens/            # Telas da aplicação
├── services/           # Serviços e lógica de negócio
├── styles/             # Estilos globais e tema
└── types/              # Definições de tipos TypeScript
```

### **Padrões de Desenvolvimento**
- **TypeScript**: Tipagem estática para maior segurança
- **Styled Components**: Estilização baseada em componentes
- **Context API**: Gerenciamento de estado global
- **React Navigation**: Sistema de navegação robusto
- **AsyncStorage**: Persistência local de dados

## 🛠️ Tecnologias Utilizadas

### **Frontend & Mobile**
- **React Native 0.76.7**: Framework para desenvolvimento mobile
- **Expo 52.0.38**: Plataforma para desenvolvimento React Native
- **TypeScript 5.3.3**: Superset JavaScript com tipagem estática

### **Navegação**
- **React Navigation 7.x**: Sistema de navegação entre telas
- **Bottom Tabs**: Navegação por abas inferiores
- **Stack Navigator**: Navegação em pilha
- **Drawer Navigator**: Menu lateral deslizante

### **UI & Estilização**
- **Styled Components 6.1.16**: CSS-in-JS para React Native
- **React Native Elements 3.4.3**: Biblioteca de componentes UI
- **Expo Vector Icons**: Ícones vetoriais
- **React Native Linear Gradient**: Gradientes visuais

### **Funcionalidades Mobile**
- **Expo Image Picker**: Seleção de imagens da galeria/câmera
- **Expo Haptics**: Feedback tátil
- **Expo AV**: Reprodução de áudio/vídeo
- **AsyncStorage**: Armazenamento local persistente

### **Desenvolvimento**
- **Metro**: Bundler para React Native
- **Babel**: Transpilador JavaScript
- **ESLint**: Linting de código

## 📱 Telas e Funcionalidades Detalhadas

### **1. Telas de Autenticação**
- **LoginScreen**: Autenticação de usuários existentes
- **RegisterScreen**: Cadastro de novos usuários
- **Validação**: Sistema de validação de credenciais

### **2. Dashboard do Paciente (PatientDashboardScreen)**
- **Visão Geral**: Consultas agendadas e pendentes
- **Ações Rápidas**: Botão para agendar nova consulta
- **Histórico**: Lista completa de consultas realizadas
- **Perfil**: Acesso rápido ao perfil do usuário
- **Estatísticas**: Resumo das consultas por status

### **3. Dashboard do Médico (DoctorDashboardScreen)**
- **Consultas do Dia**: Lista de consultas agendadas
- **Ações**: Confirmação e cancelamento de consultas
- **Estatísticas Pessoais**: Métricas de performance
- **Modal de Ações**: Interface para gerenciar consultas
- **Notificações**: Sistema de alertas para consultas

### **4. Dashboard do Administrador (AdminDashboardScreen)**
- **Visão Geral do Sistema**: Estatísticas completas
- **Gerenciamento de Usuários**: Lista de todos os usuários
- **Monitoramento**: Acompanhamento de consultas em tempo real
- **Relatórios**: Dados agregados do sistema

### **5. Telas de Funcionalidade**
- **HomeScreen**: Tela principal com resumo e navegação
- **CreateAppointmentScreen**: Formulário de agendamento
- **ProfileScreen**: Visualização e edição de perfil
- **EditProfileScreen**: Edição detalhada de informações
- **NotificationsScreen**: Central de notificações
- **SettingsScreen**: Configurações da aplicação

## 🔧 Componentes Principais

### **1. AppointmentForm**
- **Seleção de Médico**: Lista de médicos por especialidade
- **Validação de Data**: Formato DD/MM/AAAA com validação
- **Horários Disponíveis**: Slots de 30 minutos das 9h às 18h
- **Descrição**: Campo para detalhar o motivo da consulta

### **2. AppointmentCard**
- **Informações da Consulta**: Médico, data, horário, status
- **Ações Rápidas**: Editar e excluir consultas
- **Status Visual**: Cores diferentes para cada status
- **Foto do Médico**: Imagem de perfil do profissional

### **3. StatisticsCard**
- **Métricas Visuais**: Cards com estatísticas importantes
- **Percentuais**: Cálculos automáticos de status
- **Gráficos**: Representação visual dos dados

### **4. Header**
- **Navegação**: Menu de navegação principal
- **Perfil**: Acesso rápido ao perfil do usuário
- **Notificações**: Bell de notificações
- **Logout**: Botão de saída da aplicação

## 🎨 Sistema de Design

### **Tema (theme.ts)**
```typescript
colors: {
  primary: '#4A90E2',      // Azul principal
  secondary: '#6C757D',    // Cinza secundário
  background: '#F8F9FA',   // Fundo claro
  text: '#212529',         // Texto escuro
  error: '#DC3545',        // Vermelho de erro
  success: '#28A745',      // Verde de sucesso
  warning: '#FFC107',      // Amarelo de aviso
}
```

### **Tipografia**
- **Títulos**: 24px, negrito
- **Subtítulos**: 18px, semi-negrito
- **Corpo**: 16px, normal
- **Legendas**: 14px, normal

### **Espaçamento**
- **Pequeno**: 8px
- **Médio**: 16px
- **Grande**: 24px
- **Extra Grande**: 32px

## 📊 Serviços e Lógica de Negócio

### **1. AuthService (auth.ts)**
- **Autenticação**: Login e registro de usuários
- **Validação**: Verificação de credenciais
- **Sessão**: Gerenciamento de sessão do usuário

### **2. StatisticsService (statistics.ts)**
- **Estatísticas Gerais**: Métricas do sistema completo
- **Estatísticas por Usuário**: Dados específicos de médicos e pacientes
- **Cálculos Automáticos**: Percentuais e contagens em tempo real

### **3. NotificationService (notifications.ts)**
- **Notificações Push**: Alertas para consultas
- **Notificações In-App**: Mensagens dentro da aplicação
- **Agendamento**: Lembretes automáticos

### **4. ImageService (imageService.ts)**
- **Upload de Imagens**: Seleção e envio de fotos
- **Compressão**: Otimização de imagens
- **Armazenamento**: Gerenciamento de arquivos

### **5. StorageService (storage.ts)**
- **AsyncStorage**: Persistência local de dados
- **Cache em Memória**: Sistema de cache para melhor performance
- **Expiração de Cache**: Controle automático de expiração de dados
- **Backup e Restore**: Sistema completo de backup de dados
- **Configurações**: Gerenciamento de configurações da aplicação
- **Chaves Centralizadas**: Sistema organizado de chaves de armazenamento

## 💾 Sistema de Cache e Armazenamento

### **Arquitetura de Cache**
O projeto implementa um sistema de cache em duas camadas para otimizar a performance:

#### **1. Cache em Memória (Map)**
- **Armazenamento Temporário**: Dados frequentemente acessados ficam em memória
- **Expiração Automática**: Sistema de TTL (Time To Live) para dados
- **Performance**: Acesso instantâneo aos dados mais usados
- **Limpeza Inteligente**: Remoção automática de dados expirados

#### **2. AsyncStorage (Persistente)**
- **Armazenamento Permanente**: Dados sobrevivem ao fechamento do app
- **Chaves Organizadas**: Sistema de prefixos para organização (`@MedicalApp:`)
- **Operações Assíncronas**: Todas as operações são não-bloqueantes
- **Tratamento de Erros**: Sistema robusto de tratamento de falhas

### **Funcionalidades do StorageService**
```typescript
// Exemplo de uso do sistema de cache
await storageService.setItem('appointments', data, 30); // Expira em 30 min
const appointments = await storageService.getItem('appointments');
await storageService.createBackup(); // Backup completo dos dados
```

### **Chaves de Armazenamento**
- `@MedicalApp:user` - Dados do usuário logado
- `@MedicalApp:appointments` - Consultas agendadas
- `@MedicalApp:notifications` - Notificações do usuário
- `@MedicalApp:registeredUsers` - Usuários cadastrados
- `@MedicalApp:settings` - Configurações da aplicação
- `@MedicalApp:statisticsCache` - Cache de estatísticas

### **Sistema de Backup**
- **Backup Automático**: Criação de backups completos dos dados
- **Restore**: Restauração de dados a partir de backup
- **Timestamp**: Controle de versão dos backups
- **Integridade**: Validação de dados durante restore

## 🔐 Sistema de Autenticação

### **Tipos de Usuário**
```typescript
type UserRole = 'admin' | 'doctor' | 'patient';
```

### **Estrutura de Usuário**
- **BaseUser**: Campos comuns (id, nome, email, role, imagem)
- **Doctor**: Extensão com especialidade médica
- **Patient**: Usuário básico para agendamentos
- **Admin**: Acesso total ao sistema

### **Contexto de Autenticação**
- **Estado Global**: Usuário logado e status de carregamento
- **Métodos**: Login, registro, logout, atualização
- **Proteção de Rotas**: Acesso baseado em perfil

## 📱 Navegação e Roteamento

### **Estrutura de Navegação**
- **Rotas Públicas**: Login e registro
- **Rotas Protegidas**: Baseadas no perfil do usuário
- **Navegação Condicional**: Diferentes dashboards por perfil

### **Fluxo de Navegação**
1. **Autenticação** → Login/Registro
2. **Dashboard Principal** → Baseado no perfil
3. **Funcionalidades** → Navegação entre telas
4. **Perfil** → Gerenciamento de conta

## 🚀 Como Executar o Projeto

### **Pré-requisitos**
- Node.js 18+ instalado
- Expo CLI instalado globalmente
- Android Studio (para Android) ou Xcode (para iOS)

### **Instalação**
```bash
# Clone o repositório
git clone [URL_DO_REPOSITORIO]

# Entre na pasta do projeto
cd marcacaoDeConsultasMedicas

# Instale as dependências
npm install

# Inicie o projeto
npm start
```

### **Scripts Disponíveis**
```json
{
  "start": "expo start",           // Inicia o servidor de desenvolvimento
  "android": "expo start --android", // Executa no Android
  "ios": "expo start --ios",       // Executa no iOS
  "web": "expo start --web"        // Executa na web
}
```

### **Executando no Dispositivo**
1. Instale o app **Expo Go** no seu dispositivo
2. Escaneie o QR Code que aparece no terminal
3. A aplicação será carregada automaticamente

## 📋 Funcionalidades por Perfil

### **👤 Paciente**
- ✅ Agendar consultas médicas
- ✅ Visualizar histórico de consultas
- ✅ Gerenciar perfil pessoal
- ✅ Receber notificações de consultas
- ✅ Cancelar consultas agendadas

### **👨‍⚕️ Médico**
- ✅ Visualizar consultas agendadas
- ✅ Confirmar/cancelar consultas
- ✅ Acessar estatísticas pessoais
- ✅ Gerenciar agenda de atendimento
- ✅ Receber notificações de novos agendamentos

### **👨‍💼 Administrador**
- ✅ Acesso total ao sistema
- ✅ Gerenciar todos os usuários
- ✅ Visualizar estatísticas gerais
- ✅ Monitorar consultas em tempo real
- ✅ Gerenciar especialidades médicas

## 🔧 Configurações e Personalização

### **Tema Personalizável**
- Cores principais configuráveis
- Tipografia ajustável
- Espaçamentos customizáveis

### **Configurações de Notificação**
- Horários de lembretes
- Tipos de notificação
- Preferências de usuário

## 📱 Compatibilidade

### **Plataformas Suportadas**
- **Android**: 6.0 (API 23) e superior
- **iOS**: 12.0 e superior
- **Web**: Navegadores modernos (Chrome, Firefox, Safari, Edge)

