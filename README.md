# 📰 Fake News Detection System

A full-stack, machine learning-powered web application designed to detect and combat online fake news. The system utilizes Natural Language Processing (NLP) and a **Logistic Regression** model trained on over **136,400+ news articles** to analyze raw text or extract content directly from live web URLs to evaluate credibility.

---

## 🚀 Key Features

- **Text-Based Authenticity Analysis**: Manually input news article titles and body text to receive real-time classification (**REAL NEWS** vs. **FAKE NEWS**) alongside probability confidence scores.
- **Automated URL Scraping & Detection**: Input any news article URL; the system fetches, parses, and extracts article text using `newspaper3k` with custom header handling before evaluating its credibility.
- **Modern Interactive Dashboard**: Built with **React** and **Vite**, featuring real-time prediction feedback, visual indicators, confidence bars, and modern UI transitions.
- **RESTful Machine Learning API**: Powered by **FastAPI** and **Uvicorn**, serving pre-trained TF-IDF vectorization and Logistic Regression models.

---

## 📊 Dataset & Model Performance

### **Dataset Overview**
The model was trained on a consolidated dataset of **136,437 news articles** merged from four prominent datasets:

- **Total Articles**: 136,437
  - **Real News Articles (Label 0)**: 66,393 (~48.7%)
  - **Fake News Articles (Label 1)**: 70,044 (~51.3%)
- **Average Article Word Count**: ~467 words (Real) vs. ~444 words (Fake)

### **📥 Dataset Kaggle Download Links**

Due to repository storage optimization and compliance, raw dataset CSV files are excluded from Git tracking. You can download the original datasets directly from Kaggle and place them into the `News _dataset/` folder:

1. **Fake and Real News Dataset** (`Fake.csv` & `True.csv`):
   - 🔗 [Kaggle Download Link](https://www.kaggle.com/datasets/clementbisaac/fake-and-real-news-dataset)
2. **WELFake - Word Embedding Over Fitting for Fake News Detection** (`WELFake_Dataset.csv`):
   - 🔗 [Kaggle Download Link](https://www.kaggle.com/datasets/saurabhshahane/fake-news-classification)
3. **Fake News Detection Dataset** (`fake_news_dataset.csv`):
   - 🔗 [Kaggle Download Link](https://www.kaggle.com/datasets/jillanisofttech/fake-news-detection)

---

## 🎯 Model Architecture & Evaluation

- **Preprocessing Pipeline**: Text concatenation (Title + Body), lowercasing, regex-based punctuation/special character removal, and NLTK English stop-word filtering.
- **Feature Extraction**: **TF-IDF Vectorization** (`max_features=10000`).
- **Classifier**: **Logistic Regression** (`max_iter=1000`).
- **Train / Test Split**: 80% Training (109,149 articles) / 20% Testing (27,288 articles).

### **Evaluation Metrics (on 27,288 test articles)**

| Metric | Real News (0) | Fake News (1) | Overall |
| :--- | :---: | :---: | :---: |
| **Accuracy** | — | — | **90.18%** |
| **Precision** | 0.90 | 0.91 | 0.90 |
| **Recall** | 0.90 | 0.91 | 0.90 |
| **F1-Score** | 0.90 | 0.90 | 0.90 |

---

## 🛠️ Project Tech Stack

- **Machine Learning & NLP**: Python, Scikit-learn, Pandas, NLTK, Joblib, Regex
- **Backend API**: FastAPI, Uvicorn, Newspaper3k, Pydantic
- **Frontend**: React, Vite, Vanilla CSS, JavaScript (ES6+)
- **Environment & Tools**: Jupyter Notebooks, Git, VS Code

---

## 📁 Repository Structure

```
News Detection/
│── backend/
│   ├── main.py                # FastAPI application & prediction endpoints
│   ├── fake_news_model.pkl    # Serialized Logistic Regression model
│   ├── tfidf_vectorizer.pkl   # Serialized TF-IDF vectorizer
│   └── requirements.txt       # Backend Python dependencies
│── frontend/
│   ├── src/
│   │   ├── api/               # Axios/Fetch prediction service
│   │   ├── components/        # React components (UrlInput, ManualInput, ResultCard, etc.)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│── News _dataset/
│   ├── merge.py               # Dataset unification script
│   └── Merge_Data.ipynb       # Exploratory Data Analysis & visual notebook
├── Fake_News.ipynb            # Model training & evaluation notebook
├── .gitignore                 # Excludes raw CSV datasets, node_modules, virtualenvs
└── README.md                  # Project documentation
```

---

## ⚡ Quick Start & Installation

### **1. Clone the Repository**
```bash
git clone <repository-url>
cd "News Detection"
```

### **2. Dataset Merging (Optional)**
If you wish to re-train the model from scratch:
1. Download the raw CSV datasets from the Kaggle links provided above.
2. Place `Fake.csv`, `True.csv`, `WELFake_Dataset.csv`, and `fake_news_dataset.csv` inside the `News _dataset/` directory.
3. Run `merge.py` or execute `News _dataset/Merge_Data.ipynb` to generate `combined_dataset.csv`:
   ```bash
   cd "News _dataset"
   python merge.py
   ```

### **3. Backend Setup (FastAPI)**
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend API will run on `http://127.0.0.1:8000`.

### **4. Frontend Setup (React + Vite)**
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.

---

## 🔗 API Documentation

### **1. Text Prediction Endpoint**
- **URL**: `POST /predict`
- **Payload**:
  ```json
  {
    "title": "Article Title Here",
    "text": "Full text of the news article..."
  }
  ```
- **Response**:
  ```json
  {
    "prediction": "REAL",
    "confidence": 94.25
  }
  ```

### **2. Live URL Prediction Endpoint**
- **URL**: `POST /predict-url`
- **Payload**:
  ```json
  {
    "url": "https://example-news.com/sample-article"
  }
  ```
- **Response**:
  ```json
  {
    "prediction": "FAKE",
    "confidence": 88.70,
    "scraped_title": "Extracted News Title"
  }
  ```

---

## 🔒 Security & Data Integrity

- **No Sensitive Files**: No API keys, credentials, or private configuration files are included.
- **Optimized Storage**: Raw data files (`*.csv`) are excluded via `.gitignore` to maintain repository performance, while model binaries (`fake_news_model.pkl`, `tfidf_vectorizer.pkl`) and data processing scripts (`merge.py`, `Merge_Data.ipynb`) are safely tracked.

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).
