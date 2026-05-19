import { classifyIntent } from './classifier';

export function looksLikeContentToVerify(text: string): boolean {
  const trimmed = text.trim();
  const hasUrl =
    /(https?:\/\/|www\.[a-z0-9-]|\b[a-z0-9-]{3,}\.(com|net|org|ph|xyz|info|co|me|io|tk|ly|app|site|click|link|live|shop))\b/i.test(
      trimmed
    );
  if (hasUrl) return true;

  if (
    trimmed.length < 120 &&
    /^(check|verify|safe|legit|scam|link|url)\b/i.test(trimmed) &&
    /(http|www\.|\.com|\.ph)/i.test(trimmed)
  ) {
    return true;
  }

  const scamKw =
    /(otp|mpin|verify|verification|account.{0,20}(lock|suspend|restrict|deactivate)|won\b.{0,20}(prize|cash|raffle|jackpot)|click.{0,15}link|congratulations|claim.{0,25}(prize|reward|cash|gift)|share.{0,10}otp|magbigay.{0,15}otp|nanalo\s*ka|premyo|limited\s*time|act\s*now)/i;
  if (text.length > 100 && scamKw.test(text)) return true;

  if (
    /(this\s+(message|text|email|sms)\s+(says|sent|claims)|here'?s?\s+the\s+(message|text|email|link)|yung\s+(text|message|email|link)|pakitingnan|check\s+(this|mo|natin|nga))/i.test(
      text
    ) &&
    text.length > 60
  ) {
    return true;
  }
  return false;
}

export function shouldRunVerification(text: string): boolean {
  if (!looksLikeContentToVerify(text)) return false;
  const intent = classifyIntent(text);
  if (intent === 'greeting' || intent === 'thanks') return false;
  if (intent === 'emergency' && text.length < 120) return false;
  return true;
}

export function looksLikePasswordCheck(text: string): {
  triggered: boolean;
  password?: string;
} {
  const explicit = text.match(
    /(?:is|how strong is|check|test|rate|evaluate|gaano kalakas|tingnan|suriin)\s+(?:my |yung |ang |this )?(?:password|pass)\s*[:\-=]?\s*["'`]?([^\s"'`]{4,64})["'`]?/i
  );
  if (explicit?.[1]) return { triggered: true, password: explicit[1] };

  const labeled = text.match(
    /\bpassword\s*[:=]\s*["'`]?([^\s"'`]{4,64})["'`]?/i
  );
  if (labeled?.[1]) return { triggered: true, password: labeled[1] };

  return { triggered: false };
}
