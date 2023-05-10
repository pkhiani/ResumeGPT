import pickle
from pathlib import Path

import streamlit_authenticator as stauth

names = ["Pavan", "Kirill"]
usernames = ["pkhiani", "klazarev"]
passwords = ["XXX", "XXX"]

hashed_passwords = stauth.Hasher(passwords).generate()

file_path = Path(__file__).parent / "hashed_pw.pk1"
with file_path.open("wb") as file:
    pickle.dump(hashed_passwords, file)