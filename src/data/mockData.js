export const kpiMetrics = [
  {
    id: 'active-shipments',
    title: 'Active Shipments',
    value: '1,284',
    unit: 'shipments',
    change: '+4.7%',
    changeType: 'positive',
    period: 'from last week',
    icon: 'Truck'
  },
  {
    id: 'delivery-performance',
    title: 'Delivery Performance',
    value: '94.3%',
    unit: 'on-time',
    change: '-1.2%',
    changeType: 'negative',
    period: 'from last week',
    icon: 'Gauge'
  },
  {
    id: 'revenue',
    title: 'Revenue',
    value: '$82,450',
    unit: '',
    change: '+12.6%',
    changeType: 'positive',
    period: 'from last month',
    icon: 'DollarSign'
  }
];

export const shipmentStatisticsData = [
  { month: 'Jan', shipments: 1800, highlight: false },
  { month: 'Feb', shipments: 1500, highlight: false },
  { month: 'Mar', shipments: 2200, highlight: false },
  { month: 'Apr', shipments: 2400, highlight: false },
  { month: 'May', shipments: 3124, highlight: true },
  { month: 'Jun', shipments: 2800, highlight: true },
  { month: 'Jul', shipments: 3600, highlight: true },
  { month: 'Aug', shipments: 4150, highlight: true }
];

export const profitSummaryData = [
  { month: 'Jan', Revenue: 55000, Cost: 32000 },
  { month: 'Feb', Revenue: 62000, Cost: 38000 },
  { month: 'Mar', Revenue: 70000, Cost: 41000 },
  { month: 'Apr', Revenue: 68000, Cost: 39000 },
  { month: 'May', Revenue: 87824, Cost: 45689 },
  { month: 'Jun', Revenue: 82000, Cost: 48000 },
  { month: 'Jul', Revenue: 94000, Cost: 52000 },
  { month: 'Aug', Revenue: 106000, Cost: 58000 }
];

export const analyticsData = {
  shipments: [
    { date: 'Mar 1', count: 1350 },
    { date: 'Mar 4', count: 1480 },
    { date: 'Mar 8', count: 1620 },
    { date: 'Mar 12', count: 1900 },
    { date: 'Mar 16', count: 2150 },
    { date: 'Mar 20', count: 2320 },
    { date: 'Mar 24', count: 2480 },
    { date: 'Mar 28', count: 2720 }
  ],
  revenue: [
    { region: 'North America', amount: 42000 },
    { region: 'Europe', amount: 32000 },
    { region: 'Asia Pacific', amount: 28000 },
    { region: 'Latin America', amount: 19000 }
  ],
  freightTypes: [
    { name: 'Road', value: 48 },
    { name: 'Air', value: 28 },
    { name: 'Ocean', value: 17 },
    { name: 'Rail', value: 7 }
  ]
};

export const productCategoriesData = {
  total: 1000,
  categories: [
    { name: 'Electronics', count: 240, percentage: 24, color: '#6C5CE7' },
    { name: 'Home & Kitchen', count: 200, percentage: 20, color: '#A29BFE' },
    { name: 'Apparel', count: 180, percentage: 18, color: '#2D3436' },
    { name: 'Beauty & Health', count: 140, percentage: 14, color: '#636E72' },
    { name: 'Sports & Outdoors', count: 120, percentage: 12, color: '#B2BEC3' },
    { name: 'Automotive', count: 120, percentage: 12, color: '#DFE6E9' }
  ]
};

export const shipmentTypeData = {
  total: 2500,
  types: [
    { name: 'Road Freight', percentage: 48, count: 1150, color: '#7C4DFF' },
    { name: 'Air Freight', percentage: 28, count: 700, color: '#2E2E38' },
    { name: 'Ocean Freight', percentage: 17, count: 425, color: '#6B7280' },
    { name: 'Rail Freight', percentage: 9, count: 225, color: '#D1D5DB' }
  ]
};

