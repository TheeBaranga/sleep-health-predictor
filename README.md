# Sleep Disorder AI Predictor

An end-to-end Machine Learning web application that predicts the likelihood of sleep disorders (**Insomnia**, **Sleep Apnea**, or **None**) based on a user's lifestyle and health metrics.

## Overview

This project demonstrates a complete Machine Learning workflow, from data preparation to deployment as a web application.

### Features

- Expanded the original dataset to over **5,000 records** using controlled synthetic data generation.
- Cleaned and prepared the dataset by handling missing values and removing inconsistencies.
- Applied **SMOTE (Synthetic Minority Oversampling Technique)** to balance the target classes and improve model performance.
- Built a preprocessing pipeline using **SimpleImputer**, **StandardScaler**, and **OneHotEncoder** with **ColumnTransformer**.
- Trained a **Random Forest Classifier** to predict sleep disorders with approximately **90.5% test accuracy**.
- Deployed the trained model through a **Flask REST API**.
- Developed a responsive web interface using **HTML, CSS, and JavaScript** for real-time predictions.

---

## Project Structure

```
sleep-health-predictor/
│
├── sleep-dtf.ipynb          # Data preparation, preprocessing, training and evaluation
├── app.py                   # Flask backend
├── test_api.py              # API testing script
├── requirements.txt         # Project dependencies
├── models/
│   ├── rf_model.pkl         # Trained Random Forest model
│   └── preprocessor.pkl     # Preprocessing pipeline
│
├── templates/
│   └── index.html           # Frontend interface
│
└── static/                  # CSS and JavaScript files
```

---

## Technologies Used

- Python
- Flask
- Scikit-learn
- Pandas
- NumPy
- Matplotlib
- imbalanced-learn (SMOTE)
- HTML
- CSS
- JavaScript

---

## Installation

Clone the repository and install the required packages.

```bash
pip install -r requirements.txt
```

---

## Running the Application

Start the Flask server.

```bash
python app.py
```

The application runs on:

```
http://127.0.0.1:8080
```

Open this address in your browser, enter the patient's information, and click **Analyze** to receive a prediction.

---

## Machine Learning Pipeline

1. Load and clean the dataset.
2. Handle missing values.
3. Generate additional synthetic records to improve dataset size.
4. Balance the dataset using **SMOTE**.
5. Split the data into training and testing sets.
6. Apply preprocessing using:
   - SimpleImputer
   - StandardScaler
   - OneHotEncoder
   - ColumnTransformer
7. Train a Random Forest Classifier.
8. Evaluate the model using:
   - Accuracy Score
   - Classification Report
   - Confusion Matrix
9. Save the trained model and preprocessing pipeline using Joblib.

---

## Author

Kalvin Baranga