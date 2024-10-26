import { Request, Response, NextFunction } from 'express';

function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.error('Erro:', err.message);
	console.error('Stack:', err.stack);

	let translatedMessage = err.message;
	let suggestion = 'Verifique o código na linha mencionada para mais detalhes.';

	// Captura linha e coluna da mensagem de erro ou do stack trace, se disponíveis
	let lineNumber = 'desconhecida';
	let columnNumber = 'desconhecida';

	const messageMatch = err.message.match(/line (\d+) column (\d+)/);
	if (messageMatch) {
		lineNumber = messageMatch[1];
		columnNumber = messageMatch[2];
	} else {
		const stackMatch = err.stack?.match(/:(\d+):(\d+)/);
		if (stackMatch) {
			lineNumber = stackMatch[1];
			columnNumber = stackMatch[2];
		}
	}

	// Lista de mensagens de erro com sugestões e traduções em português, incluindo arquivo, linha e coluna
	const errorMessages: {
		[key: string]: { message: string; suggestion: string };
	} = {
		'Unexpected token }': {
			message: "Token inesperado '}' no JSON",
			suggestion: `Verifique se há uma vírgula extra no final do JSON. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Cannot POST': {
			message: 'Rota não encontrada para a requisição POST',
			suggestion: `Verifique se a porta usada na URL está correta e corresponde à porta em que o servidor está sendo executado.`,
		},
		'Unexpected token ,': {
			message: "Token inesperado ',' no JSON",
			suggestion: `Verifique se há uma vírgula adicional no final da última propriedade do JSON. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Unexpected token': {
			message: 'Token inesperado no JSON',
			suggestion: `Certifique-se de que todos os elementos no JSON estão devidamente formatados. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Expected double-quoted property name in JSON': {
			message: 'Esperado nome de propriedade entre aspas duplas no JSON',
			suggestion: `Verifique se todos os nomes de propriedades no JSON estão entre aspas duplas. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Cannot read property': {
			message: 'Não é possível ler a propriedade',
			suggestion: `Certifique-se de que o objeto não é nulo ou indefinido antes de acessar suas propriedades. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		SyntaxError: {
			message: 'Erro de sintaxe',
			suggestion: `Verifique a sintaxe do seu código e certifique-se de que não há caracteres inesperados. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		ReferenceError: {
			message: 'Variável não definida',
			suggestion: `Verifique se todas as variáveis estão declaradas e definidas antes de usá-las. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		TypeError: {
			message: 'Tipo de dado incorreto',
			suggestion: `Certifique-se de que os tipos de dados estão corretos para a operação. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		ValidationError: {
			message: 'Erro de validação',
			suggestion: `Verifique se os dados enviados atendem aos requisitos esperados. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'duplicate key error': {
			message: 'Erro de chave duplicada',
			suggestion: `Verifique se o valor já existe no banco de dados ou ajuste o índice para não ser único. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		ENOENT: {
			message: 'Arquivo ou diretório inexistente',
			suggestion: `Verifique o caminho e a existência do arquivo ou diretório especificado. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		timeout: {
			message: 'Tempo limite excedido',
			suggestion: `Verifique sua conexão ou o servidor alvo para garantir que estejam funcionando corretamente. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Cast to ObjectId failed': {
			message: 'Erro de conversão para ObjectId',
			suggestion: `Verifique se o ID fornecido tem o formato correto para o MongoDB. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		EADDRINUSE: {
			message: 'Porta em uso',
			suggestion: `Verifique se já há um servidor rodando na mesma porta ou troque para uma porta livre. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'JSON.parse': {
			message: 'Erro ao analisar JSON',
			suggestion: `Verifique se o JSON está bem formatado com todas as aspas e vírgulas corretas. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		RangeError: {
			message: 'Valor fora do intervalo permitido',
			suggestion: `Verifique se o valor está dentro dos limites suportados. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Division by zero': {
			message: 'Divisão por zero',
			suggestion: `Evite operações que tentem dividir por zero. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		NetworkError: {
			message: 'Erro de rede',
			suggestion: `Verifique sua conexão com a internet ou o servidor de destino. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		URIError: {
			message: 'Erro no URI',
			suggestion: `Verifique se o URI está corretamente formatado. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Permission denied': {
			message: 'Permissão negada',
			suggestion: `Verifique as permissões para acessar o recurso solicitado. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Out of memory': {
			message: 'Memória insuficiente',
			suggestion: `Tente otimizar o uso de memória do aplicativo ou aumentar os recursos do sistema. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		DeprecationWarning: {
			message: 'Aviso de depreciação',
			suggestion: `Considere atualizar para uma versão mais recente do método ou função. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Invalid URL': {
			message: 'URL inválida',
			suggestion: `Verifique se a URL está formatada corretamente, incluindo o protocolo (por exemplo, 'http://' ou 'https://') e o endereço correto. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'File not found': {
			message: 'Arquivo não encontrado',
			suggestion: `Verifique o caminho do arquivo especificado. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Access denied': {
			message: 'Acesso negado',
			suggestion: `Verifique suas permissões e autenticação para o recurso. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Operation not permitted': {
			message: 'Operação não permitida',
			suggestion: `Certifique-se de que você tem as permissões adequadas. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Not implemented': {
			message: 'Função não implementada',
			suggestion: `Verifique se a funcionalidade foi completamente desenvolvida. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Uncaught exception': {
			message: 'Exceção não tratada',
			suggestion: `Adicione tratamento de exceção para evitar este erro. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Invalid Date': {
			message: 'Data inválida',
			suggestion: `Verifique se a data está no formato correto. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Invalid number': {
			message: 'Número inválido',
			suggestion: `Verifique se o valor é um número válido. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Resource unavailable': {
			message: 'Recurso indisponível',
			suggestion: `Tente novamente mais tarde ou verifique o status do recurso. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Insufficient storage': {
			message: 'Armazenamento insuficiente',
			suggestion: `Libere espaço ou aumente a capacidade de armazenamento. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Authentication failed': {
			message: 'Falha na autenticação',
			suggestion: `Verifique as credenciais e tente novamente. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Account locked': {
			message: 'Conta bloqueada',
			suggestion: `Entre em contato com o suporte para desbloquear a conta. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Parse Error': {
			message: 'Erro de análise',
			suggestion: `Verifique a estrutura e sintaxe dos dados enviados. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Payload too large': {
			message: 'Carga útil muito grande',
			suggestion: `Tente enviar dados menores ou comprimir o payload. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Unprocessable Entity': {
			message: 'Entidade não processável',
			suggestion: `Verifique os dados enviados e o formato esperado. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Service Unavailable': {
			message: 'Serviço indisponível',
			suggestion: `Tente novamente mais tarde. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Gateway Timeout': {
			message: 'Tempo limite do gateway excedido',
			suggestion: `Verifique a conectividade com o servidor. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Unknown Error': {
			message: 'Erro desconhecido',
			suggestion: `Reinicie o aplicativo e verifique o log para detalhes. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Invalid email format': {
			message: 'Formato de email inválido',
			suggestion: `Certifique-se de que o email está em um formato válido. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Invalid URL 2': {
			message: 'URL inválida',
			suggestion: `Verifique se o URL está corretamente formatado. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Invalid phone number': {
			message: 'Número de telefone inválido',
			suggestion: `Verifique se o número está no formato correto. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'SQL syntax error': {
			message: 'Erro de sintaxe SQL',
			suggestion: `Verifique a consulta SQL e a sintaxe utilizada. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'File upload error': {
			message: 'Erro no envio de arquivo',
			suggestion: `Verifique o tamanho do arquivo e o formato permitido. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Database connection failed': {
			message: 'Falha na conexão com o banco de dados',
			suggestion: `Certifique-se de que o banco de dados está acessível e funcionando. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Token expired': {
			message: 'Token expirado',
			suggestion: `Revalide o token de autenticação. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Session timed out': {
			message: 'Sessão expirada',
			suggestion: `Peça ao usuário que faça login novamente. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'File permission denied': {
			message: 'Permissão de arquivo negada',
			suggestion: `Verifique as permissões de leitura/escrita para o arquivo. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Rate limit exceeded': {
			message: 'Limite de taxa excedido',
			suggestion: `Reduza a frequência das requisições para o servidor. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Dependency not found': {
			message: 'Dependência não encontrada',
			suggestion: `Verifique se todas as dependências estão instaladas corretamente. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Invalid JSON format': {
			message: 'Formato JSON inválido',
			suggestion: `Verifique se o JSON está corretamente formatado. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Missing required field': {
			message: 'Campo obrigatório ausente',
			suggestion: `Preencha todos os campos obrigatórios antes de enviar. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'File too large': {
			message: 'Arquivo muito grande',
			suggestion: `Tente enviar um arquivo menor ou comprimir o arquivo. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		'Disk quota exceeded': {
			message: 'Cota de disco excedida',
			suggestion: `Libere espaço no disco ou aumente a cota. Linha ${lineNumber}, coluna ${columnNumber}.`,
		},
		// Continue adicionando mais mensagens conforme necessário
	};

	// Verifica se o erro é uma das mensagens conhecidas e aplica tradução e sugestão
	for (const key in errorMessages) {
		if (err.message.includes(key)) {
			translatedMessage = errorMessages[key].message;
			suggestion = errorMessages[key].suggestion;
			break;
		}
	}

	res.status(500).json({
		message: 'Ocorreu um erro no servidor',
		error:
			process.env.NODE_ENV === 'production' ? undefined : translatedMessage,
		suggestion: process.env.NODE_ENV === 'production' ? undefined : suggestion,
	});

	next(err);
}

export default errorHandler;