export const shipmentAlertsSummary = {
  totalDelays: 12,
  badges: [
    { id: 'customs', label: 'Customs Clearance Delay', count: 5, color: '#EEF2FF', textColor: '#4F46E5' },
    { id: 'address', label: 'Incorrect Address Provided', count: 4, color: '#EDE9FE', textColor: '#6D28D9' },
    { id: 'weather', label: 'Weather-Related Hold', count: 3, color: '#F5F3FF', textColor: '#7C3AED' }
  ],
  alertsList: [
    {
      id: '#SH9283746',
      type: 'Customs Clearance Delay',
      freight: 'Air Freight',
      date: 'Mar 20, 2035'
    },
    {
      id: '#SH8715810',
      type: 'Incorrect Address Provided',
      freight: 'Road Freight',
      date: 'Mar 20, 2035'
    },
    {
      id: '#SH8739043',
      type: 'Weather-Related Hold',
      freight: 'Air Freight',
      date: 'Mar 19, 2035'
    },
    {
      id: '#SH8719654',
      type: 'Incorrect Address Provided',
      freight: 'Rail Freight',
      date: 'Mar 18, 2035'
    }
  ]
};

export const recentActivityFeed = [
  {
    id: 1,
    user: '@TechGuru99',
    action: 'submitted a bulk shipment request',
    time: '12:00 PM',
    icon: 'Package'
  },
  {
    id: 2,
    user: '@SupportKen',
    action: 'added a priority tag to Order ID 778891KL',
    time: '11:30 AM',
    icon: 'Tag'
  },
  {
    id: 3,
    user: '@SallyMae88',
    action: 'initiated a return process for Order ID 445566HI',
    time: '11:00 AM',
    icon: 'RotateCcw'
  },
  {
    id: 4,
    user: '@AdminLisa',
    action: 'resolved a delivery issue for Order ID 12345XYZ',
    time: '10:15 AM',
    icon: 'CheckCircle'
  }
];

