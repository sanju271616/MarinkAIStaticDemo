# Brand Compass

# MARINKAI — LOVABLE MASTER PROMPT

## Premium Enterprise Brand Intelligence Platform

---

## 1. YOUR ROLE

Act as a **world-class product designer, UX strategist, design-system architect, and senior frontend engineer**.

Do not create a generic SaaS dashboard.

Design and build a **premium enterprise brand intelligence platform** that feels like a product used by senior brand directors, marketing strategists, and executives.

The result must look **intentional, sophisticated, restrained, highly usable, and production-ready**.

Every design decision should answer:

* What does the user need to understand first?
* What is the most important information on this screen?
* What action should the user naturally take next?
* Can an executive understand the page within 5 seconds?
* Does the interface feel premium without becoming decorative?

---

# 2. PRODUCT

### Product name

**Marinkai**

### Product

Enterprise Brand Intelligence Platform

### Tagline

**Clarity in the Noise.**

### Supporting statement

**Turn millions of digital signals into confident marketing decisions.**

### Demo market

United States

### Demo category

Skincare

### Demo brands

* CeraVe
* Allies of Skin
* La Roche-Posay
* e.l.f
* EltaMD
* The Ordinary
* Neutrogena
* Olay
* Dove

### Competitive set

Use these 5 brands for competitive analysis:

* Allies of Skin — primary brand
* CeraVe
* EltaMD
* e.l.f
* La Roche-Posay

---

# 3. PRODUCT EXPERIENCE

Marinkai should feel like:

**Executive intelligence + editorial sophistication + analytical precision.**

Do NOT make it feel like:

* a Bootstrap admin template
* a generic Material dashboard
* a startup landing-page template
* an AI-generated dashboard
* a collection of cards
* a developer prototype
* a colorful analytics template

The visual language should communicate:

**Trust → Intelligence → Clarity → Action**

The interface should be calm and confident rather than flashy.

---

# 4. DESIGN PHILOSOPHY

Follow these principles throughout the entire application.

### 4.1 Instant comprehension

An executive should understand:

1. What page am I on?
2. What am I looking at?
3. What changed?
4. What matters?
5. What can I investigate?

within approximately 5 seconds.

### 4.2 Hierarchy before decoration

Visual hierarchy is more important than visual effects.

Prioritize:

**Page title → primary insight → supporting data → controls → secondary information**

Do not make every element visually loud.

### 4.3 Data density without clutter

The application contains a lot of information.

Use:

* whitespace
* alignment
* typography
* grouping
* subtle borders
* restrained color
* consistent spacing

to make dense information easy to scan.

### 4.4 Progressive disclosure

Do not show everything at once.

Use:

**Context → Summary → Comparison → Investigation → Detail**

Users should be able to go deeper when needed without overwhelming the initial view.

### 4.5 Every visualization must communicate something

Never add charts simply because dashboards usually contain charts.

Every chart must answer a meaningful question.

---

# 5. VISUAL DIRECTION

## Overall aesthetic

Create a:

**Dark-first premium editorial enterprise interface.**

Characteristics:

* sophisticated
* minimal
* cinematic
* data-rich
* calm
* highly structured
* premium
* modern
* trustworthy

Use subtle glass surfaces where appropriate, but **do not overuse glassmorphism**.

Glassmorphism should never reduce readability.

Avoid:

* excessive blur
* excessive transparency
* neon effects
* excessive gradients
* giant rounded cards
* decorative animations
* glowing borders everywhere
* excessive shadows

---

# 6. COLOR SYSTEM

Use CSS variables so the entire application is controlled by one design system.

### Dark theme

```text
Canvas: #050C11
Surface: #0E141A
Surface Elevated: #121A22
Sidebar: #0B1116
Primary Gold: #D7A84F
Secondary Gold: #B8892F
Intelligence Teal: #16A5A0
Primary Text: #F8F8F8
Muted Text: rgba(248,248,248,0.58)
Subtle Text: rgba(248,248,248,0.38)
Border: rgba(255,255,255,0.06)
```

### Metric colors

```text
Digital Impact Score: #4A7FD4
Prominence: #7B6FD4
Affinity: #16A5A0
Advocacy: #D4845A
```

### Strategic quadrant colors

```text
Strengthen / Continue: #16A5A0
Grow / Opportunity: #4A7FD4
Mitigate / Not Working: #D4845A
Deprioritize: #9B9590
```

Use colors semantically.

Do not introduce random colors.

---

# 7. TYPOGRAPHY

Use:

### Display / headings

**DM Serif Display**

Use for:

