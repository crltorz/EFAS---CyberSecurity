export const PNP_ACG_PHONE = '(02) 8723-0401 local 7491';
export const PNP_ACG_URL = 'acg.pnp.gov.ph';

export function buildAthenaHotlineBlock(): string {
  return `- PNP Anti-Cybercrime Group: ${PNP_ACG_PHONE} · ${PNP_ACG_URL}
- NBI Cybercrime Division: (02) 8523-8231
- DICT online scam hotline: 1326
- NCERT (DICT): ncert.gov.ph
- NPC (Privacy): privacy.gov.ph
- BSP Consumer Assistance: (02) 8708-7087
- GCash fraud hotline: 2882
- Maya: (02) 8845-7788
- SMS spam: forward to 7726`;
}
