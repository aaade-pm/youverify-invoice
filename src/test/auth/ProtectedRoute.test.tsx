import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/features/auth/providers/AuthProvider";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";

// 🔐 hoisted mocks
const authMocks = vi.hoisted(() => {
  return {
    getSession: vi.fn(),
    onAuthStateChange: vi.fn(),
  };
});

vi.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      getSession: authMocks.getSession,
      onAuthStateChange: authMocks.onAuthStateChange,
    },
  },
}));

function Login() {
  return <div>Login Page</div>;
}

function Dashboard() {
  return <div>Dashboard</div>;
}

describe("ProtectedRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    authMocks.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });
  });

  it("redirects to /login when unauthenticated", async () => {
    authMocks.getSession.mockResolvedValue({
      data: { session: null },
    });

    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(await screen.findByText("Login Page")).toBeInTheDocument();
  });

  it("renders children when authenticated", async () => {
    authMocks.getSession.mockResolvedValue({
      data: {
        session: {
          user: { user_metadata: {} },
        },
      },
    });

    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(await screen.findByText("Dashboard")).toBeInTheDocument();
  });
});
