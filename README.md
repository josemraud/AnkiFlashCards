Instructions.


1. Add .env file to the root using the following keys:

PORT=3000

OPENAI_API_KEY=PROVIDED_OPEN_API_KEY


2. npm install

3. Build and run docker

docker build -t anki-flashcards .

docker run -p 3000:3000 anki-flashcards

4. Test on postman:

    1. Open Postman.

    2. Create a new request by clicking the "+" tab.

    3. Set the HTTP method to POST from the dropdown next to the URL field.

    4. In the URL field, enter:
        - http://localhost:3000/flashcards/generate.

    5. Set the request header:

        - Go to the Headers tab.
        - Add a header with the key Content-Type and value application/json.
    
    6. Add the request body:

        - Go to the Body tab.
        - Select raw and ensure JSON is selected from the dropdown next to it.
        - Paste this JSON into the body:
        {
            "word": "gato"
        }
    
    7. Send the request:
        - Click the Send button.
        - You should see the response from the API in the lower part of the Postman window.
