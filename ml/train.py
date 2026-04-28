import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score

def train_model():
    df = pd.read_csv('data/customer_churn_data.csv')
    
    X = df.drop(['customer_id', 'churn'], axis=1)
    y = df['churn']
    
    # Preprocessing
    numeric_features = ['tenure_months', 'monthly_charges', 'total_usage_gb', 'support_calls']
    categorical_features = ['contract_type', 'payment_method']
    
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numeric_features),
            ('cat', OneHotEncoder(), categorical_features)
        ])
    
    # Model Pipeline
    model = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
    ])
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    model.fit(X_train, y_train)
    
    # Evaluation
    y_pred = model.predict(X_test)
    y_prob = model.predict_proba(X_test)[:, 1]
    
    print("Classification Report:")
    print(classification_report(y_test, y_pred))
    print(f"ROC-AUC Score: {roc_auc_score(y_test, y_prob):.4f}")
    
    # Save Model
    joblib.dump(model, 'churn_model.joblib')
    print("Model saved as churn_model.joblib")

if __name__ == "__main__":
    train_model()
