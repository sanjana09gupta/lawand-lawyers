export const team = [
  {
    name: "Francis Mathew",
    role: "Senior Director",
    photo: "/images/francis.webp",
    slug: "francis-mathew",
  },
  {
    name: "Sarath Nair",
    role: "Director",
    photo: "/images/sarath.webp",
    slug: "sarath-nair",
  },
  {
    name: "Raju Radhakrishnan",
    role: "Director",
    photo: "/images/raju.jpg",
    slug: "raju-radhakrishnan",
  },
  {
    name: "Bhavini Bhudia",
    role: "Director",
    photo: "/images/bhavini.webp",
    slug: "bhavini-bhudia",
  },
  {
    name: "Majo Jose",
    role: "Director",
    photo: null,
    slug: "majo-jose",
  },
  {
    name: "Juneeta Valariyil John",
    role: "Director",
    photo: null,
    slug: "juneeta-valariyil-john",
  },
];

export type Service = {
  slug: string;
  title: string;
  category: "individual" | "business";
  summary: string;
  points: string[];
};

export const services: Service[] = [
  {
    slug: "residential-conveyancing",
    title: "Residential Conveyancing",
    category: "individual",
    summary:
      "Buying or selling a home, handled with fixed, transparent fees and a dedicated point of contact from offer to completion.",
    points: [
      "Freehold and leasehold sales and purchases",
      "Remortgages and transfers of equity",
      "New-build purchases and help-to-buy",
      "Fixed-fee quotes with no hidden costs",
    ],
  },
  {
    slug: "immigration",
    title: "Immigration",
    category: "individual",
    summary:
      "Guidance through UK visa, settlement and citizenship applications from an experienced immigration team.",
    points: [
      "Work, family and student visas",
      "Indefinite leave to remain",
      "British citizenship applications",
      "Appeals and Home Office challenges",
    ],
  },
  {
    slug: "wills-and-probate",
    title: "Wills and Probate",
    category: "individual",
    summary:
      "Clear, compassionate advice on wills, estate planning and probate administration for you and your family.",
    points: [
      "Will drafting and estate planning",
      "Grant of probate applications",
      "Estate administration",
      "Lasting powers of attorney",
    ],
  },
  {
    slug: "employment",
    title: "Employment",
    category: "individual",
    summary:
      "Practical representation for employees navigating workplace disputes, dismissals and settlement agreements.",
    points: [
      "Unfair and constructive dismissal",
      "Settlement agreement review",
      "Discrimination and grievance claims",
      "Employment tribunal representation",
    ],
  },
  {
    slug: "landlord-and-tenant",
    title: "Landlord and Tenant",
    category: "individual",
    summary:
      "Advice for landlords and tenants on tenancy agreements, possession proceedings and disputes.",
    points: [
      "Assured shorthold tenancy agreements",
      "Section 8 and Section 21 notices",
      "Possession proceedings",
      "Rent arrears and deposit disputes",
    ],
  },
  {
    slug: "family",
    title: "Family",
    category: "individual",
    summary:
      "Sensitive, experienced support through divorce, separation and children matters.",
    points: [
      "Divorce and separation",
      "Children arrangements",
      "Financial settlements",
      "Prenuptial and cohabitation agreements",
    ],
  },
  {
    slug: "dispute-resolution",
    title: "Dispute Resolution",
    category: "individual",
    summary:
      "Pragmatic advice on resolving personal and commercial disputes, in and out of court.",
    points: [
      "Contract and debt disputes",
      "Property and boundary disputes",
      "Mediation and negotiation",
      "Litigation and court representation",
    ],
  },
  {
    slug: "commercial-conveyancing",
    title: "Commercial Conveyancing",
    category: "business",
    summary:
      "End-to-end support for commercial property transactions, leases and portfolio acquisitions.",
    points: [
      "Commercial property sales and purchases",
      "Lease negotiation and renewal",
      "Portfolio and investment acquisitions",
      "Landlord and tenant advice",
    ],
  },
  {
    slug: "corporate-immigration-services",
    title: "Corporate Immigration Services",
    category: "business",
    summary:
      "Sponsor licence applications and workforce immigration compliance for growing businesses.",
    points: [
      "Sponsor licence applications",
      "Skilled worker visa sponsorship",
      "Right-to-work compliance audits",
      "Global mobility advice",
    ],
  },
  {
    slug: "employment-law",
    title: "Employment Law",
    category: "business",
    summary:
      "Employer-side advice on contracts, policies, disciplinary processes and tribunal defence.",
    points: [
      "Contracts of employment and handbooks",
      "Disciplinary and grievance procedures",
      "Restructuring and redundancy",
      "Employment tribunal defence",
    ],
  },
];

