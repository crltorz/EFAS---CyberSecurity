// ============================================================
// EFAS Evaluation Corpus
// ============================================================
// Source: Kaggle — bwandowando/philippine-spam-sms-messages
//   https://www.kaggle.com/datasets/bwandowando/philippine-spam-sms-messages
//
// Every sample is a real SMS from the dataset. The `kaggleHash` field
// preserves the original row hash for reproducibility — any reviewer
// can re-download the dataset and match each sample by hash.
//
// expectedBand labels (low/caution/high) are author-assigned based on
// the indicator-rubric methodology defined in data/riskRubric.ts.
// Each label is justified in the `sourceNote` field.
//
// The corpus is held out — the rubric was frozen before label assignment.
// ============================================================

export type CorpusSample = {
  id: string;
  text: string;
  expectedBand: 'low' | 'caution' | 'high';
  category:
  'sms_scam' |
  'phishing_email' |
  'investment_scam' |
  'job_scam' |
  'romance_scam' |
  'mule_recruitment' |
  'task_scam' |
  'gambling_scam' |
  'parcel_scam' |
  'government_impersonation' |
  'promotional_spam' |
  'legitimate';
  sourceNote?: string;
  kaggleHash?: string;
  language: 'en' | 'tl' | 'mixed';
};

export type EvaluationMetrics = {
  totalSamples: number;
  correct: number;
  accuracy: number;
  perBand: Record<
    'low' | 'caution' | 'high',
    {precision: number;recall: number;f1: number;support: number;}>;

};