export const initialShipments = [
  {
    id: '#SH9283746',
    company: 'TechGear Inc.',
    category: 'Electronics',
    carrier: 'FedEx',
    freightType: 'Road Freight',
    weight: '1,200 kg',
    origin: 'Los Angeles, CA',
    destination: 'Chicago, IL',
    originCode: 'LAX',
    destCode: 'ORD',
    shipDate: 'Mar 20, 2035',
    shipTime: '10:00 AM',
    estDeliveryDate: 'Mar 23, 2035',
    estDeliveryTime: '03:00 PM',
    progress: 60,
    status: 'In Transit',
    statusBadge: 'In Transit'
  },
  {
    id: '#SH9182635',
    company: 'StyleHub Co.',
    category: 'Apparel',
    carrier: 'DHL',
    freightType: 'Air Freight',
    weight: '850 kg',
    origin: 'New York, NY',
    destination: 'Atlanta, GA',
    originCode: 'JFK',
    destCode: 'ATL',
    shipDate: 'Mar 19, 2035',
    shipTime: '11:30 AM',
    estDeliveryDate: 'Mar 22, 2035',
    estDeliveryTime: '01:00 PM',
    progress: 75,
    status: 'Out for Delivery',
    statusBadge: 'Out for Delivery'
  },
  {
    id: '#SH9037821',
    company: 'FreshNest',
    category: 'Home & Kitchen',
    carrier: 'UPS',
    freightType: 'Ocean Freight',
    weight: '1,450 kg',
    origin: 'Dallas, TX',
    destination: 'Miami, FL',
    originCode: 'DFW',
    destCode: 'MIA',
    shipDate: 'Mar 18, 2035',
    shipTime: '09:00 AM',
    estDeliveryDate: 'Mar 21, 2035',
    estDeliveryTime: '06:00 PM',
    progress: 100,
    status: 'Delivered',
    statusBadge: 'Completed'
  },
  {
    id: '#SH9374652',
    company: 'FitPlus Gear',
    category: 'Sports & Outdoors',
    carrier: 'USPS',
    freightType: 'Rail Freight',
    weight: '960 kg',
    origin: 'Seattle, WA',
    destination: 'Denver, CO',
    originCode: 'SEA',
    destCode: 'DEN',
    shipDate: 'Mar 21, 2035',
    shipTime: '08:45 AM',
    estDeliveryDate: 'Mar 25, 2035',
    estDeliveryTime: '04:30 PM',
    progress: 40,
    status: 'Processing',
    statusBadge: 'Pending'
  },
  {
    id: '#SH9457830',
    company: 'AutoParts Pro',
    category: 'Automotive',
    carrier: 'Aramex',
    freightType: 'Air Freight',
    weight: '1,680 kg',
    origin: 'Detroit, MI',
    destination: 'San Diego, CA',
    originCode: 'DTW',
    destCode: 'SAN',
    shipDate: 'Mar 20, 2035',
    shipTime: '07:15 AM',
    estDeliveryDate: 'Mar 26, 2035',
    estDeliveryTime: '02:00 PM',
    progress: 50,
    status: 'In Transit',
    statusBadge: 'In Transit'
  },
  {
    id: '#SH8821349',
    company: 'EcoLights',
    category: 'Electronics',
    carrier: 'FedEx',
    freightType: 'Air Freight',
    weight: '1,100 kg',
    origin: 'Austin, TX',
    destination: 'Phoenix, AZ',
    originCode: 'AUS',
    destCode: 'PHX',
    shipDate: 'Mar 19, 2035',
    shipTime: '12:00 PM',
    estDeliveryDate: 'Mar 21, 2035',
    estDeliveryTime: '05:00 PM',
    progress: 90,
    status: 'Out for Delivery',
    statusBadge: 'Out for Delivery'
  },
  {
    id: '#SH8967432',
    company: 'GreenHaven',
    category: 'Home & Garden',
    carrier: 'USPS',
    freightType: 'Road Freight',
    weight: '1,250 kg',
    origin: 'Portland, OR',
    destination: 'Salt Lake City, UT',
    originCode: 'PDX',
    destCode: 'SLC',
    shipDate: 'Mar 18, 2035',
    shipTime: '02:45 PM',
    estDeliveryDate: 'Mar 22, 2035',
    estDeliveryTime: '11:00 AM',
    progress: 65,
    status: 'In Transit',
    statusBadge: 'In Transit'
  },
  {
    id: '#SH8893247',
    company: 'ModaWear',
    category: 'Apparel',
    carrier: 'DHL',
    freightType: 'Road Freight',
    weight: '920 kg',
    origin: 'Boston, MA',
    destination: 'Charlotte, NC',
    originCode: 'BOS',
    destCode: 'CLT',
    shipDate: 'Mar 20, 2035',
    shipTime: '01:00 PM',
    estDeliveryDate: 'Mar 23, 2035',
    estDeliveryTime: '08:00 AM',
    progress: 80,
    status: 'Out for Delivery',
    statusBadge: 'Out for Delivery'
  },
  {
    id: '#SH9018723',
    company: 'SunCore Panels',
    category: 'Electronics',
    carrier: 'UPS',
    freightType: 'Rail Freight',
    weight: '1,375 kg',
    origin: 'San Diego, CA',
    destination: 'Reno, NV',
    originCode: 'SAN',
    destCode: 'RNO',
    shipDate: 'Mar 21, 2035',
    shipTime: '09:30 AM',
    estDeliveryDate: 'Mar 24, 2035',
    estDeliveryTime: '01:30 PM',
    progress: 30,
    status: 'Processing',
    statusBadge: 'Pending'
  },
  {
    id: '#SH9113471',
    company: 'QuickParts',
    category: 'Automotive',
    carrier: 'Aramex',
    freightType: 'Road Freight',
    weight: '1,420 kg',
    origin: 'Tampa, FL',
    destination: 'Houston, TX',
    originCode: 'TPA',
    destCode: 'IAH',
    shipDate: 'Mar 20, 2035',
    shipTime: '04:00 PM',
    estDeliveryDate: 'Mar 23, 2035',
    estDeliveryTime: '12:00 PM',
    progress: 90,
    status: 'In Transit',
    statusBadge: 'In Transit'
  },
  {
    id: '#SH8881190',
    company: 'VitaFresh',
    category: 'Food & Beverage',
    carrier: 'Local Courier',
    freightType: 'Road Freight',
    weight: '980 kg',
    origin: 'Nashville, TN',
    destination: 'Jacksonville, FL',
    originCode: 'BNA',
    destCode: 'JAX',
    shipDate: 'Mar 21, 2035',
    shipTime: '06:00 AM',
    estDeliveryDate: 'Mar 22, 2035',
    estDeliveryTime: '10:00 AM',
    progress: 85,
    status: 'Out for Delivery',
    statusBadge: 'Out for Delivery'
  },
  {
    id: '#SH8776103',
    company: 'StyleDepot',
    category: 'Fashion',
    carrier: 'FedEx',
    freightType: 'Air Freight',
    weight: '1,020 kg',
    origin: 'Minneapolis, MN',
    destination: 'Kansas City, MO',
    originCode: 'MSP',
    destCode: 'MCI',
    shipDate: 'Mar 19, 2035',
    shipTime: '10:15 AM',
    estDeliveryDate: 'Mar 22, 2035',
    estDeliveryTime: '03:30 PM',
    progress: 60,
    status: 'In Transit',
    statusBadge: 'In Transit'
  }
];

