export const SITE = {
  name: 'PelvicForm',
  domain: 'https://pelvicform.lazymagnet.com',
  rtfUrl: 'https://rtf-demo.lazymagnet.com',
  bookUrl: 'https://return-to-form-physio.cliniko.com/bookings',
  phone: '09 886 4611',
};

export const NAV = [
  { label: "Women's Health", href: '/womens-pelvic-health' },
  { label: "Men's Health", href: '/mens-pelvic-health' },
  { label: 'Pregnancy & Postnatal', href: '/pregnancy-postnatal' },
  { label: 'Pelvic Pain', href: '/pelvic-pain' },
  { label: 'About', href: '/about' },
];

export function isActive(current, href) {
  const c = (current || '/').replace(/\/$/, '') || '/';
  const h = (href || '/').replace(/\/$/, '') || '/';
  return h === '/' ? c === '/' : c === h || c.startsWith(h + '/');
}
