export type Article = {
  id: string;
  title: string;
  image: string;
  summary: string;
  readTime: string;
  date: string;
  lastVerifiedAt?: string;
  category: string;
  source: string;
  sourceFullName: string;
  sourceUrl: string;
  content: string;
  authorities?: {
    name: string;
    role: string;
    contact: string;
    url: string;
  }[];
  references?: { title: string; url: string }[];
};

import { enhanceArticles } from './articleEnhancements';

const rawArticles: Article[] = [
{
  id: '1',
  title: 'Understanding the New Wave of GCash Phishing Scams',
  image:
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
  summary:
  'A comprehensive guide on how scammers are using fake GCash advisories to steal OTPs and MPINs.',
  readTime: '5 min read',
  source: 'PNP-ACG',
  sourceFullName: 'Philippine National Police - Anti-Cybercrime Group',
  sourceUrl: 'https://acg.pnp.gov.ph',
  date: 'Oct 12, 2023',
  category: 'Phishing',
  authorities: [
  {
    name: 'PNP Anti-Cybercrime Group (PNP-ACG)',
    role: 'Primary investigator for phishing and e-wallet fraud cases nationwide.',
    contact: 'Hotline (02) 8414-1560 · acg@pnp.gov.ph',
    url: 'https://acg.pnp.gov.ph'
  },
  {
    name: 'Bangko Sentral ng Pilipinas (BSP)',
    role: 'Regulator of e-money issuers — enforces BSP Circular 1140 on fraud response.',
    contact: 'consumeraffairs@bsp.gov.ph',
    url: 'https://www.bsp.gov.ph'
  },
  {
    name: 'GCash Fraud Response',
    role: 'Direct provider channel for freezing compromised accounts.',
    contact: 'Dial 2882 (toll-free)',
    url: 'https://www.gcash.com/help'
  }],

  content: `
      <p>The Philippine National Police Anti-Cybercrime Group (PNP-ACG) has observed a significant increase in sophisticated phishing campaigns targeting users of the GCash mobile wallet. These scams are designed to trick victims into revealing their One-Time Passwords (OTPs) and Mobile Personal Identification Numbers (MPINs), granting criminals full access to their funds.</p>
      
      <p>The most common tactic involves sending an SMS message that appears to be an official advisory from GCash. These messages often create a false sense of urgency, claiming that the user's account will be suspended, restricted, or deactivated unless they immediately verify their identity. The message includes a link that directs the user to a fraudulent website designed to look exactly like the legitimate GCash login page.</p>
      
      <p>Once a user enters their mobile number and MPIN on the fake site, the scammers capture this information. The fake site then prompts the user to enter the OTP sent to their phone. Because the scammers are simultaneously trying to log into the real GCash app using the stolen number and MPIN, the system generates a genuine OTP. When the victim enters this OTP on the fake site, the scammers intercept it and use it to complete the login on their end.</p>
      
      <p>To protect yourself, remember that GCash will never send links via SMS, email, or messaging apps asking you to verify your account or update your information. Always access your account directly through the official GCash app downloaded from the Google Play Store or Apple App Store. Never share your MPIN or OTP with anyone, even if they claim to be a GCash representative or a government official.</p>
      
      <p>If you suspect you have received a phishing message, do not click the link. Report the incident immediately to the PNP-ACG and to GCash through their official Help Center within the app. If you have accidentally provided your information, change your MPIN immediately and contact GCash support to secure your account.</p>
    `
},
{
  id: '2',
  title: 'How to Secure Your Facebook Account from Hackers',
  image:
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
  summary:
  'Step-by-step instructions on enabling 2FA and recognizing suspicious login attempts.',
  readTime: '4 min read',
  source: 'DICT',
  sourceFullName: 'Department of Information and Communications Technology',
  sourceUrl: 'https://www.ncert.gov.ph/',
  date: 'Oct 10, 2023',
  category: 'Privacy',
  authorities: [
  {
    name: 'DICT Cybersecurity Bureau',
    role: 'Issues national advisories on social media account takeovers.',
    contact: 'cybersecurity@dict.gov.ph',
    url: 'https://www.ncert.gov.ph/'
  },
  {
    name: 'CERT-PH',
    role: 'Incident response team for compromised accounts and credential theft.',
    contact: 'report@cert.gov.ph',
    url: 'https://www.ncert.gov.ph/'
  },
  {
    name: 'National Privacy Commission (NPC)',
    role: 'Handles unauthorized data access cases under RA 10173.',
    contact: 'complaints@privacy.gov.ph',
    url: 'https://privacy.gov.ph'
  }],

  content: `
      <p>Social media accounts, particularly Facebook, are prime targets for cybercriminals. A compromised account can be used to spread misinformation, launch phishing attacks against your contacts, or commit financial fraud. The Department of Information and Communications Technology (DICT) strongly advises all users to implement robust security measures to protect their online presence.</p>
      
      <p>The most critical step in securing your Facebook account is enabling Two-Factor Authentication (2FA). 2FA adds an extra layer of security by requiring a second form of verification, in addition to your password, when logging in from an unrecognized device. This second factor is typically a code sent via SMS or generated by an authenticator app (like Google Authenticator or Authy).</p>
      
      <p>To enable 2FA on Facebook, navigate to Settings & Privacy > Settings > Security and Login. Under the Two-Factor Authentication section, click Edit and follow the prompts to set up your preferred method. Using an authenticator app is generally considered more secure than SMS, as SMS messages can be intercepted through SIM swapping attacks.</p>
      
      <p>In addition to 2FA, regularly review your active sessions. In the Security and Login settings, check the "Where You're Logged In" section. If you see any unfamiliar devices or locations, log them out immediately and change your password. A strong password should be at least 12 characters long, combining uppercase and lowercase letters, numbers, and symbols. Avoid using easily guessable information like birthdays or pet names.</p>
      
      <p>Finally, be wary of unsolicited messages containing links, even if they appear to come from friends. Hackers often use compromised accounts to send malicious links that can steal your login credentials or infect your device with malware. If a message seems suspicious or out of character for the sender, verify it with them through another communication channel before clicking.</p>
    `
},
{
  id: '3',
  title: 'The Rise of Fake Online Lending Apps in the Philippines',
  image:
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
  summary:
  'Learn how to identify illegal lending apps that harvest your contacts and harass borrowers.',
  readTime: '7 min read',
  source: 'SEC Philippines',
  sourceFullName: 'Securities and Exchange Commission Philippines',
  sourceUrl:
  'https://www.sec.gov.ph/lending-companies-and-financing-companies-2/advisories-and-notices/#gsc.tab=0',
  date: 'Oct 05, 2023',
  category: 'Scam Awareness',
  authorities: [
  {
    name: 'SEC Enforcement and Investor Protection Department',
    role: 'Regulates lending and financing companies under RA 9474 and RA 11765.',
    contact: 'epd@sec.gov.ph · (02) 8818-5476',
    url: 'https://www.sec.gov.ph/lending-companies-and-financing-companies-2/advisories-and-notices/#gsc.tab=0'
  },
  {
    name: 'National Privacy Commission (NPC)',
    role: 'Sanctions lending apps that misuse personal data for debt shaming.',
    contact: 'complaints@privacy.gov.ph',
    url: 'https://privacy.gov.ph'
  },
  {
    name: 'PNP Anti-Cybercrime Group',
    role: 'Handles harassment, threats, and online libel from collectors.',
    contact: '(02) 8414-1560',
    url: 'https://acg.pnp.gov.ph'
  }],

  content: `
      <p>The Securities and Exchange Commission (SEC) has issued numerous warnings regarding the proliferation of illegal online lending applications. These unregistered entities target individuals in need of quick cash, offering seemingly easy loans but imposing exorbitant interest rates, hidden charges, and employing abusive debt collection practices.</p>
      
      <p>A hallmark of these fake lending apps is their aggressive data harvesting. Upon installation, they often require sweeping permissions to access your contacts, photo gallery, location, and messages. This data is not used for credit assessment but rather as leverage for extortion. If a borrower misses a payment, the operators of these apps will use the harvested contacts to publicly shame the borrower, sending threatening messages to their family, friends, and colleagues.</p>
      
      <p>To identify a legitimate lending company, always verify their registration with the SEC. The SEC publishes advisories and notices for registered lending and financing companies on its official site — check the <a href="https://www.sec.gov.ph/lending-companies-and-financing-companies-2/advisories-and-notices/#gsc.tab=0" target="_blank" rel="noopener noreferrer">Lending Companies &amp; Financing Companies advisories page</a> before you borrow. If an app or company is not on this list, do not engage with them. Legitimate lenders are required to provide a clear disclosure statement detailing the loan amount, interest rate, deductions, and total amount payable before the loan is finalized.</p>
      
      <p>Be highly suspicious of apps that demand access to your contacts or photo gallery as a condition for loan approval. Legitimate financial institutions do not require this level of access. Furthermore, be wary of lenders that offer guaranteed approval without any credit checks or those that require an upfront fee before releasing the loan proceeds.</p>
      
      <p>If you have fallen victim to an abusive online lending app, document all harassing messages and calls. Report the app to the SEC Enforcement and Investor Protection Department and file a formal complaint with the PNP Anti-Cybercrime Group. Do not yield to extortion attempts, as paying often leads to further demands.</p>
    `
},
{
  id: '4',
  title: "Creating Strong Passwords You Won't Forget",
  image:
  'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=800&q=80',
  summary:
  'Best practices for password management and why you should stop using your birthdate.',
  readTime: '3 min read',
  source: 'CERT-PH',
  sourceFullName: 'Computer Emergency Response Team - Philippines',
  sourceUrl: 'https://www.ncert.gov.ph/',
  date: 'Sep 28, 2023',
  category: 'Passwords',
  authorities: [
  {
    name: 'CERT-PH (DICT)',
    role: 'National cybersecurity incident response — issues password best-practice guidelines.',
    contact: 'report@cert.gov.ph',
    url: 'https://www.ncert.gov.ph/'
  },
  {
    name: 'DICT Cybersecurity Bureau',
    role: 'Publishes the National Cybersecurity Plan and credential-hygiene standards.',
    contact: 'cybersecurity@dict.gov.ph',
    url: 'https://www.ncert.gov.ph/'
  }],

  content: `
      <p>Passwords are the first line of defense against unauthorized access to your digital life. However, many users still rely on weak, easily guessable passwords, making them vulnerable to brute-force attacks and credential stuffing. CERT-PH emphasizes the importance of creating strong, unique passwords for every online account.</p>
      
      <p>A common mistake is using personal information such as birthdates, names of family members, or pets. This information is often publicly available on social media, making it trivial for attackers to guess your password. Another dangerous practice is reusing the same password across multiple sites. If one site suffers a data breach, attackers will use those compromised credentials to try and access your other accounts.</p>
      
      <p>The most effective strategy for creating strong passwords is using passphrases. A passphrase is a sequence of random words that is long enough to be secure but easy for you to remember. For example, "BlueCoffeeRunningFast!" is much stronger than "P@ssw0rd123" and easier to recall. Aim for a length of at least 15 characters.</p>
      
      <p>To manage multiple unique passwords, consider using a reputable password manager. These tools securely store your passwords in an encrypted vault, requiring you to remember only one strong master password. Password managers can also generate complex, random passwords for new accounts and automatically fill them in when you log in.</p>
      
      <p>Remember to update your passwords periodically, especially for critical accounts like email and banking. Never share your passwords with anyone, and avoid writing them down on sticky notes or storing them in unencrypted text files on your device.</p>
    `
},
{
  id: '5',
  title: 'Protecting Seniors from "Kamag-anak" Text Scams',
  image:
  'https://images.unsplash.com/photo-1559131397-f94da358f7ca?w=800&q=80',
  summary:
  'How to educate elderly family members about scammers pretending to be relatives in distress.',
  readTime: '6 min read',
  source: 'PNP-ACG',
  sourceFullName: 'Philippine National Police - Anti-Cybercrime Group',
  sourceUrl: 'https://acg.pnp.gov.ph',
  date: 'Sep 20, 2023',
  category: 'Online Safety',
  authorities: [
  {
    name: 'PNP Anti-Cybercrime Group',
    role: 'Investigates impersonation scams and SIM-based fraud.',
    contact: '(02) 8414-1560',
    url: 'https://acg.pnp.gov.ph'
  },
  {
    name: 'National Telecommunications Commission (NTC)',
    role: 'Enforces SIM Registration Act and blocks fraudulent numbers.',
    contact: 'consumer@ntc.gov.ph',
    url: 'https://ntc.gov.ph'
  },
  {
    name: 'DSWD - Senior Citizen Affairs',
    role: 'Support and reporting channel for elder financial abuse cases.',
    contact: 'inquiry@dswd.gov.ph',
    url: 'https://www.dswd.gov.ph'
  }],

  content: `
      <p>The "Kamag-anak" (Relative) text scam is a persistent threat that disproportionately targets the elderly. In this scheme, scammers impersonate a family member—often a child or grandchild—claiming to be in an emergency situation and urgently needing money. The PNP-ACG urges families to proactively educate their senior members about this deceptive tactic.</p>
      
      <p>The scam typically begins with a text message from an unknown number, starting with something like, "Ma, this is my new number. I lost my phone." Once the victim responds, the scammer invents a crisis: they are in the hospital, they have been arrested, or they need to pay an urgent bill. They then request money to be sent via mobile wallets like GCash or Maya, or through remittance centers.</p>
      
      <p>Scammers often use high-pressure tactics, insisting that the situation is an absolute emergency and begging the victim not to tell anyone else. This urgency is designed to panic the victim and prevent them from verifying the story. They may also gather basic information from social media to make their impersonation more convincing.</p>
      
      <p>To protect elderly family members, establish a "verification rule." Teach them that if they ever receive a message from an unknown number claiming to be a relative in trouble, they must immediately call that relative on their known, original phone number to confirm the situation. If the original number cannot be reached, they should contact another family member to verify the story before sending any money.</p>
      
      <p>Encourage open communication about scams. Discuss common tactics and assure them that it is okay to be skeptical of unsolicited messages. If a senior family member falls victim to this scam, support them in reporting the incident to the authorities and their telecommunications provider, and help them secure their accounts.</p>
    `
},
{
  id: '6',
  title: 'What to Do If You Clicked a Suspicious Link',
  image:
  'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80',
  summary:
  'Immediate actions to take to secure your device and accounts after a potential breach.',
  readTime: '5 min read',
  source: 'DICT',
  sourceFullName: 'Department of Information and Communications Technology',
  sourceUrl: 'https://www.ncert.gov.ph/',
  date: 'Sep 15, 2023',
  category: 'Online Safety',
  authorities: [
  {
    name: 'CERT-PH',
    role: 'First responder for malware infections and credential compromise.',
    contact: 'report@cert.gov.ph',
    url: 'https://www.ncert.gov.ph/'
  },
  {
    name: 'DICT Cybersecurity Bureau',
    role: 'Coordinates national-level incident response and advisories.',
    contact: 'cybersecurity@dict.gov.ph',
    url: 'https://www.ncert.gov.ph/'
  },
  {
    name: 'PNP Anti-Cybercrime Group',
    role: 'Files criminal cases against threat actors behind malicious campaigns.',
    contact: '(02) 8414-1560',
    url: 'https://acg.pnp.gov.ph'
  }],

  content: `
      <p>Clicking a malicious link can lead to malware infections, data theft, or compromised accounts. If you realize you have clicked on a suspicious link in an email, SMS, or social media message, taking immediate action is crucial to minimize the potential damage. The DICT recommends the following incident response steps.</p>
      
      <p>First, disconnect your device from the internet immediately. Turn off Wi-Fi and disable cellular data. This prevents any malware that may have been downloaded from communicating with the attacker's server or transmitting your personal data. It also stops the malware from spreading to other devices on your network.</p>
      
      <p>Next, do not enter any information on the website the link directed you to. If you have already entered login credentials, financial details, or personal information, assume that data is compromised. Once you have secured your device, use a different, uncompromised device to immediately change the passwords for the affected accounts and contact your bank or credit card provider to block any unauthorized transactions.</p>
      
      <p>Run a full system scan using reputable, updated antivirus or anti-malware software. This will help identify and remove any malicious programs installed on your device. If the scan detects malware, follow the software's instructions to quarantine or delete the threats. In severe cases, you may need to seek professional technical assistance or perform a factory reset on your device.</p>
      
      <p>Finally, monitor your accounts closely for any suspicious activity over the next few weeks. Enable Two-Factor Authentication (2FA) on all critical accounts to provide an extra layer of security. Report the phishing attempt or malicious link to the platform where you received it and to the relevant authorities, such as the PNP-ACG or the DICT Cybersecurity Bureau.</p>
    `
},
{
  id: '7',
  title:
  'Recognizing Investment Scams: From Crypto to Paluwagan Pyramid Schemes',
  image:
  'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=800&q=80',
  summary:
  'How to spot fraudulent investment offers promising unrealistic returns and protect your savings.',
  readTime: '8 min read',
  source: 'BSP',
  sourceFullName: 'Bangko Sentral ng Pilipinas',
  sourceUrl: 'https://www.bsp.gov.ph',
  date: 'Nov 02, 2023',
  category: 'Scam Awareness',
  authorities: [
  {
    name: 'Securities and Exchange Commission (SEC)',
    role: 'Authorizes investment solicitation and pursues unregistered schemes.',
    contact: 'epd@sec.gov.ph · (02) 8818-5476',
    url: 'https://www.sec.gov.ph'
  },
  {
    name: 'Bangko Sentral ng Pilipinas (BSP)',
    role: 'Regulates VASPs (crypto exchanges) and remittance providers.',
    contact: 'consumeraffairs@bsp.gov.ph',
    url: 'https://www.bsp.gov.ph'
  },
  {
    name: 'NBI Cybercrime Division',
    role: 'Handles large-scale and cross-border investment fraud investigations.',
    contact: '(02) 8523-8231 to 38',
    url: 'https://nbi.gov.ph'
  }],

  content: `
      <p>Investment scams have become one of the most financially devastating forms of fraud affecting Filipinos. The Bangko Sentral ng Pilipinas (BSP), together with the Securities and Exchange Commission (SEC), has repeatedly warned the public against schemes promising guaranteed high returns with little to no risk. These offers often surface through Facebook groups, Telegram channels, and even endorsements from celebrities or community leaders.</p>
      
      <p>The most common red flag is the promise of unusually high returns—such as "doubling your money in 15 days" or "5% daily profit guaranteed." Legitimate investments, whether in stocks, bonds, mutual funds, or government securities, never guarantee fixed returns. Markets fluctuate, and any entity claiming otherwise is operating outside legal financial frameworks.</p>
      
      <p>Pyramid and Ponzi schemes typically disguise themselves as "online paluwagan," cryptocurrency trading platforms, or forex investment groups. They pay early investors using the money of new recruits rather than from any actual business activity. Once the flow of new investors slows down, the entire scheme collapses, and most participants lose their entire principal. The 2022 Kapa Ministry case and several recent cryptocurrency platforms that vanished overnight illustrate how widespread this remains.</p>
      
      <p>Before investing, always verify that the entity is registered with the SEC and authorized to solicit investments from the public. A business permit alone is not enough—solicitation of investments requires a separate Secondary License. You can check the SEC's Advisory page and registered companies list directly on sec.gov.ph. For cryptocurrency exchanges, only those registered with the BSP as Virtual Asset Service Providers (VASPs) are authorized to operate.</p>
      
      <p>If you suspect an investment scheme is fraudulent, do not recruit family or friends to "test" it. Report the scheme to the SEC Enforcement and Investor Protection Department and to the National Bureau of Investigation (NBI) Cybercrime Division. Preserve screenshots, contracts, payment receipts, and chat conversations as evidence. The earlier authorities are alerted, the higher the chance of recovering funds and preventing others from falling victim.</p>
    `
},
{
  id: '8',
  title: 'SIM Registration Act: What It Means for Your Privacy and Safety',
  image:
  'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80',
  summary:
  'Understanding Republic Act No. 11934 and how it affects every mobile phone user in the Philippines.',
  readTime: '6 min read',
  source: 'NTC',
  sourceFullName: 'National Telecommunications Commission',
  sourceUrl: 'https://ntc.gov.ph/?s=sim+reg',
  date: 'Oct 28, 2023',
  category: 'Privacy',
  authorities: [
  {
    name: 'National Telecommunications Commission (NTC)',
    role: 'Lead implementer of the SIM Registration Act (RA 11934).',
    contact: 'consumer@ntc.gov.ph',
    url: 'https://ntc.gov.ph/?s=sim+reg'
  },
  {
    name: 'DICT',
    role: 'Co-implementer and publisher of official registration guidance.',
    contact: 'cybersecurity@dict.gov.ph',
    url: 'https://www.ncert.gov.ph/'
  },
  {
    name: 'National Privacy Commission (NPC)',
    role: 'Oversees data handling by telcos under RA 10173.',
    contact: 'complaints@privacy.gov.ph',
    url: 'https://privacy.gov.ph'
  }],

  content: `
      <p>Republic Act No. 11934, known as the SIM Registration Act, requires every Filipino mobile subscriber to register their SIM card with their telecommunications provider using a valid government-issued ID. The law was enacted to curb the rampant use of anonymous SIM cards in text scams, phishing campaigns, and other cyber-enabled crimes. The <a href="https://ntc.gov.ph/?s=sim+reg" target="_blank" rel="noopener noreferrer">National Telecommunications Commission (NTC)</a> oversees implementation alongside DICT and the major telcos — see NTC’s SIM registration updates and advisories on their site.</p>
      
      <p>Under the law, both new and existing SIM owners must complete registration through their telco's official platform—Globe's New SIM Registration portal, Smart's SIM Registration site, or DITO's registration page. Required information includes the subscriber's full legal name, birthdate, address, and a clear photo of a valid ID such as a Philippine passport, driver's license, UMID, or PhilSys National ID.</p>
      
      <p>While the law aims to improve public safety, it has also created new opportunities for scammers. Fake SIM registration links have been circulating widely via SMS, often using domains that closely mimic the official telco URLs. Always type the registration URL manually into your browser rather than clicking links from messages. The official URLs are simpleregistration.globe.com.ph, smart.com.ph/simreg, and dito.ph/sim-registration.</p>
      
      <p>Your personal data submitted during registration is protected under the Data Privacy Act of 2012, and telcos are legally required to maintain confidentiality. They cannot share your information with third parties without your consent, except when compelled by a court order or written request from law enforcement investigating a specific crime. The National Privacy Commission (NPC) actively monitors compliance.</p>
      
      <p>If you receive scam messages from registered SIMs, you can now report the offending number directly to your telco, which is legally required to investigate and deactivate fraudulent SIMs. Keep in mind, however, that scammers have adapted by using stolen IDs or compromised registrations, so vigilance against suspicious messages remains essential even after the law's implementation.</p>
    `
},
{
  id: '9',
  title: 'Public Wi-Fi Safety: Risks at Malls, Cafes, and Airports',
  image:
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
  summary:
  'Why connecting to free public Wi-Fi can expose your accounts—and how to use a VPN safely.',
  readTime: '5 min read',
  source: 'CERT-PH',
  sourceFullName: 'Computer Emergency Response Team - Philippines',
  sourceUrl: 'https://www.ncert.gov.ph/',
  date: 'Oct 22, 2023',
  category: 'Online Safety',
  authorities: [
  {
    name: 'CERT-PH',
    role: 'Tracks public network compromises and advises on safe connectivity.',
    contact: 'report@cert.gov.ph',
    url: 'https://www.ncert.gov.ph/'
  },
  {
    name: 'DICT Free Wi-Fi for All Program',
    role: 'Operates verified government Wi-Fi access points with security baselines.',
    contact: 'freewifi@dict.gov.ph',
    url: 'https://freewifi.gov.ph'
  }],

  content: `
      <p>Free public Wi-Fi networks at malls, coffee shops, airports, and government offices offer convenience, but they also represent one of the most common attack surfaces exploited by cybercriminals. CERT-PH regularly receives reports of credential theft, session hijacking, and malware infections traced back to compromised or malicious public networks.</p>
      
      <p>The most dangerous threat on public Wi-Fi is the "evil twin" attack. Here, an attacker sets up a wireless access point that mimics the name of a legitimate network—for example, "SM_FreeWiFi" instead of "SM Wi-Fi". When unsuspecting users connect, all their internet traffic flows through the attacker's device, allowing them to capture passwords, banking credentials, and private messages in real time.</p>
      
      <p>Even on legitimate public networks, traffic is often unencrypted, meaning anyone with basic technical skills and free software can intercept the data being transmitted. Logging into your email, banking app, or social media account on such a network can expose your credentials, especially if the website you're visiting doesn't use HTTPS encryption.</p>
      
      <p>To stay safe, avoid accessing sensitive accounts such as online banking, GCash, or email when connected to public Wi-Fi. If you must, use a reputable Virtual Private Network (VPN) that encrypts all your internet traffic before it leaves your device. Trusted VPN providers include ProtonVPN, Mullvad, and NordVPN. Avoid free VPN apps from unknown developers, as many of them log and sell user data.</p>
      
      <p>Additionally, disable automatic Wi-Fi connection on your phone and laptop. This prevents your device from silently connecting to spoofed networks. Always verify the exact network name with staff before connecting, and once you're done, "forget" the network from your device's settings to prevent automatic reconnection in the future.</p>
    `
},
{
  id: '10',
  title: 'Romance Scams: When Online Love Costs You Your Savings',
  image:
  'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800&q=80',
  summary:
  'Recognizing the patterns of romance fraud on dating apps and social media platforms.',
  readTime: '7 min read',
  source: 'PNP-ACG',
  sourceFullName: 'Philippine National Police - Anti-Cybercrime Group',
  sourceUrl: 'https://acg.pnp.gov.ph',
  date: 'Oct 18, 2023',
  category: 'Scam Awareness',
  authorities: [
  {
    name: 'PNP Anti-Cybercrime Group',
    role: 'Specialized investigators for romance scams and pig-butchering operations.',
    contact: '(02) 8414-1560',
    url: 'https://acg.pnp.gov.ph'
  },
  {
    name: 'NBI Cybercrime Division',
    role: 'Coordinates cross-border investigations with foreign law enforcement.',
    contact: '(02) 8523-8231 to 38',
    url: 'https://nbi.gov.ph'
  },
  {
    name: 'IACAT (Inter-Agency Council Against Trafficking)',
    role: 'For cases linked to human trafficking and scam compounds.',
    contact: 'Hotline 1343',
    url: 'https://iacat.gov.ph'
  }],

  content: `
      <p>Romance scams have grown into one of the most emotionally and financially destructive forms of online fraud in the Philippines. According to the PNP-ACG, victims lose an average of hundreds of thousands of pesos to scammers who carefully build fake romantic relationships over weeks or even months before requesting money. These operations are often run by organized syndicates, sometimes operating out of scam compounds in Southeast Asia.</p>
      
      <p>The typical romance scam begins on dating apps like Tinder, Bumble, or Christian Mingle, or through unexpected friend requests on Facebook and Instagram. The scammer presents themselves as an attractive, successful professional—often claiming to be a doctor, military officer, engineer working overseas, or businessperson. They quickly move the conversation off the platform to WhatsApp, Telegram, or Viber, where there is less moderation.</p>
      
      <p>Once trust is established, the scammer introduces a crisis or opportunity that requires financial help. Common stories include needing money for a medical emergency, customs fees to release a "gift package," temporary cash flow problems, or an "exclusive" investment opportunity. Some scammers groom victims into participating in fraudulent cryptocurrency platforms in what is now known as "pig butchering" scams.</p>
      
      <p>Warning signs include a refusal to meet in person or video call, professional-looking photos that appear stock-image quality, declarations of love within days of meeting, stories that frequently change small details, and any request for money, gift cards, or cryptocurrency—regardless of how reasonable it sounds. Reverse image searching their profile pictures often reveals that the photos belong to someone else entirely.</p>
      
      <p>If you suspect you are being targeted, stop all communication and do not send money. If you have already sent funds, contact your bank or e-wallet provider immediately to attempt to reverse the transaction. Report the case to the PNP-ACG with all chat logs, photos, and payment records preserved. Romance scams are not the victim's fault—they are sophisticated psychological manipulation operations, and seeking support is an act of strength.</p>
    `
},
{
  id: '11',
  title: 'Protecting Children Online: A Guide for Filipino Parents',
  image:
  'https://images.unsplash.com/photo-1602800458591-eddda28a498b?w=800&q=80',
  summary:
  'Practical steps to keep your kids safe from cyberbullying, grooming, and inappropriate content.',
  readTime: '9 min read',
  source: 'DICT',
  sourceFullName: 'Department of Information and Communications Technology',
  sourceUrl: 'https://www.ncert.gov.ph/',
  date: 'Oct 14, 2023',
  category: 'Online Safety',
  authorities: [
  {
    name: 'PNP Women and Children Protection Center (WCPC)',
    role: 'Primary unit for online sexual exploitation of children (OSEC) cases.',
    contact: '(02) 8723-0401 local 5260',
    url: 'https://wcpc.pnp.gov.ph'
  },
  {
    name: 'IACAT Hotline 1343',
    role: 'National hotline for child trafficking and OSEC reports.',
    contact: 'Dial 1343',
    url: 'https://iacat.gov.ph'
  },
  {
    name: 'NBI Anti-Human Trafficking Division',
    role: 'Investigates organized child exploitation networks.',
    contact: '(02) 8525-6028',
    url: 'https://nbi.gov.ph'
  },
  {
    name: 'DICT Cybersecurity Bureau',
    role: 'Issues parental controls and digital citizenship guidelines.',
    contact: 'cybersecurity@dict.gov.ph',
    url: 'https://www.ncert.gov.ph/'
  }],

  content: `
      <p>Filipino children are spending more time online than ever before, especially since the shift to blended learning. While the internet offers tremendous educational and social opportunities, it also exposes minors to serious risks including cyberbullying, online predators, exposure to age-inappropriate content, and the rapidly growing problem of online sexual exploitation of children (OSEC). The DICT, in coordination with the Department of Education and the IACAT, has issued multiple advisories on this issue.</p>
      
      <p>The first step in protecting children online is open communication. Establish a relationship where your child feels safe telling you about anything uncomfortable they encounter online—without fear of having their devices confiscated as punishment. Many children stay silent about grooming or cyberbullying precisely because they fear losing internet access entirely.</p>
      
      <p>Configure parental controls on devices and apps. iOS Screen Time and Android Family Link allow you to restrict app downloads, set screen time limits, and review activity reports. On YouTube, enable YouTube Kids for younger children. On TikTok, turn on Family Pairing mode. For gaming platforms like Roblox and Minecraft, review privacy settings and disable chat with strangers.</p>
      
      <p>Educate your children about the permanence of online content. Anything they share—including in private messages or Snapchat—can be screenshotted, recorded, and redistributed. Teach them to never share personal information such as their school, full address, or daily schedule with online strangers, and to never agree to private video calls with people they haven't met in real life.</p>
      
      <p>If you suspect your child is being groomed or sexually exploited online, do not delete any messages or block the offender immediately—this destroys evidence. Take screenshots, preserve chat logs, and report the incident to the PNP Women and Children Protection Center, the NBI Anti-Human Trafficking Division, or directly to the Inter-Agency Council Against Trafficking (IACAT) hotline 1343. The Philippines is one of the world's hotspots for OSEC, and reporting saves not just your child but potentially many others.</p>
    `
},
{
  id: '12',
  title: 'Data Privacy Rights Under the Data Privacy Act of 2012',
  image:
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
  summary:
  'Knowing your rights as a data subject and how to file a complaint with the National Privacy Commission.',
  readTime: '6 min read',
  source: 'NPC',
  sourceFullName: 'National Privacy Commission',
  sourceUrl: 'https://privacy.gov.ph',
  date: 'Oct 08, 2023',
  category: 'Privacy',
  authorities: [
  {
    name: 'National Privacy Commission (NPC)',
    role: 'Sole enforcer of the Data Privacy Act of 2012 (RA 10173).',
    contact: 'complaints@privacy.gov.ph',
    url: 'https://privacy.gov.ph'
  },
  {
    name: 'DICT',
    role: 'Implements technical safeguards for government data handling.',
    contact: 'cybersecurity@dict.gov.ph',
    url: 'https://www.ncert.gov.ph/'
  }],

  content: `
      <p>Republic Act No. 10173, the Data Privacy Act of 2012, gives every Filipino specific rights over how their personal information is collected, used, stored, and shared by companies, government agencies, and other organizations. The National Privacy Commission (NPC) is the independent body responsible for enforcing this law and protecting the privacy rights of data subjects.</p>
      
      <p>As a data subject, you have the right to be informed about how your data will be used before you provide it. This is why legitimate organizations show you a privacy notice or consent form. You have the right to object to the processing of your data, to access copies of your data that an organization holds, to rectify inaccurate information, and to request the erasure or blocking of your data under specific circumstances.</p>
      
      <p>You also have the right to data portability—meaning you can request your personal data in a commonly used electronic format and transfer it to another service provider. Importantly, you have the right to be indemnified for damages if your privacy rights are violated, and the right to file a complaint directly with the NPC if you believe your data has been mishandled.</p>
      
      <p>Common privacy violations include unauthorized sharing of customer databases, sending unsolicited marketing messages without consent, public posting of debtors' personal information by lending apps, and major data breaches where companies fail to adequately protect user data. The NPC has imposed substantial fines on entities found in violation, including ride-hailing apps, online lending platforms, and even government agencies.</p>
      
      <p>To file a complaint with the NPC, gather evidence of the violation including screenshots, messages, and any official communications. Submit your complaint through the NPC's online portal at privacy.gov.ph/complaints or visit their office in Pasay City. The NPC will investigate, mediate where appropriate, and impose penalties on violators. Knowing and exercising your rights under the Data Privacy Act is an essential part of being a digitally empowered Filipino citizen.</p>
    `
},
{
  id: '13',
  title: "Deepfake & AI Voice Scams: When Your Boss or Family Isn't Real",
  image:
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
  summary:
  'AI-generated voice clones and deepfake videos are being weaponized to authorize fake transfers and impersonate loved ones.',
  readTime: '7 min read',
  source: 'DICT',
  sourceFullName: 'Department of Information and Communications Technology',
  sourceUrl: 'https://www.ncert.gov.ph/',
  date: 'Apr 18, 2026',
  category: 'AI Threats',
  authorities: [
  {
    name: 'DICT Cybersecurity Bureau',
    role: 'Lead agency for AI-related cyber threat advisories under the National Cybersecurity Plan.',
    contact: 'cybersecurity@dict.gov.ph',
    url: 'https://www.ncert.gov.ph/'
  },
  {
    name: 'CERT-PH',
    role: 'Coordinates incident response for synthetic media and AI-enabled fraud.',
    contact: 'report@cert.gov.ph',
    url: 'https://www.ncert.gov.ph/'
  },
  {
    name: 'PNP Anti-Cybercrime Group',
    role: 'Investigates business email compromise and impersonation fraud, now extended to deepfakes.',
    contact: '(02) 8414-1560',
    url: 'https://acg.pnp.gov.ph'
  }],

  content: `
      <p>Generative AI has lowered the barrier for creating convincing voice clones and video deepfakes. The DICT Cybersecurity Bureau has documented a rising number of incidents in 2025–2026 where scammers used a few seconds of someone's voice—pulled from social media or voicemail—to clone their speech and trick relatives or coworkers into authorizing urgent money transfers.</p>
      
      <p>A common pattern: a finance officer receives a video call that appears to be from their CEO, instructing them to wire funds to a "new supplier" for an urgent acquisition. The face, voice, and mannerisms are convincing. In reality, the call is a real-time deepfake assembled from publicly available executive videos. Similar tactics have been used against families, with cloned voices crying for help to pressure relatives into sending ransom.</p>
      
      <p>The technical defenses are limited, so the strongest protections are procedural. Establish a verbal "safe word" with family members and a written verification protocol with your finance team. Any unusual money request—even from a known voice or face—must be confirmed through a second channel: a callback to the known number, a verification message in a separate app, or in-person confirmation.</p>
      
      <p>Watch for visual cues in suspicious calls: unnatural blinking patterns, mismatched lip sync, lighting that doesn't match the supposed environment, or audio that sounds slightly compressed or robotic during emotional moments. Ask an unexpected personal question that the AI is unlikely to answer correctly.</p>
      
      <p>If you suspect a deepfake attack, preserve all evidence including video recordings, call logs, and any transferred funds' transaction IDs. Report immediately to the PNP-ACG and CERT-PH. Under the proposed amendments to the Cybercrime Prevention Act and existing fraud statutes, impersonation through synthetic media is criminally punishable.</p>
    `
},
{
  id: '14',
  title: 'OFW Remittance Scams: Protecting Money Sent Home',
  image:
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
  summary:
  'Scammers target overseas Filipino workers and their families with fake remittance receipts, padala interception, and impostor relatives.',
  readTime: '6 min read',
  source: 'BSP',
  sourceFullName: 'Bangko Sentral ng Pilipinas',
  sourceUrl: 'https://www.bsp.gov.ph',
  date: 'Feb 22, 2026',
  category: 'Financial Fraud',
  authorities: [
  {
    name: 'Bangko Sentral ng Pilipinas (BSP)',
    role: 'Regulates remittance providers and money service businesses.',
    contact: 'consumeraffairs@bsp.gov.ph',
    url: 'https://www.bsp.gov.ph'
  },
  {
    name: 'Department of Migrant Workers (DMW)',
    role: 'Direct support for OFWs facing financial scams abroad and at home.',
    contact: 'Hotline 1348',
    url: 'https://dmw.gov.ph'
  },
  {
    name: 'OWWA (Overseas Workers Welfare Administration)',
    role: 'Welfare assistance and case officers for distressed OFW families.',
    contact: '(02) 8891-7601',
    url: 'https://owwa.gov.ph'
  },
  {
    name: 'PNP Anti-Cybercrime Group',
    role: 'Investigates fraudulent remittance interception and impersonation.',
    contact: '(02) 8414-1560',
    url: 'https://acg.pnp.gov.ph'
  }],

  content: `
      <p>Filipinos overseas send billions of dollars in remittances home every year, and scammers have built an entire ecosystem around intercepting those funds. The BSP and Department of Migrant Workers have flagged three recurring schemes: fake remittance "claim" notifications, impostor relative requests, and unregistered remittance agents.</p>
      
      <p>In the fake claim scheme, family members receive an SMS or Facebook message saying a relative abroad has sent a "padala" but that an unpaid fee or tax must be settled first before the money can be released. The link directs them to a fake remittance site or asks for a small "processing fee" via GCash. The remittance never existed.</p>
      
      <p>Impostor relative scams target the OFW directly. A scammer hacks or clones a family member's social media account and messages the OFW with a fake emergency—a hospitalization, accident, or arrest—demanding immediate transfer to an unfamiliar account. Because the OFW is far away and cannot easily verify, panic often wins.</p>
      
      <p>Unregistered remittance agents promise lower fees and faster delivery but operate outside BSP regulation. Once funds are transferred, agents may delay or disappear with the money. Always use BSP-registered remittance providers; the list is published on bsp.gov.ph under "Supervised Financial Institutions."</p>
      
      <p>To protect your family: agree on a verification code or callback rule before sending any urgent funds, never click claim links from SMS, and verify recipient names exactly as registered. If an OFW or their family has been defrauded, report immediately to BSP Consumer Affairs, DMW (Hotline 1348 for OFW concerns), and PNP-ACG. OWWA can also provide emergency welfare support to affected families.</p>
    `
},
{
  id: '15',
  title: 'QR Code & Quishing Scams at Restaurants, Markets, and Parking Lots',
  image:
  'https://images.unsplash.com/photo-1595079676714-d1cf6e1adff8?w=800&q=80',
  summary:
  "Fake QR codes stuck over real ones are redirecting payments to scammers — here's how to scan safely.",
  readTime: '4 min read',
  source: 'CERT-PH',
  sourceFullName: 'Computer Emergency Response Team - Philippines',
  sourceUrl: 'https://www.ncert.gov.ph/',
  date: 'Mar 11, 2026',
  category: 'Scam Awareness',
  authorities: [
  {
    name: 'CERT-PH',
    role: 'Issues alerts on emerging quishing and QR-based attacks.',
    contact: 'report@cert.gov.ph',
    url: 'https://www.ncert.gov.ph/'
  },
  {
    name: 'Bangko Sentral ng Pilipinas (BSP)',
    role: 'Operator of the QR Ph national standard and oversight on QR payment fraud.',
    contact: 'consumeraffairs@bsp.gov.ph',
    url: 'https://www.bsp.gov.ph'
  },
  {
    name: 'PNP Anti-Cybercrime Group',
    role: 'Handles criminal complaints for QR fraud cases.',
    contact: '(02) 8414-1560',
    url: 'https://acg.pnp.gov.ph'
  }],

  content: `
      <p>QR code phishing—nicknamed "quishing"—has spread rapidly across the Philippines as more establishments adopt cashless payments. Scammers print fake QR codes and stick them over legitimate ones at restaurants, sari-sari stores, parking meters, and even church donation boxes. Customers scan and pay, believing the funds reach the merchant when they actually go to the scammer.</p>
      
      <p>CERT-PH has also tracked a second variant: QR codes printed on posters, flyers, or stickers that claim to offer discounts, government assistance signups, or free Wi-Fi. Scanning the code opens a phishing page that mimics a bank, GCash, or government portal and harvests login credentials.</p>
      
      <p>Before scanning any QR code, inspect it physically. Look for a sticker placed over an underlying printed code, misaligned printing, or codes that look freshly added to a permanent surface. If the merchant has a QR Ph standard code, the receiving name should display on your app before confirming payment—always cross-check that name with the actual business.</p>
      
      <p>Avoid scanning QR codes from unsolicited sources: emails, leaflets in your mailbox, or random posters offering "government cash aid" or "SIM verification." When in doubt, type the URL of the service directly into your browser rather than relying on a QR code shortcut.</p>
      
      <p>If you have paid a fraudulent QR code, immediately call your e-wallet's fraud hotline (GCash 2882, Maya (02) 8845-7788) and request a transaction reversal. File a report with the merchant, PNP-ACG, and BSP Consumer Affairs. Preserve screenshots of the transaction and a photo of the fake QR code if possible.</p>
    `
},
{
  id: '16',
  title: 'Ransomware on Small Businesses: When Files Are Held Hostage',
  image:
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
  summary:
  "Small and medium enterprises in the Philippines are increasingly hit by ransomware. Here's how to prepare and respond.",
  readTime: '8 min read',
  source: 'CERT-PH',
  sourceFullName: 'Computer Emergency Response Team - Philippines',
  sourceUrl: 'https://www.ncert.gov.ph/',
  date: 'Jan 30, 2026',
  category: 'Workplace & Business',
  authorities: [
  {
    name: 'CERT-PH',
    role: 'National incident response team for ransomware containment and recovery support.',
    contact: 'report@cert.gov.ph',
    url: 'https://www.ncert.gov.ph/'
  },
  {
    name: 'DICT Cybersecurity Bureau',
    role: 'Issues sector-specific advisories and coordinates with private sector ISPs.',
    contact: 'cybersecurity@dict.gov.ph',
    url: 'https://www.ncert.gov.ph/'
  },
  {
    name: 'NBI Cybercrime Division',
    role: 'Investigates ransomware operators and extortion cases.',
    contact: '(02) 8523-8231 to 38',
    url: 'https://nbi.gov.ph'
  },
  {
    name: 'National Privacy Commission (NPC)',
    role: 'Mandatory reporting body when ransomware causes a personal data breach.',
    contact: 'breach@privacy.gov.ph',
    url: 'https://privacy.gov.ph'
  }],

  content: `
      <p>Ransomware is malicious software that encrypts a victim's files and demands payment—usually in cryptocurrency—for the decryption key. Filipino small and medium enterprises (SMEs) have become attractive targets because they often hold valuable customer data but lack dedicated cybersecurity teams. CERT-PH has documented attacks against accounting firms, clinics, schools, and BPOs throughout 2025–2026.</p>
      
      <p>Attackers typically gain initial access through phishing emails with malicious attachments, compromised remote desktop services, or exploitation of unpatched software. Once inside, they move laterally across the network, exfiltrate data for double-extortion leverage, and then deploy the ransomware payload that encrypts critical files including databases, financial records, and customer information.</p>
      
      <p>Prevention starts with the basics: keep all systems patched and updated, require strong passwords plus multi-factor authentication on every account (especially email and admin accounts), disable unused remote access services, and train staff to recognize phishing. Most ransomware breaches begin with a single employee clicking the wrong link.</p>
      
      <p>The single most important defense is offline, tested backups. Maintain at least one backup copy that is disconnected from your main network and verify regularly that it can actually be restored. Many businesses discover during an attack that their backups were corrupted or never functional. The 3-2-1 rule applies: three copies, two different media types, one offsite.</p>
      
      <p>If hit by ransomware, do not pay—payment funds further attacks and offers no guarantee of file recovery. Isolate affected systems immediately by unplugging them from the network. Preserve evidence and report to CERT-PH for response assistance. If customer personal data was accessed, you are legally required to notify the National Privacy Commission within 72 hours under RA 10173. File a criminal case with NBI Cybercrime Division to support prosecution efforts.</p>
    `
},
{
  id: '17',
  title: 'ATM Skimming and Card Cloning: What to Check Before You Insert',
  image:
  'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?w=800&q=80',
  summary:
  'Physical skimmers and hidden cameras at ATMs continue to capture card data across the Philippines. Spot them before you swipe.',
  readTime: '5 min read',
  source: 'BSP',
  sourceFullName: 'Bangko Sentral ng Pilipinas',
  sourceUrl: 'https://www.bsp.gov.ph',
  date: 'Dec 14, 2025',
  category: 'Financial Fraud',
  authorities: [
  {
    name: 'Bangko Sentral ng Pilipinas (BSP)',
    role: 'Regulates ATM operators and mandates anti-skimming measures.',
    contact: 'consumeraffairs@bsp.gov.ph',
    url: 'https://www.bsp.gov.ph'
  },
  {
    name: 'PNP Anti-Cybercrime Group',
    role: 'Investigates card cloning rings and ATM skimming syndicates.',
    contact: '(02) 8414-1560',
    url: 'https://acg.pnp.gov.ph'
  },
  {
    name: 'Credit Card Association of the Philippines (CCAP)',
    role: 'Industry body coordinating with banks on card fraud response.',
    contact: 'info@ccap.com.ph',
    url: 'https://ccap.com.ph'
  }],

  content: `
      <p>Despite the rise of digital payments, ATM skimming remains a persistent threat in the Philippines. Skimmers are small, often well-disguised devices placed over a real card slot to read your card's magnetic stripe. Paired with a tiny pinhole camera or a fake keypad overlay, criminals capture both your card number and PIN—everything needed to clone your card.</p>
      
      <p>Before inserting your card, give the ATM a quick physical inspection. Wiggle the card reader; a legitimate slot should be firmly attached to the machine. Look for loose plastic, color mismatches, glue residue, or anything that protrudes oddly. Check above and around the keypad for tiny holes that could hide a camera, and verify the keypad itself isn't a thin overlay sitting on top of the real one.</p>
      
      <p>Always cover the keypad with your free hand when entering your PIN. Even if a camera is hidden, covering blocks the PIN capture and makes any cloned card useless. Prefer ATMs located inside bank branches or well-monitored areas over standalone units in poorly-lit corners.</p>
      
      <p>Enable real-time transaction alerts through your bank's mobile app. The faster you notice an unauthorized withdrawal, the faster you can have your card blocked. Under BSP regulations and the Financial Consumer Protection Act (RA 11765), banks must investigate fraud reports promptly and refund unauthorized transactions when there is no consumer negligence.</p>
      
      <p>If you suspect skimming, do not use the ATM. Note the machine's location and ID number, then report to the operating bank and the BSP. If you discover unauthorized withdrawals, call your bank's 24/7 hotline immediately to block the card, then file police reports with both the local PNP station and PNP-ACG for the cybercrime case.</p>
    `
},
{
  id: '18',
  title: 'Cyberbullying and Online Harassment: Your Legal Options',
  image:
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
  summary:
  "From doxxing to coordinated harassment, Filipino law provides specific remedies. Here's what victims and parents can do.",
  readTime: '7 min read',
  source: 'PNP-ACG',
  sourceFullName: 'Philippine National Police - Anti-Cybercrime Group',
  sourceUrl: 'https://acg.pnp.gov.ph',
  date: 'Nov 25, 2025',
  category: 'Online Safety',
  authorities: [
  {
    name: 'PNP Anti-Cybercrime Group',
    role: 'Files cases under the Cybercrime Prevention Act (RA 10175) for online libel, threats, and harassment.',
    contact: '(02) 8414-1560',
    url: 'https://acg.pnp.gov.ph'
  },
  {
    name: 'PNP Women and Children Protection Center',
    role: 'Specialized unit for gender-based online violence and harassment of minors.',
    contact: '(02) 8723-0401 local 5260',
    url: 'https://wcpc.pnp.gov.ph'
  },
  {
    name: 'Commission on Human Rights (CHR)',
    role: 'Receives complaints on online attacks targeting protected groups.',
    contact: '(02) 8294-8704',
    url: 'https://chr.gov.ph'
  },
  {
    name: 'National Privacy Commission (NPC)',
    role: 'Handles doxxing and unauthorized disclosure of personal information.',
    contact: 'complaints@privacy.gov.ph',
    url: 'https://privacy.gov.ph'
  }],

  content: `
      <p>Cyberbullying takes many forms in the Philippines—from anonymous hate messages and coordinated mob attacks on social media, to doxxing (publicly revealing private information), revenge content, and persistent stalking through multiple accounts. The PNP-ACG receives thousands of harassment reports each year, many involving minors and women.</p>
      
      <p>Several Philippine laws apply depending on the type of harassment. The Cybercrime Prevention Act of 2012 (RA 10175) covers online libel, identity theft, and cyber threats. The Safe Spaces Act (RA 11313) penalizes gender-based online sexual harassment including unwanted sexual remarks, threats, and image-based abuse. The Anti-Photo and Video Voyeurism Act (RA 9995) addresses non-consensual intimate imagery. For minors, RA 10627 (the Anti-Bullying Act) requires schools to act on cyberbullying involving students.</p>
      
      <p>Before reporting, preserve all evidence. Take screenshots that include the username, timestamp, and full URL of each harassing post or message. Save copies of profiles even if they may be deleted later. Use the platform's archive or download tools where available. Do not respond to or engage with the harasser—this can sometimes complicate the legal case.</p>
      
      <p>For non-criminal but harmful behavior, report directly to the platform: Facebook, X (Twitter), Instagram, TikTok, and YouTube all have reporting systems for harassment, doxxing, and impersonation. Platforms are increasingly responsive in the Philippines following coordination with DICT and the NPC.</p>
      
      <p>For criminal cases, file with the PNP-ACG either in person at Camp Crame or through their online complaint form. For cases involving women or children, the PNP Women and Children Protection Center provides specialized handling. If your personal data (home address, ID numbers, family details) has been published without consent, file a separate complaint with the National Privacy Commission for a doxxing violation. Schools must also act on bullying complaints involving students; if your school refuses, escalate to the DepEd regional office.</p>
    `
}];

export const articles = enhanceArticles(rawArticles);