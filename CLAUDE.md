# VOM Harvest Committee Financial Reporting Application

## Application Overview

This is a comprehensive financial reporting web application built for the C&S Movement VOM Harvest Committee 2025. It tracks and displays detailed income collections and expense management for a major church committee event covering multiple harvest activities, children's programs, and a dedication ceremony.

**Type**: Financial Dashboard & Reporting System
**Purpose**: Track, analyze, and report on event income/expenses with print-friendly output

---

## Technology Stack

### Core Framework
- **Next.js 15.5.4** - React framework with App Router (latest with Turbopack support)
- **React 19.1.0** - UI component library
- **TypeScript 5** - Type-safe development

### UI & Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React 0.545.0** - Icon library (imported but not heavily used)
- **Recharts 3.2.1** - Data visualization library for charts and graphs

### Utilities
- **XLSX 0.18.5** - Excel file generation (imported but primarily uses CSV)

### Build Configuration
- **Turbopack** - Next.js turbo build system for faster compilation
- **PostCSS 4** - CSS processing

---

## Architecture & Directory Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with PrintModeProvider
│   ├── page.tsx                 # Home page (redirects to Summary section)
│   ├── globals.css              # Global styles
│   ├── income/page.tsx          # Income details page
│   ├── expenses/page.tsx        # Expense details page
│   ├── analysis/page.tsx        # Financial analysis page
│   ├── harvest/page.tsx         # Children harvest analysis page
│   └── report/page.tsx          # Comprehensive report page
│
├── components/                   # Reusable UI components
│   ├── Layout.tsx               # Navigation tabs and print mode toggle
│   ├── Header.tsx               # Report header with download buttons
│   └── BalanceCard.tsx          # Card showing financial position
│
├── sections/                     # Page content sections
│   ├── index.tsx                # Home page composition
│   ├── Summary.tsx              # Overview with charts and metrics
│   ├── Income.tsx               # Income breakdown tables
│   ├── Expenses.tsx             # Expense breakdown tables
│   ├── Report.tsx               # Comprehensive report view
│   ├── Analysis/                # Analysis section
│   │   ├── index.tsx
│   │   ├── Chart.tsx            # Analysis charts
│   │   └── FinancialCards.tsx   # Analysis cards
│   └── Harvest/                 # Harvest analysis section
│       ├── index.tsx
│       └── Analysis.tsx
│
├── constants/                    # Static data definitions
│   ├── incomeData.ts            # All income sources and amounts
│   └── expensesDetails.ts       # All expense categories and items
│
├── hooks/                        # Custom React hooks
│   ├── useFinancialCalculations.ts  # Memoized financial calculations
│   └── usePrintMode.tsx             # Print mode state management
│
├── context/                      # React Context for state management
│   └── PrintModeContext.tsx     # Print mode provider and hook
│
└── utils/                        # Utility functions
    ├── calculations.ts          # Currency formatting, totaling functions
    └── downloads.ts             # CSV/text export functions
```

---

## Key Patterns & Conventions

### 1. Data Flow Architecture

```
Constants (incomeData, expenseDetails)
    ↓
useFinancialCalculations Hook (memoized calculations)
    ↓
Components (Summary, Income, Expenses, Analysis)
    ↓
