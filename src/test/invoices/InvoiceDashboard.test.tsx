import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";

import { InvoiceHomePage } from "@/features/invoices/pages/InvoiceHomePage";

vi.mock("@/features/auth/hooks/useAuth", () => ({
  useAuth: () => ({
    user: {
      id: "test-user",
      email: "test@example.com",
      user_metadata: {
        first_name: "John",
        last_name: "Doe",
      },
    },
    session: {},
    isLoading: false,
    firstName: "John",
    lastName: "Doe",
    signOut: vi.fn(),
  }),
}));

// helper to render with providers
function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["/dashboard"]}>
        <InvoiceHomePage />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe("Invoice Dashboard", () => {
  /**
   * TEST 1
   * renders invoice dashboard with data
   */
  it("renders invoice dashboard with data", async () => {
    renderPage();

    // stat card value (example)
    expect(await screen.findByText(/total paid/i)).toBeInTheDocument();

    expect(await screen.findByText(/TOTAL UNPAID/i)).toBeInTheDocument();
  });

  /**
   * TEST 2
   * shows skeletons while loading and replaces them with data
   */
  it("shows skeletons while loading and replaces them with data", async () => {
    // delay the response to simulate loading
    server.use(
      http.get("/api/invoices/stats", async () => {
        await new Promise((res) => setTimeout(res, 300));
        return HttpResponse.json([]);
      }),
      http.get("/api/invoices/recent", async () => {
        await new Promise((res) => setTimeout(res, 300));
        return HttpResponse.json([
          {
            date: "TODAY",
            invoices: [
              {
                id: "1",
                invoiceNumber: "Invoice - INV-001",
                dueDate: "May 19th, 2023",
                amount: "$2,000.00",
                status: "paid",
              },
            ],
          },
        ]);
      }),
      http.get("/api/invoices/activities", async () => {
        await new Promise((res) => setTimeout(res, 300));
        return HttpResponse.json([]);
      })
    );

    renderPage();

    // skeletons visible initially
    await waitFor(() => {
      const skeletons = screen.queryAllByTestId("skeleton");
      expect(skeletons.length).toBeGreaterThan(0);
    });

    // data replaces skeletons
    expect(await screen.findByText(/inv-001/i)).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryAllByTestId("skeleton").length).toBe(0);
      },
      { timeout: 2000 }
    );
  });

  /**
   * TEST 3
   * shows empty state when no invoices exist
   */
  it("shows empty state when no invoices exist", async () => {
    server.use(
      http.get("/api/invoices/stats", () => HttpResponse.json([])),
      http.get("/api/invoices/recent", () => HttpResponse.json([])),
      http.get("/api/invoices/activities", () => HttpResponse.json([]))
    );

    renderPage();

    // no invoice rows
    await waitFor(() => {
      expect(screen.queryByText(/inv-/i)).not.toBeInTheDocument();
    });

    // empty state CTA - wait for async rendering
    expect(
      await screen.findByRole("button", { name: /create invoice/i })
    ).toBeInTheDocument();
  });
});
