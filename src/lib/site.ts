import {
  Baby,
  BookOpen,
  CalendarDays,
  Church,
  CircleDollarSign,
  Cross,
  HandHeart,
  HeartHandshake,
  Mail,
  MapPin,
  MessageCircleHeart,
  Music,
  Phone,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const site = {
  name: "Faith Bible Church",
  tagline: "Loving Jesus by Loving Others",
  url: "https://www.fbcministriesny.org",
  email: "fbcministriesny@yahoo.com",
  phone: "(518) 605-3177",
  phoneHref: "tel:+15186053177",
  address: "108 Crosby Road, Sprakers, NY 12166",
  mapHref: "https://maps.google.com/?q=108+Crosby+Road,+Sprakers,+NY+12166",
  mapEmbedSrc:
    "https://www.google.com/maps?q=108+Crosby+Road,+Sprakers,+NY+12166&output=embed",
  facebookHref: "https://www.facebook.com/FaithBibleChurchSprakersNY12166",
  pastorPhoto: "/pastor-mark-redone.jpg",
};

// Google Calendar — paste the church's calendar here.
// 1) In Google Calendar → Settings → "Integrate calendar":
//    - embedSrc: copy the src="..." URL from the iframe "Embed code"
//    - publicUrl: copy the "Public URL to this calendar"
export const googleCalendar = {
  embedSrc:
    "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&showPrint=0&showTitle=0&showNav=1&showTabs=0&showCalendars=0&mode=AGENDA&src=bWFya19rMzQ5OUB5YWhvby5jb20&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23062a53&color=%23b89a5a",
  publicUrl:
    "https://calendar.google.com/calendar/embed?src=mark_k3499%40yahoo.com&ctz=America%2FNew_York",
  // Public .ics feed(s) the homepage reads to build its own styled event list.
  // Add more calendar feeds here and they'll be merged automatically.
  icsUrls: [
    "https://calendar.google.com/calendar/ical/mark_k3499%40yahoo.com/public/basic.ics",
  ],
};

// YouTube — powers the /sermons page (live stream + archive of past videos).
// To activate: create the church's YouTube channel, then paste its channel ID
// here (the "UC…" string). Find it at YouTube → Settings → Advanced, or in any
// channel-page URL (youtube.com/channel/UC...). The handle URL is for the
// "Full channel" button. Until channelId is filled in, /sermons shows a tasteful
// "coming soon" state.
export const youtube = {
  channelId: "UCyvSpzBl4xkHtLeOJpJTOjQ", // Digging Deeper Devotional — A ministry of FBC
  channelUrl: "https://www.youtube.com/@diggingdeeperdevotional-am6785",
};

// Missionaries the church supports — shown as a card grid at the top of /missions.
// Drop each photo in /public/missionaries/ and add an entry here. `field` is the
// country/region; `agency` (optional) is the sending board. The cards appear only
// when this list is non-empty.
export type Missionary = {
  name: string;
  field?: string;
  agency?: string;
  photo: string; // e.g. "/missionaries/the-smith-family.jpg"
  facebookHref?: string; // optional Facebook page link shown on the card
  logoHref?: string;     // optional custom logo link (overrides Facebook icon)
  logoSrc?: string;      // image path for the custom logo
  newsletterImages?: string[]; // optional array of prayer letter/newsletter images shown in a gallery modal
};

// Each photo is a finished card (name + location are printed on the image), so
// `name`/`field` here are used only for alt text / SEO, not rendered as labels.
export const missionaries: Missionary[] = [
  { name: "The Smith Family — Mark & Babe", field: "British Columbia", photo: "/missionaries/smith.avif" },
  { name: "The Alves Family — Edson & Marly, Esdras, Eliaqim", field: "Petrolina, Brazil", photo: "/missionaries/alves.avif", facebookHref: "https://www.facebook.com/share/18HaHZvGGr/?mibextid=wwXIfr" },
  { name: "The Timothy Project", field: "Dominican Republic", photo: "/missionaries/timothy-project.avif", newsletterImages: ["/missionaries/tp-letter/image.jpg", "/missionaries/tp-donkey/image.jpg", "/missionaries/tp-newsletter/image.jpg"] },
  { name: "The Lovestrand Family — Joel & Seiko, Akari, Leo", field: "Japan", photo: "/missionaries/lovestrand.avif", facebookHref: "https://landoftherisenson.com/?fbclid=IwVERDUASXY8xleHRuA2FlbQIxMABzcnRjBmFwcF9pZAo2NjI4NTY4Mzc5AAEekTHpA8-DSh_E8gWB3I1mu9IyvP0VwVn5T2tiAcb1uDhei6Zz2fRehkBM5LI_aem_fPrxi6NarQRe9xAqwvmCng" },
  { name: "The Carus Family — Tanner, Vivian & Arlo", field: "Ethnos 360", photo: "/missionaries/carus.avif" },
  { name: "The Veldhuis Family — Michael & Dawn", field: "Native Americans", photo: "/missionaries/veldhuis.avif", logoHref: "https://ibimi.com/?page_id=190", logoSrc: "/missionaries/img-1980.jpeg" },
  { name: "The Olivares Family — Miguel & Mireya, Michelle, Ruth", field: "Juarez, Mexico", photo: "/missionaries/olivares.avif" },
  { name: "The Whitman Family — Joshua & Esara", field: "Imola, Italy", photo: "/missionaries/whitman-imola.avif", facebookHref: "https://www.facebook.com/share/1GanVd8i2R/?mibextid=wwXIfr" },
  { name: "The Marshall Family — Don & Sue", field: "France", photo: "/missionaries/marshall-france.avif" },
  { name: "The Vo Family — Tuan & Chinh, Bao, Ngoc", field: "Southern Vietnam", photo: "/missionaries/vo.avif" },
  { name: "The Abdiel Family — Madhu & Jamin, Ayaahah, Abdiel", field: "Toronto, Canada", photo: "/missionaries/abdiel.avif" },
  { name: "The Appell Family — Jed & Amy and family", field: "Asia Pacific", photo: "/missionaries/appell.avif", logoHref: "https://mailchi.mp/8e267443a19c/may-2026-update?e=da5bb78c04", logoSrc: "/missionaries/img-1983.jpeg" },
  { name: "The Niles Family — Alain & Katherine, Camille, Mia-Joy, Caleb", field: "Mango, Togo", photo: "/missionaries/niles.avif" },
  { name: "Renate Reiner", field: "Brazil", photo: "/missionaries/reiner.avif", logoHref: "https://www.reinersrace.com/?fbclid=IwRlRTSASXwRpleHRuA2FlbQIxMABzcnRjBmFwcF9pZAo2NjI4NTY4Mzc5AAEesb_HBv3PtQmzJ3yzY6tUDLEVEDPQvSx3cC8GFBvtCIC3_uMFnJVoInRezOo_aem_o5mEKdusmuA30oZ7fjT3mg", logoSrc: "/missionaries/img-1984.jpeg" },
  { name: "The Davoll Family — Jeff & Deanne", field: "Ecuador", photo: "/missionaries/davoll.avif", facebookHref: "https://www.facebook.com/share/1BEweNKguu/?mibextid=wwXIfr" },
  { name: "The Whitman Family — Jonathan & Melodee, Noah, Eva", field: "Perugia, Italy", photo: "/missionaries/whitman-perugia.avif", logoHref: "https://jonathanwhitman.com/2026/01/30/its-all-about-worship/?fbclid=IwZnRzaASXvrdleHRuA2FlbQIxMQBzcnRjBmFwcF9pZAo2NjI4NTY4Mzc5AAEeFI_MPMuWodaj2312IFEuOo0z5G0yj4BO_pPfWjgVh3qaoZMll9ePXs9Av7g_aem_BJcJpJ4qPbcE8sr9WV7UDQ", logoSrc: "/missionaries/img-1984.jpeg" },
];

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  children?: { label: string; href: string }[];
};

