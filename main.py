import os
from ml.data_generator import generate_data
from ml.train import train_model

def main():
    print("🚀 Starting Customer Churn Prediction Pipeline...")
    
    # 1. Generate Data
    if not os.path.exists('data/customer_churn_data.csv'):
        print("\n--- Phase 1: Data Generation ---")
        generate_data(n_samples=10000)
    else:
        print("\n--- Phase 1: Data exists, skipping generation ---")
        
    # 2. Train Model
    print("\n--- Phase 2: Model Training ---")
    train_model()
    
    print("\n✅ Pipeline execution complete. Check 'models/' and 'outputs/' for results.")

if __name__ == "__main__":
    main()
