// ========== Recommendation Engine ==========

function scoreScheme(scheme, profile) {
  let score = 0;
  const reasons = [];
  let eligible = true;
  let eligibilityStatus = "eligible";

  const loan = profile.loanAmount;
  const isSpecialCategory = ["sc", "st", "obc", "minority"].includes(profile.category);
  const isWoman = profile.gender === "female";
  const isSCST = ["sc", "st"].includes(profile.category);

  // 1. Loan amount fit
  if (loan > scheme.maxLoan) {
    score -= 40;
    eligible = false;
    reasons.push(`Requested amount exceeds scheme limit (${formatINR(scheme.maxLoan)})`);
  } else if (loan < scheme.minLoan) {
    score -= 15;
    reasons.push(`Amount is below typical minimum for this scheme`);
  } else {
    // Perfect range gets bonus
    const ratio = loan / scheme.maxLoan;
    if (ratio >= 0.3 && ratio <= 0.85) {
      score += 25;
      reasons.push(`Loan amount fits well within scheme limits`);
    } else {
      score += 15;
    }
  }

  // 2. Business type match
  if (scheme.businessTypes.includes(profile.businessType)) {
    score += 20;
    reasons.push(`Supports ${profile.businessType} businesses`);
  } else {
    score -= 30;
    eligible = false;
    reasons.push(`Does not primarily cover ${profile.businessType}`);
  }

  // 3. Business stage
  if (scheme.stages.includes(profile.businessStage)) {
    score += 15;
  } else {
    if (scheme.id === "pmegp" && profile.businessStage !== "new") {
      score -= 25;
      eligible = false;
      reasons.push("PMEGP is mainly for new units (2nd loan only for existing PMEGP/MUDRA units under conditions)");
    } else if (scheme.id === "standup" && profile.businessStage !== "new") {
      score -= 30;
      eligible = false;
      reasons.push("Stand-Up India is only for greenfield (new) enterprises");
    } else {
      score -= 10;
    }
  }

  // 4. Category / Gender special eligibility
  if (scheme.id === "standup") {
    if (isWoman || isSCST) {
      score += 35;
      reasons.push(isWoman ? "Women entrepreneurs are primary beneficiaries" : "SC/ST entrepreneurs are primary beneficiaries");
    } else {
      score -= 50;
      eligible = false;
      reasons.push("Stand-Up India is restricted to SC/ST and women entrepreneurs");
    }
  }

  if (scheme.id === "pmvishwakarma") {
    if (profile.businessType === "artisan") {
      score += 40;
      reasons.push("Specifically designed for traditional artisans & craftspeople");
    } else {
      score -= 40;
      eligible = false;
    }
  }

  // 5. Area type (rural boost for PMEGP)
  if (scheme.id === "pmegp") {
    if (profile.area === "rural") {
      score += 12;
      reasons.push("Higher subsidy available in rural areas");
    }
    if (isSpecialCategory || isWoman) {
      score += 15;
      reasons.push("Higher subsidy rate for special categories / women");
    }
  }

  // 6. Purpose match
  if (scheme.purposes.includes(profile.purpose)) {
    score += 10;
  }

  // 7. Special boosts from scheme definition
  if (scheme.specialBoost) {
    if (scheme.specialBoost[profile.area]) score += scheme.specialBoost[profile.area];
    if (scheme.specialBoost[profile.category]) score += scheme.specialBoost[profile.category];
    if (scheme.specialBoost[profile.gender]) score += scheme.specialBoost[profile.gender];
    if (scheme.specialBoost[profile.businessType]) score += scheme.specialBoost[profile.businessType];
    if (scheme.specialBoost[profile.purpose]) score += scheme.specialBoost[profile.purpose];
  }

  // 8. Age basic check
  if (profile.age < 18) {
    score -= 100;
    eligible = false;
  }

  // Determine status
  if (!eligible || score < 20) {
    eligibilityStatus = "not-eligible";
  } else if (score < 45) {
    eligibilityStatus = "partial";
  } else {
    eligibilityStatus = "eligible";
  }

  // Cap score
  score = Math.max(0, Math.min(100, score));

  return { score, eligible, eligibilityStatus, reasons };
}

function getMudraTier(amount) {
  if (amount <= 50000) return "Shishu (up to ₹50,000)";
  if (amount <= 500000) return "Kishor (₹50,001 – ₹5 lakh)";
  if (amount <= 1000000) return "Tarun (₹5 lakh – ₹10 lakh)";
  return "Tarun Plus (₹10 lakh – ₹20 lakh)";
}

