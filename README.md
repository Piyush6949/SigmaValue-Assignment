
# Backend Setup

This project uses **Django** and **Django REST Framework** for the backend, along with **pandas** for processing the provided Excel dataset.

Follow the steps below to set up the backend on your local machine.

---

## 1. Clone the Repository

```bash
git clone https://github.com/Piyush6949/SigmaValue-Assignment
cd backend
```

---

## 2. Create and Activate Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate     # Linux/Mac
venv\Scripts\activate        # Windows
```

---

## 3. Install Dependencies

```bash
pip install Django djangorestframework pandas openpyxl django-cors-headers
```

---

## 5. Change Excel File

A Sample file is there already but you can change the Excel file.
The Excel file should be placed in:

```
backend/api/<excel_filename>.xlsx
```
In `settings.py`, update following variable (if excel file is changed):

```python
import os
EXCEL_FILE_PATH = os.path.join(BASE_DIR, 'api', '<excel_filename>.xlsx')
```
---

## 6. Apply Migrations

```bash
python3 manage.py migrate
```

---

## 7. Run the Development Server

```bash
python3 manage.py runserver
```

The backend will be available at:

```
http://127.0.0.1:8000/
```

---

## 8. API Endpoint

The main API endpoint for analysis is:

```
GET /api/analyze/?area=<AreaName>
```

Example:

```
http://127.0.0.1:8000/api/analyze/?area=Aundh
```

Response includes:

* Summary text
* Price trend list
* Demand trend list
* Raw table data list

This data will be used by the frontend to generate charts and tables.

---


---

# Frontend Setup

This section explains how to set up and run the React frontend for the Real Estate Analysis project.
The frontend is built with **React**, **Recharts**, and **Bootstrap**.

---

## Requirements

Make sure you have the following installed:

* Node.js (version 16 or above)
* npm

  
---

## 1. Clone the Repository

```bash
git clone https://github.com/Piyush6949/SigmaValue-Assignment
```

Then navigate into the frontend folder:

```bash
cd frontend
```

---

## 2. Install Dependencies

Run the following command to install all required packages:

```bash
npm install
```

This will install:

* React
* Recharts
* Bootstrap

---

## 3. Start the Development Server

Run:

```bash
npm run dev
```

This will start the frontend at:

```
http://localhost:5173
```

The app will automatically reload whenever you save changes.

---

## 4. API Configuration

The frontend communicates with the backend through this endpoint:

```
http://localhost:8000/api/analyze/?area=<location>
```

Make sure the backend is running before using the frontend.

**Backend Setup**

(Click below to jump directly)

 **[Backend Setup Instructions](#backend-setup)**


---




