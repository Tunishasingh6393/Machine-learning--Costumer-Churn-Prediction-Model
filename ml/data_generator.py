import pandas as pd
import numpy as np
import os

def generate_data(n_samples=5000):
    np.random.seed(42)
    
    customer_ids = [f"CUST-{1000+i}" for i in range(n_samples)]
    
    # Features
    tenure = np.random.randint(1, 72, n_samples)
    monthly_charges = np.random.uniform(20, 120, n_samples)
    total_usage_gb = np.random.uniform(10, 500, n_samples)
    support_calls = np.random.poisson(1.5, n_samples)
    contract_type = np.random.choice(['Month-to-month', 'One year', 'Two year'], n_samples, p=[0.5, 0.25, 0.25])
    payment_method = np.random.choice(['Electronic check', 'Mailed check', 'Bank transfer', 'Credit card'], n_samples)
    
    # Logic for Churn (Synthetic Reality)
    # Younger tenure + Month-to-month + High support calls = High Churn
    churn_prob = (
        (1 / (tenure + 1)) * 0.4 +
        (contract_type == 'Month-to-month').astype(int) * 0.3 +
        (support_calls > 3).astype(int) * 0.2 +
        np.random.normal(0, 0.1, n_samples)
    )
    
    churn = (churn_prob > 0.5).astype(int)
    
    df = pd.DataFrame({
        'customer_id': customer_ids,
        'tenure_months': tenure,
        'monthly_charges': monthly_charges,
        'total_usage_gb': total_usage_gb,
        'support_calls': support_calls,
        'contract_type': contract_type,
        'payment_method': payment_method,
        'churn': churn
    })
    
    os.makedirs('data', exist_ok=True)
    df.to_csv('data/customer_churn_data.csv', index=False)
    print(f"Generated {n_samples} samples in data/customer_churn_data.csv")

if __name__ == "__main__":
    generate_data()
