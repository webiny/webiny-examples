# Headless CMS - Cms Field Value Transformer

This example show how you can transform the form field's value before it's saved into the database. We took as an example the rich text field that uses Lexical Editor.

How it works

When the user will try to save the model, the transformer function will execute. Now, you can change the JSON data and return it. After, Webiny will store your modified data in the database.





