from flask import Flask, render_template, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

try:
    model = joblib.load('sleep_model.pkl')
    scaler = joblib.load('scaler.pkl')
    encoders = joblib.load('encoders.pkl')
    print("Model and tools successfully loaded!")
except Exception as e:
    print(f"Error loading files: {e}")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        user_data = request.json
        input_df = pd.DataFrame([user_data])
        
        # Translate words to numbers
        for col in ['Gender', 'Occupation', 'BMI Category']:
            input_df[col] = encoders[col].transform(input_df[col].astype(str))
            
        # Scale the numbers
        input_scaled = scaler.transform(input_df)
        
        # Make prediction
        prediction_num = model.predict(input_scaled)[0]
        prediction_text = encoders['Sleep Disorder'].inverse_transform([prediction_num])[0]
        
        return jsonify({'prediction': prediction_text})

    except Exception as e:
        return jsonify({'error': str(e)})

# Start the server 
if __name__ == '__main__':
    app.run(debug=True, port=8080)