export const individualServices = services.filter((s) => s.category === "individual");
export const businessServices = services.filter((s) => s.category === "business");

export type NewsPost = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  image: string | null;
  content: Array<{ heading?: string; paragraphs?: string[]; points?: string[] }>;
};

export const news: NewsPost[] = [
  {
    slug: "what-is-probate-and-how-long-does-it-take",
    date: "January 15, 2025",
    title: "What Is Probate and How Long Does It Take in the UK?",
    excerpt:
      "When a loved one passes away, dealing with their estate can be overwhelming and emotionally taxing. Understanding what probate is and how it works in the UK can help ease this challenging process. Probate involves the legal right to manage the deceased's estate—money, property, and possessions—and ensuring it's distributed according to their will or…",
    image: "/images/news-probate.jpg",
    content: [
      { heading: "Introduction", paragraphs: ["When a loved one passes away, dealing with their estate can be overwhelming. Probate is the legal right to manage the estate, including money, property and possessions, and distribute it under the will or the law where there is no will.", "This guide covers when probate is needed, the usual process, timing, costs and the role of a probate solicitor."] },
      { heading: "What is probate?", paragraphs: ["Probate is the process of administering a deceased person's estate. It involves collecting assets, settling debts and tax, then distributing what remains to beneficiaries."], points: ["A Grant of Probate gives an executor authority to deal with the estate.", "Estate administration includes collecting assets, paying debts and distributing assets to beneficiaries."] },
      { heading: "When probate may be required", points: ["The person owned property solely in their name.", "They held significant bank accounts, investments or shares solely in their name.", "A bank or financial institution requires a Grant of Probate before releasing funds."] },
      { heading: "When it may not be needed", paragraphs: ["Jointly owned assets often pass automatically to the surviving owner. Smaller estates may not require probate, but each financial institution sets its own threshold."] },
      { heading: "How long does probate take?", paragraphs: ["The old website guide states that probate commonly takes six to twelve months from start to finish. Complexity, property sales, tax, disputes, overseas assets and missing documents can all extend the timetable."] },
      { heading: "How a solicitor can help", points: ["Advise on estate administration and inheritance tax.", "Prepare and manage complex paperwork.", "Administer assets, debts and beneficiary payments.", "Help resolve disputes and meet legal deadlines."] },
      { heading: "Important", paragraphs: ["Timescales, tax thresholds and court fees can change. Please speak with our team for advice based on your individual circumstances."] },
    ],
  },
  {
    slug: "how-to-find-an-immigration-adviser",
    date: "November 18, 2024",
    title:
      "How to Find an Immigration Adviser: Your Guide to Immigration Solicitors in London",
    excerpt:
      "Navigating the complex world of UK immigration law can be challenging. This guide will help you find the right immigration solicitor in London, highlighting how Law and Lawyers can assist with your immigration needs. Immigrating to the UK involves intricate legal processes that can be overwhelming without professional guidance…",
    image: null,
    content: [
      { heading: "Introduction", paragraphs: ["Immigration processes can be complex. Whether you are applying for a visa, seeking asylum or planning to settle permanently, an appropriately regulated adviser can help you understand your options."] },
      { heading: "Why use an immigration solicitor?", points: ["Specialist knowledge of UK immigration law.", "Advice tailored to your circumstances.", "Representation in appeals, tribunals and other proceedings.", "Support with preparing a complete application."] },
      { heading: "Check regulation", paragraphs: ["The old guide advises clients to verify that an adviser is regulated by the Solicitors Regulation Authority or the Office of the Immigration Services Commissioner. Regulation is an important safeguard for professional standards and compliance."] },
      { heading: "Choosing the right adviser", points: ["Check credentials and relevant case experience.", "Discuss fees and the scope of work before instructing.", "Look for clear communication and timely responses.", "Review client feedback and professional directories."] },
      { heading: "How we can help", points: ["Visa applications.", "Settlement and citizenship matters.", "Asylum and human-rights matters.", "Business immigration and sponsor compliance."] },
      { heading: "Important", paragraphs: ["Immigration rules change frequently. Contact us for advice that reflects your current circumstances and the latest requirements."] },
    ],
  },
  {
    slug: "key-tips-for-choosing-a-conveyancing-lawyer",
    date: "October 14, 2024",
    title:
      "What are the Key Tips for Choosing a Conveyancing Lawyer in London?",
    excerpt:
      "When buying or selling a home in London, one of the most critical decisions is choosing the right conveyancing lawyer. This specialist will guide you through the legal complexities of property transactions, ensuring the process runs smoothly…",
    image: null,
    content: [
      { heading: "What does a conveyancing lawyer do?", paragraphs: ["A conveyancing lawyer manages the legal transfer of property ownership. Their work can include reviewing contracts, carrying out searches, handling funds and resolving issues that arise during a transaction."] },
      { heading: "Conveyancer or solicitor?", paragraphs: ["A conveyancer focuses on property law. A solicitor can also advise on broader legal issues that may arise in a transaction. The right option depends on the complexity of your matter and the support you need."] },
      { heading: "Key tips when choosing", points: ["Choose relevant experience in residential property and the local market.", "Ask for a clear cost breakdown and check for potential additional fees.", "Confirm who will handle your case and how you will receive updates.", "Review independent feedback and professional accreditations.", "Verify regulation with the SRA or CLC."] },
      { heading: "Avoid common mistakes", paragraphs: ["Do not select solely on the headline quote. Consider experience, responsiveness, regulation and the clarity of the service being offered."] },
    ],
  },
  {
    slug: "residential-conveyancing-made-simple",
    date: "August 29, 2024",
    title: "Residential Conveyancing Made Simple: Expert Guide from Law and Lawyers",
    excerpt:
      "Are you buying or selling a property in the UK? If so, you've likely come across the term “residential conveyancing.” But what exactly does it mean, and why is it crucial to your property transaction? In this comprehensive guide, we'll walk you through everything you need to know…",
    image: null,
    content: [
      { heading: "What is residential conveyancing?", paragraphs: ["Residential conveyancing is the legal and administrative work that transfers property ownership between parties. It covers contracts, searches, mortgage arrangements, funds and Land Registry registration."] },
      { heading: "Our conveyancing process", points: ["Initial discussion and a clear estimate of fees.", "Formal instruction after an offer is accepted.", "Draft contracts, searches and review of legal documents.", "Reporting on findings and raising enquiries.", "Pre-exchange checks, exchange and completion."] },
      { heading: "Before exchange", paragraphs: ["The old guide explains that, before contracts are exchanged, the solicitor checks mortgage requirements, anti-money-laundering information, deposit arrangements and the documents required for the transaction."] },
      { heading: "Why professional support matters", paragraphs: ["A conveyancing solicitor helps identify legal restrictions, negotiates necessary enquiries and coordinates the parties involved so you can make informed decisions throughout the transaction."] },
    ],
  },
  {
    slug: "conveyancing-process-home-buyers-uk",
    date: "August 20, 2024",
    title: "The Conveyancing Process for Home Buyers in the UK",
    excerpt: "A step-by-step guide to the legal process that starts once an offer is accepted and ends when the property is registered in the buyer's name.",
    image: null,
    content: [
      { heading: "What is conveyancing?", paragraphs: ["Conveyancing begins when an offer is accepted and finishes on completion, when the keys are released and ownership is registered at the Land Registry."] },
      { heading: "What your conveyancer does", points: ["Review and negotiate the contract.", "Conduct local authority, environmental, water and drainage searches.", "Advise on legal documents and search results.", "Work with mortgage lenders and coordinate completion funds."] },
      { heading: "Why it matters", paragraphs: ["Professional conveyancing helps protect buyers and sellers by ensuring legal requirements are dealt with correctly and potential property issues are identified early."] },
    ],
  },
  {
    slug: "new-95-percent-mortgage-scheme",
    date: "April 19, 2021",
    title: "New 95% mortgage scheme launches today",
    excerpt: "An archived update about the mortgage guarantee scheme announced in the 2021 Budget.",
    image: null,
    content: [
      { heading: "Archived update", paragraphs: ["This article concerns the 2021 mortgage guarantee scheme and is retained from the previous website for reference. It is not current mortgage advice."] },
      { heading: "What the update covered", paragraphs: ["The scheme was described as helping first-time buyers and existing homeowners secure a mortgage with a five percent deposit for qualifying properties, subject to lender criteria and the scheme rules at the time."] },
    ],
  },
  {
    slug: "could-tighter-restrictions-mean-home-moves-stop",
    date: "January 12, 2021",
    title: "Could tighter restrictions mean home moves has to stop?",
    excerpt: "An archived COVID-19 era update regarding home moves and restrictions.",
    image: null,
    content: [
      { heading: "Archived update", paragraphs: ["This historic article relates to COVID-19 restrictions in 2021. It is retained for archive purposes only and should not be treated as current guidance."] },
    ],
  },
  {
    slug: "what-is-conveyancing",
    date: "June 3, 2019",
    title: "What is Conveyancing?",
    excerpt: "An introduction to the legal and administrative work involved in transferring a property from seller to buyer.",
    image: null,
    content: [
      { heading: "Conveyancing explained", paragraphs: ["Conveyancing is the legal transfer of property from one owner to another. It starts when a buyer's offer is accepted and continues until keys are released to the buyer."] },
      { heading: "Typical stages", points: ["Initial paperwork and the draft contract.", "Pre-contract enquiries from the buyer's solicitor.", "Survey arrangements and property searches.", "Exchange of contracts and completion."] },
    ],
  },
  {
    slug: "uk-expand-skilled-occupations-list",
    date: "June 6, 2016",
    title: "UK to expand skilled occupations list",
    excerpt: "An archived immigration update concerning the former shortage occupation list and Migration Advisory Committee recommendations.",
    image: null,
    content: [
      { heading: "Archived update", paragraphs: ["This article discusses historic Migration Advisory Committee recommendations and the former shortage occupation list. Immigration rules have changed since publication, so this page is retained for archive purposes only."] },
    ],
  },
];

