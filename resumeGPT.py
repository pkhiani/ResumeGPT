# Importing required packages
import streamlit as st
import openai
import pandas as pd
import docx2txt
import pdfplumber

import pickle
import streamlit_authenticator as stauth
from pathlib import Path

import toml 

with open('secrets.toml', 'r') as f:
    config = toml.load(f)

openai.api_key = config['OPENAI_KEY']


# User authenticator

names = ["Pavan", "Kirill"]
usernames = ["pkhiani", "klazarev"]

file_path = Path(__file__).parent / "hashed_pw.pk1"
with file_path.open("rb") as file:
    hashed_passwords = pickle.load(file)

credentials = {"usernames":{}}

for un, name, pw in zip(usernames, names, hashed_passwords):
    user_dict = {"name":name,"password":pw}
    credentials["usernames"].update({un:user_dict})

authenticator = stauth.Authenticate(credentials, "app_home", "auth", cookie_expiry_days=30)

name, authentication_status, username = authenticator.login("Login", "main")

if authentication_status == False:
   st.error("Username/password is incorrect")

if authentication_status == None:
    st.warning("Please enter your username and password") 

if authentication_status:
    # Set the model engine and your OpenAI API key
    model_engine = "gpt-3.5-turbo"

    def show_messages(text):
        messages_str = [
            f"{_['role']}: {_['content']}" for _ in st.session_state["messages"][1:]
        ]
        text.text_area("Messages", value=str("\n".join(messages_str)), height=400)

    def main():
        authenticator.logout("Logout", "sidebar")
        st.sidebar.title(f"Welcome {name}")
        st.title("ResumeGPT: Tailor your resume")
        menu = ["Home", "Upload", "Resume"]
        choice = st.sidebar.selectbox("Menu", menu)
        if choice == "Home":
            st.subheader("Home")
            st.text("Welcome to ResumeGPT! Begin by uploading your resume using the side bar")  

        elif choice == "Resume":
            st.header("Tailor your Resume")
            BASE_PROMPT = [{"role": "system", "content": "You are a helpful assistant."}]

            if "messages" not in st.session_state:
                st.session_state["messages"] = BASE_PROMPT

            text = st.empty()
            show_messages(text)

            prompt = st.text_input("Prompt", value="Enter your message here...")

            if st.button("Send"):
                with st.spinner("Generating response..."):
                    st.session_state["messages"] += [{"role": "user", "content": prompt}]
                    response = openai.ChatCompletion.create(
                        model=model_engine, messages=st.session_state["messages"]
                    )
                    message_response = response["choices"][0]["message"]["content"]
                    st.session_state["messages"] += [
                        {"role": "system", "content": message_response}
                    ]
                    show_messages(text)

            if st.button("Clear"):
                st.session_state["messages"] = BASE_PROMPT
                show_messages(text)

        elif choice == "Upload":
            st.subheader("Upload")
            pdf_file = st.file_uploader("Upload File")
            if st.button("Process"):
                if pdf_file is not None:
                    file_details = {"filename":pdf_file.name,
                                                "filetype":pdf_file.type,"filesize":pdf_file.size}
                    st.write(file_details)
                    if pdf_file.type == "text/plain":
                        raw_text = str(pdf_file.read(), "utf-8")
                        st.text(raw_text)
                    elif pdf_file.type == "application/pdf":
                        try:
                            with pdfplumber.open(pdf_file) as pdf:
                                pages = pdf.pages[0]
                                st.write(pages.extract_text())
                        except:
                            st.write("None")
                        
                    else:
                        raw_text = docx2txt.process(pdf_file)
                        st.write(raw_text)
                        st.text(raw_text)
        
    def ChatGPT(user_query):
        ''' 
        This function uses the OpenAI API to generate a response to the given 
        user_query using the ChatGPT model
        '''
        # Use the OpenAI API to generate a response
        completion = openai.Completion.create(
                                    engine = model_engine,
                                    prompt = user_query,
                                    max_tokens = 1024,
                                    n = 1,
                                    temperature = 0.5,
                                        )


        response = completion.choices[0].text
        return response

    # call the main function
    main() 