# Chloe Mary Photography - Site Content & Components Audit

**Date:** 2025-01-XX  
**Purpose:** Comprehensive audit of all content, components, pages, assets, and functionality before site rebuild

---

## Table of Contents

1. [Pages & Routes](#1-pages--routes)
2. [Components Inventory](#2-components-inventory)
3. [Content Documentation](#3-content-documentation)
4. [Assets & Media](#4-assets--media)
5. [API Routes](#5-api-routes)
6. [Dependencies & Tech Stack](#6-dependencies--tech-stack)
7. [SEO & Metadata](#7-seo--metadata)
8. [Styling Architecture](#8-styling-architecture)
9. [Functionality Features](#9-functionality-features)
10. [Environment Variables](#10-environment-variables)
11. [External Integrations](#11-external-integrations)

---

## 1. Pages & Routes

### 1.1 Homepage (`/` - `src/app/page.tsx`)

**Metadata:**

- Title: "Chloe Mary | Bristol Wedding Photographer - Authentic Modern Love Stories"
- Description: "Contemporary documentary wedding photographer in Bristol. Passionate about capturing authentic love stories and candid moments for creative couples. Professional Photos Top 50 UK 2025. Featured on Who What Wear 2025. Memento vivere - remember to live."
- Keywords: 28 keywords including bristol wedding photographer, contemporary documentary photographer, authentic love stories, etc.
- Canonical: https://www.chloemary.com

**Components Used:**

- `HomeHero` - Main hero section
- `QuoteIntro` - Introduction with philosophy
- `Achievements` - 4 award cards
- `HomepageMasonryGallery` - Image gallery

**Structured Data:**

- WebSite schema
- WebPage schema
- ImageObject schema
- BreadcrumbList schema

**Content:**

- Hero title: "Authentic Modern Love Stories"
- Hero subtitle: "Told By You • Captured by Chloe Mary"
- Memento Vivere tagline: "MEMENTO VIVERE" / "REMEMBER TO LIVE"
- Quote intro greeting: "Hi, I'm Chloe"
- Quote intro tagline: "Self Professed Queen of Monochrome. Named one of the Top 50 UK Wedding Photographers for 2024 & 2025."
- Philosophy quote: "Because what truly matters isn't how it all looked, but how it felt."

### 1.2 About Page (`/about` - `src/app/about/page.tsx`)

**Metadata:**

- Title: "About Chloe Mary | Contemporary Wedding Photographer Bristol"
- Description: "Meet Chloe Mary, a contemporary documentary photographer passionate about capturing authentic love stories and candid moments. Based in Bristol, working with creative couples across the UK and beyond. Memento vivere - remember to live."
- Type: profile
- Canonical: https://www.chloemary.com/about

**Components Used:**

- `AboutHero` - Hero section with "Nostalgia Lover" title
- `AboutStory` - Personal narrative with images
- `AboutFooter` - Footer with "Let's Connect" CTA

**Structured Data:**

- Person schema with occupation, awards, skills

**Content:**

- Hero title: "NOSTALGIA LOVER" / "& Visual Storyteller"
- Traits: "EMBRACER OF THE IMPERFECT", "Collector OF MEMORIES", "Keeper OF STORIES", "EXTROVERTED INTROVERT"
- Personal story sections:
  - Introduction: "Hi, I'm Chloe - Mary is actually my middle name given to me in honour of my great grandmother, based in the vibrant city of Bristol, I'm an award winning UK wedding photographer with over 7 years of experience."
  - Story 01: Nostalgia and childhood photography
  - Pull quote: "That feeling of authenticity is at the heart of my work as a story telling wedding photographer..."
  - Story 02: Camping adventures with partner Max
  - Story 03: The seaside as a place of silence
- Philosophy quote: Full paragraph about documentary approach
- Closing statement: "My goal is to show my couples just how much love and life was present on their wedding day and just how perfect they were as their true, unvarnished selves."

### 1.3 Stories Page (`/stories` - `src/app/stories/page.tsx`)

**Metadata:**

- Title: "Wedding Photography Stories | Chloe Mary Bristol"
- Description: "Explore authentic wedding photography stories captured by Chloe Mary. Contemporary documentary wedding photography showcasing real couples and their beautiful love stories across Bristol and the UK."
- Canonical: https://www.chloemary.com/stories

**Components Used:**

- `StoriesHero` - Hero section
- `StoriesIntro` - Introduction text
- `HorizontalGallery` - Embla carousel with wedding stories
- `StoriesFooter` - Footer with "Interested?" CTA

**Structured Data:**

- CollectionPage schema
- CreativeWork schema

**Content:**

- Hero label: "REAL MOMENTS"
- Hero title: "YOUR STORY BEAUTIFULLY TOLD"
- Hero subtitle: "Each gallery is a celebration of genuine emotion and unforgettable moments that make each day truly special."
- Intro title: "Real Love Stories"
- Intro subtitle: "Authentic moments captured"
- Intro paragraphs: Two paragraphs about wedding stories
- Philosophy quote: "Every love story deserves to be told with honesty, artistry and heart."

**Gallery Stories:**

1. **Hannah & Jake** - "Where creativity meets drama: A stylish South London wedding celebration for creative couple Hannah and Jake. Taking place at the iconic Asylum Chapel & St John Smithfield." Location: St. John & Asylum Chapel, London
2. **Beth & Alex** - "An urban city celebration where modern elegance meets timeless romance. Infused with cinematic flair with the ceremony taking place at the the Ritzy Picture House." Location: 100 Barrington, London
3. **Kat & Patrick** - "A romantic countryside wedding with a modern twist, capturing the charm and warmth of the south of France." Location: Chateau La Durantie, France
4. **Marj & Ellis** - "A family centric city at the Mount Without Bristol for high school sweethearts, enriched with heartfelt nods to the couples Filipino and Greek heritage." Location: The Mount Without, Bristol

### 1.4 Reviews Page (`/reviews` - `src/app/reviews/page.tsx`)

**Metadata:**

- Title: "Kind Words | Chloe Mary"
- Description: "Heartfelt messages from the wonderful couples I've had the privilege of working alongside on their most intimate and special days."
- Canonical: https://www.chloemary.com/reviews

**Components Used:**

- Hero section (inline)
- Testimonials grid (inline)
- `KindWordsFooter` - Footer with "Ready to Add Your Story?" CTA

**Content:**

- Hero label: "KIND WORDS FROM"
- Hero title: "BEAUTIFUL PEOPLE & THEIR MEMORIES"
- Hero subtitle: "Heartfelt messages from the wonderful couples I've had the privilege of working alongside on their most intimate and special days."
- Metrics:
  - Happy couples: 200+
  - Years experience: 7+
  - Google rating: 5.0

**Testimonials (16 total):**

1. **Kat & Patrick** - Long testimonial about preview photos and calming presence
2. **Hannah & Jake** - Featured testimonial about two special days
3. **Charlotte & Sam** - Short testimonial about easy decision
4. **Immy & Mikey** - Featured testimonial about small wedding
5. **Pooja & Michael** - Testimonial about unique style
6. **Laura & Oli** - Testimonial about exceeding expectations
7. **Hayley & Grant** - Featured testimonial about best decision
8. **Amy & Campbell** - Featured testimonial about magic created
9. **Laura & Alex** - Testimonial about perfect fit
10. **Emily & Matt** - Featured testimonial about easy choice
11. **Billie & Alex** - Testimonial about best decision
12. **Alice & Jacob** - Testimonial about best decisions
13. **Alex & Eve** - Featured testimonial with breakdown
14. (Additional testimonials in code)

**Footer:**

- Link to Google reviews

### 1.5 Pricing Page (`/pricing` - `src/app/pricing/page.tsx`)

**Metadata:**

- Title: "Pricing | Chloe Mary"
- Description: "Transparent pricing with no hidden costs. Full day coverage, intimate celebrations & destination weddings."
- Canonical: https://www.chloemary.com/pricing

**Components Used:**

- Hero section (inline with GSAP animations)
- 4 pinned pricing sections
- `PricingFooter` - Footer with "Ready to Begin?" CTA

**Content:**

- Hero label: "PRICING AND"
- Hero title: "EVERYTHING YOU NEED TO KNOW"
- Hero subtitle: "Full day coverage, intimate celebrations & destination weddings."
- Hero statement: "Transparent pricing with no hidden costs. Every package includes professional editing, online gallery access, and personal printing rights."
- Metrics:
  - Starting from: £1,350
  - Delivery timeline: 1-12 weeks
  - Coverage options: 3-12 hours

**Pricing Sections:**

**01. FULL DAY COVERAGE**

- Essential: £3,000 (8 hours)
- Signature: £3,750 (10 hours)
- Film included: Two rolls of black and white
- Additional film: £50 per film roll

**02. SET HOURS (INTIMATE MOMENTS)**

- Focused: £1,350 (3 hours) - Limited peak season availability
- Enhanced: £2,100 (5 hours) - Limited peak season availability
- Extend your story: £375 per additional hour
- Film: £50 per film roll

**03. DESTINATIONS (BEYOND BORDERS)**

- Europe: From £4,500 (10 hours)
- Worldwide: From £5,000 (10 hours)
- Film included: Two rolls of black and white
- Additional film: £50 per film roll

**04. SERVICE INCLUSIONS (COMPLETE EXPERIENCE)**

- Bespoke Extras:
  - Additional hours: £375 per hour
  - Extra rolls of film: £50 per roll
  - Second photographers: £750
  - Heritage albums: £500
  - Extensive 12 hour package: £4,500
- Online Gallery: Preview within 1-2 weeks, final gallery within 12 weeks, unlimited downloads, 6 months online
- Hi-Res Images & Printing Licence: Web size and high resolution, personal printing licence
- Travel Charges Included: All UK travel included, additional charges for Scotland/Ireland/destinations
- Online Store: Professional quality products
- Help & Guidance: Available whenever needed
- Little Black Book: Supplier recommendations
- 35MM FILM: Description of film photography approach

### 1.6 Contact Page (`/contact` - `src/app/contact/page.tsx`)

**Metadata:**

- Title: "Contact | Chloe Mary"
- Description: "Let's connect and create something beautiful together."
- Canonical: https://www.chloemary.com/contact

**Components Used:**

- Hero section (inline)
- Philosophy section
- Process section (5 steps)
- Ready section
- Contact form (Studio Ninja iframe)
- Footer section

**Content:**

- Hero label: "LET'S CONNECT &"
- Hero title: "CREATE SOMETHING BEAUTIFUL"
- Hero subtitle: "Your love story deserves to be captured with authenticity, artistry & heart."
- Philosophy quote: "Every love story is unique, and your wedding photography should be too. I believe in creating images that feel authentically you — not just beautiful, but deeply personal." — Chloe Mary

**Process Steps:**

1. **Initial Enquiry** - Share wedding details, vision, and what drew you to my work
2. **Personal Response** - Thoughtful, personalised response within a few days
3. **Complimentary Consultation** - Relaxed video chat to get to know each other
4. **Secure Your Date** - Sign contract and pay non-refundable deposit
5. **Final Preparations** - Four weeks before: timeline and final balance, final consultation call

**Ready Section:**

- Label: "ARE YOU READY?"
- Title: "Let's Create Something Extraordinary Together"
- Text: "I can't wait to hear about your love story and learn what makes your relationship special."

**Contact Form:**

- Studio Ninja iframe: `https://app.studioninja.co/contactform/parser/0a800fc9-7033-1037-8170-3f8950262227/0a800fc8-7078-10f2-8170-817650cf2af9`
- Lazy loaded with Intersection Observer

**Footer:**

- Text: "Thank you so much for your interest in working with me. I limit my bookings to just 25 couples each year, ensuring I can dedicate the time, attention, and personal care that your love story deserves."
- Signature: "Chloe Mary"

### 1.7 Welcome Page (`/welcome` - `src/app/welcome/page.tsx`)

**Metadata:**

- Robots: noindex, nofollow

**Components Used:**

- `WelcomeHero` - Hero with welcome image
- `WelcomeInfo` - Comprehensive booking guide

**Content:**

- Hero title: "Welcome to Your Journey"
- Hero subtitle: "I'm thrilled to have you here. Let's begin this beautiful adventure together."

**Welcome Info Sections:**

**Introduction:**

- "You're all booked in!"
- Thank you message
- Guide purpose

**1. Formals (Family Heritage Photos)**

- Advice on keeping formals to minimum
- Group photo recommendations (max 8 groups, 15 people per photo)
- Example list of group photos

**2. Confetti (Getting the Perfect Shot)**

- Advice on supplying confetti directly
- Tips: check venue restrictions, amount needed, supplier recommendation (Your Confetti with code YCBYCHLOEMARY for 15% off)
- Natural candid approach

**3. Portraits (Your Special Moments)**

- Advice for camera shy couples
- 15 minutes recommended
- Tips for natural photos

**4. Timeline (Planning Your Day)**

- Timeline needed 4 weeks in advance
- Tips: include travel time, officiant timing, second shooter benefits, group shots timing, speech timing

**5. Final Advice (Making the Most of Your Day)**

- Trust and connection importance
- Weather plans
- Helpful people for group photos
- First kiss moment
- Signing register optional
- Take advice with pinch of salt

---

## 2. Components Inventory

### 2.1 Hero Components

**home-hero** (`src/app/_components/home-hero/home-hero.tsx`)

- Purpose: Main homepage hero section
- Features: Title animation, subtitle, Memento Vivere tagline, animated line
- Animations: GSAP softTitleReveal, softSlideIn, drawLineX, splitTextAnimation

**about-hero** (`src/app/_components/about-hero/about-hero.tsx`)

- Purpose: About page hero with personality traits
- Features: "Nostalgia Lover" title, trait cards, scroll indicator
- Animations: slideInUp, scaleIn, drawLineY

**stories-hero** (`src/app/_components/stories-hero/stories-hero.tsx`)

- Purpose: Stories page hero
- Features: "YOUR STORY BEAUTIFULLY TOLD" title
- Animations: slideInUp, fadeIn

**welcome-hero** (`src/app/_components/welcome-hero/welcome-hero.tsx`)

- Purpose: Welcome page hero
- Features: Welcome image from S3, overlay, title

### 2.2 Content Components

**quote-intro** (`src/app/_components/quote-intro/quote-intro.tsx`)

- Purpose: Homepage introduction with philosophy
- Features: "Hi, I'm Chloe" greeting, tagline, paragraphs, philosophy quote, CTA link to about, intro image from S3
- S3 Prefix: `intro/`

**about-story** (`src/app/_components/about-story/about-story.tsx`)

- Purpose: Personal narrative on about page
- Features: Two images with scroll-based fade, personal story sections, philosophy quote, closing statement
- S3 Prefix: `about`

**stories-intro** (`src/app/_components/stories-intro/stories-intro.tsx`)

- Purpose: Stories page introduction
- Features: "Real Love Stories" title, description paragraphs, philosophy quote
- Animations: Scroll-triggered fade ins

**achievements** (`src/app/_components/achievements/achievements.tsx`)

- Purpose: Display 4 awards/achievements
- Features: Grid layout (2x2 desktop, stack mobile), hover animations, images from S3
- S3 Prefix: `awards`
- Awards:
  1. Professional Photos Top 50 - Wedding photographers in the UK 2025
  2. Who What Wear - Featured on wedding Issue 2025
  3. World's Best Wedding Photos - Top 20 photographers in the UK 2024/2025
  4. La Lista - Trusted member

**expandable-text** (`src/app/_components/expandable-text/expandable-text.tsx`)

- Purpose: Expandable text component
- Features: Show more/less functionality

### 2.3 Gallery Components

**masonry-gallery/HomepageMasonryGallery** (`src/app/_components/masonry-gallery/HomepageMasonryGallery.tsx`)

- Purpose: Homepage horizontal scrolling gallery
- Features: Desktop horizontal scroll with ScrollTrigger pinning, mobile Embla carousel, lightbox on click, progress bar
- S3 Prefix: `homepage/`
- Animations: GSAP ScrollTrigger for horizontal scroll

**horizontal-gallery** (`src/app/_components/horizontal-gallery/horizontal-gallery.tsx`)

- Purpose: Stories page carousel with wedding stories
- Features: Embla carousel, parallax backgrounds, thumbnail navigation, progress bar, arrow controls, story descriptions, Pic-Time links
- S3 Prefix: `stories/`
- Story folders: hannah-jake, beth-alex, kat-patrick, marj-ellis

**s3-gallery** (`src/app/_components/s3-gallery/s3-gallery.tsx`)

- Purpose: Generic S3-based gallery component
- Features: Image loading from S3

### 2.4 Navigation & Layout Components

**navigation** (`src/app/_components/navigation/navigation.tsx`)

- Purpose: Main site navigation
- Features: Logo link, 6 navigation items (Home, About, Stories, Kind Words, Pricing, Contact), mobile burger menu, scroll-based visibility, active state highlighting
- Navigation Items:
  - Home (/)
  - About (/about)
  - Stories (/stories)
  - Kind Words (/reviews)
  - Pricing (/pricing)
  - Contact (/contact)

**footer** (`src/app/_components/footer/footer.tsx`)

- Purpose: Site footer
- Features: "Let's Create Something Beautiful" title, Instagram link (@bychloemary), copyright text
- Instagram: https://instagram.com/bychloemary

**footer-boundary** (`src/app/_components/footer/footer-boundary.tsx`)

- Purpose: Footer wrapper component
- Features: Boundary for footer placement

**footer-wrapper** (`src/app/_components/footer/footer-wrapper.tsx`)

- Purpose: Footer container component

**skip-link** (`src/app/_components/skip-link.tsx`)

- Purpose: Accessibility skip link
- Features: Skip to main content

**lenis-scroll-wrapper** (`src/app/_components/lenis-scroll-wrapper.tsx`)

- Purpose: Smooth scroll wrapper
- Features: Lenis smooth scroll integration

### 2.5 Footer Variants

**stories-footer** (`src/app/_components/stories-footer/stories-footer.tsx`)

- Purpose: Base footer component for stories pages
- Features: Header, text, signature with link
- Usage: Base component

**about-footer** (`src/app/_components/stories-footer/about-footer.tsx`)

- Purpose: About page specific footer
- Header: "Let's Connect"
- Text: About capturing unique love stories

**pricing-footer** (`src/app/_components/stories-footer/pricing-footer.tsx`)

- Purpose: Pricing page specific footer
- Header: "Ready to Begin?"
- Text: About discussing plans

**reviews-footer** (`src/app/_components/stories-footer/reviews-footer.tsx`)

- Purpose: Reviews page specific footer
- Header: "Ready to Add Your Story?"
- Text: About creating something special

### 2.6 Helper Components

**helpers/cascading-text** (`src/app/_components/helpers/cascading-text.tsx`)

- Purpose: Text animation helper
- Features: Cascading text reveal

**helpers/gsap-animations** (`src/app/_components/helpers/gsap-animations.ts`)

- Purpose: GSAP animation utilities
- Features: Comprehensive animation library including:
  - fadeIn, slideInLeft, slideInDown, slideInUp
  - scaleIn, drawLineX, drawLineY
  - staggerFadeIn, splitTextAnimation
  - heroAnimation, scrollAnimation
  - titleReveal, elasticSlideIn, textReveal
  - morphIn, titleSplitReveal, glitchIn
  - softTitleReveal, softSlideIn
  - floatingEntrance, magneticPull, prismaticReveal
  - typewriter, particleBurst, waveText
  - spiralEntrance, liquidMorph
  - createTimeline, createScrollTrigger utilities

### 2.7 SEO Components

**seo/structured-data** (`src/app/_components/seo/structured-data.tsx`)

- Purpose: JSON-LD structured data component
- Features: Organization schema

---

## 3. Content Documentation

### 3.1 Brand Identity

**Business Name:** Chloe Mary  
**Tagline:** "Authentic Modern Love Stories"  
**Philosophy:** "Memento Vivere - Remember to Live"  
**Location:** Bristol, UK (serving London, UK & internationally)  
**Email:** hello@chloemary.com  
**Instagram:** @bychloemary (footer), @chloemary_photo (metadata)  
**Facebook:** chloemary.photography  
**Website:** https://www.chloemary.com

### 3.2 Key Messaging

**Photography Style:**

- Contemporary documentary wedding photographer
- Authentic, candid, natural photography style
- Creative couples who value relaxed, artistic images
- Documentary approach - no lengthy shot lists or stiff posing
- 35mm film + digital photography blend

**Core Philosophy:**

- "Because what truly matters isn't how it all looked, but how it felt."
- "Every love story deserves to be told with honesty, artistry and heart."
- "Every love story is unique, and your wedding photography should be too."

**Approach:**

- Move through the day as a trusted presence
- Observe and document moments as they happen
- Embrace imperfections and beautifully chaotic nature
- Capture stolen glances, fleeting moments, heartfelt connections
- Won't choreograph moments, will be trusted partner
- Artistic direction if needed or wanted

### 3.3 Awards & Recognition

1. **Professional Photos Top 50** - Wedding Photographers UK 2025

   - Link: https://professionalphoto.online/professional-photo-magazine-photography-news/top-50-uk-wedding-photographers-2024-2025/

2. **Who What Wear** - Featured on Wedding Issue 2025

   - Link: https://www.whowhatwear.com/living/wedding/fashion-editor-wedding-directory#section-3-suppliers

3. **World's Best Wedding Photos** - Top 20 Photographers UK 2024/2025

   - Link: https://www.worldsbestweddingphotos.com/best-wedding-photographers/chloe-mary-photo

4. **La Lista** - Trusted member
   - Link: https://www.lalista.com/suppliers/photographer/chloe-mary

### 3.4 Pricing Content

**Starting Price:** £1,350  
**Price Range:** £1,350 - £5,000+  
**Delivery Timeline:** 1-12 weeks  
**Coverage Options:** 3-12 hours

**Full Day Coverage:**

- Essential: £3,000 (8 hours)
- Signature: £3,750 (10 hours)

**Set Hours:**

- Focused: £1,350 (3 hours) - Limited peak season availability
- Enhanced: £2,100 (5 hours) - Limited peak season availability

**Destinations:**

- Europe: From £4,500 (10 hours)
- Worldwide: From £5,000 (10 hours)

**Add-ons:**

- Additional hours: £375/hour
- Film rolls: £50/roll
- Second photographer: £750
- Heritage albums: £500
- 12 hour package: £4,500

### 3.5 Service Inclusions

1. **Online Gallery**

   - Preview within 1-2 weeks
   - Final gallery within 12 weeks
   - Unlimited downloads
   - 6 months online access

2. **Hi-Res Images & Printing Licence**

   - Web size (social media)
   - High resolution (printing)
   - Personal printing licence

3. **Travel Charges Included**

   - All UK travel included
   - Additional charges for Scotland/Ireland/destinations (clearly outlined)

4. **Online Store**

   - Professional quality products
   - Wide range of choices
   - Direct delivery

5. **Help & Guidance**

   - Available whenever needed
   - Questions and advice
   - Inside source of knowledge

6. **Little Black Book**

   - Supplier recommendations
   - Regularly vetted and updated
   - First-hand or highly recommended

7. **35MM Film**
   - Two rolls of black and white included (full day/destination)
   - Additional rolls: £50
   - Description of film photography approach

### 3.6 Process Steps

1. **Initial Enquiry** - Share wedding details, vision, what drew you to my work
2. **Personal Response** - Thoughtful response within a few days with availability and package info
3. **Complimentary Consultation** - Relaxed video chat to get to know each other
4. **Secure Your Date** - Sign contract and pay non-refundable deposit
5. **Final Preparations** - Four weeks before: timeline and final balance, final consultation call

### 3.7 Testimonials

**Total:** 16 testimonials from couples

**Featured Testimonials:**

- Hannah & Jake (featured)
- Immy & Mikey (featured)
- Hayley & Grant (featured)
- Amy & Campbell (featured)
- Alex & Eve (featured)
- Emily & Matt (featured)

**All Testimonials:**

1. Kat & Patrick
2. Hannah & Jake
3. Charlotte & Sam
4. Immy & Mikey
5. Pooja & Michael
6. Laura & Oli
7. Hayley & Grant
8. Amy & Campbell
9. Laura & Alex
10. Emily & Matt
11. Billie & Alex
12. Alice & Jacob
13. Alex & Eve
14. (Additional in code)

**Metrics:**

- Happy couples: 200+
- Years experience: 7+
- Google rating: 5.0

---

## 4. Assets & Media

### 4.1 Public Assets (`/public`)

**Logo & Branding:**

- `/logo.webp` - Main logo (512x512)
- `/cherub.webp` - Cherub logo/icon (200x173)
- `/floral.webp` - Floral decorative image
- `/polaroid.webp` - Polaroid decorative image
- `/brush.svg` - Brush SVG icon

**Favicons:**

- `/favicon.ico`
- `/favicon-16x16.png`
- `/favicon-32x32.png`
- `/apple-touch-icon.png` (180x180)
- `/android-chrome-192x192.png`
- `/android-chrome-512x512.png`

**Manifest Files:**

- `/site.webmanifest` - PWA manifest
- `/browserconfig.xml` - Microsoft browser config

### 4.2 S3 Image Categories

**Image Prefixes:**

- `awards/` - Achievement/award images (4 images)
- `about/` - About page images (2 images)
- `intro/` - Homepage intro image (1 image)
- `homepage/` - Homepage gallery images
- `stories/` - Stories gallery images
  - `stories/hannah-jake/` - Hannah & Jake wedding
  - `stories/beth-alex/` - Beth & Alex wedding
  - `stories/kat-patrick/` - Kat & Patrick wedding
  - `stories/marj-ellis/` - Marj & Ellis wedding
- `welcome/` - Welcome page images
  - `welcome/welcome-pack.jpg` - Welcome pack image

**Image Formats Supported:**

- .jpg, .jpeg, .png, .webp, .gif

**S3 Integration:**

- AWS S3 client
- Signed URLs (1 week expiry default)
- Image filtering by extension
- Category organization by folder structure

---

## 5. API Routes

### 5.1 Image Management APIs

**GET `/api/images`**

- Purpose: List images with optional prefix filter
- Query Parameters:
  - `prefix` (optional): Filter images by S3 prefix/folder
- Response:
  ```json
  {
    "success": true,
    "images": [...],
    "count": number
  }
  ```
- Caching: 1 week (604800s), stale-while-revalidate 1 day

**GET `/api/images/categories`**

- Purpose: Get images organized by category/folder
- Response:
  ```json
  {
    "success": true,
    "categories": {
      "categoryName": [...]
    },
    "categoryCount": number
  }
  ```
- Caching: 1 week (604800s), stale-while-revalidate 1 day

**GET `/api/images/[key]`**

- Purpose: Get signed URL for specific image
- Parameters:
  - `key`: S3 object key (URL encoded)
- Response:
  ```json
  {
    "success": true,
    "key": string,
    "url": string
  }
  ```
- Caching: 1 year, immutable

### 5.2 S3 Integration

**Library:** `src/lib/s3.ts`

**Functions:**

- `listImages(prefix?: string)`: List images from S3 bucket
- `getImageUrl(key: string)`: Get signed URL for specific image
- `getImagesByCategory()`: Get images organized by folders/categories

**Configuration:**

- AWS S3 Client initialization
- Region: `process.env.AWS_REGION` (default: us-east-1)
- Credentials: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
- Bucket: `AWS_S3_BUCKET_NAME`
- Signed URL TTL: `S3_SIGNED_URL_TTL` (default: 604800 = 1 week)
- Custom endpoint: `AWS_S3_ENDPOINT` (optional, for DigitalOcean Spaces, etc.)

**Image Filtering:**

- Filters for: .jpg, .jpeg, .png, .webp, .gif
- Max keys: 1000 per request

---

## 6. Dependencies & Tech Stack

### 6.1 Core Framework

**Next.js:** 15.3.2

- App Router
- Server Components
- Metadata API
- Image Optimization

**React:** 19.0.0

- React DOM: 19.0.0

**TypeScript:** 5

### 6.2 Styling

**Sass:** 1.89.0

- SCSS Modules
- CSS Custom Properties

### 6.3 Animation

**GSAP:** 3.13.0

- Core animation library
- ScrollTrigger plugin
- SplitText plugin
- TextPlugin

**@gsap/react:** 2.1.2

- React hooks for GSAP
- useGSAP hook

**Lenis:** 1.3.4

- Smooth scroll library

### 6.4 UI Components

**@radix-ui/themes:** 3.2.1

- UI component library
- Skeleton component (used in contact form)

**embla-carousel-react:** 8.6.0

- Carousel component
- Used in horizontal gallery and mobile masonry gallery

**focus-trap-react:** 11.0.4

- Focus management
- Used in lightbox

### 6.5 AWS Integration

**@aws-sdk/client-s3:** 3.839.0

- S3 client for listing objects

**@aws-sdk/s3-request-presigner:** 3.839.0

- Signed URL generation

### 6.6 Analytics

**@vercel/analytics:** 1.5.0

- Vercel Analytics integration

### 6.7 Icons

**@phosphor-icons/react:** 2.1.10

- Icon library
- ArrowLeftIcon, ArrowRightIcon, XIcon

**lucide-react:** 0.511.0

- Additional icon library

### 6.8 Utilities

**clsx:** 2.1.1

- Conditional class names

### 6.9 Fonts

**Google Fonts (via next/font):**

- Inter Tight (`--font-inter-tight`)
- Geist Mono (`--font-geist-mono`)
- Poppins (`--font-poppins`)
  - Weights: 300, 400, 500, 600, 700

### 6.10 Development

**ESLint:** 9

- eslint-config-next: 15.3.2
- @eslint/eslintrc: 3

**Type Definitions:**

- @types/node: 20
- @types/react: 19
- @types/react-dom: 19

---

## 7. SEO & Metadata

### 7.1 Global Metadata (`src/app/layout.tsx`)

**Site Information:**

- URL: https://www.chloemary.com
- Title Template: "%s | Chloe Mary"
- Default Title: "Chloe Mary | Bristol Wedding Photographer - Authentic Modern Love Stories"
- Description: "Contemporary documentary wedding photographer based in Bristol, serving London, UK & internationally. Passionate about capturing authentic, candid moments for creative couples who value natural, artistic images. Professional Photos Top 50 UK 2025. Featured on Who What Wear 2025."

**Keywords (140+):**

- Location keywords: bristol, london, uk, bath, somerset, gloucestershire, cotswolds, devon, cornwall
- International: france, italy, spain, portugal, greece, tuscany, provence, amalfi coast, santorini, ibiza, mallorca, paris, rome, barcelona, amsterdam, berlin, prague, vienna
- Style keywords: contemporary documentary, creative, artistic, candid, natural, authentic, unposed, emotional, fine art
- Service keywords: wedding photography packages, pricing, affordable, luxury
- Brand keywords: professional photos top 50, who what wear, authentic love stories, memento vivere photography
- Venue keywords: clifton, harbourside, shoreditch, islington, hackney

**OpenGraph:**

- Type: website
- Locale: en_GB
- Site Name: Chloe Mary
- Title: "Chloe Mary | Bristol & London Wedding Photographer - UK & International"
- Description: "Contemporary documentary wedding photographer based in Bristol, serving London, UK & internationally. Capturing authentic, candid moments for creative couples. Top 50 UK photographer 2025."
- Image: /logo.webp (512x512)

**Twitter Card:**

- Card: summary_large_image
- Title: "Chloe Mary | Bristol & London Wedding Photographer - UK & International"
- Description: "Contemporary documentary wedding photographer based in Bristol, serving London, UK & internationally. Capturing authentic, candid moments for creative couples."
- Creator: @chloemary_photo
- Image: /logo.webp

**Icons:**

- Favicon set (ico, 16x16, 32x32)
- Apple touch icon (180x180)
- Android chrome icons (192x192, 512x512)
- Safari pinned tab (mask-icon)

**Other Metadata:**

- Theme color: #8B6D42
- Geo location: Bristol (51.4545, -2.5879)
- Business type: Photography Services
- Service area: Bristol, London, UK & International
- Price range: £1,350 - £5,000
- Payment accepted: Cash, Credit Card, Bank Transfer
- Currencies: GBP
- Founding date: 2018

### 7.2 Structured Data (JSON-LD)

**Organization Schema:**

- Type: ProfessionalService
- Name: Chloe Mary
- Description: Contemporary documentary wedding photographer
- Email: hello@chloemary.com
- Address: Bristol, England, GB
- Geo coordinates: 51.4545, -2.5879
- Area served: Bristol, London, UK, Europe, International
- Service type: Wedding Photography
- Price range: £1,350 - £5,000
- Awards: 4 awards listed
- Aggregate rating: 5.0 (200+ reviews)
- Social links: Instagram, Facebook

**Person Schema (About Page):**

- Type: Person
- Name: Chloe Mary
- Job title: Wedding Photographer
- Skills: Contemporary Documentary Photography, Candid Wedding Photography, etc.
- Awards: 4 awards listed
- Works for: Chloe Mary organization

**WebSite Schema (Homepage):**

- Type: WebSite
- Search action included
- Publisher: Organization

**WebPage Schema:**

- Type: WebPage
- Breadcrumb lists
- Primary image

**CollectionPage Schema (Stories):**

- Type: CollectionPage
- About: CreativeWork (Wedding Photography Portfolio)

### 7.3 Page-Specific Metadata

Each page has custom:

- Title
- Description
- Keywords (page-specific)
- OpenGraph tags
- Twitter card
- Canonical URL
- Breadcrumb structured data

### 7.4 Robots & Sitemap

**Robots.txt** (`src/app/robots.ts`):

- Allow: /
- Disallow: /api/, /admin/, /\_next/, /private/, /welcome, /\*.json$, /temp/
- Block AI crawlers: GPTBot, ChatGPT-User, GPTBot-User, CCBot, anthropic-ai, Claude-Web
- Sitemap: https://www.chloemary.com/sitemap.xml
- Host: www.chloemary.com

**Sitemap.xml** (`src/app/sitemap.ts`):

- Homepage: priority 1.0, monthly
- About: priority 0.8, monthly
- Stories: priority 0.8, weekly
- Pricing: priority 0.9, monthly
- Reviews: priority 0.7, weekly
- Contact: priority 0.6, monthly

---

## 8. Styling Architecture

### 8.1 SCSS Structure

**Global Styles:**

- `src/app/styles/globals.scss` - Global stylesheet

**Design Tokens:**

- `src/app/_styles/tokens.scss` - Design tokens (spacing, typography, animation timing)
- `src/app/_styles/breakpoints.scss` - Breakpoint mixins
- `src/app/_styles/animations.scss` - Animation utilities

**Component Styles:**

- Component-scoped `.module.scss` files
- 26 SCSS module files total

### 8.2 Design Tokens

**Spacing:**

- xxs: 0.5rem
- xs: 1.25rem
- sm: 1.5rem
- md: 2rem
- lg: 3rem
- xl: 4rem
- xxl: 8rem

**Typography Sizes:**

- xxs: 0.75rem
- xs: 1rem
- sm: 1.2rem
- body: 1.1rem
- md: 1.5rem
- lg: 2rem
- xl: 2.5rem
- xxl: 4.5rem
- hero: 6rem
- display: 8rem

**Letter Spacing:**

- extra-tight: -0.05em
- tight: -0.02em
- normal: 0
- wide: 0.1em

**Animation:**

- Duration: fast (0.5s), normal (1s), slow (1.5s)
- Delays: none, short (0.3s), medium (0.6s), long (0.8s), extra-long (1s)
- Timing: cubic-bezier(0.22, 1, 0.36, 1)

**Line Thickness:**

- small: 1px
- medium: 1.5px
- large: 2px

### 8.3 Breakpoints

**Mobile:** 480px (320px - 480px: Smartphones portrait)  
**Tablet:** 768px (481px - 768px: Tablets portrait, small laptops)  
**Desktop Small:** 1024px (769px - 1024px: Tablets landscape, smaller laptops)  
**Desktop Large:** 1025px+ (Desktop monitors, larger laptops)

**Mixins:**

- `@include breakpoint-up($breakpoint)` - Min-width
- `@include breakpoint-down($breakpoint)` - Max-width
- `@include breakpoint-between($lower, $upper)` - Between breakpoints

---

## 9. Functionality Features

### 9.1 Animations

**GSAP Animations:**

- Scroll-triggered animations (ScrollTrigger)
- Hero entrance animations
- Stagger animations for lists
- Hover effects on cards
- Scroll-based image fades
- Pinned sections (pricing page)
- Text reveal animations (SplitText)
- Line drawing animations
- Scale and morph animations

**Animation Utilities:**

- 30+ animation utility functions
- Timeline creation helpers
- Scroll trigger helpers

**Lenis Smooth Scroll:**

- Smooth scrolling throughout site
- Wrapped in LenisScrollWrapper component

### 9.2 Interactivity

**Navigation:**

- Mobile burger menu
- Scroll-based visibility (hide on scroll down, show on scroll up)
- Active state highlighting
- Smooth transitions

**Image Galleries:**

- Horizontal scrolling gallery (desktop)
- Embla carousel (mobile)
- Lightbox on image click
- Progress bars
- Thumbnail navigation
- Parallax effects

**Forms:**

- Studio Ninja iframe integration
- Lazy loading with Intersection Observer
- Skeleton loading states

**S3 Image Loading:**

- Custom hooks: `useS3Images`, `useS3ImageCategories`
- Automatic image fetching
- Category organization
- Loading and error states

### 9.3 Accessibility

**Features:**

- Skip links
- ARIA labels throughout
- Focus management (focus-trap-react in lightbox)
- Semantic HTML
- Keyboard navigation support
- Screen reader considerations

**Navigation:**

- Keyboard accessible menu
- Focus indicators
- ARIA expanded states

**Images:**

- Alt text generation
- Descriptive alt text
- Proper image sizing

### 9.4 Performance

**Image Optimization:**

- Next.js Image component
- Lazy loading
- Priority loading for above-fold images
- Responsive sizes
- Quality optimization (85-95%)

**Code Splitting:**

- Next.js automatic code splitting
- Dynamic imports where appropriate

**Caching:**

- API route caching (1 week)
- Image URL caching (1 year)
- Stale-while-revalidate strategy

**Loading States:**

- Skeleton loaders
- Loading placeholders
- Error states

---

## 10. Environment Variables

### 10.1 Required Variables

**AWS Configuration:**

- `AWS_REGION` - AWS region (default: us-east-1)
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `AWS_S3_BUCKET_NAME` - S3 bucket name

### 10.2 Optional Variables

**AWS:**

- `AWS_S3_ENDPOINT` - Custom endpoint (for DigitalOcean Spaces, etc.)
- `S3_SIGNED_URL_TTL` - Signed URL expiry in seconds (default: 604800 = 1 week)

---

## 11. External Integrations

### 11.1 Contact Form

**Studio Ninja:**

- Iframe integration
- URL: `https://app.studioninja.co/contactform/parser/0a800fc9-7033-1037-8170-3f8950262227/0a800fc8-7078-10f2-8170-817650cf2af9`
- Lazy loaded
- Skeleton loading state

### 11.2 Image Hosting

**AWS S3:**

- Image storage
- Signed URL generation
- Category-based organization
- Automatic image filtering

### 11.3 Analytics

**Vercel Analytics:**

- Automatic integration
- Page view tracking

### 11.4 Social Media

**Instagram:**

- Link: https://instagram.com/bychloemary
- Displayed in footer

**Facebook:**

- Link: https://www.facebook.com/chloemary.photography
- Used in structured data

**Twitter:**

- Handle: @chloemary_photo
- Used in metadata

### 11.5 External Links

**Pic-Time:**

- Gallery links for wedding stories
- External links in horizontal gallery

**Google Reviews:**

- Link to Google reviews from reviews page

**Award Links:**

- Professional Photos Top 50
- Who What Wear
- World's Best Wedding Photos
- La Lista

---

## Summary

This audit documents:

- **7 pages** with full content and metadata
- **30+ components** with descriptions and usage
- **140+ SEO keywords** and comprehensive metadata
- **16 testimonials** from couples
- **4 awards/achievements** with links
- **Complete pricing structure** with all packages and add-ons
- **S3 image integration** with multiple categories
- **Comprehensive animation system** with 30+ utilities
- **Full styling architecture** with design tokens
- **API routes** for image management
- **External integrations** (Studio Ninja, AWS S3, Vercel Analytics)

All content, components, assets, dependencies, and functionality have been catalogued for reference during the rebuild process.

---

**End of Audit Document**
