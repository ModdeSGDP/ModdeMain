# FastAPI Server Setup

## Prerequisites
Ensure you have **Python 3.10** installed on your system. You can check your Python version using:

```sh
python3 --version
```

If Python 3.10 is not installed, download and install it from [Python's official website](https://www.python.org/downloads/).

## Setting Up a Virtual Environment
1. **Navigate to the FastAPI project directory:**
   ```sh
   cd /path/to/your/fastapi/project
   ```

2. **Create a virtual environment:**
   ```sh
   python3.10 -m venv venv
   ```

3. **Activate the virtual environment:**
   - On macOS/Linux:
     ```sh
     source venv/bin/activate
     ```
   - On Windows:
     ```sh
     venv\Scripts\activate
     ```

## Installing Dependencies
Install all required dependencies from the `requirements.txt` file:

```sh
pip install -r requirements.txt
```

## Running the FastAPI Server
Start the FastAPI server using the following command:

```sh
uvicorn main:app --reload
```

- `main` refers to the Python file containing the FastAPI app instance.
- `app` is the FastAPI application object.
- `--reload` enables automatic reloading on code changes (useful for development).

Your FastAPI server should now be running and accessible at:

```
http://127.0.0.1:8000
```

## Verifying the API
Once the server is running, open your browser and visit:

```
http://127.0.0.1:8000/docs
```

This will open the interactive API documentation generated by **Swagger UI**.

## Deactivating the Virtual Environment
Once you're done, deactivate the virtual environment using:

```sh
deactivate
```