* page titles
* major headings
* hero headlines
* KPI values
* strategic section headings

### UI / body

**Inter**

Use for:

* navigation
* labels
* controls
* tables
* metadata
* descriptions
* tooltips

### Typography hierarchy

```text
Page title: 32px
Section title: 20px
KPI value: 28–36px
Body: 14–15px
Secondary text: 12–13px
UI labels: 11–13px
```

Do not use too many font sizes.

---

# 8. SPACING SYSTEM

Use a consistent spacing scale.

Base spacing:

```text
4
8
12
16
20
24
32
40
48
64
```

Layout:

```text
Maximum content width: 1680px
Sidebar expanded: 260px
Sidebar collapsed: 84px
Header: 80px
Page horizontal padding: 48px
Card padding: 24–28px
Grid gap: 16–24px
Card radius: 18–22px
Control radius: 14px
```

Do not randomly change spacing between pages.

---

# 9. RESPONSIVE DESIGN

Desktop is the primary experience.

Support:

* 1280px
* 1440px
* 1600px
* 1920px
* ultrawide screens

At smaller desktop widths:

* reduce spacing intelligently
* preserve hierarchy
* never allow controls to collide
* keep important metrics visible
* allow appropriate internal scrolling only where necessary

Do NOT simply shrink everything.

The design must adapt intelligently.

Mobile is secondary and can use a simplified layout, but desktop must be exceptional.

---

# 10. APPLICATION FLOW

```text
/login
   ↓
/landing
   ↓
/dashboard/overview
   ↓
/dashboard/competitive-context
/dashboard/positioning-messaging
/dashboard/campaign-themes
/dashboard/creative-formats
/dashboard/platforms
/dashboard/future-focus
```

Also provide:

```text
/dashboard/settings
/dashboard/profile
```

---

# 11. LOGIN PAGE

Route:

`/login`

## Experience

Create a cinematic enterprise login experience.

### Layout

65% visual hero
35% authentication panel

### Hero

Use:

* dark atmospheric background
* subtle abstract texture/noise
* restrained gradient
* Marinkai logo
* premium typography

Headline:

**Clarity in the Noise.**

Highlight **Noise** using the gold accent.

Supporting text:

**Turn millions of digital signals into confident marketing decisions.**

### Trust cards

Display four subtle glass cards:

1. Enterprise Security
2. Trusted Intelligence
3. Role-based Access
4. Confidential by Design

Each contains:

* icon
* title
* short description

Do not make these cards visually dominant.

### Login panel

Include:

* Welcome back
* Email
* Password
* Remember me
* Forgot password
* Sign In
* Continue with Microsoft
* theme toggle

Demo credentials:

```text
Email: demo@marinkai.com
Password: demo
```

After successful sign-in:

`/landing`

### Login interaction

Include:

* input focus states
* validation
* disabled state
* loading state
* subtle button feedback
* keyboard accessibility

Do not use exaggerated animations.

---

# 12. LANDING / CONTEXT SETUP

Route:

`/landing`

Purpose:

Allow the user to define the intelligence context before entering the dashboard.

### Layout

Two-column layout:

Left = narrative/setup

Right = interactive intelligence preview

### Left

Title:

**Configure your intelligence workspace**

Create a vertical 3-step progression:

1. Select Market
2. Select Category
3. Select Brand

Each step should have:

* number/status
* title
* short description
* connecting line

### Right

Create a premium preview panel.

Selectors:

* Market
* Category
* Brand

Values:

Market:

* United States
* United Kingdom
* Canada

Category:

* Skincare
* Haircare
* Personal Care

Brand:

* CeraVe
* Allies of Skin
* La Roche-Posay
* e.l.f
* EltaMD
* The Ordinary
* Neutrogena
* Olay
* Dove

Show four preview KPIs:

* Digital Impact Score
* Prominence
* Affinity
* Advocacy

Also show:

**Performance trajectory — Digital Impact Score**

with a small 6-month trend visualization.

Add capability tags:

* Competitive Benchmarking
* Paid Media Intelligence
* Organic Conversation
* Category Trends
* Executive Reporting

Primary CTA:

**Continue to Dashboard →**

CTA navigates to:

`/dashboard/overview`

---

# 13. GLOBAL DASHBOARD SHELL

Every dashboard page must use the same shell.

## Sidebar

Expanded width:

260px

Collapsed width:

84px

### Navigation

BRAND IMPACT

* Overview
* Competitive Context

BRAND DEEP DIVE

* Positioning & Messaging

DIGITAL ACTIVITY

* Campaign Themes
* Creative Formats
* Platforms

FUTURE FOCUS

