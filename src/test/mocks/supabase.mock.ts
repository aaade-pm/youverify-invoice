import { vi } from "vitest";
import type { Session, User } from "@supabase/supabase-js";

export const mockGetSession = vi.fn();
export const mockOnAuthStateChange = vi.fn();
export const mockSignOut = vi.fn();

export const createMockSession = (user?: Partial<User>): Session => ({
  access_token: "mock-token",
  token_type: "bearer",
  expires_in: 3600,
  expires_at: Date.now() / 1000 + 3600,
  refresh_token: "mock-refresh",
  user: {
    id: "mock-user-id",
    email: "test@example.com",
    created_at: new Date().toISOString(),
    app_metadata: {},
    user_metadata: {
      first_name: "John",
      last_name: "Doe",
      ...user?.user_metadata,
    },
    aud: "authenticated",
    confirmation_sent_at: null,
    recovery_sent_at: null,
    email_confirmed_at: new Date().toISOString(),
    invited_at: null,
    action_link: null,
    last_sign_in_at: new Date().toISOString(),
    phone: null,
    phone_confirmed_at: null,
    confirmed_at: new Date().toISOString(),
    ...user,
  } as User,
});

export const mockSupabaseAuth = {
  getSession: mockGetSession,
  onAuthStateChange: mockOnAuthStateChange,
  signOut: mockSignOut,
};

export const mockSupabase = {
  auth: mockSupabaseAuth,
};
