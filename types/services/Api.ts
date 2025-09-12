export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: any;
}

export interface RequestConfig {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  data?: any;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
}

export interface ApiClient {
  get<T>(url: string, config?: Partial<RequestConfig>): Promise<ApiResponse<T>>;
  post<T>(
    url: string,
    data?: any,
    config?: Partial<RequestConfig>
  ): Promise<ApiResponse<T>>;
  put<T>(
    url: string,
    data?: any,
    config?: Partial<RequestConfig>
  ): Promise<ApiResponse<T>>;
  delete<T>(
    url: string,
    config?: Partial<RequestConfig>
  ): Promise<ApiResponse<T>>;
  patch<T>(
    url: string,
    data?: any,
    config?: Partial<RequestConfig>
  ): Promise<ApiResponse<T>>;
}