export const navItems: NavItem[] = [
  { label: "Times", href: "/#times" },
  { label: "Welcome", href: "/#welcome" },
  { label: "Ministries", href: "/ministries" },
  { label: "Sermons", href: "/sermons" },
  { label: "Beliefs", href: "/about/constitution" },
  { label: "Missions", href: "/missions" },
  { label: "Events", href: "/events" },
  { label: "Counseling", href: "/counseling" },
  { label: "Give", href: "/give" },
  { label: "Contact", href: "/contact" },
  { label: "Faith Bible Academy", href: "https://www.faithbibleacademyny.com", external: true },
];

export const serviceTimes = [
  { label: "Sunday School", time: "9:45 AM", detail: "Classes for every age" },
  { label: "Sunday Worship", time: "11:00 AM", detail: "Preaching, prayer, and worship" },
  { label: "Sunday Family Prayer, Praise and Fellowship Service", time: "6:00 PM", detail: "Evening prayer and fellowship" },
  { label: "Wednesday Ministries", time: "7:00 PM", detail: "Adult, teen, and children's ministries" },
];

export const pastors = [
  {
    name: "Pastor Mark Kelly",
    role: "Pastor",
    initials: "MK",
    phone: "(518) 605-3177",
    phoneHref: "tel:+15186053177",
  },
  {
    name: "Pastor Dave White",
    role: "Assistant Pastor · FBA Administrator",
    initials: "DW",
  },
];

