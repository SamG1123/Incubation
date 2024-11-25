import speech_recognition as sr
import pyttsx3
import csv
import ahocorasick
import pandas as pd
import numpy as np
import time
import os
from sklearn.neighbors import NearestNeighbors


# Initialize necessary files
def initialize_files():
    with open('recognized_text.csv', 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(["Recognized Text"])

    if not os.path.exists('order_history.csv'):
        with open('order_history.csv', 'w', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(["Item", "Quantity"])

initialize_files()

recognizer = sr.Recognizer()
tts_engine = pyttsx3.init()

# Voice recognition with error handling and saving to CSV
def recognize_and_save_to_csv():
    recognized_text = []
    try:
        with open('recognized_text.csv', 'a', newline='') as file:
            writer = csv.writer(file)
            print("Listening for your order...")

            while True:
                try:
                    with sr.Microphone() as mic:
                        recognizer.adjust_for_ambient_noise(mic, duration=3.0)
                        print("Please say your order.")
                        audio = recognizer.listen(mic, timeout=8)

                        text = recognizer.recognize_google(audio).title()
                        recognized_text.append(text)
                        writer.writerow([text])
                        print(f"Recognized: {text}")

                except sr.UnknownValueError:
                    print("Could not understand audio. Retrying...")
                    continue
                except sr.WaitTimeoutError:
                    print("Listening timed out.")
                    continue
                except Exception as e:
                    print(f"An error occurred: {e}")
                    break

                time.sleep(2)
                break

    except FileNotFoundError as e:
        print("Error: recognized_text.csv file could not be found or created.")

    return recognized_text

def ask_if_continue_ordering(final_order):
    text_to_speech(
        f"You ordered: {', '.join([f'{item} ({qty})' for item, qty in final_order.items()])}. Do you want to order anything else? Press 'Y' for yes or 'N' for no.")
    response = input("Press 'Y' to continue ordering or 'N' to finalize: ").strip().lower()
    return response == 'y'

def csv_to_text(input_csv, output_txt):
    try:
        with open(input_csv, 'r') as csv_file, open(output_txt, 'w') as text_file:
            for line in csv_file:
                text_file.write(line.replace(',', ' '))
    except FileNotFoundError:
        print("Error: CSV file not found when trying to convert to text.")

def build_aho_corasick(keywords):
    automaton = ahocorasick.Automaton()
    for idx, keyword in enumerate(keywords):
        automaton.add_word(keyword, (idx, keyword))
    automaton.make_automaton()
    return automaton

def recognize_keywords_in_text(file_path, keywords, availability_dict):
    automaton = build_aho_corasick(keywords)
    recognized_words = {}
    unavailable_items = []

    try:
        with open(file_path, 'r') as file:
            for line in file:
                for end_index, (idx, original_value) in automaton.iter(line):
                    if availability_dict.get(original_value, 0) == 1:
                        if original_value in recognized_words:
                            recognized_words[original_value] += 1
                        else:
                            recognized_words[original_value] = 1
                    else:
                        unavailable_items.append(original_value)
        if unavailable_items:
            text_to_speech(f"The following items are not available: {', '.join(unavailable_items)}.")
    except FileNotFoundError:
        print("Error: Text file not found for keyword recognition.")

    return recognized_words, unavailable_items

def text_to_speech(text):
    try:
        tts_engine.say(text)
        tts_engine.runAndWait()
    except Exception as e:
        print(f"Text-to-speech error: {e}")

def update_order_history(order_items):
    try:
        order_history = {}
        if os.path.exists('order_history.csv'):
            with open('order_history.csv', 'r', newline='') as history_file:
                reader = csv.DictReader(history_file)
                for row in reader:
                    item = row['Item']
                    quantity = int(row['Quantity'])
                    order_history[item] = quantity

        for item, quantity in order_items.items():
            if item in order_history:
                order_history[item] += quantity
            else:
                order_history[item] = quantity

        with open('order_history.csv', 'w', newline='') as history_file:
            writer = csv.writer(history_file)
            writer.writerow(['Item', 'Quantity'])
            for item, quantity in order_history.items():
                writer.writerow([item, quantity])

    except Exception as e:
        print(f"Error updating order history: {e}")

def train_knn_model(order_history_df, menu_items):
    item_matrix = np.zeros((len(menu_items), len(menu_items)))
    unique_orders = order_history_df.groupby('Item')['Quantity'].sum().reset_index()

    for i, (item, qty) in enumerate(unique_orders.itertuples(index=False)):
        if item in menu_items:
            item_matrix[menu_items.index(item)][menu_items.index(item)] = qty

    knn = NearestNeighbors(n_neighbors=3, metric='cosine')
    knn.fit(item_matrix)
    return knn, menu_items

def recommend_with_knn(current_order, knn, menu_items, top_n=3):
    current_order_vector = np.zeros(len(menu_items))
    for item in current_order:
        if item in menu_items:
            current_order_vector[menu_items.index(item)] += 1

    distances, indices = knn.kneighbors([current_order_vector], n_neighbors=top_n)
    recommendations = [menu_items[idx] for idx in indices[0] if menu_items[idx] not in current_order]
    return recommendations

def load_order_history():
    try:
        if os.path.exists('order_history.csv'):
            df = pd.read_csv('order_history.csv').dropna()
            return df
    except FileNotFoundError:
        print("Order history not found.")
    return pd.DataFrame(columns=['Item', 'Quantity'])

def main():
    if not os.path.exists('Menu.csv'):
        print("Error: Menu.csv file is required but not found.")
        return

    menu_df = pd.read_csv('Menu.csv')
    menu_items = menu_df['Item'].tolist()
    availability_dict = dict(zip(menu_df['Item'], menu_df['Availability']))

    final_order = {}
    text_to_speech("Hi! What would you like to order?")

    while True:
        recognize_and_save_to_csv()
        csv_to_text('recognized_text.csv', 'output.txt')
        recognized_items, unavailable_items = recognize_keywords_in_text('output.txt', menu_items, availability_dict)
        print("Recognized Menu Items:", recognized_items)
        print("Unavailable Items:", unavailable_items)

        for item, qty in recognized_items.items():
            if item in final_order:
                final_order[item] += qty
            else:
                final_order[item] = qty

        if recognized_items:
            if not ask_if_continue_ordering(final_order):
                break
        else:
            print("No items recognized. Please try again.")

    text_to_speech(f"Your final order is: {', '.join([f'{item} ({qty})' for item, qty in final_order.items()])}.")
    update_order_history(final_order)

    with open('recognized_text.csv', 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(["Recognized Text"])

    order_history = load_order_history()
    print("_______________________--")
    if not order_history.empty:
        knn, menu_items = train_knn_model(order_history, menu_items)
        recommendations = recommend_with_knn(list(final_order.keys()), knn, menu_items)
        if recommendations:
            print(f"Recommended items: {', '.join(recommendations)}")
            text_to_speech(f"We also recommend: {', '.join(recommendations)}.")
        else:
            text_to_speech("No additional recommendations available.")
    else:
        print("---------------------------------------")
        text_to_speech("Order history is empty. Unable to generate recommendations.")

if __name__ == "__main__":
    main()