function getPMEGPSubsidy(profile) {
  const isSpecial = ["sc", "st", "obc", "minority"].includes(profile.category) || profile.gender === "female";
  if (profile.area === "rural") {
    return isSpecial ? "35% of project cost" : "25% of project cost";
  }
  return isSpecial ? "25% of project cost" : "15% of project cost";
}

function getNearestPartner(scheme, state) {
  // Simulated nearest partner based on state
  const partners = scheme.channelPartners;
  if (!partners || partners.length === 0) return "Contact nearest bank branch";
  const main = partners[0];
  const distance = Math.floor(Math.random() * 12) + 2; // fake 2-13 km
  return `${main.name} (${main.type}) – approx. ${distance} km away in ${state || "your city"}`;
}

// ========== UI Functions ==========

function refreshSchemeDataIfNeeded() {
  const todayKey = new Date().toISOString().slice(0, 10);
  const lastRefreshKey = localStorage.getItem("schemeFinderLastRefreshDate");

  if (lastRefreshKey !== todayKey) {
    const activeSchemes = getActiveSchemes(new Date());
    localStorage.setItem("schemeFinderActiveSchemes", JSON.stringify(activeSchemes.map(s => s.id)));
    localStorage.setItem("schemeFinderLastRefreshDate", todayKey);
  }
}

function getCurrentSchemes() {
  refreshSchemeDataIfNeeded();

  const stored = JSON.parse(localStorage.getItem("schemeFinderActiveSchemes") || "null");
  const activeIds = Array.isArray(stored) ? stored : SCHEMES.map(s => s.id);
  const referenceDate = new Date();
  return getActiveSchemes(referenceDate).filter((scheme) => activeIds.includes(scheme.id));
}

function findSchemes() {
  const form = document.getElementById("schemeForm");
  if (!form || !form.checkValidity()) {
    if (form) form.reportValidity();
    return;
  }

  const btn = document.getElementById("findBtn");
  const btnText = btn.querySelector(".btn-text");
  const btnLoader = btn.querySelector(".btn-loader");
  btnText.style.display = "none";
  btnLoader.style.display = "inline";
  btn.disabled = true;

  const profile = {
    name: document.getElementById("name").value.trim(),
    age: parseInt(document.getElementById("age").value),
    gender: document.getElementById("gender").value,
    category: document.getElementById("category").value,
    state: document.getElementById("state").value,
    area: document.getElementById("area").value,
    businessType: document.getElementById("businessType").value,
    businessStage: document.getElementById("businessStage").value,
    loanAmount: parseInt(document.getElementById("loanAmount").value),
    income: document.getElementById("income").value,
    purpose: document.getElementById("purpose").value
  };

  // Simulate AI processing delay
  setTimeout(() => {
    const currentSchemes = getCurrentSchemes();
    const scored = currentSchemes.map(scheme => {
      const result = scoreScheme(scheme, profile);
      return { scheme, ...result };
    });

    // Sort by score descending
    scored.sort((a, b) => b.score - a.score);

    // Filter to show only reasonable matches (or top ones)
    const toShow = scored.filter(s => s.score >= 15 || s.eligibilityStatus !== "not-eligible").slice(0, 5);
    if (toShow.length === 0) {
      toShow.push(...scored.slice(0, 3));
    }

    renderResults(profile, toShow);

    btnText.style.display = "inline";
    btnLoader.style.display = "none";
    btn.disabled = false;

    document.getElementById("results").style.display = "block";
    document.getElementById("results").scrollIntoView({ behavior: "smooth", block: "start" });
  }, 900);
}

