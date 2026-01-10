import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AuthProvider } from "@/features/auth/providers/AuthProvider";
import { useAuth } from "@/features/auth/hooks/useAuth";

// 🔐 hoisted mocks (safe for ESM)
const authMocks = vi.hoisted(() => {
  return {
    getSession: vi.fn(),
    onAuthStateChange: vi.fn(),
    signOut: vi.fn(),
  };
});

vi.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      getSession: authMocks.getSession,
      onAuthStateChange: authMocks.onAuthStateChange,
      signOut: authMocks.signOut,
    },
  },
}));

function TestConsumer() {
  const { isLoading, firstName, lastName } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div>{firstName}</div>
      <div>{lastName}</div>
    </>
  );
}

describe("AuthProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    authMocks.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });
  });

  it("loads session and exposes user info", async () => {
    authMocks.getSession.mockResolvedValue({
      data: {
        session: {
          user: {
            user_metadata: {
              first_name: "Jane",
              last_name: "Smith",
            },
          },
        },
      },
    });

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    expect(await screen.findByText("Jane")).toBeInTheDocument();
    expect(screen.getByText("Smith")).toBeInTheDocument();
  });
});