* Future Focus

Bottom:

* Settings
* Profile

### Sidebar behavior

Expanded:

* logo + text
* icon + label

Collapsed:

* logo mark
* icon only

Include:

* tooltip on collapsed items
* active state
* hover state
* smooth collapse animation

Active navigation:

* subtle gold accent
* thin gold left indicator
* very subtle background tint

Do not make the active state excessively bright.

---

# 14. GLOBAL HEADER

Height:

80px

Left:

Breadcrumb:

`Intelligence → Current Page`

Right:

* Search
* Date Slicer
* Theme Toggle
* Notifications
* Profile

All controls must share:

* same height
* same radius
* same typography
* same border treatment
* same hover behavior

---

# 15. DATE SLICER

Create a premium custom date selector.

Trigger:

`May '25`

Popover contains:

Tabs:

* Month
* Quarter
* Rolling 3 Months
* Year

Then:

* year selector
* period grid

Default:

**May 2025**

Supported:

* 2023
* 2024
* Jan–May 2025

Selected state:

Dark mode → gold

Light mode → teal

The date slicer must visually match every other dropdown.

Never use native browser `<select>`.

---

# 16. EXECUTIVE UX RULE

Every dashboard page should communicate:

### WHAT?

What is happening?

### WHY?

Why is it happening?

### SO WHAT?

Why does it matter?

### NOW WHAT?

What should the user investigate or consider next?

Do not necessarily display these as literal labels.

Build the information hierarchy around them.

---

# 17. OVERVIEW PAGE

Route:

`/dashboard/overview`

Title:

**Digital Impact Overview**

Subtitle:

Selected brand in gold.

Example:

**CeraVe**

### Top controls

Brand selector.

### KPI section

Four equal KPI cards:

1. Digital Impact Score
2. Prominence
3. Affinity
4. Advocacy

Each card:

* metric name
* score
* rank
* growth percentage
* trend indicator
* metric accent
* subtle top accent line

DIS is the primary KPI.

Do not make every KPI equally visually dominant.

### Example data

CeraVe — May 2025:

```text
Digital Impact Score: 22.2
Rank: #1
Growth: -55.8%

Prominence: 41.1
Rank: #1
Growth: -28.9%

Affinity: 19.9
Rank: #1
Growth: -57.3%

Advocacy: 4.9
Rank: #27
Growth: -89.0%
```

### Main visualization

Large:

**Impact Metrics Trend**

Features:

* 12-month trend
* Jun '24 → May '25
* Score / Rank toggle
* four metric lines
* clear legend
* hover tooltip
* readable axes

The chart should dominate the page rather than being squeezed between unnecessary cards.

---

# 18. COMPETITIVE CONTEXT

Route:

`/dashboard/competitive-context`

Title:

**Competitive Context**

Controls:

* Brand
* Grid / Chart
* Compare

### Grid view

Default.

Create one premium comparison matrix.

Columns:

* Digital Impact Score
* Prominence
* Affinity
* Advocacy

Rows:

* Allies of Skin
* CeraVe
* EltaMD
* e.l.f
* La Roche-Posay

Primary brand:

**Allies of Skin**

Use gold emphasis.

Each cell should show:

* score
* rank
* growth

Make the matrix extremely scannable.

### Chart view

Allow:

* metric selection
* score/rank toggle
* 12-month trend

Use restrained brand differentiation.

Do not turn the chart into a rainbow.

---

# 19. POSITIONING & MESSAGING

Route:

`/dashboard/positioning-messaging`

Title:

**Positioning & Messaging**

Subtitle:

**What is driving or dragging my Impact Metrics?**

Controls:

* Metric
* Brand
* Quadrant
* Top 20 / Top 10

### Main visualization

Interactive strategic quadrant.

X:

**Velocity (%)**

Y:

**Net Sentiment**

Bubble size:

**Prominence volume**

Four zones:

```text
Strengthen
Grow
Mitigate
Deprioritize
```

Topics:

* Skin Barrier
* Dermatologist Recommended
* Sustainability
* etc.

Interaction:

Hover:

* highlight bubble
* show tooltip
* slightly enlarge bubble

Click:

* select topic
* visually emphasize it
* enable Drill Down

Do not use distracting animations.

---

# 20. CAMPAIGN THEMES

Route:

`/dashboard/campaign-themes`

Title:

**Buzz around Brand Campaign Themes**

Controls:

* Brand
* Quadrant
* Top 20 / Top 10

Quadrant chart:

X:

Velocity

Y:

Net Sentiment

Bubble size:

Impressions

Example topics:

