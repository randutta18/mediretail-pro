# 💊 MediRetail Pro - AI Assistant Dashboard

[![GitHub Pages](https://img.shields.io/badge/Demo-Live-brightgreen)](https://randutta18.github.io/mediretail-pro/)
[![Kaggle](https://img.shields.io/badge/Data-Kaggle-blue)](https://www.kaggle.com/)

A modern, AI-powered dashboard for medicine retail management featuring inventory tracking, analytics, supplier management, and intelligent demand forecasting.

![MediRetail Pro Dashboard](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript)

## 🌟 Features

### 💬 AI Assistant
- Natural language queries for inventory, suppliers, and analytics
- Quick action buttons for common tasks
- Real-time data-driven responses
- Smart demand predictions

### 📦 Inventory Management
- **30+ medicines** with detailed information
- Search, filter, and sort capabilities
- Stock level monitoring (Good/Low/Critical)
- Expiry date tracking
- Category-based organization

### 📊 Analytics Dashboard
- Inventory value overview
- Customer churn analysis with trend visualization
- Category distribution breakdown
- Supplier performance metrics
- At-risk items monitoring
- Expiring soon alerts

### 🏢 Supplier Management
- **10 verified suppliers** with ratings
- Delivery time and discount information
- Contact details and certifications
- Order history and on-time delivery rates
- Filterable by rating and delivery speed

### 📋 Order Management
- Auto-generated orders from low-stock items
- Status tracking (Pending/Processing/Shipped/Delivered)
- Expected delivery dates
- Supplier assignment

## 🚀 Live Demo

Visit the live demo: [https://randutta18.github.io/mediretail-pro/](https://randutta18.github.io/mediretail-pro/)

## 📂 Project Structure

```
medicine-retail-demo/
├── index.html          # Main HTML file
├── app.js              # React components and logic
├── styles.css          # Complete styling
├── data/
│   ├── inventory.json  # 30 medicine products (Kaggle dataset format)
│   └── suppliers.json  # 10 pharmaceutical suppliers
└── README.md           # This file
```

## 🔧 Technology Stack

- **Frontend**: React 18 (via CDN)
- **Styling**: Custom CSS with CSS Variables
- **Data**: JSON files (Kaggle dataset format)
- **Build**: No build step required - runs directly in browser

## 📊 Data Sources

The application uses data modeled after Kaggle pharmaceutical datasets:

### Inventory Data
- Medicine name, generic name, and category
- Manufacturer and batch information
- Stock levels (current, minimum, maximum)
- Pricing (unit price and cost price)
- Expiry dates and storage conditions
- Prescription requirements

### Supplier Data
- Company information and contact details
- Ratings and delivery performance
- Discount percentages and minimum orders
- Certifications (ISO, GMP, FDA, WHO-GMP)
- Order history and return rates

## 🖥️ Local Development

1. Clone the repository:
```bash
git clone https://github.com/randutta18/mediretail-pro.git
cd mediretail-pro
```

2. Start a local server (required for JSON data loading):
```bash
# Using Python 3
python3 -m http.server 8080

# Or using Node.js
npx serve
```

3. Open in browser:
```
http://localhost:8080
```

## 🎨 UI Features

- **Dark Theme**: Professional dark interface
- **Responsive Design**: Works on desktop and tablets
- **Smooth Animations**: Fade-in effects and hover states
- **Interactive Elements**: Clickable cards, expandable details
- **Status Indicators**: Color-coded stock levels and order statuses

## 📱 Navigation

| Tab | Description |
|-----|-------------|
| AI Assistant | Chat interface with quick actions |
| Inventory | Full product list with filters |
| Analytics | Charts and insights dashboard |
| Suppliers | Supplier cards with details |
| Orders | Order management table |

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this project for learning and development.

## 👤 Author

**Ranjan Dutta**

---

⭐ If you find this project helpful, please give it a star!
