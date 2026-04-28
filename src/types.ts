export interface Customer {
  id: string;
  name: string;
  email: string;
  tenure: number;
  monthlyCharges: number;
  usageGb: number;
  supportCalls: number;
  contractType: 'Month-to-month' | 'One year' | 'Two year';
  churnProbability: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  lastActivity: string;
  status: 'active' | 'churned';
  suggestedAction: string;
}

export const SAMPLE_CUSTOMERS: Customer[] = [
  {
    id: 'CUST-1024',
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    tenure: 2,
    monthlyCharges: 89.99,
    usageGb: 450,
    supportCalls: 5,
    contractType: 'Month-to-month',
    churnProbability: 0.82,
    riskLevel: 'High',
    lastActivity: '2026-04-25',
    status: 'active',
    suggestedAction: 'Offer 20% discount on 1-year upgrade'
  },
  {
    id: 'CUST-1055',
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    tenure: 48,
    monthlyCharges: 45.00,
    usageGb: 120,
    supportCalls: 0,
    contractType: 'Two year',
    churnProbability: 0.05,
    riskLevel: 'Low',
    lastActivity: '2026-04-27',
    status: 'active',
    suggestedAction: 'Send loyalty reward'
  },
  {
    id: 'CUST-1102',
    name: 'Charlie Davis',
    email: 'charlie.d@example.com',
    tenure: 12,
    monthlyCharges: 110.50,
    usageGb: 380,
    supportCalls: 3,
    contractType: 'Month-to-month',
    churnProbability: 0.55,
    riskLevel: 'Medium',
    lastActivity: '2026-04-22',
    status: 'active',
    suggestedAction: 'Schedule technical review call'
  },
  {
    id: 'CUST-1215',
    name: 'Diana Prince',
    email: 'diana.p@example.com',
    tenure: 24,
    monthlyCharges: 75.00,
    usageGb: 250,
    supportCalls: 1,
    contractType: 'One year',
    churnProbability: 0.15,
    riskLevel: 'Low',
    lastActivity: '2026-04-28',
    status: 'active',
    suggestedAction: 'Cross-sell mobile bundle'
  },
  {
    id: 'CUST-1342',
    name: 'Evan Wright',
    email: 'evan.w@example.com',
    tenure: 3,
    monthlyCharges: 95.00,
    usageGb: 520,
    supportCalls: 8,
    contractType: 'Month-to-month',
    churnProbability: 0.94,
    riskLevel: 'High',
    lastActivity: '2026-04-20',
    status: 'active',
    suggestedAction: 'Urgent: Customer Success outreach required'
  }
];
