// src/components/CandidateComparison.tsx

import React from 'react';

interface UserInfo {
  income: number;
  dependents: number;
  students: number;
  filingStatus: "single" | "marriedFilingJointly";
}

interface PolicyImpact {
  taxImpact: number;
  childTaxCreditImpact: number;
}

interface Candidate {
  id: string;
  name: string;
  title: string;
  imageUrl: string;
  calculatePolicyImpact: (userInfo: UserInfo) => PolicyImpact;
}

const taxBrackets = {
    single: [
      { upperBound: 9525, rate: 0.10 },
      { upperBound: 38700, rate: 0.12 },
      { upperBound: 82500, rate: 0.22 },
      { upperBound: 157500, rate: 0.24 },
      { upperBound: 200000, rate: 0.32 },
      { upperBound: 500000, rate: 0.35 },
      { upperBound: Infinity, rate: 0.37 },
    ],
    marriedFilingJointly: [
      { upperBound: 19050, rate: 0.10 },
      { upperBound: 77400, rate: 0.12 },
      { upperBound: 165000, rate: 0.22 },
      { upperBound: 315000, rate: 0.24 },
      { upperBound: 400000, rate: 0.32 },
      { upperBound: 600000, rate: 0.35 },
      { upperBound: Infinity, rate: 0.37 },
    ],
    // Add other filing statuses (head of household, etc.) as needed
  };

const standardDeductions = {
    single: 12000,
    marriedFilingJointly: 24000,
    // Include other filing statuses as necessary
};

const childTaxCreditAmount = 2000;
const childTaxCreditPhaseoutStart = {
  single: 200000,
  marriedFilingJointly: 400000,
  // Include other filing statuses as necessary
};

// this is based off of the TCJA tax brackets 
function calculateStandardTax(income: number, filingStatus: keyof typeof taxBrackets): number {
    let tax = 0;
    let remainingIncome = income;
  
    // Process each tax bracket
    for (const bracket of taxBrackets[filingStatus]) {
      if (income > bracket.upperBound) {
        tax += (bracket.upperBound - (remainingIncome - income)) * bracket.rate;
        remainingIncome -= bracket.upperBound;
      } else {
        tax += remainingIncome * bracket.rate;
        break;
      }
    }
    console.log(tax)
    console.log(income)
    return tax;
  }

function calculateTaxAfterDeductionsAndCredits(income: number, dependents: number, filingStatus: keyof typeof taxBrackets): number {
    // Calculate taxable income after the standard deduction
    const taxableIncome = Math.max(0, income - standardDeductions[filingStatus]);
  
    // Calculate the initial tax based on the TCJA tax brackets
    let tax = calculateStandardTax(taxableIncome, filingStatus);
  
    // Apply the Child Tax Credit (CTC)
    const ctc = dependents * 2000; // Assuming all dependents are qualifying children for simplicity
    const ctcLimit = tax; // CTC cannot exceed the amount of tax you owe
    const childTaxCredit = Math.min(ctc, ctcLimit);
  
    // Calculate the final tax after credits
    const finalTax = tax - childTaxCredit;
  
    return finalTax;
  }

// Candidates data
const candidates: Candidate[] = [
  {
    id: 'biden',
    name: 'Joe Biden',
    title: '46th President of the United States',
    imageUrl: 'path-to-biden-image.jpg',
    calculatePolicyImpact: (userInfo: UserInfo) => calculateTaxImpact(userInfo, 'biden'),
  },
  {
    id: 'trump',
    name: 'Donald Trump',
    title: '45th President of the United States',
    imageUrl: 'path-to-trump-image.jpg',
    calculatePolicyImpact: (userInfo: UserInfo) => calculateTaxImpact(userInfo, 'trump'),
  },
];

const CandidateComparison: React.FC<{ userInfo: UserInfo }> = ({ userInfo }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
      {candidates.map((candidate) => {
        const impacts = candidate.calculatePolicyImpact(userInfo);
        return (
          <div key={candidate.id} className="bg-white p-4 shadow rounded">
            <img src={candidate.imageUrl} alt={candidate.name} className="w-20 h-20 object-cover rounded-full" />
            <h3 className="text-lg font-bold">{candidate.name}</h3>
            <ul>
              <li>Tax Impact: ${impacts.taxImpact.toFixed(2)}</li>
              <li>Child Tax Credit Impact: ${impacts.childTaxCreditImpact.toFixed(2)}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};



function calculateTaxImpact(userInfo: UserInfo, candidate: string): PolicyImpact {
  // Implement the tax calculation based on the TCJA and candidate specifics
  const { filingStatus, income, dependents } = userInfo;
  let taxImpact = 0;
  let childTaxCreditImpact = 0;

  if (candidate === 'biden' && income > 400000) {
    // Apply specific rules for high earners under Biden
    taxImpact = calculateBidenHighIncomeTax(income);
  } else {
    // Apply TCJA rules
    taxImpact = calculateStandardTax(income, filingStatus);
  }

  // Calculate Child Tax Credit
  childTaxCreditImpact = calculateChildTaxCredit(income, dependents, filingStatus);

  return { taxImpact, childTaxCreditImpact };
}

// Example calculation functions (simplified)
function calculateBidenHighIncomeTax(income: number): number {
  return income * 0.396; // Assume 39.6% for high earners
}

function calculateChildTaxCredit(income: number, dependents: number, filingStatus: keyof typeof childTaxCreditPhaseoutStart): number {
    let credit = dependents * childTaxCreditAmount;
    const phaseoutThreshold = childTaxCreditPhaseoutStart[filingStatus];
    if (income > phaseoutThreshold) {
      // Implement the phaseout calculation
      // This is a simplification; the actual phaseout rate should be used
      credit -= (income - phaseoutThreshold) * 0.05;
    }
    return Math.max(credit, 0);
  }

export default CandidateComparison;


// Test the component with mock user data
const mockUserInfo: UserInfo = {
  income: 500000,
  filingStatus: "single",
  dependents: 2,
  students: 1,
};

// Mock rendering function for testing purposes (typically you would use a testing library)
function testCandidateComparison() {
  const component = <CandidateComparison userInfo={mockUserInfo} />;
  // Here you would typically use a library like Jest and React Testing Library to render the component
  // and assert the expected outputs. This function is just for demonstration purposes.
  console.log('Component for testing:', component);
}

// Run the test
testCandidateComparison();
