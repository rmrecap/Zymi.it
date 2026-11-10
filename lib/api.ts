import config from './config';

export const apiClient = {
  get baseUrl() {
    return config.apiBaseUrl;
  },
  
  async request(endpoint: string, options: RequestInit = {}) {
    const base = this.baseUrl;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = base ? `${base}${cleanEndpoint}` : cleanEndpoint;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };
    
    try {
      const response = await fetch(url, { ...defaultOptions, ...options });
      
      let cachedText: string | null = null;
      const readText = async () => {
        if (cachedText === null) {
          cachedText = await response.text();
        }
        return cachedText;
      };

      // Safe proxy wrapper around Response so .json() never throws
      // SyntaxError: Unexpected token '<' when receiving HTML 404/500 responses.
      const safeResponse = new Proxy(response, {
        get(target, prop, receiver) {
          if (prop === 'text') {
            return () => readText();
          }
          if (prop === 'json') {
            return async () => {
              try {
                const text = await readText();
                if (!text || !text.trim()) return [];
                return JSON.parse(text);
              } catch (parseError) {
                console.warn(`[apiClient] Safe JSON parse caught non-JSON content for ${cleanEndpoint}`);
                return [];
              }
            };
          }
          const value = Reflect.get(target, prop, receiver);
          return typeof value === 'function' ? value.bind(target) : value;
        },
      });

      return safeResponse as Response;
    } catch (networkError: any) {
      // Graceful fallback when backend or network is unreachable
      return {
        ok: false,
        status: 503,
        statusText: networkError?.message || "Backend server unreachable",
        json: async () => [],
        text: async () => "",
      } as unknown as Response;
    }
  },
  
  // Convenience methods
  get: (endpoint: string, options?: RequestInit) => 
    apiClient.request(endpoint, { ...options, method: 'GET' }),
    
  post: (endpoint: string, data?: any, options?: RequestInit) =>
    apiClient.request(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),
    
  put: (endpoint: string, data?: any, options?: RequestInit) =>
    apiClient.request(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),
    
  delete: (endpoint: string, options?: RequestInit) =>
    apiClient.request(endpoint, { ...options, method: 'DELETE' }),
};

export default apiClient;
