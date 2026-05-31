// PelvicForm services — REAL, scraped from pelvicform.co.nz. For men and women.
// Real images from the RTF/PF CDN (leadconnectorhq webp wrapper).

const IMG = (id: string) => `https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/AiNs33SgZZAvOuPlmM6x/media/${id}`;

export const IMAGES = {
  consult1: IMG('63468d46a6d172da874e8e67.jpeg'),
  consult2: IMG('63247c7a83a67be037ce6109.jpeg'),
  ultrasound: IMG('631ed3e37ab087ce94304c92.png'),
  pilates: IMG('631ed3e37ab0875d1b304c96.png'),
  pelvipower: IMG('633d2b8edb047a39ff59a773.png'),
  acupuncture: IMG('63203230d9ec912a49310b1e.png'),
  mens: IMG('631ed3e37ab0870c00304c90.png'),
  womens: IMG('631ed3e39429894c033d3a7d.png'),
};

export interface PFService {
  slug: string;
  label: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  eyebrow: string;
  h1: string;
  intro: string;
  heroImage: string;
  conditions: { name: string; desc: string }[];
}

export const PF_SERVICES: Record<string, PFService> = {
  'womens-pelvic-health': {
    slug: 'womens-pelvic-health',
    label: "Women's Pelvic Health",
    metaTitle: "Women's Pelvic Health Physio Auckland | PelvicForm Ponsonby",
    metaDescription: "Expert women's pelvic floor physiotherapy in Ponsonby, Auckland. Discreet care for incontinence, prolapse, endometriosis, pregnancy and postpartum recovery. We lodge ACC maternal birth injury claims. Book your assessment.",
    keywords: 'womens pelvic health auckland, pelvic floor physio women, incontinence physio, prolapse treatment, endometriosis physio, postpartum recovery ponsonby, ACC birth injury',
    eyebrow: "Women's Pelvic Health",
    h1: 'Get your body working with you, not against you',
    intro: 'Expert physio for incontinence, prolapse, endometriosis, and safe guidance through pregnancy and postpartum recovery. Whether you are managing changes after birth or going through menopause, you do not have to just put up with it. We also lodge ACC maternal birth injury claims for you.',
    heroImage: IMAGES.consult2,
    conditions: [
      { name: 'Incontinence', desc: 'Leaking on a cough, sneeze, laugh or run. Common, and very treatable.' },
      { name: 'Prolapse', desc: 'A feeling of heaviness or a bulge. We assess it and build a plan, surgery or not.' },
      { name: 'Endometriosis & pelvic pain', desc: 'Physiotherapy as part of managing the pelvic pain of endometriosis and related conditions.' },
      { name: 'Pregnancy & postpartum', desc: 'Safe guidance through pregnancy and a structured rebuild of your core and pelvic floor after birth.' },
      { name: 'ACC birth injuries', desc: 'Tears and other maternal birth injuries are ACC-covered. We lodge the claim for you.' },
      { name: 'Menopause', desc: 'Support for the pelvic-health changes that come with menopause.' },
    ],
  },
  'mens-pelvic-health': {
    slug: 'mens-pelvic-health',
    label: "Men's Pelvic Health",
    metaTitle: "Men's Pelvic Health Physio Auckland | Prostate Recovery | PelvicForm",
    metaDescription: "Men's pelvic floor physiotherapy in Ponsonby, Auckland. Structured pre- and post-prostate-surgery treatment for bladder control, pelvic pain and erectile function. Discreet, expert care. Book your assessment.",
    keywords: 'mens pelvic health auckland, prostate surgery recovery physio, male incontinence, post prostatectomy rehab, mens pelvic floor, erectile function physio ponsonby',
    eyebrow: "Men's Pelvic Health",
    h1: 'Practical, structured recovery, before and after prostate treatment',
    intro: 'Pre- and post-operation treatment focused on strengthening bladder control, resolving pelvic pain, and improving erectile function before and after prostate treatment. A lot of men suffer in silence because no one told them help exists. It does.',
    heroImage: IMAGES.consult1,
    conditions: [
      { name: 'Prostate surgery recovery', desc: 'Structured pre- and post-op rehab to recover bladder control and function faster.' },
      { name: 'Bladder control', desc: 'Strengthening and retraining to resolve leaking and urgency.' },
      { name: 'Erectile function', desc: 'Where there is a pelvic-floor cause, targeted physio can be part of the answer.' },
      { name: 'Pelvic pain', desc: 'Chronic pelvic pain and discomfort, assessed and treated directly.' },
    ],
  },
  'pelvipower-therapy': {
    slug: 'pelvipower-therapy',
    label: 'PelviPower Therapy',
    metaTitle: 'PelviPower Chair Therapy Auckland | Non-Invasive Pelvic Floor | PelvicForm',
    metaDescription: 'PelviPower magnetic-stimulation therapy in Ponsonby, Auckland. Build pelvic floor muscle coordination while you sit fully clothed. Non-invasive, no surgery. Initial assessment $399. Book a trial.',
    keywords: 'pelvipower auckland, magnetic stimulation pelvic floor, non invasive incontinence treatment, pelvic floor chair, EMS pelvic floor ponsonby',
    eyebrow: 'PelviPower Therapy',
    h1: 'Rebuild pelvic floor strength, sitting fully clothed',
    intro: 'The PelviPower Chair uses non-invasive magnetic stimulation to rapidly build muscle coordination while you sit, fully clothed. No surgery, no needles, no undressing. It is a fast, comfortable way to strengthen the pelvic floor, and you can trial it in five minutes at your first assessment.',
    heroImage: IMAGES.pelvipower,
    conditions: [
      { name: 'How it works', desc: 'Magnetic pulses stimulate the pelvic floor muscles to contract, training coordination and strength.' },
      { name: 'Fully clothed', desc: 'You sit on the chair fully clothed. Comfortable, private, and no internal work required.' },
      { name: 'Initial assessment', desc: '30-minute assessment plus a 30-minute chair trial, so you feel how it works. $399.' },
      { name: 'Treatment course', desc: 'Single session $350, or a 12-session course for $1,800. Your physio will guide the right path.' },
    ],
  },
  'clinical-pilates': {
    slug: 'clinical-pilates',
    label: 'Clinical Pilates',
    metaTitle: 'Clinical Pilates Auckland | Pelvic Floor & Core | PelvicForm Ponsonby',
    metaDescription: 'Clinical Pilates in our onsite Ponsonby studio. Rebuild your core and pelvic floor safely as part of your pelvic-health recovery. Book a session.',
    keywords: 'clinical pilates auckland, pelvic floor pilates, rehab pilates ponsonby, core rebuild physio pilates',
    eyebrow: 'Clinical Pilates',
    h1: 'Rebuild your core, safely, in our onsite studio',
    intro: 'Clinical Pilates in our onsite studio. It is a core part of pelvic-health recovery, rebuilding strength and control around your pelvic floor without overloading it. Tailored to where your body is, not a one-size class.',
    heroImage: IMAGES.pilates,
    conditions: [
      { name: 'Part of your recovery plan', desc: 'Joined up with your clinical assessment, so the programme is right for your body and stage.' },
      { name: 'Core & pelvic floor', desc: 'Rebuild deep core and pelvic-floor strength safely, the foundation of lasting recovery.' },
      { name: 'Onsite studio', desc: 'In our Ponsonby clinic, so your Pilates and your physio join up.' },
      { name: 'Tailored', desc: 'A programme built around your assessment, not a generic class.' },
    ],
  },
};