/* --- Warehouse Datasets --- */

export const warehouseTopMetrics = [
  { id: 'sku', title: 'Total SKU', value: '285', change: '+2.58%' },
  { id: 'qty', title: 'Quantity on Hand', value: '12,450', unit: 'units', change: '+4.37%' },
  { id: 'usage', title: 'Capacity Usage', value: '62.5%', unit: 'Full', change: '+1.54%' }
];

export const warehouseInventoryData = [
  { category: 'Electronics', percentage: 25, count: 2500, color: '#7C4DFF' },
  { category: 'Apparel', percentage: 20, count: 2000, color: '#6C38FF', isStriped: true },
  { category: 'Home & Kitchen', percentage: 18, count: 1800, color: '#18181B' },
  { category: 'Beauty & Health', percentage: 15, count: 1500, color: '#27272A', isStriped: true },
  { category: 'Automotive Parts', percentage: 12, count: 1200, color: '#71717A' },
  { category: 'Sports Equipment', percentage: 10, count: 1000, color: '#A1A1AA' }
];

export const warehouseStorageTable = [
  { floor: 1, section: 'A1 – A10', category: 'Electronics', percentage: 80, available: '20/100' },
  { floor: 2, section: 'B1 – B10', category: 'Apparel', percentage: 60, available: '40/100' },
  { floor: 1, section: 'C1 – C10', category: 'Home & Kitchen', percentage: 90, available: '10/100' },
  { floor: 3, section: 'D1 – D10', category: 'Automotive Parts', percentage: 50, available: '50/100' },
  { floor: 2, section: 'E1 – E10', category: 'Beauty & Health', percentage: 70, available: '30/100' }
];

export const warehousePackagesList = [
  { id: 'PKG-HK77420', date: 'March 20, 2035 – 05:30 PM', status: 'Sent' },
  { id: 'PKG-AS0812', date: 'March 21, 2035 – 01:45 PM', status: 'Received' },
  { id: 'PKG-E10293', date: 'March 22, 2035 – 09:00 AM', status: 'Expected' }
];

export const warehouseActivityLog = [
  {
    id: 1,
    user: 'Leo Fernandez',
    action: 'confirmed receipt of 40 units of Winter Jacket Series in Section B3 (Apparel)',
    time: '01:45 PM',
    icon: 'CheckSquare'
  },
  {
    id: 2,
    user: 'Ava Martinez',
    action: 'added 25 units of Smart Router Kit to Section A1 (Electronics)',
    time: '09:15 AM',
    icon: 'PlusCircle'
  },
  {
    id: 3,
    user: 'Oscar Liam',
    action: 'dispatched 18 units of Stainless Steel Cookware Set from Section C5 (Home & Kitchen)',
    time: '05:30 PM',
    icon: 'Truck'
  },
  {
    id: 4,
    user: 'Dina Choi',
    action: 'created a shipment entry for Brake Pad Sets in Section D2 (Automotive Parts)',
    time: '04:10 PM',
    icon: 'FileText'
  }
];

