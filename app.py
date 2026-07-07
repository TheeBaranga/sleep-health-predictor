from flask import Flask, render_template, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

try:
    model = joblib.load("models/rf_model.pkl")
    preprocessor = joblib.load("models/preprocessor.pkl")
    print("Model and tools successfully loaded!")
except Exception as e:
    print(f"Error loading files: {e}")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        user_data = request.get_json()
        input_df = pd.DataFrame([user_data])
            
        input_processed = preprocessor.transform(input_df)

        prediction = model.predict(input_processed)[0]
        
        return jsonify({
            "status": "success",
            "prediction": prediction
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 400

# Start the server 
if __name__ == '__main__':
    app.run(debug=True, port=8080)