export type QuizQuestion = {
  id: number;
  category: string;
  scenario: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  source: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    category: 'Banking SMS',
    scenario:
      "You receive an SMS: 'BDO Alert: Your account is temporarily locked due to suspicious activity. Verify here: http://bdo-security-update.com/login'",
    options: [
      'Click the link immediately to unlock the account.',
      'Reply to the SMS asking for more details.',
      'Ignore the message and check your account via the official bank app or website.',
      'Forward the message to friends to warn them.'
    ],
    correctAnswer: 2,
    explanation:
      'Banks do not send login links by SMS. The URL is a phishing site designed to steal your credentials. BSP and BPI advise verifying only through official apps.',
    source: 'BSP Consumer Protection'
  },
  {
    id: 2,
    category: 'Social Engineering',
    scenario:
      "A Facebook friend messages: 'Emergency at the hospital — need 5,000 PHP via GCash now. Send to 09123456789.'",
    options: [
      'Send the money immediately to help your friend.',
      'Call your friend on their known phone number to verify the story.',
      'Ask them security questions only on Messenger.',
      'Ignore because you do not use GCash.'
    ],
    correctAnswer: 1,
    explanation:
      'Hacked Messenger accounts are commonly used for "palusot" scams. Always verify emergencies by voice call on a number you already trust.',
    source: 'PNP-ACG'
  },
  {
    id: 3,
    category: 'Email Phishing',
    scenario:
      "You receive email from 'Netflix Support' at support@netflix-billing-update.net saying payment failed.",
    options: [
      'Update payment using the link in the email.',
      'Check the sender domain — it is not an official Netflix address.',
      'Reply with your new credit card details.',
      'Ignore it; Netflix will cancel automatically.'
    ],
    correctAnswer: 1,
    explanation:
      'Legitimate Netflix email uses @netflix.com. Look-alike domains are a classic phishing tactic to capture card data.',
    source: 'DICT / NCERT'
  },
  {
    id: 4,
    category: 'Online Shopping',
    scenario:
      'An online seller insists on GCash personal transfer, refuses COD, and pressures you to pay before shipping.',
    options: [
      'Pay if the item is cheap.',
      'Ask for their ID photo before sending.',
      'Cancel — refusal of secure payment methods is a major red flag.',
      'Send half the payment first.'
    ],
    correctAnswer: 2,
    explanation:
      'DTI and consumer groups warn that pressure tactics plus personal transfers without buyer protection are hallmarks of shopping scams.',
    source: 'DTI Consumer Care'
  },
  {
    id: 5,
    category: 'PhilSys / Email',
    scenario:
      'An email claims you must pay a fee to "upgrade" your National ID to premium PhilSys status with a payment link.',
    options: [
      'Pay immediately before the deadline.',
      'Verify on philsys.gov.ph — PSA does not charge for premium ID tiers via email links.',
      'Forward the email to everyone in your barangay.',
      'Reply with your PhilSys number for verification.'
    ],
    correctAnswer: 1,
    explanation:
      'PSA PhilSys has warned against phishing disguised as National ID assistance. Official updates are published on philsys.gov.ph, not random payment links.',
    source: 'PhilSys / PSA'
  },
  {
    id: 6,
    category: 'Job Scam',
    scenario:
      'A Telegram recruiter offers easy "task" earnings but asks you to deposit funds before your first payout.',
    options: [
      'Deposit a small amount to test if it is real.',
      'Decline — legitimate jobs do not require you to pay to start earning.',
      'Share the link so friends can also earn.',
      'Give them your online banking login for faster payouts.'
    ],
    correctAnswer: 1,
    explanation:
      'Telegram task scams are documented by PNP cybercrime units. Upfront deposits are how victims lose money with no real job behind the offer.',
    source: 'PNP-ACG RACU 8'
  },
  {
    id: 7,
    category: 'AI / Voice',
    scenario:
      'You get a voice message that sounds exactly like your manager ordering an urgent wire transfer, but the number is unknown.',
    options: [
      'Transfer immediately — it sounds like your boss.',
      'Verify through your company\'s official channel or call your manager on a known number.',
      'Reply to the unknown number asking for confirmation.',
      'Forward the audio to social media.'
    ],
    correctAnswer: 1,
    explanation:
      'AI voice cloning is used in CEO fraud. Always confirm financial requests through a separate trusted channel, not the message itself.',
    source: 'DICT NCERT'
  },
  {
    id: 8,
    category: 'QR / Payments',
    scenario:
      'At a market stall you scan a QR code on a sticker that was placed over the vendor\'s original code.',
    options: [
      'Pay anyway — QR codes are always safe.',
      'Ask the vendor to confirm the recipient name in your app before paying.',
      'Use the sticker because it looks newer.',
      'Share the sticker QR online for others to use.'
    ],
    correctAnswer: 1,
    explanation:
      'Quishing (QR phishing) redirects payments to scammers. Confirm the payee name matches the merchant before authorizing.',
    source: 'BSP / CERT-PH'
  }
];
