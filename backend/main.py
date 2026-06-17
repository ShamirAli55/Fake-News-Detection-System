from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import re
import nltk
from nltk.corpus import stopwords
from newspaper import Article as NewsArticle, Config

# Download required NLTK data
nltk.download('stopwords')
nltk.download('punkt')

# Load model + vectorizer
model = joblib.load('fake_news_model.pkl')
tfidf = joblib.load('tfidf_vectorizer.pkl')

stop_words = set(stopwords.words('english'))

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------- MODELS ----------------
class ArticleInput(BaseModel):
    title: str
    text: str

class UrlInput(BaseModel):
    url: str


# ---------------- CLEAN TEXT ----------------
def clean_text(text):
    text = str(text).lower()
    text = re.sub(r'[^a-z\s]', '', text)
    text = ' '.join(word for word in text.split() if word not in stop_words)
    return text


# ---------------- PREDICTION ----------------
def run_prediction(title, text):
    content = clean_text(title + " " + text)
    vector = tfidf.transform([content])

    prediction = model.predict(vector)[0]
    proba = model.predict_proba(vector)[0]

    return {
        "prediction": int(prediction),
        "label": "FAKE" if prediction == 1 else "REAL",
        "confidence_fake": round(float(proba[1]) * 100, 2),
        "confidence_real": round(float(proba[0]) * 100, 2),
        "extracted_title": title,
        "extracted_text": text[:500] + "..." if len(text) > 500 else text,
    }


# ---------------- ROUTES ----------------
@app.get("/")
def home():
    return {"status": "Fake News Detection API running"}

@app.post("/predict")
def predict(article: ArticleInput):
    return run_prediction(article.title, article.text)

@app.post("/predict-url")
def predict_url(input_data: UrlInput):
    try:
        config = Config()
        config.browser_user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
        config.request_timeout = 10
        
        article = NewsArticle(input_data.url, config=config)
        article.download()
        article.parse()
        
        if not article.text or not article.title:
            raise HTTPException(status_code=400, detail="Could not extract text from URL. The site might be blocking automated access.")
            
        return run_prediction(article.title, article.text)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing URL: {str(e)}")