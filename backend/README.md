## Getting Started

This guide will help you set up and run the Django application on your local machine for development and testing purposes.

### Prerequisites
Ensure you have the following installed:
- Python (>= 3.8)
- pip (latest version recommended)
- Virtualenv (recommended but optional)
- MySQL

### Installation
After cloning the Repo:

1. **Create a virtual environment:** (Optional but recommended)
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
2. **Install dependencies:**
   ```sh
   pip install -r requirements.txt
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env`
   - Update the database, secret key, and other configurations in `.env`

### Database Setup
Run the following commands to set up the database:
```sh
python manage.py migrate
```

### Running the Application
Start the development server:
```sh
python manage.py runserver
```
By default, the application will be available at: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)