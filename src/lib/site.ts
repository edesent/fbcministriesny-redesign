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

export const site = {
  name: "Faith Bible Church",
  tagline: "Loving Jesus by Loving Others",
  url: "https://www.fbcministriesny.org",
  email: "fbcministriesny@yahoo.com",
  phone: "(518) 605-3177",
  phoneHref: "tel:+15186053177",
  address: "108 Crosby Road, Sprakers, NY 12166",
  mapHref: "https://maps.google.com/?q=108+Crosby+Road,+Sprakers,+NY+12166",
  facebookHref: "https://www.facebook.com/FaithBibleChurchSprakersNY12166",
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Ministries", href: "/ministries" },
  { label: "Events", href: "/events" },
  { label: "Counseling", href: "/counseling" },
  { label: "Missions", href: "/missions" },
  { label: "Give", href: "/give" },
  { label: "Contact", href: "/contact" },
];

export const serviceTimes = [
  { label: "Sunday School", time: "9:45 AM", detail: "Classes for every age" },
  { label: "Sunday Worship", time: "11:00 AM", detail: "Preaching, prayer, and worship" },
  { label: "Sunday Prayer Service", time: "6:00 PM", detail: "Evening prayer and fellowship" },
  { label: "Wednesday Ministries", time: "7:00 PM", detail: "Adult, teen, and children's ministries" },
];

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
      "Take the next step by getting involved in a ministry. Faith Bible offers ministry environments for men, women, adults, teens, and children.",
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
