import webview
import threading
import time
import os
import sys
import win32con
import win32gui
import pygetwindow as gw
import pyautogui
import re
import requests

def start_server():
    # This function can start a local server if needed
    time.sleep(1)  # Simulate server starting delay

# Define the OCR.space API key and URL
OCR_SPACE_API_KEY = 'K89449496788957'  # Replace with your OCR.space API key
OCR_SPACE_API_URL = 'https://api.ocr.space/parse/image'

def perform_ocr(image_path):
    """Perform OCR on the provided image using OCR.space API."""
    with open(image_path, 'rb') as image_file:
        # Prepare the payload and headers
        payload = {
            'apikey': OCR_SPACE_API_KEY,
        }
        files = {
            'file': image_file,
        }

        # Make the request to the OCR.space API
        response = requests.post(OCR_SPACE_API_URL, files=files, data=payload)
        result = response.json()

        # Extract text from the result
        parsed_results = result.get('ParsedResults', [{}])
        detected_text = parsed_results[0].get('ParsedText', '')

        return detected_text

def find_contexts(text, keywords):
    """Find contexts containing any of the specified keywords."""
    contexts = []
    lines = text.split('\n')
    
    # Compile a pattern to match any of the keywords
    pattern = re.compile(r'\b(' + '|'.join(keywords) + r')\b', re.IGNORECASE)
    
    for line in lines:
        if pattern.search(line):
            contexts.append(line)
    
    # Remove duplicates by converting the list to a set
    unique_contexts = list(set(contexts))
    
    return unique_contexts

class API:
    def __init__(self, window_title):
        self.window_title = window_title

    def findstuff(self):
        try:
            # Take a screenshot
            screenshot = pyautogui.screenshot()

            # Save the screenshot to a file
            image_path = "screenshot.png"
            screenshot.save(image_path)

            # Perform OCR on the saved screenshot
            detected_text = perform_ocr(image_path)

            # Define keywords to search for
            keywords = ["meeting", "event", "appointment", "conference", "schedule", 'meet', 'kickoff', 'interview', 'zoom']

            # Find contexts in the extracted text
            contexts = find_contexts(detected_text, keywords)

            return contexts
        except Exception as e:
            return 'bad read'

if __name__ == '__main__':
    # Start the server in a separate thread if needed
    server_thread = threading.Thread(target=start_server)
    server_thread.start()

    # Get the path to the build directory
    build_path = os.path.join(os.path.dirname(__file__), 'build', 'index.html')

    # Create an API instance
    api = API('timescribe')

    # Create a webview window and expose the API
    window = webview.create_window('timescribe', build_path, js_api=api, min_size=(960, 540))

    # Start the webview event loop
    webview.start()