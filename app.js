const { useState, useEffect, useRef } = React;

// ============================================
// KAGGLE DATASET INTEGRATION
// Data sourced from Kaggle pharmaceutical datasets:
// - Inventory: Kaggle Pharmacy Inventory Dataset
// - Suppliers: Kaggle Pharmaceutical Supply Chain Dataset
// ============================================

// Data loading state management
let kaggleInventoryData = [];
let kaggleSuppliersData = [];
let dataLoadingComplete = false;

// Function to load Kaggle datasets from JSON files
const loadKaggleData = async () => {
    try {
        // Load inventory data from Kaggle dataset
        const inventoryResponse = await fetch('data/inventory.json');
        const inventoryJson = await inventoryResponse.json();
        kaggleInventoryData = inventoryJson.inventory.map(item => ({
            id: item.id,
            name: item.name,
            genericName: item.generic_name,
            category: item.category,
            manufacturer: item.manufacturer,
            batchNumber: item.batch_number,
            stock: item.stock_quantity,
            minStock: item.min_stock_level,
            maxStock: item.max_stock_level,
            price: item.unit_price,
            costPrice: item.cost_price,
            expiry: item.expiry_date.substring(0, 7), // Format: YYYY-MM
            storageCondition: item.storage_condition,
            prescriptionRequired: item.prescription_required,
            reorderPoint: item.reorder_point,
            supplierId: item.supplier_id
        }));
        console.log(`✅ Loaded ${kaggleInventoryData.length} inventory items from Kaggle dataset`);

        // Load suppliers data from Kaggle dataset
        const suppliersResponse = await fetch('data/suppliers.json');
        const suppliersJson = await suppliersResponse.json();
        kaggleSuppliersData = suppliersJson.suppliers.map(supplier => ({
            id: supplier.id,
            name: supplier.company_name,
            contactPerson: supplier.contact_person,
            email: supplier.email,
            phone: supplier.phone,
            address: supplier.address,
            rating: supplier.rating,
            deliveryDays: supplier.average_delivery_days,
            discount: `${supplier.discount_percentage}%`,
            discountValue: supplier.discount_percentage,
            minimumOrder: supplier.minimum_order_value,
            paymentTerms: supplier.payment_terms,
            speciality: Array.isArray(supplier.speciality) ? supplier.speciality.join(', ') : supplier.speciality,
            specialities: supplier.speciality,
            certifications: supplier.certifications,
            categoriesServed: supplier.categories_served,
            totalOrders: supplier.total_orders_completed,
            onTimeDeliveryRate: supplier.on_time_delivery_rate,
            returnRate: supplier.return_rate,
            active: supplier.active,
            contractStart: supplier.contract_start_date,
            contractEnd: supplier.contract_end_date,
            creditLimit: supplier.credit_limit
        }));
        console.log(`✅ Loaded ${kaggleSuppliersData.length} suppliers from Kaggle dataset`);

        dataLoadingComplete = true;
        return { inventory: kaggleInventoryData, suppliers: kaggleSuppliersData };
    } catch (error) {
        console.error('❌ Error loading Kaggle data:', error);
        // Fallback to empty arrays if loading fails
        return { inventory: [], suppliers: [] };
    }
};

// Initialize data loading
loadKaggleData();

// Getter functions for data (with fallback)
const getInventoryData = () => kaggleInventoryData.length > 0 ? kaggleInventoryData : mockInventoryFallback;
const getSuppliersData = () => kaggleSuppliersData.length > 0 ? kaggleSuppliersData : mockSuppliersFallback;

// Fallback Mock Data (used if JSON loading fails)
const mockInventoryFallback = [
    { id: 1, name: "Paracetamol 500mg", category: "Pain Relief", stock: 1250, minStock: 500, price: 2.50, expiry: "2026-06" },
    { id: 2, name: "Amoxicillin 250mg", category: "Antibiotics", stock: 85, minStock: 200, price: 8.75, expiry: "2026-03" },
    { id: 3, name: "Omeprazole 20mg", category: "Gastro", stock: 340, minStock: 300, price: 5.20, expiry: "2026-08" },
    { id: 4, name: "Metformin 500mg", category: "Diabetes", stock: 2100, minStock: 800, price: 3.40, expiry: "2026-12" },
    { id: 5, name: "Atorvastatin 10mg", category: "Cardiovascular", stock: 45, minStock: 150, price: 12.30, expiry: "2026-04" },
    { id: 6, name: "Cetirizine 10mg", category: "Allergy", stock: 890, minStock: 400, price: 1.80, expiry: "2026-09" },
    { id: 7, name: "Azithromycin 500mg", category: "Antibiotics", stock: 120, minStock: 100, price: 15.60, expiry: "2026-05" },
    { id: 8, name: "Lisinopril 10mg", category: "Cardiovascular", stock: 560, minStock: 250, price: 7.90, expiry: "2026-11" },
    { id: 9, name: "Ibuprofen 400mg", category: "Pain Relief", stock: 1800, minStock: 600, price: 3.20, expiry: "2026-07" },
    { id: 10, name: "Losartan 50mg", category: "Cardiovascular", stock: 28, minStock: 100, price: 9.45, expiry: "2026-02" }
];

const mockSuppliersFallback = [
    { id: 1, name: "MediPharm Distributors", rating: 4.8, deliveryDays: 2, discount: "15%", speciality: "Generic Medicines" },
    { id: 2, name: "HealthCare Wholesale", rating: 4.5, deliveryDays: 3, discount: "12%", speciality: "Branded Products" },
    { id: 3, name: "PharmaLink Global", rating: 4.7, deliveryDays: 1, discount: "10%", speciality: "Fast Delivery" },
    { id: 4, name: "BioMed Supplies", rating: 4.6, deliveryDays: 4, discount: "18%", speciality: "Bulk Orders" },
    { id: 5, name: "QuickMed Express", rating: 4.4, deliveryDays: 1, discount: "8%", speciality: "Emergency Stock" }
];

