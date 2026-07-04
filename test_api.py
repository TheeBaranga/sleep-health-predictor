import requests


url = 'http://127.0.0.1:8080/predict'

patient_data = {
    "Gender": "Male",
    "Age": 45,
    "Occupation": "Software Engineer",
    "Sleep Duration": 5.5,
    "Quality of Sleep": 4,
    "Physical Activity Level": 30,
    "Stress Level": 8,
    "BMI Category": "Overweight",
    "Heart Rate": 85,
    "Daily Steps": 3000,
    "Systolic": 140,
    "Diastolic": 90
}


print("Sending patient data to the AI...")
response = requests.post(url, json=patient_data)

print("Status Code:", response.status_code)
print("Raw Response:", response.text)