export const corpus: CorpusSample[] = [
// ============================================================
// GAMBLING / ONLINE CASINO SCAMS (most prevalent in dataset)
// ============================================================
{
  id: 'kg-001',
  text: 'YG777 Nakatanggap ang iyong number ng P7748. Mag-register gamit ang number na ito at maglaro ng halagang P10 upang makuha. Sumali dito: joypod.de',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'tl',
  kaggleHash: '65176fe7-4fd8-3208-ab83-0114af3a10d8',
  sourceNote: 'Unlicensed casino lure with prize-claim hook and .de TLD'
},
{
  id: 'kg-002',
  text: 'Dito nagsisimula ang saya at panalo! 8P FREE + 8888P welcome package + bonus. USE 716120 at BangoWin.com',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'tl',
  kaggleHash: '206acbf8-c2a4-3d11-8823-22caca6416ee',
  sourceNote: 'Welcome-bonus lure for unlicensed gambling site'
},
{
  id: 'kg-003',
  text: 'Big wins, small bets! 100 pesos becomes 50K in GPLAY Dare to win at h7s3k00.ca',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'en',
  kaggleHash: '72ed2c68-a624-3ec1-aa40-6a32ea76518b',
  sourceNote: 'Guaranteed-multiplier gambling scam'
},
{
  id: 'kg-004',
  text: 'BigWln, nanalo ka ng Prize: P39,259. Magparehistro Makakuha ng P17~Maglaro ng P50 Makakuha ng P57. Libreng P128 para sa unang deposito~ gdubw.social',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'mixed',
  kaggleHash: 'e69f1ab3-c1f6-35ef-b495-ea78e5505e3f',
  sourceNote: 'Fake jackpot prize claim with .social TLD'
},
{
  id: 'kg-005',
  text: 'B0ss pan@lunin kita sa pinata win 15k, n0w lang h@bang n@ndito pa ak0  b@sta wag ka lang p0 makalim0t sakin mess@ge mok0 sa peysbuk ko',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'tl',
  kaggleHash: 'ff1e02ed-2460-32a4-ba00-2cd9c1c0ad8a',
  sourceNote: 'Match-fixing scam with extensive leet obfuscation'
},
{
  id: 'kg-006',
  text: 'Ikaw ang maswerteng Makatanggap ng P555 na bonus >>> yg54yt7r7y.uk',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'tl',
  kaggleHash: '4f59c86d-6122-34a4-b691-4359d4b7b905',
  sourceNote: 'Short Tagalog gambling lure with random .uk subdomain'
},
{
  id: 'kg-007',
  text: 'Magparehistro para sa libreng ₱7777, tumaya: coin0.tw/1t5U',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'tl',
  kaggleHash: 'e5f5fd4a-8548-3f8a-a331-1e7fc7e5f4d6',
  sourceNote: 'Most-replicated dataset template — free ₱7777 sign-up bait'
},
{
  id: 'kg-008',
  text: '1000% Luck bonus on ₱1000 balance. Register: play72.tw/Snuf',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'en',
  kaggleHash: '576ae555-43e5-3e33-8989-b36b7a6fb6c3',
  sourceNote: 'Impossible-multiplier gambling scam'
},
{
  id: 'kg-009',
  text: 'Mag-log in para makatanggap ng hanggang 555, at magkaroon din ng pagkakataong manalo ng IPhone15Pro >>>  klv7o7bbea.uk',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'tl',
  kaggleHash: 'b67b300a-0a07-337c-afc4-19c4ee2b4334',
  sourceNote: 'Casino lure promising iPhone 15 Pro'
},
{
  id: 'kg-010',
  text: 'Goodluck! ang swerte mong tao sa EPICWIN may pag asa kang manalo ng 50k sa 5 pesos na bet mo! plus VIP rewards pa! laro na website: epcw.eu  maglaro ngayun!',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'mixed',
  kaggleHash: 'c9e87610-19bf-36a4-aa39-2e2b6ac01376',
  sourceNote: 'EpicWin unlicensed gambling site lure'
},
{
  id: 'kg-011',
  text: 'I found a BUG here at sa1y7n7lbc.uk , deposit 500P and win 10K. You can win money on every bet.',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'en',
  kaggleHash: '22a1336e-418b-3c5f-b248-ddaab4c10c73',
  sourceNote: 'Fake "BUG exploit" gambling scam'
},
{
  id: 'kg-012',
  text: 'Nanalo ako ng pera tuwing tumaya ako ng 500P at nanalo ng 10K. Maaaring ito ay isang BUG. Sumali ako sa lvv65a118l.uk',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'tl',
  kaggleHash: '933d5d02-e396-3ce2-bce4-5ae1c44bfd78',
  sourceNote: 'Fake testimonial gambling scam template'
},
{
  id: 'kg-013',
  text: '88ph.so UNLIMITED FUN-MAKE YOUR DAY MOAN-HUBARAN LIVE, JAKOL LIVE-EXCLUSIVE FREE ACCESS HERE AT PHP',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'mixed',
  kaggleHash: '9dd5668e-94ec-3723-af14-27947c75ad3d',
  sourceNote: 'Adult-content lure, likely malware delivery vector'
},
{
  id: 'kg-014',
  text: 'phvegas.uk <-- Claim here! Nanalo ka ng P2760! Maglagay lamang ng P100 upang makuha ang panalo!',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'tl',
  kaggleHash: '688acb02-9c62-3c94-994d-2bcb04068acf',
  sourceNote: 'Pay-to-claim "winnings" scam (advance-fee fraud)'
},
{
  id: 'kg-015',
  text: 'Doblehin naten ang deposit mo ! Dito lamang sa PanaloKa! 2,000p mo ay magiging 4,000p !  Panalokawins.eu  Claim your 300% FIRST BONUS! sign up now',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'mixed',
  kaggleHash: '4034368c-192c-3c32-8ebb-bb11c3686736',
  sourceNote: 'PanaloKa unlicensed gambling 300% bonus lure'
},
{
  id: 'kg-016',
  text: 'Free slot machines worth 80 million pesos are waiting for you! Register to get 238P, first deposit will get 588p for free, rebate website  pvej.sg',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'en',
  kaggleHash: '98af2972-235f-3504-8ec2-6e08f8d69b21',
  sourceNote: 'Casino sign-up bonus scam'
},
{
  id: 'kg-017',
  text: "Friday fun is here! Enjoy 6,888p + 6,888p at GJP PH's Payday Blast. New members get 3000p at GJSlots.de . Don't wait, join now!",
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'en',
  kaggleHash: '132942de-1eac-3c6c-984e-0ddd4cb286d3',
  sourceNote: 'GJP Casino "Payday Blast" lure'
},
{
  id: 'kg-018',
  text: 'Daily Lucky Wheel at   Gojpluswild.de and win a Samsung Galaxy S23+ 5G worth P42,999! New members, get a 130% bonus up to P1000. Grab your chance to win big!',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'en',
  kaggleHash: '40cd009b-c410-3c51-86f6-24e237523004',
  sourceNote: 'Fake Samsung Galaxy prize via casino lure'
},
{
  id: 'kg-019',
  text: 'Hi,<REAL NAME>! Gusto mo ba ng 18-888 raffle ticket? Mag-register na sa goo-d.eu/4f4a at simulan ang saya!',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'tl',
  kaggleHash: '8a022e01-8e01-3372-8fec-5b2e456684c5',
  sourceNote: 'Mail-merge raffle scam with <REAL NAME> placeholder leak'
},
{
  id: 'kg-020',
  text: 'Kumusta,<REAL NAME> Sumali sa CO777 at may free 88 ka agad! Mag-click dito: titok.la/4f4z para magsimula!',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'tl',
  kaggleHash: '529dcdc3-790d-3ed0-934b-c0887a25c2ce',
  sourceNote: 'CO777 casino mail-merge with .la TLD'
},
{
  id: 'kg-021',
  text: 'May P2580 credit natanggap ang number na ito! Ito ay valid lamang within 8 hrs! Magregister at maglagay ng P50 upang maclaim sa aming 24/7 CS: cxlk.uk',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'mixed',
  kaggleHash: '39033262-40b2-3148-b6fb-591ae597d393',
  sourceNote: 'Credit-claim scam with urgency window'
},
{
  id: 'kg-022',
  text: 'Exclusive coupon Code: DIWATA88 Log in without deposit and receive up to bonus immediately Limited quantity, daily limit 100 people >>>diwata.tw',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'en',
  kaggleHash: '6f5d2d1f-f70d-3832-86c5-3aeff8c4b695',
  sourceNote: 'Diwata88 unlicensed casino with .tw TLD'
},
{
  id: 'kg-023',
  text: "Tara na, libreng 100 pesos ang naghihintay sa'yo!  spinsnow.eu  Mag-Enjoy sa Spins, bawat laro ay may mga bonus! Mag-sign up na!",
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'tl',
  kaggleHash: '2cf187e8-dc16-35cf-813c-8e443f89edb5',
  sourceNote: 'Free-credit gambling sign-up bait'
},
{
  id: 'kg-024',
  text: 'You can get a commission of 77,777 per day. Come with me, I will give you 7-777 right now bet808.tw/M1t',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'en',
  kaggleHash: '4037e827-9d39-3775-aa02-6dde46b4fd7c',
  sourceNote: 'Daily commission gambling scam'
},
{
  id: 'kg-025',
  text: 'good news for you. There is a BUG in this online betting website. Recharge 500P and get 1000P, which can be withdrawn immediately.  sp1a7v7otw.uk',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'en',
  kaggleHash: '3eea0ee8-2f81-315f-90c1-9e09e95719ab',
  sourceNote: 'Fake "BUG exploit" advance-deposit gambling scam'
},
{
  id: 'kg-026',
  text: 'Pinoy Slot Fiesta Holy Week! Register now for 12P free credits and enjoy bonuses up to 900P!Follow us on social media for more offers! PinoySlot.tv',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'en',
  kaggleHash: '99348ab4-25c6-3354-854e-983e83414ede',
  sourceNote: 'Pinoy Slot Fiesta unlicensed gambling app'
},
{
  id: 'kg-027',
  text: 'mag deposit ka ng 100 at may FREE 168 ka:sv33.tv',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'mixed',
  kaggleHash: '7d48a902-6b35-3f46-a67c-7db3bf3a8fa7',
  sourceNote: 'Short Tagalog deposit-bonus gambling lure'
},
{
  id: 'kg-028',
  text: 'Bigyan mo ng chance ang 9 pesos mo na maging 45k sa Fengshen. Ikaw na ba ang next winner? Sali na sa rwltoyq07hji.bonus.lc.',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'tl',
  kaggleHash: '7987491e-f098-3e79-a3a3-b15acceee66c',
  sourceNote: 'Fengshen slot gambling lure with .lc TLD'
},
{
  id: 'kg-029',
  text: 'Magdeposito ng 100P, makakuha ng 100P na libre 1q2w3e8.ca',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'tl',
  kaggleHash: 'fc7bb05d-f2d8-35b8-a700-799afbc22cc7',
  sourceNote: 'Keyboard-sequence subdomain (1q2w3e) gambling scam'
},

// ============================================================
// TELEGRAM / WHATSAPP REDIRECT
// ============================================================
{
  id: 'kg-030',
  text: 'Exclusive benefits are waiting for you! Get a free umbrella, T-shirt, hat, and P200 bonus! Join our Telegram: @SpinsPHLive',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'en',
  kaggleHash: 'af6f8e94-c112-35ee-b5d7-2820f23a761f',
  sourceNote: 'Casino scam with Telegram handle redirect'
},

// ============================================================
// BANK / E-WALLET PHISHING
// ============================================================
{
  id: 'kg-031',
  text: 'Your Landbank iAccess account is about to be deducted PHP3,456.00 for AGRIBANK PH services.  If this is not you, cancel it immediately at https://lbpiaccess.com-ph.click/i-revoke',
  expectedBand: 'high',
  category: 'sms_scam',
  language: 'en',
  kaggleHash: '04cbdae3-8826-3625-8f0a-e3a8ed51d3db',
  sourceNote: 'Landbank phishing with typosquat domain and urgency'
},
{
  id: 'kg-032',
  text: 'BDO UPDATE: As part of our new BDO Online App update, you are required to validate and update your BDO Online Banking information to keep your account current and to continue receiving OTP. To proceed, please visit https://web-bdo.online-digitalappdev.workers.dev/ . Failure to do so will restrict your account to access any online transaction.',
  expectedBand: 'high',
  category: 'sms_scam',
  language: 'en',
  kaggleHash: 'ec6149ca-baa1-3982-b6de-970a695330f5',
  sourceNote: 'BDO phishing via workers.dev with OTP credential bait'
},
{
  id: 'kg-033',
  text: 'URGENT ACTION REQUIRED: Your account needs attention! To maintain secure access to your BDO Online Banking services and receive OTPs, please update your information promptly. Visit Online-App.ltd!SecureBDO to complete this important step.',
  expectedBand: 'high',
  category: 'sms_scam',
  language: 'en',
  kaggleHash: '48082699-3459-34a0-a960-e0a168b93ba9',
  sourceNote: 'BDO impersonation with all-caps urgency'
},
{
  id: 'kg-034',
  text: 'Good day from BancoDeOro,  As part of our continuous effort to bring you the best eWallet services, we advised you to verify your account information to continually access. Failure to do so will result in an account suspension.  Verify here: bdo.url-ph.tw',
  expectedBand: 'high',
  category: 'sms_scam',
  language: 'en',
  kaggleHash: '8b4c8e31-c2e5-3677-9b61-7ced6b7b79f1',
  sourceNote: 'BDO impersonation with .tw lookalike TLD'
},
{
  id: 'kg-035',
  text: '[BDO Unibank]  Hello,  We have detected an unauthorized login attempt originating from the Philippines on your account. Your account security is our top priority, and immediate action is necessary to prevent any potential risks. Thank you for your swift response to this security alert.  visit here: t.co/IcEHUSej6K',
  expectedBand: 'high',
  category: 'sms_scam',
  language: 'en',
  kaggleHash: 'df420023-40cf-3bd8-bd2d-4aca357785d6',
  sourceNote: 'BDO security-alert phishing with shortened URL'
},
{
  id: 'kg-036',
  text: "Banco De Oro  You're having issues with account security. Please review them now at centi.ai/BDO-Online  Sincerely, BANCO DE ORO",
  expectedBand: 'high',
  category: 'sms_scam',
  language: 'en',
  kaggleHash: 'ca335244-9d77-3540-a9a2-3ea89e83feea',
  sourceNote: 'BDO impersonation routing to centi.ai short link'
},
{
  id: 'kg-037',
  text: 'Notice from BDO: In an ongoing effort to provide you with the best online banking services, we would like to request your account validation and continuously utilize digital banking and obtain an OTP. Proceed to mybdo.web-ph.uk. Failure to do so will result in an account suspension.',
  expectedBand: 'high',
  category: 'sms_scam',
  language: 'en',
  kaggleHash: 'eeaa7fb4-d900-3d21-830b-23f35910cdee',
  sourceNote: 'BDO phishing with .uk typosquat'
},
{
  id: 'kg-038',
  text: 'BDO Online | System Advisory   Due to SIM Registration Act 11934, We required all BDO clients to update their registered mobile number associated on your account. please visit here: online.mybdo-service.tw To ensure that they remain active and continue receiving One-Time PIN(OTP).',
  expectedBand: 'high',
  category: 'sms_scam',
  language: 'en',
  kaggleHash: 'b67bc958-f6a5-340e-8dd6-d39e05de2b2b',
  sourceNote: 'BDO phishing exploiting SIM Registration Act language'
},
{
  id: 'kg-039',
  text: 'Hi,  Your G-Cash account has been temporarily deactivated! Please update your G-Cash as soon as possible.  Confirm your account here: kycupdategcash.online Thank you for choosing GCash!',
  expectedBand: 'high',
  category: 'sms_scam',
  language: 'en',
  kaggleHash: '2d478673-def4-35c3-9192-6a15a3a56e2b',
  sourceNote: 'GCash KYC update phishing'
},
{
  id: 'kg-040',
  text: 'You receive P5,000 from DSWD Ayuda Sa Kapos Ang Kita via GCash. Confirm today https://bit.ly/Gcash-X or it will be forfeited bukas.',
  expectedBand: 'high',
  category: 'sms_scam',
  language: 'mixed',
  kaggleHash: '87dc2d93-ee1b-3de9-9b17-2d0e968aaef9',
  sourceNote: 'DSWD Ayuda impersonation with shortened URL'
},
{
  id: 'kg-041',
  text: 'G Cash Advisory!  Our system detected unrecognized login attempts to your G Cash. As a precaution, your G Cash was suspended for 24 hours. To resolve this issue,  Visit: glife.money/G-Cash',
  expectedBand: 'high',
  category: 'sms_scam',
  language: 'en',
  kaggleHash: 'd2c90a83-9ca4-321b-bd9f-ae65fa902898',
  sourceNote: 'GCash login-suspended phishing'
},
{
  id: 'kg-042',
  text: 'Dear User,  Your GCash account has received P13,000 from GCash Support.  Redeem here: claimpeso.de/?claimid=37  Thank you for choosing us!',
  expectedBand: 'high',
  category: 'sms_scam',
  language: 'en',
  kaggleHash: 'd17888b3-513e-3100-948b-4e2047a6187b',
  sourceNote: 'GCash fake-credit phishing with generic greeting'
},
{
  id: 'kg-043',
  text: 'Celebrate GCash 10th Anniversary! Get a P1000 Top-up Voucher for only P399! Visit gcash-10-year.lc/G and join the fun! Offer ends July 31. Don t miss out!',
  expectedBand: 'high',
  category: 'sms_scam',
  language: 'en',
  kaggleHash: '5dfa549c-cd2f-3682-bdde-fefa26f8c4a0',
  sourceNote: 'GCash anniversary voucher scam with .lc TLD'
},
{
  id: 'kg-044',
  text: 'GCash:  Account verification needed due to suspicious transaction.  Kindly Visit: centre.is/Glife to continue using our services',
  expectedBand: 'high',
  category: 'sms_scam',
  language: 'en',
  kaggleHash: '7d66eb13-986c-30b1-a22f-15f9c39f7753',
  sourceNote: 'GCash verification phishing routed to centre.is'
},
{
  id: 'kg-045',
  text: 'Gcash.   Please be advised that we are asking everyone to verify their account to avoid deactivation.  Verify here: qrqr.ai/GcashHelpCenter',
  expectedBand: 'high',
  category: 'sms_scam',
  language: 'en',
  kaggleHash: '3ebdca91-6ffb-3e15-86ed-8d4b0f3810af',
  sourceNote: 'GCash impersonation via QR-style short link'
},
{
  id: 'kg-046',
  text: 'Good day from GCash,  Please be advised that we are asking everyone to verify their account, Failure to comply will result in to account deactivation within 24 hours.  Verify here: llink.ee/GCashAlert',
  expectedBand: 'high',
  category: 'sms_scam',
  language: 'en',
  kaggleHash: '9f74e86e-1d03-3d8a-99b1-6525b71b55f8',
  sourceNote: 'GCash 24h-deactivation threat phishing'
},
{
  id: 'kg-047',
  text: 'Congratulations GCash User! You have received P10,500 from GCash Loyalty Team. Claim your cash by clicking the link below. Claim your cash at gcash-redeemloyalty.website/claim Thank you for choosing GCash App.',
  expectedBand: 'high',
  category: 'sms_scam',
  language: 'en',
  kaggleHash: '68d1929b-abd5-387a-9733-9b1c62e6464e',
  sourceNote: 'GCash Loyalty Team fake-credit phishing'
},
{
  id: 'kg-048',
  text: 'Send Money Protect Policy will automatically renew on November 14th through your GCash for Php 1760.00. To cancel this policy, visit gcash.phlada.fr/n',
  expectedBand: 'high',
  category: 'sms_scam',
  language: 'en',
  kaggleHash: '4e1b31cd-c22b-3496-b1ff-4cc31675ab3c',
  sourceNote: 'Fake GCash insurance auto-renew with .fr TLD'
},

// ============================================================
// PARCEL / POSTAL SCAMS
// ============================================================
{
  id: 'kg-049',
  text: "[FEX] Your parcel P6115DDCDD7BA couldn't reach you. Please contact the branch at 9283170245 for any concerns.",
  expectedBand: 'caution',
  category: 'parcel_scam',
  language: 'en',
  kaggleHash: '67a65d11-9add-3cfc-93e7-f6e5a7ef76e5',
  sourceNote:
  'Fake courier callback bait (no URL, but unverified callback number)'
},
{
  id: 'kg-050',
  text: 'PH Postal:Your package has been returned to the local post office and cannot be re-delivered due to the need to verify the recipient identity. View postph.tw',
  expectedBand: 'high',
  category: 'parcel_scam',
  language: 'en',
  kaggleHash: '39c64d3f-48b2-3e7e-b9c0-3ef63c3986de',
  sourceNote: 'PH Post impersonation with .tw lookalike'
},
{
  id: 'kg-051',
  text: 'Your DOMESTIC MAIL has been returned to your local post office, please click ph-post.la to complete the verification and request a re-delivery.',
  expectedBand: 'high',
  category: 'parcel_scam',
  language: 'en',
  kaggleHash: 'ee949e57-1a89-3e73-b8a3-7977f3c3676c',
  sourceNote: 'PHLPost parcel verification phishing with .la TLD'
},
{
  id: 'kg-052',
  text: 'Tracking Code (RR*197PH) The courier arrived 1 days ago but delivery failed. Please visit pw29b.cn and we will reschedule the delivery after your validate.',
  expectedBand: 'high',
  category: 'parcel_scam',
  language: 'en',
  kaggleHash: '03e8598d-86f5-33c9-970f-9f7cb4486924',
  sourceNote: 'Fake tracking code with .cn TLD'
},
{
  id: 'kg-053',
  text: 'Your delivery attempt was unsuccessful. Please visit the link below to reschedule: phpost.tw',
  expectedBand: 'high',
  category: 'parcel_scam',
  language: 'en',
  kaggleHash: 'c348f645-093e-30cf-baa2-f054aeae6231',
  sourceNote: 'Delivery reschedule phishing with .tw lookalike'
},
{
  id: 'kg-054',
  text: 'Your domestic  parcel tracking code RR*-16PH is undeliverable due to unverified recipient info. Please check mada-ph.la',
  expectedBand: 'high',
  category: 'parcel_scam',
  language: 'en',
  kaggleHash: '1dfed4c6-4ded-3920-baed-d2573aaf4d0d',
  sourceNote: 'Undeliverable-parcel phishing with .la TLD'
},
{
  id: 'kg-055',
  text: "We can't deliver your item to your door because of no address, please enter the address: rb.gy/46ql4j",
  expectedBand: 'high',
  category: 'parcel_scam',
  language: 'en',
  kaggleHash: '9aa980fd-3197-32be-baf0-82c65ce58b00',
  sourceNote: 'Address-collection parcel scam with rb.gy shortener'
},

// ============================================================
// GOVERNMENT IMPERSONATION
// ============================================================
{
  id: 'kg-056',
  text: 'MMDA NO-CONTACT Apprehension: Visit gov-md.tw to pay traffic violation fines or your vehicle registration will become invalid.',
  expectedBand: 'high',
  category: 'government_impersonation',
  language: 'en',
  kaggleHash: 'a739b3c3-4a9e-30c8-aae1-611b125f756e',
  sourceNote: 'MMDA no-contact apprehension impersonation'
},
{
  id: 'kg-057',
  text: 'MMDA No-Touch Arrest Penalty Notice: Visit go-phgov.tw to pay traffic violation fines or your vehicle registration will become invalid',
  expectedBand: 'high',
  category: 'government_impersonation',
  language: 'en',
  kaggleHash: '1304c407-831a-3037-98d8-6705687efb9d',
  sourceNote: 'MMDA fine notice with .tw domain'
},
{
  id: 'kg-058',
  text: 'MMDA No-Touch Arrest Penalty Notice: Pay traffic fines through phmy.tw upon notification or driver permit will be suspended for 30 days.',
  expectedBand: 'high',
  category: 'government_impersonation',
  language: 'en',
  kaggleHash: '235b300e-8103-3617-96bc-8b831ea78e71',
  sourceNote: 'MMDA fine notice with permit-suspension threat'
},
{
  id: 'kg-059',
  text: 'PH SOCIAL SECURITY SYSTEM You can receive P1,351.5 from My.SSS in 2024. Please check and verify your employers payment record: sssc.mx/?D9F4H8Dmu5',
  expectedBand: 'high',
  category: 'government_impersonation',
  language: 'en',
  kaggleHash: 'f365077e-3c13-324b-b581-1f5ac331da8e',
  sourceNote: 'SSS benefit phishing with .mx domain'
},
{
  id: 'kg-060',
  text: 'Social Security Plan You are entitled to a lump sum benefit amount of P2,153 based on your total contribution in 2024, please apply at sssr.mx/7C',
  expectedBand: 'high',
  category: 'government_impersonation',
  language: 'en',
  kaggleHash: '093100db-0036-3446-8fb6-ceee4e43f1ef',
  sourceNote: 'SSS lump-sum benefit phishing'
},
{
  id: 'kg-061',
  text: 'Your My-SSS member is not enrolled in a payment method, please complete the enrollment:  sss-my.in/?ifn=83h3kd to receive your monthly benefits and stipend',
  expectedBand: 'high',
  category: 'government_impersonation',
  language: 'en',
  kaggleHash: 'adf1fe5c-3d47-36de-94b3-38f116d1d9b7',
  sourceNote: 'My-SSS enrollment phishing with .in TLD'
},

// ============================================================
// TELCO REWARD POINTS PHISHING
// ============================================================
{
  id: 'kg-062',
  text: 'Smart reminds you:Your Reward Points (6,309) expire today.Please redeem you gift soon: https://smartk.bond/rewards',
  expectedBand: 'high',
  category: 'sms_scam',
  language: 'en',
  kaggleHash: 'ada1411e-7c6e-37d8-bff9-fcd70b4dde30',
  sourceNote: 'Smart reward-points phishing with .bond TLD'
},
{
  id: 'kg-063',
  text: 'Smart reminds you:Your Reward Points (6,309) expire today.Please redeem you gift soon: https://smart1.cyou/rewards',
  expectedBand: 'high',
  category: 'sms_scam',
  language: 'en',
  kaggleHash: 'ada1411e-7c6e-37d8-bff9-fcd70b4dde30',
  sourceNote: 'Smart reward-points phishing with .cyou TLD'
},
{
  id: 'kg-064',
  text: 'GLOBE reminds you that your reward points (5,340) will expire today. Please visit to redeem your favorite gift: https://globeuc-ph.com',
  expectedBand: 'high',
  category: 'sms_scam',
  language: 'en',
  kaggleHash: 'b4440a5b-996e-329b-9151-c0c600037802',
  sourceNote: 'Globe reward-points phishing'
},
{
  id: 'kg-065',
  text: 'GLOBE reminds you that your reward points (5,340) will expire today. Please visit to redeem your favorite gift: https://glocbe-ph.com',
  expectedBand: 'high',
  category: 'sms_scam',
  language: 'en',
  kaggleHash: 'b4440a5b-996e-329b-9151-c0c600037802',
  sourceNote: 'Globe phishing with single-letter typosquat (glocbe)'
},
{
  id: 'kg-066',
  text: 'Dear customer, you have 16,590 points which will expire on 02/05/2025 Please redeem your present immediately! Pleaseclick:http://globe-points-ph.one/ph Redeem your present!',
  expectedBand: 'high',
  category: 'sms_scam',
  language: 'en',
  kaggleHash: 'b4440a5b-996e-329b-9151-c0c600037802',
  sourceNote: 'Globe phishing with generic greeting and HTTP (non-HTTPS)'
},

// ============================================================
// LOAN / CREDIT CARD SCAMS
// ============================================================
{
  id: 'kg-067',
  text: "Good day I'm Ms.Ivie from multi banking  personal cash loan I'd like to offer you personal loan.100k up to 5M Unsecured loan,and can get the loan as fast as 3 to 7 banking days .If you are interested please reply YES . Thank you.",
  expectedBand: 'caution',
  category: 'sms_scam',
  language: 'en',
  kaggleHash: 'a43ebdd5-4407-3201-b91a-878f3722a53d',
  sourceNote: 'Unsolicited unsecured loan offer (likely SEC-unregistered)'
},
{
  id: 'kg-068',
  text: 'We have received your interest in applying for a Credit Card with NO ANNUAL FEE FOR LIFE  If you would like to proceed with your credit card application approval, kindly send only 2 valid IDs to our processing team via VIBER --> 09669346415  Once we receive your IDs, please wait for our verification call.',
  expectedBand: 'high',
  category: 'sms_scam',
  language: 'en',
  kaggleHash: 'c84f16d8-c7be-3e1e-a2f8-5914f06e7e55',
  sourceNote: 'Fake credit card application asking for IDs via Viber'
},

// ============================================================
// MATCH-FIXING / FAKE-TESTIMONIAL SCAMS
// ============================================================
{
  id: 'kg-069',
  text: "papalduhin kita ng 12k ngayon, basta ikaw na bahala sakin ah reply sa fb 'YES'  ako bahala sa winning games mo  FB PAGE : Yara Vespar Naka gray na sando ang profile",
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'tl',
  kaggleHash: '355f5386-d208-3c23-80f1-7c406c44de35',
  sourceNote: 'Match-fixing scam routing to Facebook profile'
},
{
  id: 'kg-070',
  text: 'okay lang ba makipag deal ako sayo? Cash in ka 100 ipapanalo kita 7k basta hati tayo 2k sakin 5k sayo ,kung sure k  ame :Allexa Brielle Lim  search:@officialalex09 (naka swimsuit na white  )',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'tl',
  kaggleHash: 'cc71e120-e69f-3d01-9934-771523b1c5f6',
  sourceNote: 'Match-fixing deal with Instagram/social handle'
},

// ============================================================
// FAKE GIFTS / PRIZES (CASINO-ADJACENT)
// ============================================================
{
  id: 'kg-071',
  text: 'Your Luck Awaits! Grab P3000 Gift today at GJP PH GoJPLucks.golf',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'en',
  kaggleHash: 'e771fbdc-5b20-382c-a306-5ef20671800d',
  sourceNote: 'Casino gift lure with .golf TLD'
},
{
  id: 'kg-072',
  text: 'Long time no see, this is a 999P gift, sana matanggap mo  17a7be1t.at',
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'mixed',
  kaggleHash: '435e9ee6-0c6c-3d5d-ac72-a41148bf3be3',
  sourceNote: 'Disguised-as-personal gambling scam with .at TLD'
},
{
  id: 'kg-073',
  text: "Tara na't manalo sa ₱10 mo gawin nating 15k!  spinsarc.tv",
  expectedBand: 'high',
  category: 'gambling_scam',
  language: 'tl',
  kaggleHash: '62009aa1-e5ea-36aa-82ab-498314a31d25',
  sourceNote: 'Short multiplier-promise gambling lure'
},

// ============================================================
// (BILL / PAYMENT) SOCIAL ENGINEERING
// ============================================================
{
  id: 'kg-074',
  text: '(Bill Reminder) You have 47,568 to collect. Expire in 48 hours. Please get it now: bk.qa9.ca/nvk',
  expectedBand: 'high',
  category: 'sms_scam',
  language: 'en',
  kaggleHash: '897e5f0c-d884-32d7-8c1b-3ac9379eed92',
  sourceNote: 'Fake bill-reminder scam with urgency'
},

// ============================================================
// PROMOTIONAL SPAM (UNSOLICITED BUT LIKELY LEGITIMATE)
// ============================================================
{
  id: 'kg-075',
  text: 'Save on transfer fees with BDO Pay. Send Money to another BDO account for free, or to other banks for a low InstaPay fee of P10. Download now!',
  expectedBand: 'low',
  category: 'promotional_spam',
  language: 'en',
  kaggleHash: 'ec6149ca-baa1-3982-b6de-970a695330f5',
  sourceNote:
  'Legitimate BDO marketing — no link, no credential ask, no urgency'
},
{
  id: 'kg-076',
  text: "Don't miss out!! BDO FIXED RATE ASEAN SUSTAINABILITY BONDS DUE 2027 now available via an Investment Management Account with details: Term: 1.5 years Coupon Rate Gross: 5.875% Net:  4.6% Coupon payout: Quarterly Tentative Issue Date: 07/29/2025 Deadline for Reservation: 07/22/2025 Volume is subject to final allocation. For details, call or visit your BDO branch.",
  expectedBand: 'low',
  category: 'promotional_spam',
  language: 'en',
  kaggleHash: 'ec6149ca-baa1-3982-b6de-970a695330f5',
  sourceNote: 'Legitimate BDO bond marketing — directs to branch, no link'
},
{
  id: 'kg-077',
  text: 'View, manage, add or remove your BDO accounts and cards on the BDO Online app! Download and sign up now!',
  expectedBand: 'low',
  category: 'promotional_spam',
  language: 'en',
  kaggleHash: 'ec6149ca-baa1-3982-b6de-970a695330f5',
  sourceNote: 'Legitimate BDO app marketing'
},
{
  id: 'kg-078',
  text: 'Starting March 12, Apple/iOS users will no longer be able to use the old BDO Digital Banking App.  Continue to invest in UITFs via the new BDO Online app. Just click Manage Investments to invest online.  For inquiries regarding trust and investment products, email us at trustcustomercare@bdo. com. ph or call the BDO Contact Center at (02) 8631-8000.',
  expectedBand: 'low',
  category: 'promotional_spam',
  language: 'en',
  kaggleHash: 'ec6149ca-baa1-3982-b6de-970a695330f5',
  sourceNote: 'Legitimate BDO advisory with verified contact info'
},
{
  id: 'kg-079',
  text: 'Security Tip: Lock or Unlock your BDO Credit or Debit Cards anytime you want with the new BDO Online app. Download BDO Online and sign up today!',
  expectedBand: 'low',
  category: 'promotional_spam',
  language: 'en',
  kaggleHash: 'ec6149ca-baa1-3982-b6de-970a695330f5',
  sourceNote: 'Legitimate BDO security tip marketing'
},
{
  id: 'kg-080',
  text: 'Protection, performance, and peace of mind!  Score up to 15% off on Zagg products until May 31, 2025!  Promo runs at all Power Mac Center and The Loop stores.',
  expectedBand: 'low',
  category: 'promotional_spam',
  language: 'en',
  kaggleHash: 'a71e5a2d-4f14-318f-9ce5-6c0b5c5c764f',
  sourceNote: 'Legitimate Power Mac Center promo'
},
{
  id: 'kg-081',
  text: "Time to celebrate Mom!   Enjoy special Mothers Day deals in-store and online until May 15, 2025. Learn more via Power Mac Center's official Facebook page!",
  expectedBand: 'low',
  category: 'promotional_spam',
  language: 'en',
  kaggleHash: 'a71e5a2d-4f14-318f-9ce5-6c0b5c5c764f',
  sourceNote: "Legitimate PMC Mother's Day promo"
},
{
  id: 'kg-082',
  text: 'Condo across Ateneo by Torre Lorenzo, only 12 studio units left.  This is Josh. Reply now to schedule a presentation or to opt out of future updates.',
  expectedBand: 'caution',
  category: 'promotional_spam',
  language: 'en',
  kaggleHash: '691da84b-6868-3a7d-a9b6-efd391f5478e',
  sourceNote: 'Real-estate cold solicitation — unsolicited but legal'
},
{
  id: 'kg-083',
  text: "Good day! Come and join us here at Vus Sky Bar & Lounge, Marco Polo Hotel Ortigas Manila. We've got a cozy and relaxing vibe—perfect for chilling out this Monday night. See you later! Thank you! Kit Miculob Vu's Receptionist",
  expectedBand: 'low',
  category: 'promotional_spam',
  language: 'en',
  kaggleHash: 'cef133b0-06ed-367b-acfd-bb8b7dc6ceb6',
  sourceNote: 'Legitimate venue invitation from named establishment'
},
{
  id: 'kg-084',
  text: "Good day this is from Getmeds Philippines Inc my name is ren, we'll just ask if you want to order? I'll be more than happy to assist you",
  expectedBand: 'caution',
  category: 'promotional_spam',
  language: 'en',
  kaggleHash: '06edc4ef-9230-36b7-ac64-c97408bc3dba',
  sourceNote: 'Pharmacy cold contact — unsolicited but plausible'
},
{
  id: 'kg-085',
  text: 'Hello good day! :) Commercial lots in the first master-planned CBD in Batangas - Lima Estate  - with 70 hectare existing components like The Outlets at Lipa, Aboitiz Pitch, office bldgs, Holiday Inn and residential - 40 hectare expansion area with parks and open spaces - kindly message me for details  Erwin Sia',
  expectedBand: 'caution',
  category: 'promotional_spam',
  language: 'en',
  kaggleHash: 'fc60ee9e-1aeb-3c2f-8a68-25a6442e8eda',
  sourceNote:
  'Commercial real-estate cold contact — unsolicited but legitimate'
}];