/* --- Invoices & Billing Datasets --- */

export const invoicesKPIs = [
  { id: 'paid', title: 'Paid Invoices', amount: '$28,890', subtext: 'from 350 invoices', icon: 'CheckCircle2' },
  { id: 'unpaid', title: 'Unpaid Invoices', amount: '$16,700', subtext: 'from 120 invoices', icon: 'Wallet' },
  { id: 'pending', title: 'Pending Invoices', amount: '$8,050', subtext: 'from 90 invoices', icon: 'Receipt' },
  { id: 'overdue', title: 'Overdue Invoices', amount: '$22,110', subtext: 'from 245 invoices', icon: 'Clock' }
];

export const initialInvoices = [
  {
    id: 'INV-1001',
    company: 'TechGear Inc.',
    shippingId: '#SH9283746',
    issueDate: 'Mar 15, 2035',
    dueDate: 'Mar 22, 2035',
    amount: '$1,250.00',
    status: 'Paid',
    billFrom: { name: 'TechGear Inc.', email: 'billing@techgear.com', address: '100 Innovation Way, San Jose, CA 95134, USA', phone: '+1 408-555-0199' },
    billTo: { name: 'ShipNow Logistics', email: 'accounts@shipnow.com', address: '901 Distribution Ave, Charlotte, NC 28217, USA', phone: '+1 704-555-9911' },
    items: [
      { desc: 'Smart Wireless Router Pack', freight: 'Air Freight Express', price: '$250.00', qty: 3, amount: '$750.00' },
      { desc: 'Ergonomic Mechanical Keyboard', freight: 'Road Freight Standard', price: '$100.00', qty: 5, amount: '$500.00' }
    ],
    subtotal: '$1,250.00',
    tax: '$100.00',
    fee: '$15.00',
    total: '$1,365.00'
  },
  {
    id: 'INV-1002',
    company: 'StyleHub Co.',
    shippingId: '#SH9182635',
    issueDate: 'Mar 16, 2035',
    dueDate: 'Mar 23, 2035',
    amount: '$980.00',
    status: 'Unpaid',
    billFrom: { name: 'StyleHub Co.', email: 'billing@stylehub.com', address: '450 Fashion Blvd, New York, NY 10018, USA', phone: '+1 212-555-7800' },
    billTo: { name: 'ShipNow Logistics', email: 'accounts@shipnow.com', address: '901 Distribution Ave, Charlotte, NC 28217, USA', phone: '+1 704-555-9911' },
    items: [
      { desc: 'Cotton Polo T-Shirts (Bulk Pack)', freight: 'Air Freight Priority', price: '$490.00', qty: 2, amount: '$980.00' }
    ],
    subtotal: '$980.00',
    tax: '$78.40',
    fee: '$10.00',
    total: '$1,068.40'
  },
  {
    id: 'INV-1003',
    company: 'FreshNest',
    shippingId: '#SH9037821',
    issueDate: 'Mar 14, 2035',
    dueDate: 'Mar 21, 2035',
    amount: '$1,320.00',
    status: 'Paid',
    billFrom: { name: 'FreshNest', email: 'billing@freshnest.com', address: '780 Commerce St, Dallas, TX 75201, USA', phone: '+1 214-555-3320' },
    billTo: { name: 'ShipNow Logistics', email: 'accounts@shipnow.com', address: '901 Distribution Ave, Charlotte, NC 28217, USA', phone: '+1 704-555-9911' },
    items: [
      { desc: 'Stainless Steel Cookware Set', freight: 'Ocean Freight Standard', price: '$440.00', qty: 3, amount: '$1,320.00' }
    ],
    subtotal: '$1,320.00',
    tax: '$105.60',
    fee: '$12.00',
    total: '$1,437.60'
  },
  {
    id: 'INV-1004',
    company: 'FitPlus Gear',
    shippingId: '#SH9374652',
    issueDate: 'Mar 17, 2035',
    dueDate: 'Mar 24, 2035',
    amount: '$1,150.00',
    status: 'Unpaid',
    billFrom: { name: 'FitPlus Gear', email: 'billing@fitplus.com', address: '120 Athletic Way, Seattle, WA 98101, USA', phone: '+1 206-555-6677' },
    billTo: { name: 'ShipNow Logistics', email: 'accounts@shipnow.com', address: '901 Distribution Ave, Charlotte, NC 28217, USA', phone: '+1 704-555-9911' },
    items: [
      { desc: 'Professional Resistance Bands', freight: 'Rail Freight Ground', price: '$230.00', qty: 5, amount: '$1,150.00' }
    ],
    subtotal: '$1,150.00',
    tax: '$92.00',
    fee: '$10.00',
    total: '$1,252.00'
  },
  {
    id: 'INV-1005',
    company: 'AutoParts Pro',
    shippingId: '#SH9457830',
    issueDate: 'Mar 15, 2035',
    dueDate: 'Mar 22, 2035',
    amount: '$1,480.00',
    status: 'Overdue',
    billFrom: { name: 'AutoParts Pro', email: 'billing@autoparts.com', address: '90 Motor City Dr, Detroit, MI 48201, USA', phone: '+1 313-555-9090' },
    billTo: { name: 'ShipNow Logistics', email: 'accounts@shipnow.com', address: '901 Distribution Ave, Charlotte, NC 28217, USA', phone: '+1 704-555-9911' },
    items: [
      { desc: 'High Performance Brake Pads', freight: 'Air Freight Priority', price: '$740.00', qty: 2, amount: '$1,480.00' }
    ],
    subtotal: '$1,480.00',
    tax: '$118.40',
    fee: '$15.00',
    total: '$1,613.40'
  },
  {
    id: 'INV-1006',
    company: 'EcoLights',
    shippingId: '#SH8821349',
    issueDate: 'Mar 13, 2035',
    dueDate: 'Mar 20, 2035',
    amount: '$790.00',
    status: 'Paid',
    billFrom: { name: 'EcoLights', email: 'billing@ecolights.com', address: '300 Solar Dr, Austin, TX 78701, USA', phone: '+1 512-555-1234' },
    billTo: { name: 'ShipNow Logistics', email: 'accounts@shipnow.com', address: '901 Distribution Ave, Charlotte, NC 28217, USA', phone: '+1 704-555-9911' },
    items: [
      { desc: 'LED Outdoor Floodlights', freight: 'Air Freight Express', price: '$395.00', qty: 2, amount: '$790.00' }
    ],
    subtotal: '$790.00',
    tax: '$63.20',
    fee: '$8.00',
    total: '$861.20'
  },
  {
    id: 'INV-1007',
    company: 'GreenHaven',
    shippingId: '#SH8967432',
    issueDate: 'Mar 14, 2035',
    dueDate: 'Mar 21, 2035',
    amount: '$875.00',
    status: 'Paid',
    billFrom: { name: 'GreenHaven', email: 'logistics@greenhaven.com', address: '1120 Birch Street, Portland, OR 97205, USA', phone: '+1 503-555-4321' },
    billTo: { name: 'ShipNow Logistics', email: 'accounts@shipnow.com', address: '901 Distribution Ave, Charlotte, NC 28217, USA', phone: '+1 704-555-9911' },
    items: [
      { desc: 'Garden Shovel & Spade Set', freight: 'Road Freight Express', price: '$175.00', qty: 5, amount: '$875.00' }
    ],
    subtotal: '$875.00',
    tax: '$70.00',
    fee: '$10.00',
    total: '$955.00'
  },
  {
    id: 'INV-1008',
    company: 'ModaWear',
    shippingId: '#SH8893247',
    issueDate: 'Mar 16, 2035',
    dueDate: 'Mar 23, 2035',
    amount: '$910.00',
    status: 'Unpaid',
    billFrom: { name: 'ModaWear', email: 'billing@modawear.com', address: '59 Franklin St, Boston, MA 02110, USA', phone: '+1 617-555-2290' },
    billTo: { name: 'ShipNow Logistics', email: 'accounts@shipnow.com', address: '901 Distribution Ave, Charlotte, NC 28217, USA', phone: '+1 704-555-9911' },
    items: [
      { desc: 'Lightweight Hoodie Pack', freight: 'Road Freight Express', price: '$120.00', qty: 3, amount: '$360.00' },
      { desc: 'Autumn Jacket Set', freight: 'Road Freight Standard', price: '$180.00', qty: 2, amount: '$360.00' },
      { desc: 'Lightweight Hoodie Pack', freight: 'Road Freight Express', price: '$95.00', qty: 2, amount: '$190.00' }
    ],
    subtotal: '$910.00',
    tax: '$72.80',
    fee: '$10.00',
    total: '$992.80'
  },
  {
    id: 'INV-1009',
    company: 'SunCore Panels',
    shippingId: '#SH9018723',
    issueDate: 'Mar 17, 2035',
    dueDate: 'Mar 24, 2035',
    amount: '$1,600.00',
    status: 'Unpaid',
    billFrom: { name: 'SunCore Panels', email: 'billing@suncore.com', address: '500 Tech Park Way, San Diego, CA 92101, USA', phone: '+1 619-555-8833' },
    billTo: { name: 'ShipNow Logistics', email: 'accounts@shipnow.com', address: '901 Distribution Ave, Charlotte, NC 28217, USA', phone: '+1 704-555-9911' },
    items: [
      { desc: 'Monocrystalline Solar Cell Grid', freight: 'Rail Freight Priority', price: '$800.00', qty: 2, amount: '$1,600.00' }
    ],
    subtotal: '$1,600.00',
    tax: '$128.00',
    fee: '$20.00',
    total: '$1,748.00'
  },
  {
    id: 'INV-1010',
    company: 'VitaFresh',
    shippingId: '#SH8881190',
    issueDate: 'Mar 15, 2035',
    dueDate: 'Mar 22, 2035',
    amount: '$1,120.00',
    status: 'Overdue',
    billFrom: { name: 'VitaFresh', email: 'billing@vitafresh.com', address: '220 Produce Row, Nashville, TN 37201, USA', phone: '+1 615-555-4411' },
    billTo: { name: 'ShipNow Logistics', email: 'accounts@shipnow.com', address: '901 Distribution Ave, Charlotte, NC 28217, USA', phone: '+1 704-555-9911' },
    items: [
      { desc: 'Organic Cold Pressed Juices', freight: 'Road Freight Refrigerated', price: '$280.00', qty: 4, amount: '$1,120.00' }
    ],
    subtotal: '$1,120.00',
    tax: '$89.60',
    fee: '$12.00',
    total: '$1,221.60'
  },
  {
    id: 'INV-1011',
    company: 'SmartAppliance',
    shippingId: '#SH8923762',
    issueDate: 'Mar 18, 2035',
    dueDate: 'Mar 25, 2035',
    amount: '$1,060.00',
    status: 'Paid',
    billFrom: { name: 'SmartAppliance', email: 'billing@smartappliance.com', address: '88 Tech Blvd, Chicago, IL 60601, USA', phone: '+1 312-555-9900' },
    billTo: { name: 'ShipNow Logistics', email: 'accounts@shipnow.com', address: '901 Distribution Ave, Charlotte, NC 28217, USA', phone: '+1 704-555-9911' },
    items: [
      { desc: 'Countertop Induction Cooktop', freight: 'Road Freight Express', price: '$530.00', qty: 2, amount: '$1,060.00' }
    ],
    subtotal: '$1,060.00',
    tax: '$84.80',
    fee: '$10.00',
    total: '$1,154.80'
  }
];
