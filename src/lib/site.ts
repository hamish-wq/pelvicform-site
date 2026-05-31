export const SITE = {
  name: 'PelvicForm',
  domain: 'https://pelvicform.lazymagnet.com',
  rtfUrl: 'https://rtf-demo.lazymagnet.com',
  bookUrl: 'https://link.lazymagnet.com/widget/bookings/lead-pelvic-floor-physio',
  phone: '09 886 4611',
  logo: 'https://assets.cdn.filesafe.space/AiNs33SgZZAvOuPlmM6x/media/69c04eb5490cbc7f2f7beb99.png',
};

export const NAV = [
  { label: "Women's Health", href: '/womens-pelvic-health' },
  { label: "Men's Health", href: '/mens-pelvic-health' },
  { label: 'PelviPower', href: '/pelvipower-therapy' },
  { label: 'Clinical Pilates', href: '/clinical-pilates' },
  { label: 'About', href: '/about' },
];

export function isActive(current, href) {
  const c = (current || '/').replace(/\/$/, '') || '/';
  const h = (href || '/').replace(/\/$/, '') || '/';
  return h === '/' ? c === '/' : c === h || c.startsWith(h + '/');
}