UI Display & Charts
```

**Pattern**: Single source of truth - all data originates from constants, calculated once in custom hook, used throughout app

### 2. State Management

- **Global State**: PrintModeContext for print mode toggle
- **Local State**: Component-level state where needed
- **Data**: Static constants, no external API calls
- **Persistence**: Print mode persisted to localStorage

### 3. Print Mode Feature

The application has a sophisticated print mode system:
- Toggle button in Navigation component
- Persists preference to localStorage
- Affects styling throughout (conditional Tailwind classes with `print:` prefix)
- CSS print media queries for optimized print layout
- Print mode hides interactive elements and adjusts typography

### 4. Component Organization

- **Layout Component**: Sticky navigation with tab-based routing
- **Header Component**: Report title and download buttons
- **Section Components**: Modular page sections that can be reused
- **Calculation Hook**: Centralized financial math

### 5. Type System

Global type definitions in `index.d.ts`:

```typescript
IncomeItem: { name: string; amount: number }
ExpenseItem: { item: string; planned: number; actual: number; note?; id? }
IncomeData: Organized by category (harvestCommittee, sponsors, etc.)
ExpenseDetails: Organized by event (childrenHarvest, dedicationLogistics, etc.)
BudgetData: Planned vs actual comparison structure
ChartDataItem: Flexible data format for recharts
```

---

## Data Structure & Flow

### Income Categories (incomeData.ts)

1. **Harvest Committee** - Direct committee member contributions
2. **Sponsors** - External sponsorships and donations
3. **Adult Contributions** - Adult member donations
4. **Children Chairpersons** - Children leadership donations
5. **Children Members** - General children member donations
6. **Children Harvest Day** - Single number value
7. **Dedication Harvest Day** - Additional harvest collection
8. **Children Outstanding** - Pending/promised contributions

### Expense Categories (expensesDetails.ts)

1. **Family Harvest** - Event envelopes and materials (2 items)
2. **Children Harvest** - Food, supplies, decorations (30+ items)
3. **Praise Night** - Special music event costs
4. **Dedication Logistics** - Transportation, printing, signage (40+ items)
5. **Dedication Entertainment** - Food, beverages, entertainment (50+ items)

Each expense tracks: planned budget vs actual spent, with optional notes and donation flags

### Calculations (useFinancialCalculations.ts)

Memoized calculations include:
- **Income Totals**: Per category and overall
- **Expense Totals**: Per category and overall
- **Analysis Metrics**: Net position, budget percentage utilization
- **Budget Data**: Planned vs actual for each expense category

---

## Key Files Breakdown

### Core Files

1. **src/app/layout.tsx**
   - Root layout wrapper
   - PrintModeProvider setup
   - Navigation and page container
   - Navigation sticky positioning

2. **src/context/PrintModeContext.tsx**
   - Print mode state management
   - localStorage persistence
   - Hydration-safe implementation
   - Dual export: PrintModeProvider and usePrintMode hook

3. **src/hooks/useFinancialCalculations.ts**
   - Single-source-of-truth for all math
   - Memoized to prevent unnecessary recalculations
   - Returns 20+ calculated values
   - Dependencies: incomeData, expenseDetails

4. **src/components/Layout.tsx**
   - Navigation tabs (Summary, Income, Expenses, Analysis, Harvest, Report)
   - Print mode toggle button
   - Responsive mobile/desktop layout
   - Active tab highlighting

5. **src/sections/Summary.tsx**
   - Dashboard overview page
   - 4 metric cards (Income, Expenses, Surplus, Outstanding)
   - 2 interactive charts (Income distribution pie, Budget performance bar)
   - Financial summary tables

### Visualization

The app uses Recharts for:
- **Pie Charts**: Income distribution by source
- **Bar Charts**: Planned vs actual budget comparison
- **Tooltips**: Currency-formatted hover information

### Export Functions (src/utils/downloads.ts)

- **CSV Export**: Structured data export with categories and subtotals
- **Text Export**: Comprehensive formatted report with analysis and insights

---

## Development Workflow

### Available Scripts

```bash
npm run dev      # Start dev server with Turbopack (localhost:3000)
npm run build    # Build for production (with Turbopack)
npm start        # Start production server
```

### Key Development Patterns

1. **Component-First Development**
   - Each page is built from sections
   - Sections are composed from smaller components
   - Styles use Tailwind with responsive prefixes (sm:, md:, lg:)

2. **Responsive Design**
   - Mobile-first approach
   - Print-first print mode with `print:` prefix utilities
   - Breakpoints: sm, md, lg

3. **TypeScript Usage**
   - Strict mode enabled
   - Path aliases configured (@/ points to src/)
   - Global interface definitions in index.d.ts

4. **Client Components**
   - All interactive components marked with 'use client'
   - Uses React hooks for state (useState, useEffect, useMemo, useContext)

---

## Important Considerations

### Print Mode Design

The application has extensive print mode support:
- Removes colored gradients, uses black and white
- Hides interactive buttons and navigation
- Adjusts spacing and sizing (`print:` Tailwind prefix)
- Optimized for document printing and PDF export
- Active tab shows black background instead of gradient

### Data Management

- **No Database**: All data is in TypeScript constants
- **No API**: Fully client-side application
- **No Authentication**: Public financial reporting app
- **Update Method**: Direct code changes to constants

### Performance Optimizations

- `useFinancialCalculations` memoization prevents recalculations
- PrintModeProvider hydration-safe with mounted check
- Responsive images and lazy loading (Recharts handles chart rendering)

### Browser Compatibility

- Uses ES2017 target
- CSS Grid and Flexbox for layouts
- LocalStorage for persistence
- Print CSS media queries

---

## Styling Architecture

### Tailwind CSS with Print Mode

```typescript
// Pattern used throughout
className={`${
  printMode 
    ? 'bg-white border-2 border-black text-black' 
    : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
} ...`}

// Print-specific utilities
className='hidden print:block'  // Show only in print
className='print:hidden'        // Hide in print
className='print:text-sm'       // Smaller text when printing
className='print:p-2'           // Reduced padding for print
```

### Color Scheme

**Normal Mode**: Gradient backgrounds (blue, purple, green, red)
**Print Mode**: Pure black borders, white backgrounds, black text

---

## UI Components Overview

### BalanceCard
- Displays main financial position
- Shows net position in large text
- Includes outstanding amount
- Conditional styling for print mode

### Charts (Recharts)
- Responsive container sizing
- Print mode reduces height for space efficiency
- Currency formatting on tooltips
- Color-coded by category

### Tables
- Organized by category
- Planned vs actual comparison
- Notes for special items (donations, etc.)
- Subtotals per category

---

## Unique Features

1. **Dual Download Options**
   - CSV for spreadsheet analysis
   - Text report for human-readable format

2. **Children Harvest Tracking**
   - Separate tracking for children contributions
   - Outstanding amounts tracking
   - Dedicated children expense category

3. **Event-Based Organization**
   - Separate budgets for different events
   - Dedication ceremony with entertainment and logistics
   - Praise night as separate event

4. **Print-Optimized Reports**
   - Full page print layout support
   - Print mode preview before printing
   - Optimized spacing and font sizes

---

## Configuration Files

### tsconfig.json
- Target ES2017
- Module resolution: bundler (Next.js standard)
- Path alias: @/* → src/*
- Strict mode enabled

### next.config.ts
- Basic Next.js configuration
- Turbopack enabled for builds

### tailwind.config
- PostCSS 4 based
- Default Tailwind theme
- Print-mode utilities available

---

## Notes for Contributors

1. **Adding New Data**: Update constants in src/constants/
2. **Adding New Pages**: Create in src/app/ with corresponding section in src/sections/
3. **Adding Components**: Place in src/components/, import to sections
4. **Calculations**: Keep in useFinancialCalculations hook
5. **Styling**: Use Tailwind, remember `print:` prefix for print mode support
6. **Types**: Add to index.d.ts for global accessibility

---

## Recent Changes

- Optimized print layout for maximum compactness
- Enhanced print mode styling and borders
- Improved responsive design for all breakpoints
- Added comprehensive financial analysis sections

