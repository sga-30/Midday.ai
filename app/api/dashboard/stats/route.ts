import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Mock dashboard statistics
    const stats = {
      totalRevenue: 45280.5,
      monthlyRevenue: 12450.0,
      pendingInvoices: 8,
      paidInvoices: 24,
      overdueInvoices: 3,
      totalClients: 15,
      hoursTracked: 156.5,
      averageInvoiceValue: 2264.03,
      revenueGrowth: 12.5,
      recentActivity: [
        {
          id: "1",
          type: "invoice_paid",
          description: "Invoice INV-001 marked as paid",
          amount: 2500.0,
          timestamp: "2024-01-20T10:30:00Z",
        },
        {
          id: "2",
          type: "invoice_sent",
          description: "Invoice INV-004 sent to client",
          amount: 1800.0,
          timestamp: "2024-01-19T14:15:00Z",
        },
        {
          id: "3",
          type: "time_logged",
          description: "8 hours logged for Project Alpha",
          timestamp: "2024-01-19T18:00:00Z",
        },
      ],
    }

    return NextResponse.json({
      success: true,
      stats,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
