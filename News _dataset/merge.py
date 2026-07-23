import pandas as pd

fake = pd.read_csv('Fake.csv')
true = pd.read_csv('True.csv')
wel = pd.read_csv('WELFake_Dataset.csv', on_bad_lines='skip', engine='python')
new_df = pd.read_csv('fake_news_dataset.csv')

fake['label'] = 1
true['label'] = 0
fake = fake[['title', 'text', 'label']]
true = true[['title', 'text', 'label']]

wel = wel[['title', 'text', 'label']].dropna(subset=['title', 'text'])

new_df['label'] = new_df['label'].map({'real': 0, 'fake': 1})
new_df = new_df[['title', 'text', 'label']].dropna()

combined = pd.concat([fake, true, wel, new_df], ignore_index=True)
combined['label'] = combined['label'].map(lambda x: 1 if str(x).lower() in ['1', 'fake'] else 0)
combined = combined.sample(frac=1, random_state=42).reset_index(drop=True)

print("Final shape:", combined.shape)
print(combined['label'].value_counts())

combined.to_csv('combined_dataset.csv', index=False)
print("✅ Saved as combined_dataset.csv!")