* Barrier Repair
* Peptide Science
* Influencer Collaboration
* Celebrity Partnership

Quadrants:

* Continue
* Opportunity to Drive
* Not Working
* Reinvest in Other Themes

Use the same `QuadrantChart` component and interaction behavior as Positioning.

---

# 21. CREATIVE FORMATS

Route:

`/dashboard/creative-formats`

Title:

**Creative Formats**

Controls:

* Brand
* Compare

Main panel:

**Digital Campaign Performance by Format**

Rows:

5 brands

Columns:

* Display / Banner
* Videos

Each cell:

* Creative count
* Impressions

Use compact notation:

`141.1M`

not:

`141,086,056`

Hover should show exact numbers.

---

# 22. PLATFORMS

Route:

`/dashboard/platforms`

Title:

**Platforms**

Controls:

* Brand
* Compare

Main panel:

**Digital Campaign Performance by Platform**

Columns:

* Facebook
* Instagram
* YouTube
* TikTok
* X

Rows:

5 brands

Cells:

* Creatives
* Impressions

Zero values:

Show subtly faded.

Do not make empty states look like errors.

Use accurate platform icons.

---

# 23. FUTURE FOCUS

Route:

`/dashboard/future-focus`

Title:

**Future Focus**

Purpose:

Identify emerging category opportunities.

No brand filter.

Quadrant chart:

X:

Velocity

Y:

Net Sentiment

Bubble size:

Total post volume

Example themes:

* Skin Barrier Science
* Microbiome Skincare
* AI Skin Analysis
* Blue Light Protection

Quadrants:

* Top Interest Themes
* Possible Opportunities
* Wait & Watch
* Lower Priority

This page should visually feel slightly more exploratory than the historical performance pages while remaining within the same design system.

---

# 24. SETTINGS

Route:

`/dashboard/settings`

Create a polished placeholder.

Show:

* Market
* Category
* Brand
* Period

Use the same visual language as the rest of the application.

---

# 25. PROFILE

Route:

`/dashboard/profile`

Create a polished placeholder.

Include:

* avatar
* name
* role
* email
* workspace

Keep it simple.

---

# 26. COMPONENT ARCHITECTURE

Build reusable components.

Required:

```text
BrandLogo
Sidebar
TopHeader
Breadcrumb
PageHeader
KpiCard
DateSlicer
DashboardSelect
SegmentToggle
ViewToggle
MatrixPanel
MatrixCell
QuadrantChart
TrendChart
GrowthPill
GlassCard
PlatformIcon
ThemeToggle
Tooltip
Modal
```

Do not duplicate UI logic across pages.

Create shared design tokens.

---

# 27. INTERACTION STATES

Every important interactive component must support:

### Default

Clean and quiet.

### Hover

Subtle visual response.

### Focus

Accessible visible focus ring.

### Selected

Clear but restrained.

### Disabled

Reduced contrast.

### Loading

Use skeleton/loading state where appropriate.

### Empty

Explain why there is no data.

### Error

Provide a useful recovery message.

### Success

Use subtle confirmation.

Do not rely only on color to communicate state.

---

# 28. MOTION DESIGN

Use motion sparingly.

Allowed:

* 200–400ms transitions
* subtle fade
* 8px upward entrance
* gentle hover lift
* sidebar transition
* theme transition
* popover transitions
* chart interaction

Avoid:

* bouncing
* spinning decorative elements
* excessive parallax
* flashy page transitions
* excessive particle effects
* animations that delay productivity

Motion should communicate **state**, not decoration.

---

# 29. LIGHT MODE

Provide a polished light theme.

Do NOT simply invert colors.

The light theme must be separately designed using the same:

* hierarchy
* spacing
* typography
* component architecture

Use:

* warm/light neutral surfaces
* dark text
* teal/gold accents
* subtle borders
* restrained shadows

Dark and light themes should both look intentionally designed.

---

# 30. ACCESSIBILITY

Follow strong accessibility practices.

Include:

* semantic HTML
* keyboard navigation
* visible focus states
* ARIA labels
* sufficient contrast
* accessible dropdowns
* accessible tooltips
* accessible chart information where practical
* never rely only on color

---

# 31. DATA VISUALIZATION RULES

Charts must prioritize readability.

Use:

* clear labels
* restrained grid lines
* meaningful legends
* useful tooltips
* consistent metric colors
* sensible axis formatting

Do not:

* overload charts
* use unnecessary 3D
* use decorative gradients
* use excessive labels
* use rainbow palettes
* use meaningless animations

Charts should feel like **executive analytical tools**, not marketing graphics.

---

