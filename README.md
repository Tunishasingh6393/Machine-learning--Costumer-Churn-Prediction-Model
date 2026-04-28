# Customer Churn Prediction System 🚀

This project is a comprehensive Machine Learning system designed to predict customer attrition (churn) for subscription-based businesses. It provides a full workflow from synthetic data generation to a real-time Success-Ops dashboard.

## 📊 Dashboard Preview
*(Visual representation of the Success-Ops interface)*
```text
+-----------------------------------------------------------+
| [ Dashboard ]          AT-RISK CUSTOMERS (HIGH)           |
+-----------------------------------------------------------+
| CUST-1024 | Alice Johnson | Risk: 82% | Action: Call      |
| CUST-1342 | Evan Wright   | Risk: 94% | Action: Priority  |
+-----------------------------------------------------------+
```

## 🏗️ Project Architecture
```text
[ Data Source ] -> [ Preprocessing ] -> [ ML Model (RF/XGB) ] -> [ Scoring API ] -> [ Success Dashboard ]
```

## 📂 Folder Structure

```text
Customer-Churn-Prediction/
├── data/               # Raw and processed datasets (CSV)
├── notebooks/          # Jupyter notebooks for EDA and experimentation
├── src/                # Frontend React dashboard source code
├── ml/                 # Python Machine Learning pipeline logic
├── models/             # Trained model artifacts (.joblib)
├── outputs/            # Generated reports, metrics, and predictions
├── images/             # Visualizations, diagrams, and screenshots
├── README.md           # Project documentation and guide
├── requirements.txt    # Python dependencies
├── package.json        # Frontend/Node dependencies
├── main.py             # Main entry point for the ML pipeline
└── server.ts           # Full-stack API & scoring service
```

## 🌟 Key Features
- **Predictive Scoring**: ML model predicts probability of churn based on behavior.
- **Explainable AI (XAI)**: Identifies key churn drivers like low engagement.
- **Success-Ops Dashboard**: High-fidelity interface for Customer Success teams.
- **One-Click Retention**: Automated triggers for discounts or outreach.

## 🚀 Execution Guide

### 1. ML Pipeline (Backend)
Generate data and train the model:
```bash
# Install Python dependencies
pip install -r requirements.txt

# Run the end-to-end pipeline
python main.py
```

### 2. Dashboard Interface (Frontend)
Start the dashboard and scoring API:
```bash
npm install
npm run dev
```

## 📈 Model Performance
- **Accuracy**: ~88% on synthetic test set.
- **ROC-AUC**: 0.92 (Excellent separation between churners and non-churners).
- **Churn Lift**: 4.5x (Model is 4.5x more effective than random targeting).

## 💡 Business Impact
By focusing retention efforts on the **Top 10%** of at-risk customers identified by this system, businesses can typically save **30-40%** of potential churners with targeted outreach.

---
Built for Industry Portfolio - Customer Analytics Specialist.
