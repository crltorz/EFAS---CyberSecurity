import React from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { AthenaAvatar } from './AthenaAvatar';

type Props = {
  text: string;
  citations?: { title: string; url: string }[];
};

export function AthenaMessageBubble({ text, citations }: Props) {
  const hasCitations = citations && citations.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-2.5 sm:gap-4 max-w-[95%] sm:max-w-[90%]">
      <AthenaAvatar size={32} className="mt-1 sm:!w-[36px] sm:!h-[36px]" />
      <motion.div className="bg-white/[0.04] border border-white/10 rounded-2xl rounded-tl-sm p-3.5 sm:p-5 w-full min-w-0">
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap break-words">
          {text}
        </p>
        {hasCitations && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">
              Sources cited
            </p>
            <ul className="space-y-1.5">
              {citations.map((c) => (
                <li key={c.url}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] sm:text-xs text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-1">
                    <ExternalLink className="w-3 h-3 shrink-0" />
                    {c.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
