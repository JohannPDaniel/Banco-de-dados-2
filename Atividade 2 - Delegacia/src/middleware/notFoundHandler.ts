import { Request, Response, NextFunction } from 'express';

// Middleware para tratar erros 404
function notFoundHandler(req: Request, res: Response, next: NextFunction) {
	res.status(404).json({
		error: 'Rota não encontrada',
		message:
			'A rota que você tentou acessar não existe. Verifique o caminho e a porta do servidor.',
	});

    next()
}

export default notFoundHandler;
