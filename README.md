# Appliance Energy Consumption Analysis

## Data Story

### Audience
This visualization targets **energy policy makers**, **retail analysts**, and **environmentally conscious consumers** interested in understanding television market distribution patterns in Australia. The primary audience includes:

- **Government energy efficiency program managers** seeking to identify which brands to partner with for maximum environmental impact
- **Retail market researchers** analyzing brand performance and consumer preferences
- **Environmental advocates** interested in appliance market trends affecting energy consumption
- **Consumer electronics buyers** making informed purchasing decisions based on market presence

### Audience Interest
Our audience is specifically interested in:
- **Market dominance patterns** to understand which brands have the greatest influence on national energy consumption
- **Brand distribution insights** for targeting energy efficiency initiatives effectively  
- **Consumer preference trends** reflected in registration data
- **Market concentration analysis** to identify opportunities for policy intervention or business development

The visualization reveals that just three brands (Samsung Electronics, Kogan, and LG) control over 70% of the market, making them critical partners for any large-scale energy efficiency programs.

---

## About the Data

### Data Source
The dataset originates from **Australia's national appliance energy consumption database**, containing television brand registration records used for energy efficiency monitoring and consumer reporting. The data represents units registered for energy consumption tracking across Australian retail markets.

### Data Processing
- **Raw data extraction**: 3,313 individual television unit records
- **Brand aggregation**: Records grouped by manufacturer brand names
- **Count summarization**: Total units calculated per brand
- **Data sorting**: Arranged in descending order by unit count for visualization clarity
- **Type conversion**: Count values converted from strings to numeric format for D3.js processing
- **Data validation**: Verified accuracy through cross-referencing with original dataset

### Privacy
The dataset contains **no personally identifiable information**. All records represent aggregate brand-level data without individual consumer details, serial numbers, or specific model information that could be traced to individual purchases or households.

### Accuracy and Limitations
**Accuracy Factors:**
- Data sourced from official government energy registration database
- Represents actual registered units rather than sales estimates
- Cross-validated against manufacturer reporting requirements

**Limitations:**
- **Registration lag**: Some recently sold units may not yet appear in registration database
- **Compliance variations**: Not all retailers may register units with equal consistency  
- **Brand categorization**: Different product lines from same manufacturer may be recorded separately (e.g., "Samsung Electronics" vs "Samsung")
- **Market timing**: Data reflects registration patterns rather than current sales trends
- **Geographic coverage**: May not represent all regional market variations across Australia

### Ethics
**Ethical Data Use:**
- **Transparency**: All data processing methods documented and reproducible
- **Public benefit**: Analysis supports energy efficiency and environmental goals
- **No commercial bias**: Visualization presents objective market data without promotional content
- **Attribution**: Data source and limitations clearly disclosed
- **Accessibility**: Interactive visualization includes hover tooltips and clear labeling for users with different technical backgrounds

**Potential Ethical Considerations:**
- Market share information could influence competitive dynamics
- Data presentation choices (sorting, color schemes) might unconsciously favor certain brands
- Aggregated data may obscure important subcategory or regional variations

---

## AI Declaration

### AI Tools Used
**GitHub Copilot** was utilized throughout this project for:
- **Code completion and syntax assistance** for D3.js visualization development
- **CSS styling suggestions** for responsive design implementation
- **HTML structure optimization** for semantic markup
- **JavaScript debugging assistance** for data processing functions
- **Documentation writing support** for code comments and README structure

### Human Contributions
All **analytical decisions**, **design choices**, **data interpretation**, and **narrative development** represent original human work. The author:
- Manually designed the visualization layout and color scheme
- Personally analyzed the data patterns and wrote all interpretive content
- Made independent decisions about data processing methods and presentation approach
- Authored the complete data story narrative and contextual analysis
- Manually tested and refined all interactive features

### Transparency Statement
AI assistance was limited to **technical implementation support** and **syntax guidance**. All **creative decisions**, **analytical insights**, and **substantive content** reflect the author's independent work and understanding of the data.

---

## Technical Implementation

### Technologies Used
- **HTML5**: Semantic structure and accessibility
- **CSS3**: Responsive design and visual styling  
- **JavaScript (ES6+)**: Data processing and interaction logic
- **D3.js v7**: Data visualization and DOM manipulation
- **GitHub**: Version control and collaboration
- **Live Server**: Development environment and testing

### Features Implemented
- **Responsive SVG visualization** with viewBox scaling
- **Interactive hover tooltips** showing exact values and percentages
- **Smooth animations** with staggered bar chart loading
- **Smart tooltip positioning** preventing edge cutoff
- **Gradient styling** with professional visual design
- **Accessible color schemes** and clear typography
- **Mobile-responsive layout** adapting to different screen sizes

---

## Repository Structure
```
T04-2/
├── index.html              # Main landing page
├── televisions.html        # Data story and visualization page
├── about.html             # Project information
├── style.css              # Global styling and responsive design
├── script.js              # Utility functions and year population
├── t04-4-load.js          # CSV data loading and processing
├── t04-5-bars.js          # D3.js bar chart implementation
├── data/
│   └── tvBrandCount.csv   # Television brand count dataset
├── PowerIcon.png          # Navigation logo
└── README.md              # This documentation
```

---

*Project completed as part of COS30045 - Data Visualisation unit at Swinburne University of Technology.*