function renderResults(profile, scoredSchemes) {
  document.getElementById("userNameDisplay").textContent = profile.name || "You";

  const top = scoredSchemes[0];
  const summaryEl = document.getElementById("resultsSummary");
  if (top && top.eligibilityStatus === "eligible") {
    summaryEl.innerHTML = `Based on your requirement of <strong>${formatINR(profile.loanAmount)}</strong> for a <strong>${profile.businessType}</strong> business, we found <strong>${scoredSchemes.filter(s => s.eligibilityStatus === "eligible").length}</strong> strong matches. Top recommendation is highlighted.`;
  } else {
    summaryEl.innerHTML = `We analysed your profile. Here are the closest matching schemes. Please review eligibility carefully.`;
  }

  const container = document.getElementById("resultsContainer");
  container.innerHTML = "";

  scoredSchemes.forEach((item, index) => {
    const { scheme, score, eligibilityStatus, reasons } = item;
    const isTop = index === 0 && eligibilityStatus === "eligible";

    // Dynamic fields
    let loanDisplay = `Up to ${formatINR(scheme.maxLoan)}`;
    let interestDisplay = scheme.interest;
    let subsidyDisplay = scheme.subsidy;

    if (scheme.id === "mudra") {
      loanDisplay = getMudraTier(profile.loanAmount);
      if (profile.loanAmount <= 2000000) {
        loanDisplay += ` • You can apply for ${formatINR(profile.loanAmount)}`;
      }
    }

    if (scheme.id === "pmegp") {
      subsidyDisplay = getPMEGPSubsidy(profile);
      if (profile.businessType === "manufacturing") {
        loanDisplay = `Project cost up to ₹50 lakh (Manufacturing)`;
      } else {
        loanDisplay = `Project cost up to ₹20–25 lakh (Service)`;
      }
    }

    if (scheme.id === "standup" && (profile.gender === "female" || ["sc","st"].includes(profile.category))) {
      loanDisplay = `₹10 lakh – ₹1 crore`;
    }

    const statusLabel = {
      eligible: "Eligible",
      partial: "Partially Eligible",
      "not-eligible": "Not Eligible"
    }[eligibilityStatus];

    const statusClass = eligibilityStatus;

    const card = document.createElement("div");
    card.className = `scheme-card ${isTop ? "top-match" : ""}`;

    const portalWarning = scheme.portalNote || "If the official portal is not loading, contact your nearest bank branch or try again later.";

    card.innerHTML = `
      <div class="scheme-header ${isTop ? "top" : ""}">
        <div class="scheme-title-area">
          ${isTop ? '<span class="scheme-tag">🟢 Recommended</span><br/>' : ""}
          <h3>${scheme.name}</h3>
        </div>
        <div class="scheme-badge">
          <span class="eligibility-badge ${statusClass}">${statusLabel}</span>
          <span class="match-score">Match score: ${Math.round(score)}%</span>
        </div>
      </div>
      <div class="scheme-body">
        <p style="margin-bottom:16px;color:var(--text-muted);font-size:0.95rem;">${scheme.description}</p>
        
        <div class="scheme-highlights">
          <div class="highlight-item">
            <div class="label">Loan / Support</div>
            <div class="value">${loanDisplay}</div>
          </div>
          <div class="highlight-item">
            <div class="label">Interest</div>
            <div class="value">${interestDisplay}</div>
          </div>
          <div class="highlight-item">
            <div class="label">Subsidy / Benefit</div>
            <div class="value">${subsidyDisplay}</div>
          </div>
          <div class="highlight-item">
            <div class="label">Collateral</div>
            <div class="value">${scheme.collateral}</div>
          </div>
        </div>

        <div class="scheme-details">
          <div class="detail-block">
            <h4>Why this scheme?</h4>
            <ul>
              ${reasons.slice(0, 4).map(r => `<li>${r}</li>`).join("")}
            </ul>
          </div>
          <div class="detail-block">
            <h4>Key Documents Needed</h4>
            <ul>
              ${scheme.documents.slice(0, 5).map(d => `<li>${d}</li>`).join("")}
              ${scheme.documents.length > 5 ? `<li>+ ${scheme.documents.length - 5} more</li>` : ""}
            </ul>
          </div>
        </div>
      </div>
      <div class="scheme-footer">
        <div class="channel-partner">
          <strong>Nearest Channel Partner:</strong><br/>
          ${getNearestPartner(scheme, profile.state)}
        </div>
        <div class="portal-warning" style="margin:12px 0 10px; color:var(--warning-text, #f5c26b); font-size:0.82rem; line-height:1.5;">
          <strong>Portal status:</strong> ${portalWarning}
        </div>
        <a href="${scheme.applyUrl}" target="_blank" rel="noopener" class="apply-btn">
          Official Portal →
        </a>
      </div>
    `;

    container.appendChild(card);
  });
}

// ========== Schemes Overview ==========
function renderSchemesOverview() {
  const container = document.getElementById("schemesOverview");
  if (!container) return;

  const activeSchemes = getCurrentSchemes();

  container.innerHTML = activeSchemes.map(s => `
    <div class="scheme-mini">
      <h4>${s.shortName}</h4>
      <p>${s.description.substring(0, 110)}...</p>
      <div class="loan-range">Up to ${formatINR(s.maxLoan)}</div>
    </div>
  `).join("");
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  refreshSchemeDataIfNeeded();
  renderSchemesOverview();
});