export const pastorMessage = {
  from: "Pastor Mark Kelly",
  paragraphs: [
    "It is my privilege to serve as the Pastor of Faith Bible Church. My heart-felt prayer is for people to come to know Jesus Christ as their personal Saviour and Lord. It is also my desire to teach the Word of God in such a way that will motivate Christians to grow into strong soldiers of Jesus Christ.",
    "As a preacher of God's Holy Word, I desire to preach the whole counsel of God, knowing that His Word does not return void. As a Pastor of God's Church, I desire to place people into various ministries that will both strengthen them and the brethren.",
    "If you are looking for a Church to attend this Sunday, I would love to have you be a part of one of our services.",
    "May God bless you as you seek His will for your life!",
  ],
};

export const ministryCards = [
  {
    title: "Men",
    icon: Users,
    text: "Fellowship, Bible study, prayer, and accountability for men and boys.",
    meta: "Men's fellowship: 3rd Thursday, 7-8 PM",
  },
  {
    title: "Women",
    icon: HeartHandshake,
    text: "Encouragement, prayer, and spiritual growth through the 15/15 Challenge groups.",
    meta: "Connect through the church office",
  },
  {
    title: "Teens",
    icon: Music,
    text: "Ignite youth group gives 7th-12th grade students a place for games, worship, and Bible teaching.",
    meta: "Wednesdays, 7-8 PM",
  },
  {
    title: "Children",
    icon: Baby,
    text: "Sunday School, Children's Church, Wednesday Children's Club, and nursery care during services.",
    meta: "Children's Church: 11 AM",
  },
  {
    title: "Adults",
    icon: BookOpen,
    text: "Bible-centered discipleship and care for every season of life.",
    meta: "Sunday School: 9:45 AM",
  },
  {
    title: "Missions",
    icon: Cross,
    text: "A church family committed to proclaiming God's saving grace to the world.",
    meta: "Global gospel partnership",
  },
];

// Ministries with their own detail pages at /ministries/<slug>. `blurb` is the
// short text on the listing card; the rest fills the sub-page (verse, intro,
// and each program/group). Migrated from fbcministriesny.org sub-pages.
export type MinistryProgram = {
  name: string;
  schedule: string;
  description: string;
};

export type Ministry = {
  slug: string;
  title: string;
  icon: LucideIcon;
  blurb: string;
  verse: string;
  verseRef: string;
  intro: string;
  programs: MinistryProgram[];
  contact: string;
};

