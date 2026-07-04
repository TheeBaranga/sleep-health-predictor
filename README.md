# Sleep Disorder AI Predictor 

An end-to-end Machine Learning web application that predicts the likelihood of sleep disorders (Insomnia, Sleep Apnea, or None) based on a user's daily lifestyle metrics.

## Overview

This project implements a complete Data Science and Software Engineering pipeline:
1. **Data Engineering:** Ingested raw CSV data, synthetically expanded it to 4,000+ records, and handled missing values using mathematical imputation (preventing data leakage).
2. **Machine Learning:** Trained a `RandomForestClassifier` (achieving ~93% accuracy) using Scikit-Learn. Features were scaled and encoded for optimal performance.
3. **Backend API:** Built a Flask server to host the trained model and translate incoming web traffic into mathematical arrays for real-time inference.
4. **Frontend UI:** Designed an interactive, responsive web interface using HTML, CSS, and JavaScript.

## Project Structure

* `sleep-dtf.ipynb`: The Jupyter Notebook containing the leak-free data preparation and model training pipeline.
* `app.py`: The Flask backend web server.
* `test_api.py`: A Python script for testing the API routes via POST requests.
* `templates/index.html`: The frontend user interface.
* `*.pkl files`: The exported machine learning model, scaler, and text encoders.

## Installation & Usage

### 1. Install Dependencies
Make sure you have Python installed, then run:
```bash
pip install flask pandas numpy scikit-learn joblib requests