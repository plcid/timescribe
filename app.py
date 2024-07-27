import webview
import threading
import time
import os

def start_server():
    # This function can start a local server if needed
    time.sleep(1)  # Simulate server starting delay

if __name__ == '__main__':
    # Start the server in a separate thread if needed
    server_thread = threading.Thread(target=start_server)
    server_thread.start()

    # Get the path to the build directory
    build_path = os.path.join(os.path.dirname(__file__), 'build', 'index.html')

    # Create a webview window
    window = webview.create_window('timescribe', build_path)

    # Start the webview event loop
    webview.start()