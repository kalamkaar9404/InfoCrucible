from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import joblib

# Sample training data
train_texts = ["fake news content...", "real news content..."]
labels = [1, 0]

# Train model
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(train_texts)
model = LogisticRegression()
model.fit(X, labels)

# Save model
joblib.dump(vectorizer, 'vectorizer.joblib')
joblib.dump(model, 'model.joblib')