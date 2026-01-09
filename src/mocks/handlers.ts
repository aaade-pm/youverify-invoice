import { http, HttpResponse } from 'msw'

// Placeholder auth handlers
// Note: Supabase uses real-time WebSocket connections that MSW cannot intercept
// These handlers are placeholders for future API endpoints
export const authHandlers = [
  // Sign in
  http.post('*/auth/v1/token', async () => {
    return HttpResponse.json({
      access_token: 'mock-access-token',
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: 'mock-refresh-token',
      user: {
        id: 'mock-user-id',
        email: 'test@example.com',
        created_at: new Date().toISOString(),
      },
    })
  }),

  // Get session
  http.get('*/auth/v1/user', async () => {
    return HttpResponse.json({
      id: 'mock-user-id',
      email: 'test@example.com',
      created_at: new Date().toISOString(),
    })
  }),

  // Sign out
  http.post('*/auth/v1/logout', async () => {
    return HttpResponse.json({})
  }),
]

// Placeholder invoice handlers
export const invoiceHandlers = [
  // Get invoices
  http.get('/api/invoices', async () => {
    return HttpResponse.json({
      invoices: [],
      total: 0,
    })
  }),

  // Get invoice by ID
  http.get('/api/invoices/:id', async () => {
    return HttpResponse.json({
      id: '1',
      title: 'Sample Invoice',
      amount: 1000,
      status: 'pending',
    })
  }),

  // Create invoice
  http.post('/api/invoices', async () => {
    return HttpResponse.json({
      id: '1',
      title: 'New Invoice',
      amount: 1000,
      status: 'pending',
    })
  }),
]

export const handlers = [...authHandlers, ...invoiceHandlers]

