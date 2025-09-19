import { type NextRequest, NextResponse } from "next/server"

// Mock invoice data
const mockInvoices = [
  {
    id: "1",
    invoice_number: "INV-001",
    client_name: "Acme Corporation",
    client_email: "billing@acme.com",
    amount: 2500.0,
    currency: "USD",
    status: "paid",
    due_date: "2024-01-15",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    invoice_number: "INV-002",
    client_name: "Tech Startup Inc",
    client_email: "finance@techstartup.com",
    amount: 1800.0,
    currency: "USD",
    status: "sent",
    due_date: "2024-02-01",
    created_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "3",
    invoice_number: "INV-003",
    client_name: "Design Agency",
    client_email: "accounts@designagency.com",
    amount: 3200.0,
    currency: "USD",
    status: "overdue",
    due_date: "2024-01-30",
    created_at: "2024-01-10T00:00:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    // In real app, this would query the database with user authentication
    return NextResponse.json({
      success: true,
      invoices: mockInvoices,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const invoiceData = await request.json()

    // Mock invoice creation
    const newInvoice = {
      id: Date.now().toString(),
      invoice_number: `INV-${String(mockInvoices.length + 1).padStart(3, "0")}`,
      ...invoiceData,
      created_at: new Date().toISOString(),
    }

    mockInvoices.push(newInvoice)

    return NextResponse.json({
      success: true,
      invoice: newInvoice,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
