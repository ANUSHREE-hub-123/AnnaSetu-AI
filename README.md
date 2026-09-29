# 🍱 AnnaSetu AI

### AI-Powered Food Surplus Management & Redistribution Platform

AnnaSetu AI is a smart food management platform designed to help institutional kitchens reduce food waste by predicting demand, identifying surplus food, matching it with nearby NGOs, and coordinating redistribution.
Our prototype link- https://anna-setu-ai.vercel.app/
## 🌱 The Problem

Large-scale kitchens such as colleges, hostels, hospitals, canteens, and institutions often face:

- Food overproduction due to inaccurate demand estimation
- Difficulty identifying surplus before it becomes waste
- Lack of real-time coordination with NGOs
- Inefficient redistribution and pickup planning
- Limited visibility into food waste and environmental impact

## 💡 Our Solution

AnnaSetu AI connects **institutional kitchens, NGOs, and administrators** through a unified platform.

The system helps kitchens:

**Predict → Plan → Detect Surplus → Match → Redistribute → Measure Impact**

## ✨ Key Features

### 🤖 AI-Powered Insights
- Demand forecasting
- Context-aware recommendations
- Waste hotspot identification
- What-if simulation
- Smart procurement recommendations

### 🍛 Surplus Management
- Real-time surplus tracking
- Food expiry countdown
- Surplus urgency monitoring
- Redistribution recommendations

### 🤝 NGO Matching
- Intelligent NGO matching
- Match percentage
- Distance-aware recommendations
- Pickup scheduling

### 📊 Analytics & Impact
- Food waste analytics
- Quantity of food diverted
- Meals redistributed
- Environmental impact tracking
- Procurement insights

### 👥 Role-Based Platform
- Kitchen dashboard
- NGO dashboard
- Admin dashboard

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Development:** Antigravity
- **Deployment:** Vercel
- **Version Control:** Git + GitHub

## 🏗️ Platform Architecture

```text
                ┌─────────────────────┐
                │     AnnaSetu AI     │
                └──────────┬──────────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
     🏫 Kitchen          🤝 NGO          ⚙️ Admin
          │                │                │
          └────────────────┼────────────────┘
                           │
                           ▼
                  AI Decision Support
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
     Demand            Surplus          Smart
    Forecasting       Detection      Procurement
          │                │                │
          └────────────────┼────────────────┘
                           ▼
                  Redistribution
                           │
                           ▼
                    Impact Tracking
