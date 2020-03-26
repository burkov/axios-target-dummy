// RFC7807 compliant error shape, see https://tools.ietf.org/html/rfc7807
export interface JPFError {
  type: string; // Unique error id to distinguish errors
  title: string; // Short description, customer-facing, localized
  detail: string; // Full description, customer-facing, localized
  location?: string; // Reference to request data which led to error (useful for forms)
  [key: string]: any; // Any feature-specific payload
}

export interface JPFResponse<T = any> {
  errors?: JPFError[];
  result?: T;
}
