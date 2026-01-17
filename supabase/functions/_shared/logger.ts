// Shared logger for Supabase Edge Functions
// Writes to both console and the function_logs table

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  function_name: string;
  level: LogLevel;
  message: string;
  data?: Record<string, unknown>;
}

async function writeToDb(entry: LogEntry): Promise<void> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.warn('Logger: Supabase credentials not available, skipping DB write');
    return;
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/function_logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        function_name: entry.function_name,
        level: entry.level,
        message: entry.message,
        data: entry.data || null,
      }),
    });

    if (!response.ok) {
      console.error('Logger: Failed to write to DB:', response.status);
    }
  } catch (err) {
    console.error('Logger: Error writing to DB:', err);
  }
}

export function createLogger(functionName: string) {
  const log = (level: LogLevel, message: string, data?: Record<string, unknown>) => {
    // Always log to console
    const timestamp = new Date().toISOString();
    const consoleMsg = `[${timestamp}] [${functionName}] [${level.toUpperCase()}] ${message}`;
    
    switch (level) {
      case 'debug':
        console.debug(consoleMsg, data || '');
        break;
      case 'info':
        console.info(consoleMsg, data || '');
        break;
      case 'warn':
        console.warn(consoleMsg, data || '');
        break;
      case 'error':
        console.error(consoleMsg, data || '');
        break;
    }

    // Also write to database (non-blocking)
    writeToDb({ function_name: functionName, level, message, data }).catch(() => {});
  };

  return {
    debug: (message: string, data?: Record<string, unknown>) => log('debug', message, data),
    info: (message: string, data?: Record<string, unknown>) => log('info', message, data),
    warn: (message: string, data?: Record<string, unknown>) => log('warn', message, data),
    error: (message: string, data?: Record<string, unknown>) => log('error', message, data),
  };
}
