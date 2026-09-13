const SCHEMES = [
  {
    id: "mudra",
    name: "Pradhan Mantri Mudra Yojana (PMMY)",
    shortName: "MUDRA",
    description: "Collateral-free loans for micro and small enterprises engaged in manufacturing, trading, services and allied activities.",
    validFrom: "2024-01-01",
    validTo: "2099-12-31",
    maxLoan: 2000000,
    minLoan: 10000,
    interest: "8.5% – 12% p.a. (bank determined)",
    subsidy: "None",
    collateral: "Not required",
    categories: ["general", "obc", "sc", "st", "minority"],
    genders: ["male", "female", "other"],
    businessTypes: ["manufacturing", "service", "trading", "food", "agri"],
    stages: ["new", "existing", "expansion"],
    areas: ["rural", "urban"],
    purposes: ["setup", "machinery", "working", "expansion"],
    specialBoost: {},
    documents: [
      "Aadhaar Card",
      "PAN Card",
      "Business plan / project report",
      "Address proof",
      "Bank statements (last 6 months)",
      "Passport size photographs",
      "Udyam Registration (recommended)"
    ],
    applyUrl: "https://www.udyamimitra.in/",
    portalStatus: "Official portal may be temporarily unavailable.",
    portalNote: "If the portal is not loading, visit your nearest bank branch or try again later. Many applicants complete the process through their bank channel partner.",
    channelPartners: [
      { name: "State Bank of India", type: "Public Sector Bank" },
      { name: "HDFC Bank", type: "Private Bank" },
      { name: "Bank of Baroda", type: "Public Sector Bank" },
      { name: "Any Scheduled Commercial Bank / NBFC / MFI" }
    ],
    tiers: [
      { name: "Shishu", max: 50000 },
      { name: "Kishor", max: 500000 },
      { name: "Tarun", max: 1000000 },
      { name: "Tarun Plus", max: 2000000 }
    ]
  },
  {
    id: "pmegp",
    name: "Prime Minister’s Employment Generation Programme (PMEGP)",
    shortName: "PMEGP",
    description: "Credit-linked subsidy scheme for setting up new micro enterprises in manufacturing and service sectors. Higher subsidy for special categories and rural areas.",
    validFrom: "2024-01-01",
    validTo: "2099-12-31",
    maxLoan: 5000000, // manufacturing project cost
    minLoan: 100000,
    interest: "Bank rate (typically 11% – 12%)",
    subsidy: "15% – 35% of project cost (Margin Money)",
    collateral: "Not required (CGTMSE cover available)",
    categories: ["general", "obc", "sc", "st", "minority"],
    genders: ["male", "female", "other"],
    businessTypes: ["manufacturing", "service", "food"],
    stages: ["new"], // primarily new units
    areas: ["rural", "urban"],
    purposes: ["setup", "machinery"],
    specialBoost: {
      rural: 10,
      sc: 15,
      st: 15,
      minority: 10,
      female: 10,
      manufacturing: 10
    },
    subsidyDetails: {
      general_urban: "15%",
      general_rural: "25%",
      special_urban: "25%",
      special_rural: "35%"
    },
    documents: [
      "Aadhaar Card",
      "PAN Card",
      "Educational qualification certificate (VIII std for higher projects)",
      "Project report / Detailed Project Report (DPR)",
      "Caste certificate (if applicable)",
      "Income certificate (if required by bank)",
      "Residence proof",
      "Bank account details",
      "Passport size photographs"
    ],
    applyUrl: "https://www.kviconline.gov.in/pmegpeportal/",
    portalStatus: "Official portal may be temporarily unavailable.",
    portalNote: "If this portal is down, contact the nearby KVIC/DIC or public sector bank branch for application guidance and submission assistance.",
    channelPartners: [
      { name: "KVIC / KVIB / DIC", type: "Implementing Agency" },
      { name: "Any Public Sector Bank", type: "Financing Bank" },
      { name: "Regional Rural Banks", type: "Financing Bank" }
    ]
  },
  {
    id: "standup",
    name: "Stand-Up India Scheme",
    shortName: "Stand-Up India",
    description: "Bank loans between ₹10 lakh and ₹1 crore for SC/ST and women entrepreneurs to set up greenfield enterprises in manufacturing, services or trading.",
    validFrom: "2024-01-01",
    validTo: "2099-12-31",
    maxLoan: 10000000,
    minLoan: 1000000,
    interest: "Base rate + ~3% (typically 10% – 11%)",
    subsidy: "Margin money support available",
    collateral: "May be required for larger amounts; CGTMSE possible",
    categories: ["sc", "st"], // also women of any category
    genders: ["female"], // women of any category + SC/ST any gender
    businessTypes: ["manufacturing", "service", "trading", "food"],
    stages: ["new"],
    areas: ["rural", "urban"],
    purposes: ["setup", "machinery", "working"],
    specialBoost: {
      female: 25,
      sc: 25,
      st: 25
    },
    documents: [
      "Aadhaar Card",
      "PAN Card",
      "Caste certificate (for SC/ST)",
      "Business plan / project report",
      "Address proof",
      "Bank statements",
      "Passport size photographs",
      "Udyam Registration"
    ],
    applyUrl: "https://www.standupmitra.in/",
    portalStatus: "Official portal may be temporarily unavailable.",
    portalNote: "If the portal is not reachable, submit through your bank branch or ask the nearest scheduled commercial bank for the current application route.",
    channelPartners: [
      { name: "All Scheduled Commercial Banks", type: "Mandatory one branch per bank" },
      { name: "SIDBI", type: "Implementing Agency" }
    ]
  },
  {
    id: "cgtmse",
    name: "Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)",
    shortName: "CGTMSE",
    description: "Provides credit guarantee cover to banks so they can extend collateral-free loans to micro and small enterprises up to higher limits.",
    validFrom: "2024-01-01",
    validTo: "2099-12-31",
    maxLoan: 100000000, // up to 10 Cr in some references
    minLoan: 100000,
    interest: "Market rate (9% – 13% typical)",
    subsidy: "Guarantee cover 75% – 85% (no direct subsidy to borrower)",
    collateral: "Not required (guarantee backed)",
    categories: ["general", "obc", "sc", "st", "minority"],
    genders: ["male", "female", "other"],
    businessTypes: ["manufacturing", "service", "trading", "food"],
    stages: ["new", "existing", "expansion"],
    areas: ["rural", "urban"],
    purposes: ["setup", "machinery", "working", "expansion", "tech"],
    specialBoost: {
      manufacturing: 5
    },
    documents: [
      "Aadhaar / PAN",
      "Udyam Registration Certificate",
      "Business plan / project report",
      "Financial statements (if existing)",
      "Bank statements",
      "KYC documents"
    ],
    applyUrl: "https://www.cgtmse.in/",
    portalStatus: "Official portal may be temporarily unavailable.",
    portalNote: "If the portal is down, your lender bank can usually guide you through the guarantee process and application submission.",
    channelPartners: [
      { name: "Member Lending Institutions (Banks & NBFCs)", type: "Through your bank" }
    ]
  },
  {
    id: "pmvishwakarma",
    name: "PM Vishwakarma Yojana",
    shortName: "PM Vishwakarma",
    description: "Support for traditional artisans and craftspeople – skill training, toolkit grant and collateral-free loans at concessional interest.",
    validFrom: "2024-01-01",
    validTo: "2099-12-31",
    maxLoan: 300000,
    minLoan: 10000,
    interest: "5% concessional (after interest subvention)",
    subsidy: "Toolkit grant ₹15,000 + interest subvention",
    collateral: "Not required",
    categories: ["general", "obc", "sc", "st", "minority"],
    genders: ["male", "female", "other"],
    businessTypes: ["artisan"],
    stages: ["new", "existing"],
    areas: ["rural", "urban"],
    purposes: ["setup", "machinery", "working"],
    specialBoost: {
      artisan: 40
    },
    documents: [
      "Aadhaar Card",
      "Bank account linked to Aadhaar",
      "Mobile number",
      "Proof of traditional occupation (self-declaration / local verification)"
    ],
    applyUrl: "https://pmvishwakarma.gov.in/",
    portalStatus: "Official portal may be temporarily unavailable.",
    portalNote: "If the site is not loading, visit the nearest common service centre or bank branch to complete registration and document review.",
    channelPartners: [
      { name: "Public Sector Banks", type: "Financing Bank" },
      { name: "Regional Rural Banks", type: "Financing Bank" }
    ]
  },
  {
    id: "clcss",
    name: "Credit Linked Capital Subsidy Scheme (CLCSS)",
    shortName: "CLCSS",
    description: "15% upfront capital subsidy on institutional finance for technology upgradation of existing micro and small manufacturing enterprises.",
    validFrom: "2024-01-01",
    validTo: "2099-12-31",
    maxLoan: 10000000,
    minLoan: 100000,
    interest: "Bank rate",
    subsidy: "15% capital subsidy (max ₹15 lakh)",
    collateral: "As per bank norms",
    categories: ["general", "obc", "sc", "st", "minority"],
    genders: ["male", "female", "other"],
    businessTypes: ["manufacturing"],
    stages: ["existing", "expansion"],
    areas: ["rural", "urban"],
    purposes: ["tech", "machinery"],
    specialBoost: {
      manufacturing: 15,
      tech: 20
    },
    documents: [
      "Udyam Registration",
      "Project report for technology upgradation",
      "Quotations for machinery",
      "Financial statements",
      "Bank loan sanction letter"
    ],
    applyUrl: "https://www.dcmsme.gov.in/",
    portalStatus: "Official portal may be temporarily unavailable.",
    portalNote: "If the official site is unavailable, contact the financing bank or SIDBI office for the latest application channel and guidance.",
    channelPartners: [
      { name: "SIDBI / Scheduled Banks", type: "Through financing institution" }
    ]
  }
];

function parseSchemeDate(dateValue) {
  if (!dateValue) return null;
  const parsed = new Date(dateValue);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function isSchemeActive(scheme, referenceDate = new Date()) {
  if (!scheme) return false;

  const start = parseSchemeDate(scheme.validFrom);
  const end = parseSchemeDate(scheme.validTo);

  if (start && referenceDate < start) return false;
  if (end && referenceDate > end) return false;

  return true;
}

function getActiveSchemes(referenceDate = new Date()) {
  return SCHEMES.filter((scheme) => isSchemeActive(scheme, referenceDate));
}

// Helper to format currency
function formatINR(amount) {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} Lakh`;
  return `₹${amount.toLocaleString("en-IN")}`;
}