# 32. DESIGN SYSTEM CONSISTENCY

The following must remain identical across pages:

* button height
* control height
* border radius
* dropdown styling
* typography
* sidebar behavior
* page header
* card treatment
* tooltip style
* spacing system
* metric colors
* hover states

A user should immediately know that every screen belongs to the same product.

---

# 33. ANTI-GENERIC-AI RULES

This is extremely important.

Do NOT produce:

* generic purple AI gradients
* excessive glassmorphism
* huge rounded cards
* excessive shadows
* random gradients
* excessive icons
* unnecessary illustrations
* stock photos
* fake 3D graphics
* meaningless decorative charts
* excessive badges
* rainbow colors
* oversized buttons
* excessive empty space
* dense unreadable tables
* Bootstrap styling
* Material UI default styling
* browser-native selects
* inconsistent controls
* random font combinations

The product must feel **designed by a senior product design team**, not generated from a template.

---

# 34. INFORMATION DENSITY RULE

Do not solve every problem by creating another card.

Prefer:

* grouped information
* matrices
* sections
* typography
* inline statistics
* charts
* whitespace

Use cards only when they create meaningful separation.

---

# 35. EXECUTIVE-FIRST DESIGN

The primary persona is a senior brand/marketing leader.

Therefore:

Do not force executives to interpret raw data before understanding the message.

Prioritize:

**Signal → Context → Evidence → Exploration**

Example:

Instead of showing only:

`Advocacy = 4.9`

make the hierarchy allow the user to immediately see:

`Advocacy 4.9`
`Rank #27`
`↓ 89.0%`

Then allow exploration into the underlying trend.

---

# 36. MOCK DATA

Use realistic static mock data.

No backend is required.

Brands:

```text
CeraVe
Allies of Skin
La Roche-Posay
The Ordinary
Neutrogena
Olay
Dove
EltaMD
e.l.f
```

Every brand must have:

```text
score
rank
growth
```

Create realistic:

* trend data
* impression counts
* creative counts
* platform data
* campaign themes
* positioning topics
* future-focus topics

Do not use obviously fake values such as:

`1234567`

Prefer realistic values such as:

`141.1M`

---

# 37. TECH STACK

Use:

```text
React
TypeScript
Vite
Tailwind CSS
CSS custom properties
Recharts
Lucide React
React Router
Framer Motion
```

Use static constants for mock data.

Structure the code cleanly.

Components should be reusable and maintainable.

---

# 38. PERFORMANCE

Keep the application fast.

Avoid unnecessary:

* re-renders
* oversized assets
* expensive animations
* unnecessary dependencies

Charts should render efficiently.

Do not sacrifice performance for decorative effects.

---

# 39. FINAL QUALITY BAR

Before considering the implementation complete, review every screen as if it were being presented to a:

**Fortune 500 Chief Marketing Officer.**

Ask:

* Does this look expensive?
* Does it look trustworthy?
* Can I understand it immediately?
* Is the hierarchy obvious?
* Is anything visually unnecessary?
* Are the controls consistent?
* Does the data feel credible?
* Does every interaction feel intentional?
* Does it look like one product?
* Does anything look AI-generated or template-based?

If the answer to any of these is no, improve the design before finishing.

---

# 40. DELIVERABLES

Build:

* Login
* Landing / Context Setup
* Dashboard Shell
* Overview
* Competitive Context
* Positioning & Messaging
* Campaign Themes
* Creative Formats
* Platforms
* Future Focus
* Settings
* Profile
* Light / Dark themes
* Responsive desktop behavior
* Reusable component system
* Realistic skincare mock data
* Interactive charts
* Interactive filters
* Accessible interactions
* Loading / empty / error states

All routes must work.

All navigation must work.

All controls should feel interactive.

No dead-looking prototype elements unless explicitly marked as decorative/demo.

---

# 41. MOST IMPORTANT INSTRUCTION

**Do not rush into generating the UI.**

First establish:

1. Information architecture
2. Design tokens
3. Component system
4. Visual hierarchy
5. Navigation model
6. Interaction patterns

Then implement the screens consistently.

The final result should feel like a **cohesive enterprise product**, not seven individually designed pages.

---

# 42. ONE-LINE PRODUCT DIRECTION

Build **Marinkai**, a premium enterprise brand intelligence platform that combines editorial luxury, executive clarity, and analytical precision — helping marketing leaders move from millions of digital signals to confident strategic decisions.

**The final experience should feel calm, intelligent, premium, data-rich, and unmistakably human-designed.**

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://marinkai-brand-clarity.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/410ddb03-2309-4636-9587-a624eed58dba).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
