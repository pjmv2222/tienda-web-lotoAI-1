import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';

// Extender la interfaz Request para incluir el usuario
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

interface AuthenticatedRequest extends Request {
  user?: { id: number; email?: string };
}

export const validateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) {
      return res.sendStatus(401);
    }
  
    const decoded = jwt.verify(token, process.env['JWT_SECRET'] || 'your-secret-key');
    req.user = decoded as { id: number; email?: string };
    next();
    return;

  } catch (err) {
    return res.sendStatus(403);
  }
};

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const user = jwt.verify(token, process.env['JWT_SECRET'] || 'your-secret-key');
    req.user = user as { id: number; email?: string };
    next();
    return;
    
  } catch (error) {
    return res.status(403).json({ message: 'Token is not valid' });
  }
};