export const ministries: Ministry[] = [
  {
    slug: "men",
    title: "Men's Ministry",
    icon: Users,
    blurb: "Fellowship, Bible study, prayer, and accountability that encourage men to grow as strong soldiers of Jesus Christ.",
    verse: "Iron sharpeneth iron; so a man sharpeneth the countenance of his friend.",
    verseRef: "Proverbs 27:17",
    intro: "",
    programs: [
      {
        name: "Faithful Men's Fellowship",
        schedule: "Faithful Men's Fellowship · 3rd Thursday of each month from September through May · 7–8 PM",
        description:
          "Building strong friendships through encouragement, prayer, Bible reading, and accountability — a time of fellowship, Bible study, and prayer.",
      },
      {
        name: "Men's Prayer Breakfast",
        schedule: "Men's/Boys Prayer Breakfast · 2nd Saturday of each month from September through May · 8:30–9:30 AM",
        description:
          "Men and boys learning the power of Christian fellowship every month.",
      },
    ],
    contact: "",
  },
  {
    slug: "women",
    title: "Women's Ministry",
    icon: HeartHandshake,
    blurb: "Encouragement, prayer, and spiritual growth as women study God's Word and build lasting friendships.",
    verse:
      "And let us consider one another to provoke unto love and to good works: not forsaking the assembling of ourselves together, as the manner of some is; but exhorting one another.",
    verseRef: "Hebrews 10:24–25",
    intro: "",
    programs: [
      {
        name: "15/15 Challenge Groups",
        schedule: "",
        description:
          "Do you want to grow in your intimacy with God and your maturity as a believer, but don't know how? Are you struggling to keep a faithful habit of Bible reading and prayer and would benefit from encouragement and accountability from other women? Would you like to encourage other women in spiritual growth? Then this ministry is for you!",
      },
    ],
    contact:
      "For more information, connect with Mrs. Kathy Kelly or email the church office at pastormkellyfbcny@yahoo.com.",
  },
  {
    slug: "adults",
    title: "Adult's Ministry",
    icon: BookOpen,
    blurb: "Bible-centered teaching and discipleship that care for believers in every season of life.",
    verse:
      "And they continued steadfastly in the apostles' doctrine and fellowship, and in breaking of bread, and in prayers.",
    verseRef: "Acts 2:42",
    intro: "",
    programs: [
      {
        name: "Hilltoppers",
        schedule: "Hilltoppers · Ages 50+ · Meets monthly",
        description:
          "Strengthening the church through fellowship with others in a similar life stage — a tool to reach out to the lost and to help members get better acquainted with people new to Faith Bible Church.",
      },
      {
        name: "Mountain Climbers",
        schedule: "Mountain Climbers · Sunday School · 9:45 AM in the North Learning Center",
        description:
          "A ministry for young adults out of high school to mid-30s, with monthly fellowship activities throughout the year.",
      },
    ],
    contact: "",
  },
  {
    slug: "teens",
    title: "Teen's Ministry",
    icon: Music,
    blurb: "A place for 7th–12th grade students to enjoy games, worship, and solid Bible teaching on Wednesday nights.",
    verse:
      "Let no man despise thy youth; but be thou an example of the believers, in word, in conversation, in charity, in spirit, in faith, in purity.",
    verseRef: "1 Timothy 4:12",
    intro: "",
    programs: [
      {
        name: "Ignite Youth Group",
        schedule: "Wednesdays · 7–8 PM · 7th–12th Grade",
        description:
          "Join us Wednesday nights for a fun-filled time with other teens! Expect group games, worship, a message from God's Word, and special events.",
      },
      {
        name: "Teen Sunday School",
        schedule: "Sundays · 9:45 AM",
        description:
          "Meet in the North Learning Center before the Sunday service for a Bible lesson with other teens.",
      },
    ],
    contact: "",
  },
  {
    slug: "kids",
    title: "Kid's Ministry",
    icon: Baby,
    blurb: "Sunday School, Children's Church, Wednesday clubs, and nursery care that point children to Jesus.",
    verse:
      "But Jesus called them unto him, and said, Suffer little children to come unto me, and forbid them not: for of such is the kingdom of God.",
    verseRef: "Luke 18:16–17",
    intro:
      "Children are a gift from God, given to parents to raise in the nurture and admonition of the Lord. It is our desire to help you train your children in the way that they should go — and our children's ministries are designed to accomplish that goal.",
    programs: [
      {
        name: "Children's Church",
        schedule: "Sundays · 11 AM",
        description: "Age-appropriate worship and Bible teaching during the morning service.",
      },
      {
        name: "Wednesday Children's Club",
        schedule: "Wednesdays · 7–8 PM",
        description: "Midweek games, lessons, and fellowship for kids.",
      },
      {
        name: "Nursery",
        schedule: "Every service",
        description: "Loving nursery care is provided for every service.",
      },
    ],
    contact: "",
  },
];

export const quickLinks = [
  {
    title: "Watch Online",
    icon: MessageCircleHeart,
    href: "/events",
    text: "Join in when you are away or catch a recent service.",
  },
  {
    title: "Need Counseling?",
    icon: HandHeart,
    href: "/counseling",
    text: "Free biblical counseling by appointment.",
  },
  {
    title: "Plan A Visit",
    icon: Church,
    href: "/contact",
    text: "Find service times, directions, and next steps.",
  },
];

