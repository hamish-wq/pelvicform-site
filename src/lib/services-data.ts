// PelvicForm services — REAL, from pelvicform.co.nz. For men and women.
// Depth matters: web copy informs, reassures and ranks. Not slide-sparse.

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
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  eyebrow: string;
  h1: string;
  intro: string;
  heroImage: string;
  body: { heading: string; text: string }[];
  conditionsHeading: string;
  conditions: { name: string; desc: string }[];
  pricing?: { heading: string; intro: string; rows: { item: string; price: string }[]; note?: string };
}

export const PF_SERVICES: Record<string, PFService> = {
  'womens-pelvic-health': {
    slug: 'womens-pelvic-health',
    label: "Women's Pelvic Health",
    primaryKeyword: "women's pelvic health",
    metaTitle: "Women's Pelvic Health Physio Auckland | PelvicForm",
    metaDescription: "Expert women's pelvic floor physiotherapy in Ponsonby. Discreet care for incontinence, prolapse, endometriosis, pregnancy and postpartum recovery.",
    keywords: 'womens pelvic health auckland, pelvic floor physio women, incontinence physio, prolapse treatment, endometriosis physio, postpartum recovery ponsonby, ACC birth injury',
    eyebrow: "Women's Pelvic Health",
    h1: 'Get your body working with you, not against you',
    intro: 'So many women are told that leaking, prolapse or pelvic pain is just part of being a woman, or just part of having had children. It is not. These things are common, but they are also treatable, very often without surgery. We help you understand what is actually going on, and do something about it, with expert care and complete discretion.',
    heroImage: IMAGES.consult2,
    body: [
      { heading: 'You do not have to plan your life around it', text: "You might be mapping out the toilets before you leave the house, skipping the trampoline with the kids, avoiding the gym because of leaks, or quietly dealing with pain that affects your intimate life. None of that is something you simply have to accept. With the right assessment and a clear plan, most women see a real, lasting change." },
      { heading: 'A proper assessment, not a quick guess', text: "Your first visit is a comprehensive one-hour assessment. We check your overall posture and alignment to rule out pain that is referred from elsewhere, and we use real-time ultrasound (and an internal examination, only ever with your consent) to see exactly how your pelvic floor is working, check for scar tissue, and find the areas driving your symptoms. You leave with a clear plan and a take-home guide." },
      { heading: 'Pregnancy, birth and beyond', text: "We support you through pregnancy and rebuild your core and pelvic floor afterwards, at a pace that respects what your body has been through. If you have a birth injury, you may be covered by ACC, and we lodge the maternal birth injury claim for you so it is one less thing to organise." },
    ],
    conditionsHeading: 'What we help with',
    conditions: [
      { name: 'Bladder and bowel leaking', desc: 'Leaking when you cough, sneeze, laugh, lift or run, or a sudden urge you cannot get to the toilet in time for. Common, and very responsive to the right pelvic floor training.' },
      { name: 'Prolapse', desc: 'A feeling of heaviness, dragging, or a bulge. We assess the type and degree, and build a programme to manage it and support you, whether or not surgery is on the table.' },
      { name: 'Endometriosis and pelvic pain', desc: 'Physiotherapy is an evidence-based part of managing the pelvic pain and muscle tension that come with endometriosis and related conditions.' },
      { name: 'Pain during sex', desc: 'Including vaginismus and vulvodynia. Treated gently, patiently, and entirely on your terms.' },
      { name: 'Pregnancy and postpartum', desc: 'Pelvic girdle pain in pregnancy, and a structured rebuild of your deep core and pelvic floor after birth, often called a postnatal check.' },
      { name: 'Menopause', desc: 'The pelvic and bladder changes that arrive with menopause respond well to targeted physiotherapy and the right strengthening.' },
    ],
  },
  'mens-pelvic-health': {
    slug: 'mens-pelvic-health',
    label: "Men's Pelvic Health",
    primaryKeyword: "men's pelvic health",
    metaTitle: "Men's Pelvic Health Physio Auckland | PelvicForm",
    metaDescription: "Men's pelvic floor physiotherapy in Ponsonby. Structured pre- and post-prostate-surgery care for bladder control, pelvic pain and erectile function.",
    keywords: 'mens pelvic health auckland, prostate surgery recovery physio, male incontinence, post prostatectomy rehab, mens pelvic floor, erectile function physio ponsonby',
    eyebrow: "Men's Pelvic Health",
    h1: 'Practical, structured recovery, before and after prostate treatment',
    intro: 'Pelvic health is not only a women\'s issue, and a lot of men quietly put up with leaking, pain or changes after prostate treatment because no one ever told them help exists. It does. Our focus is practical and structured: getting your bladder control, comfort and function back, and giving you a clear plan to follow.',
    heroImage: IMAGES.consult1,
    body: [
      { heading: 'Before and after prostate surgery', text: "The work you do before prostate surgery makes a real difference to how quickly you recover continence and function afterwards. We assess and train your pelvic floor in the lead-up, then guide a structured rehabilitation once you are through the operation, so you are not left to work it out alone." },
      { heading: 'What the first visit looks like', text: "A comprehensive one-hour assessment. We look at your overall alignment, and use real-time ultrasound to show you exactly which muscles you are activating, and which you are not. It is practical and matter-of-fact, and you leave knowing precisely what to work on and why." },
      { heading: 'Treated like a normal part of health', text: "There is nothing unusual about needing help here, and there is nothing awkward about asking for it. We treat men\'s pelvic health directly, discreetly, and without fuss." },
    ],
    conditionsHeading: 'What we help with',
    conditions: [
      { name: 'Prostate surgery recovery', desc: 'Structured pre-operative preparation and post-operative rehabilitation to recover bladder control and function as quickly as possible.' },
      { name: 'Bladder control and leaking', desc: 'Strengthening and retraining to resolve leaking, urgency and the need to map out every toilet.' },
      { name: 'Erectile function', desc: 'Where there is a pelvic floor contribution, targeted physiotherapy can be a genuine and underused part of the answer.' },
      { name: 'Pelvic pain', desc: 'Chronic pelvic pain and discomfort, including pain that has been put down to prostatitis, assessed and treated directly.' },
    ],
  },
  'pelvipower-therapy': {
    slug: 'pelvipower-therapy',
    label: 'PelviPower Therapy',
    primaryKeyword: 'pelvipower',
    metaTitle: 'PelviPower Chair Therapy Auckland | PelvicForm',
    metaDescription: 'PelviPower magnetic-stimulation therapy in Ponsonby. Build pelvic floor strength while you sit fully clothed. Non-invasive, no surgery. Initial assessment $399.',
    keywords: 'pelvipower auckland, magnetic stimulation pelvic floor, non invasive incontinence treatment, pelvic floor chair, EMS pelvic floor ponsonby',
    eyebrow: 'PelviPower Therapy',
    h1: 'Rebuild pelvic floor strength, sitting fully clothed',
    intro: 'The PelviPower Chair uses focused magnetic stimulation to do something most people find hard to do well on their own: contract the right pelvic floor muscles, strongly and repeatedly, to build coordination and strength. You sit on it fully clothed. There are no needles, no surgery, and nothing to undress for. It is one of the fastest, most comfortable ways to give a weak or uncoordinated pelvic floor a real head start.',
    heroImage: IMAGES.pelvipower,
    body: [
      { heading: 'How it works', text: "The chair generates a magnetic field that stimulates the pelvic floor muscles to contract, the same muscles you would target in an exercise programme, but with thousands of strong, even contractions in a single session. For people who struggle to find or activate these muscles on their own, that is a powerful way to build the coordination everything else is built on." },
      { heading: 'Who it suits', text: "PelviPower works well for stress and urge incontinence, for rebuilding after childbirth, for men recovering from prostate surgery, and for anyone whose pelvic floor is weak or hard to activate. It is not a replacement for a tailored plan, it accelerates one. Your physiotherapist will tell you honestly whether it is right for you." },
      { heading: 'What to expect', text: "You stay fully clothed and simply sit on the chair while it does the work. Sessions are short and comfortable. We start with an assessment and a five-minute trial so you can feel exactly how it works before committing to anything." },
    ],
    conditionsHeading: 'Why patients choose PelviPower',
    conditions: [
      { name: 'Fully clothed, completely private', desc: 'You sit on the chair dressed as you arrived. No internal work, nothing to undress for, no discomfort.' },
      { name: 'Non-invasive', desc: 'No needles, no surgery, no medication. Just focused magnetic stimulation doing the work your muscles find hard.' },
      { name: 'Fast to build coordination', desc: 'Thousands of strong, even contractions per session, far more than you could do unaided, to build the foundation quickly.' },
      { name: 'Guided by a physio', desc: 'Used as part of a tailored plan, not in isolation, so it actually translates into lasting change.' },
    ],
    pricing: {
      heading: 'PelviPower pricing',
      intro: 'Transparent pricing, and a structured path forward. We start with an assessment and a short trial so you can feel how it works before you commit to a course.',
      rows: [
        { item: 'Initial PelviPower assessment (30 min assessment + 30 min chair trial)', price: '$399' },
        { item: 'Single PelviPower session', price: '$350' },
        { item: 'Treatment course (12 sessions)', price: '$1,800' },
      ],
      note: 'Your physiotherapist will recommend the right path for you at your assessment. There is no obligation to book a course.',
    },
  },
  'clinical-pilates': {
    slug: 'clinical-pilates',
    label: 'Clinical Pilates',
    primaryKeyword: 'clinical pilates',
    metaTitle: 'Clinical Pilates Auckland | Pelvic Floor & Core | PelvicForm',
    metaDescription: 'Clinical Pilates in our onsite Ponsonby studio. Rebuild your core and pelvic floor safely as part of your pelvic-health recovery. Book a session.',
    keywords: 'clinical pilates auckland, pelvic floor pilates, rehab pilates ponsonby, core rebuild physio pilates',
    eyebrow: 'Clinical Pilates',
    h1: 'Rebuild your core, safely, in our onsite studio',
    intro: 'Getting strong again after a pelvic floor problem is not about doing more, it is about doing the right things in the right order. Clinical Pilates, in our onsite studio, rebuilds your deep core and the muscles that support your pelvic floor, carefully and progressively, so you build real strength without overloading the very system you are trying to recover.',
    heroImage: IMAGES.pilates,
    body: [
      { heading: 'Why Pilates, and why clinical', text: "A busy gym class can do more harm than good when your pelvic floor is the weak link, heavy lifting and high-impact work can drive the very symptoms you are trying to fix. Clinical Pilates is the opposite: controlled, breath-led movement that trains your deep core and pelvic floor to work together, exactly the foundation pelvic-health recovery is built on." },
      { heading: 'Joined up with your treatment', text: "Because it runs alongside your pelvic-health care here, your Pilates is shaped by your assessment, not by a generic class plan. As your strength and control improve, the programme progresses with you." },
    ],
    conditionsHeading: 'What you get',
    conditions: [
      { name: 'Part of your recovery plan', desc: 'Shaped by your clinical assessment, so the programme is right for your body and your stage, not a one-size class.' },
      { name: 'Deep core and pelvic floor', desc: 'Rebuild the deep stabilising muscles that support your pelvic floor, the foundation of lasting recovery.' },
      { name: 'Controlled and safe', desc: 'Breath-led, low-impact movement that builds strength without overloading a recovering pelvic floor.' },
      { name: 'Onsite studio', desc: 'In our Ponsonby clinic, so your Pilates and your physiotherapy stay joined up.' },
    ],
  },
};
