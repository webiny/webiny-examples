import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  Authenticator,
} from "@aws-amplify/ui-react";
import { signUp } from "aws-amplify/auth";

import client from "./graphql/client";

import { listNotes } from "./graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation
} from "./graphql/mutations";

const App = ({  }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      console.log("Fetching notes...");
      const { data } = await client.query({
        query: listNotes,
        fetchPolicy: "network-only"
      });
      const notesFromAPI = data.listNotes.data;
      console.log("Fetched notes:", notesFromAPI);
      setNotes(notesFromAPI);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      data: {
        title: form.get("title"),
        description: form.get("description"),
      },
    };
    try {
      await client.mutate({
        mutation: createNoteMutation,
        variables: data
      });
      await fetchNotes();
      event.target.reset();
    } catch (error) {
      console.error("Error creating note:", error);
    }
  }

  async function deleteNote({ id }) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    await client.mutate({
      mutation: deleteNoteMutation,
      variables: { revision: id  }
    });
  }

  const formFields = {
    signUp: {
      given_name: {
        placeholder: 'Enter your first name',
        isRequired: true,
        label: 'First Name'
      },
      family_name: {
        placeholder: 'Enter your last name',
        isRequired: true,
        label: 'Last Name'
      }
    },
  }

  const signUpAttributes = ["email", "given_name", "family_name"];

  return (
      <Authenticator
          formFields={formFields}
          signUpAttributes={signUpAttributes}
          /* Passing the addition wby_notes_app_group attribute to the signUp method
           * We use this attribute to assign the user to the notes-app-users group
           * The notes-app-users group has the necessary permissions to access the notes content in Webiny side
           */
          services={{
            async handleSignUp(formData) {
              const { options, username, password } = formData;
              options.userAttributes["custom:wby_notes_app_group"] = "notes-app-users";
              const res = await signUp({
                username,
                password,
                options,
              });
              return res;
            },
          }}
      >
        {({ signOut, user }) => (
            <main>
              <div className="header">
                <Heading level={1}>My Notes App! Welcome, {user.username}</Heading>
                <Button onClick={signOut} variation="outline">
                  Sign out
                </Button>
              </div>

              <Heading level={1}></Heading>
              <View as="form" margin="3rem 0" onSubmit={createNote}>
                <Flex direction="row" justifyContent="center">
                  <TextField
                      name="title"
                      placeholder="Note Title"
                      label="Note Title"
                      labelHidden
                      variation="quiet"
                      required
                  />
                  <TextField
                      name="description"
                      placeholder="Note Description"
                      label="Note Description"
                      labelHidden
                      variation="quiet"
                      required
                  />
                  <Button type="submit" variation="primary">
                    Create Note
                  </Button>
                </Flex>
              </View>

              <Flex justifyContent="center">
                <Heading level={2}>Current Notes</Heading>
              </Flex>

              <View margin="3rem 0">
                {notes.map((note) => (
                    <Flex
                        key={note.id || note.title}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                      <Text as="strong" fontWeight={700}>
                        {note.title}
                      </Text>
                      <Text as="span">{note.description}</Text>
                      <Button variation="link" onClick={() => deleteNote(note)}>
                        Delete note
                      </Button>
                    </Flex>
                ))}
              </View>
            </main>
        )}
      </Authenticator>
  );
};

export default App;