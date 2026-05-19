/** Shared content provenance — see docs/ACADEMIC_SYSTEMS_ANALYSIS_AND_IMPROVEMENT_PLAN.md */

export type VerificationStatus =
  | 'officially_verified'
  | 'under_review'
  | 'community_reported';

/** Default verification stamp for bundled editorial content (aligns with emergency contacts). */
export const DEFAULT_LAST_VERIFIED = 'May 16, 2026';

export interface ContentSource {
  name: string;
  citation: string;
  url: string;
}

export interface ContentMetadata {
  lastVerifiedAt?: string;
  verificationStatus?: VerificationStatus;
}
