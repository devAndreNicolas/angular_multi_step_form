# Sistema de Autenticação Angular & Multi-Step Form

## 📚 Visão Geral
Sistema de autenticação moderno em Angular que implementa um fluxo de cadastro único com formulário multi-etapas reutilizável, usando Bulma CSS para estilização.

## 🏗️ Arquitetura

### Fluxo de Autenticação
```
Cadastro Único → Login/Registro → Home → Multi-Step Form
```

O sistema utiliza uma abordagem de verificação de email única, onde:
1. Usuário fornece email
2. Sistema verifica existência
3. Redireciona para Login ou Registro
4. Após autenticação, acessa Home e formulários

### Componentes Principais

#### 1. Cadastro Único
- Ponto de entrada único
- Verificação de email
- Roteamento inteligente

#### 2. Autenticação
- **Login**: Autenticação de existentes
- **Registro**: Cadastro de novos
- **Home**: Dashboard pós-login

#### 3. Multi-Step Form
- Formulário em etapas
- Campos configuráveis
- Validação por etapa

## 💻 Implementação

### Estrutura de Arquivos
```
src/
├── app/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── cadastro-unico/
│   │   │   ├── login/
│   │   │   └── registro/
|   |   └── forms/
|   |   |   ├── confirmacao-passo/
│   │   │   ├── form-teste/
│   │   │   ├── input-passo/
│   │   │   └── multi-step-form/
│   │   └── home/
│   ├── services/
│   ├── guards/
│   └── models/
```

### Serviços Principais

```typescript
// AuthService - Gerenciamento de autenticação
export class AuthService {
  private readonly USERS_KEY = 'USERS';
  private readonly TOKEN_KEY = 'AUTH_TOKEN';
  private readonly TEMP_EMAIL_KEY = 'TEMP_EMAIL';
  private readonly LAST_CLEANUP_KEY = 'LAST_CLEANUP';
  private readonly ONE_DAY = 24 * 60 * 60 * 1000; // 1 dia em milissegundos
  
  // Métodos principais
  login()
  register()
  logout()

  // Limpeza automática
  private initAutoCleanup()
  private checkAndCleanup()
  private clearAllData()
}

// FormService - Gerenciamento do formulário
export class FormService {
  private data: any = {};
  private stepIndex = 0;
  
  // Métodos principais
  nextStep()
  previousStep()
  updateData()
}
```

## 🚀 Instalação e Uso

```bash
# Instalar dependências
npm install

# Iniciar desenvolvimento
ng serve
```

### Uso do Multi-Step Form

```typescript
// Definição de campos
export class FormTesteComponent {
  fields: DynamicField[] = [
    { label: 'Nome Completo', name: 'nomeCompleto', type: 'text', required: true },
    { label: 'Endereço', name: 'endereco', type: 'text', required: true },
    { label: 'Idade', name: 'idade', type: 'number', required: true },
    { label: 'Gênero', name: 'genero', type: 'select', required: true, options: ['Masculino', 'Feminino', 'Outro'] },
    { label: 'Email', name: 'email', type: 'email', required: true }
  ];
}

// Implementação
<app-multi-step-form [dynamicFields]="fields"></app-multi-step-form>
```

## 🔒 Segurança

```typescript
// Guard de Rotas
export const authGuard: CanActivateFn = (route, state) => {
  if (!authService.isAuthenticated) {
    return router.navigate(['/auth/login']);
  }
  return true;
};
```

## 🎨 Interface

### Estilização
- Framework: Bulma CSS
- Componentes consistentes
- Layout responsivo

### Elementos
- Inputs arredondados
- Feedback de erro
- Estados de loading

## 📝 Boas Práticas

1. **Componentização**
   - Componentes isolados
   - Responsabilidades definidas
   - Código reutilizável

2. **Estado**
   - Forms reativos
   - Observables
   - LocalStorage

3. **Erros**
   - Validação completa
   - Mensagens amigáveis
   - Fallbacks

## 🛠️ Melhorias Futuras

1. **Backend**
   - API real
   - Auth server
   - Database

2. **Segurança**
   - JWT
   - Refresh tokens
   - OAuth

3. **Features**
   - Reset senha
   - Verificação email
   - Perfil

## 💡 Debug

```typescript
// Limpar dados
window.auth.clearAllData();

// Ver usuários
console.log(auth.getStoredUsers());
```

## 📝 Contribuição
Contribua via pull requests ou issues para bugs/melhorias.

---

Desenvolvido com ❤️ usando Angular e Bulma CSS.