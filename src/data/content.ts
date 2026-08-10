export const team = [
  {
    name: "Francis Mathew",
    role: "Senior Director",
    photo: "/images/francis.webp",
  },
  {
    name: "Sarath Nair",
    role: "Director",
    photo: "/images/sarath.webp",
  },
  {
    name: "Raju Radhakrishnan",
    role: "Director",
    photo: "/images/raju.jpg",
  },
  {
    name: "Bhavini Bhudia",
    role: "Director",
    photo: "/images/bhavini.webp",
  },
  {
    name: "Majo Jose",
    role: "Director",
    photo: null,
  },
  {
    name: "Juneeta Valariyil John",
    role: "Director",
    photo: null,
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
};

export const news: NewsPost[] = [
  {
    slug: "what-is-probate-and-how-long-does-it-take",
    date: "January 15, 2025",
    title: "What Is Probate and How Long Does It Take in the UK?",
    excerpt:
      "When a loved one passes away, dealing with their estate can be overwhelming and emotionally taxing. Understanding what probate is and how it works in the UK can help ease this challenging process. Probate involves the legal right to manage the deceased's estate—money, property, and possessions—and ensuring it's distributed according to their will or…",
    image: "/images/news-probate.jpg",
  },
  {
    slug: "how-to-find-an-immigration-adviser",
    date: "November 18, 2024",
    title:
      "How to Find an Immigration Adviser: Your Guide to Immigration Solicitors in London",
    excerpt:
      "Navigating the complex world of UK immigration law can be challenging. This guide will help you find the right immigration solicitor in London, highlighting how Law and Lawyers can assist with your immigration needs. Immigrating to the UK involves intricate legal processes that can be overwhelming without professional guidance…",
    image: null,
  },
  {
    slug: "key-tips-for-choosing-a-conveyancing-lawyer",
    date: "October 14, 2024",
    title:
      "What are the Key Tips for Choosing a Conveyancing Lawyer in London?",
    excerpt:
      "When buying or selling a home in London, one of the most critical decisions is choosing the right conveyancing lawyer. This specialist will guide you through the legal complexities of property transactions, ensuring the process runs smoothly…",
    image: null,
  },
  {
    slug: "residential-conveyancing-made-simple",
    date: "August 29, 2024",
    title: "Residential Conveyancing Made Simple: Expert Guide from Law and Lawyers",
    excerpt:
      "Are you buying or selling a property in the UK? If so, you've likely come across the term “residential conveyancing.” But what exactly does it mean, and why is it crucial to your property transaction? In this comprehensive guide, we'll walk you through everything you need to know…",
    image: null,
  },
];

export const offices = [
  {
    name: "East London",
    tag: "Head Office",
    address: "352 High Street North, London E12 6PH",
    phone: "+44 (0)20 8586 5657",
    email: "info@lawandlawyers.co.uk",
  },
  {
    name: "Canary Wharf",
    tag: "London",
    address: "Level 18, 40 Bank Street, Canary Wharf, London E14 5NR",
    phone: "+44 (0)20 7062 6666",
    email: "canarywharf@lawandlawyers.co.uk",
  },
  {
    name: "Manchester",
    tag: "Manchester",
    address: "106 Irlam Road, Manchester M41 6JT",
    phone: "+44 (0)161 748 3335",
    email: "manchester@lawandlawyers.co.uk",
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
