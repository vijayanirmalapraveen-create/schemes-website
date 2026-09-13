# SchemeFinder AI – Government Scheme Recommender

A modern, dynamic web application that helps Indian citizens discover the most suitable government loan and subsidy schemes based on their profile.

## Features

- **Smart Matching Engine** – Rule-based AI that scores schemes on:
  - Loan amount required
  - Business type (Manufacturing, Service, Trading, Artisan, etc.)
  - Business stage (New / Existing / Expansion)
  - Social category (SC/ST/OBC/Minority/General)
  - Gender (especially important for Stand-Up India)
  - Rural vs Urban location
  - Purpose of funds

- **Major Schemes Covered**
  - Pradhan Mantri Mudra Yojana (PMMY) – up to ₹20 lakh
  - Prime Minister’s Employment Generation Programme (PMEGP) – subsidy 15–35%
  - Stand-Up India – ₹10 lakh to ₹1 crore for SC/ST & women
  - CGTMSE – Collateral-free credit guarantee
  - PM Vishwakarma – Artisans & traditional crafts
  - CLCSS – Technology upgradation subsidy

- Clean, responsive UI
- Instant recommendations with eligibility status, documents, interest, subsidy and nearest channel partner
- Direct links to official application portals

## How to Run

This is a pure static web app (HTML + CSS + JavaScript). No build step required.

### Option 1 – Open directly
Simply open `index.html` in any modern browser.

### Option 2 – Local server (recommended)
```bash
cd scheme-finder
python3 -m http.server 8080
# Then open http://localhost:8080
```

or

```bash
npx serve .
```

## Example Flow (as in your requirement)

**Ravi** wants ₹7 lakh for a small manufacturing business.

1. He enters:
   - Name, Age, Gender
   - Category (General / OBC / SC / ST…)
   - State + Rural/Urban
   - Business Type = Manufacturing
   - Stage = New
   - Loan Amount = 700000
   - Purpose = Setting up new unit

2. The engine recommends:
   - **PMEGP** (strong match if new unit + possible higher subsidy)
   - **MUDRA Tarun** (perfect amount fit, collateral-free)
   - Possibly **CGTMSE**-backed loans

3. Each card shows:
   - Eligibility status
   - Loan limit / tier
   - Interest & subsidy
   - Required documents
   - Nearest channel partner (simulated)
   - Link to official portal

## Future Enhancements (ideas)

- Real backend + database of schemes
- Integration with official APIs (when available)
- State-specific schemes
- Document checklist generator / PDF
- WhatsApp / SMS sharing of results
- User accounts to save applications
- Multilingual support (Hindi + regional languages)

---

Built for educational and awareness purposes. Always verify eligibility on the official government portals before applying.
