# Copilot Instructions for Tienda Web LotoAI

## Architecture Overview

This is a **Spanish lottery prediction platform** with Angular 18 SSR frontend and Express.js backend, using PostgreSQL and integrated AI services for lottery number predictions.

### Core Architecture
- **Frontend**: Angular 18 with SSR (Server-Side Rendering) - serves from port 4000
- **Backend**: Express.js with PostgreSQL integration - embedded in same server process  
- **AI Services**: External Python AI server (port 5000) for lottery predictions
- **Data Sources**: Web scrapers for lottery results using Puppeteer
- **Deployment**: PM2 with GitHub Actions CI/CD to VPS

## Essential Commands

```bash
# Development
npm run build:ssr                    # Build Angular SSR application
npm run serve:ssr                    # Serve built SSR application 
npm run scraper:all                  # Run lottery data scrapers
npm run build:scraper                # Compile TypeScript scrapers

# Deployment (PowerShell format for CI/CD)
git add . ; git commit -m "fix: description" ; git push origin main
```

## Critical File Structure

```
├── server.ts                       # Main Express server with API routes
├── src/app/
│   ├── pages/profile/              # User subscription management
│   ├── services/                   # Angular services for API calls
│   └── auth/                       # JWT authentication system
├── scraper/                        # Puppeteer-based lottery scrapers
└── archivos-para-servidor/         # AI models and datasets
```

## Key Patterns & Conventions

### 1. **Unified Server Architecture**
- Single `server.ts` file contains both SSR and API routes
- API routes prefixed with `/api/*` 
- PostgreSQL connection pool shared across routes
- JWT authentication via cookies AND Authorization header

```typescript
// server.ts pattern:
server.get('/api/predictions/summary', authenticateToken, async (req, res) => {
  const client = await pgPool.connect();
  // Always use try/finally with client.release()
});
```

### 2. **Spanish Lottery Domain Logic**
- Multiple lottery types: primitiva, bonoloto, euromillon, etc.
- Plan-based prediction limits (Plan Básico: 3 per game)
- Date-filtered prediction counting from subscription start_date

### 3. **Subscription System**
- Three tiers: Plan Básico, Plan Mensual, Plan Pro
- PostgreSQL `subscriptions` table with `plan_id`, `start_date`, `end_date`
- Frontend maps `sub.startDate/endDate` to `created_at/expires_at`

### 4. **Environment Configuration**
- Development: `apiUrl: '/api'`, `iaApiUrl: 'http://localhost:5000'`
- Production: Environment-specific URLs in `ecosystem.config.js`
- Stripe/PayPal integration with test keys in development

### 5. **Angular SSR Specifics**
- Profile component uses tab system for multiple subscription display
- SSR-safe services with `isPlatformBrowser()` checks
- Date pipe formatting requires ISO string conversion from PostgreSQL timestamps

## Data Flow Patterns

### Authentication Flow
1. JWT stored in cookies (primary) + Authorization header (fallback)
2. `authenticateToken` middleware extracts from both sources
3. `req.user.id` used for user-specific queries

### Prediction Workflow
1. Frontend calls `/api/predictions/summary` 
2. Server queries active subscription from PostgreSQL
3. Counts predictions since `subscription.start_date`
4. Returns usage vs. limits per lottery game

### Date Handling Critical Pattern
```typescript
// PostgreSQL timestamps must be converted for Angular date pipe
const startDate = sub.startDate ? new Date(sub.startDate).toISOString() : new Date().toISOString();
```

## Development Workflow

### Database Schema (PostgreSQL)
- `users`: id, email, nombre, apellido, created_at
- `subscriptions`: user_id, plan_id, status, start_date, end_date
- `user_predictions`: user_id, game_type, created_at

### Deployment Pattern
- GitHub Actions trigger on `main` branch push
- Two-phase deployment: git pull + PM2 restart
- Uses `ecosystem.config.js` for PM2 process management
- VPS: 212.227.230.103 (production environment)

### Debugging Conventions
- Extensive console logging with emoji prefixes: `🔍 [PROFILE]`, `📊 [SERVER]`
- Error handling with try/catch and client.release() in finally blocks
- Debug mode shows raw database values alongside formatted output

## External Integrations

- **Stripe**: Payment processing with webhook handling
- **PayPal**: Alternative payment method
- **Mailjet**: Email service for notifications  
- **Puppeteer**: Web scraping for lottery results
- **Python AI Service**: Lottery number prediction algorithms

## Common Pitfalls

1. **Date Formatting**: PostgreSQL timestamps need explicit Date conversion for Angular pipes
2. **SSR Compatibility**: Always check `isPlatformBrowser()` before DOM access
3. **Database Connections**: Must release PostgreSQL client in finally block
4. **Plan ID Mapping**: Frontend expects `plan_id` as `id` field in subscription responses
5. **Authentication**: Support both cookie and header token extraction for flexibility
