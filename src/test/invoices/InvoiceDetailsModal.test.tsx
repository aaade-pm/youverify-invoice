import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@/test/utils";
import userEvent from "@testing-library/user-event";
import { InvoiceDetailsModal } from "@/features/invoices/components/InvoiceDetailsModal";
import { mockInvoiceDetails } from "@/features/invoices/data/mockInvoiceDetails";

describe("InvoiceDetailsModal", () => {
  const mockOnClose = vi.fn();
  const mockOnDownloadPDF = vi.fn();
  const mockOnSendInvoice = vi.fn();
  const mockOnDuplicate = vi.fn();
  const mockOnGetShareableLink = vi.fn();

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    invoice: mockInvoiceDetails,
    isLoading: false,
    isError: false,
    onDownloadPDF: mockOnDownloadPDF,
    onSendInvoice: mockOnSendInvoice,
    onDuplicate: mockOnDuplicate,
    onGetShareableLink: mockOnGetShareableLink,
  };

  /**
   * TEST 1
   * Modal opens with correct invoice data
   * Purpose: Verify wiring + data rendering
   */
  it("renders modal with correct invoice data when opened", () => {
    render(<InvoiceDetailsModal {...defaultProps} />);

    // Modal is visible (invoice number is the main identifier)
    expect(screen.getByText("Invoice - 1023494 - 2304")).toBeInTheDocument();

    // Customer name is visible
    expect(screen.getByText("Olaniyi Ojo Adewale")).toBeInTheDocument();

    // Total amount due section is visible (key financial data)
    expect(screen.getByText(/TOTAL AMOUNT DUE/i)).toBeInTheDocument();

    // Key sections render - check for reminders section
    expect(screen.getByText(/REMINDERS/i)).toBeInTheDocument();
  });

  /**
   * TEST 2
   * Modal closes when close button is clicked
   * Purpose: UX correctness
   */
  it("closes modal when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<InvoiceDetailsModal {...defaultProps} />);

    // Find close buttons by aria-label (there are two: desktop and mobile)
    const closeButtons = screen.getAllByLabelText("Close dialog");
    expect(closeButtons.length).toBeGreaterThan(0);

    // Click the mobile button (last one, inside dialog content) which should be clickable
    const mobileButton = closeButtons[closeButtons.length - 1];
    await user.click(mobileButton);

    // Verify onClose handler was called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  /**
   * TEST 3
   * Action buttons are rendered
   * Purpose: Business-critical UI
   */
  it("renders all action buttons", () => {
    render(<InvoiceDetailsModal {...defaultProps} />);

    // Download as PDF button
    expect(
      screen.getByRole("button", { name: /DOWNLOAD AS PDF/i })
    ).toBeInTheDocument();

    // Send Invoice button
    expect(
      screen.getByRole("button", { name: /SEND INVOICE/i })
    ).toBeInTheDocument();

    // More menu button
    expect(screen.getByRole("button", { name: /MORE/i })).toBeInTheDocument();
  });

  /**
   * Additional test: Modal does not render when isOpen is false
   */
  it("does not render modal when isOpen is false", () => {
    render(<InvoiceDetailsModal {...defaultProps} isOpen={false} />);

    // Invoice number should not be visible
    expect(
      screen.queryByText("Invoice - 1023494 - 2304")
    ).not.toBeInTheDocument();
  });

  /**
   * Additional test: Shows loading state
   */
  it("shows loading state when isLoading is true", () => {
    render(<InvoiceDetailsModal {...defaultProps} isLoading={true} />);

    expect(
      screen.queryByText("Invoice - 1023494 - 2304")
    ).not.toBeInTheDocument();
  });

  /**
   * Additional test: Shows error state
   */
  it("shows error state when isError is true", () => {
    render(<InvoiceDetailsModal {...defaultProps} isError={true} />);

    // Error message should be visible
    expect(
      screen.getByText("Failed to load invoice details")
    ).toBeInTheDocument();

    // Error close button should be present (use getAllByRole since there are multiple close buttons)
    const closeButtons = screen.getAllByRole("button", { name: /Close/i });
    expect(closeButtons.length).toBeGreaterThan(0);
  });
});
