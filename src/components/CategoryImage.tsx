import React, { useEffect, useMemo, useState } from 'react';
import { getCategoryImageUri } from '../data/categoryMedia';
import { resolveImageUri } from '../data/topicMedia';

type Props = {
  category: string;
  alt: string;
  className?: string;
  /** Legacy external URL; topic art is preferred when topicId is set. */
  externalSrc?: string;
  topicId?: string;
  topicKind?: 'article' | 'alert';
};

export function CategoryImage({
  category,
  alt,
  className = '',
  externalSrc,
  topicId,
  topicKind
}: Props) {
  const primary = useMemo(
    () => resolveImageUri(category, externalSrc, topicId, topicKind),
    [category, externalSrc, topicId, topicKind]
  );
  const fallback = useMemo(() => getCategoryImageUri(category), [category]);
  const [src, setSrc] = useState(primary);

  useEffect(() => {
    setSrc(primary);
  }, [primary]);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => {
        if (src !== fallback) setSrc(fallback);
      }}
    />
  );
}