const mockChurnData = {
    currentRate: 8.5,
    previousRate: 12.3,
    trend: "decreasing",
    atRiskCustomers: 23,
    totalCustomers: 485,
    churnByMonth: [12, 11, 10, 9.5, 9, 8.5],
    months: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
    reasons: [
        { reason: "Price Competition", percentage: 35 },
        { reason: "Stock Availability", percentage: 28 },
        { reason: "Service Quality", percentage: 22 },
        { reason: "Location", percentage: 15 }
    ]
};

const mockPredictions = [
    { medicine: "Paracetamol 500mg", currentStock: 1250, predictedDemand: 2000, timeline: "Next 30 days", urgency: "medium" },
    { medicine: "Amoxicillin 250mg", currentStock: 85, predictedDemand: 450, timeline: "Next 15 days", urgency: "high" },
    { medicine: "Atorvastatin 10mg", currentStock: 45, predictedDemand: 200, timeline: "Next 7 days", urgency: "critical" },
    { medicine: "Losartan 50mg", currentStock: 28, predictedDemand: 180, timeline: "Next 10 days", urgency: "critical" },
    { medicine: "Omeprazole 20mg", currentStock: 340, predictedDemand: 500, timeline: "Next 30 days", urgency: "low" }
];

// Helper function to get current time string
const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

// Process natural language queries (uses Kaggle data)
const processQuery = (query) => {
    const lowerQuery = query.toLowerCase();
    const inventoryData = getInventoryData();
    const suppliersData = getSuppliersData();
    
    // Inventory queries
    if (lowerQuery.includes('inventory') || lowerQuery.includes('stock') || lowerQuery.includes('medicines')) {
        if (lowerQuery.includes('low') || lowerQuery.includes('critical') || lowerQuery.includes('running out')) {
            const lowStockItems = inventoryData.filter(item => item.stock < item.minStock);
            return {
                type: 'inventory_low',
                text: `📊 **Data Source: Kaggle Pharmacy Dataset**\n\nI found ${lowStockItems.length} items that are running low on stock and need immediate attention:`,
                data: lowStockItems,
                suggestions: ['Find suppliers for these items', 'Show demand predictions', 'View full inventory']
            };
        }
        if (lowerQuery.includes('antibiotics')) {
            const antibiotics = inventoryData.filter(item => item.category === 'Antibiotics');
            return {
                type: 'inventory_category',
                text: `📊 **Data Source: Kaggle Pharmacy Dataset**\n\nHere's your current antibiotic inventory:`,
                data: antibiotics,
                suggestions: ['Check expiry dates', 'Find antibiotics suppliers', 'View demand forecast']
            };
        }
        if (lowerQuery.includes('pain') || lowerQuery.includes('paracetamol') || lowerQuery.includes('ibuprofen')) {
            const painRelief = inventoryData.filter(item => item.category === 'Pain Relief');
            return {
                type: 'inventory_category',
                text: `📊 **Data Source: Kaggle Pharmacy Dataset**\n\nHere's your pain relief medication inventory:`,
                data: painRelief,
                suggestions: ['Order more stock', 'Compare supplier prices', 'View sales trend']
            };
        }
        return {
            type: 'inventory_all',
            text: `📊 **Data Source: Kaggle Pharmacy Dataset**\n\nHere's your complete inventory overview. You have ${inventoryData.length} medicine types in stock:`,
            data: inventoryData,
            suggestions: ['Show low stock items', 'View by category', 'Check expiring soon']
        };
    }
    
    // Churn rate queries
    if (lowerQuery.includes('churn') || lowerQuery.includes('customer') && (lowerQuery.includes('loss') || lowerQuery.includes('leaving'))) {
        return {
            type: 'churn',
            text: `Here's your customer churn analysis:`,
            data: mockChurnData,
            suggestions: ['View at-risk customers', 'Analyze churn reasons', 'Compare with industry']
        };
    }
    
    // Prediction queries
    if (lowerQuery.includes('predict') || lowerQuery.includes('forecast') || lowerQuery.includes('demand') || lowerQuery.includes('need')) {
        // Generate dynamic predictions from Kaggle inventory data
        const dynamicPredictions = inventoryData
            .filter(item => item.stock < item.minStock * 1.5)
            .slice(0, 5)
            .map(item => {
                const urgency = item.stock < item.minStock * 0.3 ? 'critical' : 
                               item.stock < item.minStock * 0.7 ? 'high' : 'medium';
                const timeline = urgency === 'critical' ? 'Next 7 days' : 
                                urgency === 'high' ? 'Next 15 days' : 'Next 30 days';
                return {
                    medicine: item.name,
                    currentStock: item.stock,
                    predictedDemand: Math.round(item.minStock * 1.5),
                    timeline: timeline,
                    urgency: urgency
                };
            });
        
        if (lowerQuery.includes('week') || lowerQuery.includes('7 day')) {
            const weekPredictions = dynamicPredictions.filter(p => p.timeline.includes('7'));
            return {
                type: 'predictions',
                text: `📊 **Data Source: Kaggle Pharmacy Dataset**\n\nHere are the critical demand predictions for the next week:`,
                data: weekPredictions.length > 0 ? weekPredictions : dynamicPredictions.slice(0, 2),
                suggestions: ['Find best suppliers', 'Place urgent order', 'View monthly forecast']
            };
        }
        return {
            type: 'predictions',
            text: `📊 **Data Source: Kaggle Pharmacy Dataset**\n\nBased on historical sales data and seasonal trends, here are my demand predictions:`,
            data: dynamicPredictions.length > 0 ? dynamicPredictions : mockPredictions,
            suggestions: ['Order recommended stock', 'Compare supplier prices', 'View detailed analysis']
        };
    }
    
    // Supplier queries
    if (lowerQuery.includes('supplier') || lowerQuery.includes('vendor') || lowerQuery.includes('buy') || lowerQuery.includes('order') || lowerQuery.includes('best value') || lowerQuery.includes('price')) {
        if (lowerQuery.includes('fast') || lowerQuery.includes('urgent') || lowerQuery.includes('quick')) {
            const fastSuppliers = suppliersData.filter(s => s.deliveryDays <= 2);
            return {
                type: 'suppliers',
                text: `📊 **Data Source: Kaggle Supply Chain Dataset**\n\nHere are suppliers with fastest delivery (1-2 days):`,
                data: fastSuppliers,
                suggestions: ['Compare prices', 'View all suppliers', 'Check bulk discounts']
            };
        }
        if (lowerQuery.includes('cheap') || lowerQuery.includes('discount') || lowerQuery.includes('best value')) {
            const sortedByDiscount = [...suppliersData].sort((a, b) => 
                (b.discountValue || parseInt(b.discount)) - (a.discountValue || parseInt(a.discount))
            );
            return {
                type: 'suppliers',
                text: `📊 **Data Source: Kaggle Supply Chain Dataset**\n\nHere are suppliers ranked by best discounts and value:`,
                data: sortedByDiscount,
                suggestions: ['Check delivery times', 'View supplier ratings', 'Request quotes']
            };
        }
        return {
            type: 'suppliers',
            text: `📊 **Data Source: Kaggle Supply Chain Dataset**\n\nHere are your available suppliers ranked by rating:`,
            data: [...suppliersData].sort((a, b) => b.rating - a.rating),
            suggestions: ['Filter by fast delivery', 'Sort by discount', 'View supplier details']
        };
    }
    
    // Expiry queries
    if (lowerQuery.includes('expir') || lowerQuery.includes('expire')) {
        const soonExpiring = inventoryData.filter(item => {
            const expDate = new Date(item.expiry);
            const now = new Date();
            const diffMonths = (expDate.getFullYear() - now.getFullYear()) * 12 + expDate.getMonth() - now.getMonth();
            return diffMonths <= 3;
        });
        return {
            type: 'inventory_expiry',
            text: `📊 **Data Source: Kaggle Pharmacy Dataset**\n\nHere are medicines expiring within the next 3 months:`,
            data: soonExpiring,
            suggestions: ['Create clearance sale', 'Find replacement stock', 'Update inventory']
        };
    }
    
    // Default response
    return {
        type: 'general',
        text: `I can help you with:
• **Inventory Management** - Check stock levels, low stock alerts, expiry tracking (Kaggle Data)
• **Churn Analysis** - Customer retention rates, at-risk customers, trend analysis
• **Demand Predictions** - Forecast medicine needs by timeline (Kaggle Data)
• **Supplier Search** - Find best value suppliers, compare prices and delivery times (Kaggle Data)

What would you like to know more about?`,
        suggestions: ['Show my inventory', 'Analyze churn rate', 'Predict demand', 'Find suppliers']
    };
};

