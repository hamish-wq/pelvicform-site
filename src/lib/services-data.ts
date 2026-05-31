// PelvicForm services. Inclusive by design: women, men and children.
// Pulled from the RTF pelvic-floor content, expanded into a dedicated sub-brand.

const IMG_INCLUSIVE = 'https://assets.cdn.filesafe.space/AiNs33SgZZAvOuPlmM6x/media/63247c7a83a67be037ce6109.jpeg';
const IMG_CARE = 'https://assets.cdn.filesafe.space/AiNs33SgZZAvOuPlmM6x/media/63468d46a6d172da874e8e67.jpeg';

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
    metaTitle: "Women's Pelvic Health Physio in Ponsonby Auckland | PelvicForm",
    metaDescription: "Women's pelvic health physiotherapy in Ponsonby. Help with incontinence, prolapse, pelvic pain, and post-surgery recovery. Confidential, expert, no referral needed. Call 09 886 4611.",
    keywords: 'womens pelvic health auckland, pelvic floor physio women, incontinence treatment, prolapse physio, pelvic pain women ponsonby',
    eyebrow: "Women's Pelvic Health",
    h1: 'You do not have to just live with it',
    intro: 'So many women are told that leaking, prolapse or pelvic pain is just part of being a woman, or part of having had children. It is not. These things are common, but they are also treatable. We help you understand what is going on and do something about it, with care and without judgement.',
    heroImage: IMG_INCLUSIVE,
    conditions: [
      { name: 'Bladder leaking', desc: 'Leaking on a cough, sneeze, laugh or run. Common, and very treatable.' },
      { name: 'Prolapse', desc: 'A feeling of heaviness or a bulge. We assess it and build a plan, surgery or not.' },
      { name: 'Pelvic pain', desc: 'Including endometriosis-related pain, painful sex, and bladder pain.' },
      { name: 'Postnatal recovery', desc: 'Rebuilding your core and pelvic floor after birth, at your pace.' },
    ],
  },
  'mens-pelvic-health': {
    slug: 'mens-pelvic-health',
    label: "Men's Pelvic Health",
    metaTitle: "Men's Pelvic Health Physio in Ponsonby Auckland | PelvicForm",
    metaDescription: "Men's pelvic health physiotherapy in Ponsonby. Prostate rehab, post-surgery recovery, urinary issues and pelvic pain. Discreet, expert care. No referral needed. Call 09 886 4611.",
    keywords: 'mens pelvic health auckland, prostate rehab physio, male incontinence, post prostatectomy rehab, mens pelvic floor ponsonby',
    eyebrow: "Men's Pelvic Health",
    h1: "Men have a pelvic floor too. And it can be treated.",
    intro: "Pelvic health is not just a women's issue, and a lot of men suffer in silence because no one told them help exists. Whether it is recovery after prostate surgery, leaking, or pelvic pain, our physios treat it directly and discreetly.",
    heroImage: IMG_CARE,
    conditions: [
      { name: 'Prostate surgery recovery', desc: 'Rehab before and after prostate surgery to recover continence and function faster.' },
      { name: 'Urinary issues', desc: 'Leaking, urgency and difficulty, addressed properly rather than worked around.' },
      { name: 'Erectile dysfunction (pelvic cause)', desc: 'Where there is a pelvic floor cause, physio can be part of the answer.' },
      { name: 'Male pelvic pain', desc: 'Chronic pelvic pain and discomfort, including prostatitis-related pain.' },
    ],
  },
  'pregnancy-postnatal': {
    slug: 'pregnancy-postnatal',
    label: 'Pregnancy & Postnatal',
    metaTitle: 'Pregnancy & Postnatal Pelvic Physio in Ponsonby | PelvicForm',
    metaDescription: 'Pregnancy and postnatal pelvic health physiotherapy in Ponsonby. Stay comfortable through pregnancy, prepare for birth, and recover your core and pelvic floor afterwards. Call 09 886 4611.',
    keywords: 'pregnancy pelvic physio, postnatal recovery auckland, mummy MOT, birth recovery physio, pelvic girdle pain ponsonby',
    eyebrow: 'Pregnancy & Postnatal',
    h1: 'Through pregnancy, and back to yourself after',
    intro: 'Pregnancy and birth ask a lot of your body. We help you stay comfortable and strong through pregnancy, prepare for birth, and rebuild afterwards, your core, your pelvic floor, and your confidence. Birth injuries are covered by ACC, and we can register the claim for you.',
    heroImage: IMG_INCLUSIVE,
    conditions: [
      { name: 'Pelvic girdle pain', desc: 'Pain in the pelvis during pregnancy that makes daily movement hard.' },
      { name: 'Birth preparation', desc: 'Understanding and preparing your body for labour and delivery.' },
      { name: 'Postnatal recovery', desc: 'A proper check and a plan to rebuild after birth, often called a postnatal MOT.' },
      { name: 'Birth injuries (ACC)', desc: 'Tears and other birth injuries, now covered by ACC. We register the claim.' },
    ],
  },
  'post-surgical-rehab': {
    slug: 'post-surgical-rehab',
    label: 'Post-Surgical Rehab',
    metaTitle: 'Pelvic Post-Surgical Rehab in Ponsonby Auckland | PelvicForm',
    metaDescription: 'Pelvic rehabilitation before and after surgery in Ponsonby, for gynaecological, prostate and cancer-related surgery. Better outcomes, faster recovery. Call 09 886 4611.',
    keywords: 'pelvic surgery rehab auckland, post prostatectomy physio, gynae surgery recovery, prehab pelvic surgery, cancer pelvic rehab',
    eyebrow: 'Post-Surgical Rehab',
    h1: 'Better before, faster after',
    intro: 'Preparing your body before pelvic surgery and rehabilitating it afterwards makes a real difference to your recovery and your results. We support you through gynaecological, prostate and cancer-related pelvic surgery, every step.',
    heroImage: IMG_CARE,
    conditions: [
      { name: 'Pre-surgery preparation', desc: 'Build strength and function before your operation for a better outcome.' },
      { name: 'Post-surgery recovery', desc: 'Structured rehab to recover continence, strength and confidence.' },
      { name: 'Gynaecological surgery', desc: 'Recovery support after prolapse, hysterectomy and related surgery.' },
      { name: 'Cancer-related surgery', desc: 'Gentle, expert rehab after surgery or radiotherapy affecting the pelvis.' },
    ],
  },
  'pelvic-pain': {
    slug: 'pelvic-pain',
    label: 'Pelvic Pain',
    metaTitle: 'Pelvic Pain Physio in Ponsonby Auckland | PelvicForm',
    metaDescription: 'Pelvic pain physiotherapy in Ponsonby for women and men. Help with endometriosis-related pain, painful sex, bladder pain and chronic pelvic pain. Confidential. Call 09 886 4611.',
    keywords: 'pelvic pain physio auckland, painful sex treatment, endometriosis physio, bladder pain syndrome, chronic pelvic pain ponsonby',
    eyebrow: 'Pelvic Pain',
    h1: 'Pelvic pain is real, and it can be treated',
    intro: 'Persistent pelvic pain can be exhausting and isolating, especially when you have been told there is nothing to be done. There usually is. We assess what is driving the pain and treat it directly, for women and men.',
    heroImage: IMG_CARE,
    conditions: [
      { name: 'Painful sex', desc: 'Including vaginismus and vulvodynia. Treated with care and patience.' },
      { name: 'Endometriosis-related pain', desc: 'Physiotherapy as part of managing the pelvic pain of endometriosis.' },
      { name: 'Bladder pain', desc: 'Including interstitial cystitis and painful bladder syndrome.' },
      { name: 'Chronic pelvic pain', desc: 'Long-standing pain in women and men, including prostatitis-related pain.' },
    ],
  },
};