export const offices = [
  {
    name: "Liverpool Street",
    tag: "Head Office",
    address: "Second Floor, 31–41 Worship Street, London EC2A 2DX",
    phone: "+44 20 8586 5657",
    mobile: "07767 610001",
    email: "Sales@lawandlawyers.co.uk",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Second+Floor%2C+31-41+Worship+Street%2C+London+EC2A+2DX",
  },
];

export const recognitions = [
  {
    src: "/images/recog1.jpg",
    alt: "Lexcel — Law Society Accredited Practice Management Standard",
  },
  {
    src: "/images/recog2.png",
    alt: "The Law Society — Conveyancing Quality Accredited",
  },
  {
    src: "/images/recog3.png",
    alt: "Cyber Essentials Certified",
  },
  {
    src: "/images/recog4.jpg",
    alt: "The Legal 500 United Kingdom",
  },
];

export const testimonials = [
  {
    name: "Silji Mathew",
    text: "I really appreciated their attention to detail and willingness to answer all my questions. The whole process was smooth and stress-free thanks to their team.",
  },
  {
    name: "Jusvin Jacob",
    context: "Residential Conveyancing – House Purchase",
    text: "We recently completed the purchase of our new home, and we are extremely pleased with the outstanding service provided by Law and Lawyers Solicitors.",
  },
  {
    name: "Jithin Francis",
    text: "We are now holding the keys to our dream home. It was a wonderful experience with Law and Lawyers, especially Melvin and Anjana during the purchase.",
  },
  {
    name: "Geethu Mohan",
    context: "Conveyancing",
    text: "Excellent service throughout our house purchase. A special thank you to Gurupriya and Stinnie who were always professional, responsive, and quick to act.",
  },
  {
    name: "Arun Chandran",
    context: "Residential Conveyancing",
    text: "Excellent customer service by all staff who dealt with our purchase. Big thank you to Law and Lawyers. Highly recommended.",
  },
  {
    name: "Sumi Michu",
    context: "Residential Conveyancing",
    text: "I had an excellent experience with Law and Lawyers Limited. I would especially like to thank Ajay, Margarete, and Vishal for their professionalism.",
  },
];

export const stats = [
  { target: 732, suffix: "+", label: "Client reviews" },
  { target: 4.6, decimals: 1, suffix: " / 5", label: "Average rating" },
  { target: 3, label: "UK offices" },
  { target: 7, suffix: "+", label: "Areas of law" },
];

export const careers = [
  {
    title: "Residential Conveyancer",
    location: "East London",
    type: "Full-time",
  },
  {
    title: "Immigration Caseworker",
    location: "Canary Wharf",
    type: "Full-time",
  },
  {
    title: "Trainee Solicitor",
    location: "Manchester",
    type: "Full-time",
  },
  {
    title: "Legal Secretary",
    location: "East London",
    type: "Full-time",
  },
];
