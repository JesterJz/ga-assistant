function detectIntent(text) {
  const normalized = text.toLowerCase();
  if (normalized.includes("nghi phep") || normalized.includes("xin nghi")) {
    return "leave_policy";
  }
  if (normalized.includes("giay xac nhan cong tac") || normalized.includes("xac nhan cong tac")) {
    return "employment_verification";
  }
  if (normalized.includes("onboarding") || normalized.includes("nhan vien moi")) {
    return "onboarding_info";
  }
  return "unknown";
}

module.exports = { detectIntent };
