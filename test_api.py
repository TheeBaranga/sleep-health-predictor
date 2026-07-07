import requests


url = 'http://127.0.0.1:8080/predict'


patient_data = {
    "Gender": "Female",
    "Age": 58,
    "Occupation": "Nurse",
    "Sleep Duration": 6.1,
    "Quality of Sleep": 5,
    "Physical Activity Level": 40,
    "Stress Level": 8,
    "BMI Category": "Obese",
    "Heart Rate": 82,
    "Daily Steps": 4500,
    "Systolic BP": 140,
    "Diastolic BP": 95
}


print("Sending patient data to the AI...")
response = requests.post(url, json=patient_data)

print("Status Code:", response.status_code)
print("Raw Response:", response.text)