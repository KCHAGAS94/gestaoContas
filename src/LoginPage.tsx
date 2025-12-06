import React, { useState } from 'react';
// Importe o 'useNavigate' se você estiver usando React Router para redirecionamento
// import { useNavigate } from 'react-router-dom'; 

// --- Configuração da API e Funções de Comunicação ---

// URL base da sua API no cPanel (MANTENHA ESTE VALOR)
const API_BASE_URL = 'https://gestaotarefas.kend.shop/api';

/**
 * Função para enviar dados de cadastro para o register.php
 */
export const registerUser = async (email: string, password: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/register.php`, {
            method: 'POST',
            headers: {
                // O header Content-Type é crucial para o PHP entender o JSON
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, message: data.message };
        } else {
            // Se o status HTTP não for 2xx (ex: 400, 409), exibe a mensagem de erro do PHP
            return { success: false, message: data.message || 'Erro desconhecido ao cadastrar.' };
        }
    } catch (error) {
        // Este erro geralmente é de CORS (se a conexão for recusada) ou DNS.
        console.error('Erro de rede/servidor:', error);
        return { success: false, message: 'Não foi possível conectar ao servidor. Verifique o console para mais detalhes.' };
    }
};

/**
 * Função para enviar dados de login para o login.php
 */
export const loginUser = async (email: string, password: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // ATENÇÃO: Aqui você salvará um TOKEN JWT no futuro.
            // Por enquanto, salva apenas o e-mail (dado não sensível) para manter a sessão.
            localStorage.setItem('userEmail', email); 
            
            // Retorna o sucesso.
            return { success: true, message: data.message };
        } else {
            return { success: false, message: data.message || 'Erro desconhecido ao fazer login.' };
        }
    } catch (error) {
        console.error('Erro de rede/servidor:', error);
        return { success: false, message: 'Não foi possível conectar ao servidor.' };
    }
};


// -------------------------------------------------------------------
// --- Componente React: LoginPage ---
// -------------------------------------------------------------------

const LoginPage: React.FC = () => {
    // const navigate = useNavigate(); // Descomente se estiver usando React Router

    // Estados para armazenar os valores dos campos
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Estado para exibir mensagens de status/erro ao usuário
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // Para evitar cliques duplos

    /**
     * Manipulador para o envio do formulário de LOGIN.
     */
    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        // Adiciona verificação para login também
        if (!email || !password) {
            setMessage('Preencha o e-mail e a senha para fazer login.');
            return;
        }

        setIsSubmitting(true);
        setMessage('Fazendo login...');

        const result = await loginUser(email, password);

        if (result.success) {
            setMessage(`Sucesso! ${result.message} Redirecionando...`);
            // Exemplo de redirecionamento:
            // navigate('/dashboard'); 
        } else {
            setMessage(`Erro: ${result.message}`);
        }
        setIsSubmitting(false);
    };

    /**
     * Manipulador para o botão de CADASTRO.
     * Corrigido com verificação de campos.
     */
    const handleRegisterClick = async () => {
        if (isSubmitting) return;

        // --- VERIFICAÇÃO CRUCIAL ADICIONADA AQUI ---
        if (!email || !password) {
            setMessage('Preencha o e-mail e a senha para se cadastrar.');
            return; // Interrompe a função se os campos estiverem vazios
        }
        // -------------------------------------------

        setIsSubmitting(true);
        setMessage('Tentando cadastrar...');

        const result = await registerUser(email, password);

        if (result.success) {
            setMessage(`Cadastro realizado com sucesso! ${result.message}. Agora faça login.`);
            // Limpa o formulário e incentiva o login
            setEmail('');
            setPassword('');
        } else {
            setMessage(`Erro ao cadastrar: ${result.message}`);
        }
        setIsSubmitting(false);
    };

    return (
        <div className="login-container">
            <h1>Login ou Cadastro</h1>
            
            {/* O formulário está configurado para o evento de LOGIN por padrão */}
            <form onSubmit={handleLoginSubmit}>
                
                <div className="form-group">
                    <label htmlFor="email">E-mail:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isSubmitting}
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Senha:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isSubmitting}
                    />
                </div>
                
                <div className="button-group">
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Aguarde...' : 'Entrar (Login)'}
                    </button>
                    
                    <button 
                        type="button" // Use type="button" para evitar submissão do form
                        onClick={handleRegisterClick} 
                        disabled={isSubmitting}
                        style={{ marginLeft: '10px' }}
                    >
                        Cadastrar
                    </button>
                </div>

            </form>

            {message && <p className="status-message">{message}</p>}
        </div>
    );
};

export default LoginPage;