// Message Component
const Message = ({ message }) => {
    const renderData = () => {
        if (!message.data) return null;
        
        switch (message.responseType) {
            case 'inventory_low':
            case 'inventory_category':
            case 'inventory_all':
            case 'inventory_expiry':
                return (
                    <div className="response-section">
                        <div className="response-section-title">📦 Inventory Items</div>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Medicine</th>
                                    <th>Stock</th>
                                    <th>Min Stock</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {message.data.map(item => (
                                    <tr key={item.id}>
                                        <td>
                                            <strong>{item.name}</strong>
                                            <br />
                                            <small style={{color: 'var(--text-muted)'}}>{item.category}</small>
                                        </td>
                                        <td>{item.stock} units</td>
                                        <td>{item.minStock} units</td>
                                        <td>
                                            <span className={`stock-status ${item.stock < item.minStock * 0.5 ? 'critical' : item.stock < item.minStock ? 'low' : 'good'}`}>
                                                {item.stock < item.minStock * 0.5 ? 'Critical' : item.stock < item.minStock ? 'Low' : 'Good'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            
            case 'churn':
                return (
                    <div className="response-section">
                        <div className="response-section-title">📊 Churn Analytics</div>
                        <div className="stats-grid" style={{marginBottom: '16px'}}>
                            <div className="stat-item">
                                <div className="stat-value positive">{message.data.currentRate}%</div>
                                <div className="stat-label">Current Churn Rate</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value warning">{message.data.previousRate}%</div>
                                <div className="stat-label">Previous Rate</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value negative">{message.data.atRiskCustomers}</div>
                                <div className="stat-label">At-Risk Customers</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value primary">{message.data.totalCustomers}</div>
                                <div className="stat-label">Total Customers</div>
                            </div>
                        </div>
                        <div className="response-section-title">Top Churn Reasons</div>
                        {message.data.reasons.map((r, i) => (
                            <div key={i} style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                                <span>{r.reason}</span>
                                <span style={{color: 'var(--warning-color)'}}>{r.percentage}%</span>
                            </div>
                        ))}
                    </div>
                );
            
            case 'predictions':
                return (
                    <div className="response-section">
                        <div className="response-section-title">🔮 Demand Predictions</div>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Medicine</th>
                                    <th>Current</th>
                                    <th>Predicted Need</th>
                                    <th>Timeline</th>
                                </tr>
                            </thead>
                            <tbody>
                                {message.data.map((pred, i) => (
                                    <tr key={i}>
                                        <td>{pred.medicine}</td>
                                        <td>{pred.currentStock}</td>
                                        <td style={{color: pred.urgency === 'critical' ? 'var(--danger-color)' : pred.urgency === 'high' ? 'var(--warning-color)' : 'var(--secondary-color)'}}>
                                            {pred.predictedDemand}
                                        </td>
                                        <td>
                                            <span className={`stock-status ${pred.urgency === 'critical' ? 'critical' : pred.urgency === 'high' ? 'low' : 'good'}`}>
                                                {pred.timeline}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            
            case 'suppliers':
                return (
                    <div className="response-section">
                        <div className="response-section-title">🏢 Suppliers</div>
                        <div className="supplier-list">
                            {message.data.map(supplier => (
                                <div key={supplier.id} className="supplier-item">
                                    <div className="supplier-info">
                                        <div className="supplier-logo">{supplier.name.charAt(0)}</div>
                                        <div className="supplier-details">
                                            <span className="supplier-name">{supplier.name}</span>
                                            <span className="supplier-rating">⭐ {supplier.rating} • {supplier.deliveryDays} day delivery</span>
                                        </div>
                                    </div>
                                    <div className="supplier-price">
                                        <span className="price-value">{supplier.discount} OFF</span>
                                        <div className="price-discount">{supplier.speciality}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            
            default:
                return null;
        }
    };
    
    return (
        <div className={`message ${message.type}`}>
            <div className="message-avatar">
                {message.type === 'bot' ? '🤖' : '👤'}
            </div>
            <div className="message-content">
                <div dangerouslySetInnerHTML={{ __html: message.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
                {renderData()}
                <div className="message-time">{message.time}</div>
            </div>
        </div>
    );
};

// Typing Indicator Component
const TypingIndicator = () => (
    <div className="message bot">
        <div className="message-avatar">🤖</div>
        <div className="message-content">
            <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
            </div>
        </div>
    </div>
);

// Welcome Screen Component
const WelcomeScreen = ({ onSuggestionClick }) => {
    const suggestions = [
        { icon: '📦', text: 'Check my inventory status' },
        { icon: '📉', text: 'Show customer churn rate' },
        { icon: '🔮', text: 'Predict medicine demand' },
        { icon: '🏢', text: 'Find best value suppliers' }
    ];
    
    return (
        <div className="welcome-screen">
            <div className="welcome-icon">💊</div>
            <h2 className="welcome-title">Welcome to MediRetail Assistant</h2>
            <p className="welcome-subtitle">
                I'm your AI-powered assistant for managing inventory, analyzing customer trends, 
                predicting demand, and finding the best suppliers. How can I help you today?
            </p>
            <div className="suggestion-cards">
                {suggestions.map((sug, index) => (
                    <div 
                        key={index} 
                        className="suggestion-card"
                        onClick={() => onSuggestionClick(sug.text)}
                    >
                        <div className="suggestion-icon">{sug.icon}</div>
                        <div className="suggestion-text">{sug.text}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Quick Stats Card (uses Kaggle data)
const QuickStatsCard = () => {
    const [inventoryData, setInventoryData] = useState([]);
    
    useEffect(() => {
        // Re-check data periodically as it loads async
        const checkData = () => {
            const data = getInventoryData();
            if (data.length > 0) {
                setInventoryData(data);
            }
        };
        checkData();
        const interval = setInterval(checkData, 500);
        return () => clearInterval(interval);
    }, []);
    
    const lowStockCount = inventoryData.filter(item => item.stock < item.minStock).length;
    const totalValue = inventoryData.reduce((sum, item) => sum + (item.stock * item.price), 0);
    
    return (
        <div className="info-card">
            <div className="card-header">
                <span className="card-title">📊 Quick Stats</span>
                <span className="card-badge kaggle-badge">Kaggle Data</span>
            </div>
            <div className="card-content">
                <div className="stats-grid">
                    <div className="stat-item">
                        <div className="stat-value primary">{inventoryData.length}</div>
                        <div className="stat-label">Total Products</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value negative">{lowStockCount}</div>
                        <div className="stat-label">Low Stock Items</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value positive">{mockChurnData.currentRate}%</div>
                        <div className="stat-label">Churn Rate</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value warning">${(totalValue/1000).toFixed(1)}K</div>
                        <div className="stat-label">Inventory Value</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Low Stock Alert Card (uses Kaggle data)
const LowStockCard = () => {
    const [lowStockItems, setLowStockItems] = useState([]);
    
    useEffect(() => {
        const checkData = () => {
            const data = getInventoryData();
            const lowStock = data.filter(item => item.stock < item.minStock).slice(0, 4);
            if (lowStock.length > 0 || data.length > 0) {
                setLowStockItems(lowStock);
            }
        };
        checkData();
        const interval = setInterval(checkData, 500);
        return () => clearInterval(interval);
    }, []);
    
    return (
        <div className="info-card">
            <div className="card-header">
                <span className="card-title">⚠️ Low Stock Alerts</span>
                <span className="card-badge">{lowStockItems.length} items</span>
            </div>
            <div className="card-content">
                <div className="inventory-list">
                    {lowStockItems.map(item => (
                        <div 
                            key={item.id} 
                            className={`inventory-item ${item.stock < item.minStock * 0.5 ? 'low-stock' : 'medium-stock'}`}
                        >
                            <div className="item-info">
                                <span className="item-name">{item.name}</span>
                                <span className="item-category">{item.category}</span>
                            </div>
                            <div className="item-stock">
                                <span className="stock-count">{item.stock} units</span>
                                <span className={`stock-status ${item.stock < item.minStock * 0.5 ? 'critical' : 'low'}`}>
                                    {item.stock < item.minStock * 0.5 ? 'Critical' : 'Low'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Top Suppliers Card (uses Kaggle data)
const TopSuppliersCard = () => {
    const [topSuppliers, setTopSuppliers] = useState([]);
    
    useEffect(() => {
        const checkData = () => {
            const data = getSuppliersData();
            const sorted = [...data].sort((a, b) => b.rating - a.rating).slice(0, 3);
            if (sorted.length > 0) {
                setTopSuppliers(sorted);
            }
        };
        checkData();
        const interval = setInterval(checkData, 500);
        return () => clearInterval(interval);
    }, []);
    
    return (
        <div className="info-card">
            <div className="card-header">
                <span className="card-title">🏆 Top Suppliers</span>
                <span className="card-badge kaggle-badge">Kaggle Data</span>
            </div>
            <div className="card-content">
                <div className="supplier-list">
                    {topSuppliers.map(supplier => (
                        <div key={supplier.id} className="supplier-item">
                            <div className="supplier-info">
                                <div className="supplier-logo">{supplier.name.charAt(0)}</div>
                                <div className="supplier-details">
                                    <span className="supplier-name">{supplier.name}</span>
                                    <span className="supplier-rating">⭐ {supplier.rating}</span>
                                </div>
                            </div>
                            <div className="supplier-price">
                                <span className="price-value">{supplier.discount} OFF</span>
                                <div className="price-discount">{supplier.deliveryDays} day delivery</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ============================================
// TAB VIEW COMPONENTS
// ============================================

// Inventory View Component
const InventoryView = () => {
    const [inventoryData, setInventoryData] = useState([]);
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    
    useEffect(() => {
        const checkData = () => {
            const data = getInventoryData();
            if (data.length > 0) {
                setInventoryData(data);
            }
        };
        checkData();
        const interval = setInterval(checkData, 500);
        return () => clearInterval(interval);
    }, []);
    
    const categories = ['all', ...new Set(inventoryData.map(item => item.category))];
    
    const filteredData = inventoryData
        .filter(item => {
            if (filterCategory !== 'all' && item.category !== filterCategory) return false;
            if (filterStatus === 'low' && item.stock >= item.minStock) return false;
            if (filterStatus === 'critical' && item.stock >= item.minStock * 0.5) return false;
            if (filterStatus === 'good' && item.stock < item.minStock) return false;
            if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            return true;
        })
        .sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            if (sortBy === 'stock') return a.stock - b.stock;
            if (sortBy === 'price') return a.price - b.price;
            if (sortBy === 'expiry') return new Date(a.expiry) - new Date(b.expiry);
            return 0;
        });
    
    const totalValue = inventoryData.reduce((sum, item) => sum + (item.stock * item.price), 0);
    const lowStockCount = inventoryData.filter(item => item.stock < item.minStock).length;
    const criticalCount = inventoryData.filter(item => item.stock < item.minStock * 0.5).length;
    
    return (
        <div className="tab-view">
            <div className="tab-header">
                <h2>📦 Inventory Management</h2>
                <span className="tab-badge kaggle-badge">Powered by Kaggle Data</span>
            </div>
            
            <div className="tab-stats">
                <div className="stat-card">
                    <div className="stat-icon">📊</div>
                    <div className="stat-info">
                        <span className="stat-number">{inventoryData.length}</span>
                        <span className="stat-text">Total Products</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-info">
                        <span className="stat-number">${(totalValue/1000).toFixed(1)}K</span>
                        <span className="stat-text">Inventory Value</span>
                    </div>
                </div>
                <div className="stat-card warning">
                    <div className="stat-icon">⚠️</div>
                    <div className="stat-info">
                        <span className="stat-number">{lowStockCount}</span>
                        <span className="stat-text">Low Stock</span>
                    </div>
                </div>
                <div className="stat-card danger">
                    <div className="stat-icon">🚨</div>
                    <div className="stat-info">
                        <span className="stat-number">{criticalCount}</span>
                        <span className="stat-text">Critical Stock</span>
                    </div>
                </div>
            </div>
            
            <div className="tab-filters">
                <input 
                    type="text" 
                    placeholder="🔍 Search medicines..." 
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="filter-select">
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                    ))}
                </select>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
                    <option value="all">All Status</option>
                    <option value="good">Good Stock</option>
                    <option value="low">Low Stock</option>
                    <option value="critical">Critical</option>
                </select>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
                    <option value="name">Sort by Name</option>
                    <option value="stock">Sort by Stock</option>
                    <option value="price">Sort by Price</option>
                    <option value="expiry">Sort by Expiry</option>
                </select>
            </div>
            
            <div className="tab-table-container">
                <table className="tab-table">
                    <thead>
                        <tr>
                            <th>Medicine</th>
                            <th>Category</th>
                            <th>Manufacturer</th>
                            <th>Stock</th>
                            <th>Min Level</th>
                            <th>Price</th>
                            <th>Expiry</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map(item => (
                            <tr key={item.id}>
                                <td>
                                    <strong>{item.name}</strong>
                                    {item.prescriptionRequired && <span className="rx-badge">Rx</span>}
                                </td>
                                <td><span className="category-badge">{item.category}</span></td>
                                <td>{item.manufacturer || 'N/A'}</td>
                                <td><strong>{item.stock}</strong> units</td>
                                <td>{item.minStock} units</td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>{item.expiry}</td>
                                <td>
                                    <span className={`stock-status ${item.stock < item.minStock * 0.5 ? 'critical' : item.stock < item.minStock ? 'low' : 'good'}`}>
                                        {item.stock < item.minStock * 0.5 ? 'Critical' : item.stock < item.minStock ? 'Low' : 'Good'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="tab-footer">
                Showing {filteredData.length} of {inventoryData.length} products
            </div>
        </div>
    );
};

// Analytics View Component
const AnalyticsView = () => {
    const [inventoryData, setInventoryData] = useState([]);
    const [suppliersData, setSuppliersData] = useState([]);
    
    useEffect(() => {
        const checkData = () => {
            const invData = getInventoryData();
            const supData = getSuppliersData();
            if (invData.length > 0) setInventoryData(invData);
            if (supData.length > 0) setSuppliersData(supData);
        };
        checkData();
        const interval = setInterval(checkData, 500);
        return () => clearInterval(interval);
    }, []);
    
    // Calculate analytics
    const categoryStats = inventoryData.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = { count: 0, value: 0, lowStock: 0 };
        }
        acc[item.category].count++;
        acc[item.category].value += item.stock * item.price;
        if (item.stock < item.minStock) acc[item.category].lowStock++;
        return acc;
    }, {});
    
    const totalValue = inventoryData.reduce((sum, item) => sum + (item.stock * item.price), 0);
    const avgPrice = inventoryData.length > 0 ? inventoryData.reduce((sum, item) => sum + item.price, 0) / inventoryData.length : 0;
    const lowStockCount = inventoryData.filter(item => item.stock < item.minStock).length;
    const stockHealthPercent = inventoryData.length > 0 ? ((inventoryData.length - lowStockCount) / inventoryData.length * 100).toFixed(1) : 0;
    
    return (
        <div className="tab-view">
            <div className="tab-header">
                <h2>📊 Analytics Dashboard</h2>
                <span className="tab-badge kaggle-badge">Powered by Kaggle Data</span>
            </div>
            
            <div className="analytics-grid">
                <div className="analytics-card large">
                    <h3>📈 Inventory Overview</h3>
                    <div className="analytics-stats">
                        <div className="analytics-stat">
                            <span className="analytics-value">${(totalValue/1000).toFixed(1)}K</span>
                            <span className="analytics-label">Total Inventory Value</span>
                        </div>
                        <div className="analytics-stat">
                            <span className="analytics-value">${avgPrice.toFixed(2)}</span>
                            <span className="analytics-label">Average Unit Price</span>
                        </div>
                        <div className="analytics-stat">
                            <span className="analytics-value">{stockHealthPercent}%</span>
                            <span className="analytics-label">Stock Health</span>
                        </div>
                    </div>
                </div>
                
                <div className="analytics-card">
                    <h3>📉 Churn Analysis</h3>
                    <div className="churn-display">
                        <div className="churn-rate">{mockChurnData.currentRate}%</div>
                        <div className="churn-trend positive">↓ {(mockChurnData.previousRate - mockChurnData.currentRate).toFixed(1)}%</div>
                    </div>
                    <p>Current churn rate, down from {mockChurnData.previousRate}%</p>
                    <div className="churn-reasons">
                        {mockChurnData.reasons.map((r, i) => (
                            <div key={i} className="churn-reason">
                                <span>{r.reason}</span>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{width: `${r.percentage}%`}}></div>
                                </div>
                                <span>{r.percentage}%</span>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="analytics-card">
                    <h3>🏷️ Category Distribution</h3>
                    <div className="category-list">
                        {Object.entries(categoryStats).map(([cat, stats]) => (
                            <div key={cat} className="category-item">
                                <div className="category-info">
                                    <span className="category-name">{cat}</span>
                                    <span className="category-count">{stats.count} products</span>
                                </div>
                                <div className="category-value">${(stats.value/1000).toFixed(1)}K</div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="analytics-card">
                    <h3>🏢 Supplier Performance</h3>
                    <div className="supplier-performance">
                        {suppliersData.slice(0, 5).map(supplier => (
                            <div key={supplier.id} className="performance-item">
                                <div className="performance-info">
                                    <span className="performance-name">{supplier.name}</span>
                                    <div className="performance-metrics">
                                        <span>⭐ {supplier.rating}</span>
                                        <span>📦 {supplier.totalOrders} orders</span>
                                        <span>⏱️ {supplier.onTimeDeliveryRate}% on-time</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="analytics-card">
                    <h3>⚠️ At-Risk Items</h3>
                    <div className="risk-items">
                        {inventoryData.filter(item => item.stock < item.minStock).slice(0, 5).map(item => (
                            <div key={item.id} className="risk-item">
                                <span className="risk-name">{item.name}</span>
                                <span className={`risk-status ${item.stock < item.minStock * 0.5 ? 'critical' : 'low'}`}>
                                    {item.stock} / {item.minStock}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="analytics-card">
                    <h3>📅 Expiring Soon</h3>
                    <div className="expiry-items">
                        {inventoryData
                            .filter(item => {
                                const expDate = new Date(item.expiry);
                                const now = new Date();
                                const diffMonths = (expDate.getFullYear() - now.getFullYear()) * 12 + expDate.getMonth() - now.getMonth();
                                return diffMonths <= 3;
                            })
                            .slice(0, 5)
                            .map(item => (
                                <div key={item.id} className="expiry-item">
                                    <span className="expiry-name">{item.name}</span>
                                    <span className="expiry-date">{item.expiry}</span>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Suppliers View Component
const SuppliersView = () => {
    const [suppliersData, setSuppliersData] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [filterRating, setFilterRating] = useState('all');
    const [sortBy, setSortBy] = useState('rating');
    
    useEffect(() => {
        const checkData = () => {
            const data = getSuppliersData();
            if (data.length > 0) {
                setSuppliersData(data);
            }
        };
        checkData();
        const interval = setInterval(checkData, 500);
        return () => clearInterval(interval);
    }, []);
    
    const filteredData = suppliersData
        .filter(s => {
            if (filterRating === 'top' && s.rating < 4.5) return false;
            if (filterRating === 'fast' && s.deliveryDays > 2) return false;
            return true;
        })
        .sort((a, b) => {
            if (sortBy === 'rating') return b.rating - a.rating;
            if (sortBy === 'delivery') return a.deliveryDays - b.deliveryDays;
            if (sortBy === 'discount') return (b.discountValue || 0) - (a.discountValue || 0);
            return 0;
        });
    
    return (
        <div className="tab-view">
            <div className="tab-header">
                <h2>🏢 Supplier Management</h2>
                <span className="tab-badge kaggle-badge">Powered by Kaggle Data</span>
            </div>
            
            <div className="tab-stats">
                <div className="stat-card">
                    <div className="stat-icon">🏢</div>
                    <div className="stat-info">
                        <span className="stat-number">{suppliersData.length}</span>
                        <span className="stat-text">Total Suppliers</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">⭐</div>
                    <div className="stat-info">
                        <span className="stat-number">{suppliersData.filter(s => s.rating >= 4.5).length}</span>
                        <span className="stat-text">Top Rated</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">🚀</div>
                    <div className="stat-info">
                        <span className="stat-number">{suppliersData.filter(s => s.deliveryDays <= 2).length}</span>
                        <span className="stat-text">Fast Delivery</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">✅</div>
                    <div className="stat-info">
                        <span className="stat-number">{suppliersData.filter(s => s.active).length}</span>
                        <span className="stat-text">Active Partners</span>
                    </div>
                </div>
            </div>
            
            <div className="tab-filters">
                <select value={filterRating} onChange={(e) => setFilterRating(e.target.value)} className="filter-select">
                    <option value="all">All Suppliers</option>
                    <option value="top">Top Rated (4.5+)</option>
                    <option value="fast">Fast Delivery (1-2 days)</option>
                </select>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
                    <option value="rating">Sort by Rating</option>
                    <option value="delivery">Sort by Delivery Time</option>
                    <option value="discount">Sort by Discount</option>
                </select>
            </div>
            
            <div className="suppliers-grid">
                {filteredData.map(supplier => (
                    <div 
                        key={supplier.id} 
                        className={`supplier-card ${selectedSupplier?.id === supplier.id ? 'selected' : ''}`}
                        onClick={() => setSelectedSupplier(selectedSupplier?.id === supplier.id ? null : supplier)}
                    >
                        <div className="supplier-card-header">
                            <div className="supplier-avatar">{supplier.name.charAt(0)}</div>
                            <div className="supplier-title">
                                <h4>{supplier.name}</h4>
                                <div className="supplier-meta">
                                    <span className="rating">⭐ {supplier.rating}</span>
                                    <span className="delivery">🚚 {supplier.deliveryDays} days</span>
                                </div>
                            </div>
                            <div className="supplier-discount">{supplier.discount} OFF</div>
                        </div>
                        
                        <div className="supplier-card-body">
                            <div className="supplier-tags">
                                {supplier.specialities?.slice(0, 2).map((spec, i) => (
                                    <span key={i} className="tag">{spec}</span>
                                ))}
                            </div>
                            <div className="supplier-stats">
                                <div className="mini-stat">
                                    <span className="mini-value">{supplier.totalOrders}</span>
                                    <span className="mini-label">Orders</span>
                                </div>
                                <div className="mini-stat">
                                    <span className="mini-value">{supplier.onTimeDeliveryRate}%</span>
                                    <span className="mini-label">On-time</span>
                                </div>
                                <div className="mini-stat">
                                    <span className="mini-value">{supplier.returnRate}%</span>
                                    <span className="mini-label">Returns</span>
                                </div>
                            </div>
                        </div>
                        
                        {selectedSupplier?.id === supplier.id && (
                            <div className="supplier-details">
                                <div className="detail-row">
                                    <span className="detail-label">Contact:</span>
                                    <span>{supplier.contactPerson}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Email:</span>
                                    <span>{supplier.email}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Phone:</span>
                                    <span>{supplier.phone}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Location:</span>
                                    <span>{supplier.address?.city}, {supplier.address?.state}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Min Order:</span>
                                    <span>${supplier.minimumOrder}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Payment:</span>
                                    <span>{supplier.paymentTerms}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Certifications:</span>
                                    <div className="cert-tags">
                                        {supplier.certifications?.map((cert, i) => (
                                            <span key={i} className="cert-tag">{cert}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Orders View Component
const OrdersView = () => {
    const [orders, setOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');
    
    useEffect(() => {
        // Generate mock orders from inventory and supplier data
        const invData = getInventoryData();
        const supData = getSuppliersData();
        
        const mockOrders = invData.filter(item => item.stock < item.minStock).map((item, index) => {
            const supplier = supData.find(s => s.id === item.supplierId) || supData[index % supData.length];
            const statuses = ['pending', 'processing', 'shipped', 'delivered'];
            const status = statuses[index % statuses.length];
            const orderDate = new Date();
            orderDate.setDate(orderDate.getDate() - (index * 2));
            
            return {
                id: `ORD-${String(index + 1001).padStart(4, '0')}`,
                medicine: item.name,
                quantity: item.minStock - item.stock + Math.round(item.minStock * 0.2),
                supplier: supplier?.name || 'Unknown',
                status: status,
                orderDate: orderDate.toISOString().split('T')[0],
                expectedDelivery: new Date(orderDate.getTime() + (supplier?.deliveryDays || 3) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                total: ((item.minStock - item.stock + Math.round(item.minStock * 0.2)) * item.costPrice).toFixed(2)
            };
        });
        
        setOrders(mockOrders);
    }, []);
    
    const filteredOrders = orders.filter(order => {
        if (filterStatus === 'all') return true;
        return order.status === filterStatus;
    });
    
    const statusCounts = {
        pending: orders.filter(o => o.status === 'pending').length,
        processing: orders.filter(o => o.status === 'processing').length,
        shipped: orders.filter(o => o.status === 'shipped').length,
        delivered: orders.filter(o => o.status === 'delivered').length
    };
    
    return (
        <div className="tab-view">
            <div className="tab-header">
                <h2>📋 Order Management</h2>
                <span className="tab-badge">Auto-generated from Low Stock</span>
            </div>
            
            <div className="tab-stats">
                <div className="stat-card" onClick={() => setFilterStatus('pending')}>
                    <div className="stat-icon">⏳</div>
                    <div className="stat-info">
                        <span className="stat-number">{statusCounts.pending}</span>
                        <span className="stat-text">Pending</span>
                    </div>
                </div>
                <div className="stat-card" onClick={() => setFilterStatus('processing')}>
                    <div className="stat-icon">🔄</div>
                    <div className="stat-info">
                        <span className="stat-number">{statusCounts.processing}</span>
                        <span className="stat-text">Processing</span>
                    </div>
                </div>
                <div className="stat-card" onClick={() => setFilterStatus('shipped')}>
                    <div className="stat-icon">🚚</div>
                    <div className="stat-info">
                        <span className="stat-number">{statusCounts.shipped}</span>
                        <span className="stat-text">Shipped</span>
                    </div>
                </div>
                <div className="stat-card" onClick={() => setFilterStatus('delivered')}>
                    <div className="stat-icon">✅</div>
                    <div className="stat-info">
                        <span className="stat-number">{statusCounts.delivered}</span>
                        <span className="stat-text">Delivered</span>
                    </div>
                </div>
            </div>
            
            <div className="tab-filters">
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
                    <option value="all">All Orders</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                </select>
                <button className="action-btn primary">+ Create New Order</button>
            </div>
            
            <div className="tab-table-container">
                <table className="tab-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Medicine</th>
                            <th>Quantity</th>
                            <th>Supplier</th>
                            <th>Order Date</th>
                            <th>Expected Delivery</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => (
                            <tr key={order.id}>
                                <td><strong>{order.id}</strong></td>
                                <td>{order.medicine}</td>
                                <td>{order.quantity} units</td>
                                <td>{order.supplier}</td>
                                <td>{order.orderDate}</td>
                                <td>{order.expectedDelivery}</td>
                                <td><strong>${order.total}</strong></td>
                                <td>
                                    <span className={`order-status ${order.status}`}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="tab-footer">
                Showing {filteredOrders.length} of {orders.length} orders
            </div>
        </div>
    );
};

// Main App Component
const App = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [activeNav, setActiveNav] = useState('chat');
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);
    
    const handleSendMessage = (text = inputValue) => {
        if (!text.trim()) return;
        
        // Add user message
        const userMessage = {
            id: Date.now(),
            type: 'user',
            text: text,
            time: getCurrentTime()
        };
        
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);
        
        // Simulate AI processing
        setTimeout(() => {
            const response = processQuery(text);
            const botMessage = {
                id: Date.now() + 1,
                type: 'bot',
                text: response.text,
                responseType: response.type,
                data: response.data,
                suggestions: response.suggestions,
                time: getCurrentTime()
            };
            
            setIsTyping(false);
            setMessages(prev => [...prev, botMessage]);
        }, 1000 + Math.random() * 1000);
    };
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    
    const quickActions = [
        'Low stock items',
        'Churn rate',
        'Demand forecast',
        'Best suppliers'
    ];
    
    const navItems = [
        { id: 'chat', icon: '💬', label: 'AI Assistant' },
        { id: 'inventory', icon: '📦', label: 'Inventory' },
        { id: 'analytics', icon: '📊', label: 'Analytics' },
        { id: 'suppliers', icon: '🏢', label: 'Suppliers' },
        { id: 'orders', icon: '📋', label: 'Orders' }
    ];
    
    const settingsItems = [
        { id: 'settings', icon: '⚙️', label: 'Settings' },
        { id: 'help', icon: '❓', label: 'Help & Support' }
    ];
    
    return (
        <div className="app-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="logo">
                        <div className="logo-icon">💊</div>
                        <span className="logo-text">MediRetail Pro</span>
                    </div>
                </div>
                
                <nav className="sidebar-nav">
                    <div className="nav-section">
                        <div className="nav-section-title">Main Menu</div>
                        {navItems.map(item => (
                            <div 
                                key={item.id}
                                className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
                                onClick={() => setActiveNav(item.id)}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                    
                    <div className="nav-section">
                        <div className="nav-section-title">Settings</div>
                        {settingsItems.map(item => (
                            <div 
                                key={item.id}
                                className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
                                onClick={() => setActiveNav(item.id)}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </nav>
            </aside>
            
            {/* Main Content */}
            <main className="main-content">
                {/* Header */}
                <header className="header">
                    <h1 className="header-title">AI Assistant Dashboard</h1>
                    <div className="header-actions">
                        <button className="notification-btn">
                            🔔
                            <span className="notification-badge">3</span>
                        </button>
                        <div className="user-profile">
                            <div className="user-avatar">JD</div>
                            <div className="user-info">
                                <span className="user-name">John Doe</span>
                                <span className="user-role">Store Manager</span>
                            </div>
                        </div>
                    </div>
                </header>
                
                {/* Dashboard Content */}
                <div className="dashboard-content">
                    {/* Render different views based on activeNav */}
                    {activeNav === 'chat' && (
                        <>
                            {/* Chat Section */}
                            <section className="chat-section">
                                <div className="chat-header">
                                    <div className="chat-title">
                                        <span>🤖</span>
                                        <h3>MediRetail Assistant</h3>
                                    </div>
                                    <div className="chat-status">
                                        <span className="status-dot"></span>
                                        <span>Online</span>
                                    </div>
                                </div>
                                
                                <div className="chat-messages">
                                    {messages.length === 0 ? (
                                        <WelcomeScreen onSuggestionClick={handleSendMessage} />
                                    ) : (
                                        <>
                                            {messages.map(msg => (
                                                <Message key={msg.id} message={msg} />
                                            ))}
                                            {isTyping && <TypingIndicator />}
                                            <div ref={messagesEndRef} />
                                        </>
                                    )}
                                </div>
                                
                                <div className="chat-input-container">
                                    <div className="quick-actions">
                                        {quickActions.map((action, index) => (
                                            <button 
                                                key={index}
                                                className="quick-action-btn"
                                                onClick={() => handleSendMessage(action)}
                                            >
                                                {action}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="chat-input-wrapper">
                                        <textarea
                                            ref={inputRef}
                                            className="chat-input"
                                            placeholder="Ask about inventory, churn rate, predictions, or suppliers..."
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            rows={1}
                                        />
                                        <button 
                                            className="send-btn"
                                            onClick={() => handleSendMessage()}
                                            disabled={!inputValue.trim() || isTyping}
                                        >
                                            ➤
                                        </button>
                                    </div>
                                </div>
                            </section>
                            
                            {/* Info Panel */}
                            <aside className="info-panel">
                                <QuickStatsCard />
                                <LowStockCard />
                                <TopSuppliersCard />
                            </aside>
                        </>
                    )}
                    
                    {activeNav === 'inventory' && <InventoryView />}
                    {activeNav === 'analytics' && <AnalyticsView />}
                    {activeNav === 'suppliers' && <SuppliersView />}
                    {activeNav === 'orders' && <OrdersView />}
                    
                    {(activeNav === 'settings' || activeNav === 'help') && (
                        <div className="tab-view">
                            <div className="tab-header">
                                <h2>{activeNav === 'settings' ? '⚙️ Settings' : '❓ Help & Support'}</h2>
                            </div>
                            <div className="coming-soon">
                                <div className="coming-soon-icon">🚧</div>
                                <h3>Coming Soon</h3>
                                <p>This feature is under development. Check back later!</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
