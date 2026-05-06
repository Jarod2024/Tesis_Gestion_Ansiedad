'use client';

export function scrollToIdWithOffset(id: string, offset = 96) {
  if (typeof window === 'undefined') return false;
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
  return true;
}

export function navigateAndScroll(router: any, pathWithHash: string, id: string, offset = 96) {
  // Navigate then attempt to scroll after a short delay to allow the new page to render
  router.push(pathWithHash);
  setTimeout(() => scrollToIdWithOffset(id, offset), 120);
}

export function scrollToTop(path?: string) {
  if (typeof window === 'undefined') return;
  if (path) {
    // If navigating to a different page, use router - but we need router as param
    // For now, just scroll to top after navigation completes
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  } else {
    // Scroll to top immediately
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