export const contactMethods = [
  { label: site.phone, href: site.phoneHref, icon: Phone },
  { label: site.email, href: `mailto:${site.email}`, icon: Mail },
  { label: site.address, href: site.mapHref, icon: MapPin },
];

export const pageContent = {
  about: {
    eyebrow: "About Faith Bible",
    title: "A Christ-centered church family in the Carlisle community.",
    intro:
      "Faith Bible Church is a non-denominational congregation in Sprakers, New York. The church exists to glorify God in the salvation of souls, build up Christians through the teaching of God's Word, and proclaim God's saving grace to the world.",
    points: [
      "Warm, welcoming services with praise, hymns, prayer, and Bible preaching.",
      "An autonomous, self-supporting congregation with Christ as the Head of the church.",
      "Home of Faith Bible Academy, a private Christian school serving K-12 students.",
    ],
    cta: "Come and see the big things God is doing at Faith Bible Church.",
  },
  ministries: {
    eyebrow: "Discover Ministries",
    title: "A place to grow for every age and life stage.",
    intro:
      "Ministry at Faith Bible isn't a program — it's people. Men, women, teens, and children all have a place to study God's Word, build real friendships, and serve the church family together.",
    points: [
      "Men's fellowship and prayer breakfast for encouragement and accountability.",
      "Women's discipleship groups for prayer, Bible reading, and spiritual growth.",
      "Ignite youth group, children's programs, and nursery care for families.",
    ],
    cta: "Ask about the ministry that fits your season.",
  },
  events: {
    eyebrow: "Events",
    title: "Stay close to what is happening in the church family.",
    intro:
      "From weekly services to guest speakers, special events, and ministry nights, the church calendar keeps families connected and prepared.",
    points: [
      "Sunday worship and prayer gatherings each week.",
      "Wednesday evening ministries for adults, teens, and children.",
      "Special conferences, guest speakers, and fellowship events throughout the year.",
    ],
    cta: "Contact the office for the latest calendar updates.",
  },
  counseling: {
    eyebrow: "Biblical Counseling",
    title: "There is hope and help from God's sufficient Word.",
    intro:
      "Faith Bible offers biblical counseling by appointment. The counselors volunteer their time, and the church provides the facilities so counseling can be offered free of charge.",
    points: [
      "Care for marriage struggles, parenting needs, emotional battles, and other life concerns.",
      "A Bible-centered approach that looks to God's Word for real solutions.",
      "Appointments are available by calling the church office.",
    ],
    cta: "Call the church to schedule a counseling appointment.",
  },
  missions: {
    eyebrow: "Missions",
    title: "One message: the Lord Jesus Christ.",
    intro:
      "Faith Bible seeks to proclaim the gospel locally and around the world, supporting Christian activity that functions in harmony with God's Word.",
    points: [
      "A commitment to gospel proclamation in the Montgomery County area.",
      "Prayerful partnership in world missions.",
      "A church family that wants every ministry to point people to Christ.",
    ],
    cta: "Join the church family in praying, giving, and going.",
  },
  give: {
    eyebrow: "Give",
    title: "Partner in the work God is doing through Faith Bible.",
    intro:
      "Faithful giving supports the ministry of the church, local outreach, discipleship, and worldwide gospel work.",
    points: [
      "Give during regular services.",
      "Contact the church office for current giving instructions.",
      "Pray for wisdom, gospel fruit, and faithful stewardship.",
    ],
    cta: "For giving questions, contact the church office.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Reach out, ask a question, or plan your first visit.",
    intro:
      "Whether you want to talk with a pastor, ask for prayer, learn about baptism, or connect with a group, the church would love to hear from you.",
    points: [
      "Call or email the church office.",
      "Visit at 108 Crosby Road in Sprakers.",
      "Ask about next steps, ministries, or counseling appointments.",
    ],
    cta: "You are welcome here.",
  },
} as const;

export const actionCards = [
  { label: "Services", value: "Sundays 9:45 AM, 11 AM, 6 PM", icon: CalendarDays },
  { label: "Location", value: site.address, icon: MapPin },
  { label: "Giving", value: "Support ministry and missions", icon: CircleDollarSign },
];
